<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Project } from '$lib/types/furniture';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import Image from '$lib/components/atoms/Image.svelte';
	import Container from '$lib/components/atoms/Container.svelte';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();

	const metadata = $derived(
		[project.category, project.location, String(project.specs.year)]
			.filter(Boolean)
			.join(' \u00b7 ')
	);
</script>

<header class="bg-bg-primary pt-24 md:pt-28">
	<Container>
		<nav aria-label="Breadcrumb" class="mb-8">
			<ol
				class="flex flex-wrap items-center gap-2 font-sans text-xs uppercase tracking-[0.12em] text-text-secondary"
			>
				<li>
					<a href="/en/" class="transition-colors hover:text-accent">{$_('nav.home')}</a>
				</li>
				<li aria-hidden="true">/</li>
				<li>
					<a href="/en/projects/" class="transition-colors hover:text-accent"
						>{$_('nav.projects')}</a
					>
				</li>
				<li aria-hidden="true">/</li>
				<li class="text-text-primary" aria-current="page">{project.title}</li>
			</ol>
		</nav>
	</Container>

	<div class="relative mx-auto max-w-[1440px] overflow-hidden border-y border-text-primary/10">
		<div class="aspect-[5/4] w-full overflow-hidden md:aspect-[21/9] md:max-h-[82vh]">
			<Image
				src={project.media.hero.src}
				alt={project.media.hero.alt}
				loading="eager"
				class="h-full w-full object-cover"
				overlay
			/>
		</div>

		<div
			class="absolute inset-0 bg-gradient-to-r from-bg-primary/78 via-bg-primary/32 to-bg-primary/10"
			aria-hidden="true"
		></div>

		<div class="absolute bottom-0 left-0 w-full px-6 pb-8 md:px-12 md:pb-14 lg:px-16 lg:pb-18">
			<div class="mx-auto max-w-[1440px] border-l border-text-primary/14 pl-6 md:pl-8">
				<Text variant="caption" class="mb-4 uppercase tracking-[0.16em] text-accent">
					{metadata}
				</Text>
				<Heading as="h1" variant="display" class="max-w-4xl text-5xl text-text-primary md:text-7xl">
					{project.title}
				</Heading>
			</div>
		</div>

		<div
			class="absolute bottom-0 right-0 hidden w-[min(520px,42vw)] grid-cols-3 divide-x divide-text-primary/10 border-l border-t border-text-primary/10 bg-bg-primary/34 backdrop-blur-[2px] md:grid"
		>
			<div class="p-4">
				<p class="font-sans text-[10px] uppercase tracking-[0.16em] text-text-secondary">Scope</p>
				<p class="mt-1 font-sans text-sm text-text-primary">{project.specs.scope}</p>
			</div>
			<div class="p-4">
				<p class="font-sans text-[10px] uppercase tracking-[0.16em] text-text-secondary">
					Materials
				</p>
				<p class="mt-1 truncate font-sans text-sm text-text-primary">{project.specs.materials}</p>
			</div>
			<div class="p-4">
				<p class="font-sans text-[10px] uppercase tracking-[0.16em] text-text-secondary">
					Timeline
				</p>
				<p class="mt-1 font-sans text-sm text-text-primary">{project.specs.timeline}</p>
			</div>
		</div>
	</div>
</header>
