<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { ProjectSpecs } from '$lib/types/furniture';
	import Eyebrow from '$lib/components/atoms/Eyebrow.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';

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

<section class="bg-bg-secondary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-4xl px-6 md:px-12 lg:px-16">
		<Eyebrow text={$_('project_detail.specs_eyebrow')} class="mb-4" />
		<Heading as="h2" variant="serif" class="mb-10 text-3xl text-text-primary md:text-4xl">
			{$_('project_detail.specs_eyebrow')}
		</Heading>

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
	</div>
</section>
