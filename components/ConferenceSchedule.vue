<script lang="ts" setup>
import {
	postConferenceTalks,
	preConferenceTalks,
	schedule,
	startDateTime,
} from '~~/conference';
import { talkTitleToSlug, toTalkStartLocaleTime } from '~~/helpers/utils';

const { showSocial = false, replay = false } = defineProps<{
	showSocial?: boolean;
	focusedTalk?: string;
	replay?: boolean;
}>();

const formattedStartDate = toTalkStartLocaleTime(startDateTime, {
	timeZoneName: 'short',
});
</script>

<template>
	<section class="section-container">
		<div class="section-content" :class="{ 'show-social': showSocial }">
			<template v-if="showSocial">
				<h5>
					A full day of launches, learnings, and celebrations from the projects
					reimagining Web Development.
				</h5>
				<SocialActions />
			</template>

			<h4>{{ replay ? 'Talks' : 'Schedule' }}</h4>
			<div v-if="!replay" class="schedule-info">
				<p>
					<b>
						The conference will last for 24hs starting at October 11,
						<ClientOnly fallback="7am PST">
							<span title="Your locale time from 7am PST">
								{{ formattedStartDate }}
							</span>
						</ClientOnly>
					</b>
				</p>
				<p>
					This is the timeline for the first 12 hours, after which all talks
					will be streamed again
				</p>
				<p>No matter when you start watching, you can see all the content!</p>
				<p>
					<i>
						Displayed times are estimates in your time zone, exact times may
						change in the future
					</i>
				</p>
			</div>
			<div class="schedule">
				<template v-for="(section, i) in schedule" :key="i">
					<div class="schedule-item">
						<div class="section-heading" v-if="section.title">
							<h3>{{ section.title }}</h3>
						</div>
						<ConferenceScheduleTalk
							v-for="(talk, i) in section.talks"
							:replay="replay"
							:talk="talk"
							:key="i"
							:is-focused="talkTitleToSlug(talk.title) === focusedTalk"
						/>
					</div>
				</template>
			</div>

			<h4>Pre-Conference Talks</h4>
			<div class="schedule">
				<div class="schedule-item">
					<ConferenceScheduleTalk
						v-for="(talk, i) in preConferenceTalks"
						:main="false"
						:talk="talk"
						:key="i"
						:is-focused="talkTitleToSlug(talk.title) === focusedTalk"
					/>
				</div>
			</div>
			<template v-if="!replay">
				<h4>Post-Conference Talks</h4>
				<div class="schedule">
					<div class="schedule-item">
						<ConferenceScheduleTalk
							v-for="(talk, i) in postConferenceTalks"
							:main="false"
							:released="false"
							:talk="talk"
							:key="i"
							:is-focused="talkTitleToSlug(talk.title) === focusedTalk"
						/>
					</div>
				</div>
			</template>
		</div>
	</section>
</template>

<style scoped lang="scss">
$breakpoint-md: 760px;
.section-container {
	position: relative;
	margin-top: 90px;
	margin-bottom: 100px;
	background-color: #000;

	&::before,
	&::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 80px;
	}

	&::before {
		top: -80px;
		background-image: linear-gradient(
			to bottom right,
			transparent 50%,
			#000 50%
		);
		@media screen and (max-width: $breakpoint-md) {
			display: none;
		}
	}
	&::after {
		bottom: -80px;
		background-image: linear-gradient(to top left, transparent 50%, #000 50%);
	}
	@media screen and (max-width: $breakpoint-md) {
		margin-top: 64px;
		margin-bottom: 52px;
	}
}

.section-content {
	margin-top: 40px;
	&.show-social {
		margin-top: 60px;
	}
	@media screen and (max-width: $breakpoint-md) {
		margin-top: 52px;
		margin-bottom: 16px;
	}
}

h4 {
	position: relative;
	margin-bottom: 52px;
	font-size: 4.2rem;
	font-weight: 800;
	line-height: 1;
	letter-spacing: -2px;
	@media screen and (max-width: $breakpoint-md) {
		text-align: center;
		width: 100%;
		font-size: 3.2rem;
	}
	&::before {
		position: absolute;
		content: '';
		top: 40%;
		left: -30%;
		width: 160%;
		height: 20%;
		background-image: linear-gradient(-45deg, #c916ffa1 50%, #f836db91 50%);
		filter: blur(54px);
		z-index: 0;
		@media screen and (max-width: 1100px) {
			overflow-x: hidden;
			width: 100%;
			left: 0;
		}
	}
}

.schedule-info {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 4rem;

	@media screen and (max-width: $breakpoint-md) {
		width: 90%;
	}
}

.schedule {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-bottom: 8rem;
}

.schedule-item {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.section-heading {
	width: min(90%, 900px);
	position: sticky;
	top: 62px;
	z-index: 20;
	&:first-child {
		margin-top: 100px;
		@media screen and (max-width: $breakpoint-md) {
			margin-top: 32px;
		}
	}
	& + .talk {
		margin-top: 2px;
	}
	@media screen and (max-width: 1424px) {
		width: 100%;
		top: 62px;
		z-index: 9;
	}
	@media screen and (max-width: $breakpoint-md) {
		top: 48px;
	}
}
.section-heading h3 {
	width: 100%;
	text-align: center;
	padding: 18px;
	color: var(--app-color-foreground-violet-light);
	font-size: 13px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 1px;
	background-image: radial-gradient(
		ellipse at center -64px,
		var(--app-color-foreground-violet-light),
		var(--app-color-foreground-violet-mid) 18%,
		var(--app-color-foreground-violet-dark) 40%,
		rgba(0, 0, 0, 0.94) 70%
	);
	@media screen and (max-width: $breakpoint-md) {
		font-size: 0.75rem;
		letter-spacing: 0.5px;
	}
	&::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 1px;
		background-image: linear-gradient(
			to right,
			transparent,
			var(--app-color-foreground-violet-mid) 50%,
			transparent
		);
	}
}
</style>
