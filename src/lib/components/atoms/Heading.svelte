<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		variant?: 'display' | 'serif' | 'sans' | 'label';
		class?: string;
		id?: string;
		reveal?: boolean;
		children: Snippet;
	}

	let {
		as: tag = 'h2',
		variant = 'sans',
		class: className = '',
		id,
		reveal = false,
		children
	}: Props = $props();

	const serifTagClasses = {
		h1: 'font-serif font-light text-display tracking-display leading-display',
		h2: 'font-serif font-normal text-h2 tracking-tight leading-h2',
		h3: 'font-serif font-normal text-h3 tracking-[-0.01em] leading-h3',
		h4: 'font-serif font-normal text-h4 leading-h4',
		h5: 'font-serif font-normal text-lg md:text-xl leading-snug',
		h6: 'font-serif font-normal text-base md:text-lg leading-snug'
	};

	const classes = $derived.by(() => {
		switch (variant) {
			case 'display':
				return `font-serif font-light text-display tracking-display leading-display text-text-primary text-balance ${className}`;
			case 'serif':
				return `${serifTagClasses[tag]} text-text-primary text-balance ${className}`;
			case 'label':
				return `font-sans text-label font-medium uppercase tracking-label leading-label text-text-secondary ${className}`;
			default:
				return `font-sans font-medium text-text-primary ${className}`;
		}
	});
</script>

{#if reveal}
	<div class="overflow-hidden">
		<svelte:element this={tag} {id} class={classes}>
			{@render children()}
		</svelte:element>
	</div>
{:else}
	<svelte:element this={tag} {id} class={classes}>
		{@render children()}
	</svelte:element>
{/if}
