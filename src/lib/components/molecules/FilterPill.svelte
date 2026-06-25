<script lang="ts">
	import { cx } from '$lib/utils/helpers';

	interface Props {
		label: string;
		value: string;
		count?: number;
		active?: boolean;
		onclick: () => void;
	}

	let { label, count, active = false, onclick }: Props = $props();
</script>

<button
	type="button"
	{onclick}
	class={cx(
		'rounded-full px-4 py-1.5 font-sans text-[13px] font-medium tracking-wide transition-all duration-200',
		active
			? 'bg-text-primary text-bg-primary'
			: 'border border-white/15 text-text-secondary hover:border-white/40 hover:text-text-primary'
	)}
>
	{label}
	{#if typeof count === 'number'}
		<span class="ml-1 opacity-60">({count})</span>
	{/if}
</button>
