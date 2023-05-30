<script lang="ts" setup>
import { createBlankTicket } from '~~/helpers/utils';

const { signupPage = 'https://viteconf.org', size } = defineProps<{
	signupPage?: string;
	size?: string;
}>();

let referralUrl = '';
onMounted(() => {
	if (document.referrer) {
		referralUrl = document.referrer;
	}
});

const emailIsValid = (email: string): boolean =>
	/^.+?@.+?\.[a-z]{2,}$/i.test(email);

const validationError = ref<string | null>(null);
const registering = ref(false);

async function onSubmit(e: Event) {
	e.preventDefault();

	const form = document.getElementById('viteconfRegistrationForm');
	const formData = new FormData(form as HTMLFormElement);
	for (const [key, value] of formData) {
		if (key === 'email') {
			if (!emailIsValid(value as string)) {
				validationError.value = 'A valid email is required';
				console.log('invalid email');
				return;
			}
		}
	}

	try {
		registering.value = true;
		// Can't use this until ActiveCampaign is fixed.
		//		await fetch('https://stackblitz.activehosted.com/proc.php', {
		//			method: 'POST',
		//			body: formData,
		//			mode: 'no-cors',
		//		});
		await fetch(
			(
				'https://viteconf.stackblitz.workers.dev/' + formData.get('email')
			).trim(),
			{
				method: 'GET',
				mode: 'cors',
			}
		);
		useTicket().value = createBlankTicket();
		navigateTo({ path: '/welcome' });
		window.scrollTo(0, 0);
		registering.value = false;
	} catch (e) {
		registering.value = false;
		console.error(e);
	}
}
const campaignId = 9;
</script>

<template>
	<form
		id="viteconfRegistrationForm"
		@submit="onSubmit"
		:class="{ registering, ['size-small']: size === 'small' }"
	>
		<label
			for="newsletter-input"
			class="input-container"
			:class="{ error: !!validationError }"
			ref="inputContainer"
			id="newsletter-input-container"
		>
			<div v-show="registering" class="registering-info">Registering...</div>
			<input
				id="newsletter-input"
				:class="{ error: !!validationError }"
				placeholder="Enter your email"
				type="email"
				name="email"
				@focus="validationError = null"
			/>
			<input type="hidden" name="u" :value="campaignId" />
			<input type="hidden" name="f" :value="campaignId" />
			<input type="hidden" name="s" />
			<input type="hidden" name="c" value="0" />
			<input type="hidden" name="m" value="0" />
			<input type="hidden" name="act" value="sub" />
			<input type="hidden" name="v" value="2" />
			<input type="hidden" name="field[25]" :value="signupPage" />
			<input type="hidden" name="field[26]" :value="referralUrl" />
			<button
				:disabled="registering"
				@click="onSubmit"
				class="submit"
				type="button"
				name="submit"
			>
				Register
			</button>
		</label>
	</form>
</template>

<style lang="scss" scoped>
.registering-info {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	font-weight: 700;
	border-radius: 4px;
	box-shadow: 0 0 0 2px var(--app-color-foreground-blue);
	background: var(--app-color-shell);
	z-index: 10;
	@media screen and (max-width: 500px) {
		font-size: 1rem;
	}
}
.input-container {
	--button-bgcolor-hsl: var(--app-color-shell-hs), 13%;
	--button-color: var(--app-color-light);

	position: relative;
	display: grid;
	grid-template-columns: 1fr auto;

	padding: 0.5rem;
	padding-left: 1.6rem;

	font-size: 1.2rem;
	font-weight: 500;

	border-radius: 6px;
	box-shadow: 0 0 0 2px var(--app-color-foreground-blue);
	background-color: var(--app-color-background-blue-dark);
	outline: none;

	cursor: text;
	@media screen and (max-width: 500px) {
		grid-template-columns: 100%;
		padding: 0;
		box-shadow: none;
	}
}
.input-container.error {
	outline: 2px solid #ff0000aa;
}

input {
	max-width: 100%;
	color: inherit;
	caret-color: var(--app-color-foreground-blue);
	background-color: transparent;
	border: none;
	outline: none;
	&::placeholder {
		color: var(--app-color-foreground-blue);
		font-size: 1.05rem;
		opacity: 0.8;
	}
	@media screen and (max-width: 500px) {
		padding: 18px 24px;
		box-shadow: inset 0 0 0 2px var(--app-color-foreground-blue);
		border-radius: 3px;
		margin-bottom: 12px;
	}
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
	-webkit-box-shadow: 0 0 0 30px hsl(281, 67%, 5%) inset !important;
}

input:-webkit-autofill {
	-webkit-text-fill-color: white !important;
}

.submit {
	min-width: 152px;
	height: 100%;
	padding: 0.94rem 0.8rem;

	color: var(--button-color);
	font-size: 1.1rem;
	font-weight: 600;

	border-radius: 4px;
	background-color: #eef8ff;

	transition: 0.16s ease;
	transition-property: background-color, box-shadow, color;

	@media screen and (max-width: 768px) {
		width: 100%;
	}
	@media screen and (max-width: 500px) {
		min-width: unset;
		padding: 1.4rem 1.8rem;
		font-size: 1.3rem;
		font-weight: 700;
	}
	transition: opacity 1s;
}
.registering .submit {
	opacity: 0.5;
	pointer-events: none;
}

.size-small {
	.input-container {
		height: 40px;
		padding: 0;
		padding-left: 1rem;
		font-size: 1rem;
		box-shadow: 0 0 0 1px var(--app-color-foreground-blue-50);
		border-radius: 4px;
		transition: 0.1s ease;
		transition-property: background-color, box-shadow;
		@media screen and (max-width: 500px) {
			grid-template-columns: 1fr auto;
			height: unset;
			border-radius: 4px;
		}
		&:hover {
			box-shadow: 0 0 0 1px var(--app-color-foreground-blue);
		}
	}
	input {
		margin-bottom: 0;
		font-size: 0.9rem;
		font-weight: 600;
		width: 24ch;
		@media screen and (max-width: 500px) {
			padding: 0.72rem 0;
			box-shadow: none;
		}
		&::placeholder {
			font-size: 0.8rem;
			transition: 0.1s ease;
			transition-property: background-color, color, box-shadow;
		}
		&:focus::placeholder {
			color: var(--app-color-foreground-blue-light);
		}
	}
	.submit {
		min-width: unset;
		height: 100%;
		padding: 0.6rem 1.4rem;
		color: #fff;
		font-size: 0.8rem;
		font-weight: 700;
		border-radius: 4px;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		background-color: transparent;
		box-shadow: -1px 0 0 0 var(--app-color-foreground-blue-50);
		transition: 0.1s ease;
		transition-property: background-color, box-shadow;
		&:hover {
			box-shadow: 0 0 0 1px var(--app-color-foreground-blue),
				0 0 16px 1px var(--app-color-foreground-blue);
			background-color: var(--app-color-background-violet-dark);
		}
		@media screen and (max-width: 500px) {
			padding: 0 1.4rem;
			font-size: 0.9rem;
		}
	}
}
</style>
