<script lang="ts" setup>
const ticket = useTicket();
const route = useRoute();

const screenName = route.params.username as string;
if (screenName) {
	try {
		const loadedTicket = await getTicketInfo(screenName);
		if (loadedTicket) {
			ticket.value = loadedTicket;
		}
	} catch {
		// TODO: handle invalid user
	}
}
</script>

<template>
	<EcosystemBackground x="600px" y="300px" />
	<div class="frame">
		<div class="ticket-container">
			<div class="ticket-inner" ref="{ticketInnerRef}">
				<Ticket></Ticket>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.frame {
	display: grid;
	align-items: center;
	justify-items: center;
	width: 1200px;
	height: 600px;
}
.ticket-container {
	height: 375px;
	width: 800px;
}
.ticket-inner {
	height: 100%;
	width: 100%;
}
</style>
