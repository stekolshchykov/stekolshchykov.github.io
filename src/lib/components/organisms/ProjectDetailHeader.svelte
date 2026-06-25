<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Project } from '$lib/types/furniture';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import Image from '$lib/components/atoms/Image.svelte';

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

<header class="bg-bg-primary pt-28 md:pt-32">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<nav aria-label="Breadcrumb" class="mb-8">
			<ol class="flex items-center gap-2 font-sans text-sm text-text-secondary">
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
	</div>

	<div class="relative mx-auto max-w-[1440px]">
		<div class="aspect-[16/10] w-full overflow-hidden md:aspect-[21/9] md:max-h-[80vh]">
			<Image
				src={project.media.hero.src}
				alt={project.media.hero.alt}
				loading="eager"
				class="h-full w-full object-cover"
				overlay
			/>
		</div>

		<div class="absolute bottom-0 left-0 w-full px-6 pb-10 md:px-12 md:pb-16 lg:px-16 lg:pb-20">
			<div class="mx-auto max-w-[1440px]">
				<Text variant="caption" class="mb-3 text-stone">
					{metadata}
				</Text>
				<Heading as="h1" variant="display" class="max-w-4xl text-text-primary">
					{project.title}
				</Heading>
			</div>
		</div>
	</div>
</header>
