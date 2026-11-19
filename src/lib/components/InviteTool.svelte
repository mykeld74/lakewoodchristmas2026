<script lang="ts">
	import {
		SERVICES,
		inviteMessages,
		inviteUrl,
		prettyUrl,
		getService,
		type ServiceId
	} from '#lib/services';

	let { initial = null }: { initial?: ServiceId | null } = $props();

	// A writable $derived: it follows the `?service=` prop, and the picker can overwrite it.
	let selected: ServiceId | 'any' = $derived(initial ?? 'any');
	let status = $state('');
	/** The URL that was last copied; the badge shows while it still matches the current link. */
	let copiedUrl = $state('');

	const serviceId = $derived(selected === 'any' ? null : selected);
	const linkUrl = $derived(inviteUrl(serviceId, 'link'));
	const copied = $derived(copiedUrl !== '' && copiedUrl === linkUrl);
	const service = $derived(getService(serviceId) ?? null);
	const display = $derived(prettyUrl(serviceId));
	const messages = $derived(inviteMessages(service, 'link'));

	const smsHref = $derived(
		`sms:?&body=${encodeURIComponent(inviteMessages(service, 'text').sms)}`
	);
	const mailHref = $derived.by(() => {
		const m = inviteMessages(service, 'email');
		return `mailto:?subject=${encodeURIComponent(m.emailSubject)}&body=${encodeURIComponent(m.emailBody)}`;
	});
	const fbHref = $derived(
		`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteUrl(serviceId, 'facebook'))}`
	);
	const xHref = $derived.by(() => {
		const m = inviteMessages(service, 'x');
		return `https://twitter.com/intent/tweet?text=${encodeURIComponent(m.social)}&url=${encodeURIComponent(inviteUrl(serviceId, 'x'))}`;
	});

	const options = [
		{ value: 'any' as const, label: 'Let them choose', note: 'All three times' },
		...SERVICES.map((s) => ({
			value: s.id,
			label: s.time,
			note: s.id === '1100' ? 'Candlelight' : s.name.replace(' Service', '')
		}))
	];

	async function copyLink() {
		const url = linkUrl;
		try {
			await navigator.clipboard.writeText(url);
			copiedUrl = url;
			status = 'Link copied to your clipboard.';
			setTimeout(() => {
				if (copiedUrl === url) copiedUrl = '';
			}, 2400);
		} catch {
			status = `Couldn't copy automatically — the link is ${url}`;
		}
	}
</script>

<section class="section invite" id="invite">
	<div class="container">
		<div class="layout">
			<div class="copy">
				<p class="eyebrow">Invite someone</p>
				<h2>Most people come because a friend asked them.</h2>
				<p class="lede">
					Not a flyer. Not an ad. A person they trust saying “come with me.” Pick the service you
					want them at, and we'll write the message for you.
				</p>

				<fieldset class="picker">
					<legend>Which service are you inviting them to?</legend>
					<div class="options">
						{#each options as option (option.value)}
							<label class={['option', { 'is-on': selected === option.value }]}>
								<input
									type="radio"
									name="service"
									value={option.value}
									bind:group={selected}
								/>
								<span class="label">{option.label}</span>
								<span class="note">{option.note}</span>
							</label>
						{/each}
					</div>
				</fieldset>

				<div class="share">
					<div class="link-row">
						<span class="link-text" title={linkUrl}>{display}</span>
						<button type="button" class="btn copy" onclick={copyLink}>
							{#if copied}
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="m5 12.5 4.5 4.5L19 7.5" />
								</svg>
								Copied
							{:else}
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M9.5 9.5h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
									<path d="M15.5 6.5v-2a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2" />
								</svg>
								Copy link
							{/if}
						</button>
					</div>

					<p class="visually-hidden" role="status">{status}</p>

					<div class="btn-row">
						<a class="btn btn-outline" href={smsHref}>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M21 15.5a2 2 0 0 1-2 2H8l-4 3.5v-15a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z" />
								<path d="M8.5 9.5h7M8.5 13h4.5" />
							</svg>
							Text it
						</a>

						<a class="btn btn-outline" href={mailHref}>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<rect x="3" y="5" width="18" height="14" rx="2" />
								<path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
							</svg>
							Email it
						</a>

						<a class="btn btn-outline" href={fbHref} target="_blank" rel="noopener noreferrer">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M14 8.5V7c0-.7.3-1 1-1h1.5V3.5H14c-2.2 0-3.5 1.3-3.5 3.4v1.6H8.5V11h2v9.5H14V11h2.2l.4-2.5H14Z" />
							</svg>
							Facebook
						</a>

						<a class="btn btn-outline" href={xHref} target="_blank" rel="noopener noreferrer">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M17.5 3h2.9l-6.4 7.3L21.6 21h-5.9l-4.6-6-5.3 6H2.9l6.8-7.8L2.6 3h6l4.2 5.5L17.5 3Zm-1 16.2h1.6L8.1 4.7H6.3l10.2 14.5Z" />
							</svg>
							X
						</a>
					</div>

					<p class="fine">
						{#if service}
							Your link opens the page with the <strong>{service.time}</strong> service highlighted,
							so they land on exactly the one you meant.
						{:else}
							Your link opens the page with all three times laid out, so they can pick whichever
							one fits their night.
						{/if}
					</p>
				</div>
			</div>

			<aside class="preview" aria-label="Preview of your message">
				<div class="phone">
					<p class="bubble them">{messages.preview[0]}</p>
					<p class="bubble them">{messages.preview[1]}</p>
					<p class="bubble me">honestly… yeah, why not</p>
				</div>
				<p class="caption">
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M12 20s-7-4.5-7-9.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 7 2.5c0 5-7 9.5-7 9.5Z" />
					</svg>
					That's the whole thing. No pitch required.
				</p>
			</aside>
		</div>
	</div>
</section>

<style>
	.invite {
		background: var(--sand);
	}

	.layout {
		display: grid;
		gap: clamp(2.5rem, 5vw, 4rem);
		align-items: center;
	}

	.copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
	}

	/* Service picker */
	.picker {
		margin: 0.6rem 0 0;
		padding: 0;
		border: 0;
		width: 100%;
	}

	legend {
		padding: 0;
		margin-bottom: 0.7rem;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-faint);
	}

	.options {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(8.25rem, 1fr));
		gap: 0.6rem;
	}

	.option {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		padding: 0.75rem 1rem;
		border: 1.5px solid var(--line-strong);
		border-radius: var(--radius);
		background: var(--paper);
		cursor: pointer;
		transition:
			border-color 0.16s,
			background-color 0.16s,
			box-shadow 0.16s;
	}

	.option:hover {
		border-color: var(--ink-faint);
	}

	.option.is-on {
		border-color: var(--spruce);
		background: color-mix(in srgb, var(--spruce) 8%, var(--paper));
		box-shadow: inset 0 0 0 1px var(--spruce);
	}

	.option input {
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
	}

	.option:has(input:focus-visible) {
		outline: 3px solid var(--spruce);
		outline-offset: 3px;
	}

	.option .label {
		font-family: var(--font-display);
		font-size: 1.0625rem;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.option .note {
		font-size: 0.8125rem;
		color: var(--ink-soft);
	}

	.option.is-on .note {
		color: var(--spruce);
	}

	/* Share controls */
	.share {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		width: 100%;
		margin-top: 0.6rem;
	}

	.link-row {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		min-width: 0;
		max-width: 28rem;
		padding: 0.45rem 0.45rem 0.45rem 1.1rem;
		background: var(--paper);
		border: 1.5px solid var(--line-strong);
		border-radius: var(--radius-pill);
		box-shadow: var(--shadow-sm);
	}

	.link-text {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.9375rem;
		color: var(--ink-soft);
	}

	.copy {
		flex: none;
		padding: 0.55rem 1.1rem;
		font-size: 0.9375rem;
	}

	.btn-row .btn {
		padding: 0.6rem 1.15rem;
		font-size: 0.9375rem;
	}

	.fine {
		color: var(--ink-faint);
		font-size: 0.875rem;
		line-height: 1.6;
		max-width: 30rem;
	}

	.fine strong {
		color: var(--ink-soft);
	}

	/* Message preview */
	.preview {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	.phone {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: clamp(1.1rem, 2.5vw, 1.6rem);
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.bubble {
		max-width: 85%;
		padding: 0.7rem 1rem;
		border-radius: 1.15rem;
		font-size: 0.9375rem;
		line-height: 1.45;
	}

	.them {
		align-self: flex-start;
		background: var(--sand-deep);
		color: var(--ink);
		border-bottom-left-radius: 0.4rem;
	}

	.me {
		align-self: flex-end;
		background: var(--spruce);
		color: #fff;
		border-bottom-right-radius: 0.4rem;
	}

	.caption {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		color: var(--ink-faint);
		font-size: 0.875rem;
	}

	.caption svg {
		color: var(--berry);
		flex: none;
	}

	@media (min-width: 58rem) {
		.layout {
			grid-template-columns: 1.1fr 0.9fr;
		}
	}
</style>
