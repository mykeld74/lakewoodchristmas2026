<section class="section invitation" id="invitation">
	<div class="container container-narrow">
		<p class="eyebrow">An open invitation</p>

		<h2>
			You are invited.<br />
			You are welcome.<br />
			<span class="warm">There is a place for you.</span>
		</h2>

		<div class="body">
			<p>
				Maybe Christmas Eve at church is a tradition you have kept your whole life. Maybe it is
				something you did as a kid and have not done since. Maybe you have never been, and the idea
				makes you a little curious and a little wary at the same time.
			</p>
			<p>
				All of that is welcome here &mdash; there's a place for you. Come as you are, and we think
				you will be amazed at the love and hope you'll find.
			</p>
			<p class="closer">We would love to celebrate with you.</p>
		</div>
	</div>
</section>

<style>
	.invitation {
		background: var(--cream);
		text-align: center;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	h2 {
		margin: 0;
	}

	.warm {
		color: var(--berry);
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		max-width: 38rem;
		margin-top: 0.75rem;
		color: var(--ink-soft);
		font-size: clamp(1rem, 1.6vw, 1.125rem);
		line-height: 1.7;
	}

	.closer {
		font-family: var(--font-display);
		font-size: clamp(1.1rem, 2vw, 1.35rem);
		color: var(--ink);
		margin-top: 0.4rem;
	}
</style>
