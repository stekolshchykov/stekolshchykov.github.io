<script lang="ts">
	import type { Service } from '$lib/types/furniture';
	import { cx } from '$lib/utils/helpers';
	import { t } from 'svelte-i18n';

	interface Props {
		service: Service;
		variant?: 'stacked' | 'horizontal' | 'editorial' | 'featured';
		layout?: 'stacked' | 'editorial';
		reverse?: boolean;
		href?: string;
		class?: string;
	}

	let {
		service,
		variant = 'stacked',
		layout,
		reverse = false,
		href = '/contact/',
		class: className = ''
	}: Props = $props();

	const resolvedLayout = $derived(layout ?? (variant === 'horizontal' ? 'editorial' : variant));
</script>

{#if variant === 'featured'}
	<a
		{href}
		class={cx(
			'group relative block aspect-[4/5] overflow-hidden bg-bg-secondary transition-transform duration-500 ease-ui hover:-translate-y-1',
			className
		)}
		style="aspect-ratio: 4 / 5;"
	>
		<div class="image-warm-overlay absolute inset-0 overflow-hidden">
			<img
				src={service.image.src}
				alt={service.image.alt}
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-500 ease-image group-hover:scale-[1.02]"
			/>
		</div>
		<div
			class="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent opacity-80 transition-opacity duration-500 ease-ui group-hover:opacity-90"
		></div>

		<div
			class="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-transform duration-500 ease-ui group-hover:translate-y-0 md:p-8"
		>
			<p class="mb-2 font-sans text-[11px] uppercase tracking-[0.12em] text-text-secondary">
				{service.category}
			</p>
			<h3 class="mb-2 font-serif text-2xl text-text-primary md:text-3xl">{service.title}</h3>
			<p class="mb-4 max-w-md font-sans text-sm leading-relaxed text-text-secondary line-clamp-2">
				{service.description}
			</p>
			<span
				class="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-text-primary transition-colors group-hover:text-accent"
			>
				{$t('services.cta_button')}
				<span class="inline-block transition-transform duration-300 group-hover:translate-x-1"
					>→</span
				>
			</span>
		</div>
	</a>
{:else}
	<div
		class={cx(
			'group flex gap-6 md:gap-10 transition-transform duration-500 ease-ui hover:-translate-y-1',
			resolvedLayout === 'editorial'
				? cx('flex-col md:flex-row md:items-center', reverse && 'md:flex-row-reverse')
				: 'flex-col',
			className
		)}
	>
		{#if resolvedLayout === 'editorial'}
			<div
				class="image-warm-overlay relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/10] md:w-1/2"
				style="aspect-ratio: 4 / 3;"
			>
				<img
					src={service.image.src}
					alt={service.image.alt}
					loading="lazy"
					class="h-full w-full object-cover transition-transform duration-500 ease-image group-hover:scale-[1.02]"
				/>
			</div>
		{/if}

		<div class="flex flex-col gap-4 md:gap-5">
			<p class="font-sans text-[11px] uppercase tracking-[0.12em] text-text-secondary">
				{service.category}
			</p>
			<h3 class="font-serif text-2xl md:text-3xl text-text-primary">{service.title}</h3>

			<p class="max-w-[65ch] font-sans text-sm leading-relaxed text-text-secondary">
				{service.description}
			</p>

			<a
				{href}
				class="inline-flex items-center gap-2 self-start font-sans text-xs uppercase tracking-widest text-text-primary transition-colors hover:text-accent"
			>
				{$t('services.cta_button')}
				<span class="inline-block transition-transform duration-300 group-hover:translate-x-1"
					>→</span
				>
			</a>
		</div>
	</div>
{/if}
