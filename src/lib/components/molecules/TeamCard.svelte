<script lang="ts">
	import type { TeamMember } from '$lib/types/furniture';
	import { cx } from '$lib/utils/helpers';

	interface Props {
		member: TeamMember;
		class?: string;
	}

	let { member, class: className = '' }: Props = $props();
</script>

<div class={cx('group', className)}>
	<div
		class="relative mb-4 aspect-[3/4] overflow-hidden bg-bg-secondary"
		style="aspect-ratio: 3 / 4;"
	>
		<img
			src={member.photo.src}
			alt={member.photo.alt}
			loading="lazy"
			class="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
		/>
	</div>
	<h3 class="mb-1 font-serif text-xl text-text-primary">{member.name}</h3>
	<p class="font-sans text-sm text-accent">{member.role}</p>
</div>
