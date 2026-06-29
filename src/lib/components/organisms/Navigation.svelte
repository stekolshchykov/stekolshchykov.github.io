<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import { Menu, X } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import Logo from '$lib/components/atoms/Logo.svelte';
	import Button from '$lib/components/atoms/Button.svelte';

	let mobileOpen = $state(false);
	let scrolled = $state(false);
	let hidden = $state(false);
	let lastScrollY = $state(0);

	const primaryLinks = [
		{ href: '/en/', label: 'nav.home' },
		{ href: '/en/services/', label: 'nav.services' },
		{ href: '/en/materials/', label: 'nav.materials' },
		{ href: '/en/trade/', label: 'nav.trade' },
		{ href: '/en/projects/', label: 'nav.examples' },
		{ href: '/en/contact/', label: 'nav.contact' }
	];

	function toggleMenu() {
		mobileOpen = !mobileOpen;
	}

	function closeMenu() {
		mobileOpen = false;
	}

	function isActive(href: string) {
		const path = $page.url.pathname;
		if (href === '/en/') return path === '/en/' || path === '/';
		return path.startsWith(href);
	}

	onMount(() => {
		const onScroll = () => {
			const y = window.scrollY;
			scrolled = y > 24;
			hidden = y > lastScrollY && y > 120;
			lastScrollY = y;
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<header
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out {scrolled
		? 'bg-bg-primary/95 backdrop-blur-sm shadow-sm'
		: 'bg-bg-primary/0'} {hidden ? '-translate-y-full' : 'translate-y-0'}"
>
	<div class="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-12 lg:px-16">
		<a href="/en/" class="relative z-50">
			<Logo variant="light" class="h-8 w-auto md:h-9 xl:h-7" />
		</a>

		<nav class="hidden items-center gap-8 xl:flex" aria-label="Primary">
			{#each primaryLinks as link}
				<a
					href={link.href}
					class="relative font-sans text-[14px] uppercase tracking-[0.04em] text-text-primary/80 transition-colors duration-200 hover:text-accent {isActive(
						link.href
					)
						? 'text-accent'
						: ''}"
				>
					{$_(link.label)}
					{#if isActive(link.href)}
						<span
							class="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
							aria-hidden="true"
						></span>
					{/if}
				</a>
			{/each}
		</nav>

		<div class="hidden xl:block">
			<Button variant="primary" size="sm" href="/en/contact/">
				{$_('nav.discuss_project')}
			</Button>
		</div>

		<button
			type="button"
			class="relative z-50 inline-flex items-center justify-center p-2 text-text-primary xl:hidden"
			onclick={toggleMenu}
			aria-expanded={mobileOpen}
			aria-controls="mobile-menu"
			aria-label={mobileOpen ? $_('nav.menu_close') : $_('nav.menu_open')}
		>
			{#if mobileOpen}
				<X size={24} />
			{:else}
				<Menu size={24} />
			{/if}
		</button>
	</div>
</header>

{#if mobileOpen}
	<div
		id="mobile-menu"
		class="fixed inset-0 z-40 flex flex-col bg-bg-primary px-6 pt-24 xl:hidden"
		transition:fly={{ y: -20, duration: 400 }}
	>
		<nav class="flex flex-col gap-2" aria-label="Mobile">
			{#each primaryLinks as link, i}
				<a
					href={link.href}
					class="font-serif text-4xl font-light text-text-primary transition-colors duration-200 hover:text-accent {isActive(
						link.href
					)
						? 'text-accent'
						: ''}"
					onclick={closeMenu}
					transition:fly={{ y: 20, delay: 100 + i * 60, duration: 400 }}
				>
					{$_(link.label)}
				</a>
			{/each}

		</nav>

		<div class="mt-auto pb-12">
			<a
				href="/en/contact/"
				class="inline-flex items-center gap-3 font-sans text-[14px] uppercase tracking-[0.08em] text-text-secondary transition-colors duration-200 hover:text-accent"
				onclick={closeMenu}
			>
				{$_('nav.discuss_project')}
				<span aria-hidden="true">→</span>
			</a>
		</div>
	</div>
{/if}
