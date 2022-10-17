<script lang="ts" setup>
import '@@/assets/css/global.scss';
import { SpeakerData, speakers, talks } from '@@/conference';
import { talkTitleToSlug } from '@@/helpers/utils';

const route = useRoute();
let forceDefaultSocialImage = false;
let slug = route.params.slug as string;
if (slug === 'hosting_and_the_edge') {
	slug = 'vite__aws_amplify';
	forceDefaultSocialImage = true;
}

const customSocialImages = {
	vite_panel: {
		title: 'ViteConf (Oct 11-12th) - Vite Live Panel',
		description: `Join Evan You, Anthony Fu, Matias Capeletto, Bjorn Lu, Haoqun Jiang, and Shinigami in a panel about the future of Vite moderated by This Dot Labs' Tracy Lee.`,
		url: 'https://viteconf.org/schedule/vite_panel',
		image: 'https://viteconf.org/images/vite-panel.png',
	},
	frameworks_panel: {
		title: 'ViteConf (Oct 11-12th) - Frameworks Live Panel',
		description: `Join Daniel Roe (Nuxt), Fred K. Schott (Astro), Ben McCann (SvelteKit), Ryan Carniato (SolidStart), Bret Little (Hydrogen), and Miško Hevery (Qwik) in a panel about the future of Web frameworks moderated by This Dot Labs' Jesse Tomchak.`,
		url: 'https://viteconf.org/schedule/frameworks_panel',
		image: 'https://viteconf.org/images/frameworks-panel.png',
	},
	stackblitz_keynote: {
		title: 'ViteConf (Oct 11-12th) - StackBlitz Keynote',
		description: `Join Sylwia Vargas, Tomek Sułkowski, and Eric Simons in their quest to make development workflows instant.`,
		url: 'https://viteconf.org/schedule/stackblitz_keynote',
		image: 'https://viteconf.org/images/stackblitz-keynote.png',
	},
};

if (!slug || forceDefaultSocialImage) {
	useMainHead({ ae: true });
} else {
	const custom = customSocialImages[slug];
	if (custom) {
		useCustomHead(custom, { ae: true });
	} else {
		let speaker: SpeakerData = speakers[slug.toLowerCase()];
		if (!speaker) {
			speaker = Object.values(talks).find(
				(talk) => talkTitleToSlug(talk.title) === slug
			)?.speaker;
		}
		if (speaker) {
			useSpeakerHead(speaker.screenName);
		} else {
			useMainHead({ ae: true });
		}
	}
}
</script>

<template>
	<div>
		<EcosystemBackground />
		<UserActions />
		<main>
			<HeroBanner />
			<WatchReplay />
			<ConferenceSchedule :focused-talk="slug" />
			<Partners />
		</main>

		<Footer />
	</div>
</template>

<style scoped lang="scss">
main {
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	justify-items: center;
	gap: 1rem;
	@media screen and (max-width: 1000px) {
		gap: 0;
	}
}
</style>
