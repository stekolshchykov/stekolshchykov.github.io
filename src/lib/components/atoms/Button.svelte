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
		'inline-flex items-center justify-center whitespace-nowrap font-sans font-medium tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:pointer-events-none disabled:opacity-50';

	const variantClasses = {
		primary:
			'rounded-none bg-accent text-sm font-medium uppercase tracking-[0.06em] text-bg-primary transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-px hover:bg-[#D4A57A] active:scale-[0.97]',
		secondary:
			'border border-text-primary bg-transparent text-text-primary hover:bg-text-primary/[0.08]',
		'outline-stone': 'border border-stone bg-transparent text-text-primary hover:border-accent',
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
	{@render children()}
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
