<script lang="ts" setup>
import SunIcon from '~icons/material-symbols/wb-sunny-outline';
import MoonIcon from '~icons/ph/moon-bold';

const { isDark, toggleTheme } = useTheme();
</script>

<template>
	<div>
		<span
			class="toggle-wrapper"
			role="switch"
			:aria-checked="isDark"
			:aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
			tabindex="0"
			@click="toggleTheme()"
			@keydown.space.prevent="toggleTheme()"
		>
			<span
				aria-hidden="true"
				class="toggle-background"
				:class="{ checked: isDark }"
			/>
			<span class="toggle-indicator" :class="{ checked: isDark }">
				<SunIcon v-if="!isDark" />
				<MoonIcon v-else="isDark" />
			</span>
		</span>
	</div>
</template>

<style scoped lang="scss">
.toggle-wrapper {
	--border-color-alpha: 0.3;

	display: flex;
	align-items: center;

	position: relative;

	cursor: pointer;

	width: 54px;
	height: 30px;

	border-radius: 9999px;

	transition: box-shadow var(--transition-duration) ease-in;

	box-shadow: 0 0 0 1px
		hsla(var(--app-color-light-contrast-hsl), var(--border-color-alpha));

	&:hover {
		--border-color-alpha: 0.5;
	}

	&:focus {
		outline: 0;
	}
}

.toggle-background {
	display: inline-block;

	border-radius: inherit;

	background-color: hsla(0, 0%, 90%);

	height: 100%;
	width: 100%;

	&.checked {
		background-color: hsl(var(--app-color-shell-hs), 15%);
	}
}

// :global(body.dark .toggle-background) {
// 	background-color: hsl(var(--app-color-shell-hs), 5%);
// }

@media (prefers-reduced-motion: reduce) {
	.toggle-indicator {
		transition: none;
	}
}

.toggle-indicator {
	display: grid;
	place-items: center;

	position: absolute;
	left: 2px;
	bottom: 2px;

	color: hsla(var(--app-color-light-contrast-hsl), 0.8);
	font-size: 0.9rem;

	background-color: white;

	height: 26px;
	width: 26px;

	border-radius: 9999px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	transition: transform 0.2s ease;

	&.checked {
		transform: translate3d(24px, 0, 0);

		background-color: var(--app-color-light);
	}
}
</style>
