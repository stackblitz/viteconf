<script lang="ts" setup>
const { speaker } = defineProps({ speaker: { type: Object, required: true } });

const blankColor = '#888888';

const brandColor = computed<string>(
	() => speaker.project.brandColor ?? blankColor
);

const backgroundColor = computed(() => brandColor.value + '1f');

const borderColor = computed(() => brandColor.value + '33');

const innerBorderColor = computed(() => brandColor.value + 'bb');
</script>

<template>
	<div class="speaker-card">
		<div class="speaker-card-inner">
			<div class="avatar">
				<a target="_blank" :href="speaker.project.url">
					<img
						width="100"
						height="100"
						:alt="`${speaker.project?.name} logo`"
						:src="`/projects/${speaker.project?.name.toLowerCase()}.svg`"
					/>
				</a>
			</div>
			<div class="speaker-info">
				<p class="name">{{ speaker.name }}</p>
				<p class="topic">{{ speaker.topic }}</p>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.speaker-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	@media screen and (max-width: 500px) {
		align-items: flex-start;
	}
}

.speaker-card {
	width: 270px;
	height: 250px;
	border: 2px solid #88888888;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	padding: 10px;

	border-radius: 10px;
	transition: border-color 0.5s;

	@media screen and (max-width: 500px) {
		width: 100%;
		height: 140px;
		padding: 4px;
	}
}

.speaker-card:hover {
	border: 2px solid v-bind(borderColor);
	background-color: v-bind(backgroundColor);
}

.speaker-card:hover .name {
	color: v-bind(innerBorderColor);
}

.speaker-card-inner {
	width: 100%;
	height: 100%;

	gap: 0;
	padding: 20px;
	border-radius: 6px;
	position: relative;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	filter: grayscale(100%);
	border: 4px solid transparent;
	@media screen and (max-width: 500px) {
		flex-direction: row;
		justify-content: flex-start;
		padding: 0;
		padding-right: 16px;
	}
}

.speaker-card:hover .speaker-card-inner {
	filter: none;
	border: 4px solid v-bind(innerBorderColor);
}

.avatar {
	border-radius: 50%;
	width: 130px;
	height: 130px;
	margin-bottom: 0;
	display: grid;
	align-items: center;
	@media screen and (max-width: 500px) {
		display: flex;
		align-items: flex-start;
		width: 116px;
		padding-left: 24px;
	}
}

a {
	display: block;
	height: 100%;
	display: grid;
	align-items: center;
	justify-items: center;
	@media screen and (max-width: 500px) {
		display: flex;
		justify-content: center;
	}
}
img {
	height: 100px;
	width: auto;
	max-width: 100px;
	object-fit: contain;
	@media screen and (max-width: 500px) {
		height: 64px;
		max-width: 64px;
	}
}

.name {
	font-size: 1.2rem;
	font-weight: 700;
	@media screen and (max-width: 500px) {
		margin-bottom: 6px;
		font-size: 1.5rem;
		line-height: 1.2;
	}
}

.topic {
	font-size: 1rem;
	font-style: italic;
	font-weight: 500;
}
</style>
