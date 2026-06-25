<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { processSteps as allProcessSteps } from '$lib/data/processSteps';
	import type { ProcessStep as ProcessStepType } from '$lib/types/furniture';
	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
	import ProcessStep from '$lib/components/molecules/ProcessStep.svelte';

	interface Props {
		steps?: ProcessStepType[];
	}

	let { steps = allProcessSteps }: Props = $props();
	let section = $state<HTMLElement | undefined>(undefined);

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.process-fade',
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.15,
					ease: 'power3.out',
					scrollTrigger: { trigger: section, start: 'top 75%', immediateRender: false }
				}
			);
		}, section);

		return () => ctx.revert();
	});
</script>

<Section bind:element={section} tone="secondary">
	<SectionHeader
		eyebrow={$_('home.process_eyebrow')}
		headline={$_('home.process_headline')}
		size="large"
		class="process-fade"
	/>

	<div class="relative">
		<div
			class="absolute top-[3.5rem] left-0 right-0 hidden h-px bg-text-primary/10 md:block"
			aria-hidden="true"
		></div>
		<div class="flex flex-col gap-12 md:flex-row md:gap-4 lg:gap-8">
			{#each steps as step}
				<div class="process-fade relative flex-1">
					<ProcessStep number={step.number} title={step.title} description={step.description} />
				</div>
			{/each}
		</div>
	</div>
</Section>
