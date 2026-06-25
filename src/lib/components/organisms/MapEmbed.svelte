<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { env } from '$env/dynamic/public';

	let section: HTMLElement;

	const embedUrl =
		env.PUBLIC_MAPS_EMBED_URL ??
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152515.3659542664!2d-6.410509143382592!3d53.32441163058637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e80ea27ac2f%3A0xa00c7a9973171a0!2sDublin!5e0!3m2!1sen!2sie!4v1700000000000!5m2!1sen!2sie';

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.map-fade',
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.9,
					ease: 'power3.out',
					scrollTrigger: { trigger: section, start: 'top 75%', immediateRender: false }
				}
			);
		}, section);

		return () => ctx.revert();
	});
</script>

<section bind:this={section} class="bg-bg-secondary">
	<div class="map-fade h-[420px] w-full grayscale md:h-[500px]">
		<iframe
			title={$_('contact.map_label')}
			src={embedUrl}
			width="100%"
			height="100%"
			style="border:0"
			allowfullscreen={true}
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>
	</div>
</section>
