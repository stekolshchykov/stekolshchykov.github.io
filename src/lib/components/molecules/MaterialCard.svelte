<script lang="ts">
	import type { Material } from '$lib/types/furniture';
	import { cx } from '$lib/utils/helpers';

	interface Props {
		material: Material;
		class?: string;
	}

	let { material, class: className = '' }: Props = $props();
</script>

<div
	class={cx(
		'luxury-corners group border border-text-primary/10 bg-bg-secondary p-3 transition-all duration-500 ease-ui hover:-translate-y-1 hover:border-accent/45',
		className
	)}
>
	<div
		class="luxury-surface image-warm-overlay relative mb-4 aspect-square overflow-hidden bg-bg-primary"
		style="aspect-ratio: 1 / 1;"
	>
		<img
			src={material.image.src}
			alt={material.image.alt}
			loading="lazy"
			class="h-full w-full object-cover transition-transform duration-500 ease-image group-hover:scale-[1.03]"
		/>
		<div
			class="absolute bottom-3 right-3 h-10 w-10 border border-accent/35 bg-cover bg-center shadow-[0_12px_34px_rgba(0,0,0,0.35)]"
			style="background-image: url({material.image.src})"
			aria-hidden="true"
		></div>
		<span
			class="absolute left-3 top-3 h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_rgba(196,149,106,0.72)]"
			aria-hidden="true"
		></span>
	</div>
	<div class="px-1 pb-1">
		<p class="mb-1 font-sans text-[11px] uppercase tracking-[0.12em] text-text-secondary">
			{material.description}
		</p>
		<h3 class="font-serif text-xl text-text-primary">{material.name}</h3>
	</div>
</div>
