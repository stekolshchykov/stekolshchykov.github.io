<script lang="ts">
	interface VideoSource {
		src: string;
		type: string;
	}

	interface Props {
		src?: string;
		sources?: VideoSource[];
		poster?: string;
		autoplay?: boolean;
		muted?: boolean;
		loop?: boolean;
		playsinline?: boolean;
		preload?: 'none' | 'metadata' | 'auto';
		fetchpriority?: 'high' | 'low' | 'auto';
		ariaHidden?: boolean;
		class?: string;
	}

	let {
		src,
		sources = [],
		poster,
		autoplay = true,
		muted = true,
		loop = true,
		playsinline = true,
		preload = 'metadata',
		fetchpriority,
		ariaHidden,
		class: className = ''
	}: Props = $props();

	let videoRef = $state<HTMLVideoElement | null>(null);

	$effect(() => {
		const video = videoRef;
		if (!video || typeof IntersectionObserver === 'undefined') return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						video.play().catch(() => {});
					} else {
						video.pause();
					}
				});
			},
			{ threshold: 0.1 }
		);

		observer.observe(video);

		return () => {
			observer.disconnect();
		};
	});

	$effect(() => {
		if (videoRef && fetchpriority) {
			videoRef.setAttribute('fetchpriority', fetchpriority);
		}
	});
</script>

<video
	bind:this={videoRef}
	{poster}
	{autoplay}
	{muted}
	{loop}
	playsinline
	{preload}
	aria-hidden={ariaHidden ? true : undefined}
	class="block h-full w-full object-cover {className}"
>
	{#if src}
		<source {src} type="video/mp4" />
	{/if}
	{#each sources as source (source.src)}
		<source src={source.src} type={source.type} />
	{/each}
</video>
