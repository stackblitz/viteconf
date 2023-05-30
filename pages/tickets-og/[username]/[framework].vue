<script lang="ts" setup>
import { mcs, speakers } from '~~/conference';
import { Framework } from '~~/helpers/constants.js';
import { createBlankTicket } from '~~/helpers/utils';

const ticket = useTicket();
const route = useRoute();

const screenName = route.params.username as string;
const username = screenName.toLowerCase() as keyof typeof speakers;
const framework = route.params.framework as Framework;

const isSpecial = computed(() => username in speakers || username in mcs);

const isBlankTicket = screenName === '_';

screenCheck: if (screenName && !isSpecial) {
	try {
		if (isBlankTicket) {
			ticket.value = createBlankTicket();
			break screenCheck;
		}

		const loadedTicket = await getTicketInfo(screenName);
		if (loadedTicket) {
			loadedTicket.favoriteFrameworks = framework;
			ticket.value = loadedTicket;
		}
	} catch {
		// TODO: handle invalid user
	}
}
</script>

<template>
	<div>
		<EcosystemBackgroundOG x="480px" y="720px" />
		<div class="frame">
			<div class="ticket-container">
				<div class="ticket-inner">
					<Ticket
						:og="true"
						:force-show-framework-logo="isBlankTicket || undefined"
						:framework="isBlankTicket ? framework : undefined"
						:speakerName="isSpecial ? username : undefined"
					></Ticket>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.frame {
	position: relative;
	display: grid;
	align-items: center;
	justify-items: center;
	width: 1200px;
	height: 1200px;
}

.ticket-container {
	height: 650px;
	width: 400px;
	transform: scale(1.7);
}
.ticket-inner {
	height: 100%;
	width: 100%;
}
</style>
