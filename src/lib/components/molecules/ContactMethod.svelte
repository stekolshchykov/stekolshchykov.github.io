<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';
	import { cx } from '$lib/utils/helpers';

	interface Props {
		icon: ComponentType<SvelteComponent>;
		label: string;
		value: string;
		href?: string;
		subtext?: string;
		class?: string;
	}

	let { icon, label, value, href, subtext, class: className = '' }: Props = $props();

	const Icon = $derived(icon);
</script>

<div class={cx('flex items-start gap-4', className)}>
	<div
		class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-accent"
	>
		<Icon size={20} />
	</div>
	<div>
		<p class="font-sans text-xs uppercase tracking-widest text-text-secondary">{label}</p>
		{#if href}
			<a {href} class="font-sans text-text-primary transition-colors hover:text-accent">
				{value}
			</a>
		{:else}
			<p class="font-sans text-text-primary">{value}</p>
		{/if}
		{#if subtext}
			<p class="font-sans text-sm text-text-secondary">{subtext}</p>
		{/if}
	</div>
</div>
