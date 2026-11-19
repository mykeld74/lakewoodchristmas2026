<script lang="ts">
	import { SERVICES, EVENT_DATE, calendarUrl, type Service } from '#lib/services.js';

	let { invited = null }: { invited?: Service | null } = $props();
</script>

<section class="section services" id="services">
	<div class="container">
		<header class="head">
			<p class="eyebrow">Three services</p>
			<h2>Pick the hour that fits your night.</h2>
			<p class="lede">
				The 3:30 and 5:00 services are the same — carols and worship, with a short message. The
				11:00 is quieter, and ends by candlelight. Come to whichever one suits you.
			</p>
		</header>

		<ul class="grid">
			{#each SERVICES as service (service.id)}
				<li
					id="service-{service.id}"
					class={[
						'service',
						'card',
						`tone-${service.tone}`,
						{ 'is-invited': invited?.id === service.id }
					]}
				>
					{#if invited?.id === service.id}
						<p class="invited-flag">You were invited to this one</p>
					{/if}

					<p class="tag">{service.tag}</p>
					<p class="time">{service.time}</p>
					<h3>{service.name}</h3>
					<p class="blurb">{service.blurb}</p>

					<p class="best">
						<span>Good for</span>
						{service.bestFor}
					</p>

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
			{/each}
		</ul>

		<p class="footnote">
			All three are on {EVENT_DATE.long}, 2026. No ticket, no registration, no cost — just come.
		</p>
	</div>
</section>

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

	.service {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.6rem;
		position: relative;
		border-top: 4px solid var(--accent, var(--gold));
	}

	.tone-day {
		--accent: var(--gold);
	}
	.tone-evening {
		--accent: var(--berry);
	}
	.tone-night {
		--accent: var(--spruce);
	}

	.service.is-invited {
		box-shadow:
			var(--shadow-md),
			0 0 0 2px var(--accent);
	}

	.invited-flag {
		align-self: flex-start;
		padding: 0.2rem 0.7rem;
		border-radius: var(--radius-pill);
		background: var(--accent);
		color: #fff;
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.tag {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-faint);
	}

	.time {
		font-family: var(--font-display);
		font-size: clamp(2.25rem, 4vw, 2.9rem);
		font-weight: 600;
		letter-spacing: -0.03em;
		line-height: 1;
		color: var(--accent);
	}

	h3 {
		font-size: 1.25rem;
	}

	.blurb {
		color: var(--ink-soft);
		font-size: 0.975rem;
		line-height: 1.6;
	}

	.best {
		margin-top: auto;
		padding-top: 0.9rem;
		font-size: 0.875rem;
		color: var(--ink-soft);
		border-top: 1px solid var(--line);
		width: 100%;
	}

	.best span {
		display: block;
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-faint);
		margin-bottom: 0.2rem;
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
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
