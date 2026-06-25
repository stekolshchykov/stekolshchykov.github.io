<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Eyebrow from '$lib/components/atoms/Eyebrow.svelte';
	import Heading from '$lib/components/atoms/Heading.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Image from '$lib/components/atoms/Image.svelte';

	let section: HTMLElement;

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.brand-fade',
				{ y: 48, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.9,
					stagger: 0.15,
					ease: 'power3.out',
					scrollTrigger: { trigger: section, start: 'top 75%', immediateRender: false }
				}
			);
		}, section);

		return () => ctx.revert();
	});
</script>

<section bind:this={section} class="bg-bg-primary py-20 md:py-32 lg:py-40">
	<div class="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
		<div class="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
			<div class="space-y-8 lg:py-8">
				<Eyebrow text={$_('home.intro_eyebrow')} class="brand-fade" />
				<Heading
					as="h2"
					variant="serif"
					class="brand-fade text-3xl text-text-primary md:text-4xl lg:text-5xl"
				>
					{$_('home.intro_headline')}
				</Heading>
				<Text variant="body-lg" class="brand-fade max-w-[65ch] text-text-secondary">
					{$_('home.intro_body')}
				</Text>
				<div class="brand-fade pt-2">
					<Button variant="secondary" href="/en/about/">
						{$_('home.intro_cta')}
					</Button>
				</div>
			</div>
			<div class="brand-fade space-y-8">
				<div class="relative">
					<Image
						src="/images/generated/workshop-makers.webp"
						alt="Áras Living makers reviewing walnut joinery and brass details in the workshop"
						class="aspect-[4/5] w-full object-cover"
						objectPosition="center"
					/>
					<div
						class="absolute -bottom-8 right-0 hidden w-[46%] border border-text-primary/12 bg-bg-primary p-2 shadow-2xl shadow-black/35 md:block"
						aria-hidden="true"
					>
						<img
							src="/images/generated/material-detail.webp"
							alt=""
							class="aspect-[4/3] w-full object-cover"
							loading="lazy"
						/>
					</div>
				</div>
				<blockquote class="border-l border-accent pl-6">
					<p class="font-serif text-2xl font-light leading-snug text-text-primary md:text-3xl">
						{$_('home.intro_quote')}
					</p>
				</blockquote>
			</div>
		</div>
	</div>
</section>
