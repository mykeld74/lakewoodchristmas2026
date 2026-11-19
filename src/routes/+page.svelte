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
	import { CHURCH, EVENT_DATE, SERVICES, SITE_URL, getService } from '#lib/services';

	const invited = $derived(getService(page.url.searchParams.get('service')) ?? null);

	const title = $derived(
		invited
			? `Christmas Eve at Westwoods — ${invited.name}, ${invited.time}`
			: 'Christmas Eve at Westwoods — Three services, everyone welcome'
	);

	const description = $derived(
		invited
			? `${invited.name} on ${EVENT_DATE.long}, 2026 at ${invited.time}. ${CHURCH.name}, ${CHURCH.street}, ${CHURCH.city}. Free, about an hour, everyone welcome.`
			: `Three Christmas Eve services at ${CHURCH.name} in ${CHURCH.city} on ${EVENT_DATE.long}, 2026 — 3:30 pm, 5:00 pm, and an 11:00 pm candlelight service. Free, about an hour, everyone welcome.`
	);

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
		)
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

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />

	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
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
