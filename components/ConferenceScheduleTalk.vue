<script lang="ts" setup>
import '@fontsource/roboto-mono/500.css';
import type { TalkData } from '~~/conference';
import { speakers } from '~~/conference';
import { waitFor } from '~~/helpers/wait-for';
import {
	logoPath,
	scheduleLinkFromTalkTitle,
	talkTitleToSlug,
	toTalkStartLocaleTime,
	toTalkStartTime,
} from '../helpers/utils';

const {
	talk,
	isFocused = false,
	replay = false,
	showLiveTalkLink = false,
	main = true,
	released = true,
} = defineProps<{
	talk: TalkData;
	isFocused?: boolean;
	replay?: boolean;
	main?: boolean;
	released?: boolean;
	/** Show the live talk link */
	showLiveTalkLink?: boolean;
}>();

const isBlank = (talk: TalkData) =>
	!talk.duration || !talk.title || talk.speaker === speakers.tbd;

const hasSpeaker = (talk: TalkData) => talk.speaker?.displayName !== 'TBD';

const talkHeight = $computed(() => `${talk.duration * 0.6}rem`);

let copiedToClipboard = $ref<boolean>();
function copyUrl() {
	const talkUrl =
		'https://viteconf.org' +
		(showLiveTalkLink
			? `/live?talk=${talkTitleToSlug(talk.title)}`
			: scheduleLinkFromTalkTitle(talk.title));

	navigator.clipboard.writeText(talkUrl);
	copiedToClipboard = true;
	setTimeout(() => {
		copiedToClipboard = null;
	}, 2000);
}

const talkEl = ref<HTMLDivElement>();
onMounted(async () => {
	await waitFor(20);

	if (isFocused) {
		talkEl.value.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});
	}
});

function formatTimeFromSeconds(seconds: number) {
	const hours = Math.floor(seconds/(60*60))
	const minutes = Math.floor((seconds - hours*60*60)/60)
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

const talkStartTime = $computed(() => {
	return replay ? formatTimeFromSeconds(talk.time) : toTalkStartTime(talk.start)
});
const talkLocalStartTime = $computed(() => {
	return replay ? formatTimeFromSeconds(talk.time) : toTalkStartLocaleTime(talk.start)
});

</script>

<template>
	<div
		class="talk"
		ref="talkEl"
		:class="{
			short: talk.duration < 10,
			blank: isBlank(talk),
			adapt: talk.participants,
		}"
	>
		<a
			v-if="hasSpeaker(talk)"
			class="header-anchor"
			:id="`schedule-${talk.speaker?.screenName?.toLowerCase()}`"
			aria-hidden="true"
			style="position: absolute; opacity: 0"
		>
			#
		</a>
		<a
			v-if="!isBlank(talk)"
			class="header-anchor"
			:id="`schedule-${talkTitleToSlug(talk.title)}`"
			aria-hidden="true"
			style="position: absolute; opacity: 0"
		>
			#
		</a>

		<div class="time-container" :class="{ blank: isBlank(talk) }">
			<p
				class="time"
				v-if="!isBlank(talk) && talk.start"
				:title="'Your locale time from ' + talkStartTime"
			>
				<ClientOnly :placeholder="talkStartTime">
					{{ talkLocalStartTime }}
				</ClientOnly>
			</p>

			<p class="duration">{{ talk.duration }} min</p>
		</div>

		<div class="talk-content">
			<img
				v-if="talk.speaker"
				loading="lazy"
				class="logo"
				:src="logoPath(talk.speaker)"
			/>
			<div :class="`talk-info ${talk.participants ? ' no-logo' : ''}`">
				<template v-if="!isBlank(talk)">
					<p v-if="replay && main" @click="skipToTalk(talk)" style="cursor: pointer;" class="title">
						{{ talk.shortTitle ?? talk.title }}
					</p>
					<NuxtLink v-else-if="released" :to="main ? `/2022/replay/${talk.key}` : talk.video" style="cursor: pointer;" class="title">
						{{ talk.shortTitle ?? talk.title }}
					</NuxtLink>
					<p v-else class="title">
						{{ talk.shortTitle ?? talk.title }}
					</p>
				</template>
				<template v-if="talk.participants">
					<NuxtLink
						v-for="(participant, i) in talk.participants"
						v-bind:key="i"
						style="cursor: pointer"
						:to="speakers[participant?.screenName] ? `/speakers/${participant?.screenName}` : `/tickets/${participant?.screenName}`"
						class="speaker"
					>
						{{ participant.displayName }}
					</NuxtLink>
				</template>
				<template v-else>
					<NuxtLink
						:to="speakers[talk.speaker?.screenName] ? `/speakers/${talk.speaker?.screenName}` : `/tickets/${talk.speaker?.screenName}`"
						style="cursor: pointer"
						class="speaker"
						v-if="hasSpeaker(talk)"
					>
						{{ talk.speaker?.displayName }}
					</NuxtLink>
				</template>

				<div class="share-talk-container" v-if="!isBlank(talk)">
					<button
						@click="copyUrl"
						class="share-talk"
						:class="{ copied: copiedToClipboard }"
					>
						<img
							src="/images/icons/check-solid.svg"
							alt=""
							v-if="copiedToClipboard"
						/>
						<img src="/images/icons/link-regular.svg" alt="" v-else />
						{{ copiedToClipboard ? 'Copied!' : 'Copy URL' }}
					</button>
				</div>
			</div>
		</div>

		<NuxtLink :to="`/speakers/${talk.speaker?.screenName}`">
			<img
				loading="lazy"
				height="68"
				width="68"
				class="avatar"
				v-if="talk.speaker?.avatar && hasSpeaker(talk)"
				:src="talk.speaker?.avatar"
			/>
		</NuxtLink>

		<div class="participants" v-if="talk.participants">
			<NuxtLink
				v-for="(participant, i) in talk.participants"
				v-bind:key="i"
				:to="`/speakers/${participant?.screenName}`"
			>
				<img
					loading="lazy"
					height="68"
					width="68"
					class="participant-avatar"
					:src="participant.avatar"
					style="cursor: pointer"
				/>
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped lang="scss">
$breakpoint-md: 760px;

.talk {
	--mobile-button-padding: 216px;
	position: relative;
	display: flex;
	align-items: flex-start;
	gap: 2rem;
	width: min(90%, 900px);
	max-height: 180px;
	height: v-bind(talkHeight);
	--talk-border-color: var(--app-color-foreground-violet-mid-transp);
	border-top: 1px solid var(--talk-border-color);
	transition: background-color 0.1s ease, padding 0.3s ease;
	&:last-child {
		border-bottom: 1px solid var(--talk-border-color);
	}
	@media screen and (min-width: $breakpoint-md) {
		&:hover {
			&:not(.blank) {
				background-color: var(--app-color-shell);
			}
			&.short:not(.blank) {
				align-items: center;
				@media screen and (max-width: $breakpoint-md) {
					height: 150px;
					.talk-content {
						padding-top: 0;
					}
				}
			}
			&.adapt {
				@media screen and (max-width: $breakpoint-md) {
					max-height: 260px;
					height: unset;
				}
			}
			.share-talk-container {
				max-height: 200px;
				opacity: 1;
				z-index: 1;
			}
			.share-talk {
				transform: translateX(0);
			}
			.time-container {
				color: #fff;
			}
			.talk-content {
				@media screen and (max-width: $breakpoint-md) {
					padding-bottom: 64px;
				}
			}
		}
	}
	@media screen and (max-width: $breakpoint-md) {
		gap: 1rem;
		width: 100%;
		padding: 0 12px;
		max-height: 180px;
	}
}

.time-container {
	--time-container-width: 156px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	top: 0;
	left: 0;
	height: 100%;
	min-width: var(--time-container-width);
	padding-top: 10px;
	padding-left: 12px;
	color: var(--app-color-foreground-violet-light);
	font-family: 'Roboto Mono', monospace;
	font-size: 0.86rem;
	font-weight: 600;
	border-right: solid 2px rgba(115, 70, 132, 0.2);
	background-color: #000;
	transition: 0.1s ease;
	transition-property: color;
	@media screen and (max-width: $breakpoint-md) {
		--time-container-width: 64px;
		justify-content: flex-start;
		gap: 4px;
		padding-top: 16px;
		padding-left: 0;
		font-size: 0.8rem;
		border: none;
		background-color: transparent;
	}
	&.blank {
		flex-direction: row;
		padding-top: 0;
		align-items: center;
	}
}

.duration {
	color: var(--app-color-foreground-violet-mid);
	font-size: 0.75rem;
	font-weight: 500;
	filter: brightness(1.7);
	@media screen and (max-width: $breakpoint-md) {
		font-size: 0.8rem;
	}
}

.share-talk-container {
	position: absolute;
	display: flex;
	flex-direction: column;
	bottom: 0;
	left: 0;
	width: var(--time-container-width);
	padding: 6px 0;
	opacity: 0;
	transition: 0.3s ease;
	transition-property: opacity, max-height;
	z-index: -1;
	@media screen and (max-width: $breakpoint-md) {
		max-height: 0;
		gap: 8px;
		width: 90%;
		left: 5%;
		bottom: 8px;
	}
}
.share-talk {
	display: flex;
	justify-content: flex-start;
	gap: 10px;
	width: 100%;
	margin-right: 6px;
	padding: 6px 2px;
	color: var(--app-color-foreground-violet-light);
	font-size: 0.7rem;
	font-family: 'Inter', sans-serif;
	transform: translateX(8px);
	transition: 0.3s ease;
	transition-property: transform, background-color;
	&:nth-child(2) {
		transition-delay: 0.05s;
	}
	&.copied {
		color: #fff;
		img {
			filter: brightness(0) invert(1);
		}
	}
	img {
		width: 12px;
		height: auto;
		transform: translateY(-1px);
	}
	&:hover {
		color: #fff;
		img {
			filter: brightness(0) invert(1);
		}
	}
	@media screen and (max-width: $breakpoint-md) {
		border-radius: 6px;
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 12px 20px;
		margin: 0;
		font-size: 0.95rem;
		box-shadow: 0 0 0 1px var(--app-color-foreground-violet-mid);
		transform: none;
	}
}

.talk-content {
	flex: 1;
	display: flex;
	gap: 1.9rem;
	padding-top: 1.6rem;
	@media screen and (max-width: $breakpoint-md) {
		padding-top: 14px;
		padding-left: 4px;
		gap: 2.2rem;
	}
}

.talk-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
}

.title {
	max-width: 80%;
	font-size: 1.16rem;
	font-weight: 700;
	line-height: 1.32;
	@media screen and (max-width: $breakpoint-md) {
		font-size: 1.1rem;
		max-width: calc(100% - 96px);
	}
}
.no-logo .title {
	margin-top: -0.5rem;
}
.short .title {
	padding: 0;
}

.speaker {
	align-self: flex-start;
	color: var(--app-color-foreground-violet-light);
	font-size: 1rem;
	font-weight: 500;
	&:hover {
		color: #fff;
	}
}

.short.talk {
	display: flex;
	align-items: center;
	min-height: 100px;
	@media screen and (max-width: $breakpoint-md) {
		align-items: flex-start;
		min-height: 72px;
		height: unset;
		padding-bottom: 16px;
	}
	.logo {
		transform: scale(0.85);
		@media screen and (max-width: $breakpoint-md) {
			transform: scale(0.9);
		}
	}
	.speaker {
		transform: translateY(1px);
	}
	.title {
		width: unset;
		max-width: 90%;
	}
	.talk-content {
		padding-top: 0;
		@media screen and (max-width: $breakpoint-md) {
			padding-top: 14px;
		}
	}
	.talk-info {
		gap: 0.2rem;
		@media screen and (max-width: $breakpoint-md) {
			flex-direction: column;
			align-items: flex-start;
			gap: 2px;
		}
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

.talk.adapt {
	max-height: unset;
	.talk-content {
		padding-top: 1.8rem;
		padding-bottom: 156px;
	}
}

.avatar {
	object-fit: contain;
	margin: 14px;
	margin-right: 32px;
	border-radius: 50%;
}

.participants {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 0.8rem 1.4rem;
	max-width: 316px;
	margin-top: 14px;
	@media screen and (max-width: $breakpoint-md) {
		display: none;
	}
}

.participant-avatar {
	border-radius: 50%;
}

.avatar,
.participant-avatar {
	width: 68px;
	height: 68px;
	transition: 0.1s ease-in box-shadow;
	&:hover {
		box-shadow: 0 0 0 1px #000, 0 0 0 2px var(--app-color-foreground-blue),
			0 0 22px 0 var(--app-color-foreground-blue);
	}
	@media screen and (max-width: $breakpoint-md) {
		position: absolute;
		top: 0;
		right: 38px;
		margin: 12px 0;
		width: 28px;
		height: 28px;
		transform: scale(0.9) translateY(2px);
	}
}

.logo {
	object-fit: contain;
	width: 42px;
	height: 42px;
	transform: translateY(3px);
	@media screen and (max-width: $breakpoint-md) {
		position: absolute;
		top: 0;
		right: 8px;
		margin: 12px 0;
		width: 28px;
		height: 28px;
	}
}

.talk-info .title:hover {
	background-image: var(--app-background-gradient-light_violet);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
