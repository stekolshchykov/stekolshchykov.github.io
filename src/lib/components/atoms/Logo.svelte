<script lang="ts">
	interface Props {
		variant?: 'light' | 'dark';
		mode?: 'wordmark' | 'monogram';
		class?: string;
	}

	let { variant = 'dark', mode = 'wordmark', class: className = '' }: Props = $props();

	const textColor = $derived(variant === 'light' ? '#f5f3ef' : '#0a0a0f');
</script>

{#if mode === 'monogram'}
	<svg
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="block h-auto w-full {className}"
		aria-label="Áras Living"
		role="img"
	>
		<text
			x="16"
			y="23"
			fill={textColor}
			font-family="Cormorant Garamond, ui-serif, Georgia, serif"
			font-size="22"
			font-weight="500"
			letter-spacing="0"
			text-anchor="middle"
		>
			Á
		</text>
	</svg>
{:else}
	<svg
		viewBox="0 0 160 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="block h-auto w-full {className}"
		aria-label="Áras Living"
		role="img"
	>
		<text
			x="0"
			y="18"
			fill={textColor}
			font-family="Cormorant Garamond, ui-serif, Georgia, serif"
			font-size="20"
			font-weight="500"
			letter-spacing="0.02em"
		>
			Áras Living
		</text>
	</svg>
{/if}
