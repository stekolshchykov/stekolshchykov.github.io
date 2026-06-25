<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Project, ProjectCategory } from '$lib/types/furniture';
	import FilterPill from '$lib/components/molecules/FilterPill.svelte';
	import ProjectCard from '$lib/components/molecules/ProjectCard.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Text from '$lib/components/atoms/Text.svelte';

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();

	const filters: { label: string; value: ProjectCategory | 'all' }[] = [
		{ label: 'projects.filter_all', value: 'all' },
		{ label: 'projects.filter_residential', value: 'residential' },
		{ label: 'projects.filter_commercial', value: 'commercial' }
	];

	let activeFilter = $state<ProjectCategory | 'all'>('all');
	let visibleCount = $state(6);

	const filtered = $derived(
		activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)
	);

	const visible = $derived(filtered.slice(0, visibleCount));
	const hasMore = $derived(visibleCount < filtered.length);

	function setFilter(value: ProjectCategory | 'all') {
		activeFilter = value;
		visibleCount = 6;
	}

	function loadMore() {
		visibleCount += 3;
	}
</script>

<div>
	<div class="mb-10 flex flex-wrap gap-3 md:mb-12">
		{#each filters as filter}
			<FilterPill
				label={$_(filter.label)}
				value={filter.value}
				active={activeFilter === filter.value}
				onclick={() => setFilter(filter.value)}
			/>
		{/each}
	</div>

	{#if visible.length > 0}
		<div
			class="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3"
		>
			{#each visible as project (project.slug)}
				<div class="flex-[0_0_85vw] snap-start md:block">
					<ProjectCard {project} class="h-full" />
				</div>
			{/each}
		</div>

		{#if hasMore}
			<div class="mt-14 flex justify-center">
				<Button variant="secondary" onclick={loadMore}>
					{$_('projects.load_more')}
				</Button>
			</div>
		{/if}
	{:else}
		<div class="py-20 text-center">
			<Text variant="body-lg" class="text-text-secondary">
				{$_('projects.no_results')}
			</Text>
		</div>
	{/if}
</div>
