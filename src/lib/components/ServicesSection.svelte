<script lang="ts">
	import { SERVICE_CATEGORIES, EVENT_DATE, calendarUrl, type Service } from '#lib/services.js';

	let { invited = null }: { invited?: Service | null } = $props();
</script>

<section class="section services" id="services">
	<div class="container">
		<header class="head">
			<p class="eyebrow">Three services &middot; two kinds of night</p>
			<h2>Two kinds of Christmas Eve. Pick the hour that fits.</h2>
			<p class="lede">
				The 3:30 and 5:00 are identical casual, relational services &mdash; come to whichever fits
				your afternoon. The 11:00 is Acoustic Christmas Eve: a quieter late hour with communion that
				carries us into Christmas Day at midnight.
			</p>
		</header>

		<ul class="grid">
			{#each SERVICE_CATEGORIES as category (category.id)}
				<li class="category card tone-{category.id}">
					<h3>{category.title}</h3>
					<p class="times-label">{category.timesLabel}</p>
					<p class="blurb">{category.blurb}</p>

					<ul class="rows">
						{#each category.services as service (service.id)}
							{@render serviceRow(service)}
						{/each}
					</ul>

					<div class="graphic-slot">
						{#if category.id === 'casual'}
							<enhanced:img
								class="graphic"
								src="../assets/service-casual.jpg"
								alt="Advent series graphic: The Christmas We Actually Need, on cream with holly"
								sizes="(min-width: 52rem) 45vw, 100vw"
							/>
						{:else}
							<enhanced:img
								class="graphic"
								src="../assets/service-acoustic.jpg"
								alt="Christmas Eve by Candlelight: an acoustic Christmas Eve service"
								sizes="(min-width: 52rem) 45vw, 100vw"
							/>
						{/if}
					</div>
				</li>
			{/each}
		</ul>

		<p class="footnote">
			All three are on {EVENT_DATE.long}, 2026. No ticket, no registration, no cost &mdash; just
			come.
		</p>
	</div>
</section>

{#snippet serviceRow(service: Service)}
	<li id="service-{service.id}" class={['row', { 'is-invited': invited?.id === service.id }]}>
		<div class="row-main">
			{#if invited?.id === service.id}
				<p class="invited-flag">You were invited to this one</p>
			{/if}
			<p class="time">{service.timeRange}</p>
			<p class="tag">{service.tag}</p>
		</div>

		<a class="cal" href={calendarUrl(service)} target="_blank" rel="noopener noreferrer">
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.7"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<rect x="3.5" y="5" width="17" height="15.5" rx="2" />
				<path d="M3.5 9.5h17M8 3.5V6m8-2.5V6" />
			</svg>
			Add to calendar
		</a>
	</li>
{/snippet}

<style>
	.services {
		background: var(--sand);
	}

	.head {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		margin-bottom: clamp(2.25rem, 4vw, 3.25rem);
	}

	.grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1.25rem;
	}

	.category {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.5rem;
		min-width: 0;
		border-top: 4px solid var(--accent, var(--gold));
	}

	.tone-casual {
		--accent: var(--gold);
	}
	.tone-acoustic {
		--accent: var(--spruce);
	}

	.graphic-slot {
		margin-top: auto;
		padding-top: 0.6rem;
		width: 100%;
	}

	.graphic-slot :global(picture),
	.graphic-slot :global(img) {
		display: block;
		width: 100%;
	}

	.graphic-slot :global(img) {
		height: auto;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: var(--radius);
	}

	h3 {
		margin: 0;
		font-size: 1.375rem;
	}

	.times-label {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.4rem, 2.6vw, 1.75rem);
		font-weight: 600;
		letter-spacing: -0.03em;
		line-height: 1.1;
		color: var(--accent);
	}

	.blurb {
		margin: 0 0 0.6rem;
		color: var(--ink-soft);
		font-size: 0.975rem;
		line-height: 1.6;
	}

	.rows {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		border-top: 1px solid var(--line);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem 1rem;
		padding: 0.9rem 0.6rem;
		border-bottom: 1px solid var(--line);
		/* keeps the sticky header from covering the row on #service-{id} jumps */
		scroll-margin-top: 6rem;
	}

	.row:last-child {
		border-bottom: 0;
	}

	.row.is-invited {
		border-radius: var(--radius);
		background: color-mix(in srgb, var(--accent) 10%, var(--paper));
		box-shadow: 0 0 0 2px var(--accent);
	}

	.row-main {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		align-items: flex-start;
	}

	.invited-flag {
		padding: 0.2rem 0.7rem;
		border-radius: var(--radius-pill);
		background: var(--accent);
		color: #fff;
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.time {
		font-family: var(--font-display);
		font-size: 1.2rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.2;
	}

	.tag {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-faint);
	}

	.cal {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--spruce);
		text-decoration: none;
		border-bottom: 1.5px solid transparent;
		transition: border-color 0.15s;
	}

	.cal:hover {
		border-bottom-color: currentColor;
	}

	.footnote {
		margin-top: 2rem;
		color: var(--ink-faint);
		font-size: 0.9375rem;
	}

	@media (min-width: 52rem) {
		.grid {
			grid-template-columns: 1fr 1fr;
			/* title · times · blurb · rows · graphic — shared tracks via subgrid */
			grid-template-rows: auto auto auto 1fr auto;
			align-items: stretch;
			gap: 0.5rem 1.25rem;
		}

		.category {
			display: grid;
			grid-template-rows: subgrid;
			grid-row: span 5;
			/* Match parent row-gap so shared tracks stay aligned */
			gap: 0.5rem 0;
			height: auto;
		}

		.blurb {
			margin-bottom: 0;
		}

		.rows {
			align-self: stretch;
		}

		.graphic-slot {
			margin-top: 0;
			padding-top: 0;
			align-self: end;
		}
	}
</style>
