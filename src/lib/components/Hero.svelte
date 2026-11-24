<script lang="ts">
	import { CHURCH, EVENT_DATE, SERVICES, type Service } from '#lib/services.js';

	let { invited = null }: { invited?: Service | null } = $props();
</script>

<section class="hero" id="top">
	<div class="container inner">
		<div class="copy">
			{#if invited}
				<p class="invited-banner">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M4 6.5h16v12H4z" />
						<path d="m4 7 8 6 8-6" />
					</svg>
					<span>
						You were invited to <strong>{invited.name}</strong> at
						<strong>{invited.timeRange}</strong>. Here is everything you'd want to know.
					</span>
				</p>
			{/if}

			<p class="eyebrow">{EVENT_DATE.weekday} &middot; {EVENT_DATE.long}, 2026</p>

			<h1>
				The Christmas we<br />
				<span class="underlined">actually need</span>
			</h1>

			<p class="tagline">
				This time of year &mdash; everyone is telling you what you need. Let's take an hour together
				to press into the Christmas we actually need.
			</p>

			<p class="lede">
				Celebrate Christmas Eve with familiar carols, candlelight and the hope that Jesus brings.
				Come with your family, friends, co-workers and classmates, or simply come on your own
				&mdash; we would love to celebrate with you!
			</p>

			<dl class="facts">
				<div>
					<dt>Where</dt>
					<dd>{CHURCH.name}<br /><span>{CHURCH.street}, {CHURCH.city}</span></dd>
				</div>
				<div>
					<dt>When</dt>
					<dd>
						{EVENT_DATE.long}<br /><span>
							3:30 &ndash; 4:30 &middot; 5:00 &ndash; 6:00 &middot; 11:00 &ndash; Midnight
						</span>
					</dd>
				</div>
			</dl>

			<div class="btn-row">
				<a class="btn btn-lg" href="#services">Pick a service</a>
				<a class="btn btn-lg btn-outline" href="#invite">Invite someone</a>
			</div>
		</div>

		<div class="art">
			<div class="night">
				<enhanced:img
					class="photo"
					src="../assets/hero-candle-child.jpg"
					alt="A child holding a lit candle, face glowing in the warm light"
					sizes="(min-width: 60rem) 40vw, 100vw"
					fetchpriority="high"
				/>
				<div class="shade" aria-hidden="true"></div>

				<div class="times">
					{#each SERVICES as service (service.id)}
						<a
							class={['time-chip', { 'is-invited': invited?.id === service.id }]}
							href="#service-{service.id}"
						>
							<span class="t">{service.timeRange}</span>
							<span class="n">{service.name}</span>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<svg class="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
		<path d="M0 44c180-30 360-30 540-6s360 30 540 6 300-30 360-36v72H0Z" fill="var(--sand)" />
	</svg>
</section>

<style>
	.hero {
		position: relative;
		background: var(--cream);
		padding-top: clamp(2.5rem, 6vw, 4.5rem);
		padding-bottom: clamp(5rem, 9vw, 7rem);
		overflow: hidden;
	}

	.inner {
		display: grid;
		gap: clamp(2.5rem, 5vw, 4rem);
		align-items: center;
	}

	.copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.1rem;
		min-width: 0;
	}

	.invited-banner {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		padding: 0.7rem 1.1rem;
		border-radius: var(--radius-pill);
		background: color-mix(in srgb, var(--gold-glow) 55%, var(--paper));
		border: 1px solid var(--line-strong);
		color: var(--ink-soft);
		font-size: 0.9375rem;
		line-height: 1.45;
	}

	.invited-banner svg {
		flex: none;
		margin-top: 0.2rem;
		color: var(--gold-deep);
	}

	.invited-banner strong {
		color: var(--ink);
	}

	h1 {
		margin: 0;
		/* Sized so each line holds together at every width rather than orphaning a word. */
		font-size: clamp(2.35rem, 5.6vw, 4.25rem);
		/* Creates the stacking context the underline sits inside; without it the
		   rule's negative z-index would fall behind the hero background. */
		position: relative;
		z-index: 0;
	}

	.underlined {
		position: relative;
		display: inline-block;
	}

	.underlined::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0.03em;
		height: 0.09em;
		border-radius: 999px;
		background: var(--berry);
		opacity: 0.85;
		/* behind the glyphs, so descenders cross over the rule */
		z-index: -1;
	}

	.tagline {
		font-size: clamp(1.125rem, 2.2vw, 1.4rem);
		font-weight: 600;
		letter-spacing: -0.015em;
		color: var(--spruce);
	}

	.facts {
		display: grid;
		gap: 1.25rem 2.5rem;
		margin: 0.35rem 0 0.5rem;
		grid-template-columns: repeat(auto-fit, minmax(13rem, auto));
		justify-content: start;
	}

	.facts div {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	dt {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--gold-deep);
	}

	dd {
		margin: 0;
		font-weight: 600;
		line-height: 1.45;
	}

	dd span {
		font-weight: 400;
		color: var(--ink-soft);
	}

	.art {
		justify-self: stretch;
		min-width: 0;
	}

	.night {
		position: relative;
		border-radius: var(--radius-lg);
		background: linear-gradient(170deg, var(--pine) 0%, var(--pine-deep) 100%);
		box-shadow: var(--shadow-lg);
		overflow: hidden;
		/* Tall enough that the candle sits clearly above the time chips — mobile and desktop. */
		aspect-ratio: 3 / 4;
		min-height: clamp(32rem, 92vw, 40rem);
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.night :global(picture.photo),
	.night :global(img.photo) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.night :global(.photo img),
	.night :global(img.photo) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* Keep face + flame in the open space above the chips */
		object-position: 50% 12%;
	}

	/* Darkens only the lower band so chips stay readable; candle area stays clear. */
	.shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			transparent 42%,
			color-mix(in srgb, var(--pine-deep) 45%, transparent) 68%,
			color-mix(in srgb, var(--pine-deep) 92%, transparent) 100%
		);
	}

	.times {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: clamp(1.1rem, 2.5vw, 1.5rem);
	}

	.time-chip {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		column-gap: 0.8rem;
		row-gap: 0.1rem;
		padding: 0.7rem 1rem;
		border-radius: var(--radius);
		border: 1px solid var(--line-dark);
		background: color-mix(in srgb, var(--pine-deep) 55%, transparent);
		backdrop-filter: blur(6px);
		color: var(--cream);
		text-decoration: none;
		transition:
			background-color 0.16s,
			border-color 0.16s;
	}

	.time-chip:hover {
		background: color-mix(in srgb, var(--pine-deep) 40%, transparent);
		border-color: #ffffff5c;
	}

	.time-chip.is-invited {
		background: color-mix(in srgb, var(--gold) 30%, var(--pine-deep));
		border-color: var(--gold);
	}

	.time-chip .t {
		font-family: var(--font-display);
		font-size: 1.2rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--gold-glow);
	}

	.time-chip .n {
		font-size: 0.9375rem;
		color: #ffffffcc;
	}

	.wave {
		position: absolute;
		left: 0;
		right: 0;
		bottom: -1px;
		width: 100%;
		height: clamp(2.5rem, 5vw, 5rem);
	}

	@media (min-width: 60rem) {
		.inner {
			grid-template-columns: 1.2fr 0.8fr;
		}
	}
</style>
