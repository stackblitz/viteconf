<script lang="ts" setup>
import '@@/assets/css/global.scss';
import { speakers } from '~~/conference';

const route = useRoute();
const screenName = route.params.username as keyof typeof speakers;

if (screenName) {
	useSpeakerHead(screenName);
} else {
	useMainHead({ ae: true });
}
</script>

<template>
	<div>
		<EcosystemBackground />
		<UserActions />
		<main>
			<HeroBanner />
			<WatchReplay />
			<SpeakerList :focused-speaker="screenName" layout="card" />
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
	overflow: hidden;
	@media screen and (max-width: 1000px) {
		gap: 0;
	}
}
</style>
