<script lang="ts" setup>
import { useLiveHead } from '~~/composables/useHead';
import { talks } from '~~/conference';
import { talkTitleToSlug } from '~~/helpers/utils';

const { currentTalk, upcomingTalks } = $(usePlayerCurrentSchedule());

useMainHead();

const route = useRoute();

let queryTalk = (route.query.talk as string)?.toLowerCase();
if (queryTalk === 'hosting_and_the_edge') {
	queryTalk = 'vite__aws_amplify';
}

const talk = Object.values(talks).find(
	(talk) => talkTitleToSlug(talk.title) === queryTalk
);

if (!talk) {
	useMainHead({ ae: true });
} else {
	useLiveHead(talk);
}

onMounted(() => {
	import('@widgetbot/html-embed');

	if (upcomingTalks.length > 0)
		window.scrollTo({
			behavior: 'smooth',
			top: 0,
		});
});

const chatOpen = useChatOpen();
</script>

<template>
	<div>
		<EcosystemBackground />
		<HeroBanner />
		<WatchReplay />
		<!--main>
			<PlayerActions />

			<PlayerDialog></PlayerDialog>

			<div class="top-area">
				<LiveVideo />

				<div v-show="chatOpen" class="discord-chat">
					<widgetbot
						server="804011606160703521"
						channel="997209205222158347"
						shard="https://e-viteconf.widgetbot.co"
						width="100%"
						height="100%"
					/>
				</div>
			</div>
			<div class="current-talk" v-if="currentTalk">
				<PlayerTalk :talk="currentTalk" :isLive="true" />
			</div>
		</main-->

		<PlayerSchedule :show-live-talk-link="true" :isLive="true" />
		<Partners />
		<Footer />
	</div>
</template>

<style scoped lang="scss">
main {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	gap: 1rem;
	padding-top: 3.2rem;
	padding-bottom: 4.6rem;
	@media screen and (max-width: 1000px) {
		gap: 0;
	}
	@media screen and (max-width: 600px) {
		height: 60vh;
		max-height: 100%;
		padding-top: 5rem;
	}
}

.current-talk {
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	z-index: 999;
	@media screen and (max-height: 700px) {
		position: relative;
	}
}

.discord-chat {
	height: 100%;
	width: 400px;
}

.top-area {
	display: grid;
	grid-template-columns: 1fr auto;

	width: 98%;
	height: 100%;
	gap: 1rem;

	@media screen and (max-width: 1200px) {
		.discord-chat {
			display: none;
		}
	}
	@media screen and (max-height: 700px) {
		display: flex;
		height: unset;
	}
	border-radius: 9px;
	background-color: var(--app-color-shell); //#313338; //#37393f;
}
</style>
