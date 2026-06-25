<script lang="ts">
	import { t } from 'svelte-i18n';
	import Icon from './Icon.svelte';

	interface Props {
		value?: 'residential' | 'commercial';
		name?: string;
		class?: string;
	}

	let {
		value = $bindable('residential'),
		name = 'project-type-toggle',
		class: className = ''
	}: Props = $props();

	const options = [
		{ value: 'residential', key: 'form.project_type_residential', icon: 'home' },
		{ value: 'commercial', key: 'form.project_type_commercial', icon: 'building-2' }
	] as const;
</script>

<div
	class="inline-flex rounded-full border border-text-secondary/30 bg-bg-secondary p-1 {className}"
	role="radiogroup"
	aria-label={$t('form.project_type_label')}
>
	{#each options as option}
		<button
			type="button"
			role="radio"
			aria-checked={value === option.value}
			{name}
			class="flex items-center gap-2 rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors duration-200 {value ===
			option.value
				? 'bg-accent text-bg-primary'
				: 'text-text-secondary hover:text-text-primary'}"
			onclick={() => (value = option.value)}
		>
			<Icon name={option.icon} size={16} />
			<span>{$t(option.key)}</span>
		</button>
	{/each}
</div>
