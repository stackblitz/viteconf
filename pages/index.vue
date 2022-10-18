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
			<a href="/2022/replay" class="social-button blue feature centered">
				Watch the 2022 replay!
			</a>
			<ConferenceInfoCta sgnupPage="https://viteconf.org" />
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
	margin-top: 1.5rem;
	margin-bottom: 1rem;
	font-size: 2.25rem;
}
</style>
