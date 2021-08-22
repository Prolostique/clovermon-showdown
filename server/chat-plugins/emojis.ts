import {FS} from '../../lib';

const EMOJI_SIZE = 32;
const ERROR_NO_EMOJI_NAME = 'Specify an emoji name.';
const ERROR_NO_EMOJI_URL = 'Specify an emoji description.';

type Emojis = Record<string, string>;

export const emojis: Emojis = JSON.parse(
	FS('config/chat-plugins/emojis.json').readIfExistsSync() || "{}"
);

const createEmojiRegex = (emojiNames: string[]) => new RegExp(`(${emojiNames.map((emojiName) => `:${emojiName}:`).join('|')})`, 'g');

let emojiRegex: RegExp = createEmojiRegex(Object.keys(emojis));

const saveEmojis = () => {
	FS('config/chat-plugins/emojis.json').writeUpdate(() => JSON.stringify(emojis));
};

const addOrUpdateEmoji = (name: string, url: string) => {
	emojis[name] = url;
	emojiRegex = createEmojiRegex(Object.keys(emojis));
	saveEmojis();
};

const deleteEmoji = (name: string) => {
	delete emojis[name];
	emojiRegex = createEmojiRegex(Object.keys(emojis));
	saveEmojis();
};

const toAlphaNumeric = (text: string) => ('' + text).replace(/[^A-Za-z0-9]+/g, '');

const createEmojiHtml = (name: string, url: string) => `<img src="${url}" title="${name}" height="${EMOJI_SIZE}" width="${EMOJI_SIZE}">`;

export const commands: Chat.ChatCommands = {
	emoji: {
		list() {
			return this.sendReplyBox(Object.entries(emojis).map(([emojiName, emojiUrl]) => createEmojiHtml(emojiName, emojiUrl)).join(', '));
		},
		add(target) {
			this.checkCan('emoji');
			const [rawEmojiName, emojiUrl] = target.split(',').map((part) => part.trim());

			if (!rawEmojiName) {
				return this.errorReply(ERROR_NO_EMOJI_NAME);
			}
			const emojiName = toAlphaNumeric(rawEmojiName);

			if (!emojiUrl) {
				return this.errorReply(ERROR_NO_EMOJI_URL);
			}

			addOrUpdateEmoji(emojiName, emojiUrl);

			return this.sendReplyBox(`Added: ${createEmojiHtml(emojiName, emojiUrl)}`);
		},
		remove(target) {
			this.checkCan('emoji');
			const emojiName = toAlphaNumeric(target);

			if (!emojis[emojiName]) {
				return this.sendReplyBox(`No such emoji :${emojiName}: exists.`);
			}

			deleteEmoji(emojiName);

			return this.sendReply(`Deleted :${emojiName}:`);
		},
	},
};

export const chatfilter: Chat.ChatFilter = (message, user, room) => {
	if (Object.keys(emojis).length > 0 && emojiRegex.test(message)) {
		return '/html ' + message.replace(emojiRegex, (match) => {
			const emojiName = match.slice(1, -1);
			return createEmojiHtml(emojiName, emojis[emojiName]);
		});
	}
	return message;
};
