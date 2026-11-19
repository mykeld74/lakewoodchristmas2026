<script lang="ts">
	import '#lib/styles/app.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="icon" href="/favicon-96.png" sizes="96x96" type="image/png" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="mask-icon" href="/favicon.svg" color="#0b2019" />
</svelte:head>

{@render children()}
