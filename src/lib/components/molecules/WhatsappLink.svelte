<script lang="ts">
	import type { Snippet } from 'svelte';
	import { WHATSAPP_NUMBER } from '$lib/utils/constants';
	import { sanitizePhone } from '$lib/utils/helpers';

	interface Props {
		message?: string;
		class?: string;
		children?: Snippet;
	}

	let { message = '', class: className = '', children }: Props = $props();

	const number = sanitizePhone(WHATSAPP_NUMBER);
	const href = $derived(
		`https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`
	);
</script>

<a {href} target="_blank" rel="noopener noreferrer" class={className}>
	{#if children}
		{@render children()}
	{/if}
</a>
