<script setup lang="ts">
let replayCurrentTime = $(useReplayCurrentTime());
let player = $(usePlayerVideo());

const route = useRoute();
const talk = useTalkFromRoute();
let tQuery = (route.query.t as string ?? route.params.marker as string)?.toLowerCase();
function tExtract(t: string, re: RegExp) {
	return +t.match(re)?.[1] ?? 0
}
function tToSeconds(t: string) {
	const hours = tExtract(t, /(\d+)h/);
	const minutes = tExtract(t, /(\d+)m/);
	const seconds = tExtract(t,/(\d+)s/);
	console.log({ t, hours, minutes, seconds });
	return (hours * 60 + minutes) * 60 + seconds;
}

onMounted(() => {
	
	// 2. This code loads the IFrame Player API code asynchronously.
	let tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	let firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// 3. This function creates an <iframe> (and YouTube player)
	//    after the API code downloads.
	function onReady() {
		player.setVolume(25);
		setTimeout(() => {
			player?.unMute();
		}, 500);
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
			videoId: 'Znd11rVHQOE',
			playerVars: {
				'playsinline': 1,
				'autoplay': 1,
				'mute': 1,
				'rel': 0,
				'start': talk?.time ?? (tQuery ? tToSeconds(tQuery) : 0),
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
