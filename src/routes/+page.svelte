<script lang="ts">
	import { page } from '$app/state';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import ServicesSection from '#lib/components/ServicesSection.svelte';
	import InvitationSection from '#lib/components/InvitationSection.svelte';
	import VisitSection from '#lib/components/VisitSection.svelte';
	import InviteTool from '#lib/components/InviteTool.svelte';
	import QuestionsSection from '#lib/components/QuestionsSection.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import { CHURCH, EVENT_DATE, SERVICES, SITE_URL, getService } from '#lib/services.js';

	const invited = $derived(getService(page.url.searchParams.get('service')) ?? null);

	const title = $derived(
		invited
			? `The Christmas we actually need — ${invited.name}, ${invited.timeRange}`
			: 'The Christmas we actually need — Christmas Eve at Westwoods'
	);

	const description = $derived(
		invited
			? `Press into the Christmas we actually need. ${invited.name} on ${EVENT_DATE.long}, 2026, ${invited.timeRange}. ${CHURCH.name}, ${CHURCH.street}, ${CHURCH.city}. Free, about an hour, everyone welcome.`
			: `Press into the Christmas we actually need. Christmas Eve at ${CHURCH.name} in ${CHURCH.city}, ${EVENT_DATE.long}, 2026 — Casual Relational services 3:30 – 4:30 and 5:00 – 6:00 pm, and Acoustic Christmas Eve 11:00 pm – Midnight. Free, everyone welcome.`
	);

	const ogImage = $derived(`${SITE_URL}/og-image${invited ? `-${invited.id}` : ''}.png`);

	// Split so the literal closing tag never appears in source (it would end this script block).
	const ldOpen = '<script type="application/ld+json">';
	const ldClose = '<' + '/script>';

	const jsonLd = $derived(
		JSON.stringify(
			SERVICES.map((service) => ({
				'@context': 'https://schema.org',
				'@type': 'Event',
				name: `${service.name} — Christmas Eve at ${CHURCH.name}`,
				startDate: service.iso,
				eventStatus: 'https://schema.org/EventScheduled',
				eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
				description: service.blurb,
				location: {
					'@type': 'Place',
					name: CHURCH.name,
					address: {
						'@type': 'PostalAddress',
						streetAddress: CHURCH.street,
						addressLocality: CHURCH.city,
						addressRegion: CHURCH.state,
						postalCode: CHURCH.zip,
						addressCountry: 'US'
					}
				},
				organizer: { '@type': 'Organization', name: CHURCH.name, url: SITE_URL },
				isAccessibleForFree: true,
				offers: {
					'@type': 'Offer',
					price: '0',
					priceCurrency: 'USD',
					availability: 'https://schema.org/InStock',
					url: SITE_URL
				}
			}))
			// Escaping "<" makes it impossible for the JSON to close the <script> element.
		).replace(/</g, '\\u003c')
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="theme-color" content="#fcf8f2" />
	<meta name="geo.placename" content={`${CHURCH.name}, ${CHURCH.address}`} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Christmas Eve at Westwoods" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={title} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static, "<"-escaped JSON-LD built from our own data -->
	{@html ldOpen + jsonLd + ldClose}
</svelte:head>

<SiteHeader />

<main>
	<Hero {invited} />
	<ServicesSection {invited} />
	<InvitationSection />
	<VisitSection />
	<InviteTool initial={invited?.id ?? null} />
	<QuestionsSection />
</main>

<SiteFooter />
