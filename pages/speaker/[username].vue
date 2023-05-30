<script lang="ts" setup>
import { speakers } from '~~/conference';

const route = useRoute();
const screenName = route.params.username as keyof typeof speakers;
const username = screenName.toLowerCase();
const ticket = useTicket();

try {
	const loadedTicket = await getTicketInfo(screenName);
	ticket.value = loadedTicket;
} catch (e) {
	console.log(e);
}

const user = useUser();

useSpeakerHead(screenName);

const signupPage = `https://viteconf.org/tickets/${username}`;

const showOptions = useShowAfterUserInit(600);

const isMyTicket = computed(
	() => user.value && user.value.uid === ticket.value.uid
);
</script>

<template>
	<div>
		<EcosystemBackground />
		<UserActions :cta="false" />
		<main :class="{ register: showOptions && !user }">
			<div class="ticket-showcase">
				<div
					class="options-container"
					:style="`transition: opacity 0.6s; opacity: ${showOptions ? 1 : 0}`"
				>
					<template v-if="showOptions">
						<template v-if="user">
							<div class="ticket-actions" v-if="isMyTicket">
								<TicketSharing />
							</div>
							<template v-else>
								<button
									class="go-to-my-ticket social-button feature blue"
									@click="goToUserTicket"
								>
									Go to my ticket
								</button>
							</template>
						</template>
						<div class="guest-message" v-else>
							<p class="description">
								{{ ticket.displayName ? ticket.displayName : screenName }} is
								speaking at ViteConf!
							</p>
							<p class="subheading">
								<strong>Register</strong> and get your
								<strong>free ticket now</strong>
							</p>
							<RegistrationEmailForm :signupPage="signupPage" />
						</div>
					</template>
				</div>
			</div>
			<div class="ticket-section valid">
				<TicketShowcase :speakerName="screenName" />
			</div>
			<div class="ticket-options">
				<TicketOptions v-if="showOptions && isMyTicket" />
			</div>
		</main>
		<div class="tickets-footer">
			<div class="user-info"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.guest-message {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-self: center;
	@media screen and (min-width: 768px) {
		width: min(600px, 100%);
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
	grid-template-rows: 740px auto auto;
	grid-template-areas:
		'ticket'
		'sharing'
		'options';
	justify-items: center;
	align-items: center;
	gap: 1em;
	padding: 1em;
	position: relative;
	// vertical
	@media screen and (max-height: 800px) {
		grid-template-rows: 780px auto auto;
		min-height: 692px;
	}
	@media screen and (max-height: 740px) {
		padding: 0;
		min-height: 640px;
	}
	// horizontal
	@media screen and (max-width: 768px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		height: 100%;
		width: 100%;
		min-height: calc(max(100vh - 3em));
		max-height: unset;
		padding-top: 0;
		padding-left: 0;
		padding-right: 0;
		overflow: hidden;
	}
}

.ticket-actions {
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	height: 100%;
	width: 100%;
	padding-top: 40px;
	@media screen and (max-height: 800px) {
		padding-top: 32px;
	}
}

.options-container {
	height: 100%;
	width: 100%;
	display: grid;
	justify-items: center;
	@media screen and (max-width: 768px) {
		height: auto;
		display: flex;
		justify-content: center;
	}
}

.signed-info {
	font-size: 1.2rem;
	font-weight: bold;
	height: 3em;
}
.ticket-showcase {
	height: 100%;
	width: 100%;
	align-self: start;
	display: flex;
	flex-direction: column;
	margin: 0;
	@media screen and (max-width: 768px) {
		align-self: center;
		justify-content: center;
		background-color: #000;
		z-index: 1;
		min-height: 360px;
		padding: 2.5rem;
		border-bottom: 1px solid #222;
		box-shadow: #111 0px 0px 20px;
	}
	@media screen and (max-width: 500px) {
		padding: 1.1rem;
	}
}

.ticket-options {
	display: grid;
	align-self: flex-start;
	align-items: center;
	justify-items: center;
	grid-area: options;
}

.ticket-actions {
	width: 80%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 2em;
	@media screen and (max-width: 1024px) {
		width: 100%;
	}
}

.ticket-section {
	grid-area: ticket;
}

.user-info {
	display: flex;
	justify-self: start;
	padding-left: 1em;
	gap: 1em;
}
.user-info button {
	color: #eef8ffee;
	height: 2rem;
	font-size: 0.8em;
	border: 0;
	opacity: 0.5;
	background: transparent;
}
.user-info button:hover {
	opacity: 1;
	background: transparent;
}

.subheading {
	margin-bottom: 24px;
	color: var(--app-color-foreground-blue-light);
	font-size: 1.6rem;
	text-align: center;
	max-width: 600px;
	@media screen and (max-width: 768px) {
		font-size: 1.3rem;
	}
	@media screen and (max-width: 400px) {
		max-width: 100%;
	}
}

.go-to-my-ticket {
	width: 20rem;
}

.description {
	text-align: center;
	max-width: 800px;
	margin-top: 24px;
	margin-bottom: 8px;
	font-size: 1.8rem;
	font-weight: 800;
	line-height: 1.16;
	@media screen and (max-width: 768px) {
		margin-bottom: 20px;
		font-size: 1.8rem;
		line-height: 1.3;
		padding: 0 16px;
	}
	@media screen and (max-width: 500px) {
		margin-bottom: 12px;
	}
}
</style>
