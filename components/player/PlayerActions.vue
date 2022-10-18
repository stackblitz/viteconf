<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core';
import ChatIcon from '~icons/mdi/chat';
import YouTubeIcon from '~icons/mdi/youtube';
import DiscordIcon from '~icons/mdi/discord';
import ShareIcon from '~icons/mdi/timeline-clock';

const smiggetEl = ref<HTMLDivElement>();

let opaqueUserActions = $ref(false);
useIntersectionObserver(
	smiggetEl,
	([{ isIntersecting }]) => (opaqueUserActions = !isIntersecting)
);

const chatOpen = $(useChatOpen());
const full = $(useFullLogo());
const time = $(useReplayCurrentTime());

let copiedToClipboard = $ref<string>();

function timeToHHMMSS(time) {
  const hours = Math.floor(time/(60*60));
  const minutes = Math.floor(time/60) - hours*60;
  const seconds = Math.floor(time) - hours*60*60 - minutes*60;
  return `${hours ? `${hours}h` : ''}${minutes ? `${minutes}m` : ''}${seconds}s`;
}

function copyUrl() {
	const shareURL = `https://viteconf.org/2022/replay/${timeToHHMMSS(time)}`;
	navigator.clipboard.writeText(shareURL);
	copiedToClipboard = shareURL;
	setTimeout(() => {
		copiedToClipboard = null;
	}, 2000);
}
</script>

<template>
	<div
		class="user-actions-container"
		:class="{ scrolling: opaqueUserActions, full }"
	>
		<NuxtLink to="/" title="ViteConf" class="logo">
			<img
				aria-hidden="true"
				role="presentation"
				width="32"
				height="32"
				src="/images/viteconf.svg"
			/>
			<span class="logo-text">ViteConf</span>
			<span class="logo-text stackblitz">Hosted By StackBlitz</span>
		</NuxtLink>

		<div class="actions">
			<button
				title="Get share link to current time"
				class="social-button copy-url"
				@click="copyUrl"
			>
				<span><ShareIcon style="transform: scale(1.1);"/>{{ copiedToClipboard ? `Copied` : `Copy URL` }}</span>
			</button>
			<a target="_blank" class="social-button subscribe" href="https://www.youtube.com/channel/UCXXpIonjN9ATkXjOJsOwvjg?sub_confirmation=1"
				><span><YouTubeIcon style="transform: scale(1.2);"/>Subscribe</span></a
			>
			<a target="_blank" class="social-button join-discord" href="https://chat.vitejs.dev"
				><span><DiscordIcon/>Join Discord</span></a
			>
			<button
				title="Toggle Chat"
				:class="`social-button discord-button${chatOpen ? ' chat-open' : ''}`"
				@click="chatOpen = !chatOpen"
			>
				<ChatIcon />
			</button>
		</div>
	</div>

	<div ref="smiggetEl" aria-hidden="true" class="smigget" />
</template>

<style scoped lang="scss">
$breakpoint-md: 760px;

span.stackblitz {
	font-weight: 400;
	opacity: 0;
	transition: opacity 0.5s ease-in-out;
}
.full span.stackblitz, .logo:hover span.stackblitz {
	color: white;
	opacity: 1;
	@media screen and (max-width: 600px) {
		display: none;
	}
}
.logo-text.stackblitz {
	@media screen and (max-width: 600px) {
		display: none;
	}
}

.user-actions-container {
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	top: 0;
	left: 0;
	width: 100%;
	height: 62px;
	padding: 0 6px;
	z-index: 30;
	transition: background-color 150ms ease-in;
	&.scrolling {
		background-color: #000;
	}
	@media screen and (max-width: $breakpoint-md) {
		height: 48px;
		padding: 0;
	}
}

.social-button {
	color: var(--app-color-foreground-violet-light);
	font-size: 0.8rem;
	transition: 0.16s ease;
	transition-property: color, box-shadow;
	&:hover {
		box-shadow: inset 0 0 0 1px var(--app-color-foreground-violet);
		background: var(--app-color-shell) !important;
	}
}

.smigget {
	width: 100%;
	height: 0.5px;
}

button {
	display: block;
	opacity: 0.6;
	cursor: pointer;

	opacity: 0.9;

	transition: opacity 150ms ease-in;
}

.logo:hover {
	opacity: 1;
}

.logo {
	display: flex;
	margin-left: 1rem;
	filter: sepia(1) hue-rotate(245deg) brightness(0.6) saturate(0.9);
}
.full .logo, .logo:hover {
	filter: none;
}

.logo-text {
	margin-left: 14px;
	font-size: 1.2rem;
	font-weight: 700;
	color: var(--app-color-foreground-violet-light);
	transition: 0.3s ease;
	@media screen and (max-width: 500px) {
		display: none;
		font-size: 1.4rem;
	}
}
.full .logo-text {
	color: white;
}

.logo:hover .logo-text {
	color: #fff;
}

.register-cta {
	display: flex;
	align-items: center;
	gap: 2rem;
	margin-right: 0.5rem;
}
.register {
	padding: 10px 24px;
	color: #fff;
	font-size: 0.9rem;
	font-weight: 700;
	border-radius: 4px;
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
	background: var(--app-color-background-blue);
	opacity: 1;
}

.user-actions {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.logout {
	padding: 0 1rem;
	img {
		width: 22px;
		height: 22px;
		@media screen and (max-width: 500px) {
			width: 20px;
			height: 20px;
		}
	}
}

.cta-text {
	font-size: 0.9rem;
	font-weight: 700;
	@media screen and (max-width: 800px) {
		display: none;
	}
}

.user-actions a.add-to-calendar.addeventatc {
	display: flex;
	align-items: center;
	gap: 2ch;
	color: #fff !important;
	background: none;
	height: 40px;
	margin: 0 0.6rem;
	padding: 0.4rem 1.4rem;
	font-size: 0.8rem;
	font-weight: 700;
	box-shadow: 0 0 0 1px var(--app-color-foreground-blue-50) !important;
	border-radius: 4px;
	transition: 0.1s ease;
	transition-property: background-color, box-shadow;
	&:hover {
		box-shadow: 0 0 0 1px var(--app-color-foreground-blue),
			0 0 16px 0 var(--app-color-foreground-blue) !important;
		background-color: var(--app-color-background-violet-dark);
	}
	@media screen and (max-width: 500px) {
		font-size: 0.9rem;
		padding: 0.72rem 0;
		box-shadow: none !important;
		background: none;
	}
	img {
		width: 16px;
		z-index: 10;
	}
}

.actions {
	display: flex;
	gap: 0.5rem;
	padding-top: 0.5rem;
	padding-right: 0.5rem;
}
.actions button,
.actions a {
	color: var(--app-color-foreground-violet-light);
	min-width: 150px;
	height: 3rem;
	display: grid;
	padding: 0;
	align-items: center;
	justify-items: center;
	cursor: pointer;
}

.actions button:hover,
.actions a:hover {
	transform: none;
}

.actions button:hover,
.actions a:hover {
	color: #fff;
}
.actions.show-mode a {
	color: #fff;
}

button.discord-button {
	width: 3rem;
	padding-left: 0.2rem;
	padding-right: 0.2rem;
	min-width: 3rem;
}
button.discord-button:not(.chat-open) {
	//outline: 1.25px solid var(--app-color-foreground-violet-light);
	color: white;
}
button.discord-button:hover {
	outline: none;
	background-color: #fff2;
}

.actions a span, .actions button span {
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
	align-items: center;
	justify-items: center;
}
.actions button.copy-url {
	width: 4rem;
}

@media screen and (max-width: $breakpoint-md) {
	.actions .join-discord, .actions .discord-button {
		display: none;
	}
}
@media screen and (max-width: 1000px) {
	.actions .subscribe, .actions .copy-url {
		display: none;
	}
}
</style>
