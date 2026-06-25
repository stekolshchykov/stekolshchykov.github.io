<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { MediaItem } from '$lib/types/furniture';
	import Eyebrow from '$lib/components/atoms/Eyebrow.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Image from '$lib/components/atoms/Image.svelte';
	import Lightbox from '$lib/components/molecules/Lightbox.svelte';

	interface Props {
		media: MediaItem[];
	}

	let { media }: Props = $props();
	let section: HTMLElement;
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

<section bind:this={section} class="bg-bg-primary py-16 md:py-24">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<div class="mb-12">
			<Eyebrow text={$_('project_detail.gallery_eyebrow')} class="gallery-item mb-4" />
			<Heading as="h2" variant="serif" class="gallery-item text-3xl text-text-primary md:text-4xl">
				{$_('project_detail.gallery_eyebrow')}
			</Heading>
		</div>

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
	</div>

	<Lightbox
		images={imageItems}
		startIndex={lightboxIndex}
		open={lightboxOpen}
		onclose={closeLightbox}
	/>
</section>
