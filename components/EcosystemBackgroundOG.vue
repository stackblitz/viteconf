<script lang="ts" setup>
import { useElementSize } from '@vueuse/core';

// Same as EcosystemBackground.vue, there seems to be an issue with v-bind and ::before, cloning to get around it

const { x = '50%', y = '320px' } = defineProps<{ x?: string; y?: string }>();

const { height: backgroundCoverHeight } = useElementSize(
	globalThis?.window?.document.body,
	{
		height: 2000,
		width: 2000,
	}
);

const backgroundEl = ref<HTMLDivElement>();
</script>

<template>
	<Teleport to="body">
		<div
			ref="backgroundEl"
			class="background"
			:style="{ height: backgroundCoverHeight + 'px', '--x': x, '--y': y }"
		/>
	</Teleport>
</template>

<style lang="scss" scoped>
.background {
	--x: 50%;
	--y: 320px;
	--size: 900px;
	--mask: radial-gradient(
		circle var(--size) at var(--x) var(--y),
		#0005 40%,
		#000 75%,
		transparent
	);

	overflow: hidden;
	width: 100%;
	height: 100%;

	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;

	mask-image: var(--mask);
	mask-size: 100%;
	mask-repeat: no-repeat;

	&::before {
		content: '';
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-image: url('/images/background.png');
		background-repeat: repeat;
		background-size: 40em;

		filter: grayscale(100%) opacity(0.1);
	}
}
</style>
