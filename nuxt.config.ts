import UnpluginIcons from 'unplugin-icons/vite';

const plugins = [UnpluginIcons({ compiler: 'vue3', autoInstall: true })];

// Only enable sharp if we're not in a webcontainer env
if (!process.versions.webcontainer) {
	plugins.push(require('vite-imagetools').imagetools());
}

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
		},
	},
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
