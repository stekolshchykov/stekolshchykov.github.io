<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'body' | 'body-lg' | 'editorial' | 'caption' | 'muted';
		class?: string;
		children: Snippet;
	}

	let { variant = 'body', class: className = '', children }: Props = $props();

	const variantClasses = {
		body: 'font-sans font-light text-body leading-body text-text-primary',
		'body-lg': 'font-sans font-light text-body-lg leading-body-lg text-text-primary',
		editorial: 'font-serif font-light text-body-lg leading-body-lg text-text-secondary',
		caption:
			'font-sans text-caption font-medium uppercase tracking-label leading-label text-text-secondary',
		muted: 'font-sans text-sm leading-relaxed text-text-secondary'
	};

	const tag = $derived(
		variant === 'body' || variant === 'body-lg' || variant === 'editorial' ? 'p' : 'span'
	);
</script>

<svelte:element this={tag} class="{variantClasses[variant]} {className}">
	{@render children()}
</svelte:element>
