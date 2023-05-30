<script setup lang="ts">
import TwitterIcon from '~icons/mdi/twitter';
import { twitterMessages } from '../conference';

const route = useRoute();
const ticket = useTicket();

const ticketUrl = `https://viteconf.org${route.path}`;

async function shareOnTwitter() {
	const project = ticket.value.favoriteFrameworks.split(',')[0];
	// ensure we pre-generated the social image before tweeting
	await ensureSocialImage(ticket.value.screenName, project);
	const message =
		twitterMessages[Math.floor(Math.random() * twitterMessages.length)] ??
		twitterMessages[0];
	const tweetText = message(project);
	const twitterUrl = `https://twitter.com/intent/tweet?url=${ticketUrl}&text=${tweetText}`;
	window.location.href = twitterUrl;
}

const copiedToClipboard = ref<string | null>(null);

function copyUrl() {
	navigator.clipboard.writeText(ticketUrl);
	copiedToClipboard.value = ticketUrl;
	setTimeout(() => {
		copiedToClipboard.value = null;
	}, 2000);
}

const ticketSocialImage = useTicketSocialImage();
</script>

<template>
	<div class="ticket-sharing">
		<button class="twitter social-button blue" @click="shareOnTwitter">
			<TwitterIcon />
			Share on Twitter
		</button>
		<a
			title="Add to Calendar"
			class="social-button addeventatc"
			data-id="gn14349636"
			href="https://www.addevent.com/event/gn14349636"
			target="_blank"
		>
			<img src="/images/icons/calendar-check-solid.svg" /> Add to Calendar
		</a>

		<a target="_blank" :href="ticketSocialImage" class="social-button">
			<img
				aria-hidden="true"
				role="presentation"
				src="/images/icons/cloud-download-solid.svg"
			/>
			Download
		</a>
		<div
			:class="`clipboard-copy no-transform social-button${
				copiedToClipboard ? ' copied' : ''
			}`"
		>
			<span>{{ ticketUrl }}</span>
			<button
				:class="`no-transform slow-bg social-button${
					copiedToClipboard ? ' copied' : ''
				}`"
				@click="copyUrl"
			>
				<img
					aria-hidden="true"
					role="presentation"
					v-show="copiedToClipboard"
					src="/images/icons/check-solid.svg"
				/>
				<img
					aria-hidden="true"
					role="presentation"
					v-show="!copiedToClipboard"
					src="/images/icons/copy-light.svg"
					pre
				/>
				{{ copiedToClipboard ? 'Copied!' : 'Copy Share Url' }}
			</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.ticket-sharing {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	max-width: 800px;
	gap: 0.4rem;
}
.social-button {
	text-align: left;
	width: unset;
	gap: 28px;
	height: 56px;
	padding-top: 14px;
	padding-bottom: 14px;

	@media screen and (max-width: 1024px) {
		width: calc(50% - 28px);
	}
	@media screen and (max-width: 740px) {
		width: 100%;
	}
	span {
		margin-top: 2px;
		font-size: 0.9rem;
		line-height: 1.1;
		transition: color 0.16s ease;
	}
}

.social-button.twitter {
	font-weight: 800;
	svg {
		transform: scale(1.4);
	}
}

.social-button.slow-bg.copied {
	color: #fff;
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3);
	background-color: var(--app-color-background-blue);
	&:hover {
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
		background-color: var(--app-color-foreground-blue-bright);
	}
}

.clipboard-copy {
	display: flex;
	justify-content: space-between;
	padding-right: 0;
	gap: 52px;
	cursor: text;
	@media screen and (max-width: 1024px) {
		padding-left: 0;
	}
	& > span {
		color: rgba(255, 255, 255, 0.6);
		font-family: monospace;
		font-size: 0.85rem;
		@media screen and (max-width: 1024px) {
			display: none;
		}
	}
	.social-button {
		gap: 16px;
		width: 200px;
		padding: 10px 28px;
		font-size: 0.88rem;
		font-weight: 700;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		background: none;
		box-shadow: inset 2px 0 0 0 var(--app-color-foreground-violet-dark);
		z-index: 10;
		@media screen and (max-width: 1024px) {
			gap: 26px;
			width: unset;
			padding: 16px 36px;
			font-size: 1.1rem;
			font-weight: 600;
		}
		&:hover {
			color: #fff;
			background-color: var(--app-color-foreground-violet);
			transition: 0.16s ease;
			transition-property: background-color, box-shadow, color, text-shadow,
				transform;
		}
	}
	&:hover {
		span {
			color: #fff;
		}
		.social-button {
			box-shadow: inset 2px 0 0 0 var(--app-color-foreground-violet);
		}
	}
}

.social-button.addeventatc {
	display: flex;
	align-items: center;
	gap: 28px;
	padding: 16px 36px;
	padding-left: 32px;
	color: rgba(255, 255, 255, 0.9) !important;
	font-size: 1.1rem;
	font-weight: 600;
	border-radius: 5px;
	box-shadow: inset 0 0 0 2px var(--app-color-foreground-violet-dark) !important;
	background-color: var(--app-color-shell) !important;
	font-family: 'Inter', sans-serif !important;
	&:hover {
		box-shadow: inset 0 0 0 2px var(--app-color-foreground-violet) !important;
	}
	img {
		height: 22px;
	}
}
</style>
