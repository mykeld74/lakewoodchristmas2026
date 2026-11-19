// NOTE: details confirmed against westwoodscc.org — address, casual dress, north/south
// entrances with greeters, worship + Bible teaching, "belong before you believe".
// STILL TO CONFIRM with the church: that 3:30 and 5:00 are identical services, the
// ~1 hour runtime on Christmas Eve (Sundays run 60-75 min), and whether kids' classes
// run on Christmas Eve or kids stay in the service.
export const SITE_URL = 'https://lakewoodchristmas.org';

export const CHURCH = {
	name: 'Westwoods Community Church',
	street: '7700 W Woodard Drive',
	city: 'Lakewood',
	state: 'CO',
	zip: '80227',
	website: 'https://westwoodscc.org',
	websiteLabel: 'westwoodscc.org',
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
		name: 'Daylight Service',
		tag: 'While it is still light out',
		blurb:
			'Carols and worship, with a short message. The same service as 5:00, while there is still daylight outside — a good fit if you have somewhere to be later, or would rather not be out late.',
		bestFor: 'An early start, with the evening still ahead of you',
		tone: 'day'
	},
	{
		id: '500',
		time: '5:00 pm',
		timeShort: '5:00',
		iso: '2026-12-24T17:00:00-07:00',
		name: 'Twilight Service',
		tag: 'Just after sunset',
		blurb:
			'The same service as 3:30, once the light has gone. Carols and worship, with a short message, and still time for whatever the rest of your night holds.',
		bestFor: 'The middle of the evening, with the night still ahead',
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
			'Slower and more reflective. The lights go down, candlelight passes hand to hand across the room, and we sing the night out together as Christmas Day arrives.',
		bestFor: 'A still, late night — better for older kids and adults',
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
	/** Message plus link for the copy button — the same words the mock-up shows. */
	copy: string;
}

export function inviteMessages(service: Service | null, source: string): Messages {
	const link = inviteUrl(service?.id ?? null, source);
	const timesList = SERVICES.map((s) => s.time)
		.join(', ')
		.replace(/, ([^,]*)$/, ' or $1');

	const sms = service
		? service.id === '1100'
			? `Hey! Any plans Christmas Eve? Westwoods does an 11:00 pm candlelight service — carols and worship, and the whole room singing by candlelight right before midnight. About an hour, free, super casual. Want to come with me? ${link}`
			: `Hey! Any plans Christmas Eve? Westwoods is doing a Christmas Eve service at ${service.time} — carols and worship, about an hour. It's free and super casual. Want to come with me? ${link}`
		: `Hey! Any plans Christmas Eve? Westwoods has three Christmas Eve services — ${timesList}. Carols and worship, about an hour. Free and super casual. Want to come with me? ${link}`;

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
					? `They do the whole candlelight thing right before midnight. About an hour. Want to come with me?`
					: `Carols and worship, about an hour. Free and really casual. Want to come with me?`
			]
		: [
				`Hey — doing anything Christmas Eve? Westwoods has services at ${timesList}.`,
				`Carols and worship, about an hour. Free and really casual. Pick a time and come with me?`
			];

	// Copying gives you the whole invitation, not a bare URL — so it can be pasted
	// into a text, an email or a group chat without having to write anything.
	const copy = `${preview[0]} ${preview[1]}\n\n${link}`;

	return { sms, emailSubject, emailBody, social, preview, copy };
}

export function calendarUrl(service: Service): string {
	const fmt = (d: Date) =>
		d
			.toISOString()
			.replace(/[-:]/g, '')
			.replace(/\.\d{3}/, '');
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
