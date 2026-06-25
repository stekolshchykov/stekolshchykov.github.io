<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cx } from '$lib/utils/helpers';
	import Eyebrow from '$lib/components/atoms/Eyebrow.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';

	interface Props {
		eyebrow?: string;
		headline?: string;
		statement?: string;
		align?: 'left' | 'center' | 'between';
		size?: 'default' | 'large';
		class?: string;
		actions?: Snippet;
		children?: Snippet;
	}

	let {
		eyebrow,
		headline,
		statement,
		align = 'left',
		size = 'default',
		class: className = '',
		actions,
		children
	}: Props = $props();

	const wrapperClasses = $derived(
		cx(
			'mb-12 gap-6 md:mb-16',
			align === 'between' && 'flex flex-col items-start justify-between md:flex-row md:items-end',
			align === 'center' && 'mx-auto max-w-3xl text-center',
			align === 'left' && 'max-w-2xl',
			className
		)
	);
</script>

<div class={wrapperClasses}>
	<div class={cx(align === 'between' && 'max-w-2xl')}>
		<div class="mb-5 flex items-center gap-3 text-accent" aria-hidden="true">
			<span class="h-px w-8 bg-accent/70"></span>
			<span class="h-1.5 w-1.5 rotate-45 border border-accent/70"></span>
			<span class="h-px w-4 bg-accent/35"></span>
		</div>
		{#if eyebrow}
			<Eyebrow text={eyebrow} class="mb-4" />
		{/if}
		{#if headline}
			<Heading
				as="h2"
				variant="serif"
				class={cx(
					'text-text-primary',
					size === 'large' ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-3xl md:text-4xl'
				)}
			>
				{headline}
			</Heading>
		{/if}
		{#if statement}
			<Text
				variant="body-lg"
				class={cx('mt-6 text-text-secondary', align !== 'center' && 'max-w-xl')}
			>
				{statement}
			</Text>
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
	{#if actions}
		<div>
			{@render actions()}
		</div>
	{/if}
</div>
