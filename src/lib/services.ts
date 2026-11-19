export const SITE_URL = 'https://westwoodschristmas.org';

export const CHURCH = {
	name: 'Westwoods Community Church',
	street: '7700 W Woodard Drive',
	city: 'Lakewood',
	state: 'CO',
	zip: '80227',
	get address() {
		return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
	},
	mapsQuery: '7700 W Woodard Drive, Lakewood, CO 80227'
} as const;

export const EVENT_DATE = {
	iso: '2026-12-24',
	long: 'Thursday, December 24',
	short: 'Dec 24',
	weekday: 'Christmas Eve'
} as const;

export type ServiceId = '330' | '500' | '1100';

export interface Service {
	id: ServiceId;
	time: string;
	timeShort: string;
	iso: string;
	name: string;
	tag: string;
	blurb: string;
	bestFor: string;
	tone: 'day' | 'evening' | 'night';
}

export const SERVICES: Service[] = [
	{
		id: '330',
		time: '3:30 pm',
		timeShort: '3:30',
		iso: '2026-12-24T15:30:00-07:00',
		name: 'Early Family Service',
		tag: 'Easiest with little ones',
		blurb:
			'Carols, the Christmas story, and a short message. The same service as 5:00, in our quietest hour — the easiest one to slip into if you have small kids or dinner waiting afterward.',
		bestFor: 'Families with young children, anyone with evening plans',
		tone: 'day'
	},
	{
		id: '500',
		time: '5:00 pm',
		timeShort: '5:00',
		iso: '2026-12-24T17:00:00-07:00',
		name: 'Family Service',
		tag: 'Our fullest hour',
		blurb:
			'The same service as 3:30, with the room at its fullest and the singing at its loudest. If you want Christmas Eve to feel like Christmas Eve, this is the one.',
		bestFor: 'Anyone who wants the full room and the big carols',
		tone: 'evening'
	},
	{
		id: '1100',
		time: '11:00 pm',
		timeShort: '11:00',
		iso: '2026-12-24T23:00:00-07:00',
		name: 'Candlelight Service',
		tag: 'Quiet, by candlelight',
		blurb:
			'Slower and more reflective. The lights go down, candlelight passes hand to hand across the room, and we sing Silent Night together as Christmas Day arrives.',
		bestFor: 'Adults and older kids, anyone who loves a still night',
		tone: 'night'
	}
];

export function getService(id: string | null | undefined): Service | undefined {
	return SERVICES.find((s) => s.id === id);
}

/** Where the invite link points. `service` of `null` means "let them choose". */
export function inviteUrl(service: ServiceId | null, source?: string): string {
	const url = new URL(SITE_URL);
	if (service) url.searchParams.set('service', service);
	if (source) url.searchParams.set('s', source);
	return url.toString();
}

export function prettyUrl(service: ServiceId | null): string {
	const base = SITE_URL.replace(/^https?:\/\//, '');
	return service ? `${base}/?service=${service}` : base;
}

interface Messages {
	sms: string;
	emailSubject: string;
	emailBody: string;
	social: string;
	/** Short preview lines shown in the phone mock-up. */
	preview: [string, string];
}

export function inviteMessages(service: Service | null, source: string): Messages {
	const link = inviteUrl(service?.id ?? null, source);
	const when = service
		? `${EVENT_DATE.weekday} at ${service.time}`
		: `${EVENT_DATE.weekday}`;
	const timesList = SERVICES.map((s) => s.time).join(', ').replace(/, ([^,]*)$/, ' or $1');

	const sms = service
		? `Hey! Any plans Christmas Eve? Westwoods is doing a ${service.id === '1100' ? 'candlelight service' : 'Christmas Eve service'} at ${service.time} — carols, the Christmas story, about an hour. It's free and super casual. Want to come with me? ${link}`
		: `Hey! Any plans Christmas Eve? Westwoods has three Christmas Eve services — ${timesList}. Carols, the Christmas story, about an hour. Free and super casual. Want to come with me? ${link}`;

	const emailSubject = service
		? `Come with me to Christmas Eve — ${service.time}`
		: `Come with me to Christmas Eve at Westwoods`;

	const emailBody = service
		? `Hi,

I wanted to invite you to something on Christmas Eve.

Westwoods Community Church is holding its ${service.name.toLowerCase()} on ${EVENT_DATE.long} at ${service.time}, at ${CHURCH.address}.

${service.blurb}

It's free, it's about an hour, you can wear whatever you want, and there is no pressure of any kind. Whether church is part of your life or not, you are genuinely invited — I would love for you to come with me.

All the details are here: ${link}
`
		: `Hi,

I wanted to invite you to something on Christmas Eve.

Westwoods Community Church is holding three Christmas Eve services on ${EVENT_DATE.long} at ${CHURCH.address}:

${SERVICES.map((s) => `  • ${s.time} — ${s.name}: ${s.bestFor}`).join('\n')}

They're free, about an hour each, you can wear whatever you want, and there is no pressure of any kind. Whether church is part of your life or not, you are genuinely invited — pick whichever time works and I would love for you to come with me.

All the details are here: ${link}
`;

	const social = service
		? `Christmas Eve at Westwoods Community Church — ${service.name}, ${EVENT_DATE.long} at ${service.time} in Lakewood. Everyone's welcome.`
		: `Christmas Eve at Westwoods Community Church — three services ${EVENT_DATE.long} in Lakewood: ${timesList}. Everyone's welcome.`;

	const preview: [string, string] = service
		? [
				`Hey — doing anything Christmas Eve? Westwoods has a service at ${service.time}.`,
				service.id === '1100'
					? `They do the whole candlelight thing and finish with Silent Night right before midnight. About an hour. Want to come with me?`
					: `Carols, the Christmas story, about an hour. Free and really casual. Want to come with me?`
			]
		: [
				`Hey — doing anything Christmas Eve? Westwoods has services at ${timesList}.`,
				`Carols, the Christmas story, about an hour. Free and really casual. Pick a time and come with me?`
			];

	return { sms, emailSubject, emailBody, social, preview };
}

export function calendarUrl(service: Service): string {
	const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
	const start = new Date(service.iso);
	const end = new Date(start.getTime() + 60 * 60 * 1000);
	const params = new URLSearchParams({
		action: 'TEMPLATE',
		text: `${service.name} \u2014 ${CHURCH.name}`,
		dates: `${fmt(start)}/${fmt(end)}`,
		details: `Christmas Eve at ${CHURCH.name}. ${service.blurb}`,
		location: CHURCH.address
	});
	return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
