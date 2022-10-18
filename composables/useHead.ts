import { talkTitleToSlug } from '~~/helpers/utils';
import { mcs, SpeakerData, speakers, TalkData } from '../conference';
import type { TicketInfo } from './useFirebase';

function viteConfHead({
	title,
	ogTitle,
	description,
	image,
	url,
	ae = false,
}: {
	description: string;
	title: string;
	ogTitle?: string;
	image: string;
	url: string;
	ae?: boolean;
}) {
	return {
		title,
		description,
		viewport: 'width=device-width, initial-scale=1, maximum-scale=6',
		charset: 'utf-8',
		link: [{ rel: 'icon', href: '/images/viteconf.svg' }],
		meta: [
			{ name: 'description', content: description },
			{ name: 'og:type', content: 'website' },
			{ name: 'og:title', content: ogTitle ?? title },
			{ name: 'og:image', content: image },
			{ name: 'og:url', content: url },
			{ name: 'og:description', content: description },
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:site', content: '@viteconf' },
			{ name: 'twitter:creator', content: '@viteconf' },
		],
		htmlAttrs: {
			lang: 'en',
		},
		...(ae && { script: [{ src: '/ae.js', defer: true }] }),
	};
}

export function useMainHead({ ae }: { ae?: boolean } = {}) {
	useHead(
		viteConfHead({
			title: `ViteConf`,
			description: `A free online conference about Vite and the projects reimagining Web Development, brought to you by StackBlitz`,
			image: viteconfSocialImageUrl,
			url: 'https://viteconf.org',
			ae,
		})
	);
}

export function useTicketHead(ticket: TicketInfo) {
	const title = `${ticket.displayName ?? ticket.screenName} Ticket to ViteConf`;
	const description = `A free online conference about Vite and the projects reimagining Web Development, brought to you by StackBlitz`;
	const socialImageUrl = getTicketSocialImageUrl(
		ticket.screenName,
		ticket.favoriteFrameworks?.split(',')[0] ?? 'vite'
	);
	useHead(
		viteConfHead({
			title,
			description,
			image: socialImageUrl,
			url: `https://viteconf.org/tickets/${ticket.screenName}`,
			ae: true,
		})
	);
}

const ogVersion = 'v8';

export function useSpeakerHead(screenName: string) {
	const speaker = speakers[screenName.toLowerCase()];
	useHead(
		viteConfHead({
			title: `${speaker.displayName ?? screenName} Ticket to ViteConf`,
			description: `A free online conference about Vite and the projects reimagining Web Development, brought to you by StackBlitz`,
			image: getTicketSocialImageUrl(screenName, ogVersion),
			url: `https://viteconf.org/speaker/${screenName}`,
			ae: true,
		})
	);
}

function makeString(arr: string[]) {
	if (arr.length === 1) return arr[0];
	const firsts = arr.slice(0, arr.length - 1);
	const last = arr[arr.length - 1];
	return firsts.join(', ') + ' and ' + last;
}

export function useLiveHead(talk: TalkData) {
	const speakersInvolvedStr =
		talk.speaker?.displayName ??
		makeString(talk.participants.map((s) => s.screenName));

	useHead(
		viteConfHead({
			title: `ViteConf`,
			ogTitle: `${talk.shortTitle ?? talk.title} - Viteconf`,
			description: `Watch ${speakersInvolvedStr} talk about ${
				talk.shortTitle ?? talk.title
			} at ViteConf`,
			image: `https://viteconf.org${talk.slideImage}`,
			url: `https://viteconf.org/live?talk=${talkTitleToSlug(talk.title)}`,
			ae: true,
		})
	);
}

export function useReplayHead(talk: TalkData) {
	if(talk) {	
		const speakersInvolvedStr =
			talk.speaker?.displayName ??
			makeString(talk.participants.map((s) => s.screenName));

		useHead(
			viteConfHead({
				title: `ViteConf`,
				ogTitle: `${talk.shortTitle ?? talk.title} - Viteconf`,
				description: `${
					talk.shortTitle ?? talk.title
				} | ${speakersInvolvedStr} | ViteConf 2022`,
				image: `https://viteconf.org${talk.slideImage}`,
				url: `https://viteconf.org/2022/replay/${talk.key}`
			})
		);
	}
	else {
		useHead(
			viteConfHead({
				title: `ViteConf 2022 Replay`,
				description: `A free online conference about Vite and the projects reimagining Web Development, brought to you by StackBlitz`,
				image: `https://viteconf.org/images/viteconf-2022-replay.png`,
				url: `https://viteconf.org/2022/replay`
			})
		);
	}
}

export function useSpeakerChatHead(screenName: string) {
	const speaker = speakers[screenName.toLowerCase()] as SpeakerData;
	useHead(
		viteConfHead({
			title: `Chat about ${speaker.displayName ?? screenName}'s talk!`,
			description: speaker.talk.description,
			image: getTicketSocialImageUrl(screenName, ogVersion),
			url: `https://viteconf.org/chat/${screenName}`,
			ae: false,
		})
	);
}

export function useMCHead(screenName: string) {
	const mc = mcs[screenName.toLowerCase()];
	useHead(
		viteConfHead({
			title: `${mc.displayName ?? screenName} Ticket to ViteConf`,
			description: `A free online conference about Vite and the projects reimagining Web Development, brought to you by StackBlitz`,
			image: getTicketSocialImageUrl(screenName, ogVersion),
			url: `https://viteconf.org/tickets/${screenName}`,
			ae: true,
		})
	);
}

export function useCustomHead(
	{
		title,
		description,
		image,
		url,
	}: { title: string; description: string; image: string; url: string },
	{ ae }: { ae?: boolean } = {}
) {
	useHead(viteConfHead({ title, description, image, url, ae }));
}
