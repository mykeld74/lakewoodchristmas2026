<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import { slide, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	const faqs = [
		{
			q: 'Is it free?',
			a: 'Yes. There is no ticket, no registration, and no cost. Nobody is going to single you out or ask you for anything.'
		},
		{
			q: 'What should I wear?',
			a: "We're a casual church — jeans and a t-shirt are just fine. If you'd rather dress up for Christmas Eve, that's great too. Both are completely normal here."
		},
		{
			q: 'How long is it?',
			a: 'About an hour: 3:30 – 4:30, 5:00 – 6:00, and 11:00 – Midnight. We know you likely have somewhere to be — dinner, people to see, or bed. We start on time and finish on time.'
		},
		{
			q: "What's the difference between the services?",
			a: 'The 3:30 and 5:00 are identical casual, relational services with kids elements — Christmas music, kids singing, a short moment just for the kids, candlelight, and a message of hope. The 11:00 is Acoustic Christmas Eve: Christmas music, a message, and communion, flowing into Midnight as Christmas Day arrives.'
		},

		{
			q: 'What if church has hurt me before?',
			a: 'That is a real thing, and it is more common than most churches admit. You do not owe anyone an explanation for showing up, and you do not owe anyone a conversation on the way out. Come, sit in the back if you want, and let it be just an hour of music and hope.'
		},
		{
			q: 'Can I bring my kids?',
			a: 'Please do. Kids are welcome at all three services, and Christmas Eve is a forgiving night for noise and wiggling — kids in the room, noise in the room is life in the room! There will be specific kid-targeted activities at the 3:30 and 5:00 services.'
		},
		{
			q: 'Do I need to believe anything to come?',
			a: 'No. Belong before you believe — that is genuinely how we think about it. Plenty of people in the room on Christmas Eve are certain, plenty are not, and plenty have never thought about it much. Curiosity is reason enough to come.'
		}
	];

	// Exclusive accordion: only one open at a time. First item starts open.
	let openIndex = $state<number | null>(0);

	const toggle = (i: number) => {
		openIndex = openIndex === i ? null : i;
	};

	const slideDuration = $derived(prefersReducedMotion.current ? 0 : 300);
	const fadeDuration = $derived(prefersReducedMotion.current ? 0 : 220);
</script>

<section class="section questions" id="questions">
	<div class="container container-narrow">
		<header class="head">
			<p class="eyebrow">Straight answers</p>
			<h2>Questions, asked and answered plainly.</h2>
		</header>

		<ul class="faqs">
			{#each faqs as faq, i (faq.q)}
				{@const isOpen = openIndex === i}
				<li class={{ open: isOpen }}>
					<h3 class="faq-heading">
						<button
							type="button"
							id="faq-trigger-{i}"
							aria-expanded={isOpen}
							aria-controls="faq-panel-{i}"
							onclick={() => toggle(i)}
						>
							<span>{faq.q}</span>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								aria-hidden="true"
							>
								<path d="M5 9l7 7 7-7" />
							</svg>
						</button>
					</h3>
					{#if isOpen}
						<div
							class="panel"
							id="faq-panel-{i}"
							role="region"
							aria-labelledby="faq-trigger-{i}"
							transition:slide={{ duration: slideDuration, easing: cubicOut }}
						>
							<p transition:fade={{ duration: fadeDuration, easing: cubicOut }}>{faq.a}</p>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.questions {
		background: var(--cream);
	}

	.head {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		margin-bottom: clamp(1.75rem, 3.5vw, 2.5rem);
	}

	.faqs {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--line);
	}

	.faqs li {
		border-bottom: 1px solid var(--line);
	}

	.faq-heading {
		margin: 0;
		font: inherit;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		width: 100%;
		padding: 1.1rem 0;
		border: 0;
		background: none;
		color: inherit;
		text-align: left;
		cursor: pointer;
		font-family: var(--font-display);
		font-size: clamp(1.0625rem, 1.8vw, 1.1875rem);
		font-weight: 600;
		letter-spacing: -0.015em;
		line-height: inherit;
	}

	button:focus-visible {
		outline: 2px solid var(--gold-deep);
		outline-offset: 2px;
	}

	button svg {
		flex: none;
		color: var(--gold-deep);
		transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	.open button svg {
		transform: rotate(180deg);
	}

	@media (prefers-reduced-motion: reduce) {
		button svg {
			transition: none;
		}
	}

	.panel p {
		padding-bottom: 1.3rem;
		color: var(--ink-soft);
		font-size: 1rem;
		line-height: 1.7;
		max-width: 42rem;
	}
</style>
