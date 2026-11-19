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
						You were invited to the <strong>{invited.time}</strong>
						{invited.id === '1100' ? 'candlelight service' : 'service'}. Here is everything you'd
						want to know.
					</span>
				</p>
			{/if}

			<p class="eyebrow">{EVENT_DATE.weekday} &middot; {EVENT_DATE.long}, 2026</p>

			<h1>
				Christmas Eve is<br />
				<span class="underlined">better together</span>
			</h1>

			<p class="tagline">Three services. One story. Everyone welcome.</p>

			<p class="lede">
				Carols and worship, a short message, and about an hour together before the rest of the night
				begins.
			</p>

			<dl class="facts">
				<div>
					<dt>Where</dt>
					<dd>{CHURCH.name}<br /><span>{CHURCH.street}, {CHURCH.city}</span></dd>
				</div>
				<div>
					<dt>When</dt>
					<dd>{EVENT_DATE.long}<br /><span>3:30 pm &middot; 5:00 pm &middot; 11:00 pm</span></dd>
				</div>
			</dl>

			<div class="btn-row">
				<a class="btn btn-lg" href="#services">Pick a service</a>
				<a class="btn btn-lg btn-outline" href="#invite">Invite someone</a>
			</div>
		</div>

		<div class="art" aria-hidden="true">
			<div class="night">
				<svg class="stars" viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice">
					<defs>
						<radialGradient id="glow" cx="50%" cy="40%" r="50%">
							<stop offset="0%" stop-color="var(--gold-glow)" stop-opacity="0.5" />
							<stop offset="55%" stop-color="var(--gold)" stop-opacity="0.12" />
							<stop offset="100%" stop-color="var(--gold)" stop-opacity="0" />
						</radialGradient>
					</defs>
					<rect width="400" height="520" fill="url(#glow)" />
					{#each [[38, 54, 1.5], [96, 28, 1], [150, 70, 1.2], [214, 40, 1], [286, 76, 1.6], [344, 36, 1.1], [62, 128, 1], [122, 162, 1.3], [258, 142, 1], [330, 120, 1.4], [24, 206, 1.2], [372, 196, 1], [88, 250, 1], [318, 268, 1.2], [46, 330, 1.1], [360, 352, 1.3], [140, 404, 1], [268, 430, 1.2], [70, 452, 1], [206, 476, 1.1]] as [cx, cy, r] (cx + '-' + cy)}
						<circle {cx} {cy} {r} fill="var(--gold-glow)" opacity="0.75" />
					{/each}
					<g transform="translate(200 212) scale(1.75)">
						<path
							d="M0-34C7-20 11-12 11-5a11 11 0 0 1-22 0c0-7 4-15 11-29Z"
							fill="var(--gold)"
							opacity="0.95"
						/>
						<path d="M0-18c4 7 6 11 6 15a6 6 0 0 1-12 0c0-4 2-8 6-15Z" fill="var(--gold-glow)" />
					</g>
				</svg>

				<div class="times">
					{#each SERVICES as service (service.id)}
						<a
							class={['time-chip', { 'is-invited': invited?.id === service.id }]}
							href="#service-{service.id}"
						>
							<span class="t">{service.time}</span>
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
		min-height: clamp(20rem, 44vw, 30rem);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.stars {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
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
		gap: 0.7rem;
		padding: 0.7rem 1rem;
		border-radius: var(--radius);
		border: 1px solid var(--line-dark);
		background: #ffffff0f;
		color: var(--cream);
		text-decoration: none;
		transition:
			background-color 0.16s,
			border-color 0.16s;
	}

	.time-chip:hover {
		background: #ffffff1f;
		border-color: #ffffff5c;
	}

	.time-chip.is-invited {
		background: color-mix(in srgb, var(--gold) 22%, transparent);
		border-color: var(--gold);
	}

	.time-chip .t {
		font-family: var(--font-display);
		font-size: 1.3rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--gold-glow);
		min-width: 4.4rem;
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
