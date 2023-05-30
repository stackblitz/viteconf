<script lang="ts" setup>
let animateBg = ref(false);
onMounted(() => {
	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	if (!isSafari) {
		animateBg.value = true;
	}
});
</script>

<template>
	<section class="hero">
		<section class="photo">
			<div class="image-bg-container" :class="{ animate: animateBg }">
				<div class="image-bg" aria-hidden="true" />
			</div>
			<img alt="ViteConf logo" src="/images/viteconf.svg" />
		</section>
		<h1 class="heading">ViteConf</h1>
		<h2>
			Brought to you by
			<a href="https://stackblitz.com">
				<img alt="StackBlitz" src="/images/logos/stackblitz-logo.svg" />
			</a>
		</h2>
	</section>
</template>

<style scoped lang="scss">
h2 {
	font-weight: 500;
	font-size: 16px;
	color: var(--app-color-foreground-violet-light);
	@media screen and (max-width: 500px) {
		margin-top: 4px;
		font-size: 14px;
	}
	img {
		display: inline-block;
		vertical-align: middle;
		height: 22px;
		width: 105px;
		margin-left: 6px;
		margin-top: -2px;
		opacity: 0.8;
		@media screen and (max-width: 500px) {
			height: 20px;
		}
	}
}
.hero {
	width: 100%;
	display: grid;
	justify-items: center;
	overflow: hidden;
	@media screen and (max-width: 500px) {
		padding-top: 2.6rem;
	}
}

.heading {
	font-size: 5rem;
	font-weight: 700;

	width: max-content;

	background-image: var(--app-background-gradient-blue_to_violet);
	background-clip: text;
	-webkit-text-fill-color: transparent;

	position: relative;

	@media screen and (max-width: 1200px) {
		font-size: 4rem;
	}
}

.photo {
	--max-width: 240px;

	height: var(--max-width);

	position: relative;

	margin: 4rem 0 0 0;

	@media screen and (max-width: 1200px) {
		--max-width: 200px;
	}
	@media screen and (max-width: 500px) {
		--max-width: 150px;
	}

	img {
		filter: drop-shadow(-8px -8px 14px rgba(0, 0, 0, 0.6));
	}
}

.image-bg-container {
	position: absolute;
	top: 50%;
	left: 50%;
	transition: transform 2s;
	transform-origin: 0 0;
}

.image-bg-container.animate {
	transform: scale(1.3, 1.3);
}

.image-bg {
	border-radius: 50%;

	width: var(--max-width);
	height: var(--max-width);

	background-image: linear-gradient(-45deg, #bd34fe88 50%, #47caff88 50%);
	filter: blur(60px);
	transform: translate(-50%, -50%);
	transform-origin: center center;
}

.photo img {
	position: absolute;
	top: 50%;
	left: 50%;

	min-width: var(--max-width);
	width: var(--max-width);
	height: var(--max-width);

	transform: translate(-50%, -50%);
}
</style>
