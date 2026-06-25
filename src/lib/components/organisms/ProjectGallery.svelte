<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { MediaItem } from '$lib/types/furniture';
	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
	import Image from '$lib/components/atoms/Image.svelte';
	import Lightbox from '$lib/components/molecules/Lightbox.svelte';

	interface Props {
		media: MediaItem[];
	}

	let { media }: Props = $props();
	let section = $state<HTMLElement | undefined>(undefined);
	let lightboxOpen = $state(false);
	let lightboxIndex = $state(0);

	const imageItems = $derived(media.filter((m) => (m.type ?? 'image') === 'image'));

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.gallery-item',
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.9,
					stagger: 0.1,
					ease: 'power3.out',
					scrollTrigger: { trigger: section, start: 'top 75%', immediateRender: false }
				}
			);
		}, section);

		return () => ctx.revert();
	});

	function openLightbox(index: number) {
		lightboxIndex = index;
		lightboxOpen = true;
	}

	function closeLightbox() {
		lightboxOpen = false;
	}
</script>

<Section bind:element={section}>
	<SectionHeader
		eyebrow={$_('project_detail.gallery_eyebrow')}
		headline={$_('project_detail.gallery_eyebrow')}
		class="gallery-item"
	/>

	<div class="columns-1 gap-6 md:columns-2 lg:columns-3">
		{#each imageItems as item, i}
			<button
				type="button"
				class="gallery-item mb-6 block w-full overflow-hidden"
				onclick={() => openLightbox(i)}
				aria-label="Open image in lightbox"
			>
				<Image
					src={item.src}
					alt={item.alt}
					loading={i === 0 ? 'eager' : 'lazy'}
					class="w-full transition-transform duration-[600ms] hover:scale-[1.03]"
				/>
			</button>
		{/each}
	</div>

	<Lightbox
		images={imageItems}
		startIndex={lightboxIndex}
		open={lightboxOpen}
		onclose={closeLightbox}
	/>
</Section>
