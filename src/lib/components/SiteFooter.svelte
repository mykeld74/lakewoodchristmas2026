<script lang="ts">
	import { CHURCH, EVENT_DATE, SERVICES } from '#lib/services.js';

	const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CHURCH.mapsQuery)}`;
</script>

<footer class="footer">
	<div class="container inner">
		<div class="brand">
			<p class="title">Christmas Eve<br />at Westwoods</p>
			<p class="sub">{EVENT_DATE.long}, 2026</p>
		</div>

		<div class="col">
			<p class="label">Services</p>
			<ul>
				{#each SERVICES as service (service.id)}
					<li><a href="#service-{service.id}">{service.time} — {service.name}</a></li>
				{/each}
			</ul>
		</div>

		<div class="col">
			<p class="label">Where</p>
			<p class="addr">
				<a class="church" href={CHURCH.website} target="_blank" rel="noopener noreferrer">
					{CHURCH.name}
				</a><br />
				{CHURCH.street}<br />
				{CHURCH.city}, {CHURCH.state}
				{CHURCH.zip}
			</p>
			<div class="links">
				<a class="link" href={mapsHref} target="_blank" rel="noopener noreferrer">Open in Maps</a>
				<a class="link" href={CHURCH.website} target="_blank" rel="noopener noreferrer">
					{CHURCH.websiteLabel}
				</a>
			</div>
		</div>
	</div>

	<div class="container bottom">
		<p>Everyone is welcome. Bring someone with you.</p>
		<a class="btn btn-ghost-light" href="#invite">Invite someone</a>
	</div>
</footer>

<style>
	.footer {
		background: var(--pine-deep);
		color: var(--cream);
		padding-block: clamp(3rem, 6vw, 4.5rem) 2rem;
	}

	.inner {
		display: grid;
		gap: 2.25rem;
		padding-bottom: 2.5rem;
		border-bottom: 1px solid var(--line-dark);
	}

	.title {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.15;
	}

	.sub {
		margin-top: 0.5rem;
		color: var(--gold-glow);
		font-size: 0.9375rem;
	}

	.label {
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--spruce-light);
		margin-bottom: 0.75rem;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	a {
		color: #ffffffcc;
		text-decoration: none;
		font-size: 0.9375rem;
	}

	a:hover {
		color: #fff;
	}

	.addr {
		color: #ffffffcc;
		font-size: 0.9375rem;
		line-height: 1.6;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1.25rem;
		margin-top: 0.7rem;
	}

	.link {
		display: inline-block;
		border-bottom: 1px solid #ffffff4d;
	}

	.church {
		color: var(--cream);
		font-weight: 600;
		border-bottom: 1px solid #ffffff40;
	}

	.church:hover {
		border-bottom-color: var(--gold);
	}

	.bottom {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-top: 2rem;
	}

	.bottom p {
		color: #ffffff99;
		font-size: 0.9375rem;
	}

	@media (min-width: 48rem) {
		.inner {
			grid-template-columns: 1.2fr 1fr 1fr;
			gap: 3rem;
		}
	}
</style>
