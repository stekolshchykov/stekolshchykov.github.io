<script lang="ts">
	import { t } from 'svelte-i18n';
	import Icon from './Icon.svelte';

	interface Props {
		name?: string;
		accept?: string;
		maxFiles?: number;
		maxSizeMB?: number;
		files?: File[];
		error?: string;
		class?: string;
	}

	let {
		name = 'file-drop',
		accept = 'image/png,image/jpeg,image/jpg,application/pdf',
		maxFiles = 5,
		maxSizeMB = 10,
		files = $bindable([]),
		error,
		class: className = ''
	}: Props = $props();

	let dragOver = $state(false);
	let inputRef = $state<HTMLInputElement | null>(null);
	let localError = $state<string>('');

	const acceptArray = $derived(accept.split(',').map((t) => t.trim()));
	const displayError = $derived(error || localError);

	function formatBytes(bytes: number): string {
		if (bytes === 0) return '0 B';
		const k = 1024;
		const sizes = ['B', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
	}

	function validate(file: File): string | null {
		const maxBytes = maxSizeMB * 1024 * 1024;
		if (file.size > maxBytes) {
			return `${file.name} exceeds ${maxSizeMB}MB.`;
		}
		if (acceptArray.length > 0 && acceptArray[0] !== '*') {
			const matched = acceptArray.some((type) => {
				if (type.includes('*')) {
					return file.type.startsWith(type.split('/')[0]);
				}
				return file.type === type || file.name.toLowerCase().endsWith(type.replace('.', ''));
			});
			if (!matched) {
				return `${file.name} is not an accepted file type.`;
			}
		}
		return null;
	}

	function addFiles(newFiles: FileList | null) {
		localError = '';
		if (!newFiles) return;

		const incoming = Array.from(newFiles);
		if (files.length + incoming.length > maxFiles) {
			localError = `You can upload up to ${maxFiles} files.`;
			return;
		}

		for (const file of incoming) {
			const validationError = validate(file);
			if (validationError) {
				localError = validationError;
				return;
			}
		}

		files = [...files, ...incoming];
	}

	function removeFile(index: number) {
		files = files.filter((_, i) => i !== index);
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		addFiles(e.dataTransfer?.files ?? null);
	}

	function onDragOver(e: DragEvent) {
		e.preventDefault();
		dragOver = true;
	}

	function onDragLeave() {
		dragOver = false;
	}

	function onInputChange(e: Event) {
		const target = e.target as HTMLInputElement;
		addFiles(target.files);
		if (target) target.value = '';
	}
</script>

<div class="w-full {className}">
	<label class="mb-2 block font-sans text-sm text-text-secondary" for={name}>
		{$t('form.files_label')}
	</label>
	<div
		role="button"
		tabindex="0"
		aria-describedby={displayError ? `${name}-error` : undefined}
		class="flex flex-col items-center justify-center border border-dashed px-6 py-10 text-center transition-colors duration-200 {dragOver
			? 'border-accent bg-accent/5'
			: 'border-text-secondary/30 bg-bg-secondary hover:border-text-secondary/60'}"
		ondrop={onDrop}
		ondragover={onDragOver}
		ondragleave={onDragLeave}
		onclick={() => inputRef?.click()}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				inputRef?.click();
			}
		}}
	>
		<Icon name="upload" size={32} class="mb-3 text-text-secondary" />
		<p class="font-sans text-sm text-text-primary">
			<span class="text-accent">Click to upload</span> or drag and drop
		</p>
		<p class="mt-1 font-sans text-xs text-text-secondary">{$t('form.files_helper')}</p>
		<input
			id={name}
			{name}
			bind:this={inputRef}
			type="file"
			{accept}
			multiple
			tabindex="-1"
			class="sr-only"
			onchange={onInputChange}
		/>
	</div>

	{#if files.length > 0}
		<ul class="mt-4 space-y-2">
			{#each files as file, index}
				<li class="flex items-center justify-between bg-bg-secondary px-4 py-3">
					<div class="flex items-center gap-3 overflow-hidden">
						<Icon name="file-text" size={18} class="shrink-0 text-text-secondary" />
						<div class="min-w-0">
							<p class="truncate font-sans text-sm text-text-primary">{file.name}</p>
							<p class="font-sans text-xs text-text-secondary">{formatBytes(file.size)}</p>
						</div>
					</div>
					<button
						type="button"
						class="ml-4 shrink-0 text-text-secondary transition-colors hover:text-text-primary"
						onclick={() => removeFile(index)}
						aria-label="Remove {file.name}"
					>
						<Icon name="x" size={18} />
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	{#if displayError}
		<p id="{name}-error" class="mt-2 font-sans text-sm text-red-400" role="alert">
			{displayError}
		</p>
	{/if}
</div>
