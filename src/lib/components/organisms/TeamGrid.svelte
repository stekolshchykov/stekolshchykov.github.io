<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import type { TeamMember } from '$lib/types/furniture';
	import TeamCard from '$lib/components/molecules/TeamCard.svelte';

	interface Props {
		team: TeamMember[];
	}

	let { team }: Props = $props();
	let section: HTMLElement;

	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.team-fade',
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.1,
					ease: 'power3.out',
					scrollTrigger: { trigger: section, start: 'top 75%', immediateRender: false }
				}
			);
		}, section);

		return () => ctx.revert();
	});
</script>

<section bind:this={section} class="bg-bg-primary py-16 md:py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each team as member}
				<div class="team-fade">
					<TeamCard {member} />
				</div>
			{/each}
		</div>
	</div>
</section>
