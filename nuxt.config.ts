import UnpluginIcons from 'unplugin-icons/vite';

const plugins = [UnpluginIcons({ compiler: 'vue3', autoInstall: true })];

// Only enable sharp if we're not in a webcontainer env
if (!process.versions.webcontainer) {
	plugins.push(
		require('vite-imagetools').imagetools({
			defaultDirectives(url) {
				if (url.searchParams.has('avatar')) {
					return new URLSearchParams('webp&height=200&width=200&quality=90');
				}
			},
		})
	);
}

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	experimental: { reactivityTransform: true },
	vite: {
		plugins,
	},
	alias: {
		'@avatars': new URL('./assets/avatars/', import.meta.url).href,
	},
	vue: {
		compilerOptions: {
			isCustomElement: (tag) => ['widgetbot'].includes(tag),
		},
	},
});
