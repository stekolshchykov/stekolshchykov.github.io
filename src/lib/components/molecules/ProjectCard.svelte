<script lang="ts">
	import type { Project } from '$lib/types/furniture';
	import { cx } from '$lib/utils/helpers';
	import { t } from 'svelte-i18n';

	interface Props {
		project: Project;
		featured?: boolean;
		class?: string;
	}

	let { project, featured = false, class: className = '' }: Props = $props();
</script>

<a
	href="/projects/{project.slug}/"
	class={cx(
		'group relative block overflow-hidden',
		featured ? 'aspect-[16/10] md:col-span-2' : 'aspect-[4/5]',
		className
	)}
	style="aspect-ratio: {featured ? '16 / 10' : '4 / 5'};"
>
	<div class="image-warm-overlay absolute inset-0 overflow-hidden">
		<img
			src={project.media.hero.src}
			alt={project.media.hero.alt}
			loading="lazy"
			class="h-full w-full object-cover transition-transform duration-500 ease-image group-hover:scale-[1.05]"
		/>
	</div>
	<div
		class="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-bg-primary/20 to-transparent opacity-0 transition-opacity duration-500 ease-ui group-hover:opacity-100"
	></div>

	<div
		class="absolute inset-x-0 bottom-0 translate-y-2 p-5 md:p-6 transition-transform duration-500 ease-ui delay-100 group-hover:translate-y-0"
	>
		<p class="mb-1 font-sans text-[11px] uppercase tracking-[0.12em] text-text-secondary">
			{project.category} / {project.specs.year}
		</p>
		<h3
			class={cx(
				'font-serif leading-tight text-text-primary',
				featured ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'
			)}
		>
			{project.title}
		</h3>

		<span
			class="mt-3 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-text-primary opacity-0 transition-all duration-500 ease-ui group-hover:text-accent group-hover:opacity-100"
		>
			{$t('projects.view_project')}
			<span class="inline-block transition-transform duration-300 ease-ui group-hover:translate-x-1"
				>→</span
			>
		</span>
	</div>
</a>
