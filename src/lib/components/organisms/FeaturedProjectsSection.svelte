<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { Project } from '$lib/types/furniture';
	import Button from '$lib/components/atoms/Button.svelte';
	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
	import ProjectCard from '$lib/components/molecules/ProjectCard.svelte';
	import MagneticCard from '$lib/components/molecules/MagneticCard.svelte';
	import SplitTextReveal from '$lib/components/molecules/SplitTextReveal.svelte';

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();
	let section = $state<HTMLElement | undefined>(undefined);

	const featured = $derived(projects.filter((p) => p.featured).slice(0, 3));

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.projects-fade',
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

<Section bind:element={section} border="top" containerClass="pt-10 md:pt-14">
	<SectionHeader eyebrow={$_('home.projects_eyebrow')} align="between" class="projects-fade">
		<h2 class="font-serif text-3xl text-text-primary md:text-4xl lg:text-5xl">
			<SplitTextReveal as="span" text={$_('home.projects_headline')} />
		</h2>
		{#snippet actions()}
			<div class="projects-fade">
				<Button variant="ghost" href="/en/projects/">
					{$_('home.projects_cta')}
				</Button>
			</div>
		{/snippet}
	</SectionHeader>

	<div class="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
		{#each featured as project}
			<div class="projects-fade">
				<MagneticCard intensity={0.12}>
					<ProjectCard {project} featured={false} class="h-full" />
				</MagneticCard>
			</div>
		{/each}
	</div>
</Section>
