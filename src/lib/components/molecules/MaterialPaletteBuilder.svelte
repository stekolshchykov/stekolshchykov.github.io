<script lang="ts">
	import { onMount } from 'svelte';
	import { cx } from '$lib/utils/helpers';
	import Button from '$lib/components/atoms/Button.svelte';

	interface Material {
		id: string;
		name: string;
		image: string;
	}

	interface Props {
		materials: Material[];
		storageKey?: string;
		class?: string;
	}

	let { materials, storageKey = 'aras-living-material-palette', class: className = '' }: Props = $props();

	let selectedIds = $state<string[]>([]);
	let showError = $state(false);
	let hydrated = $state(false);

	const MAX_SELECTIONS = 4;

	onMount(() => {
		try {
			const saved = localStorage.getItem(storageKey);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (Array.isArray(parsed)) {
					selectedIds = parsed.filter((id) => materials.some((m) => m.id === id));
				}
			}
		} catch {
			// ignore storage errors
		}
		hydrated = true;
	});

	$effect(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(storageKey, JSON.stringify(selectedIds));
		} catch {
			// ignore storage errors
		}
	});

	function toggle(id: string) {
		showError = false;
		if (selectedIds.includes(id)) {
			selectedIds = selectedIds.filter((x) => x !== id);
		} else if (selectedIds.length < MAX_SELECTIONS) {
			selectedIds = [...selectedIds, id];
		} else {
			showError = true;
		}
	}

	const selectedMaterials = $derived(
		selectedIds.map((id) => materials.find((m) => m.id === id)).filter(Boolean) as Material[]
	);

	const summaryText = $derived(
		selectedMaterials.length === 0
			? 'No materials selected'
			: `${selectedMaterials.length} of ${MAX_SELECTIONS} selected`
	);
</script>

<div class={cx('relative', className)}>
	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
		{#each materials as material}
			<button
				type="button"
				onclick={() => toggle(material.id)}
				class="group relative aspect-square overflow-hidden border text-left transition-all duration-300 ease-ui focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
				class:border-accent={selectedIds.includes(material.id)}
				class:bg-bg-secondary={selectedIds.includes(material.id)}
				class:border-border={!selectedIds.includes(material.id)}
				class:bg-bg-primary={!selectedIds.includes(material.id)}
				aria-pressed={selectedIds.includes(material.id)}
			>
				<img
					src={material.image}
					alt=""
					loading="lazy"
					decoding="async"
					class="h-full w-full object-cover transition-transform duration-500 ease-image group-hover:scale-[1.05]"
				/>
				<div
					class="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent"
				></div>
				<div class="absolute inset-x-0 bottom-0 p-3 md:p-4">
					<h3 class="font-serif text-base text-text-primary md:text-lg">
						{material.name}
					</h3>
				</div>
				{#if selectedIds.includes(material.id)}
					<div
						class="absolute right-2 top-2 flex h-6 w-6 items-center justify-center bg-accent md:right-3 md:top-3"
					>
						<svg
							class="h-3.5 w-3.5 text-bg-primary"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="3"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
						</svg>
					</div>
				{/if}
			</button>
		{/each}
	</div>

	{#if showError}
		<p class="mt-3 font-sans text-sm text-accent" role="alert">
			You can select up to {MAX_SELECTIONS} materials.
		</p>
	{/if}

	<div
		class="fixed bottom-0 left-0 right-0 z-50 translate-y-full transition-transform duration-500 ease-ui md:left-auto md:right-6 md:bottom-6 md:max-w-sm md:translate-y-0 md:opacity-0 md:transition-opacity"
		class:translate-y-0={selectedMaterials.length > 0}
		class:md:opacity-100={selectedMaterials.length > 0}
	>
		<div
			class="border border-border bg-bg-secondary/95 p-5 shadow-2xl backdrop-blur md:rounded-none"
		>
			<div class="mb-4 flex items-center justify-between">
				<span
					class="font-sans text-caption font-medium uppercase tracking-label text-text-secondary"
				>
					{summaryText}
				</span>
				<button
					type="button"
					onclick={() => {
						selectedIds = [];
						showError = false;
					}}
					class="font-sans text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-text-primary"
				>
					Clear
				</button>
			</div>

			<ul class="mb-5 space-y-2">
				{#each selectedMaterials as material}
					<li class="flex items-center gap-3">
						<div class="h-8 w-8 flex-shrink-0 overflow-hidden bg-bg-primary">
							<img src={material.image} alt="" class="h-full w-full object-cover" />
						</div>
						<span class="font-sans text-sm text-text-primary">{material.name}</span>
					</li>
				{/each}
			</ul>

			<Button
				variant="primary"
				size="md"
				href="/en/contact/?samples={selectedIds.join(',')}"
				class="w-full"
			>
				Request samples
			</Button>
		</div>
	</div>
</div>
