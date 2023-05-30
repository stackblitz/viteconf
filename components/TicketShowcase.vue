<script setup lang="ts">
import {
	clamp,
	useElementBounding,
	useElementSize,
	useMouse,
} from '@vueuse/core';
import { mcs, speakers } from '~~/conference';
import { type Framework } from '~~/helpers/constants';

const {
	ready = true,
	framework,
	forceShowFrameworkLogo = false,
	og = false,
	original = false,
	speakerName,
} = defineProps<{
	ready?: boolean;
	framework?: Framework;
	forceShowFrameworkLogo?: boolean;
	original?: boolean;
	og?: boolean;

	speakerName?: keyof typeof speakers | keyof typeof mcs;
}>();

const { width: bodyWidth } = useElementSize(globalThis?.window?.document.body);

const show = ref(false);
watchEffect(() => {
	if (bodyWidth.value > 0) {
		show.value = true;
	}
});

const ticketScale = computed(() =>
	bodyWidth.value >= 740 ? Math.min(1, (bodyWidth.value / 800) * 0.8) : 1
);

const ticketSize = computed(() => ({ width: '400px', height: '650px' }));

const { x, y } = useMouse();

const ticketInnerRef = ref<HTMLDivElement>();
const {
	left: ticketLeft,
	top: ticketTop,
	width: ticketWidth,
	height: ticketHeight,
} = useElementBounding(ticketInnerRef);

const origin = computed(() => ({
	x: ticketLeft.value + Math.floor(ticketWidth.value / 2),
	y: ticketTop.value + Math.floor(ticketHeight.value / 2) / 10,
}));

const animationSpeed = 250;
const animateState = ref('initial');
onMounted(() => {
	setTimeout(() => (animateState.value = 'middle'), animationSpeed);
	setTimeout(() => (animateState.value = 'go-back'), animationSpeed * 2);
	setTimeout(() => (animateState.value = 'center'), animationSpeed * 3);
	setTimeout(() => (animateState.value = 'end'), animationSpeed * 4);
});

const position = computed(() => {
	const width = ticketWidth.value,
		height = ticketHeight.value;
	let xn, yn;
	if (animateState.value === 'end' && !(x.value === 0 && y.value === 0)) {
		xn = x.value;
		yn = y.value;
	} else {
		if (animateState.value === 'initial') {
			xn = origin.value.x - width / 4;
		} else if (animateState.value === 'middle') {
			xn = origin.value.x + width / 8;
		} else if (animateState.value === 'go-back') {
			xn = origin.value.x - width / 16;
		} else {
			xn = origin.value.x;
		}
		yn = origin.value.y;
	}
	return {
		x: clamp(xn - origin.value.x, -width / 2, height / 2),
		y: clamp(-(yn - origin.value.y), -width / 2, height / 2),
	};
});

function getPerspectiveTransform(x: number, y: number) {
	return `rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg)`;
}

const perspectiveTransform = computed(() => {
	const transform = getPerspectiveTransform(
		position.value.y / ticketHeight.value / 1.8,
		position.value.x / ticketWidth.value / 1.8
	);
	return transform;
});
</script>

<template>
	<div v-show="show" class="ticket-section">
		<div :class="`portrait ticket-container`">
			<div
				class="ticket-inner"
				ref="ticketInnerRef"
				:style="
					animateState !== 'end'
						? `transition: transform ${animationSpeed / 1000}s ease-in-out;`
						: ''
				"
			>
				<Ticket
					:og="og"
					:original="original"
					:ready="ready"
					:framework="framework"
					:forceShowFrameworkLogo="forceShowFrameworkLogo"
					:speakerName="speakerName"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.ticket-section {
	transform: translate(0, 30px);
	margin-top: -20px;
	&::before {
		content: '';
		position: absolute;
		top: -300px;
		left: 0;
		width: 100%;
		height: 300px;
	}
}

.ticket-container {
	transform: scale(v-bind(ticketScale));
	transform-origin: 400px 220px;
	transition: transform 0.5s ease;
	height: v-bind('ticketSize.height');
	width: v-bind('ticketSize.width');
	perspective: 60px;
	margin: 0;
	@media screen and (max-width: 400px) {
		width: 100%;
	}
}

@media screen and (max-width: 738px) {
	.ticket-container {
		transform: translate(-25px 25px) scale(v-bind(ticketScale)) scale(0.8);
	}
}

.ticket-inner {
	width: 100%;
	height: 100%;
	transform: v-bind(perspectiveTransform);
	transform-origin: center 50px;
	transition: transform 0.12s ease-out;
}
</style>
