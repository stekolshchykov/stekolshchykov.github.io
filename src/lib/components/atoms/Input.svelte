<script lang="ts">
	import { t } from 'svelte-i18n';

	interface Props {
		name: string;
		type?: 'text' | 'email' | 'tel' | 'password' | 'url' | 'search' | string;
		label?: string;
		placeholder?: string;
		required?: boolean;
		error?: string;
		value?: string;
		autocomplete?: HTMLInputElement['autocomplete'];
		class?: string;
	}

	let {
		name,
		type = 'text',
		label,
		placeholder,
		required = false,
		error,
		value = $bindable(''),
		autocomplete,
		class: className = ''
	}: Props = $props();

	const inputId = $derived(`input-${name}`);
</script>

<div class="w-full {className}">
	{#if label}
		<label for={inputId} class="mb-2 block font-sans text-sm text-text-secondary">
			{label}
			{#if required}
				<span class="text-accent" aria-hidden="true">*</span>
				<span class="sr-only">{$t('form.validation_required')}</span>
			{/if}
		</label>
	{/if}
	<input
		id={inputId}
		{name}
		{type}
		{placeholder}
		{required}
		autocomplete={autocomplete || null}
		aria-invalid={error ? 'true' : undefined}
		aria-describedby={error ? `${inputId}-error` : undefined}
		bind:value
		class="w-full border-0 border-b bg-transparent py-4 font-sans text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none focus:ring-0 {error
			? 'border-b-[#9B5A5A] border-l-4 border-l-[#9B5A5A]'
			: 'border-text-secondary/30'}"
	/>
	{#if error}
		<p id="{inputId}-error" class="mt-2 font-sans text-sm text-red-400" role="alert">
			{error}
		</p>
	{/if}
</div>
