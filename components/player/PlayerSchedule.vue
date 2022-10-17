<script setup lang="ts">
import { confetti } from '@neoconfetti/svelte';
import { type Directive } from 'vue';
import { waitFor } from '~~/helpers/wait-for';

const { 
	showLiveTalkLink,
	isLive = false
} = defineProps<{ 
	showLiveTalkLink: boolean, 
	isLive?: boolean 
}>();

const wrapUpEl = ref<HTMLDivElement>();

const { upcomingTalks } = $(usePlayerCurrentSchedule());

let eventEnded = $ref(false);

let throwConfetti = $ref(false);
let socialActionsRevealed = $ref(false);

let confettiKey = $ref(0);

watchEffect(() => {
	if (upcomingTalks.length === 0) {
		eventEnded = true;
	}
	else {
		eventEnded = false;
		throwConfetti = false;
		confettiKey = 0;
		socialActionsRevealed = false;		
	}
});

watch(
	$$(eventEnded),
	async (eventEnded) => {
		if (eventEnded) {
			await waitFor(1000);
			wrapUpEl.value?.scrollIntoView({
				behavior: 'smooth',
				inline: 'center',
				block: 'start',
			});

			await waitFor(800);
			throwConfetti = true;

			await waitFor(500);
			socialActionsRevealed = true;

			await waitFor(2000);
			confettiKey = 1;

			await waitFor(2700);
			confettiKey = 2;
		}
	},
	{ immediate: true, flush: 'post' }
);

const vConfetti: Directive<HTMLElement> = {
	mounted: (el) =>
		confetti(el, {
			colors: ['#bd34fe', '#47caff', '#fff'],
			stageHeight: 2000,
			stageWidth: 2000,
			duration: 4000,
			particleCount: 200,
		}),
};
</script>

<template>
	<div class="live-schedule">
		<div ref="wrapUpEl" class="wrap-up" v-if="eventEnded">
			<h4 style="font-size: 4rem">And that's a wrap</h4>

			<div
				:key="confettiKey"
				class="confetti"
				v-if="throwConfetti"
				v-confetti
			></div>

			<div
				class="after-conf social-actions"
				:class="{ show: socialActionsRevealed }"
			>
				<SocialActions />
			</div>
		</div>
		<div class="upcoming-talks" v-else>
			<h4>Upcoming talks</h4>
			<ConferenceScheduleTalk
				v-for="(talk, i) in upcomingTalks"
				:talk="talk"
				:key="i"
				:showLiveTalkLink="showLiveTalkLink"
				:replay="!isLive"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.upcoming-talks,
.wrap-up {
	display: grid;
	justify-items: center;
	width: 100%;
}

.upcoming-talks {
	@media screen and (max-height: 700px) {
		display: none;
	}
}

.wrap-up h4 {
	text-align: center;
	line-height: 1;

	margin: 5rem 0;
}

.live-schedule {
	margin-top: 0.5rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 3rem;
}

.confetti {
	position: fixed;
	top: 0vh;
}

.after-conf {
	opacity: 0;
	touch-action: none;

	transition: opacity 0.5s ease-in-out;

	margin: -2rem 0;

	&.show {
		opacity: 1;
		touch-action: unset;
	}
}

.social-actions {
	margin-bottom: -5rem;
}
</style>
