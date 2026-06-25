<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { SvelteSet } from 'svelte/reactivity';
	import { site } from '$lib/data/site';
	import { faqItems } from '$lib/data/faq';

	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import SplitTextReveal from '$lib/components/molecules/SplitTextReveal.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Section from '$lib/components/atoms/Section.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';

	let query = $state('');

	const categories = Array.from(new Set(faqItems.map((f) => f.category)));
	const initiallyOpenItemIds = categories
		.map((category) => faqItems.find((item) => item.category === category)?.id)
		.filter((id): id is string => !!id);
	let openItems = new SvelteSet<string>(initiallyOpenItemIds);

	const filteredItems = $derived(
		faqItems.filter(
			(f) =>
				f.question.toLowerCase().includes(query.toLowerCase()) ||
				f.answer.toLowerCase().includes(query.toLowerCase())
		)
	);

	const groupedItems = $derived(
		categories
			.map((category) => ({
				category,
				label: $_(`faq.category_${category}`),
				items: filteredItems.filter((f) => f.category === category)
			}))
			.filter((group) => group.items.length > 0)
	);

	function toggle(id: string) {
		if (openItems.has(id)) {
			openItems.delete(id);
		} else {
			openItems.add(id);
		}
	}
</script>

<SeoHead
	title={$_('faq.meta_title')}
	description={$_('faq.meta_description')}
	image="{site.seo.siteUrl}/og-default.jpg"
	type="website"
	canonical="{site.seo.siteUrl}/faq/"
/>

<PageHeroSection
	eyebrow={$_('faq.hero_eyebrow')}
	headline={$_('faq.hero_headline')}
	subheadline={$_('faq.hero_subheadline')}
	image="/images/hero-poster.jpg"
	height="large"
/>

<Section container="narrow">
	<div class="mb-12 md:mb-16">
		<Heading as="h2" variant="serif" class="mb-8 text-3xl text-text-primary md:text-4xl">
			<SplitTextReveal as="span" text={$_('faq.hero_headline')} />
		</Heading>
		<p class="mb-8 max-w-2xl font-sans leading-relaxed text-text-secondary">
			Use this page to understand budgets, timelines, material choices, installation, and aftercare
			before you book a consultation. The first answer in each category is open by default so you can
			scan the essentials quickly.
		</p>
		<Input
			name="faq-search"
			type="search"
			placeholder="Search questions..."
			bind:value={query}
			class="max-w-xl"
		/>
	</div>

	<div class="space-y-16">
		{#each groupedItems as group}
			<div>
				<h3 class="mb-6 font-sans text-xs uppercase tracking-[0.15em] text-accent">
					{group.label}
				</h3>
				<div class="divide-y divide-border border-t border-border">
					{#each group.items as item}
						<div class="py-6">
							<button
								type="button"
								class="flex w-full items-start justify-between gap-4 text-left"
								onclick={() => toggle(item.id)}
								aria-expanded={openItems.has(item.id)}
							>
								<span class="font-serif text-xl text-text-primary md:text-2xl">{item.question}</span
								>
								<span
									class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center border border-text-secondary/30 text-text-secondary transition-colors"
								>
									{#if openItems.has(item.id)}
										−
									{:else}
										+
									{/if}
								</span>
							</button>
							{#if openItems.has(item.id)}
								<div class="mt-4 pr-10">
									<p class="leading-relaxed text-text-secondary">{item.answer}</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<p class="font-sans text-text-secondary">No questions match your search.</p>
		{/each}
	</div>
</Section>

<Section tone="secondary" container="narrow" align="center">
	<Heading as="h2" variant="serif" class="mb-6 text-3xl font-light text-text-primary md:text-4xl">
		{$_('faq.cta_headline')}
	</Heading>
	<Button variant="primary" size="lg" href="/en/contact/">
		{$_('faq.cta_button')}
	</Button>
</Section>
