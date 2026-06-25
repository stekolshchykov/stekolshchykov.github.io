<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { ProjectSpecs } from '$lib/types/furniture';
	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';

	interface Props {
		specs: ProjectSpecs;
	}

	let { specs }: Props = $props();

	const rows: { key: keyof ProjectSpecs; label: string }[] = [
		{ key: 'client', label: 'project_detail.spec_client' },
		{ key: 'location', label: 'project_detail.spec_location' },
		{ key: 'category', label: 'project_detail.spec_category' },
		{ key: 'scope', label: 'project_detail.spec_scope' },
		{ key: 'materials', label: 'project_detail.spec_materials' },
		{ key: 'finishes', label: 'project_detail.spec_finishes' },
		{ key: 'hardware', label: 'project_detail.spec_hardware' },
		{ key: 'timeline', label: 'project_detail.spec_timeline' },
		{ key: 'year', label: 'project_detail.spec_year' }
	];
</script>

<Section tone="secondary" container="narrow">
	<SectionHeader
		eyebrow={$_('project_detail.specs_eyebrow')}
		headline={$_('project_detail.specs_eyebrow')}
	/>

	<table class="w-full border-collapse">
		<tbody>
			{#each rows as row, i}
				<tr class="border-b border-border first:border-t">
					<th
						scope="row"
						class="w-1/3 py-4 pr-6 text-left align-top font-sans text-xs font-medium uppercase tracking-widest text-text-secondary md:w-1/4"
					>
						{$_(row.label)}
					</th>
					<td class="py-4 align-top font-sans text-text-primary">
						{String(specs[row.key])}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Section>
