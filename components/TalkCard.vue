<script lang="ts" setup>
import { type TalkData } from '~~/conference';
import { logoPath } from '../helpers/utils';

const { talk } = defineProps<{
	talk: TalkData;
}>();

const speaker = computed(() => talk.speaker);

function toTalkStartTime(t: Date) {
	return t?.toISOString().substring(11, 16);
}
</script>

<template>
	<div class="talk-card">
		<div class="talk-content">
			<img
				loading="lazy"
				width="100"
				height="100"
				class="logo"
				:alt="`${speaker?.project?.name} logo`"
				:src="speaker ? logoPath(speaker) : `/images/viteconf.svg`"
			/>
			<div class="talk-info">
				<p class="title">
					{{ talk.title }}
				</p>
				<template v-if="talk.participants">
					<p
						v-for="(participant, i) in talk.participants"
						:key="i"
						class="speaker"
					>
						{{ participant.displayName }}
					</p>
				</template>
				<template v-else>
					<div class="speaker">
						{{ talk.speaker?.displayName }}
						<p class="company">
							<span v-if="speaker?.company && speaker?.company !== 'TBD'">
								{{ speaker?.company }}
							</span>
							<span>{{ speaker?.shortBio }}</span>
						</p>
					</div>
				</template>

				<p class="description">{{ talk.description }}</p>

				<!--p class="talk-time">
					<span class="time">
						Starts at {{ toTalkStartTime(talk.start) }} PST
					</span>
					<button>Add to Calendar</button>
				</p-->
			</div>
		</div>

		<img
			loading="lazy"
			class="avatar"
			v-if="talk.speaker?.avatar"
			:src="talk.speaker?.avatar"
		/>

		<div class="participants" v-if="talk.participants">
			<img
				loading="lazy"
				v-for="(participant, i) in talk.participants"
				v-bind:key="i"
				class="participant-avatar"
				width="80"
				height="80"
				:src="participant.avatar"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
$breakpoint-md: 760px;

.talk-card {
	position: relative;
	display: flex;
	align-items: flex-start;
	gap: 2rem;
	width: min(90%, 900px);
	border-top: 1px solid var(--app-color-foreground-violet-mid);
	&:last-child {
		margin-bottom: 100px;
		@media screen and (max-width: $breakpoint-md) {
			margin-bottom: 32px;
		}
	}
	@media screen and (max-width: $breakpoint-md) {
		gap: 1rem;
		width: 92%;
		max-height: 180px;
	}
}

.talk-content {
	flex: 1;
	display: flex;
	gap: 1.9rem;
	padding-top: 2.2rem;
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
	gap: 0.3rem;
}

.title {
	max-width: 600px;
	font-size: 1.16rem;
	font-weight: 700;
	line-height: 1.32;
	@media screen and (max-width: $breakpoint-md) {
		font-size: 1.1rem;
		max-width: calc(100% - 96px);
	}
}

.speaker {
	display: flex;
	align-items: baseline;
	gap: 24px;
	color: var(--app-color-foreground-violet-light);
	font-size: 1rem;
	font-weight: 500;
}

.avatar {
	object-fit: contain;
	width: 80px;
	height: 80px;
	margin: 24px;
	margin-right: 32px;
	border-radius: 50%;
	@media screen and (max-width: $breakpoint-md) {
		position: absolute;
		top: 0;
		right: 34px;
		margin: 12px 0;
		width: 28px;
		height: 28px;
		transform: translateY(4px);
	}
}

.participants {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 0.6rem 1.2rem;
	max-width: 280px;
	margin-top: 24px;
	margin-right: 32px;
	@media screen and (max-width: $breakpoint-md) {
		display: none;
	}
}
.participant-avatar {
	border-radius: 50%;
}

.logo {
	object-fit: contain;
	width: 42px;
	height: 42px;
	transform: translateY(3px);
	@media screen and (max-width: $breakpoint-md) {
		position: absolute;
		top: 0;
		right: 0;
		margin: 12px 0;
		width: 28px;
		height: 28px;
	}
}

.company {
	display: flex;
	gap: 6px;
	margin-top: 8px;
	transform: translateY(-1px);
	span {
		padding: 4px 10px;
		font-size: 0.7rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.7);
		border-radius: 4px;
		background-color: rgba(255, 255, 255, 0.1);
	}
}

.description {
	margin-top: 8px;
	color: rgba(255, 255, 255, 0.8);
	font-size: 0.9rem;
	line-height: 1.4;
}

.talk-time {
	display: flex;
	gap: 12px;
	margin-top: 12px;
	font-size: 0.9rem;
}
</style>
