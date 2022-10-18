<script lang="ts" setup>
import '@fontsource/roboto-mono/500.css';
import DiscordIcon from '~icons/mdi/discord';
import PrevIcon from '~icons/mdi/skip-previous';
import NextIcon from '~icons/mdi/skip-next';
import {
	liveTwitterMessagesShareTalk,
	TalkData,
} from '~~/conference';
import { discordLink, liveTranscriptsLink } from '~~/helpers/constants';

const player = $(usePlayerVideo());
const { previousTalk, nextTalk } = $(usePlayerCurrentSchedule());

const { talk, isLive = false } = defineProps<{
	isLive?: boolean;
	talk: TalkData;
}>();

const hasSpeaker = (talk: TalkData) => talk.speaker?.displayName !== 'TBD';

let discordProtocol = $ref(false);
let showMode = $ref(false);

const share = async () => {
	let tweetText: string;
	
	if (!talk.speaker || talk.speaker.displayName === 'TBD') {
		tweetText = isLive ? `I am watching ViteConf live! Come watch!` : ``;
	} else {
		const messages = liveTwitterMessagesShareTalk;
		const message =
			messages[Math.floor(Math.random() * messages.length)] ?? messages[0];

		tweetText = message(talk.speaker);
		
	}
	
	const baseUrl = isLive ? 'https://viteconf.org/live' : 'https://viteconf.org/2022/replay';

	const url = `${baseUrl}/${talk.key}`;

	const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${tweetText}`;

	window.open(twitterUrl, '_blank');
};

function getDiscordChatLink() {
	return `${discordProtocol ? 'discord://' : 'https://'}${talk.speaker?.chat ?? (talk.participants?.[0].chat ?? discordLink) }`;
}

let timeout;
function toggleDiscordProtocol() {
	discordProtocol = !discordProtocol;
	showMode = true;
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		showMode = false;
	}, 2000);
}
</script>

<template>
	<div
		class="talk"
		:class="{
			adapt: talk.participants,
		}"
	>
		<div class="talk-container">
			<div :class="`actions${showMode ? ' show-mode' : ''}`">
				<span class="video-controls" v-if="!isLive">
					<button
						title="Previous Talk"
						class="social-button previous-talk"
						:disabled="player && !previousTalk"
						@click="skipToTalk(previousTalk)"
					>
						<PrevIcon />
					</button>
					<button
						title="Next Talk"
						class="social-button next-talk"
						:disabled="player && !nextTalk"
						@click="skipToTalk(nextTalk)"
					>
						<NextIcon />
					</button>
				</span>
			</div>
			<div class="talk-content">
				<div class="talk-info">
					<div class="play-indicator"></div>
					<p class="title">
						{{ talk.shortTitle ?? talk.title }}
					</p>
					<template v-if="talk.participants">
						<p class="speakers-container">
							<NuxtLink
								v-for="(participant, i) in talk.participants"
								v-bind:key="i"
								style="cursor: pointer"
								:to="`/speakers/${participant?.screenName}`"
								class="speaker"
							>
								{{
									`@${participant?.screenName}` +
									(i < talk.participants.length - 1 ? ', ' : '')
								}}
							</NuxtLink>
						</p>
					</template>
					<template v-else>
						<p class="speakers-container">
							<NuxtLink
								:to="`/speakers/${talk.speaker?.screenName}`"
								style="cursor: pointer"
								class="speaker"
								v-if="hasSpeaker(talk)"
							>
								{{ talk.speaker?.displayName }}
							</NuxtLink>
						</p>
					</template>
				</div>
			</div>
			<div :class="`actions${showMode ? ' show-mode' : ''}`">
				<a v-if="isLive" target="_blank" class="social-button" :href="liveTranscriptsLink">
					Transcript
				</a>
				<button class="social-button share" @click="share">Share</button>
				<a target="_blank" class="social-button discuss" :href="getDiscordChatLink()">{{
					showMode
						? discordProtocol
							? 'Open in App'
							: 'Open in Tab'
						: 'Discuss'
				}}</a>
				<button
					:title="
						discordProtocol
							? 'Open chat in a new tab'
							: 'Open chat in Discord App'
					"
					:class="`social-button discord-button${
						discordProtocol ? ' discord-protocol' : ''
					}`"
					@click="toggleDiscordProtocol"
				>
					<DiscordIcon />
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
$breakpoint-md: 760px;

.talk {
	display: flex;
	justify-content: center;
	width: 100%;
	background-color: var(--app-color-shell);
	@media screen and (max-width: $breakpoint-md) {
		gap: 1rem;
		width: 100%;
		padding: 0 12px;
		max-height: 180px;
	}
}

.talk-container {
	--mobile-button-padding: 216px;
	position: relative;
	display: flex;
	align-items: flex-start;
	gap: 2rem;
	width: 99%;
	background-color: #ffffff0c;
	border-radius: 9px;
	padding: 0.4rem;
	--talk-border-color: var(--app-color-foreground-violet-mid-transp);
	transition: background-color 0.1s ease, padding 0.3s ease;
	@media screen and (max-width: 1000px) {
		flex-direction: column;
		gap: 1rem;
	}
	@media screen and (max-width: 600px) {
		gap: 0.6rem;
	}
}

.talk-content {
	flex: 1;
	display: flex;
	gap: 1.9rem;
	padding: 0.8rem 0rem;
	@media screen and (max-width: $breakpoint-md) {
		padding-top: 14px;
		padding-left: 14px;
		gap: 2.2rem;
	}
	@media screen and (max-width: 600px) {
		width: 100%;
		padding-left: 14px;
	}
}

.talk-info {
	flex: 1;
	display: flex;
	align-items: center;
	gap: 1.4rem;
	@media screen and (max-width: 600px) {
		gap: 0.6rem;
		padding-left: 14px;
		flex-direction: column;
	}
}

.play-indicator {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background-image: url('/images/icons/wave-sine.svg');
	background-size: 20px;
	background-repeat: repeat-x;
	background-position-y: center;
	background-position-x: -8px;
	box-shadow: 0 0 8px 2px #00c6ab, 0 0 0 1px #00c6ab;
	animation: playBg linear 2s infinite;
	@media screen and (max-width: 750px) {
		display: none;
	}
}
@keyframes playBg {
	0% {
		background-position-x: 0px;
	}
	100% {
		background-position-x: -20px;
	}
}

.title {
	color: #fff;
	max-width: 80%;
	font-size: 0.9rem;
	font-weight: 700;
	line-height: 0.8;
	@media screen and (max-width: $breakpoint-md) {
		font-size: 1.1rem;
		max-width: calc(100% - 96px);
	}
}

.speakers-container {
	display: flex;
	gap: 0.3rem;
}

.speaker {
	opacity: 0.8;
	color: var(--app-color-foreground-violet-light);
	font-size: 0.8rem;
	font-weight: 500;
	&:hover {
		color: #fff;
	}
}

.talk.blank {
	min-height: unset;
	opacity: 0.8;
	@media screen and (max-width: $breakpoint-md) {
		padding-bottom: 0;
	}

	.avatar,
	.logo {
		display: none;
	}
	.title {
		color: var(--app-color-foreground-violet-light);
	}
}
.talk:hover {
	.title {
		color: white;
	}
}

.talk {
	max-height: unset;
	height: unset;
	align-items: center;
	padding: 0.6rem 0.4rem;
}

.actions {
	display: flex;
	align-self: stretch;
	gap: 0.3rem;
}
.actions button,
.actions a {
	color: var(--app-color-foreground-violet-light);
	min-width: 150px;
	height: unset;
	display: flex;
	padding: 0;
	font-size: 0.8rem;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-shadow: none;
	@media screen and (max-width: 1350px) {
		min-width: unset;
		padding: 12px 16px;
	}
}

.actions button:hover,
.actions a:hover {
	transform: none;
	box-shadow: inset 0 0 0 1px var(--app-color-foreground-violet);
}

.actions button:not(.discord-button):hover,
.actions a:hover {
	color: #fff;
}
.actions.show-mode a {
	color: #fff;
}

button.discord-button {
	width: 4rem;
	padding-left: 0.2rem;
	padding-right: 0.2rem;
	min-width: 4rem;
}
button.discord-button.discord-protocol {
	//outline: 1.25px solid var(--app-color-foreground-violet-light);
	color: white;
}
button.discord-button:hover {
	outline: none;
	color: white;
}

.video-controls {
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
}
.video-controls button.social-button {
	min-width: 3.2rem;
}

.video-controls button.social-button svg {
	transform: scale(1.4);
}
.video-controls button.social-button:disabled svg {
	opacity: 0.5;
}

@media screen and (max-width: 1200px) {
	.actions .discord-button, .actions .discuss {
		display: none;
	}
}
@media screen and (max-width: 1100px) {
	.actions .share {
		display: none;
	}
}
@media screen and (max-width: 1000px) {
	.actions {
		display: none;
	}
	.talk-content {
		padding-left: 1rem;
	}
}
</style>
