<script lang="ts">
	import { onMount } from 'svelte';
	import { cx } from '$lib/utils/helpers';
	import Section from '$lib/components/atoms/Section.svelte';
	import Container from '$lib/components/atoms/Container.svelte';

	interface Item {
		id: string;
		name: string;
		tagline: string;
		image: string;
		category: string;
	}

	interface Props {
		items: Item[];
		title?: string;
		subtitle?: string;
		class?: string;
	}

	let {
		items,
		title = 'Materials in motion',
		subtitle = 'Scroll to explore surfaces, grains, and finishes.',
		class: className = ''
	}: Props = $props();

	let section = $state<HTMLElement | undefined>(undefined);
	let track = $state<HTMLElement | undefined>(undefined);
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

		const trackEl = track;
		const sectionEl = section;

		if (!prefersReducedMotion && !isMobile && trackEl && sectionEl) {
			import('gsap').then(({ gsap }) => {
				import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
					gsap.registerPlugin(ScrollTrigger);

					const totalWidth = trackEl.scrollWidth - window.innerWidth;

					ctx = gsap.context(() => {
						gsap.to(trackEl, {
							x: -totalWidth,
							ease: 'none',
							scrollTrigger: {
								trigger: sectionEl,
								start: 'top top',
								end: () => `+=${totalWidth}`,
								scrub: 1,
								pin: true,
								anticipatePin: 1,
								invalidateOnRefresh: true
							}
						});
					}, sectionEl);
				});
			});
		}

		return () => {
			mql.removeEventListener('change', handleChange);
			if (ctx) ctx.revert();
		};
	});
</script>

<Section
	bind:element={section}
	tone="secondary"
	container="none"
	spacing="none"
	class={cx('relative overflow-hidden', className)}
>
	<Container class="pb-8 pt-20 md:pb-12 md:pt-32 lg:pb-16 lg:pt-40">
		<div class="mb-10 max-w-xl md:mb-14">
			<h2 class="font-serif text-h2 tracking-tight leading-h2 text-text-primary text-balance">
				{title}
			</h2>
			<p class="mt-4 font-sans text-body-lg leading-body-lg text-text-secondary">
				{subtitle}
			</p>
		</div>
	</Container>

	<div
		bind:this={track}
		class="flex gap-4 pb-20 md:gap-6 lg:flex-nowrap lg:pl-[max(1.5rem,calc((100vw-1440px)/2+1.5rem))]"
		class:overflow-x-auto={isMobile}
		class:snap-x={isMobile}
		class:snap-mandatory={isMobile}
		class:scrollbar-hide={isMobile}
	>
		{#each items as item}
			<article
				class="group relative flex-shrink-0 snap-center snap-always lg:w-[min(70vw,900px)]"
				class:w-[85vw]={isMobile}
			>
				<div class="image-warm-overlay relative aspect-[16/10] overflow-hidden bg-bg-primary">
					<img
						src={item.image}
						alt=""
						loading="lazy"
						decoding="async"
						class="h-full w-full object-cover transition-transform duration-700 ease-image group-hover:scale-[1.03]"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-bg-primary/20 to-transparent"
					></div>
				</div>
				<div class="pointer-events-none absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10">
					<span
						class="mb-2 inline-block font-sans text-caption font-medium uppercase tracking-label text-accent"
					>
						{item.category}
					</span>
					<h3 class="font-serif text-h3 leading-h3 text-text-primary">
						{item.name}
					</h3>
					<p class="mt-2 max-w-md font-sans text-body leading-body text-text-secondary">
						{item.tagline}
					</p>
				</div>
			</article>
		{/each}
	</div>
</Section>

<style>
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.group img {
			transition: none;
		}
	}
</style>
