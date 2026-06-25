<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { Service } from '$lib/types/furniture';
	import ServiceCard from '$lib/components/molecules/ServiceCard.svelte';

	interface Props {
		services: Service[];
		id?: string;
	}

	let { services, id }: Props = $props();
	let section: HTMLElement;

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.service-list-fade',
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

<div {id} bind:this={section}>
	<div class="space-y-14 md:space-y-16">
		{#each services as service}
			<div class="service-list-fade">
				<ServiceCard {service} variant="horizontal" />
			</div>
		{/each}
	</div>
</div>
