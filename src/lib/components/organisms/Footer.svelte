<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';
	import { services } from '$lib/data/services';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import Divider from '$lib/components/atoms/Divider.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Container from '$lib/components/atoms/Container.svelte';

	const currentYear = new Date().getFullYear();

	const navLinks = [
		{ href: '/en/', label: 'nav.home' },
		{ href: '/en/services/', label: 'nav.services' },
		{ href: '/en/materials/', label: 'nav.materials' },
		{ href: '/en/trade/', label: 'nav.trade' },
		{ href: '/en/projects/', label: 'nav.examples' },
		{ href: '/en/contact/', label: 'nav.contact' }
	];

	const exploreLinks = [
		{ href: '/en/process/', label: 'nav.process' },
		{ href: '/en/faq/', label: 'nav.faq' },
		{ href: '/en/privacy/', label: 'footer.privacy' },
		{ href: '/en/cookies/', label: 'footer.cookies' }
	];

	const legalLinks = [
		{ href: '/en/privacy/', label: 'footer.privacy' },
		{ href: '/en/cookies/', label: 'footer.cookies' }
	];

	const serviceLinks = services.slice(0, 7);
	const contactLinks = [
		site.email
			? {
					label: 'Email',
					value: site.email,
					href: `mailto:${site.email}`
				}
			: undefined,
		site.phone
			? {
					label: 'Phone',
					value: site.phone,
					href: `tel:${site.phone.replace(/\s/g, '')}`
				}
			: undefined,
		site.whatsapp
			? {
					label: 'WhatsApp',
					value: site.whatsapp,
					href: `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`
				}
			: undefined,
		site.address
			? {
					label: 'Address',
					value: site.address
				}
			: undefined
	].filter((item): item is { label: string; value: string; href?: string } => Boolean(item));
</script>

<footer class="border-t border-text-secondary/20 bg-bg-secondary">
	<Container class="py-20 md:py-32">
		<div class="grid gap-16 xl:grid-cols-[0.9fr_1.1fr] xl:gap-24">
			<div class="space-y-8">
				<Heading as="h2" variant="display" class="max-w-md text-4xl text-text-primary md:text-5xl">
					{$_('footer.cta_title')}
				</Heading>
				<Text variant="body-lg" class="max-w-md text-text-secondary">
						Fitted cabinetry across Ireland, shaped around the room, the brief and the way the
						space should feel.
				</Text>
				<Button variant="primary" size="md" href="/en/contact/">
					{$_('footer.cta_button')}
				</Button>
			</div>

			<div class="grid min-w-0 gap-10 sm:grid-cols-2 xl:grid-cols-4">
				<div class="min-w-0">
					<Heading
						as="h3"
						variant="sans"
						class="mb-5 text-xs uppercase tracking-[0.12em] text-text-secondary"
					>
						{$_('footer.navigation_title')}
					</Heading>
					<ul class="space-y-3">
						{#each navLinks as link}
							<li>
								<a
									href={link.href}
									class="font-sans text-text-primary/80 transition-colors duration-200 hover:text-accent"
								>
									{$_(link.label)}
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<div class="min-w-0">
					<Heading
						as="h3"
						variant="sans"
						class="mb-5 text-xs uppercase tracking-[0.12em] text-text-secondary"
					>
						{$_('footer.explore_title')}
					</Heading>
					<ul class="space-y-3">
						{#each exploreLinks as link}
							<li>
								<a
									href={link.href}
									class="font-sans text-text-primary/80 transition-colors duration-200 hover:text-accent"
								>
									{$_(link.label)}
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<div class="min-w-0">
					<Heading
						as="h3"
						variant="sans"
						class="mb-5 text-xs uppercase tracking-[0.12em] text-text-secondary"
					>
						{$_('footer.services_title')}
					</Heading>
					<ul class="space-y-3">
						{#each serviceLinks as service}
							<li>
								<a
									href="/en/services/"
									class="font-sans text-text-primary/80 transition-colors duration-200 hover:text-accent"
								>
									{service.title}
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<div class="min-w-0">
					<Heading
						as="h3"
						variant="sans"
						class="mb-5 text-xs uppercase tracking-[0.12em] text-text-secondary"
					>
						{$_('footer.contact_title')}
					</Heading>
					<ul class="space-y-3 font-sans text-text-primary/80">
						{#each contactLinks as item}
							<li>
								{#if item.href}
									<a
										href={item.href}
										class="block max-w-full break-words transition-colors duration-200 hover:text-accent"
									>
										{item.value}
									</a>
								{:else}
									<span class="block max-w-[18rem]">{item.value}</span>
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>

		<Divider class="my-16" />

		<div class="flex flex-col items-start justify-between gap-8 xl:flex-row xl:items-center">
			<Text variant="caption" class="text-center text-text-secondary md:text-left">
				© {currentYear}
				{site.brand}. {$_('footer.rights')}
			</Text>

			<div class="flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between xl:w-auto xl:justify-end">
				<nav
					aria-label="Legal links"
					class="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-[11px] uppercase tracking-[0.12em] text-text-secondary"
				>
					{#each legalLinks as link, i}
						<a href={link.href} class="transition-colors duration-200 hover:text-accent">
							{$_(link.label)}
						</a>
						{#if i < legalLinks.length - 1}
							<span class="h-px w-4 bg-text-secondary/30" aria-hidden="true"></span>
						{/if}
					{/each}
				</nav>

				<div class="flex items-center gap-2">
					{#each site.social as social}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							class="flex h-9 w-9 items-center justify-center border border-text-primary/10 text-text-secondary transition-colors duration-200 hover:border-accent/60 hover:text-accent"
							aria-label={social.platform}
						>
							{#if social.platform === 'Instagram'}
								<svg
									class="h-5 w-5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
								>
									<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
									<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
									<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
								</svg>
							{:else if social.platform === 'Pinterest'}
								<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path
										d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"
									/>
								</svg>
							{:else if social.platform === 'LinkedIn'}
								<svg
									class="h-5 w-5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
								>
									<path
										d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
									></path>
									<rect x="2" y="9" width="4" height="12"></rect>
									<circle cx="4" cy="4" r="2"></circle>
								</svg>
							{:else}
								<span class="font-sans text-sm">{social.platform}</span>
							{/if}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</Container>
</footer>
