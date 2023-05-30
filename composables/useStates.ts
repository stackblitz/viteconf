import { createBlankTicket } from '@@/helpers/utils';
import { User as FirebaseUser } from 'firebase/auth';
import { TalkData } from '~/conference';

export const useFirebaseUser = () =>
	useState<FirebaseUser | null>('firebaseUser', () => null);

export type User = {
	uid: string;
};
export const useUser = () => useState<User | null>('user', () => null);

export const useFirebaseUserInit = () =>
	useState('firebaseUserInit', () => false);

export const useTicket = () => useState('ticket', createBlankTicket);

export const useCreatingTicket = () => useState('creatingTicket', () => false);

export const useChatOpen = () => useState('chatOpen', () => true);

export const useFullLogo = () => useState('fullLogo', () => true);

export function hideFullLogo() {
	setTimeout(() => {
		useFullLogo().value = false;
	}, 5000);
}

export const usePlayerVideo = () => useState<any>('playerVideo', () => null);

export const useReplayCurrentTime = () =>
	useState('replayCurrentTime', () => 0);

export function skipToTalk(talk: TalkData) {
	const player = usePlayerVideo();
	if (player) {
		const { key, time } = talk;
		window.history?.replaceState({ key }, '', `/2022/replay/${key}`);
		player.value.seekTo(time);
		player.value.playVideo();
		window.scrollTo(0, 0);
	}
}
