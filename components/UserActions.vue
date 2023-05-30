<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core';

const { cta = true } = defineProps<{ cta?: boolean }>();

const user = useUser();

const smiggetEl = ref<HTMLDivElement>();

const opaqueUserActions = ref(false);
useIntersectionObserver(
	smiggetEl,
	([{ isIntersecting }]) => (opaqueUserActions.value = !isIntersecting)
);
</script>

<template>
	<div class="user-actions-container" :class="{ scrolling: opaqueUserActions }">
		<NuxtLink to="/" title="ViteConf" class="logo">
			<img
				aria-hidden="true"
				role="presentation"
				width="32"
				height="32"
				src="/images/viteconf.svg"
			/>
			<span class="logo-text">ViteConf</span>
		</NuxtLink>

		<div class="user-actions">
			<template v-if="cta">
				<!--a
					v-if="user"
					title="Add to Calendar"
					class="add-to-calendar addeventatc"
					data-id="gn14349636"
					href="https://www.addevent.com/event/gn14349636"
					target="_blank"
				>
					<img src="/images/icons/calendar-plus-solid.svg" />
					Add to Calendar
				</a-->

				<div class="register-cta" v-if="!user">
					<span class="cta-text">Get your free ticket!</span>
					<RegistrationEmailForm size="small" />
				</div>
			</template>
			<button v-if="user" @click="signOutUser" title="Logout" class="logout">
				<img alt="Sign Out" src="/images/sign-out-regular.svg" />
			</button>
		</div>
	</div>

	<div ref="smiggetEl" aria-hidden="true" class="smigget" />
</template>

<style scoped lang="scss">
$breakpoint-md: 760px;

.user-actions-container {
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	top: 0;
	left: 0;
	width: 100%;
	height: 62px;
	padding: 0 6px;
	z-index: 30;
	transition: background-color 150ms ease-in;
	&.scrolling {
		background-color: #000;
	}
	@media screen and (max-width: $breakpoint-md) {
		height: 48px;
		padding: 0;
	}
}

.smigget {
	width: 100%;
	height: 0.5px;
}

button {
	display: block;
	opacity: 0.6;
	cursor: pointer;

	opacity: 0.9;

	transition: opacity 150ms ease-in;
}

.logo:hover {
	opacity: 1;
}

.logo {
	display: flex;
	margin-left: 1rem;
}

.logo-text {
	margin-left: 14px;
	font-size: 1.2rem;
	font-weight: 700;
	background-image: var(--app-background-gradient-blue_to_violet);
	background-clip: text;
	-webkit-text-fill-color: transparent;
	color: transparent;
	transition: 0.3s ease;
	@media screen and (max-width: 500px) {
		display: none;
		font-size: 1.4rem;
	}
}

.logo:hover .logo-text {
	color: #fff;
}

.register-cta {
	display: flex;
	align-items: center;
	gap: 2rem;
	margin-right: 0.5rem;
}
.register {
	padding: 10px 24px;
	color: #fff;
	font-size: 0.9rem;
	font-weight: 700;
	border-radius: 4px;
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
	background: var(--app-color-background-blue);
	opacity: 1;
}

.user-actions {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.logout {
	padding: 0 1rem;
	img {
		width: 22px;
		height: 22px;
		@media screen and (max-width: 500px) {
			width: 20px;
			height: 20px;
		}
	}
}

.cta-text {
	font-size: 0.9rem;
	font-weight: 700;
	@media screen and (max-width: 800px) {
		display: none;
	}
}

.user-actions a.add-to-calendar.addeventatc {
	display: flex;
	align-items: center;
	gap: 2ch;
	color: #fff !important;
	background: none;
	height: 40px;
	margin: 0 0.6rem;
	padding: 0.4rem 1.4rem;
	font-size: 0.8rem;
	font-weight: 700;
	box-shadow: 0 0 0 1px var(--app-color-foreground-blue-50) !important;
	border-radius: 4px;
	transition: 0.1s ease;
	transition-property: background-color, box-shadow;
	&:hover {
		box-shadow: 0 0 0 1px var(--app-color-foreground-blue),
			0 0 16px 0 var(--app-color-foreground-blue) !important;
		background-color: var(--app-color-background-violet-dark);
	}
	@media screen and (max-width: 500px) {
		font-size: 0.9rem;
		padding: 0.72rem 0;
		box-shadow: none !important;
		background: none;
	}
	img {
		width: 16px;
		z-index: 10;
	}
}
</style>
