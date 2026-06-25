<script lang="ts">
	interface Props {
		checked?: boolean;
		label?: string;
		disabled?: boolean;
		onchange?: (e: Event) => void;
		class?: string;
	}

	let {
		checked = $bindable(false),
		label,
		disabled = false,
		onchange,
		class: className = ''
	}: Props = $props();

	const boxClasses =
		'flex h-5 w-5 shrink-0 items-center justify-center rounded-none border border-text-secondary/50 bg-transparent transition-colors duration-200';

	const checkedClasses = 'border-accent bg-accent';

	const uncheckedClasses = 'border-text-secondary/50';
</script>

{#if label}
	<label
		class="inline-flex cursor-pointer items-center gap-3 {className}"
		class:cursor-not-allowed={disabled}
		class:opacity-50={disabled}
	>
		<span class="{boxClasses} {checked ? checkedClasses : uncheckedClasses}">
			{#if checked}
				<svg
					class="h-3 w-3 text-bg-primary"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="square"
					stroke-linejoin="miter"
					aria-hidden="true"
				>
					<polyline points="20 6 9 17 4 12"></polyline>
				</svg>
			{/if}
		</span>
		<span class="font-sans text-sm text-text-primary">{label}</span>
		<input type="checkbox" bind:checked {disabled} {onchange} class="sr-only" />
	</label>
{:else}
	<span class="inline-flex items-center {className}" class:opacity-50={disabled}>
		<span class="{boxClasses} {checked ? checkedClasses : uncheckedClasses}">
			{#if checked}
				<svg
					class="h-3 w-3 text-bg-primary"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="square"
					stroke-linejoin="miter"
					aria-hidden="true"
				>
					<polyline points="20 6 9 17 4 12"></polyline>
				</svg>
			{/if}
		</span>
		<input type="checkbox" bind:checked {disabled} {onchange} class="sr-only" />
	</span>
{/if}
