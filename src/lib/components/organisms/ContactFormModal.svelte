<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { z } from 'zod';
	import { X, Upload, ChevronDown } from 'lucide-svelte';
	import { env } from '$env/dynamic/public';
	import { locations } from '$lib/data/locations';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import Button from '$lib/components/atoms/Button.svelte';

	interface Props {
		preselectedType?: 'residential' | 'commercial' | 'not-sure';
		open?: boolean;
		onclose?: () => void;
	}

	let { preselectedType = 'residential', open = $bindable(false), onclose }: Props = $props();

	let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errors = $state<Record<string, string>>({});
	let locationSuggestions = $state<string[]>([]);
	let showSuggestions = $state(false);
	let fileList = $state<File[]>([]);
	let draggedOver = $state(false);

	let formData = $state({
		projectType: 'residential' as 'residential' | 'commercial' | 'not-sure',
		name: '',
		email: '',
		phone: '',
		location: '',
		message: '',
		honeypot: ''
	});

	$effect(() => {
		formData.projectType = preselectedType;
	});

	const schema = z.object({
		projectType: z.enum(['residential', 'commercial', 'not-sure']),
		name: z.string().min(1, 'This field is required'),
		email: z.string().email('Please enter a valid email address'),
		phone: z.string().min(1, 'This field is required'),
		location: z.string().min(1, 'This field is required'),
		message: z.string().min(1, 'This field is required'),
		honeypot: z.string().max(0, 'Bot detected')
	});

	function close() {
		open = false;
		onclose?.();
	}

	function reset() {
		status = 'idle';
		errors = {};
		fileList = [];
		formData = {
			projectType: preselectedType,
			name: '',
			email: '',
			phone: '',
			location: '',
			message: '',
			honeypot: ''
		};
	}

	function updateLocationSuggestions() {
		const value = formData.location.trim().toLowerCase();
		if (!value) {
			locationSuggestions = [];
			showSuggestions = false;
			return;
		}
		locationSuggestions = locations.filter((loc) => loc.toLowerCase().includes(value)).slice(0, 6);
		showSuggestions = locationSuggestions.length > 0;
	}

	function selectLocation(loc: string) {
		formData.location = loc;
		showSuggestions = false;
	}

	function handleFiles(files: FileList | null) {
		if (!files) return;
		const accepted = Array.from(files).filter((f) => {
			const valid = /\.(png|jpe?g|pdf)$/i.test(f.name);
			const withinSize = f.size <= 10 * 1024 * 1024;
			return valid && withinSize;
		});
		fileList = [...fileList, ...accepted].slice(0, 5);
	}

	function removeFile(index: number) {
		fileList = fileList.filter((_, i) => i !== index);
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (status === 'submitting') return;

		const result = schema.safeParse(formData);
		if (!result.success) {
			errors = Object.fromEntries(
				result.error.issues.map((issue) => [issue.path[0], issue.message])
			);
			return;
		}

		errors = {};
		status = 'submitting';

		const form = new FormData();
		form.append('projectType', formData.projectType);
		form.append('name', formData.name);
		form.append('email', formData.email);
		form.append('phone', formData.phone);
		form.append('location', formData.location);
		form.append('message', formData.message);
		fileList.forEach((file) => form.append('files', file));

		try {
			const endpoint = `https://formspree.io/f/${env.PUBLIC_FORMSPREE_ID ?? 'xxxxxxxx'}`;
			const res = await fetch(endpoint, {
				method: 'POST',
				body: form,
				headers: { Accept: 'application/json' }
			});
			status = res.ok ? 'success' : 'error';
		} catch {
			status = 'error';
		}
	}

	onMount(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && open) close();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});
</script>

{#if open}
	<div
		class="fixed inset-0 z-[60] flex items-center justify-center bg-bg-primary/90 p-4 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		aria-labelledby="contact-form-title"
		tabindex="-1"
		onclick={(e) => e.target === e.currentTarget && close()}
		onkeydown={(e) => e.key === 'Escape' && close()}
	>
		<div
			class="relative grid max-h-[90vh] w-full max-w-5xl overflow-hidden bg-bg-secondary shadow-2xl md:grid-cols-2"
		>
			<!-- Left panel: material texture -->
			<div class="relative hidden min-h-[400px] bg-bg-primary md:block">
				<img
					src="/images/materials/american-walnut.jpg"
					alt=""
					class="absolute inset-0 h-full w-full object-cover"
					loading="eager"
				/>
				<div
					class="absolute inset-0 bg-gradient-to-r from-bg-primary/40 via-bg-primary/20 to-transparent"
				></div>
				<div class="texture-overlay absolute inset-0 opacity-[0.18] mix-blend-overlay"></div>
				<div class="absolute bottom-8 left-8">
					<p
						class="mb-1 font-sans text-xs font-medium uppercase tracking-[0.2em] text-text-secondary"
					>
						Áras Living
					</p>
					<p class="font-serif text-2xl text-text-primary">Bespoke Joinery</p>
				</div>
			</div>

			<!-- Right panel: form -->
			<div class="relative max-h-[90vh] overflow-y-auto p-8 md:p-12">
				<button
					type="button"
					class="absolute top-4 right-4 p-2 text-text-secondary transition-colors hover:text-text-primary"
					onclick={close}
					aria-label={$_('nav.menu_close')}
				>
					<X size={24} />
				</button>

				{#if status === 'success'}
					<div class="flex min-h-[420px] flex-col items-center justify-center py-12 text-center">
						<div class="mb-6 h-px w-16 bg-accent"></div>
						<Heading as="h2" variant="serif" class="mb-4 text-3xl text-text-primary">
							{$_('form.success_title')}
						</Heading>
						<Text variant="body" class="mb-10 max-w-sm text-text-secondary">
							{$_('form.success_message')}
						</Text>
						<Button
							variant="secondary"
							onclick={reset}
							class="!border-text-primary !text-text-primary hover:!bg-text-primary/10"
						>
							{$_('form.submit')}
						</Button>
					</div>
				{:else if status === 'error'}
					<div class="flex min-h-[420px] flex-col items-center justify-center py-12 text-center">
						<div class="mb-6 h-px w-16 bg-text-secondary/40"></div>
						<Heading as="h2" variant="serif" class="mb-4 text-3xl text-text-primary">
							{$_('form.error_title')}
						</Heading>
						<Text variant="body" class="mb-10 max-w-sm text-text-secondary">
							{$_('form.error_message')}
						</Text>
						<Button
							variant="secondary"
							onclick={() => (status = 'idle')}
							class="!border-text-primary !text-text-primary hover:!bg-text-primary/10"
						>
							{$_('form.submit')}
						</Button>
					</div>
				{:else}
					<Heading
						as="h2"
						variant="serif"
						class="mb-2 text-3xl text-text-primary"
						id="contact-form-title"
					>
						{$_('contact.form_title')}
					</Heading>
					<Text variant="body" class="mb-8 text-text-secondary">
						{$_('contact.form_subtitle')}
					</Text>

					<form class="space-y-6" onsubmit={handleSubmit} novalidate>
						<input
							type="text"
							name="honeypot"
							bind:value={formData.honeypot}
							class="hidden"
							tabindex="-1"
							autocomplete="off"
						/>

						<div>
							<span
								class="mb-2 block font-sans text-xs font-medium uppercase tracking-widest text-text-secondary"
							>
								{$_('form.project_type_label')}
							</span>
							<div class="flex flex-wrap gap-2">
								{#each ['residential', 'commercial', 'not-sure'] as type}
									<button
										type="button"
										class="border px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-colors {formData.projectType ===
										type
											? 'border-text-primary bg-text-primary text-bg-primary'
											: 'border-text-primary/20 text-text-primary hover:border-accent'}"
										onclick={() => (formData.projectType = type as typeof formData.projectType)}
									>
										{$_(`form.project_type_${type}`)}
									</button>
								{/each}
							</div>
						</div>

						<div class="grid gap-6 md:grid-cols-2">
							<div>
								<label
									for="name"
									class="mb-2 block font-sans text-xs font-medium uppercase tracking-widest text-text-secondary"
								>
									{$_('form.name_label')}
								</label>
								<input
									id="name"
									type="text"
									bind:value={formData.name}
									placeholder={$_('form.name_placeholder')}
									class="w-full border border-text-primary/20 bg-surface px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none"
								/>
								{#if errors.name}<p class="mt-1 text-sm text-red-400">{errors.name}</p>{/if}
							</div>
							<div>
								<label
									for="email"
									class="mb-2 block font-sans text-xs font-medium uppercase tracking-widest text-text-secondary"
								>
									{$_('form.email_label')}
								</label>
								<input
									id="email"
									type="email"
									bind:value={formData.email}
									placeholder={$_('form.email_placeholder')}
									class="w-full border border-text-primary/20 bg-surface px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none"
								/>
								{#if errors.email}<p class="mt-1 text-sm text-red-400">{errors.email}</p>{/if}
							</div>
						</div>

						<div class="grid gap-6 md:grid-cols-2">
							<div>
								<label
									for="phone"
									class="mb-2 block font-sans text-xs font-medium uppercase tracking-widest text-text-secondary"
								>
									{$_('form.phone_label')}
								</label>
								<input
									id="phone"
									type="tel"
									bind:value={formData.phone}
									placeholder={$_('form.phone_placeholder')}
									class="w-full border border-text-primary/20 bg-surface px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none"
								/>
								{#if errors.phone}<p class="mt-1 text-sm text-red-400">{errors.phone}</p>{/if}
							</div>
							<div class="relative">
								<label
									for="location"
									class="mb-2 block font-sans text-xs font-medium uppercase tracking-widest text-text-secondary"
								>
									{$_('form.location_label')}
								</label>
								<input
									id="location"
									type="text"
									bind:value={formData.location}
									placeholder={$_('form.location_placeholder')}
									oninput={updateLocationSuggestions}
									onfocus={() => formData.location.trim() && updateLocationSuggestions()}
									class="w-full border border-text-primary/20 bg-surface px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none"
								/>
								{#if showSuggestions}
									<ul
										class="absolute z-10 mt-1 max-h-48 w-full overflow-auto border border-text-primary/10 bg-bg-primary shadow-lg"
									>
										{#each locationSuggestions as loc}
											<li>
												<button
													type="button"
													class="w-full px-4 py-2 text-left font-sans text-sm text-text-primary transition-colors hover:bg-text-primary/10"
													onclick={() => selectLocation(loc)}
												>
													{loc}
												</button>
											</li>
										{/each}
									</ul>
								{/if}
								{#if errors.location}<p class="mt-1 text-sm text-red-400">{errors.location}</p>{/if}
							</div>
						</div>

						<div>
							<label
								for="message"
								class="mb-2 block font-sans text-xs font-medium uppercase tracking-widest text-text-secondary"
							>
								{$_('form.message_label')}
							</label>
							<textarea
								id="message"
								bind:value={formData.message}
								placeholder={$_('form.message_placeholder')}
								rows="4"
								class="min-h-[120px] w-full resize-none border border-text-primary/20 bg-surface px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none"
							></textarea>
							{#if errors.message}<p class="mt-1 text-sm text-red-400">{errors.message}</p>{/if}
						</div>

						<div>
							<span
								class="mb-2 block font-sans text-xs font-medium uppercase tracking-widest text-text-secondary"
							>
								{$_('form.files_label')}
							</span>
							<div
								role="button"
								tabindex="0"
								aria-label={$_('form.files_label')}
								class="border-2 border-dashed p-6 transition-colors {draggedOver
									? 'border-accent bg-accent/5'
									: 'border-text-primary/20'}"
								ondragover={(e) => {
									e.preventDefault();
									draggedOver = true;
								}}
								ondragleave={() => (draggedOver = false)}
								ondrop={(e) => {
									e.preventDefault();
									draggedOver = false;
									handleFiles(e.dataTransfer?.files ?? null);
								}}
								onkeydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										document.getElementById('file-input')?.click();
									}
								}}
							>
								<div class="flex flex-col items-center gap-2 text-center">
									<Upload class="text-text-secondary" size={24} />
									<Text variant="caption" class="text-text-secondary">
										{$_('form.files_helper')}
									</Text>
									<label
										class="cursor-pointer font-sans text-sm text-accent transition-colors hover:text-text-primary"
									>
										Browse files
										<input
											id="file-input"
											type="file"
											accept=".png,.jpg,.jpeg,.pdf"
											multiple
											class="hidden"
											onchange={(e) => handleFiles(e.currentTarget.files)}
										/>
									</label>
								</div>
							</div>
							{#if fileList.length > 0}
								<ul class="mt-3 space-y-2">
									{#each fileList as file, i}
										<li
											class="flex items-center justify-between border border-text-primary/10 bg-bg-primary px-3 py-2 font-sans text-sm text-text-primary"
										>
											<span class="truncate">{file.name}</span>
											<button
												type="button"
												class="text-text-secondary transition-colors hover:text-red-400"
												onclick={() => removeFile(i)}>Remove</button
											>
										</li>
									{/each}
								</ul>
							{/if}
						</div>

						<Button
							variant="secondary"
							size="lg"
							type="submit"
							disabled={status === 'submitting'}
							class="w-full !border-text-primary !bg-text-primary !text-bg-primary hover:!bg-text-primary/90"
						>
							{status === 'submitting' ? $_('form.submitting') : $_('form.submit')}
						</Button>
					</form>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.texture-overlay {
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
	}
</style>
