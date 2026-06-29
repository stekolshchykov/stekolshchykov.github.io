<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { services as allServices } from '$lib/data/services';
	import Button from '$lib/components/atoms/Button.svelte';
	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
	import MagneticCard from '$lib/components/molecules/MagneticCard.svelte';
	import SplitTextReveal from '$lib/components/molecules/SplitTextReveal.svelte';
	import { ArrowUpRight } from 'lucide-svelte';

	type PreviewService = (typeof allServices)[number];

	interface Props {
		services?: typeof allServices;
	}

	let { services = allServices }: Props = $props();
	let section = $state<HTMLElement | undefined>(undefined);

	const preview = $derived(
		[
			services.find((s) => s.id === 'kitchens'),
			services.find((s) => s.id === 'wardrobes-dressing-rooms'),
			{
				...services.find((s) => s.id === 'living-rooms-media-walls')!,
				title: 'Fitted Furniture',
				description:
					'Bathroom furniture, utility units, storage, wall units and considered fitted pieces.'
			},
			services.find((s) => s.id === 'commercial-trade-packages')
		].filter((service): service is PreviewService => Boolean(service))
	);

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.services-fade',
				{ y: 48, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.12,
					ease: 'power3.out',
					scrollTrigger: { trigger: section, start: 'top 75%', immediateRender: false }
				}
			);
		}, section);

		return () => ctx.revert();
	});
</script>

<Section bind:element={section} tone="secondary">
	<SectionHeader eyebrow={$_('home.services_eyebrow')} align="between" class="services-fade">
		<h2 class="font-serif text-3xl text-text-primary md:text-4xl lg:text-5xl">
			<SplitTextReveal as="span" text={$_('home.services_headline')} />
		</h2>
		{#snippet actions()}
			<div class="services-fade">
				<Button variant="ghost" href="/en/services/">
					{$_('home.services_cta')}
				</Button>
			</div>
		{/snippet}
	</SectionHeader>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 md:gap-6">
		{#each preview as service}
			<div class="services-fade">
				<MagneticCard intensity={0.12}>
					<a
						href={service.id === 'commercial-trade-packages' ? '/en/trade/' : '/en/services/'}
						class="luxury-corners group relative grid min-h-[460px] overflow-hidden border border-text-primary/8 bg-bg-secondary transition-all duration-500 hover:-translate-y-1 hover:border-accent/45"
					>
						<div class="luxury-surface image-warm-overlay relative aspect-[4/3] overflow-hidden bg-bg-primary">
							<img
								src={service.image.src}
								alt={service.image.alt}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
							/>
						</div>
						<div class="grid content-between gap-8 p-6">
							<div>
								<p class="mb-3 font-sans text-[11px] uppercase tracking-[0.16em] text-accent">
									{service.id === 'commercial-trade-packages' ? 'Trade' : 'Residential'}
								</p>
								<h3 class="mb-3 font-serif text-2xl leading-tight text-text-primary">
									{service.title}
								</h3>
								<p class="font-sans text-sm leading-relaxed text-text-secondary">
									{service.description}
								</p>
							</div>
							<span class="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-text-primary transition-colors group-hover:text-accent">
								{service.id === 'commercial-trade-packages' ? 'View Trade' : 'View Services'}
								<ArrowUpRight class="h-3.5 w-3.5" />
							</span>
						</div>
					</a>
				</MagneticCard>
			</div>
		{/each}
	</div>
</Section>
