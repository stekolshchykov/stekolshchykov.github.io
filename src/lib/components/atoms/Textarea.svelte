<script lang="ts">
	import { t } from 'svelte-i18n';

	interface Props {
		name: string;
		label?: string;
		placeholder?: string;
		required?: boolean;
		error?: string;
		value?: string;
		maxlength?: number;
		rows?: number;
		class?: string;
	}

	let {
		name,
		label,
		placeholder,
		required = false,
		error,
		value = $bindable(''),
		maxlength,
		rows = 5,
		class: className = ''
	}: Props = $props();

	const inputId = $derived(`textarea-${name}`);
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
	<textarea
		id={inputId}
		{name}
		{placeholder}
		{required}
		{maxlength}
		{rows}
		aria-invalid={error ? 'true' : undefined}
		aria-describedby={error ? `${inputId}-error` : undefined}
		bind:value
		class="w-full resize-y border-0 border-b bg-transparent py-4 font-sans text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none focus:ring-0 {error
			? 'border-b-[#9B5A5A] border-l-4 border-l-[#9B5A5A]'
			: 'border-text-secondary/30'}"></textarea>
	{#if error}
		<p id="{inputId}-error" class="mt-2 font-sans text-sm text-red-400" role="alert">
			{error}
		</p>
	{/if}
</div>
