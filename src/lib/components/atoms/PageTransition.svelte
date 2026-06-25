<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { fade } from 'svelte/transition';

	let active = $state(false);

	onMount(() => {
		if (!browser) return;

		beforeNavigate(() => {
			active = true;
		});

		afterNavigate(() => {
			active = false;
		});
	});
</script>

{#if active}
	<div
		class="fixed inset-0 z-50 bg-bg-primary"
		aria-hidden="true"
		in:fade={{ duration: 350 }}
		out:fade={{ duration: 500 }}
	></div>
{/if}
