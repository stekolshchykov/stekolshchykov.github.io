<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ArrowRight } from 'lucide-svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'outline-stone' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		onclick?: (e: MouseEvent) => void;
		href?: string;
		children: Snippet;
		class?: string;
	}

	let {
		variant = 'primary',
		size = 'md',
		type = 'button',
		disabled = false,
		onclick,
		href,
		children,
		class: className = ''
	}: Props = $props();

	const baseClasses =
		'group/luxury-button relative isolate inline-flex items-center justify-center overflow-hidden whitespace-nowrap font-sans font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:pointer-events-none disabled:opacity-50';

	const variantClasses = {
		primary:
			'rounded-none bg-accent text-sm font-medium uppercase tracking-[0.06em] text-bg-primary shadow-[0_0_0_1px_rgba(196,149,106,0.2),0_18px_48px_rgba(196,149,106,0.16)] hover:-translate-y-px hover:bg-[#D4A57A] hover:shadow-[0_0_0_1px_rgba(212,165,122,0.32),0_24px_70px_rgba(196,149,106,0.24)] active:scale-[0.97]',
		secondary:
			'border border-text-primary/50 bg-transparent text-text-primary hover:border-accent/70 hover:bg-text-primary/[0.08] hover:text-accent',
		'outline-stone':
			'border border-stone/70 bg-transparent text-text-primary hover:border-accent hover:text-accent',
		ghost: 'group relative inline-flex items-center gap-2 text-text-primary underline-offset-4'
	};

	const sizeClasses = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg'
	};

	let classes = $derived(
		`${baseClasses} ${variant === 'ghost' ? '' : sizeClasses[size]} ${variantClasses[variant]} ${className}`
	);
</script>

{#snippet content()}
	{#if variant !== 'ghost'}
		<span
			class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(115deg,transparent_0%,transparent_36%,rgba(240,235,227,0.32)_48%,transparent_60%,transparent_100%)] opacity-0 -translate-x-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/luxury-button:translate-x-full group-hover/luxury-button:opacity-100"
			aria-hidden="true"
		></span>
		<span
			class="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-text-primary/45 to-transparent opacity-0 transition-opacity duration-300 group-hover/luxury-button:opacity-100"
			aria-hidden="true"
		></span>
	{/if}
	{@render children()}
	{#if href && variant !== 'ghost'}
		<ArrowRight
			class="ml-3 h-4 w-4 transition-transform duration-300 group-hover/luxury-button:translate-x-1"
			aria-hidden="true"
		/>
	{/if}
	{#if variant === 'ghost'}
		<ArrowRight
			class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
			aria-hidden="true"
		/>
		<span
			class="absolute bottom-0 left-0 h-px w-0 bg-text-primary transition-all duration-300 group-hover:w-full"
		></span>
	{/if}
{/snippet}

{#if href}
	<a {href} class={classes}>
		{@render content()}
	</a>
{:else}
	<button {type} {disabled} {onclick} class={classes}>
		{@render content()}
	</button>
{/if}
