import Axios from 'axios';
import probe from 'probe-image-size';
import {FS, Utils} from '../../lib';

const ERROR_USER_INELIGIBLE = 'You are not eligble for a custom avatar.';
const ERROR_INVALID_IMAGE = 'Invalid image. Please provide a URL linking to a 80x80 GIF or PNG.';
const ERROR_WRITING_IMAGE = 'Unable to write image. Please try again or contact an administrator.';

const customAvatarBadges = [
	'tournamentwinner',
	'2tournamentwinner',
	'3tournamentwinner',
];

interface AvatarStatus {
	enabled: boolean;
	requestedAvatar?: string;
	avatar?: string;
}

type Avatars = Record<string, AvatarStatus>;

export const avatars: Avatars = JSON.parse(
	FS('config/chat-plugins/custom-avatars.json').readIfExistsSync() || "{}"
);

const saveAvatars = () => {
	FS('config/chat-plugins/custom-avatars.json').writeUpdate(() => JSON.stringify(avatars));
};

const updateAvatarStatus = (id: string, statusUpdate: Partial<AvatarStatus>) => {
	const avatarStatus = avatars[id];

	const newStatus: AvatarStatus = {
		enabled: false,
	};

	avatars[id] = {
		...newStatus,
		...avatarStatus,
		...statusUpdate,
	};

	saveAvatars();
};

const createAvatarHtml = (
	avatarName: string,
	isCustom = false,
) => `<img src="//${Config.routes.client}/sprites/trainers${isCustom ? '-custom' : ''}/${avatarName}.png" title="${avatarName}" alt="${avatarName}" width="80" height="80" class="pixelated" />`;

const createRawAvatarHtml = (avatarFileName: string, isRequest = false) => `<avatar avatarfilename="${isRequest ? "requests/" : ""}${Utils.escapeHTML(avatarFileName)}" />`;

const createPendingAvatarRequestHtml = (userId: string, avatarFileName: string) => {
	let pendingAvatarRequestHtml = '<details>';
	pendingAvatarRequestHtml += `<summary>${userId}</summary>`;
	pendingAvatarRequestHtml += createRawAvatarHtml(avatarFileName, true);
	return pendingAvatarRequestHtml + '</details>';
};

export const commands: Chat.ChatCommands = {
	blobbos(target, room, user) {
		if (Config.blobbosTournamentWinners && Config.blobbosTournamentWinners.includes(user.id)) {
			this.user.avatar = '#blobbos';
			this.sendReply(`${this.tr`Avatar changed to:`}\n|raw|${createAvatarHtml('blobbos', true)}`);
		}
	},
	customavatar: {
		async request(target, room, user) {
			if (!Config.usesqlitebadges) {
				throw new Chat.ErrorMessage(`The badges feature is currently disabled.`);
			}

			const userBadges = user.badges || [];
			const canHaveCustomAvatar = userBadges.some((userBadge) => customAvatarBadges.includes(userBadge.badge_id));

			if (!canHaveCustomAvatar) {
				throw new Chat.ErrorMessage(ERROR_USER_INELIGIBLE);
			}

			const imageUrl = target.trim();
			const imagebuffer = (await Axios.get(imageUrl, {responseType: 'arraybuffer'})).data;
			const probeResult = probe.sync(imagebuffer);

			if (!probeResult) {
				throw new Chat.ErrorMessage(ERROR_INVALID_IMAGE);
			}

			const {width, height, type} = probeResult;

			if (width !== 80 || height !== 80 || !['png', 'gif'].includes(toID(type))) {
				throw new Chat.ErrorMessage(ERROR_INVALID_IMAGE);
			}

			try {
				const fileName = `${user.id}.${type}`;
				await FS(`./config/avatars/requests/${fileName}`).write(imagebuffer);

				updateAvatarStatus(user.id, {requestedAvatar: fileName});

				return this.sendReplyBox(`Requested: ${createRawAvatarHtml(fileName, true)}`);
			} catch (error) {
				throw new Chat.ErrorMessage(ERROR_WRITING_IMAGE);
			}
		},
		showapproved() {
			this.checkCan('avatar');

			const avatarList = Object.entries(avatars).filter(([userId, avatarStatus]) => avatarStatus.avatar !== undefined);

			if (!avatarList.length) {
				return this.sendReplyBox('There are no approved avatars.');
			}

			const avatarListHtml = avatarList.map(([userId, avatarStatus]) => `<div><div>${userId}</div><div>${createRawAvatarHtml(avatarStatus.avatar || '')}</div></div>`).join('<br />');

			return this.sendReplyBox(avatarListHtml);
		},
		showrequests() {
			this.checkCan('avatar');

			const requestList = Object.entries(avatars).filter(([userId, avatarStatus]) => avatarStatus.requestedAvatar !== undefined);

			if (!requestList.length) {
				return this.sendReplyBox('There are no avatar requests.');
			}

			const requestListHtml = requestList.map(([userId, avatarStatus]) => createPendingAvatarRequestHtml(userId, avatarStatus.requestedAvatar || '')).join('<br />');

			return this.sendReplyBox(requestListHtml);
		},
		approve(target) {
			this.checkCan('avatar');

			const targetId = toID(target);
			const avatarStatus = avatars[targetId];

			if (!avatarStatus || !avatarStatus.requestedAvatar) {
				throw new Chat.ErrorMessage(`No avatar request for ${targetId}`);
			}

			updateAvatarStatus(targetId, {
				avatar: avatarStatus.requestedAvatar,
				requestedAvatar: undefined,
			});

			FS(`./config/avatars/requests/${avatarStatus.requestedAvatar}`)
				.renameSync(`./config/avatars/${avatarStatus.requestedAvatar}`);

			return this.sendReplyBox(`<div><div>Approved avatar request of ${targetId}</div><div>${createRawAvatarHtml(avatarStatus.requestedAvatar)}</div></div>`);
		},
		deny(target) {
			this.checkCan('avatar');

			const targetId = toID(target);
			const avatarStatus = avatars[targetId];

			if (!avatarStatus || !avatarStatus.requestedAvatar) {
				throw new Chat.ErrorMessage(`No avatar request for ${targetId}`);
			}

			updateAvatarStatus(targetId, {
				requestedAvatar: undefined,
			});

			FS(`./config/avatars/requests/${avatarStatus.requestedAvatar}`).unlinkIfExistsSync();

			return this.sendReply(`Denied avatar request of ${targetId}`);
		},
		on(target, room, user) {
			updateAvatarStatus(user.id, {enabled: true});

			return this.sendReplyBox('<div>Enabled custom avatar.<div>');
		},
		off(target, room, user) {
			updateAvatarStatus(user.id, {enabled: false});

			return this.sendReplyBox('Disabled custom avatar.');
		},
	},
};

export const loginfilter: Chat.LoginFilter = user => {
	const avatarStatus = avatars[user.id];
	if (avatarStatus && avatarStatus.enabled && avatarStatus.avatar) {
		user.avatar = avatarStatus.avatar;
	}
};
