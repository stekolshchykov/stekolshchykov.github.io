<script lang="ts">
	import { cx } from '$lib/utils/helpers';

	interface Props {
		value?: string;
		options: string[];
		maxResults?: number;
		placeholder?: string;
		label?: string;
		id?: string;
		error?: string;
	}

	let {
		value = $bindable(''),
		options,
		maxResults = 8,
		placeholder = '',
		label,
		id = crypto.randomUUID(),
		error
	}: Props = $props();

	let inputValue = $state(value);
	let open = $state(false);
	let highlighted = $state(0);

	const filtered = $derived(
		options
			.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()))
			.slice(0, maxResults)
	);

	$effect(() => {
		value = inputValue;
	});

	$effect(() => {
		if (!open) {
			highlighted = 0;
		}
	});

	function select(option: string) {
		inputValue = option;
		open = false;
	}

	function onKeyDown(event: KeyboardEvent) {
		if (!open) return;

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			highlighted = (highlighted + 1) % filtered.length;
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			highlighted = (highlighted - 1 + filtered.length) % filtered.length;
		} else if (event.key === 'Enter' && filtered[highlighted]) {
			event.preventDefault();
			select(filtered[highlighted]);
		} else if (event.key === 'Escape') {
			open = false;
		}
	}

	function onFocus() {
		open = true;
	}

	function onBlur() {
		// Delay closing so mousedown on an option can fire first
		setTimeout(() => {
			open = false;
		}, 150);
	}
</script>

<div class="relative">
	{#if label}
		<label for={id} class="mb-2 block font-sans text-sm text-text-primary">{label}</label>
	{/if}
	<input
		{id}
		type="text"
		{placeholder}
		autocomplete="off"
		bind:value={inputValue}
		onkeydown={onKeyDown}
		onfocus={onFocus}
		onblur={onBlur}
		class={cx(
			'w-full border-b bg-transparent px-0 py-3 font-sans text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-accent',
			error ? 'border-red-400' : 'border-white/20'
		)}
	/>

	{#if open && filtered.length}
		<ul
			class="absolute z-20 mt-1 max-h-60 w-full overflow-auto border border-white/10 bg-bg-secondary shadow-xl"
			role="listbox"
		>
			{#each filtered as option, i}
				<li>
					<button
						type="button"
						role="option"
						aria-selected={i === highlighted}
						class={cx(
							'w-full px-4 py-2 text-left font-sans text-sm transition-colors',
							i === highlighted
								? 'bg-white/10 text-text-primary'
								: 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
						)}
						onmousedown={(e) => {
							e.preventDefault();
							select(option);
						}}
					>
						{option}
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	{#if error}
		<p class="mt-2 font-sans text-xs text-red-400">{error}</p>
	{/if}
</div>
