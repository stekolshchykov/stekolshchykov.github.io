<script lang="ts">
	import { Play, Pause } from 'lucide-svelte';
	import { cx } from '$lib/utils/helpers';

	interface Props {
		src: string;
		poster?: string;
		class?: string;
		autoplay?: boolean;
		loop?: boolean;
		muted?: boolean;
	}

	let {
		src,
		poster,
		class: className = '',
		autoplay = false,
		loop = true,
		muted = true
	}: Props = $props();

	let videoEl = $state<HTMLVideoElement | null>(null);
	let playing = $state(false);

	$effect(() => {
		if (autoplay && videoEl) {
			void videoEl.play();
		}
	});

	function toggle() {
		if (!videoEl) return;
		if (videoEl.paused) {
			void videoEl.play();
		} else {
			videoEl.pause();
		}
	}
</script>

<div class={cx('group relative overflow-hidden bg-bg-secondary', className)}>
	<video
		bind:this={videoEl}
		{src}
		{poster}
		{autoplay}
		{loop}
		{muted}
		playsinline
		preload="metadata"
		class="h-full w-full object-cover"
		onplay={() => (playing = true)}
		onpause={() => (playing = false)}
	>
		<track kind="captions" src="" label="No captions" default />
	</video>

	<button
		type="button"
		onclick={toggle}
		class={cx(
			'absolute inset-0 flex items-center justify-center bg-bg-primary/20 transition-opacity duration-300',
			playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
		)}
		aria-label={playing ? 'Pause video' : 'Play video'}
	>
		<span
			class="flex h-16 w-16 items-center justify-center rounded-full bg-bg-primary/80 text-text-primary backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
		>
			{#if playing}
				<Pause size={28} />
			{:else}
				<Play size={28} class="ml-1" />
			{/if}
		</span>
	</button>
</div>
