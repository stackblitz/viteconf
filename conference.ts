export const startDateTime = new Date('October 11, 2022 07:00:00 PDT'); // Pacific Day saving Time

export type ProjectID = keyof typeof projects;
export type ProjectData = {
	name: string;
	url: string;
	brandColor: string;
	secondaryColor?: string;
	logo?: string;
	playground?: string;
};

export type SpeakerData = {
	screenName: string;
	displayName: string;
	showOriginal?: boolean;
	avatar?: string;
	project: ProjectData;
	company: string;
	jobTitle?: string;
	bio: string;
	shortBio?: string;
	twitter?: string;
	talk?: TalkData;
	/** Dynamically Added when `talk` is attached to a speaker. */
	extra?: TalkData;
	chat: string;
	// When doing MC
	section?: string;
};

export type TalkData = {
	title: string;
	/** This is necessary, but calculated dynamically, hence marking as optional */
	key?: string;
	start?: Date;
	shortTitle?: string;
	ticketTitle?: string;
	description?: string;
	speaker?: SpeakerData;
	participants?: SpeakerData[];
	duration: number;

	/** Only for the schedule */
	time?: number;

	/** Dynamically added for live page, to add section */
	sectionTitle?: string;

	slideImage?: string;
	video?: string;
};

export type ScheduleData = {
	talks: TalkData[];
	title?: string;
};

export type SpeakerListLayout = 'rows' | 'grid' | 'card';

const optimizedAvatars = import.meta.glob('./assets/avatars/*', {
	eager: true,
	query: { avatar: true },
});

const optimizedSlides = import.meta.glob('./assets/slides/*', {
	eager: true,
	query: { slide: true },
});

const urls = {
	storyblok:
		'https://www.storyblok.com/?utm_source=vite&utm_medium=display&utm_campaign=AWA_SPON_VITE_TRA&utm_content=viteconf22',
};

const getTypedProjects = <ProjectID extends string>(
	projects: Record<ProjectID, ProjectData>
) => projects;

export const projects = getTypedProjects({
	angular: {
		name: 'Angular',
		url: 'https://angularjs.com',
		brandColor: '#dd1b16',
		playground:
			'https://github.com/nxext/nx-extensions/tree/main/packages/angular/vite',
	},
	astro: {
		name: 'Astro',
		url: 'https://astro.build',
		brandColor: '#F9FAFB',
		playground: 'https://astro.new/',
	},
	aws: {
		name: 'AWS Amplify',
		url: 'https://aws.amazon.com/amplify/',
		brandColor: '#FFC300',
		secondaryColor: '#ffffff',
	},
	bun: {
		name: 'Bun',
		url: 'https://bun.sh',
		brandColor: '#fbf0df',
		playground: 'https://bun.sh',
	},
	cloudflare: {
		name: 'Cloudflare',
		url: 'https://www.cloudflare.com/',
		brandColor: '#FAAD3F',
		playground: 'https://workers.new/typescript',
	},
	cypress: {
		name: 'Cypress',
		url: 'https://cypress.io',
		brandColor: '#ffffff',
		playground:
			'https://docs.cypress.io/guides/getting-started/installing-cypress',
	},
	deno: {
		name: 'Deno',
		url: 'https://deno.land/',
		brandColor: '#666666',
		secondaryColor: '#ffffff',
	},
	dotlabs: {
		name: 'DotLabs',
		url: 'https://www.thisdot.co/',
		brandColor: '#F46663',
	},
	elm: {
		name: 'Elm',
		url: 'https://elm-lang.org/',
		brandColor: '#1293d8',
	},
	fastify: {
		name: 'fastify',
		url: 'https://www.fastify.io/',
		brandColor: '#ffffff',
		playground: 'https://github.com/fastify/fastify-dx',
	},
	firebase: {
		name: 'Firebase',
		url: 'https://firebase.google.com/',
		brandColor: '#FFCA28',
	},
	histoire: {
		name: 'Histoire',
		url: 'https://histoire.dev',
		brandColor: '#34d399',
	},
	hydrogen: {
		name: 'Hydrogen',
		url: 'https://hydrogen.shopify.dev',
		brandColor: '#8e01f0',
		secondaryColor: '#ffffff',
		playground: 'https://hydrogen.new/',
	},
	ladle: {
		name: 'Ladle',
		url: 'https://ladle.dev',
		brandColor: '#174291',
		secondaryColor: '#ffffff',
		playground: 'https://ladle.dev/new',
	},
	laravel: {
		name: 'Laravel',
		url: 'https://laravel.com',
		brandColor: '#fb503b',
		playground: 'https://laravel.com/docs/9.x/vite',
	},
	lit: {
		name: 'Lit',
		url: 'https://lit.dev',
		brandColor: '#324fff',
		playground: 'https://vite.new/lit',
	},
	marko: {
		name: 'Marko',
		url: 'https://markojs.com/',
		brandColor: '#33d5f4',
		playground: 'https://markojs.com/docs/getting-started/',
	},
	netlify: {
		name: 'Netlify',
		url: 'https://www.netlify.com/',
		brandColor: '#4d9abf',
	},
	nuxt: {
		name: 'Nuxt',
		url: 'https://nuxtjs.org',
		brandColor: '#80EEC0',
		playground:
			'https://stackblitz.com/fork/github/nuxt/starter/tree/v3-stackblitz',
	},
	nx: {
		name: 'Nx',
		url: 'https://nx.dev/',
		brandColor: '#688fbd',
	},
	openSauced: {
		name: 'Open Sauced',
		url: 'https://opensauced.pizza/',
		brandColor: '#EE5E32',
		secondaryColor: '#ffffff',
	},
	playwright: {
		name: 'Playwright',
		url: 'https://playwright.dev',
		brandColor: '#45ba4b',
		playground: 'https://playwright.dev/docs/intro',
	},
	pnpm: {
		name: 'pnpm',
		url: 'https://pnpm.io/',
		brandColor: '#f69220',
	},
	preact: {
		name: 'Preact',
		url: 'https://preactjs.com',
		brandColor: '#00bcd4',
		playground: 'https://vite.new/preact',
	},
	previewjs: {
		name: 'PreviewJS',
		url: 'https://elm-lang.org/',
		brandColor: '#3b83f6',
	},
	qwik: {
		name: 'Qwik',
		url: 'https://qwik.builder.io/',
		brandColor: '#018BFF',
		playground: 'https://qwik.builder.io/playground',
	},
	rakkas: {
		name: 'Rakkas',
		url: 'https://rakkasjs.org/',
		brandColor: '#992244',
		secondaryColor: '#cc2200',
		playground: 'https://rakkasjs.org/new',
	},
	react: {
		name: 'React',
		url: 'https://reactjs.org',
		brandColor: '#61DBFB',
		playground: 'https://vite.new/react',
	},
	rollup: {
		name: 'Rollup',
		url: 'https://rollupjs.org/',
		brandColor: '#e63436',
	},
	ruby: {
		name: 'Ruby',
		url: 'https://vite-ruby.netlify.app/',
		brandColor: '#cc0000',
		playground: 'https://vite-ruby.netlify.app/guide/#getting-started/',
	},
	shopify: {
		name: 'Shopify',
		url: 'https://www.shopify.com/',
		brandColor: '#95BF47',
		playground: 'https://hydrogen.new/',
	},
	solid: {
		name: 'Solid',
		url: 'https://solidjs.com',
		brandColor: '#446b9e',
		playground: 'https://stackblitz.com/fork/vitejs-vite-vgroct',
	},
	stackblitz: {
		name: 'StackBlitz',
		url: 'https://stackblitz.com',
		brandColor: '#1389FD',
		playground: 'https://vite.new',
	},
	storyblok: {
		name: 'storyblok',
		url: urls.storyblok,
		brandColor: '#0AB3AF',
		playground: urls.storyblok,
	},
	storybook: {
		name: 'Storybook',
		url: 'https://storybook.js.org/',
		brandColor: '#FF4785',
		playground: 'https://storybook.js.org/docs/react/get-started/introduction',
	},
	svelte: {
		name: 'Svelte',
		url: 'https://svelte.dev',
		brandColor: '#ff3e00',
		playground: 'https://sveltekit.new',
	},
	tauri: {
		name: 'Tauri',
		url: 'https://tauri.app/',
		brandColor: '#ffc032',
		playground: 'https://tauri.app/v1/guides/getting-started/setup/vite',
	},
	vercel: {
		name: 'Vercel',
		url: 'https://vercel.com',
		brandColor: '#ffffff',
	},
	vite: {
		name: 'Vite',
		url: 'https://vitejs.dev',
		brandColor: '#646cff',
		secondaryColor: '#ffb817',
		playground: 'https://vite.new',
	},
	vitest: {
		name: 'Vitest',
		url: 'https://vitest.dev',
		brandColor: '#FCC72B',
		playground: 'https://vitest.new',
	},
	vue: {
		name: 'Vue',
		url: 'https://vuejs.org',
		brandColor: '#42b883',
		playground: 'https://vite.new/vue',
	},
	fauna: {
		name: 'Fauna',
		url: 'https://www.fauna.com/',
		brandColor: '#3A1AB6',
	},
	vueschool: {
		name: 'Vue School',
		url: 'https://vueschool.io/?utm_source=ViteConf&utm_medium=website&utm_campaign=sponsorship&utm_content=logo',
		brandColor: '#667DFF',
	},
	vike: {
		name: 'Vike',
		url: 'https://vike.land/',
		logo: '/projects/vike.png',
		brandColor: '#667DFF',
	},
	supabase: {
		name: 'supabase',
		url: 'https://supabase.com/',
		brandColor: '#34b27b',
	},
	dashibase: {
		name: 'supabase',
		url: 'https://supabase.com/',
		brandColor: '#FF6069',
	},
	mui: {
		name: 'MUI',
		url: 'https://mui.com/',
		brandColor: '#007FFF',
	},
	ionic: {
		name: 'ionic',
		url: 'https://ionic.io/',
		brandColor: '#176bff',
	},
	nativescript: {
		name: 'NativeScript',
		url: 'https://nativescript.org/',
		brandColor: '#65adf1',
	},
	sveltesociety: {
		name: 'SvelteSociety',
		url: 'https://sveltesociety.dev/',
		brandColor: '#ff3e00',
	},
	imba: {
		name: 'Imba',
		url: 'https://imba.io/',
		brandColor: '#e2e8f0',
	},
	sveltesirens: {
		name: 'SvelteSirens',
		url: 'https://sveltesirens.dev/',
		brandColor: '#00e1d2',
		logo: '/projects/sveltesirens.png',
	},
	bytes: {
		name: 'Bytes',
		url: 'https://bytes.dev/',
		brandColor: '#fcba28',
		logo: '/projects/bytes.png',
	},
	syntax: {
		name: 'Syntax',
		url: 'https://syntax.fm/',
		brandColor: '#f0c15d',
		logo: '/projects/syntax.png',
	},
	ping: {
		name: 'Ping',
		url: 'https://ping.gg/',
		brandColor: '#e24a8d',
	},
});

export const speakers = processSpeakers({
	/** Special case, in case speakers not decided */
	tbd: {
		screenName: 'TBD',
		displayName: 'TBD',
		project: projects.vite,
		company: 'Vue',
		bio: 'TBD',
		chat: '',
	},
	yyx990803: {
		screenName: 'yyx990803',
		displayName: 'Evan You',
		project: projects.vite,
		company: 'Vue',
		jobTitle: 'Independent OSS developer',
		bio: `Evan is an independent open source developer and the author of Vue.js and Vite.`,
		twitter: 'youyuxi',
		chat: 'discord.com/channels/804011606160703521/1027885938292047932',
	},
	jessicasachs: {
		screenName: 'JessicaSachs',
		displayName: 'Jessica Sachs',
		project: projects.cypress,
		company: 'PathAI',
		jobTitle: 'Staff Software Engineer',
		bio: 'Staff Software Engineer at PathAI. Maintaining fakerjs. Vue team member. Cypress ambassador and alumni.',
		twitter: '_jessicasachs',
		chat: 'discord.com/channels/804011606160703521/1027652165696770091',
	},
	'rich-harris': {
		screenName: 'rich-harris',
		displayName: 'Rich Harris',
		project: projects.svelte,
		company: 'Vercel',
		jobTitle: '',
		bio: 'Working on Svelte at Vercel',
		twitter: 'Rich_Harris',
		chat: 'discord.com/channels/804011606160703521/1027864797015986236',
	},
	danielroe: {
		screenName: 'danielroe',
		displayName: 'Daniel Roe',
		project: projects.nuxt,
		company: 'Open Source',
		jobTitle: 'Framework Architect',
		bio: `Daniel is a core team member of Nuxt - previously a CTO of a SaaS startup. His open-source work has a focus in the Vue.js and Nuxt ecosystems and he's involved in consultancy with companies around the world, particularly around JAMstack, serverless and software architecture. He's based in the North East of England where he lives with his family, three cats, and a dog.`,
		twitter: 'danielcroe',
		chat: 'discord.com/channels/804011606160703521/1027864425870397450',
	},
	brandonroberts: {
		screenName: 'brandonroberts',
		displayName: 'Brandon Roberts',
		project: projects.angular,
		company: 'OpenSauced',
		jobTitle: 'Developer Experience Engineer',
		bio: `Brandon is an Open Source Advocate, focused on community engagement, content creation, and collaboration. He enjoys learning new things, helping other developers be successful, speaking at conferences, and contributing to open source. He is a GDE, technical writer, and a maintainer of the NgRx project building libraries for reactive Angular applications.`,
		twitter: 'brandontroberts',
		chat: 'discord.com/channels/804011606160703521/1027863988622606376',
	},
	'debs-obrien': {
		screenName: 'debs-obrien',
		displayName: "Debbie O'Brien",
		project: projects.playwright,
		company: 'Microsoft',
		jobTitle: 'Senior Program Manager',
		bio: `Debbie is a Senior Program Manager at Microsoft and has over 10 years experience in Frontend development. She has worked as a Tech Lead and consultant for many important clients with varios technologies and often with a strong focus on performance, static sites and testing. She has lead teams both in house and remotely as well as giving workshops and training. She has many years of experience as a mentor for online learning platforms, Treehouse and OpenClassrooms as well as a mentor for the Google Developer Expert program. Debbie is a Google Developer Expert in web technologies and Media Developer Expert, an Auth0 Ambassador and Nuxt Ambassador and previous Microsoft Most Valuable Professional in developer technologies and a GitHub Star.`,
		twitter: 'debs_obrien',
		chat: 'discord.com/channels/804011606160703521/1027651628402233385',
	},
	ryansolid: {
		screenName: 'ryansolid',
		displayName: 'Ryan Carniato',
		project: projects.solid,
		company: 'Netlify',
		jobTitle: 'Principal Engineer OSS',
		bio: 'Principal Engineer OSS at Netlify. Reactivity enthusiast, Web perf whisperer. Creator of Solid, Core Marko Team. Prev eBay, Vidigami, ACTIVE Network', // OSS
		twitter: 'RyanCarniato',
		chat: 'discord.com/channels/804011606160703521/1027645588675776533',
	},
	'natemoo-re': {
		screenName: 'natemoo-re',
		displayName: 'Nate Moore',
		project: projects.astro,
		company: 'The Astro Technology Company',
		jobTitle: 'Senior Software Engineer',
		bio: `Nate Moore is a co-creator and core maintainer of Astro, currently living in Chicago, USA. His passion for making the web more accessible, fun, and performant led him to join The Astro Technology Company, where he works as a senior software engineer. Building open source tools for the next generation of web frameworks has given Nate a unique perspective on the current state of web development and where it’s headed next.`,
		twitter: 'n_moore',
		chat: 'discord.com/channels/804011606160703521/1027863480184872990',
	},
	sylwiavargas: {
		screenName: 'sylwiavargas',
		displayName: 'Sylwia Vargas',
		project: projects.stackblitz,
		company: 'StackBlitz',
		jobTitle: 'DevRel',
		bio: 'Developer advocate at Stackblitz. Tech writer and educator advocating for code newbies and social justice. Organizer at ReactJS Robins.',
		twitter: 'SylwiaVargas',
		chat: 'discord.com/channels/804011606160703521/1027870906686636145',
	},
	ianvs: {
		screenName: 'IanVS',
		displayName: 'Ian VanSchooten',
		project: projects.storybook,
		company: 'Defined Networking',
		jobTitle: 'Senior Frontend Engineer',
		bio: `Although his early background is in aerospace engineering and project management, Ian found his real passion in web development and has been programming professionally for the last 7 years. He's one of two frontend developers at an early-stage startup, a former core team member of ESLint, the creator of eslint-nibble, and a maintainer of the Vite builder for Storybook.`,
		twitter: 'IanVanSchooten',
		chat: 'discord.com/channels/804011606160703521/1027870097466990632',
	},
	akryum: {
		screenName: 'Akryum',
		displayName: 'Guillaume Chau',
		project: projects.histoire,
		company: 'Vue',
		jobTitle: 'Core Team Member',
		bio: 'Open Source Contributor, Web engineering at Livestorm',
		twitter: 'akryum',
		chat: 'discord.com/channels/804011606160703521/1027869364533334016',
	},
	tajo: {
		screenName: 'tajo',
		displayName: 'Vojtech Miksu',
		project: projects.ladle,
		company: 'Uber',
		jobTitle: 'Software Engineer',
		bio: 'Building the web infrastructure at Uber. Open-sourcing libraries like Ladle, react-movable, react-range or Base Web. Interested in design systems, testing automation and compilers.',
		twitter: 'vmiksu',
		chat: 'discord.com/channels/804011606160703521/1027868179449532416',
	},
	juristr: {
		screenName: 'juristr',
		displayName: 'Juri Strumpflohner',
		project: projects.nx,
		company: 'Nrwl',
		jobTitle: 'Director of Developer Experience',
		bio: `Juri Strumpflohner is the Director of Developer Experience at Nrwl where he helps developers with questions around frontend development, monorepos, scaling and modern tools. Prior to moving into developer relations, he has been consulting for some of the world's biggest companies, helping them scale their development efforts, particularly in the frontend space. Juri is a Google Developers Expert, speaker and Egghead instructor. Reach out to him on Twitter (@juristr) or his website on juri.dev.`,
		twitter: 'juristr',
		chat: 'discord.com/channels/804011606160703521/1027867680977473606',
	},
	zkochan: {
		screenName: 'zkochan',
		displayName: 'Zoltan Kochan',
		project: projects.pnpm,
		company: 'Bit',
		jobTitle: 'Software Engineer',
		bio: 'I was a full stack developer at JustAnswer then a front-end DevOps engineer. I started to maintain pnpm in 2016 and it has changed my life. Since 2021 I work at Bit on dependency management. I continue to actively develop pnpm. Sometimes as part of my daily job at Bit, sometimes in my free time.',
		twitter: 'ZoltanKochan',
		chat: 'discord.com/channels/804011606160703521/1027867174460727316',
	},
	fredkschott: {
		screenName: 'FredKSchott',
		displayName: 'Fred K. Schott',
		project: projects.astro,
		company: 'The Astro Technology Company',
		jobTitle: 'CEO',
		bio: 'Astro co-creator. CEO of The Astro Company',
		twitter: 'FredKSchott',
		chat: 'discord.com/channels/804011606160703521/1027921851038564372',
	},
	antfu: {
		screenName: 'antfu',
		displayName: 'Anthony Fu',
		project: projects.vite,
		company: 'NuxtLabs',
		jobTitle: 'Nuxt Core Team',
		bio: `A fanatical open sourceror. DX and ecosystem for Vue, Vite and Nuxt.`,
		twitter: 'antfu7',
		chat: 'discord.com/channels/804011606160703521/1027883577062477834',
	},
	kiaking: {
		screenName: 'kiaking',
		displayName: 'Kia King Ishii',
		project: projects.vue,
		company: 'Global Brain',
		jobTitle: 'Director',
		bio: `Hi! I'm Kia, a optimistic web designer/developer. I'm a member of the Vue.js Core Team, and the author of Vuex ORM. My main focus is on developing VitePress, Vuex and its related projects. I am also a member of Vue.js Japan User Group core staff. I'm firmly committed to the whole Vue community and its ecosystem. I'm half Japanese, half American living in Japan at the moment, working at Global Brain as a Director. I speak English and Japanese, and keen to connect with new developers! You can find me at Twitter. If you have any questions or want to have some random chat, I'll be more than happy to talk with you 😳`,
		twitter: 'KiaKing85',
		chat: 'discord.com/channels/804011606160703521/1027882571729739808',
	},
	cyco130: {
		screenName: 'cyco130',
		displayName: 'Fatih Aygün',
		project: projects.rakkas,
		company: 'Lityum A.Ş.',
		jobTitle: 'Senior Software Developer',
		bio: `I started programming on an 8-bit Atari computer as a childhood hobby and went through Basic, 6502 Assembly, Borland Pascal, x86 Assembly, Delphi at which point my hobby became my profession. I went on to use many other popular programming languages including C, C++, Java, and Python, plus some obscure ones like Eiffel. In my current job I work as a full stack developer using PHP, TypeScript, and React developing a recruitment SaaS called PeopleBox.`,
		twitter: 'cyco130',
		chat: 'discord.com/channels/804011606160703521/1027861524573855764',
	},
	benmccann: {
		screenName: 'benmccann',
		displayName: 'Ben McCann',
		project: projects.svelte,
		company: '',
		jobTitle: '',
		bio: 'Investor at C3 Ventures and entrepreneur. Founded recruiting tech company Connectifier - acquired by LinkedIn',
		twitter: 'BenjaminMcCann',
		chat: 'discord.com/channels/804011606160703521/1027921851038564372',
	},
	blittle: {
		screenName: 'blittle',
		displayName: 'Bret Little',
		project: projects.hydrogen,
		company: 'Shopify',
		jobTitle: 'Staff Software Engineer',
		bio: `I'm a Staff Software Engineer at Shopify working on the JavaScript framework Hydrogen. I also represent Shopify on the Web-interoperable Runtimes Community Group. Previously I worked on commerce at Salesforce, and have been at a variety of smaller start-ups.`,
		twitter: 'little_bret',
		chat: 'discord.com/channels/804011606160703521/1027921851038564372',
	},
	mhevery: {
		screenName: 'mhevery',
		displayName: 'Miško Hevery',
		project: projects.qwik,
		company: 'Builder.io',
		jobTitle: 'CTO',
		bio: 'CTO at Builder.io, creator of Qwik, Angular, co-creator of Karma',
		twitter: 'mhevery',
		chat: 'discord.com/channels/804011606160703521/1027921851038564372',
	},
	ladyleet: {
		screenName: 'ladyleet',
		displayName: 'Tracy Lee',
		project: projects.dotlabs,
		company: 'This Dot Labs',
		jobTitle: 'CEO',
		bio: 'CEO of This Dot Labs, a modern web consultancy. Keynote Speaker, RxJS Core, GoogleDevExpert, Github ⭐️, MSFT MVP, Investor, Startup Advisor!',
		twitter: 'ladyleet',
		chat: 'discord.com/channels/804011606160703521/1027920545045544991',
	},
	'patak-dev': {
		screenName: 'patak-dev',
		displayName: 'Matias Capeletto',
		project: projects.vite,
		company: 'StackBlitz',
		jobTitle: 'Open Source',
		bio: `Matias (patak) is a Vite core team member, and a Vitest and Vue team member. He works at StackBlitz, doing Open Source work full time for the Vite Ecosystem.`,
		twitter: 'patak_dev',
		chat: 'discord.com/channels/804011606160703521/1027885260609962024',
	},
	ascorbic: {
		screenName: 'ascorbic',
		displayName: 'Matt Kane',
		project: projects.netlify,
		company: 'Netlify',
		jobTitle: 'Principal engineer, ecosystem',
		bio: `Principal engineer, ecosystem at Netlify. I'm in ur repo with an unsolicited pr. Coder, maker, brewer, baker`,
		twitter: 'ascorbic',
		chat: 'discord.com/channels/804011606160703521/1027860415696347136',
	},
	leerob: {
		screenName: 'leerob',
		displayName: 'Lee Robinson',
		project: projects.vercel,
		company: 'Vercel',
		jobTitle: 'VP of Developer Experience',
		bio: 'Lee Robinson is the VP of Developer Experience at Vercel, where he helps developers build a faster web and leads the Next.js community. He leads the community for the React framework Next.js and is an open-source contributor. An educator, writer, and speaker, Lee has created courses on React, Next.js, and web development.',
		twitter: 'leeerob',
		chat: 'discord.com/channels/804011606160703521/1027860101895299142',
	},
	josefaidt: {
		screenName: 'josefaidt',
		displayName: 'josef Aidt',
		project: projects.aws,
		company: 'AWS Amplify',
		jobTitle: 'Developer Support Engineer',
		bio: 'Open source at AWS Amplify',
		twitter: 'josefaidt',
		chat: 'discord.com/channels/804011606160703521/1027859671484215317',
	},
	davideast: {
		screenName: 'davideast',
		displayName: 'David East',
		project: projects.firebase,
		company: 'Google',
		jobTitle: 'Staff Developer Relations Engineer',
		bio: 'David was born in a country that no longer exists and he is the self proclaimed #1 Vite superfan in the world.',
		twitter: '_davideast',
		chat: 'discord.com/channels/804011606160703521/1027859275042795540',
	},
	'jarred-sumner': {
		screenName: 'Jarred-Sumner',
		displayName: 'Jarred Sumner',
		project: projects.bun,
		company: 'Bun',
		jobTitle: 'Author',
		bio: 'Jarred is building bun. Formerly Stripe (twice), Thiel Fellowship',
		twitter: 'jarredsumner',
		chat: 'discord.com/channels/804011606160703521/1027858690516193392',
	},
	bartlomieju: {
		screenName: 'bartlomieju',
		displayName: 'Bartek Iwańczuk',
		project: projects.deno,
		company: 'Deno Land',
		jobTitle: 'Engineer',
		bio: 'Engineer at the Deno Land company since its inception. I primarily maintain the Deno runtime but also work on various related projects.',
		twitter: 'biwanczuk',
		chat: 'discord.com/channels/804011606160703521/1027858326157013063',
	},
	ericsimons: {
		screenName: 'EricSimons',
		displayName: 'Eric Simons',
		showOriginal: true,
		project: projects.stackblitz,
		company: 'StackBlitz',
		jobTitle: 'CEO',
		bio: 'CEO StackBlitz. Making web development fast & secure.',
		twitter: 'ericsimons40',
		chat: 'discord.com/channels/804011606160703521/1027870906686636145',
	},
	jessarcher: {
		screenName: 'jessarcher',
		displayName: 'Jess Archer',
		project: projects.laravel,
		company: 'Laravel',
		jobTitle: 'Full-stack Developer',
		bio: `Jess comes from Brisbane, Australia, and has been a full-stack developer for over 15 years. She's built capture clinical data software for the healthcare industry, helped police refer vulnerable people to get the help they need, and helped start ups rapidly build out prototypes. She's currently working on open-source software at Laravel and has made Vite the default build-tool for the ecosystem.`,
		twitter: 'jessarchercodes',
		chat: 'discord.com/channels/804011606160703521/1027654525634490409',
	},
	elmassimo: {
		screenName: 'ElMassimo',
		displayName: 'Máximo Mussini',
		project: projects.ruby,
		company: 'NDA',
		jobTitle: 'Lead Engineer',
		bio: 'Máximo is a software engineer with over 10 years of experience, ranging from mobile development to full-stack web development. He believes open source is a great thing, and has created libraries such as Vite Ruby and JS From Routes. As an active contributor to the Vite ecosystem, he maintains a handful of plugins, and is the author of îles, the joyful site generator.',
		twitter: 'MaximoMussini',
		chat: 'discord.com/channels/804011606160703521/1027652806452203570',
	},
	'sheremet-va': {
		screenName: 'sheremet-va',
		displayName: 'Vladimir',
		project: projects.vitest,
		company: 'Zammad',
		jobTitle: 'Fullstack Developer',
		bio: `Fullstack Developer, Vitest Core Team member`,
		twitter: 'sheremet_va',
		chat: 'discord.com/channels/804011606160703521/1027646088569684009',
	},
	dylanpiercey: {
		screenName: 'dylanpiercey',
		displayName: 'Dylan Piercey',
		project: projects.marko,
		company: 'eBay',
		jobTitle: 'Member of Technical Staff',
		bio: 'Platform Engineer at eBay and core team member of Marko.',
		twitter: 'dylan_piercey',
		chat: 'discord.com/channels/804011606160703521/1027645121702932520',
	},
	frandiox: {
		screenName: 'frandiox',
		displayName: 'Fran Dios',
		project: projects.hydrogen,
		company: 'Shopify',
		jobTitle: 'Staff Software Engineer',
		bio: `I've been a tech enthusiast for as long as I can remember. After graduation, I moved to Japan to start my career as an engineer, focusing on front-end development at first. I built UI components for different frameworks such as Vue, React, and Angular. From there, I switched to full-stack development as the CTO of a small Japanese company. I started playing with Vite and Cloudflare Workers in my free time because I though they were amazing technologies. As a result, I published the Vitedge framework as one of the early adopters of Edge Side Rendering, which later took me to my current position developing Hydrogen at Shopify.`,
		twitter: 'frandiox',
		chat: 'discord.com/channels/804011606160703521/1027644646219857953',
	},
	adamdbradley: {
		screenName: 'adamdbradley',
		displayName: 'Adam Bradley',
		project: projects.qwik,
		company: 'Builder.io',
		jobTitle: 'Director of Technology',
		bio: 'Adam is the Director of Technology at Builder.io, focused on pushing the web forward with innovative technologies such as Qwik and Partytown. Adam leads teams in developing high-performing user interfaces with the latest technologies. Adam’s past roles include being the Director of Technology at Ionic, where he co-created the Ionic Framework and helped to develop CapacitorJS. Additionally, Adam created StencilJS, which is a toolchain for building reusable, scalable Design Systems. He is an open-source and web-standard enthusiast.',
		twitter: 'adamdbradley',
		chat: 'discord.com/channels/804011606160703521/1027616785488433312',
	},
	bholmesdev: {
		screenName: 'bholmesdev',
		displayName: 'Ben Holmes',
		project: projects.astro,
		company: 'The Astro Technology Company',
		jobTitle: 'Software developer',
		bio: `I'm an open sorcerer, whiteboardist, and web developer at Astro.build 🚀 I split my time between twitter videos, freelance blogging, and core maintainership, so you'll probably see my face pop up somewhere!`,
		twitter: 'bholmesdev',
		chat: 'discord.com/channels/804011606160703521/1027616222436671508',
	},
	brillout: {
		screenName: 'brillout',
		displayName: 'Rom Brillout',
		project: projects.vike,
		company: 'Self employed',
		jobTitle: 'Self employed',
		bio: 'Software Engineer, passionate about Open Source, author of Stem, Telefunc, vite-plugin-ssr, react-streaming and more.',
		twitter: 'brillout',
		chat: 'discord.com/channels/804011606160703521/1027855028788138034',
	},
	galvez: {
		screenName: 'galvez',
		displayName: 'Jonas Galvez',
		project: projects.fastify,
		company: 'NodeSource',
		jobTitle: 'Principal OSS Engineer',
		bio: `I'm a former Pythonista turned into JavaScript open sourcerer. A full stack developer for over a decade, writer, speaker. I was a core contributor to Nuxt.js and now am heading the full stack frameworks efforts of the Fastify project.`,
		twitter: 'anothergalvez',
		chat: 'discord.com/channels/804011606160703521/1027854593612324865',
	},
	bdougie: {
		screenName: 'bdougie',
		displayName: 'Brian Douglas',
		project: projects.openSauced,
		company: 'Open Sauced',
		jobTitle: 'Founder & CEO',
		bio: `Brian has a passion for open source and loves mentoring new contributors through Open Sauced, a platform for finding your next open source contribution. In the past he's lead Developer Experience at Netlify and Developer Relations at GitHub.`,
		twitter: 'bdougieYO',
		chat: 'discord.com/channels/804011606160703521/1027607304431992853',
	},
	sulco: {
		screenName: 'sulco',
		displayName: 'Tomek Sułkowski',
		showOriginal: true,
		project: projects.stackblitz,
		company: 'StackBlitz',
		jobTitle: 'DevRel',
		bio: 'StackBlitz Founding Engineer & DevRel.',
		twitter: 'sulco',
		chat: 'discord.com/channels/804011606160703521/1027870906686636145',
	},
	jonaskruckenberg: {
		screenName: 'JonasKruckenberg',
		displayName: 'Jonas Kruckenberg',
		project: projects.tauri,
		company: 'Mintter Inc',
		jobTitle: 'Tauri Team Member',
		bio: `Starting out as a self taught web developer, I realised that I just love fast software; Be it websites or apps. This passion sent me on a long journey from the first public Vite release through Local First Software, peer-to-peer (p2p) networking, and Rust to finally work on Tauri, a framework and community that I quickly fell in love with.`,
		twitter: 'jonasKruckie',
		chat: 'discord.com/channels/804011606160703521/1027861075120631828',
	},
	bluwy: {
		screenName: 'bluwy',
		displayName: 'Bjorn Lu',
		project: projects.vite,
		company: 'Open Source',
		jobTitle: 'Frontend Engineer',
		bio: `I'm a Svelte and Vite team member. Loves build tools, open source, and building things from scratch - a recipe for abandoned side projects. 3 years in web development and counting!`,
		twitter: 'bluwyoo',
		chat: 'discord.com/channels/804011606160703521/1027613944631799828',
	},
	sodatea: {
		screenName: 'sodatea',
		displayName: 'Haoqun Jiang',
		project: projects.vue,
		company: 'Vue Technology LLC',
		jobTitle: 'Full-Time Open Source Developer',
		bio: `Vue.js/Vite.js Core Team Member; Vue CLI & create-vue maintainer.`,
		twitter: 'haoqunjiang',
		chat: 'discord.com/channels/804011606160703521/1027527951924875325',
	},
	lukastaegert: {
		screenName: 'lukastaegert',
		displayName: 'Lukas Taegert-Atkinson',
		project: projects.rollup,
		company: 'TNG Technology Consulting',
		jobTitle: 'Senior Consultant',
		bio: `I actually have a PhD in Mathematics where I involved myself with partial differential equations around black holes and no, there was not even a computer simulation involved. After that, I really needed more fun in my life, which brought me to software development as a much more gratifying experience and IT consulting specifically, which I started in 2015. My first gig taught me JavaScript and React and it was not long until I started questioning the tools I was using. For some weird reason, tree-shaking was something that caught me in early 2017, which got me to write eslint-plugin-treeshaking to help developers figure out the reasons why certain code could not be tree-shaken.
		At that point with the experiences from writing the plugin, I stumbled upon some short-comings in Rollup that I decided to address with some PRs, and roughly after the third, Rich gave me write access to the Rollup repository and then left me to my own devices. Which, as I found out, meant that I had just become the maintainer, and I still am to this date.
		In my other consulting live, I am writing now much more Vue these days, having recently migrated a large code-base from Nuxt 2 to a custom Vue 3 + Vite SSG setup, an experience worthy of its own talk some day...`,
		twitter: 'lukastaegert',
		chat: 'discord.com/channels/804011606160703521/1027883128926257163',
	},
	dominikg: {
		screenName: 'dominikg',
		displayName: 'Dominik G.',
		project: projects.vite,
		company: 'Freelancer',
		jobTitle: 'Freelancer',
		bio: 'Svelte Team. Maintainer of vite-plugin-svelte, vite-ecosystem-ci',
		chat: 'discord.com/channels/804011606160703521/1027520712216432772',
	},
	shinigami92: {
		screenName: 'Shinigami92',
		displayName: 'Shinigami',
		project: projects.vite,
		company: '',
		jobTitle: '',
		bio: 'Currently mainly frontend developer who loves Material Design and Vue. Also a passionate TypeScript enthusiast. Maintainer of fakerjs',
		twitter: 'Shini_92',
		chat: 'discord.com/channels/804011606160703521/1027920545045544991',
	},
	jtomchak: {
		screenName: 'jtomchak',
		displayName: 'Jesse Tomchak',
		project: projects.dotlabs,
		company: 'This Dot Labs',
		jobTitle: '',
		bio: 'Firm believer that technology is awesome, and we can do better. Podcasts make the world a happier place',
		twitter: 'jtomchak',
		chat: 'discord.com/channels/804011606160703521/1027921851038564372',
	},
	lindsaykwardell: {
		screenName: 'lindsaykwardell',
		displayName: 'Lindsay Wardell',
		project: projects.elm,
		company: 'NoRedInk',
		jobTitle: 'Engineer',
		bio: 'I am a programmer, writer, and mother. I work as a Software Engineer at NoRedInk, and have participated on a number of podcasts including Modern Web and Views on Vue. I enjoy working on reactive applications using Vue and Elm, and getting to work with functional programming.',
		twitter: 'lindsaykwardell',
		chat: 'discord.com/channels/804011606160703521/1027914937697321052',
	},
	jutanium: {
		screenName: 'Jutanium',
		displayName: 'Dan Jutan',
		project: projects.solid,
		company: 'The Astro Technology Company',
		jobTitle: 'Product Manager',
		bio: `Dan Jutan is a product manager, frontend engineer, and technical writer with a passion for educational technology. He's on the core team of Astro, where he focuses on product, and SolidJS, where he leads docs and content.`,
		twitter: 'jutanium',
		chat: 'discord.com/channels/804011606160703521/1027881891346518097',
	},
	fwouts: {
		screenName: 'fwouts',
		displayName: 'François Wouts',
		project: projects.previewjs,
		company: 'Zenc Labs',
		jobTitle: 'Developer Happiness Engineer',
		bio: `I'm passionate about developer tooling, rethinking how we write code, and making improvements to developer processes. I like to call myself a "developer happiness engineer". I worked at Google for a few years, and I quit to be able to work on my own projects. I've been working part-time on projects revolving around developer tooling since then. I left my job in early 2021 to focus on building Preview.js. I also have a pet project writing a book about the similarities between concepts of various programming languages leading the design of a universal, non-textual representation of code.`,
		twitter: 'fwouts',
		chat: 'discord.com/channels/804011606160703521/1027886601499586580',
	},
	haikyuu: {
		screenName: 'haikyuu',
		displayName: 'Abdellah Alaoui Solaimani',
		project: projects.imba,
		company: 'Scrimba',
		jobTitle: 'Full Stack developer',
		bio: `I'm a software engineer from Morocco and I work in Scrimba. I created the vite plugin for imba as well as ts2imba.com which is an amazing open source tool that converts tsx (including react components and tailwind classes) to imba.`,
		twitter: 'abdellahjs',
		chat: 'discord.com/channels/804011606160703521/1028017773487599686',
	},
	hugoattal: {
		screenName: 'hugoattal',
		displayName: 'Hugo Attal',
		project: projects.histoire,
		company: 'LunaParkHQ',
		jobTitle: 'Founder',
		bio: `Software engineer and entrepreneur building cool stuff for the web. Founder of @LunaParkHQ and a bunch of other over-engineered projects.`,
		twitter: 'HugoAttal',
		chat: 'discord.com/channels/804011606160703521/1027869364533334016',
	},
});

export const mcs = processSpeakers({
	brittneypostma: {
		screenName: 'brittneypostma',
		displayName: 'Brittney Postma',
		project: projects.sveltesirens,
		company: 'Netlify',
		jobTitle: 'Developer Experience Engineer',
		bio: `Self taught developer and mom of three currently a Developer Experience Engineer at Netlify and co-founder of the Svelte Sirens.`,
		twitter: 'brittneypostma',
		section: 'Welcome to ViteConf',
		chat: 'discord.com/channels/804011606160703521/1028017773487599686',
	},
	bholmesdev: speakers.bholmesdev,
	josefineschaefer: {
		screenName: 'josefineschaefer',
		displayName: 'Josefine Schaefer',
		project: projects.storyblok,
		company: 'Storyblok',
		jobTitle: 'Dev Rel',
		bio: `DevRel Engineer Storyblok. GirlCode ambassador.`,
		twitter: 'JsfnSchfr',
		section: 'Design Systems and Monorepos',
		chat: 'discord.com/channels/804011606160703521/1028017773487599686',
	},
	theobr: {
		screenName: 'TheoBr',
		displayName: 'Theo',
		project: projects.ping,
		company: 'Ping Labs',
		jobTitle: 'CEO',
		bio: `Hi I like building. CEO at Ping (YC W22), T3 Stack creator, Youtuber, ex-Twitch staff, “Aggressively practical”`,
		twitter: 't3dotgg',
		section: 'Frameworks Section',
		chat: 'discord.com/channels/804011606160703521/1028017773487599686',
	},
	jlengstorf: {
		screenName: 'jlengstorf',
		displayName: 'Jason Lengstorf',
		project: projects.netlify,
		company: 'Netlify',
		jobTitle: 'VP of Developer Experience',
		bio: `Jason Lengstorf works at Netlify and hosts Learn With Jason. As a keynote speaker and author, Jason focuses on building healthier teams through trust, curiosity, and play. He's trying his very best to follow his own advice. He lives in Portland, Oregon.`,
		twitter: 'jlengstorf',
		section: 'Hosting and the Edge Section',
		chat: 'discord.com/channels/804011606160703521/1028017773487599686',
	},
	lindsaykwardell: speakers.lindsaykwardell,
	stolinski: {
		screenName: 'stolinski',
		displayName: 'Scott Tolinski',
		project: projects.syntax,
		company: 'Level Up Tutorials',
		jobTitle: 'Creator',
		bio: `Creator of Level Up Tutorials. Co-host of http://Syntax.fm.`,
		twitter: 'stolinski',
		section: 'Testing Section',
		chat: 'discord.com/channels/804011606160703521/1028017773487599686',
	},
	jutanium: speakers.jutanium,
	surma: {
		screenName: 'surma',
		displayName: 'Surma',
		project: projects.shopify,
		company: 'Shopify',
		jobTitle: 'DX',
		bio: `DX at Shopify. Web Platform Advocate. Craving simplicity, finding it nowhere. Internetrovert.`,
		twitter: 'DasSurma',
		section: 'Contributing Section',
		chat: 'discord.com/channels/804011606160703521/1028017773487599686',
	},
});

function t(time: string): number {
	const [hours,minutes,seconds] = time.split(':')
	return ((+hours)*60+(+minutes))*60+(+seconds)
}

export const talks = processTalks({
	vite_keynote: {
		title: 'Keynote: How Vite Came to Be',
		speaker: speakers['yyx990803'],
		duration: 28,
		time: t(`00:16:21`)
	},
	ecosystem: {
		title: 'The Vite Ecosystem',
		speaker: speakers['patak-dev'],
		duration: 18, // 60sec
		time: t(`00:42:35`)
	},
	dx: {
		title: 'Vite, on-demand DX',
		speaker: speakers.antfu,
		duration: 10, // 50sec
		time: t(`01:00:20`)
	},
	vike: {
		title: 'Vike, Build Your Own Framework',
		speaker: speakers.brillout,
		duration: 4, // 60sec
		time: t(`06:53:15`)
	},
	fastify: {
		title: 'Rethinking the Full Stack Framework',
		speaker: speakers.galvez,
		duration: 4, // 60sec
		time: t(`06:57:05`)
	},
	stackblitz_keynote: {
		title: 'StackBlitz Keynote',
		participants: [speakers.sylwiavargas, speakers.sulco, speakers.ericsimons],
		duration: 32, // 60sec
		time: t(`02:16:10`)
	},
	storybook: {
		title: 'Developing, Documenting, and Testing your Vite app with Storybook',
		ticketTitle: 'Your Vite app with Storybook',
		speaker: speakers.ianvs,
		duration: 21, // 60sec
		time: t(`02:52:35`)
	},
	histoire: {
		title: 'Introduction to Histoire',
		speaker: speakers.hugoattal,
		duration: 6, // 60sec
		time: t(`03:13:31`)
	},
	ladle: {
		title: 'Introducing Ladle: Develop and test your React stories faster',
		shortTitle: 'Introducing Ladle',
		speaker: speakers.tajo,
		duration: 6, // 60sec
		time: t(`03:19:30`)
	},
	nx: {
		title: 'High Speed Monorepos with high-quality DX',
		speaker: speakers.juristr,
		duration: 6, // 60sec
		time: t(`03:25:14`)
	},
	pnpm: {
		title: 'What makes pnpm performant',
		speaker: speakers.zkochan,
		duration: 22, // 30sec
		time: t(`03:31:00`)
	},
	vitepress: {
		title: 'Deep Dive into VitePress',
		speaker: speakers.kiaking,
		duration: 30, // 30sec
		time: t(`01:32:26`)
	},
	sveltekit: {
		title: 'SvelteKit',
		speaker: speakers['rich-harris'],
		duration: 17, // 30sec
		time: t(`03:55:35`)
	},
	nuxt: {
		title: 'How Vite Makes Nuxt Possible',
		speaker: speakers.danielroe,
		duration: 26, // 60sec
		time: t(`04:12:15`)
	},
	angular: {
		title: 'Vite, Meta-Frameworks, and Angular',
		speaker: speakers.brandonroberts,
		duration: 18, // 20sec
		time: t(`04:37:57`)
	},
	astro: {
		title: 'Islands Architecture, Astro, and You',
		speaker: speakers['natemoo-re'],
		duration: 22, // 50sec
		time: t(`04:55:45`)
	},
	rakkas: {
		title: 'Rakkas: React apps with no API layer',
		speaker: speakers.cyco130,
		duration: 6, // 60sec
		time: t(`05:18:27`)
	},
	frameworks_panel: {
		title: 'Frameworks Panel',
		participants: [
			speakers.danielroe,
			speakers.fredkschott,
			speakers.benmccann,
			speakers.ryansolid,
			speakers.blittle,
			speakers.mhevery,
			speakers.jtomchak,
		],
		duration: 46, // 120sec
		time: t(`05:31:12`)
	},
	netlify: {
		title: 'Vite SSR at Netlify Edge',
		speaker: speakers.ascorbic,
		duration: 5, // 30sec
		time: t(`06:21:30`)
	},
	vercel: {
		title: 'Vite and Vercel',
		speaker: speakers.leerob,
		duration: 3, // 30sec
		time: t(`06:26:44`)
	},
	firebase: {
		title:
			'The most magical 5 minute Vite + Firebase tutorial you will ever see',
		shortTitle: 'Vite + Firebase',
		speaker: speakers.davideast,
		duration: 6, // 60sec
		time: t(`06:35:43`)
	},
	aws_amplify: {
		title: 'Vite + AWS Amplify',
		speaker: speakers.josefaidt,
		duration: 6, // 60sec
		time: t(`06:29:59`)
	},
	laravel: {
		title: 'Unlimited power with Laravel and Vite!',
		speaker: speakers.jessarcher,
		duration: 12, // 30sec
		time: t(`07:03:20`)
	},
	ruby: {
		title:
			'Frontend Joy in Ruby on Rails: optimizing your development experience with Vite',
		shortTitle: 'Frontend Joy in Ruby on Rails',
		speaker: speakers.elmassimo,
		duration: 12, // 40sec
		time: t(`07:15:38`)
	},
	cypress: {
		title: 'Cypress Component Testing',
		speaker: speakers.jessicasachs,
		duration: 22, // 40sec
		time: t(`07:27:47`)
	},
	playwright: {
		title: 'Component Testing with Playwright',
		speaker: speakers['debs-obrien'],
		duration: 20, // 30sec
		time: t(`07:49:53`)
	},
	vitest: {
		title: 'Vitest, testing DX reimagined',
		speaker: speakers['sheremet-va'],
		duration: 20, // 20sec
		time: t(`08:10:05`)
	},
	solid: {
		title: 'SolidJS: Getting Started',
		speaker: speakers.ryansolid,
		duration: 21, // 50sec
		time: t(`08:33:04`)
	},
	marko: {
		title: '0kb JS and Back Again: why Vite is the future of the MPA',
		ticketTitle: 'Why Vite is the future of the MPA',
		speaker: speakers.dylanpiercey,
		duration: 17, // 20sec
		time: t(`08:54:03`)
	},
	hydrogen: {
		title: 'Headless commerce with Shopify/Hydrogen and Vite',
		ticketTitle: 'Shopify/Hydrogen and Vite',
		speaker: speakers.frandiox,
		duration: 21, // 25sec
		time: t(`09:11:30`)
	},
	qwik: {
		title: 'Qwik City: Reimagined meta-framework for the edge',
		speaker: speakers.adamdbradley,
		duration: 20, // 60sec
		time: t(`09:31:50`)
	},
	islands: {
		title: 'DIY Islands Architecture with Vite',
		speaker: speakers.bholmesdev,
		duration: 8, // 50sec
		time: t(`09:52:12`)
	},
	bun: {
		title: 'Bun + Vite',
		speaker: speakers['jarred-sumner'],
		duration: 3, // 60sec
		time: t(`06:41:50`)
	},
	deno: {
		title: 'Deno + Vite',
		speaker: speakers.bartlomieju,
		duration: 5, // 60sec
		time: t(`06:44:48`)
	},
	contributing_101: {
		title: 'Vite Core, Contributing 101',
		speaker: speakers.bluwy,
		duration: 16, // 60sec
		time: t(`10:02:02`)
	},
	vue_and_vite: {
		title: `Vue's Road to Vite`,
		speaker: speakers.sodatea,
		duration: 21, // 50sec
		time: t(`10:23:33`)
	},
	rollup: {
		title: 'The hashing dilemma, Rollup 3, and our future with Vite',
		ticketTitle: 'Rollup 3, and our future with Vite',
		speaker: speakers.lukastaegert,
		duration: 19, // 60sec
		time: t(`01:10:19`)
	},
	vite_ecosystem_ci: {
		title: 'vite-ecosystem-ci',
		speaker: speakers.dominikg,
		duration: 9, // 30sec
		time: t(`10:44:32`)
	},
	vite_panel: {
		title: 'Vite Panel',
		participants: [
			speakers.yyx990803,
			speakers['patak-dev'],
			speakers.antfu,
			speakers.bluwy,
			speakers.sodatea,
			speakers.shinigami92,
			speakers.ladyleet,
		],
		duration: 46, // 120sec
		time: t(`10:52:20`)
	},
	tauri: {
		title: 'Tauri: Building better apps for a better future',
		ticketTitle: 'Tauri',
		speaker: speakers.jonaskruckenberg,
		duration: 6, // 60sec
		time: t(`05:24:44`)
	},
	opensauced: {
		title: 'Things learned from Vite contributions',
		speaker: speakers.bdougie,
		duration: 5,
		time: t(`10:17:47`)
	},
	education: {
		title: 'Vite for Education: Vite in Vite to teach Vite and beyond',
		ticketTitle: 'Vite for Education',
		speaker: speakers.jutanium,
		duration: 14, // 40sec
		time: t(`02:02:30`)
	},
});

export const preConferenceTalks = processTalks({
	elm: {
		title: 'Functional Programming in Vite with Elm',
		speaker: speakers.lindsaykwardell,
		duration: 20,
		video: 'https://youtu.be/ZPVGK2OSTog'
	},
	preview_js: {
		title:
			'Preview.js: How Vite enables previewing any UI component instantly in your IDE',
		ticketTitle: 'Preview.js',
		speaker: speakers.fwouts,
		duration: 20,
		video: 'https://youtu.be/_XlUQhIBDH4'
	},
});

export const postConferenceTalks = processTalks({
	tauri: {
		title: 'Tiny and secure native apps using Vite + Tauri',
		speaker: speakers.jonaskruckenberg,
		duration: 20,
	},
	rakkas: {
		title: 'Rakkas: Vite-powered React framework',
		speaker: speakers.cyco130,
		duration: 20,
	},
	fastify: {
		title: 'Effective SSR with Fastify DX',
		speaker: speakers.galvez,
		duration: 20,
	},
	nx: {
		title: 'Speed up your CI & Save the Environment',
		speaker: speakers.juristr,
		duration: 20,
	},
	histoire_deep_dive: {
		title: 'Histoire Deep Dive',
		speaker: speakers.akryum,
		duration: 20,
	},
	imba: {
		title: 'Imba: when paradigms shift',
		speaker: speakers.haikyuu,
		duration: 20,
	},
});

export const glue = processTalks({
	welcome: {
		title: 'Welcome to ViteConf',
		participants: [mcs.brittneypostma, speakers['patak-dev']],
		duration: 13,
		time: t(`00:00:00`)
	},
	eric_and_evan: {
		title: 'Eric and Evan',
		participants: [speakers.ericsimons, speakers.yyx990803],
		duration: 13,
		time: t(`00:13:15`)
	},
	vite: {
		title: 'Vite Section',
		speaker: speakers.ericsimons,
		duration: 4,
		time: t(`00:42:03`)
	},
	documentation: {
		title: 'Documentation Section',
		speaker: speakers.sylwiavargas,
		duration: 3,
		time: t(`01:29:45`)
	},
	custom_frameworks: {
		title: 'Custom Frameworks Section',
		speaker: speakers.bholmesdev,
		duration: 3,
		time: t(`06:51:17`)
	},
	design_systems: {
		title: 'Design Systems Section',
		speaker: mcs.josefineschaefer,
		duration: 4,
		time: t(`02:48:20`)
	},
	frameworks_a: {
		title: 'Frameworks Section',
		speaker: mcs.theobr,
		duration: 4,
		time: t(`03:53:46`)
	},
	frameworks_b: {
		title: 'Frameworks Section',
		speaker: speakers.jutanium,
		duration: 3,
		time: t(`08:31:00`)
	},
	backend: {
		title: 'Backend Integrations Section',
		speaker: speakers.lindsaykwardell,
		duration: 2,
		time: t(`07:02:00`)
	},
	testing: {
		title: 'Testing Section',
		speaker: mcs.stolinski,
		duration: 3,
		time: t(`07:26:40`)
	},
	hosting: {
		title: 'Hosting and Edge Section',
		speaker: mcs.jlengstorf,
		duration: 7,
		time: t(`06:18:29`)
	},
	contributing: {
		title: 'Vite and Contributing Section',
		speaker: mcs.surma,
		duration: 4,
		time: t(`09:59:01`)
	},
	closing: {
		title: 'ViteConf 2022',
		participants: [mcs.brittneypostma, speakers['patak-dev']],
		duration: 14,
		time: t(`11:34:56`)
	},
});

export const schedule = augmentSchedule([
	{
		talks: [
			glue.welcome,
			glue.eric_and_evan,
		],
	},
	{
		title: 'Vite Core',
		talks: [
			talks.vite_keynote,
			glue.vite,
			talks.ecosystem,
			talks.dx,
			talks.rollup,
		],
	},
	{
		title: 'Documentation & Education',
		talks: [glue.documentation, talks.vitepress, talks.education],
	},
	{
		title: 'Instant Development Workflows',
		talks: [talks.stackblitz_keynote],
	},
	{
		title: 'Design Systems & Monorepos',
		talks: [
			glue.design_systems,
			talks.storybook,
			talks.histoire,
			talks.ladle,
			talks.nx,
			talks.pnpm,
		],
	},
	{
		title: 'Frameworks',
		talks: [
			glue.frameworks_a,
			talks.sveltekit,
			talks.nuxt,
			talks.angular,
			talks.astro,
			talks.rakkas,
		],
	},
	{
		title: 'Desktop Apps',
		talks: [talks.tauri],
	},
	{
		title: 'Frameworks Live Panel',
		talks: [talks.frameworks_panel],
	},
	{
		title: 'Hosting and the Edge',
		talks: [
			glue.hosting,
			talks.netlify,
			talks.vercel,
			talks.aws_amplify,
			talks.firebase,
		],
	},
	{
		title: 'Environments',
		talks: [talks.bun, talks.deno],
	},
	{
		title: 'Custom Frameworks with Vite',
		talks: [glue.custom_frameworks, talks.vike, talks.fastify],
	},
	{
		title: 'Backend',
		talks: [glue.backend, talks.laravel, talks.ruby],
	},
	{
		title: 'Testing',
		talks: [glue.testing, talks.cypress, talks.playwright, talks.vitest],
	},
	{
		title: 'Frameworks',
		talks: [
			glue.frameworks_b,
			talks.solid,
			talks.marko,
			talks.hydrogen,
			talks.qwik,
			talks.islands,
		],
	},
	{
		title: 'Vite Core',
		talks: [
			glue.contributing,
			talks.contributing_101,
			talks.opensauced,
			talks.vue_and_vite,
			talks.vite_ecosystem_ci,
		],
	},
	{
		title: 'Vite Core Live Panel',
		talks: [talks.vite_panel, glue.closing],
	},
]);

export const speakersTeaser = [
	{
		name: 'Vite Core Team',
		topic: 'Vite',
		project: projects.vite,
	},
	{
		name: 'Svelte Core Team',
		topic: 'SvelteKit',
		project: projects.svelte,
	},
	{
		name: 'Solid Core Team',
		topic: 'SolidStart',
		project: projects.solid,
	},
	{
		name: 'Nuxt Core Team',
		topic: 'Nuxt 3',
		project: projects.nuxt,
	},
	{
		name: 'StackBlitz Core Team',
		topic: 'StackBlitz',
		project: projects.stackblitz,
	},
	{
		name: 'Hydrogen Core Team',
		topic: 'Shopify',
		project: projects.hydrogen,
	},
	{
		name: 'Astro Core Team',
		topic: 'Astro',
		project: projects.astro,
	},
	{
		name: 'Laravel Core Team',
		topic: 'Laravel+Vite',
		project: projects.laravel,
	},
	{
		name: 'vite-ruby Creator',
		topic: 'Vite Ruby',
		project: projects.ruby,
	},
	{
		name: 'Vitest Core Team',
		topic: 'Vitest',
		project: projects.vitest,
	},
	{
		name: 'Cypress Core Team',
		topic: 'Cypress',
		project: projects.cypress,
	},
	{
		name: 'Playwright Team',
		topic: 'Microsoft',
		project: projects.playwright,
	},
];

export const twitterMessages = [
	(project) =>
		`I'm attending @ViteConf today! ${project} community checking in! Get your ticket too!`,
	(project) =>
		`I just got my ticket for @ViteConf! The ${project} community is going to be there!`,
	(project) =>
		`My ticket for @ViteConf is ready! ${project} present! Get your free ticket too!`,
	(project) => `I'll be there today for @ViteConf, get your free ticket too`,
	(project) => `Today is @ViteConf! Get your free ticket!`,
	(project) => `Ready for @ViteConf! Did you get your free ticket already?`,
	(project) =>
		`A conference about the Vite ecosystem! Count me in! Have you registered for @ViteConf?`,
	(project) =>
		`See you in @ViteConf! The ${project} community will not miss it!`,
	(project) => `Sweet! Look at that, I got my @ViteConf ticket! Get yours too!`,
	(project) =>
		`Woah, more than 22K registered for @ViteConf! The ${project} community will not miss it! Get your free ticket!`,
	(project) =>
		`Have you seen the speaker lineup for @ViteConf!? You’re going to want to grab a free ticket!`,
	(project) =>
		`Check out my customized @ViteConf ticket! ${project} represent! Get your free ticket too!`,
	(project) =>
		`I’m excited for @ViteConf today! Get your free themed ticket!`,
	(project) =>
		`I can’t wait for the talks at @ViteConf today! Have you grabbed your free ticket yet?`,
	(project) =>
		`A conference about the Vite ecosystem? I'll be there today! Have you registered for @ViteConf yet?`,
];

const pluralizeUserDisplayName = (displayName: string) =>
	displayName.charAt(displayName.length - 1).toLowerCase() === 's'
		? `${displayName}'`
		: `${displayName}'s`;

export const twitterMessagesShareSpeaker = [
	(username: SpeakerData) =>
		`${pluralizeUserDisplayName(
			username.displayName
		)} talk for @ViteConf looks awesome! Check out the other speakers too and get your free ticket!`,
];

export const twitterMessagesFromSpeaker = [
	(username: SpeakerData) =>
		`I'll be speaking at @ViteConf! Get your free ticket and see you in October!`,
];

export const liveTwitterMessagesShareTalk = [
	(username: SpeakerData) =>
		`I'm watching ${pluralizeUserDisplayName(username.displayName)} @ViteConf talk: ${
			username.talk.title
		}. Check it out here!`,
];

function advanceSeconds(date: Date, seconds: number) {
	return new Date(date.getTime() + seconds * 1000);
}

function augmentSchedule(schedule: ScheduleData[]) {
	return schedule.map((section) => {
		if (!section) return;

		return {
			...section,
			talks: section.talks.map((talk) => {
				if (!talk) return;

				talk.start = advanceSeconds(startDateTime, talk.time);
				
				return talk;
			}),
		};
	});
}

function processTalks<TalkID extends string>(talks: Record<TalkID, TalkData>) {
	for (const [talkID, talk] of Object.entries(talks)) {
		talk.description ??=
			'A talk about Vite and its ecosystem, and the projects pushing DX forward.';

		talk.slideImage = `/images/slides/${talk.slideImage ?? talkID}.png`;
		
		talk.key = talkID;

		if (talk.speaker) {
			if (talk.speaker.talk) {
				talk.speaker.extra = talk.speaker.talk;
			} else {
				talk.speaker.talk = talk;
			}
		}
	}
	for (const talk of Object.values(talks)) {
		if (talk.participants) {
			talk.participants.forEach((participant) => {
				participant.talk ??= talk;
				participant.extra = talk;
			});
		}
	}
	return talks;
}

function processSpeakers<SpeakerID extends string>(
	speakers: Record<SpeakerID, SpeakerData>
) {
	for (const speaker of Object.values(speakers)) {
		speaker.bio ??= `${speaker.project.name} Team Member, working at ${speaker.company}`;
		speaker.shortBio ??= `${speaker.project.name} Team Member`;

		speaker.avatar = (
			Object.entries(optimizedAvatars).find(([path]) =>
				path.includes(speaker.screenName.toLowerCase())
			)?.[1] as any
		)?.default;
	}

	return speakers;
}
