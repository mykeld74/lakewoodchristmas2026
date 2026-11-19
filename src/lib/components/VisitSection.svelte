<script lang="ts">
	import { CHURCH } from '#lib/services';

	const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CHURCH.mapsQuery)}`;

	const details = [
		{
			title: 'Getting there',
			body: `We're at ${CHURCH.street} in ${CHURCH.city}. Park in the main lot and head for the doors with the lights on — someone will be outside to point you in. Accessible parking and a drop-off spot are near the main entrance.`
		},
		{
			title: 'When to arrive',
			body: 'Ten or fifteen minutes early is plenty, and it gets you a better seat. Christmas Eve is our busiest night of the year, so the 5:00 fills up first — if you are running late, the 3:30 or the 11:00 will have more room.'
		},
		{
			title: 'What happens',
			body: 'Carols everyone knows, the Christmas story read aloud, a short message, and — at the 11:00 — candlelight passed hand to hand. About an hour, start to finish. You can sing or just listen.'
		},
		{
			title: 'Bringing kids',
			body: 'Kids are welcome at every service and stay with you the whole time. Wiggling and noise are expected on Christmas Eve. The 3:30 is the gentlest landing for young families; the 11:00 runs late and suits older kids and adults best.'
		}
	];
</script>

<section class="section visit" id="visit">
	<div class="container">
		<header class="head">
			<p class="eyebrow">Plan your visit</p>
			<h2>Everything you'd want to know before you walk in.</h2>
		</header>

		<div class="layout">
			<ul class="details">
				{#each details as item (item.title)}
					<li>
						<h3>{item.title}</h3>
						<p>{item.body}</p>
					</li>
				{/each}
			</ul>

			<aside class="map card">
				<p class="eyebrow">Where</p>
				<p class="name">{CHURCH.name}</p>
				<p class="addr">
					{CHURCH.street}<br />
					{CHURCH.city}, {CHURCH.state} {CHURCH.zip}
				</p>
				<a class="btn btn-outline" href={mapsHref} target="_blank" rel="noopener noreferrer">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
						<circle cx="12" cy="10" r="2.6" />
					</svg>
					Open in Maps
				</a>
			</aside>
		</div>
	</div>
</section>

<style>
	.visit {
		background: var(--sand);
	}

	.head {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		margin-bottom: clamp(2rem, 4vw, 3rem);
		max-width: var(--measure);
	}

	.layout {
		display: grid;
		gap: clamp(1.5rem, 3vw, 2.5rem);
		align-items: start;
	}

	.details {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1.5rem;
	}

	.details li {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding-left: 1.1rem;
		border-left: 3px solid var(--line-strong);
	}

	.details h3 {
		font-size: 1.1875rem;
	}

	.details p {
		color: var(--ink-soft);
		font-size: 0.975rem;
		line-height: 1.65;
	}

	.map {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
		position: sticky;
		top: 5.5rem;
	}

	.name {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		margin-top: 0.3rem;
	}

	.addr {
		color: var(--ink-soft);
		line-height: 1.55;
		margin-bottom: 0.6rem;
	}

	@media (min-width: 56rem) {
		.layout {
			grid-template-columns: 1.4fr 0.9fr;
		}
		.details {
			grid-template-columns: 1fr 1fr;
			gap: 1.75rem 2rem;
		}
	}
</style>
