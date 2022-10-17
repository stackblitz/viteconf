<script lang="ts" setup>
import { projects } from '~~/conference';
import { FRAMEWORKS } from '~~/helpers/constants';

const { params } = useRoute();

const framework =
	FRAMEWORKS.find(
		(framework) =>
			framework.toLowerCase() === (params.framework as string).toLowerCase()
	) || 'Vite';

const frameworkColor =
	projects[framework.toLowerCase() as keyof typeof projects].brandColor;

const title = `${framework} invites you to ViteConf`;
const description = `A free online conference about Vite and the projects reimagining Web Development, brought to you by StackBlitz`;
const socialImageUrl = getTicketSocialImageUrl('_', framework);

useHead({
	title,
	description,
	viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
	charset: 'utf-8',
	link: [{ rel: 'icon', href: '/images/viteconf.svg' }],
	meta: [
		{ name: 'description', content: description },
		{ name: 'og:type', content: 'website' },
		{ name: 'og:title', content: title },
		{ name: 'og:image', content: socialImageUrl },
		{ name: 'og:url', content: `https://viteconf.org/ecosystem/${framework}` },
		{ name: 'og:description', content: description },
		{ name: 'twitter:card', content: 'summary_large_image' },
		{ name: 'twitter:site', content: '@viteconf' },
		{ name: 'twitter:creator', content: '@viteconf' },
	],
	script: [{ src: '/ae.js', async: true, defer: true }],
});
</script>

<template>
	<div>
		<EcosystemBackground />

		<UserActions :cta="false" />

		<main>
			<div class="ticket-section valid">
				<TicketShowcase
					:og="false"
					:framework="framework"
					:ready="false"
					ticketType="landscape"
					:force-show-framework-logo="true"
				/>
			</div>

			<WatchReplay />

			<br /><br /><br /><br />

			<ConferenceInfoCta>
				The

				<span :style="{ color: frameworkColor }">
					{{ framework }}
				</span>

				community invites you!
			</ConferenceInfoCta>

			<Footer />
		</main>
	</div>
</template>

<style lang="scss" scoped>
main {
	margin: 0;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 480px 14rem;
	grid-template-areas:
		'ticket'
		'options';
	justify-items: center;
	align-items: center;
	gap: 0em;
	padding: 1em;
	height: 100vh;
	min-height: 740px;
	max-height: 1060px;
	position: relative;
	@media screen and (max-width: 1000px) {
		grid-template-rows: 480px 28rem;
	}
	@media screen and (max-width: 768px) {
		display: flex;
		flex-direction: column;
		max-height: unset;
		height: unset;
		overflow: hidden;
		padding-top: 4rem;
		gap: 3rem;
	}

	@media screen and (max-width: 400px) {
		padding-top: 5rem;
	}
}
</style>
