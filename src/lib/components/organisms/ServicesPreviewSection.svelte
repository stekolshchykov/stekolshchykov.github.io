<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { services as allServices } from '$lib/data/services';
	import type { Service } from '$lib/types/furniture';
	import Eyebrow from '$lib/components/atoms/Eyebrow.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import ServiceCard from '$lib/components/molecules/ServiceCard.svelte';
	import MagneticCard from '$lib/components/molecules/MagneticCard.svelte';
	import SplitTextReveal from '$lib/components/molecules/SplitTextReveal.svelte';

	interface Props {
		services?: Service[];
	}

	let { services = allServices }: Props = $props();
	let section: HTMLElement;

	const residential = $derived(services.find((s) => s.category === 'residential'));
	const commercial = $derived(services.find((s) => s.category === 'commercial'));
	const secondary = $derived(
		services.filter((s) => s !== residential && s !== commercial).slice(0, 6)
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

<section bind:this={section} class="bg-bg-secondary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<div
			class="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end"
		>
			<div class="services-fade max-w-2xl">
				<Eyebrow text={$_('home.services_eyebrow')} class="mb-4" />
				<Heading as="h2" variant="serif" class="text-3xl text-text-primary md:text-4xl lg:text-5xl">
					<SplitTextReveal as="span" text={$_('home.services_headline')} />
				</Heading>
			</div>
			<div class="services-fade">
				<Button variant="ghost" href="/en/services/">
					{$_('home.services_cta')}
				</Button>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
			{#if residential}
				<div class="services-fade">
					<MagneticCard intensity={0.12}>
						<ServiceCard
							service={residential}
							variant="featured"
							href="/en/services/{residential.id}/"
						/>
					</MagneticCard>
				</div>
			{/if}
			{#if commercial}
				<div class="services-fade">
					<MagneticCard intensity={0.12}>
						<ServiceCard
							service={commercial}
							variant="featured"
							href="/en/services/{commercial.id}/"
						/>
					</MagneticCard>
				</div>
			{/if}
		</div>

		{#if secondary.length}
			<div class="services-fade mt-12 border-t border-text-primary/10 pt-8 md:mt-16">
				<p
					class="mb-6 font-sans text-xs font-medium uppercase tracking-[0.2em] text-text-secondary"
				>
					{$_('home.services_cta')}
				</p>
				<div class="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each secondary as service}
						<a
							href="/en/services/{service.id}/"
							class="group flex items-center justify-between border-b border-text-primary/10 pb-4 font-sans text-text-primary transition-colors hover:text-accent"
						>
							<span>{service.title}</span>
							<span class="h-px w-0 bg-accent transition-all duration-300 group-hover:w-6"></span>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section>
