<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { Project } from '$lib/types/furniture';
	import Eyebrow from '$lib/components/atoms/Eyebrow.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import ProjectCard from '$lib/components/molecules/ProjectCard.svelte';
	import MagneticCard from '$lib/components/molecules/MagneticCard.svelte';
	import SplitTextReveal from '$lib/components/molecules/SplitTextReveal.svelte';

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();
	let section: HTMLElement;

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

<section bind:this={section} class="bg-bg-primary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<div class="border-t border-text-primary/10 pt-10 md:pt-14">
			<div
				class="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end"
			>
				<div class="projects-fade max-w-2xl">
					<Eyebrow text={$_('home.projects_eyebrow')} class="mb-4" />
					<Heading
						as="h2"
						variant="serif"
						class="text-3xl text-text-primary md:text-4xl lg:text-5xl"
					>
						<SplitTextReveal as="span" text={$_('home.projects_headline')} />
					</Heading>
				</div>
				<div class="projects-fade">
					<Button variant="ghost" href="/en/projects/">
						{$_('home.projects_cta')}
					</Button>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
			{#each featured as project}
				<div class="projects-fade">
					<MagneticCard intensity={0.12}>
						<ProjectCard {project} featured={false} class="h-full" />
					</MagneticCard>
				</div>
			{/each}
		</div>
	</div>
</section>
