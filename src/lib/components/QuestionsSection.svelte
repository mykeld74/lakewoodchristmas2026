<script lang="ts">
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
			a: 'About an hour. We know you likely have somewhere to be — dinner, people to see, or bed. We start on time and finish on time.'
		},
		{
			q: "What's the difference between the services?",
			a: 'The 3:30 and 5:00 are the same service: carols and worship, with a short message. The 11:00 is quieter and more reflective, and ends by candlelight as Christmas Day arrives.'
		},

		{
			q: 'What if church has hurt me before?',
			a: 'That is a real thing, and it is more common than most churches admit. You do not owe anyone an explanation for showing up, and you do not owe anyone a conversation on the way out. Come, sit in the back if you want, and let it be just an hour of music and candlelight.'
		},
		{
			q: 'Can I bring my kids?',
			a: 'Please do. Kids are welcome at all three services, and Christmas Eve is a forgiving night for noise and wiggling. If you have little ones, the earlier services are an easier ask; the 11:00 runs late and is better for older kids and adults.'
		},
		{
			q: 'Do I need to believe anything to come?',
			a: 'No. Belong before you believe — that is genuinely how we think about it. Plenty of people in the room on Christmas Eve are certain, plenty are not, and plenty have never thought about it much. Curiosity is reason enough to come.'
		}
	];
</script>

<section class="section questions" id="questions">
	<div class="container container-narrow">
		<header class="head">
			<p class="eyebrow">Straight answers</p>
			<h2>Questions, asked and answered plainly.</h2>
		</header>

		<ul class="faqs">
			{#each faqs as faq, i (faq.q)}
				<li>
					<details name="faq" open={i === 0}>
						<summary>
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
						</summary>
						<p>{faq.a}</p>
					</details>
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

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.1rem 0;
		cursor: pointer;
		list-style: none;
		font-family: var(--font-display);
		font-size: clamp(1.0625rem, 1.8vw, 1.1875rem);
		font-weight: 600;
		letter-spacing: -0.015em;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary svg {
		flex: none;
		color: var(--gold-deep);
		transition: transform 0.2s ease;
	}

	details[open] summary svg {
		transform: rotate(180deg);
	}

	details p {
		padding-bottom: 1.3rem;
		color: var(--ink-soft);
		font-size: 1rem;
		line-height: 1.7;
		max-width: 42rem;
	}
</style>
