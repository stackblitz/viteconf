<script lang="ts" setup>
import '@@/assets/css/global.scss';

useMainHead({ ae: true });
</script>

<template>
	<div>
		<EcosystemBackground />
		<main>
			<HeroBanner />
			<WatchReplay />
			<TalkList />
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
