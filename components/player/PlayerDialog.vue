<script setup lang="ts">
import { vFocusTrap } from '#imports';
import { useLocalStorage } from '@vueuse/core';
import { liveTranscriptsLink } from '~~/helpers/constants';

const {
	isLive = false
} = defineProps<{
	isLive?: Boolean;
}>();

const dispatch = defineEmits<{
	(e: 'open'): void;
	(e: 'close', message: string | undefined): void;
}>();

// Accept CoC agreement from live page
let livePageDialogDismissed = $(
	useLocalStorage('viteconf:livePageDialogDismissed', false)
);
let playerDialogDismissed = $(
	useLocalStorage('viteconf:2022:playerDialogDismissed', false)
);

const full = useFullLogo();

let dialogEl = ref<HTMLDivElement>();

let isOpen = $ref(false);

function open() {
	dispatch('open');
	isOpen = true;
}

function close(message?: string) {
	dispatch('close', message);

	isOpen = false;

	playerDialogDismissed = true;

	hideFullLogo();
}

watchEffect(() => {
	if (globalThis.document?.body)
		globalThis.document.body.style.overflowY = isOpen ? 'hidden' : '';
});

watchEffect(() => {
	if (!import.meta.env.SSR) {
		if (!livePageDialogDismissed && !playerDialogDismissed) {
			open();
		} else {
			hideFullLogo();
		}
	}
});

defineExpose({
	open,
	close,
});
</script>

<template>
	<Teleport to="body">
		<section v-if="isOpen" class="overlay">
			<div
				v-focus-trap
				@click.stopPropagation="() => {}"
				ref="dialogEl"
				class="dialog"
				role="dialog"
				aria-label="Read the Code of Conduct, chat on discord, and more"
				aria-describedby="info-description"
				tabindex="0"
			>
				<header class="dialog-header">
					<h1>
						Welcome to
						<img
							aria-hidden="true"
							role="presentation"
							width="32"
							height="32"
							alt="ViteConf logo"
							src="/images/viteconf.svg"
						/>
						<span class="logo-text">ViteConf</span>
						2022
					</h1>
				</header>

				<section class="dialog-content">
					<div class="conf-links">
						<a v-if="isLive" :href="liveTranscriptsLink" target="_blank"
							>Read the live transcripts</a
						>
						<a href="https://chat.vitejs.dev" target="_blank"
							><span
								>Join <strong>chat.vitejs.dev</strong><br />
								{{ `Chat with the ${isLive ? 'speakers' : 'community'}!` }}</span
							></a
						>
					</div>
					<div class="coc-container">
						<h2>ViteConf Code of Conduct</h2>
						<ul>
							<li><b>Be respectful and kind</b></li>
							<li>Do not use sexualized language or imagery</li>
							<li>No insulting/derogatory comments</li>
							<li>No personal or political attacks</li>
							<li>No public or private harassment</li>
							<li>Do not publish others' private information</li>
						</ul>
						<a href="/CoC" target="_blank"
							>Full Code of Conduct at <span>viteconf.org/CoC</span></a
						>
					</div>
				</section>

				<button class="dialog-cta" @click="close()">
					{{ `I agree with the Code of Conduct. Let's ${isLive ? 'join' : 'watch'}!` }}
				</button>
			</div>
		</section>
	</Teleport>
</template>

<style scoped lang="scss">
.overlay {
	position: fixed;
	display: flex;
	justify-content: center;
	align-content: center;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	z-index: 4000;
	background-color: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(6px);
	-webkit-backdrop-filter: blur(6px);
}

.dialog {
	display: flex;
	flex-direction: column;
	align-items: center;
	align-self: center;
	justify-self: center;
	gap: 1rem;
	padding: 3.2rem 2.4rem;
	border-radius: 1.6rem;
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
	background-color: rgb(19, 21, 25);
	background-image: radial-gradient(
			80% 80% at 100% -10%,
			rgba(225, 0, 162, 0.08) 0%,
			rgba(230, 0, 165, 0) 100%
		),
		radial-gradient(
			80% 80% at -4% -10%,
			rgba(0, 128, 183, 0.15) 0%,
			rgba(7, 178, 251, 0) 100%
		),
		linear-gradient(0deg, rgba(4, 0, 5, 0.1) 62%, rgba(17, 4, 21, 0.6) 100%);
	overflow-y: auto;
	max-height: 80vh;
	@media screen and (max-width: 868px) {
		gap: 2rem;
		padding: 3rem 1rem 8rem;
		border-radius: 0;
	}
}

.dialog-header {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.6rem;
	width: 100%;
}

.dialog-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2.8rem;
	@media screen and (max-width: 768px) {
		gap: 2rem;
	}
}

.coc-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	max-width: 900px;
	padding: 2.6rem 2.4rem;
	border-radius: 0.62rem;
	margin-bottom: 1.5rem;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.8);
	background: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(120px);
	-webkit-backdrop-filter: blur(120px);

	a {
		font-size: 0.85rem;
		opacity: 0.8;
		&:hover {
			text-decoration: underline;
			opacity: 1;
		}
		span {
			color: #ff87fa;
		}
	}
}

h1 {
	display: flex;
	gap: 12px;
	font-size: 2rem;
	font-weight: 800;
	letter-spacing: -1px;
	text-align: center;
	img {
		transform: translateY(4px) scale(1.2);
	}
}

h2 {
	font-size: 1rem;
	font-weight: 700;
	text-align: center;
}

p {
	font-size: 0.75rem;
	opacity: 0.5;
	max-width: 90%;
	text-align: center;
	@media screen and (max-width: 768px) {
		font-size: 0.9rem;
		line-height: 1.6;
	}
}

ul {
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	padding: 0;
	padding-left: 1.2rem;
	font-size: 0.8rem;
	@media screen and (max-width: 768px) {
		padding-left: 0.6rem;
	}
	li {
		line-height: 1.4;
		opacity: 0.8;
		@media screen and (max-width: 768px) {
			font-size: 0.9rem;
			line-height: 1.5;
		}
	}
}

.logo-text {
	background-image: var(--app-background-gradient-blue_to_violet);
	background-clip: text;
	-webkit-text-fill-color: transparent;
	color: transparent;
}

.conf-links {
	display: flex;
	justify-content: center;
	gap: 0.6rem;
	width: 100%;
	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
}

.conf-links a {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0.6rem;
	color: rgba(255, 255, 255, 0.8);
	font-size: 0.75rem;
	font-weight: 600;
	line-height: 1.3;
	text-align: center;
	border-radius: 2rem;
	box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.05);
	transition: 0.16s ease;
	transition-property: background-color, box-shadow, color;
	strong {
		color: #ff87fa;
	}
	&:hover {
		color: #fff;
		box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.6);
		background-color: rgba(0, 0, 0, 0.24);
	}
	@media screen and (max-width: 768px) {
		min-height: 60px;
		font-size: 0.8rem;
	}
	@media screen and (max-width: 500px) {
		font-size: 1rem;
		line-height: 1.4;
	}
}

button.dialog-cta {
	--button-outline: var(--app-color-foreground-blue);
	display: flex;
	justify-content: center;
	align-items: center;
	color: rgba(255, 255, 255, 0.8);
	font-size: 0.85rem;
	font-weight: 600;
	margin-top: 0.5rem;
	padding: 1rem 4rem;
	border-radius: 2.2rem;
	box-shadow: 0 0 0 2px var(--button-outline);
	cursor: pointer;
	transition: 0.16s ease;
	transition-property: color, background-color, box-shadow, transform;
	&:hover {
		--button-outline: #fff;
		box-shadow: 0 0 0 2px var(--button-outline),
			0 2px 24px -6px rgba(255, 255, 255, 0.8);
		color: #fff;
		background-color: rgba(0, 0, 0, 0.4);
		transform: translateY(-3px);
	}
	@media screen and (max-width: 500px) {
		padding: 1rem 2rem;
		font-size: 1rem;
	}
}
</style>
