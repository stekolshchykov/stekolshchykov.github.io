<script lang="ts">
	import { onMount } from 'svelte';
	import { cx } from '$lib/utils/helpers';
	import Section from '$lib/components/atoms/Section.svelte';
	import Eyebrow from '$lib/components/atoms/Eyebrow.svelte';
	import Text from '$lib/components/atoms/Text.svelte';

	interface Item {
		id: string;
		number: number;
		title: string;
		subtitle: string;
		description: string;
		craftNote: string;
		image: string;
		duration: string;
	}

	interface Props {
		items: Item[];
		eyebrow?: string;
		class?: string;
	}

	let { items, eyebrow, class: className = '' }: Props = $props();

	let section = $state<HTMLElement | undefined>(undefined);
	let activeIndex = $state(0);
	let isMobile = $state(false);

	onMount(() => {
		const mql = window.matchMedia('(max-width: 1023px)');
		isMobile = mql.matches;

		const handleChange = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
		};
		mql.addEventListener('change', handleChange);

		let ctx: { revert: () => void } | null = null;
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!prefersReducedMotion && !isMobile) {
			import('gsap').then(({ gsap }) => {
				import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
					gsap.registerPlugin(ScrollTrigger);

					if (!section) return;
					const panels = section.querySelectorAll('[data-narrative-panel]');
					const pinned = section.querySelector('[data-narrative-pinned]');

					ctx = gsap.context(() => {
						panels.forEach((panel, index) => {
							ScrollTrigger.create({
								trigger: panel,
								start: 'top center',
								end: 'bottom center',
								onEnter: () => (activeIndex = index),
								onEnterBack: () => (activeIndex = index)
							});
						});

						if (pinned) {
							ScrollTrigger.create({
								trigger: section,
								start: 'top top',
								end: 'bottom bottom',
								pin: pinned,
								pinSpacing: false
							});
						}
					}, section);
				});
			});
		}

		return () => {
			mql.removeEventListener('change', handleChange);
			if (ctx) ctx.revert();
		};
	});
</script>

<Section bind:element={section} class={cx('relative', className)}>
	{#if eyebrow}
		<div class="mb-12 md:mb-16 lg:mb-20">
			<Eyebrow text={eyebrow} />
		</div>
	{/if}

	<div class="relative lg:grid lg:grid-cols-2 lg:gap-16">
		<div
			data-narrative-pinned
			class="mb-12 lg:mb-0 lg:h-screen lg:sticky lg:top-0 lg:flex lg:items-center"
		>
			<div class="pinned-stack max-w-xl">
				{#each items as item, i}
					<div
						class="pinned-slide transition-all duration-500 ease-ui {activeIndex === i
							? 'relative opacity-100'
							: 'absolute inset-0 opacity-0 lg:pointer-events-none'}"
						aria-hidden={activeIndex !== i}
					>
						<span class="mb-4 block font-serif text-5xl text-accent md:text-6xl lg:text-7xl">
							{item.number < 10 ? `0${item.number}` : item.number}
						</span>
						<h2
							class="mb-3 font-serif text-h2 tracking-tight leading-h2 text-text-primary text-balance"
						>
							{item.title}
						</h2>
						<p class="mb-6 font-sans text-body-lg leading-body-lg text-text-secondary">
							{item.subtitle}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="space-y-12 md:space-y-20 lg:space-y-32">
			{#each items as item, i}
				<div
					data-narrative-panel
					class="narrative-panel transition-opacity duration-500 ease-ui lg:min-h-screen lg:pt-[15vh]"
				>
					<div
						class="image-warm-overlay relative mb-6 aspect-[4/5] overflow-hidden bg-bg-secondary md:aspect-[3/4]"
					>
						<img
							src={item.image}
							alt=""
							loading={i === 0 ? 'eager' : 'lazy'}
							decoding="async"
							class="h-full w-full object-cover"
						/>
					</div>
					<div class="border-t border-border pt-6">
						<Text variant="body" class="mb-4 text-text-secondary">
							{item.description}
						</Text>
						<div class="flex flex-wrap items-center justify-between gap-4">
							<span
								class="font-sans text-caption font-medium uppercase tracking-label text-text-muted"
							>
								{item.duration}
							</span>
							<span class="font-sans text-caption font-medium uppercase tracking-label text-accent">
								{item.craftNote}
							</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>

<style>
	.pinned-stack {
		display: grid;
		grid-template-areas: 'stack';
	}

	.pinned-stack > .pinned-slide {
		grid-area: stack;
	}

	.pinned-stack > .pinned-slide.relative {
		position: relative;
		z-index: 1;
	}

	.pinned-stack > .pinned-slide.absolute {
		position: absolute;
		z-index: 0;
	}

	@media (max-width: 1023px) {
		.pinned-stack > .pinned-slide.absolute {
			position: relative;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.pinned-slide,
		.narrative-panel {
			transition: none;
		}
	}
</style>
