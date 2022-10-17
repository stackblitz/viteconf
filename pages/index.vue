<script lang="ts" setup>
import '@@/assets/css/global.scss';

useMainHead();

onMounted(() => window.scrollTo?.({ behavior: 'smooth', top: 0 }));
</script>

<template>
	<div>
		<EcosystemBackground />
		<UserActions />
		<main>
			<HeroBanner />
			<ConferenceInfoCta sgnupPage="https://viteconf.org" />
			<WatchReplay />
			<SpeakerList
				:focused-speaker="undefined"
				layout="grid"
			/>
			<SocialActions />
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
h4 {
	margin-top: 3rem;
	font-size: 5rem;
}

a.social-button.feature {
	margin-top: -2rem;
	font-size: 2.25rem;
}
</style>
