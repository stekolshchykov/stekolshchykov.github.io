<script lang="ts">
	import { cx } from '$lib/utils/helpers';

	interface Props {
		quote: string;
		name: string;
		location: string;
		variant?: 'default' | 'large';
		class?: string;
	}

	let { quote, name, location, variant = 'default', class: className = '' }: Props = $props();
</script>

<article class={cx('relative flex flex-col gap-6', className)}>
	<span
		class="pointer-events-none -mb-6 font-serif leading-none text-text-secondary/15 {variant ===
		'large'
			? 'text-8xl md:text-[10rem]'
			: 'text-8xl md:text-9xl'}"
		aria-hidden="true"
	>
		“
	</span>
	<blockquote
		class="relative z-10 flex-1 font-serif leading-relaxed text-text-primary {variant === 'large'
			? 'text-2xl md:text-4xl'
			: 'text-xl md:text-2xl'}"
	>
		{quote}
	</blockquote>
	<div>
		<p class="font-sans text-xs uppercase tracking-[0.12em] text-text-primary">{name}</p>
		<p class="font-sans text-xs uppercase tracking-[0.12em] text-text-secondary">{location}</p>
	</div>
</article>
