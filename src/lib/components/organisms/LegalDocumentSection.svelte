<script lang="ts">
	import type { Snippet } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Section from '$lib/components/atoms/Section.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';

	interface LegalSection {
		id: string;
		title: string;
		content: string[];
	}

	interface LegalDocument {
		title: string;
		lastUpdated: string;
		sections: LegalSection[];
	}

	interface Props {
		document: LegalDocument;
		aside?: Snippet;
	}

	let { document, aside }: Props = $props();
</script>

<Section container="narrow">
	<Heading as="h1" variant="display" class="text-4xl text-text-primary md:text-5xl lg:text-6xl">
		{document.title}
	</Heading>
	<Text variant="muted" class="mt-4">
		{$_('legal.last_updated')}: {document.lastUpdated}
	</Text>

	<div class="mt-16 space-y-12">
		{#each document.sections as section (section.id)}
			<article>
				<Heading as="h2" variant="serif" class="text-2xl font-light text-text-primary md:text-3xl">
					{section.title}
				</Heading>
				<div class="mt-4 space-y-4 text-text-secondary">
					{#each section.content as paragraph, i (i)}
						<p class="leading-relaxed">{paragraph}</p>
					{/each}
				</div>
			</article>
		{/each}
	</div>

	{#if aside}
		{@render aside()}
	{/if}
</Section>
