// NOTE: details confirmed against westwoodscc.org — address, casual dress, north/south
// entrances with greeters, worship + Bible teaching, "belong before you believe".
// Service copy revised from pastor notes Nov 2026.
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
export type ServiceCategory = 'casual' | 'acoustic';

export interface Service {
	id: ServiceId;
	time: string;
	timeShort: string;
	endTime: string;
	timeRange: string;
	iso: string;
	name: string;
	tag: string;
	blurb: string;
	bestFor: string;
	tone: 'day' | 'evening' | 'night';
	category: ServiceCategory;
}

export const SERVICES: Service[] = [
	{
		id: '330',
		time: '3:30 pm',
		timeShort: '3:30',
		endTime: '4:30 pm',
		timeRange: '3:30 – 4:30 pm',
		iso: '2026-12-24T15:30:00-07:00',
		name: 'Casual Relational',
		tag: 'Identical to the 5:00',
		blurb:
			'One hour — Christmas music, kids singing, a short moment just for the kids, candlelight, and a message of hope that Christmas brings. The same service as 5:00.',
		bestFor: 'Families, friends, and a warm, relational hour',
		tone: 'day',
		category: 'casual'
	},
	{
		id: '500',
		time: '5:00 pm',
		timeShort: '5:00',
		endTime: '6:00 pm',
		timeRange: '5:00 – 6:00 pm',
		iso: '2026-12-24T17:00:00-07:00',
		name: 'Casual Relational',
		tag: 'Identical to the 3:30',
		blurb:
			'One hour — Christmas music, kids singing, a short moment just for the kids, candlelight, and a message of hope that Christmas brings. The same service as 3:30.',
		bestFor: 'Families, friends, and a warm, relational hour',
		tone: 'evening',
		category: 'casual'
	},
	{
		id: '1100',
		time: '11:00 pm',
		timeShort: '11:00',
		endTime: 'Midnight',
		timeRange: '11:00 pm – Midnight',
		iso: '2026-12-24T23:00:00-07:00',
		name: 'Acoustic Christmas Eve',
		tag: 'Into Christmas Day',
		blurb:
			'One hour — Christmas music, a message, communion, and a welcome to Christmas Day at Midnight.',
		bestFor: 'A quieter late hour — music, message, and communion',
		tone: 'night',
		category: 'acoustic'
	}
];

export const SERVICE_CATEGORIES = [
	{
		id: 'casual' as const,
		title: 'Casual Relational Services',
		timesLabel: '3:30 – 4:30 · 5:00 – 6:00',
		blurb:
			'Identical services — one hour of Christmas music, kids singing, a short moment just for the kids, candlelight, and a message of hope that Christmas brings.',
		services: SERVICES.filter((s) => s.category === 'casual')
	},
	{
		id: 'acoustic' as const,
		title: 'Acoustic Christmas Eve',
		timesLabel: '11:00 pm – Midnight',
		blurb:
			'One hour of Christmas music, a message, communion, and a welcome to Christmas Day at Midnight.',
		services: SERVICES.filter((s) => s.category === 'acoustic')
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
			? `Hey! Any plans Christmas Eve? Westwoods does Acoustic Christmas Eve at 11:00 — Christmas music, a message, communion, and we welcome Christmas Day at Midnight. About an hour, free, super casual. Want to come with me? ${link}`
			: `Hey! Any plans Christmas Eve? Westwoods is doing a casual Christmas Eve service at ${service.time} — Christmas music, kids singing, candlelight, and a short message of hope. About an hour. Free and super casual. Want to come with me? ${link}`
		: `Hey! Any plans Christmas Eve? Westwoods has three Christmas Eve services — ${timesList}. About an hour each. Free and super casual. Want to come with me? ${link}`;

	const emailSubject = service
		? `Come with me to Christmas Eve — ${service.time}`
		: `Come with me to Christmas Eve at Westwoods`;

	const emailBody = service
		? `Hi,

I wanted to invite you to something on Christmas Eve.

Westwoods Community Church is holding ${service.name} on ${EVENT_DATE.long} at ${service.timeRange}, at ${CHURCH.address}.

${service.blurb}

It's free, it's about an hour, you can wear whatever you want, and there is no pressure of any kind. Whether church is part of your life or not, you are genuinely invited — I would love for you to come with me.

All the details are here: ${link}
`
		: `Hi,

I wanted to invite you to something on Christmas Eve.

Westwoods Community Church is holding three Christmas Eve services on ${EVENT_DATE.long} at ${CHURCH.address}:

${SERVICES.map((s) => `  • ${s.timeRange} — ${s.name}: ${s.bestFor}`).join('\n')}

They're free, about an hour each, you can wear whatever you want, and there is no pressure of any kind. Whether church is part of your life or not, you are genuinely invited — pick whichever time works and I would love for you to come with me.

All the details are here: ${link}
`;

	const social = service
		? `Christmas Eve at Westwoods Community Church — ${service.name}, ${EVENT_DATE.long} at ${service.timeRange} in Lakewood. Everyone's welcome.`
		: `Christmas Eve at Westwoods Community Church — three services ${EVENT_DATE.long} in Lakewood: ${timesList}. Everyone's welcome.`;

	const preview: [string, string] = service
		? [
				`Hey — doing anything Christmas Eve? Westwoods has ${service.name} at ${service.time}.`,
				service.id === '1100'
					? `Christmas music, a message, communion — and we welcome Christmas Day at Midnight. About an hour. Want to come with me?`
					: `Christmas music, kids singing, candlelight, and a short message of hope. About an hour. Free and really casual. Want to come with me?`
			]
		: [
				`Hey — doing anything Christmas Eve? Westwoods has services at ${timesList}.`,
				`About an hour each. Free and really casual. Pick a time and come with me?`
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
