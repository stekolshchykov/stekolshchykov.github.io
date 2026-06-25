<script lang="ts">
	import type { Material } from '$lib/types/furniture';
	import { cx } from '$lib/utils/helpers';

	interface Props {
		material: Material;
		class?: string;
	}

	let { material, class: className = '' }: Props = $props();
</script>

<div class={cx('group transition-transform duration-500 ease-ui hover:-translate-y-1', className)}>
	<div
		class="image-warm-overlay relative mb-4 aspect-square overflow-hidden bg-bg-secondary"
		style="aspect-ratio: 1 / 1;"
	>
		<img
			src={material.image.src}
			alt={material.image.alt}
			loading="lazy"
			class="h-full w-full object-cover transition-transform duration-500 ease-image group-hover:scale-[1.03]"
		/>
		<div
			class="absolute bottom-3 right-3 h-10 w-10 rounded-full border border-white/10 bg-cover bg-center shadow-lg"
			style="background-image: url({material.image.src})"
			aria-hidden="true"
		></div>
	</div>
	<div>
		<p class="mb-1 font-sans text-[11px] uppercase tracking-[0.12em] text-text-secondary">
			{material.description}
		</p>
		<h3 class="font-serif text-xl text-text-primary">{material.name}</h3>
	</div>
</div>
