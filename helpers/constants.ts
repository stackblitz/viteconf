export const discordLink =
	'discord.com/channels/804011606160703521/1028017773487599686';
export const liveTranscriptsLink =
	'https://event-captioner.fly.dev/events/viteconf/';

export const FRAMEWORKS = [
	'Vite',
	'Vue',
	'Svelte',
	'React',
	'Preact',
	'Solid',
	'Marko',
	'Lit',
	'Angular',
	'Nuxt',
	'Astro',
	'Hydrogen',
	'Vitest',
	'Cypress',
	'Playwright',
	'Tauri',
	'Laravel',
	'fastify',
	'Rollup',
	'Elm',
	'Bun',
	'Deno',
	'Storybook',
	'Bytes',
	'VueSchool',
	'DotLabs',
	'Shopify',
	'NativeScript',
	'Nx',
	'storyblok',
	'ionic',
	'SvelteSirens',
	'MUI',
	'dashibase',
	'supabase',
	'Fauna',
	'Firebase',
	'AWS',
	'Vercel',
	'Cloudflare',
	'Netlify',
	'StackBlitz',
] as const;

export type Framework = typeof FRAMEWORKS[number];
