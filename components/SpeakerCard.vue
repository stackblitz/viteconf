<script lang="ts" setup>
import {
	twitterMessagesFromSpeaker,
	twitterMessagesShareSpeaker,
	type SpeakerData,
	type SpeakerListLayout,
} from '~~/conference';
import { waitFor } from '~~/helpers/wait-for';
import { logoPath, scheduleLinkFromTalkTitle } from '../helpers/utils';

const {
	speaker,
	focus = false,
	layout = 'rows',
} = defineProps<{
	speaker: SpeakerData;
	focus?: boolean;
	layout?: SpeakerListLayout;
}>();

const user = useFirebaseUser();

const appliedFocusStyles = ref(false);

const blankColor = '#888888';
const brandColor = computed<string>(
	() => speaker.project?.brandColor ?? blankColor
);
const backgroundColor = computed(
	() => brandColor.value + (appliedFocusStyles.value ? '35' : '20')
);
const borderColor = computed(() => brandColor.value + '44');
const innerBorderColor = computed(() => brandColor.value + 'bb');

const shareOnTwitter = async (speaker: SpeakerData) => {
	const speakerUrl = `https://viteconf.org/speakers/${speaker?.screenName}?share`;
	const messages =
		getUserScreenName(user.value) === speaker.screenName
			? twitterMessagesFromSpeaker
			: twitterMessagesShareSpeaker;
	const message =
		messages[Math.floor(Math.random() * messages.length)] ?? messages[0];
	const tweetText = message(speaker);
	const twitterUrl = `https://twitter.com/intent/tweet?url=${speakerUrl}&text=${tweetText}`;
	window.location.href = twitterUrl;
};

const speakerCompanyText = (speaker: SpeakerData): string[] => {
	const {
		company,
		project: { name: projectName },
	} = speaker;
	const simplify = (string) => string.split(' ').join('');
	const text = [];
	// projectName only
	if (
		projectName === 'Deno' ||
		simplify(projectName).includes(simplify(company)) ||
		(!company && projectName)
	) {
		text.push(projectName);
		// company only
	} else if (
		company === projectName ||
		simplify(company).includes(simplify(projectName)) ||
		(!projectName && company)
	) {
		text.push(company);
		// both company and projectName
	} else {
		text.push(company, projectName);
	}
	return text;
};

const backgroundGradientTransparency = computed(() =>
	appliedFocusStyles.value ? 160 : 70
);

let speakerCard = ref<HTMLDivElement>();

onMounted(async () => {
	await waitFor(20);

	if (focus) {
		speakerCard.value?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});
	}

	await waitFor(1000);

	appliedFocusStyles.value = focus;
});

const username = computed(() => speaker.screenName.toLowerCase());
</script>

<template>
	<div
		ref="speakerCard"
		class="speaker-card"
		:class="layout"
		v-if="speaker.displayName && speaker.displayName != 'TBD'"
	>
		<img
			class="speaker-project-img"
			:alt="`${speaker.project?.name} logo`"
			:src="logoPath(speaker)"
		/>
		<div class="speaker-avatar-container">
			<NuxtLink
				class="header-anchor"
				:href="`/speakers/${username}`"
				:id="`speaker-${username}`"
				aria-hidden="true"
				style="position: absolute; opacity: 0"
			>
				#
			</NuxtLink>
			<a class="avatar" target="_blank" :href="`/speaker/${username}`">
				<img
					loading="lazy"
					height="100"
					width="100"
					:alt="speaker.displayName"
					:src="speaker.avatar"
					style="border-radius: 16px"
				/>
			</a>
		</div>

		<div class="speaker-info">
			<div class="name-container">
				<p class="name">
					<NuxtLink :href="`/speakers/${speaker.screenName}`">
						{{ speaker.displayName }}
					</NuxtLink>
					<span class="company-container" v-if="speaker.company !== 'TBD'">
						<span
							class="company"
							v-for="(text, i) in speakerCompanyText(speaker)"
							:key="i"
						>
							{{ text }}
						</span>
					</span>
				</p>
				<div class="social-links">
					<button @click="shareOnTwitter(speaker)">
						<img
							loading="lazy"
							src="/images/icons/share-alt-regular.svg"
							alt="Share Speaker icon"
						/>
					</button>
					<a
						:href="`https://twitter.com/${speaker.twitter}`"
						v-if="speaker.twitter"
					>
						<img
							loading="lazy"
							src="/images/icons/twitter-brands.svg"
							alt="Twitter icon"
						/>
					</a>
					<a
						:href="`https://github.com/${speaker.screenName}`"
						v-if="speaker.screenName"
					>
						<img
							loading="lazy"
							src="/images/icons/github-brands.svg"
							alt="GitHub icon"
						/>
					</a>
				</div>
			</div>
			<p class="bio" v-if="speaker.bio !== 'TBD' && layout !== 'grid'">
				{{ speaker.bio }}
			</p>

			<ul class="project-list">
				<li v-if="speaker.talk">
					<NuxtLink
						class="project"
						:href="scheduleLinkFromTalkTitle(speaker.talk.title)"
					>
						<img
							loading="lazy"
							width="100"
							height="100"
							:alt="`${speaker.project?.name} logo`"
							:src="logoPath(speaker)"
						/>
						<span class="title">{{ speaker.talk?.title }}</span>
					</NuxtLink>
				</li>
				<li v-if="speaker.extra && speaker.extra.title !== speaker.talk.title">
					<NuxtLink
						class="project"
						:href="scheduleLinkFromTalkTitle(speaker.extra.title)"
					>
						<img
							width="100"
							height="100"
							loading="lazy"
							:alt="`${speaker.project?.name} logo`"
							:src="logoPath(speaker)"
						/>
						<span class="title">{{ speaker.extra?.title }}</span>
					</NuxtLink>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped lang="scss">
.speaker-card {
	--speaker-color: v-bind(backgroundColor);
	flex: 1;
	position: relative;
	display: flex;
	align-items: flex-start;
	gap: 3.2rem;
	padding: 48px 24px 92px;
	border-radius: 8px;
	background-image: radial-gradient(
		ellipse at center top,
		var(--speaker-color),
		transparent calc(v-bind(backgroundGradientTransparency) * 1%)
	);

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background-image: linear-gradient(
			to right,
			transparent,
			v-bind(borderColor) 40%,
			v-bind(borderColor) 60%,
			transparent
		);
		@media screen and (max-width: 500px) {
			background-image: linear-gradient(
				to right,
				transparent,
				v-bind(borderColor) 20%,
				v-bind(borderColor) 80%,
				transparent
			);
		}
	}

	@media screen and (max-width: 700px) {
		flex-direction: column;
		align-items: center;
		gap: 1.8rem;
	}
	@media screen and (max-width: 500px) {
		padding-top: 32px;
		padding-left: 0;
		padding-right: 0;
	}
}

.speaker-avatar-container,
.speaker-info {
	display: flex;
	flex-direction: column;
}
.speaker-info {
	width: 100%;
}

.speaker-avatar-container {
	width: 140px;
	min-width: 140px;
	@media screen and (max-width: 700px) {
		width: 84px;
		min-width: 84px;
	}
}

.avatar {
	display: block;
	width: 100%;
	height: auto;
}
.avatar img {
	border-radius: 16px;
	height: auto;
	width: 100%;
	object-fit: contain;
}

.name-container {
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 8px;
	@media screen and (max-width: 700px) {
		flex-direction: column;
		align-items: center;
		gap: 2px;
		margin-bottom: 16px;
	}
}

.name {
	display: flex;
	align-items: baseline;
	gap: 24px;
	font-size: 1.3rem;
	font-weight: 700;
	@media screen and (max-width: 700px) {
		font-size: 1.5rem;
	}
	a {
		position: relative;
		margin-bottom: 2px;
		transition: ease 0.1s color;
		&::before {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 2px;
			background-color: v-bind(innerBorderColor);
			transform: scaleX(0);
			transform-origin: center;
			transition: ease 0.1s transform;
		}
		&:hover {
			color: #fff;
			&::before {
				transform: scaleX(1);
			}
		}
	}
}

.social-links {
	display: flex;
	transform: translateY(6px);
	a,
	button {
		padding: 6px 8px;
		opacity: 0.6;
		transition: 0.1s ease opacity;
		&:hover {
			opacity: 1;
		}
	}
	img {
		width: 18px;
		height: 18px;
		filter: brightness(0) invert(1);
	}
}

.company-container {
	display: flex;
	gap: 2rem;
}
.company {
	position: relative;
	color: rgba(255, 255, 255, 0.8);
	font-size: 1rem;
	font-weight: 600;
	@media screen and (max-width: 700px) {
		font-size: 1.1rem;
	}
	&:not(:last-child)::before {
		content: '/';
		position: absolute;
		right: -1.125rem;
		top: 0;
		opacity: 0.4;
	}
}
.bio {
	margin: 2px 0 16px;
	color: rgba(255, 255, 255, 0.8);
	font-size: 0.9rem;
	@media screen and (max-width: 500px) {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 6;
		-webkit-box-orient: vertical;
		margin-bottom: 24px;
		font-size: 1.1rem;
	}
}

.project-list {
	--outline-color: v-bind(borderColor);
	align-self: flex-start;
	min-width: 400px;
	max-width: 100%;
	margin-top: 8px;
	padding: 0;
	box-shadow: 0 0 0 1px var(--outline-color);
	border-radius: 6px;
	overflow: hidden;
	transition: ease 0.1s;
	transition-property: background-color, box-shadow;
	&:hover {
		--outline-color: v-bind(innerBorderColor);
	}
	@media screen and (max-width: 700px) {
		--outline-color: v-bind(innerBorderColor);
		align-self: stretch;
		min-width: unset;
	}
}
.project {
	display: flex;
	align-self: flex-start;
	align-items: center;
	gap: 20px;
	padding: 10px 20px;
	padding-right: 44px;
	transition: ease 0.1s;
	transition-property: background-color, box-shadow;
	&:hover {
		background-color: var(--speaker-color);
	}
	@media screen and (max-width: 700px) {
		background-color: var(--speaker-color);
	}
}

.project-list li {
	list-style: none;
	&:first-child .project {
		padding-top: 14px;
	}
	&:last-child .project {
		padding-bottom: 14px;
	}
}

.project img {
	height: 24px;
	width: 24px;
	object-fit: contain;
}

.speaker-project-img {
	display: none;
}

.title {
	display: flex;
	align-items: center;
	justify-items: center;
	font-size: 0.9rem;
	font-weight: 600;
	line-height: 1.36;
	@media screen and (max-width: 700px) {
		font-size: 1.1rem;
	}
}

.info {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 5rem;
	height: 40px;
}

// layout: 'grid'
.speaker-card.grid {
	flex-direction: column;
	align-items: center;
	gap: 1.4rem;
	border-radius: 16px;
	padding: 44px 12px 24px;
	background-image: none;
	box-shadow: inset 0 140px 72px 0 var(--speaker-color),
		inset 0 0 0 1px var(--speaker-color);
	background-color: var(--speaker-color);
	transition: ease 0.2s;
	transition-property: background-color, box-shadow, border-radius;
	@media screen and (max-width: 500px) {
		margin-left: -8px;
		margin-right: -8px;
		padding-top: 20px;
		padding-bottom: 16px;
		flex-direction: row;
	}
	.speaker-avatar-container {
		width: 164px;
		min-width: 164px;
		@media screen and (max-width: 500px) {
			position: absolute;
			align-self: flex-start;
			top: 12px;
			width: 64px;
			min-width: 64px;
			z-index: 10;
		}
		.avatar img {
			border-radius: 50%;
		}
	}

	.speaker-info {
		flex: 1;
		@media screen and (max-width: 500px) {
			position: relative;
			width: 100%;
		}
	}

	&:hover {
		box-shadow: inset 0 140px 72px 0 v-bind(borderColor),
			inset 0 0 0 2px v-bind(borderColor);
		background-color: var(--speaker-color);
		@media screen and (max-width: 500px) {
			border-radius: 0;
		}
	}

	.company-container {
		flex-wrap: wrap;
		row-gap: 0;
		@media screen and (max-width: 500px) {
			max-width: 100%;
		}
	}

	.name-container {
		margin-bottom: 32px;
		@media screen and (max-width: 500px) {
			--left-offset: 84px;
			align-items: flex-start;
			max-width: calc(100% - var(--left-offset));
			margin-bottom: 12px;
			margin-left: var(--left-offset);
		}
	}

	.name {
		flex: 1;
		gap: 0;
		flex-direction: column;
		align-items: center;
		@media screen and (max-width: 500px) {
			max-width: 100%;
			align-items: flex-start;
			gap: 5px;
			font-size: 1.4rem;
			line-height: 1.2;
		}
	}

	.company {
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.9rem;
		font-weight: 700;
		@media screen and (max-width: 500px) {
			font-size: 1.1rem;
			flex-wrap: wrap;
			line-height: 1.5;
		}
	}

	.project-list {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-width: unset;
		width: 100%;
		li {
			flex: 1;
			display: flex;
			flex-direction: column;
		}
	}
	&:hover .project-list {
		--outline-color: v-bind(innerBorderColor);
	}

	.project {
		flex: 1;
		align-self: stretch;
		justify-content: center;
		padding: 14px 20px;
		text-align: center;
		img {
			display: none;
		}
		.title {
			font-size: 0.84rem;
			line-height: 1.5;
			@media screen and (max-width: 700px) {
				font-size: 1.1rem;
			}
		}
	}

	.speaker-project-img {
		position: absolute;
		display: block;
		top: 0;
		left: 0;
		width: auto;
		height: 28px;
		margin: 12px 16px;
		@media screen and (max-width: 500px) {
			top: 0;
			left: unset;
			right: 0;
			height: 22px;
		}
	}

	.social-links {
		position: absolute;
		top: 0;
		right: 0;
		margin: 2px 8px;
		opacity: 0.32;
		transition: ease 0.1s opacity;
		@media screen and (max-width: 500px) {
			// right: 36px;
			display: none;
		}
		img {
			width: 18px;
			height: 18px;
		}
		a {
			padding: 6px 8px;
		}
	}
	&:hover .social-links {
		opacity: 1;
	}
}

// layout: 'card'
.speaker-card.card {
	gap: 3.46rem;
	padding: 44px 52px 32px;
	border-radius: 16px;
	box-shadow: inset 0 0 44px 0 var(--speaker-color),
		inset 0 0 0 1px var(--speaker-color);
	background-image: none;
	background-color: var(--speaker-color);
	// background-color: v-bind(backgroundGradientTransparency);
	transition: ease 0.2s;
	transition-property: background-color, box-shadow;
	@media screen and (max-width: 700px) {
		gap: 2rem;
		padding-left: 24px;
		padding-right: 24px;
	}
	@media screen and (max-width: 500px) {
		padding-left: 16px;
		padding-right: 16px;
	}
	.speaker-avatar-container {
		@media screen and (max-width: 700px) {
			width: 120px;
		}
		.avatar img {
			box-shadow: 0 0 0 1px var(--speaker-color);
			border-radius: 50%;
			transition: ease 0.2s box-shadow;
		}
	}
	&:hover .avatar img {
		box-shadow: 0 0 0 1px v-bind(innerBorderColor);
	}

	&:hover {
		box-shadow: inset 0 0 44px 0 v-bind(borderColor),
			inset 0 0 0 2px v-bind(borderColor);
		background-color: var(--speaker-color);
	}

	.company {
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0.5px;
	}
	.project-list {
		min-width: unset;
		width: 100%;
	}
	&:hover .project-list {
		--outline-color: v-bind(innerBorderColor);
	}

	.name-container {
		margin-bottom: 16px;
	}

	.name {
		gap: 0;
		flex-direction: column;
		font-size: 1.8rem;
		font-weight: 800;
		@media screen and (max-width: 700px) {
			align-items: center;
		}
	}

	.bio {
		margin-bottom: 20px;
	}

	.social-links {
		position: absolute;
		top: 0;
		right: 0;
		margin: 4px 12px;
		opacity: 0.32;
		transition: ease 0.1s opacity;
		a {
			padding: 10px 8px;
		}
	}
	&:hover .social-links {
		opacity: 1;
	}
}
</style>
