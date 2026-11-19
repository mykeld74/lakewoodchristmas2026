<script lang="ts">
	let open = $state(false);

	const links = [
		{ href: '#services', label: 'The services' },
		{ href: '#invitation', label: 'You are invited' },
		{ href: '#visit', label: 'Plan your visit' },
		{ href: '#questions', label: 'Questions' }
	];

	function close() {
		open = false;
	}
</script>

<header class="site-header">
	<div class="container bar">
		<a class="wordmark" href="#top" onclick={close}>
			<svg
				class="mark"
				width="26"
				height="26"
				viewBox="0 0 24 24"
				fill="none"
				aria-hidden="true"
			>
				<path
					d="M12 3.5c1.9 2.2 2.9 4 2.9 5.6a2.9 2.9 0 0 1-5.8 0C9.1 7.5 10.1 5.7 12 3.5Z"
					fill="var(--gold)"
				/>
				<path
					d="M12 6.8c.9 1.1 1.3 1.9 1.3 2.6a1.3 1.3 0 0 1-2.6 0c0-.7.4-1.5 1.3-2.6Z"
					fill="var(--gold-glow)"
				/>
				<path
					d="M9.6 12.4h4.8v6.9a1.6 1.6 0 0 1-1.6 1.6h-1.6a1.6 1.6 0 0 1-1.6-1.6v-6.9Z"
					fill="var(--spruce)"
				/>
			</svg>
			<span>Christmas Eve <em>at Westwoods</em></span>
		</a>

		<nav class="desktop-nav" aria-label="Primary">
			{#each links as link (link.href)}
				<a href={link.href}>{link.label}</a>
			{/each}
		</nav>

		<a class="btn invite-cta" href="#invite">Invite someone</a>

		<button
			class="menu-toggle"
			type="button"
			aria-expanded={open}
			aria-controls="mobile-nav"
			onclick={() => (open = !open)}
		>
			<span class="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
				{#if open}
					<path d="M6 6l12 12M18 6L6 18" />
				{:else}
					<path d="M4 7h16M4 12h16M4 17h16" />
				{/if}
			</svg>
		</button>
	</div>

	{#if open}
		<nav id="mobile-nav" class="mobile-nav" aria-label="Primary">
			<div class="container">
				{#each links as link (link.href)}
					<a href={link.href} onclick={close}>{link.label}</a>
				{/each}
				<a class="btn" href="#invite" onclick={close}>Invite someone</a>
			</div>
		</nav>
	{/if}
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: color-mix(in srgb, var(--cream) 88%, transparent);
		backdrop-filter: saturate(1.4) blur(12px);
		border-bottom: 1px solid var(--line);
	}

	.bar {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		min-height: 4rem;
	}

	.wordmark {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--font-display);
		font-size: 1.0625rem;
		font-weight: 600;
		letter-spacing: -0.015em;
		text-decoration: none;
		margin-right: auto;
		white-space: nowrap;
	}

	.wordmark em {
		font-style: normal;
		color: var(--ink-soft);
		font-weight: 400;
	}

	.mark {
		flex: none;
	}

	.desktop-nav {
		display: none;
		gap: 1.5rem;
	}

	.desktop-nav a {
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--ink-soft);
		text-decoration: none;
		transition: color 0.15s;
	}

	.desktop-nav a:hover {
		color: var(--ink);
	}

	.invite-cta {
		display: none;
		padding: 0.6rem 1.2rem;
		font-size: 0.9375rem;
	}

	.menu-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.6rem;
		height: 2.6rem;
		border: 1.5px solid var(--line-strong);
		border-radius: var(--radius-pill);
		background: transparent;
		color: var(--ink);
		cursor: pointer;
	}

	.mobile-nav {
		border-top: 1px solid var(--line);
		background: var(--cream);
		padding-block: 1rem 1.4rem;
	}

	.mobile-nav :global(.container) {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.mobile-nav a:not(.btn) {
		padding: 0.7rem 0;
		font-size: 1.0625rem;
		font-weight: 500;
		text-decoration: none;
		border-bottom: 1px solid var(--line);
	}

	.mobile-nav .btn {
		margin-top: 0.9rem;
	}

	@media (min-width: 62rem) {
		.desktop-nav,
		.invite-cta {
			display: inline-flex;
		}
		.menu-toggle {
			display: none;
		}
	}
</style>
