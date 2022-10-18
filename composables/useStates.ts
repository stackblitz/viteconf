import { createBlankTicket } from '@@/helpers/utils';
import { User as FirebaseUser } from 'firebase/auth';

export const useFirebaseUser = () => useState<FirebaseUser | null>('firebaseUser', () => null);

export type User = {
	uid: string
}
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

export const useReplayCurrentTime = () => useState('replayCurrentTime', () => 0);

