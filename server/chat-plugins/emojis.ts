import probe from 'probe-image-size';
import {FS} from '../../lib';

const EMOJI_SIZE = 32;
const ERROR_NO_EMOJI_NAME = 'Specify an emoji name.';
const ERROR_NO_EMOJI_URL = 'Specify an emoji description.';
const ERROR_NON_DISCORD_UPLOAD = 'Specify a Discord URL.';
const ERROR_TOO_LARGE_IMAGE = 'Specify an image under 150x150.';
const ERROR_NO_VALID_EMOJI_IMAGE = 'Specify a PNG or GIF image.';

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

const createEmojiHtml = (name: string, url: string) => `<img src="${url}" title=":${name}:" height="${EMOJI_SIZE}" width="${EMOJI_SIZE}">`;

export const commands: Chat.ChatCommands = {
	emojis: 'emoji',
	emoji: {
		list() {
			this.runBroadcast();
			return this.sendReplyBox(Object.entries(emojis).map(([emojiName, emojiUrl]) => createEmojiHtml(emojiName, emojiUrl)).join(', '));
		},
		update: 'add',
		async add(target) {
			this.checkCan('emoji');
			const [rawEmojiName, emojiUrl] = target.split(',').map((part) => part.trim());

			if (!rawEmojiName) {
				return this.errorReply(ERROR_NO_EMOJI_NAME);
			}
			const emojiName = toAlphaNumeric(rawEmojiName);

			if (!emojiUrl) {
				return this.errorReply(ERROR_NO_EMOJI_URL);
			}

			if (!emojiUrl.startsWith('https://cdn.discordapp.com')) {
				return this.errorReply(ERROR_NON_DISCORD_UPLOAD);
			}

			const probeResult = await probe(emojiUrl);
			if (!['png', 'gif'].includes(probeResult.type)) {
				return this.errorReply(ERROR_NO_VALID_EMOJI_IMAGE);
			}

			if (Math.max(probeResult.width, probeResult.height) > 150) {
				return this.errorReply(ERROR_TOO_LARGE_IMAGE);
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
	emojihelp() {
		this.runBroadcast();
		return this.sendReplyBox([
			`<code>/emoji list</code> - Lists all available emojis.`,
			`<code>/emoji add [name], [image url]</code> - Adds or updates an emoji. Requires: &`,
			`<code>/emoji remove [name]</code> - Removes an emoji. Requires: &`,
		].join('<br />'));
	},
};

export const chatfilter: Chat.ChatFilter = (message, user, room) => {
	if (Object.keys(emojis).length > 0 && emojiRegex.test(message)) {
		let prefix = message.startsWith('/html') ? '' : '/html ';
		return prefix + message.replace(emojiRegex, (match) => {
			const emojiName = match.slice(1, -1);
			return createEmojiHtml(emojiName, emojis[emojiName]);
		});
	}
	return message;
};
