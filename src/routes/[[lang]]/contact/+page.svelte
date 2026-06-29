<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { site } from '$lib/data/site';

	import Section from '$lib/components/atoms/Section.svelte';
	import SectionHeader from '$lib/components/atoms/SectionHeader.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Textarea from '$lib/components/atoms/Textarea.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import SeoHead from '$lib/components/molecules/SeoHead.svelte';
	import PageHeroSection from '$lib/components/organisms/PageHeroSection.svelte';
	import ContactInfoSection from '$lib/components/organisms/ContactInfoSection.svelte';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let projectType = $state('');
	let location = $state('');
	let timeline = $state('');
	let budget = $state('');
	let message = $state('');
	let honeypot = $state('');
	let files = $state<FileList | null>(null);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (honeypot) return;
		const fileSummary =
			files && files.length > 0
				? Array.from(files)
						.slice(0, 5)
						.map((file) => file.name)
						.join(', ')
				: 'No files selected';
		const body = encodeURIComponent(
			`Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Optional / not provided'}\nProject type: ${projectType}\nLocation: ${location}\nTimeline: ${timeline}\nBudget: ${budget || 'Not provided'}\nFiles selected: ${fileSummary}\n\nMessage:\n${message}\n\nNote: files selected on the site are not attached to this email draft. Please attach plans, photos or drawings before sending if relevant.`
		);
		window.location.href = `mailto:${site.email}?subject=Project enquiry&body=${body}`;
	}
</script>

<svelte:head>
	<title>{$_('contact.meta_title')}</title>
	<meta name="description" content={$_('contact.meta_description')} />
	<meta property="og:title" content={$_('contact.meta_title')} />
	<meta property="og:description" content={$_('contact.meta_description')} />
	<meta property="og:image" content="{site.seo.siteUrl}/og-contact.jpg" />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="{site.seo.siteUrl}/contact/" />
</svelte:head>

<SeoHead
	title={$_('contact.meta_title')}
	description={$_('contact.meta_description')}
	image="{site.seo.siteUrl}/og-contact.jpg"
	type="website"
	canonical="{site.seo.siteUrl}/contact/"
/>

<PageHeroSection
	eyebrow={$_('contact.hero_eyebrow')}
	headline={$_('contact.hero_headline')}
	subheadline={$_('contact.hero_subheadline')}
	image="/images/contact-hero.jpg"
	height="medium"
	alignment="center"
/>

<Section>
	<ContactInfoSection />
</Section>

<Section tone="secondary">
	<div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
		<SectionHeader
			eyebrow="Project Enquiry"
			headline="Tell us what you are planning."
			statement="Share the room, project type, location, timeline and any drawings or photos you already have. This launch form opens an email draft; attach selected files before sending if relevant."
			class="mb-0"
		/>
		<form onsubmit={handleSubmit} class="space-y-8">
			<input
				type="text"
				name="website"
				bind:value={honeypot}
				tabindex="-1"
				autocomplete="off"
				class="hidden"
				aria-hidden="true"
			/>
			<div class="grid gap-6 md:grid-cols-2">
				<Input name="name" label="Name" required bind:value={name} />
				<Input name="email" type="email" label="Email" required bind:value={email} />
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				<Input name="phone" label="Phone optional" bind:value={phone} />
				<Input name="projectType" label="Project type" required bind:value={projectType} />
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				<Input name="location" label="Location in Ireland" required bind:value={location} />
				<Input name="timeline" label="Timeline" required bind:value={timeline} />
			</div>
			<Input name="budget" label="Approximate budget, if you have one" bind:value={budget} />
			<Textarea name="message" label="Message" required bind:value={message} />
			<div>
				<label for="contact-files" class="mb-2 block font-sans text-sm text-text-secondary">
					Upload plans/photos optional
				</label>
				<input
					id="contact-files"
					name="files"
					type="file"
					multiple
					accept=".pdf,.jpg,.jpeg,.png,.dwg,.dxf"
					onchange={(e) => (files = e.currentTarget.files)}
					class="block w-full border-b border-text-secondary/30 bg-transparent py-4 font-sans text-sm text-text-primary file:mr-4 file:border-0 file:bg-accent file:px-4 file:py-2 file:font-sans file:text-xs file:uppercase file:tracking-[0.08em] file:text-bg-primary"
				/>
				<p class="mt-2 font-sans text-xs leading-relaxed text-text-secondary">
					PDF, JPG, PNG, DWG/CAD where possible. Up to 20MB per file and 5 files recommended.
				</p>
			</div>
			<Button variant="primary" type="submit">Discuss a Project</Button>
		</form>
	</div>
</Section>

<Section tone="secondary" container="content">
	<div class="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
		<SectionHeader
			eyebrow="Before we meet"
			headline="A useful first conversation starts with context."
			statement="You do not need finished drawings before getting in touch. A few photographs, approximate dimensions, and a sense of what is not working in the room are enough for us to shape the next step."
			class="mb-0"
		/>
		<div class="grid gap-6 md:grid-cols-3">
			<div class="border-t border-text-primary/10 pt-5">
				<p class="mb-3 font-serif text-2xl text-accent">01</p>
				<h2 class="mb-3 font-sans text-xs uppercase tracking-[0.15em] text-text-primary">
					Send the room
				</h2>
				<p class="font-sans text-sm leading-relaxed text-text-secondary">
					Photos, a rough plan, ceiling height, and any awkward corners help us understand the
					scope before the site survey.
				</p>
			</div>
			<div class="border-t border-text-primary/10 pt-5">
				<p class="mb-3 font-serif text-2xl text-accent">02</p>
				<h2 class="mb-3 font-sans text-xs uppercase tracking-[0.15em] text-text-primary">
					Share the routine
				</h2>
				<p class="font-sans text-sm leading-relaxed text-text-secondary">
					Tell us how the room is used now, what feels frustrating, what must be stored, and how
					you want the space to feel.
				</p>
			</div>
			<div class="border-t border-text-primary/10 pt-5">
				<p class="mb-3 font-serif text-2xl text-accent">03</p>
				<h2 class="mb-3 font-sans text-xs uppercase tracking-[0.15em] text-text-primary">
					Agree the next step
				</h2>
				<p class="font-sans text-sm leading-relaxed text-text-secondary">
					After the first message we confirm whether a site measure, material consultation, trade
					briefing session or further specification work is the right path.
				</p>
			</div>
		</div>
	</div>
</Section>
