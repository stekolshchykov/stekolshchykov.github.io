<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { Project } from '$lib/types/furniture';
	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
	import ProjectCard from '$lib/components/molecules/ProjectCard.svelte';

	interface Props {
		currentSlug: string;
		projects: Project[];
	}

	let { currentSlug, projects }: Props = $props();
	let section = $state<HTMLElement | undefined>(undefined);

	const current = $derived(projects.find((p) => p.slug === currentSlug));
	const related = $derived(
		projects.filter((p) => p.slug !== currentSlug && p.category === current?.category).slice(0, 3)
	);

	onMount(() => {
		if (!section) return;
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.related-fade',
				{ y: 40, opacity: 0 },
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

{#if related.length > 0}
	<Section bind:element={section}>
		<SectionHeader
			eyebrow={$_('project_detail.related_eyebrow')}
			headline={$_('project_detail.related_headline')}
			class="related-fade"
		/>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each related as project}
				<div class="related-fade">
					<ProjectCard {project} />
				</div>
			{/each}
		</div>
	</Section>
{/if}
