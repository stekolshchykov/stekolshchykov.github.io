<script lang="ts">
	import type { Project } from '$lib/types/furniture';
	import { cx } from '$lib/utils/helpers';
	import { t } from 'svelte-i18n';
	import { ArrowUpRight } from 'lucide-svelte';

	interface Props {
		project: Project;
		featured?: boolean;
		class?: string;
	}

	let { project, featured = false, class: className = '' }: Props = $props();
</script>

<a
	href="/en/projects/"
	class={cx(
		'group block overflow-hidden bg-bg-secondary',
		featured
			? 'luxury-corners relative aspect-[16/10] md:col-span-2'
			: 'luxury-corners border border-text-primary/10 transition-all duration-500 hover:-translate-y-1 hover:border-accent/45 hover:bg-bg-tertiary',
		className
	)}
	style={featured ? 'aspect-ratio: 16 / 10;' : undefined}
>
	{#if featured}
		<div class="luxury-surface image-warm-overlay absolute inset-0 overflow-hidden">
			<img
				src={project.media.hero.src}
				alt={project.media.hero.alt}
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-500 ease-image group-hover:scale-[1.05]"
			/>
		</div>
		<div
			class="absolute inset-0 bg-gradient-to-t from-bg-primary/86 via-bg-primary/24 to-transparent opacity-100 transition-opacity duration-500 ease-ui md:opacity-0 md:group-hover:opacity-100"
		></div>

		<div
			class="absolute inset-x-0 bottom-0 translate-y-0 p-5 transition-transform duration-500 ease-ui delay-100 md:translate-y-2 md:p-6 md:group-hover:translate-y-0"
		>
			<p class="mb-1 font-sans text-[11px] uppercase tracking-[0.12em] text-text-secondary">
				{project.category} / {project.specs.year}
			</p>
			<h3 class="font-serif text-2xl leading-tight text-text-primary md:text-4xl">
				{project.title}
			</h3>

			<span
				class="mt-3 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-text-primary opacity-100 transition-all duration-500 ease-ui group-hover:text-accent md:opacity-0 md:group-hover:opacity-100"
			>
				{$t('projects.view_project')}
				<ArrowUpRight class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
			</span>
		</div>
	{:else}
		<div class="luxury-surface image-warm-overlay aspect-[4/3] overflow-hidden bg-bg-primary">
			<img
				src={project.media.hero.src}
				alt={project.media.hero.alt}
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-500 ease-image group-hover:scale-[1.04]"
			/>
		</div>
		<div class="p-5 md:p-6">
			<p class="mb-2 font-sans text-[11px] uppercase tracking-[0.14em] text-text-secondary">
				{project.category} / {project.specs.year}
			</p>
			<h3 class="font-serif text-xl leading-tight text-text-primary md:text-2xl">
				{project.title}
			</h3>
			<span
				class="mt-5 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-text-primary transition-colors duration-300 group-hover:text-accent"
			>
				{$t('projects.view_project')}
				<ArrowUpRight class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
			</span>
		</div>
	{/if}
</a>
