<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cx } from '$lib/utils/helpers';
	import { sectionReveal } from '$lib/actions/sectionReveal';

	interface Props {
		size?: 'wide' | 'content' | 'narrow';
		align?: 'left' | 'center';
		class?: string;
		reveal?: boolean;
		children: Snippet;
	}

	let {
		size = 'wide',
		align = 'left',
		class: className = '',
		reveal = false,
		children
	}: Props = $props();

	const sizeClasses = {
		wide: 'max-w-[1440px]',
		content: 'max-w-5xl',
		narrow: 'max-w-4xl'
	};
</script>

<div
	use:sectionReveal={{ enabled: reveal }}
	class={cx(
		'mx-auto w-full px-6 md:px-12 lg:px-16',
		sizeClasses[size],
		align === 'center' && 'text-center',
		className
	)}
>
	{@render children()}
</div>
