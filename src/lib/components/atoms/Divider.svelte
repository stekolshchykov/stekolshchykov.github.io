<script lang="ts">
	interface Props {
		weight?: 'thin' | 'default' | 'thick';
		class?: string;
	}

	let { weight = 'default', class: className = '' }: Props = $props();

	const weightClasses = {
		thin: 'border-b border-stone/12',
		default: 'border-b border-stone/20',
		thick: 'border-b-2 border-stone/30'
	};
</script>

<hr class="border-0 {weightClasses[weight]} {className}" />
