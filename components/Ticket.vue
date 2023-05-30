<script setup lang="ts">
import { type Framework } from '~~/helpers/constants.js';
import { mcs, projects, SpeakerData, speakers } from '../conference';
import { createBlankTicket, logoPath } from '../helpers/utils';

const {
	speakerName,
	ready = true,
	og = false,
	framework: frameworkProp = 'Vite',
	forceShowFrameworkLogo = false,
} = defineProps<{
	ready?: boolean;
	og?: boolean;

	/**
	 * Used when we want to show a ticket for a specific framework. User's framework of choice has higher priority
	 *
	 * Is speakers when using tickets-og
	 */
	framework?: Framework | 'speakers';

	/**
	 * Force a ticket to show its valid styles
	 */
	forceShowFrameworkLogo?: boolean;

	/**
	 * Passes the name of speaker
	 */
	speakerName?: keyof typeof speakers | keyof typeof mcs;
}>();

const ticketHeight = 375;
const rs = ticketHeight * 0.04;
const ts = {
	viteconf: 3.3 * rs + 'px',
	displayName: 1.3 * rs + 'px',
	screenName: 1 * rs + 'px',
	details: 1.1 * rs + 'px',
	ticketNumber: 1.5 * rs + 'px',
	dates: 1.5 * rs + 'px',
	avatar: 4 * rs + 'px',
	framework: 2 * rs + 'px',
	notchLeft: '130px',
	notchWidth: '244px',
};

const mono = `Menlo, 'Courier New', monospace`;
const screenNameFont = ref(mono);

let ticket = useTicket();

const speakerInfo = computed<SpeakerData>(() => {
	const name =
		ticket.value && ticket.value.ticketNumber > 0
			? ticket.value.screenName?.toLocaleLowerCase()
			: speakerName;
	return speakers[name] ?? mcs[name];
});

const isSpecial = computed(
	() => !!speakerInfo.value && !speakerInfo.value.showOriginal
);
const isMC = computed(() => isSpecial.value && !speakers[speakerName]);

// In case its a speaker who hasn't registered yet
if (
	isSpecial.value &&
	(ticket.value === null || ticket.value?.ticketNumber === 0)
) {
	const localTicket = createBlankTicket();
	localTicket.displayName = speakerInfo.value.displayName;
	localTicket.favoriteFrameworks = speakerInfo.value.project.name as Framework;
	localTicket.ticketNumber = 999999;
	localTicket.photo = speakerInfo.value.avatar ?? '';
	localTicket.isSpeaker = true;
	localTicket.screenName = speakerInfo.value.screenName;
	localTicket.uid = 'TODO';

	ticket.value = localTicket;
}

const blankColor = '#888888';

const framework = computed(() => {
	if (ticket.value?.ticketNumber === 0) {
		// Means the person is not logged in or whatever, apply the route based framework
		return frameworkProp as Framework;
	}

	if (isSpecial.value) {
		return speakerInfo.value.project.name as Framework;
	}

	const favoriteFrameworks = ticket.value?.favoriteFrameworks;

	return (
		favoriteFrameworks ? favoriteFrameworks.split(',')[0] : 'vite'
	) as Framework;
});

const frameworkColor = computed<string>(() => {
	const color =
		projects[framework.value.toLowerCase()]?.brandColor ?? blankColor;
	return color;
});

const frameworkPlayground = computed(() => {
	const project = projects[framework.value.toLowerCase()];
	return project?.playground ?? project?.url ?? `https://vite.new`;
});

const backgroundColor = computed(() => frameworkColor.value + '1f');
const borderColor = computed(
	() => frameworkColor.value + (isSpecial.value ? 'ff' : '33')
);
const innerBorderColor = computed(() => frameworkColor.value + 'bb');

const secondaryColor = computed(
	() =>
		projects[framework.value.toLowerCase() as keyof typeof projects]
			?.secondaryColor ?? frameworkColor.value
);

const ticketNumber = computed(() => {
	const tn = ticket.value?.ticketNumber ?? 0;
	return `#${
		tn === 5173 || tn === 999999 ? '00VITE' : tn.toFixed().padStart(6, '0')
	}`;
});

const valid = computed(
	() => forceShowFrameworkLogo || ticket.value?.ticketNumber > 0
);

const asciiRE = /[^\x00-\x7F]/g;
const displayName = computed(() => {
	if (og && ticket.value?.displayName?.match(asciiRE)) {
		return ticket.value?.screenName;
	} else {
		return ticket.value?.displayName;
	}
});
</script>

<template>
	<div
		class="ticket"
		:class="[
			{
				valid,
				blank: !valid || forceShowFrameworkLogo,
				ready,
				showFrameworkLogo: forceShowFrameworkLogo,
				speaker: isSpecial,
			},
		]"
		ref="ticketRef"
		style="will-change: transform"
	>
		<div
			v-show="ts"
			class="ticket-inner-content"
			:style="og ? '' : 'backdrop-filter: blur(4px);'"
		>
			<div class="notch-triangle"></div>
			<div class="notch"></div>
			<div class="framework-logo">
				<a :href="frameworkPlayground" target="_blank">
					<img
						width="200"
						height="200"
						:alt="
							isSpecial ? 'ViteConf logo' : `${framework.toLowerCase()} logo`
						"
						:src="
							isSpecial
								? '/images/viteconf.svg'
								: projects[framework.toLowerCase()]?.logo ??
								  `/projects/${framework.toLowerCase()}.svg`
						"
					/>
				</a>
			</div>
			<span class="speaker-span" v-if="isSpecial">{{
				isMC ? 'MC' : 'SPEAKER'
			}}</span>
			<a class="speaker-talk-title" v-if="isSpecial">
				{{
					speakerInfo?.talk?.ticketTitle ??
					speakerInfo?.talk?.shortTitle ??
					speakerInfo?.talk?.title ??
					speakerInfo?.section
				}}
			</a>
			<div class="user-info">
				<div class="user-info-inner">
					<div class="user-avatar">
						<img
							width="200"
							height="200"
							v-show="ticket?.photo"
							:alt="`${ticket?.screenName} avatar`"
							:src="ticket?.photo"
						/>
					</div>
					<div class="user-details">
						<div class="user-details-inner">
							<a
								:href="
									ticket?.screenName !== 'username'
										? `https://github.com/${ticket?.screenName}`
										: null
								"
								target="_blank"
								class="screen-name"
							>
								<span>{{ '@' + ticket?.screenName }}</span>
							</a>
							<p class="display-name">{{ displayName }}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="ticket-number">
				<p>{{ ticketNumber }}</p>
			</div>
			<div class="viteconf-logo">
				<div class="viteconf-logo-bg" aria-hidden="true" />
				<img
					class="viteconf-logo-svg"
					width="200"
					height="200"
					:src="isSpecial ? logoPath(speakerInfo) : '/images/viteconf.svg'"
				/>
			</div>
			<div class="viteconf-info">
				<span class="viteconf-heading"> ViteConf </span>
				<span class="viteconf-dates"> OCTOBER 11-12, 2022' </span>
			</div>
			<div class="conference-details">
				<div class="conference-details-inner">
					<p>Making Web Development Instant</p>
					<p class="hosted-by">
						Hosted by
						<a href="https://stackblitz.com">
							<img alt="StackBlitz" src="/images/logos/stackblitz-logo.svg" />
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.ticket {
	transition: transform 0.5s;
	width: 100%;
	height: 100%;
	border: 2px solid v-bind(borderColor);
	background-color: v-bind(backgroundColor);
	border-radius: 10px;
	padding: 1.75%;
	transition: background-color 0.75s, border-color 0.75s;

	user-select: none;
}

.speaker.ticket {
	border: 2px solid transparent;
}

.ticket-inner-content {
	width: 100%;
	height: 100%;
	display: grid;
	gap: 0;
	padding: 0.2%;
	border-radius: 6px;
	border: 4px solid v-bind(innerBorderColor);
	transition: border-color 1s;
	position: relative;

	grid-template-columns: 100%;
	grid-template-rows: 70px 120px 200px 1fr 100px;
	grid-template-areas:
		'ticket-number'
		'user-info'
		'viteconf-logo'
		'viteconf-info'
		'conference-details';
	@media screen and (max-width: 400px) {
		grid-template-rows: 50px 100px 220px 100px 180px;
	}
}

.speaker .ticket-inner-content {
	border: 4px solid transparent;
	border-radius: 25px;
}

.notch {
	position: absolute;
	background-color: v-bind(borderColor);
	transition: background-color 1s;
	top: 0;
	left: v-bind('ts.notchLeft');
	width: v-bind('ts.notchWidth');
	height: 60px;
	z-index: -1;
	@media screen and (max-width: 400px) {
		display: none;
	}
}
.notch-triangle {
	top: 0;
	left: calc(v-bind('ts.notchLeft') - 320px + 260px);
	position: absolute;
	width: 0;
	height: 0;
	border-top: 60px solid v-bind(borderColor);
	border-left: 60px solid transparent;
	z-index: -1;
	transition: border-color 1s;
	@media screen and (max-width: 400px) {
		display: none;
	}
}
.speaker .notch {
	opacity: 0;
}
.speaker .notch-triangle {
	opacity: 0;
}

.user-info {
	grid-area: user-info;
}

.viteconf-logo {
	grid-area: viteconf-logo;
}

.ticket-number {
	grid-area: ticket-number;
}

.viteconf-info {
	grid-area: viteconf-info;
}

.framework-logo {
	grid-area: framework-logo;
}

.conference-details {
	grid-area: conference-details;
	display: grid;
	align-items: end;
	justify-items: end;
}

.conference-details-inner {
	width: 80%;
	height: 40%;
	font-size: v-bind('ts.details');
	font-weight: 500;
	text-align: end;
	margin-bottom: 6%;
	margin-right: 4.5%;
	@media screen and (max-width: 400px) {
		font-size: 1.1rem;
		line-height: 1.9;
	}
}
.hosted-by {
	background-image: var(--app-background-gradient);
	background-clip: text;
	-webkit-text-fill-color: transparent;
	img {
		display: inline-block;
		vertical-align: middle;
		margin-left: 5px;
		height: 22px;
		margin-top: -2px;
	}
}

.user-info {
	display: grid;
	align-items: center;
	justify-items: center;
}
.user-info-inner {
	width: 80%;
	height: 55%;
	display: grid;
	align-items: center;
	justify-items: center;
	gap: 12%;
	grid-template-columns: 1fr 4fr;
	@media screen and (max-width: 400px) {
		width: 90%;
		gap: 8%;
	}
}

.user-details {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	justify-self: left;
	flex-direction: column;
	align-items: left;
	padding-top: 4%;
}

.user-details-inner {
	position: absolute;
	width: 200%;
	height: 100%;
	display: flex;
	justify-self: left;
	flex-direction: column;
	align-items: left;
}

.github-icon {
	width: v-bind('ts.screenName');
	height: v-bind('ts.screenName');
	display: inline;
}

.screen-name {
	display: flex;
	gap: 8%;
	align-items: center;
	font-size: v-bind('ts.screenName');
	font-weight: bold;
	vertical-align: middle;
	font-family: v-bind(screenNameFont);
	opacity: 0.9;
}

.screen-name:hover {
	opacity: 1;
}
.blank .screen-name {
	opacity: 0.4;
}

.display-name {
	font-size: v-bind('ts.displayName');
	font-weight: bold;
	line-height: 1.2;
	width: 600px;
	overflow: visible;
}
.blank .display-name {
	opacity: 0.4;
}
.user-avatar {
	width: 100%;
	height: 100%;
	position: relative;
	display: grid;
	align-items: center;
	justify-items: center;
	transform: translate(5px, 0px);
	@media screen and (max-width: 400px) {
		transform: scale(0.8);
	}
}

.user-avatar img {
	margin: auto;
	max-width: v-bind('ts.avatar');
	max-height: v-bind('ts.avatar');
	display: block;
	border-radius: 50%;
}

.blank .user-avatar img {
	opacity: 0.4;
	filter: grayscale(100%);
	transform: translate(5px, -5px);
}
.conference-info {
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-items: center;
	align-items: center;
}
.ticket-number p {
	font-family: v-bind(mono);
	font-size: v-bind('ts.ticketNumber');
	font-weight: 900;
	justify-self: end;
	margin: 3% 10%;
	margin-right: 14px;
	text-align: end;
	transition: opacity 0.75s;
}

.blank .ticket-number {
	opacity: 0.35;
}

.speaker-span {
	position: absolute;
	top: 42px;
	right: 17px;
	font-size: 1.1rem;
	font-weight: 700;
	color: v-bind(secondaryColor);
}

.speaker-talk-title {
	position: absolute;
	font-size: 1.5rem;
	font-weight: 700;
	color: v-bind(secondaryColor);
	text-align: center;
	width: 100%;
	left: 0;
	bottom: 270px;
}
.speaker-talk-time {
	position: absolute;
	font-size: 1.2rem;
	font-weight: 600;
	opacity: 0.8;
	text-align: center;
	width: 100%;
	left: 0;
	bottom: 245px;
}

.framework-logo {
	border-radius: 0;
	position: absolute;
	top: 18px;
	left: 25px;
	@media screen and (max-width: 400px) {
		top: 14px;
		left: 18px;
	}
}

.framework-logo img {
	border-radius: 0;
	width: auto;
	object-fit: contain;
	max-width: v-bind('ts.framework');
	height: v-bind('ts.framework');
	opacity: 0.9;
	transition: opacity 0.75s ease-in, filter 0.2s ease-in;
}
.framework-logo img:hover {
	opacity: 1;
	cursor: pointer;
	filter: drop-shadow(0 0 2em #ffffffaa);
}

.blank:not(.showFrameworkLogo) .framework-logo {
	display: none;
}

.viteconf-logo {
	display: grid;
	align-items: center;
	position: relative;
	justify-items: center;
	margin-left: 0;
}

.viteconf-logo-svg {
	position: relative;
	object-fit: contain;
	width: 160px;
	height: 160px;
}

.speaker .viteconf-logo-svg {
	filter: drop-shadow(0 0 2em #ffffff44);
	width: 55%;
	height: 55%;
	transform: translate(0, -45px);
}
.viteconf-logo-bg {
	position: absolute;
	z-index: -1;
	border-radius: 50%;

	width: 100%;
	height: 100%;

	background-image: linear-gradient(-45deg, #bd34fe88 50%, #47caff88 50%);
	filter: blur(60px);
	transform: translate(-50%, -50%) scale(var(--scale));
	transform-origin: center center;
	opacity: 0.6;
}

.viteconf-info {
	display: grid;
	justify-items: center;
	grid-template-rows: 1fr 1.2fr;
}

.viteconf-heading {
	font-size: v-bind('ts.viteconf');
	line-height: v-bind('ts.viteconf');
	font-weight: 700;
	letter-spacing: -1px;
	align-self: start;
	background-image: var(--app-background-gradient);
	background-clip: text;
	-webkit-text-fill-color: transparent;
}

.viteconf-dates {
	align-self: start;
	font-size: v-bind('ts.dates');
	font-weight: 700;
	color: white;
	padding-left: 2%;
	@media screen and (max-width: 400px) {
		padding-top: 16px;
	}
}

.ticket.speaker::before {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	border-radius: 12px;
	background: linear-gradient(black, transparent),
		linear-gradient(to top left, white, transparent),
		linear-gradient(to top right, black, transparent);
	opacity: 0.35;
	border: 1px solid v-bind(borderColor);
	border-top: 0.5px solid v-bind(borderColor);
	border-bottom: 2px solid v-bind(borderColor);
}
</style>
