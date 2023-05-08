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

const rx = +route.query['rx'];
const ry = +route.query['ry'];
const s = +route.query['s'];
const perspectiveTransform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
</script>

<template>
	<div>
		<EcosystemBackground x="600px" y="300px" />
		<div class="frame">
			<div class="ticket-container">
				<div class="ticket-inner" ref="{ticketInnerRef}">
					<Ticket></Ticket>
				</div>
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
	perspective: 40px;
	transform: scale(s) translate(20px, 5px);
}
.ticket-inner {
	height: 100%;
	width: 100%;
	transform: v-bind(perspectiveTransform);
}
</style>
