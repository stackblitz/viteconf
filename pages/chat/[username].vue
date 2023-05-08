<script lang="ts" setup>
import { discordLink } from '~~/helpers/constants';
import { useSpeakerChatHead } from '../../composables/useHead';
import { SpeakerData, speakers } from '../../conference';

const route = useRoute();
const screenName = route.params.username as string;
const username = screenName.toLowerCase();

const speaker = speakers[username] as SpeakerData;
if (speaker) {
	useSpeakerChatHead(speaker.screenName);
}

setTimeout(() => {
	if (globalThis.location && !import.meta.env.DEV)
		globalThis.location.href = speaker?.chat
			? `https://${speaker.chat}`
			: discordLink;
}, 500);
</script>

<template>
	<div>
		<EcosystemBackground />
		<HeroBanner />
	</div>
</template>

<style scoped lang="scss"></style>
