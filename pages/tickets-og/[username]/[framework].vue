<script lang="ts" setup>
import { mcs, speakers } from '~~/conference';
import { Framework } from '~~/helpers/constants.js';
import { createBlankTicket } from '~~/helpers/utils';

const ticket = useTicket();
const route = useRoute();

const screenName = route.params.username as string;
const username = screenName.toLowerCase() as keyof typeof speakers;
const framework = route.params.framework as Framework;

const isSpecial = $computed(() => username in speakers || username in mcs);

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
				<div class="ticket-inner" ref="{ticketInnerRef}">
					<Ticket
						:og="true"
						:force-show-framework-logo="isBlankTicket || null"
						:framework="isBlankTicket ? framework : null"
						:speakerName="isSpecial ? username : null"
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
	width: 2400px;
	height: 1200px;
}

.ticket-container {
	height: 375px;
	width: 800px;
	perspective: 40px;
	transform: scale(2.7) translate(0px, 5px); // scale(1.45) translate(0px,5px);
}
.ticket-inner {
	height: 100%;
	width: 100%;
}
</style>
