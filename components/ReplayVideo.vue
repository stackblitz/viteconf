<script setup>
let replayCurrentTime = $(useReplayCurrentTime())

onMounted(() => {
	
	// 2. This code loads the IFrame Player API code asynchronously.
	let tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	let firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// 3. This function creates an <iframe> (and YouTube player)
	//    after the API code downloads.
	let player;

	function onReady(event) {
		event.target.playVideo();
	}
	let done = false;
	function onStateChange(event) {
		if( event.data === 0 ) {
			// video ended
			replayCurrentTime = 12 * 60 * 60 * 3600 + 1;
			done = true;
		}
		else {
			done = false;
		}
	}
	window.onYouTubeIframeAPIReady = () => {
		player = new YT.Player('player', {
			height: '730',
			width: '1120',
			videoId: 'VvP24dN-ZmY',
			playerVars: {
				'playsinline': 1
			},
			events: {
				onReady,
				onStateChange
			}
		});
	}
	replayCurrentTime = 0;

	setInterval(() => {
		if (player && !done) {
			replayCurrentTime = player.getCurrentTime()
		}
	}, 1000);
})
</script>

<template>
	<div class="iframe-container">
		<div id="player" style="height: 100%;width: 100%;left: 0;position: absolute;top: 0;" frameborder="0" loading="lazy" title="Viteconf livestream" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></div>
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
</style>
