<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { site } from '$lib/data/site';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import { Mail, MapPin, MessageCircle, Phone } from 'lucide-svelte';

	let section: HTMLElement;

	const items: {
		label: string;
		value: string;
		href?: string;
	}[] = [
		{
			label: 'contact.email_label',
			value: site.email,
			href: `mailto:${site.email}`
		},
		{
			label: 'contact.phone_label',
			value: site.phone,
			href: `tel:${site.phone.replace(/\s/g, '')}`
		},
		{
			label: 'contact.whatsapp_label',
			value: site.whatsapp,
			href: `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`
		},
		{
			label: 'contact.address_label',
			value: site.address
		}
	];

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.contact-fade',
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.12,
					ease: 'power3.out',
					scrollTrigger: { trigger: section, start: 'top 75%', immediateRender: false }
				}
			);
		}, section);

		return () => ctx.revert();
	});
</script>

<div bind:this={section}>
	<div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
		<div class="space-y-6">
			<Heading as="h2" variant="serif" class="contact-fade text-3xl text-text-primary md:text-4xl">
				{$_('contact.info_headline')}
			</Heading>
			<Text variant="body-lg" class="contact-fade max-w-md text-text-secondary">
				{$_('contact.info_subheadline')}
			</Text>
			<div class="contact-fade pt-4">
				<Button
					variant="secondary"
					size="lg"
					href="/en/contact/"
					class="!border-text-primary !text-text-primary hover:!bg-text-primary/10"
				>
					{$_('nav.discuss_project')}
				</Button>
			</div>
		</div>

		<div class="contact-fade">
			{#each items as item}
				<div
					class="group grid grid-cols-[40px_minmax(0,1fr)] gap-5 border-b border-border py-6 transition-colors duration-300 first:border-t hover:border-accent/45 md:grid-cols-[minmax(0,1fr)_40px] md:text-right"
				>
					<div
						class="flex h-10 w-10 items-center justify-center border border-text-primary/10 text-accent transition-colors duration-300 group-hover:border-accent/60 md:order-2"
						aria-hidden="true"
					>
						{#if item.label === 'contact.email_label'}
							<Mail class="h-4 w-4" />
						{:else if item.label === 'contact.phone_label'}
							<Phone class="h-4 w-4" />
						{:else if item.label === 'contact.whatsapp_label'}
							<MessageCircle class="h-4 w-4" />
						{:else}
							<MapPin class="h-4 w-4" />
						{/if}
					</div>
					<div class="min-w-0">
						<p
							class="mb-1 font-sans text-xs font-medium uppercase tracking-widest text-text-secondary"
						>
							{$_(item.label)}
						</p>
						{#if item.href}
							<a
								href={item.href}
								target={item.href.startsWith('http') ? '_blank' : undefined}
								rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
								class="break-words font-sans text-lg text-text-primary transition-colors hover:text-accent"
							>
								{item.value}
							</a>
						{:else}
							<p class="font-sans text-lg text-text-primary">{item.value}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
