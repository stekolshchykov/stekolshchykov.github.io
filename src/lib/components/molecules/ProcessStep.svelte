<script lang="ts">
	import { cx } from '$lib/utils/helpers';

	interface Props {
		number: number;
		title: string;
		description: string;
		showConnector?: boolean;
		layout?: 'vertical' | 'horizontal';
		class?: string;
	}

	let {
		number,
		title,
		description,
		showConnector = false,
		layout = 'vertical',
		class: className = ''
	}: Props = $props();
</script>

{#if layout === 'horizontal'}
	<div class={cx('relative text-left', className)}>
		<span
			class="pointer-events-none block font-serif text-7xl leading-none text-text-secondary/10 md:text-8xl lg:text-9xl"
			aria-hidden="true"
		>
			{number}
		</span>
		<h3 class="relative z-10 -mt-4 mb-2 font-serif text-xl text-text-primary md:text-2xl">
			{title}
		</h3>
		<p
			class="relative z-10 font-sans text-sm leading-relaxed text-text-secondary line-clamp-2 md:line-clamp-1"
		>
			{description}
		</p>
	</div>
{:else}
	<div class={cx('relative pl-8 md:pl-12', className)}>
		{#if showConnector}
			<div class="absolute left-[11px] top-10 h-full w-px bg-white/10 md:left-[13px]"></div>
		{/if}

		<div
			class="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 md:h-7 md:w-7"
		>
			<span class="font-sans text-[10px] text-text-secondary">{number}</span>
		</div>

		<div class="relative">
			<span
				class="pointer-events-none absolute -left-2 -top-4 font-serif text-6xl leading-none text-text-secondary/10 md:text-7xl"
				aria-hidden="true"
			>
				{number}
			</span>
			<h3 class="relative z-10 mb-1 font-serif text-xl text-text-primary md:text-2xl">{title}</h3>
			<p class="relative z-10 max-w-[65ch] font-sans text-sm leading-relaxed text-text-secondary">
				{description}
			</p>
		</div>
	</div>
{/if}
