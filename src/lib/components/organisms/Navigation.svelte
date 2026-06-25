<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import { Menu, X, ChevronDown } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import Logo from '$lib/components/atoms/Logo.svelte';
	import Button from '$lib/components/atoms/Button.svelte';

	let mobileOpen = $state(false);
	let scrolled = $state(false);
	let hidden = $state(false);
	let lastScrollY = $state(0);
	let studioOpen = $state(false);
	let studioTimer: ReturnType<typeof setTimeout> | null = null;

	const primaryLinks = [
		{ href: '/en/', label: 'nav.home' },
		{ href: '/en/services/', label: 'nav.services' },
		{ href: '/en/projects/', label: 'nav.projects' },
		{ href: '/en/materials/', label: 'nav.materials' },
		{ href: '/en/insights/', label: 'nav.insights' },
		{ href: '/en/contact/', label: 'nav.contact' }
	];

	const studioLinks = [
		{ href: '/en/about/', label: 'nav.about' },
		{ href: '/en/process/', label: 'nav.process' },
		{ href: '/en/showroom/', label: 'nav.showroom' },
		{ href: '/en/commercial/', label: 'nav.commercial' },
		{ href: '/en/faq/', label: 'nav.faq' }
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

	const studioActive = $derived(studioLinks.some((link) => isActive(link.href)));

	function openStudio() {
		if (studioTimer) clearTimeout(studioTimer);
		studioOpen = true;
	}

	function closeStudio() {
		studioTimer = setTimeout(() => {
			studioOpen = false;
		}, 150);
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

			<div
				class="relative"
				role="group"
				aria-label="Studio menu"
				onmouseenter={openStudio}
				onmouseleave={closeStudio}
			>
				<button
					type="button"
					class="relative flex items-center gap-1 font-sans text-[14px] uppercase tracking-[0.04em] transition-colors duration-200 hover:text-accent {studioActive
						? 'text-accent'
						: 'text-text-primary/80'}"
					aria-expanded={studioOpen}
					aria-haspopup="true"
					onclick={() => (studioOpen = !studioOpen)}
				>
					Studio
					<ChevronDown
						size={14}
						class="transition-transform duration-200 {studioOpen ? 'rotate-180' : ''}"
					/>
					{#if studioActive}
						<span
							class="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
							aria-hidden="true"
						></span>
					{/if}
				</button>

				{#if studioOpen}
					<div
						class="absolute top-full left-1/2 z-50 mt-3 w-52 -translate-x-1/2 border border-border bg-bg-secondary/95 py-2 shadow-xl backdrop-blur"
						transition:fly={{ y: -8, duration: 200 }}
					>
						{#each studioLinks as link}
							<a
								href={link.href}
								class="block px-5 py-2.5 font-sans text-sm text-text-primary/80 transition-colors hover:bg-white/5 hover:text-accent {isActive(
									link.href
								)
									? 'text-accent'
									: ''}"
							>
								{$_(link.label)}
							</a>
						{/each}
					</div>
				{/if}
			</div>
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

			<div class="my-4 h-px bg-text-primary/10" role="separator"></div>

			<p class="font-sans text-xs uppercase tracking-[0.2em] text-text-secondary">Studio</p>
			{#each studioLinks as link, i}
				<a
					href={link.href}
					class="pl-2 font-serif text-2xl font-light text-text-primary transition-colors duration-200 hover:text-accent {isActive(
						link.href
					)
						? 'text-accent'
						: ''}"
					onclick={closeMenu}
					transition:fly={{ y: 20, delay: 100 + (primaryLinks.length + i) * 60, duration: 400 }}
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
