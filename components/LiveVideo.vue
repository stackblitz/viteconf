<template>
	<div class="iframe-container">
		<!-- Use &mute=1 in src to start muted -->
		<iframe
			loading="lazy"
			width="1120"
			height="730"
			src="https://www.youtube-nocookie.com/embed/WHcmXlei33I?autoplay=1"
			title="Viteconf livestream"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	</div>
</template>

<style scoped lang="scss">
.iframe-container {
	overflow: hidden;
	/* 16:9 aspect ratio */
	padding-top: 56.25%;
	position: relative;

	width: 100%;
	height: auto;
	@media screen and (max-height: 700px) {
		height: 80vh;
		max-height: 100%;
		padding-top: 0;
	}
}

.iframe-container iframe {
	height: 100%;
	width: 100%;
	left: 0;
	position: absolute;
	top: 0;
}
</style>
