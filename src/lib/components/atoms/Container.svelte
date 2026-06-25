<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cx } from '$lib/utils/helpers';

	interface Props {
		size?: 'wide' | 'content' | 'narrow';
		align?: 'left' | 'center';
		class?: string;
		children: Snippet;
	}

	let { size = 'wide', align = 'left', class: className = '', children }: Props = $props();

	const sizeClasses = {
		wide: 'max-w-[1440px]',
		content: 'max-w-5xl',
		narrow: 'max-w-4xl'
	};
</script>

<div
	class={cx(
		'mx-auto w-full px-6 md:px-12 lg:px-16',
		sizeClasses[size],
		align === 'center' && 'text-center',
		className
	)}
>
	{@render children()}
</div>
