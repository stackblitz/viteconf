import { talks, glue, schedule, startDateTime } from '~~/conference';
import { talkTitleToSlug } from '~~/helpers/utils';

function useCurrentReplayDate() {
	const elapsed = useReplayCurrentTime()
	return computed(() => {
		return new Date(startDateTime.getTime() + elapsed.value * 1000);
	});
}

export function usePlayerCurrentSchedule(options: { live: boolean } = { live: false }) {
	const currentTime = $(options.live ? useIntervalDate(1000 * 5) : useCurrentReplayDate());

	const secondSchedule = schedule.map((section) => ({
		...section,
		talks: section.talks.map((talk) => ({
			...talk,
			start: new Date(+talk.start + /** +12 hours */ 1000 * 60 * 60 * 12),
		})),
	}));

	const allTalks = (options.live ? [...schedule, ...secondSchedule] : schedule)
		.map((section) => {
			const talks = section.talks;
			talks.forEach((val) => (val.sectionTitle = section.title));
			return section.talks;
		})
		.flat(1);

	// Show only the first 12 hour talks only
	const firstTalkTime = allTalks[0].start;
	const talks = options.live ? allTalks.filter(
		(talk) =>
			talk.start <=
			new Date(
				Math.max(+new Date(), +firstTalkTime) +
					/** +12 hours */ 1000 * 60 * 60 * 12
			)
	) : allTalks;

	// Split schedule up by current time
	const talksDone = $computed(() =>
		talks.filter((talk) => +talk.start <= +currentTime)
	);

	const upcomingTalks = $computed(() =>
		talks.slice(talksDone.length)
	);

	const previousTalk = $computed(() => talks[talksDone.length - 2]);
	const currentTalk = $computed(() => talks[talksDone.length - 1]);
	const nextTalk = $computed(() => talks[talksDone.length]);
	
	return $$({ previousTalk, currentTalk, nextTalk, upcomingTalks });
}

function matchSpeaker(speaker, marker: string) {
	return speaker.screenName.toLowerCase() === marker || speaker.twitter?.toLowerCase() === marker
}

export function useTalkFromRoute() {
	const route = useRoute();

	let queryMarker = (route.params.marker as string)?.toLowerCase();
	if (!queryMarker) {
		return;
	}
	return talks[queryMarker] ?? glue[queryMarker] ?? [...Object.values(talks), ...Object.values(glue)].find(
		(talk) => {
			const speaker = talk.speaker;
			if (speaker && matchSpeaker(speaker, queryMarker)) {
				return true;
			}
			if (talkTitleToSlug(talk.title) === queryMarker) {
				return true;
			}
			return talk.participants?.find(p => matchSpeaker(p, queryMarker))
		}
	);
}
