<script lang="ts" setup>
const user = useUser();

useMainHead();

let creatingTicket = false;
async function register() {
	creatingTicket = true;
	await signInUser();
	goToUserTicket();
	creatingTicket = false;
}

watch(user, () => {
	if (user.value && !creatingTicket) {
		goToUserTicket();
	}
});
</script>

<template>
	<div>
		<EcosystemBackground />
		<UserActions :cta="false" />
		<main>
			<div :class="`ticket-section valid`">
				<TicketShowcase />
			</div>

			<div class="customize-ticket-container">
				<div class="customize-ticket-message">
					<h2>You're in!</h2>
					<h3>Generate a unique ticket with your GitHub profile</h3>
					<p>Only public information will be used</p>
				</div>
				<button class="social-button feature blue" @click="register">
					<img
						aria-hidden="true"
						role="presentation"
						src="/images/github.svg"
					/>
					Customize my ticket!
				</button>
			</div>
		</main>
	</div>
</template>

<style scoped lang="scss">
.options-container {
	display: flex;
	align-items: flex-start;
}

.customize-ticket-container {
	display: flex;
	align-items: center;
	align-self: flex-start;
	gap: 64px;
	@media screen and (max-width: 768px) {
		align-self: center;
		flex-direction: column;
		gap: 32px;
		height: 360px;
		width: 100%;
		max-width: 100%;
		padding: 72px 24px 64px;
		border-bottom: 1px solid #222;
		background-color: #000;
		z-index: 1;
	}
}

.customize-ticket-message {
	display: flex;
	flex-direction: column;
	max-width: 100%;
}

.customize-ticket-message h2 {
	margin-bottom: 24px;
	font-size: 72px;
	font-weight: 800;
	letter-spacing: -2px;
	line-height: 1;
	@media screen and (max-width: 768px) {
		margin-bottom: 16px;
		font-size: 52px;
	}
}

.customize-ticket-message h3 {
	max-width: 400px;
	font-size: 30px;
	font-weight: 700;
	letter-spacing: -0.5px;
	line-height: 1.2;
	@media screen and (max-width: 768px) {
		max-width: 100%;
		font-size: 24px;
	}
}

.customize-ticket-message p {
	margin-top: 12px;
	display: block;
	font-size: 1rem;
	font-weight: 500;
	opacity: 0.8;
}

.customize-ticket-container .social-button {
	width: unset;
	gap: 24px;
	img {
		height: 32px;
	}
	@media screen and (max-width: 400px) {
		width: 100%;
		padding-left: 24px;
		padding-right: 24px;
		font-size: 1.3rem;
	}
}

.tickets-footer {
	height: 2em;
	width: 100%;
	padding: 0.5em;
	padding-right: 1.5em;
	display: grid;
	justify-items: end;
	margin: 0;
	grid-template-columns: 1fr 1fr;
}
:ticket-footer a:hover {
	color: #a744f4;
}

main {
	margin: 0;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 50% 50%;
	grid-template-areas:
		'ticket'
		'options';
	justify-items: center;
	align-items: center;
	gap: 5em;
	padding: 1em;
	height: 100vh;
	min-height: 740px;
	max-height: 1060px;
	position: relative;
	@media screen and (max-width: 768px) {
		display: flex;
		flex-direction: column-reverse;
		max-height: unset;
		height: unset;
		padding: 0;
		padding-bottom: 120px;
		overflow: hidden;
		gap: 16px;
	}
}

.ticket-section {
	grid-area: ticket;
	@media screen and (max-width: 768px) {
		align-self: center;
	}
}
</style>
