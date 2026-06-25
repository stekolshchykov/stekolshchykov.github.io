<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		text?: string;
		children?: Snippet;
	}

	let { class: className = '', text, children }: Props = $props();
</script>

<span
	class="inline-block font-sans text-label font-medium uppercase tracking-eyebrow leading-label text-accent {className}"
>
	{#if text}
		{text}
	{:else if children}
		{@render children()}
	{/if}
</span>
