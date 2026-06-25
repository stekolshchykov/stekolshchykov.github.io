<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cx } from '$lib/utils/helpers';
	import Container from '$lib/components/atoms/Container.svelte';

	interface Props {
		tone?: 'primary' | 'secondary';
		spacing?: 'none' | 'default' | 'compact';
		border?: 'none' | 'top' | 'bottom' | 'y';
		container?: 'wide' | 'content' | 'narrow' | 'none';
		align?: 'left' | 'center';
		class?: string;
		containerClass?: string;
		element?: HTMLElement;
		children: Snippet;
	}

	let {
		tone = 'primary',
		spacing = 'default',
		border = 'none',
		container = 'wide',
		align = 'left',
		class: className = '',
		containerClass = '',
		element = $bindable(),
		children
	}: Props = $props();

	const toneClasses = {
		primary: 'bg-bg-primary',
		secondary: 'bg-bg-secondary'
	};

	const spacingClasses = {
		none: '',
		default: 'py-20 md:py-32 lg:py-40',
		compact: 'py-16 md:py-24 lg:py-32'
	};

	const borderClasses = {
		none: '',
		top: 'border-t border-text-primary/10',
		bottom: 'border-b border-text-primary/10',
		y: 'border-y border-text-primary/10'
	};
</script>

<section
	bind:this={element}
	class={cx(toneClasses[tone], spacingClasses[spacing], borderClasses[border], className)}
>
	{#if container === 'none'}
		{@render children()}
	{:else}
		<Container size={container} {align} class={containerClass}>
			{@render children()}
		</Container>
	{/if}
</section>
