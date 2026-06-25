<script lang="ts">
	import {
		Home,
		Building2,
		Upload,
		X,
		Check,
		Menu,
		ArrowRight,
		ArrowLeft,
		ArrowUpRight,
		ChevronDown,
		ChevronUp,
		ChevronLeft,
		ChevronRight,
		Phone,
		Mail,
		MapPin,
		Clock,
		Plus,
		Minus,
		Trash2,
		FileText,
		Image as ImageIcon,
		Play,
		Pause,
		Volume2,
		VolumeX,
		Maximize,
		Minimize,
		Search,
		ExternalLink,
		Quote,
		Star,
		Gem,
		Wrench,
		Ruler,
		Paintbrush,
		Hammer,
		XCircle,
		CheckCircle,
		AlertCircle,
		Info
	} from 'lucide-svelte';

	interface Props {
		name: string;
		size?: number;
		strokeWidth?: number;
		class?: string;
	}

	let { name, size = 24, strokeWidth = 2, class: className = '' }: Props = $props();

	const iconMap: Record<string, typeof Home> = {
		home: Home,
		house: Home,
		residential: Home,
		'building-2': Building2,
		building: Building2,
		commercial: Building2,
		upload: Upload,
		x: X,
		close: X,
		check: Check,
		menu: Menu,
		'arrow-right': ArrowRight,
		'arrow-left': ArrowLeft,
		'arrow-up-right': ArrowUpRight,
		'chevron-down': ChevronDown,
		'chevron-up': ChevronUp,
		'chevron-left': ChevronLeft,
		'chevron-right': ChevronRight,
		phone: Phone,
		mail: Mail,
		email: Mail,
		'map-pin': MapPin,
		location: MapPin,
		clock: Clock,
		plus: Plus,
		minus: Minus,
		'trash-2': Trash2,
		trash: Trash2,
		remove: Trash2,
		'file-text': FileText,
		file: FileText,
		image: ImageIcon,
		play: Play,
		pause: Pause,
		'volume-2': Volume2,
		'volume-x': VolumeX,
		mute: VolumeX,
		maximize: Maximize,
		minimize: Minimize,
		search: Search,
		'external-link': ExternalLink,
		quote: Quote,
		star: Star,
		gem: Gem,
		wrench: Wrench,
		ruler: Ruler,
		paintbrush: Paintbrush,
		hammer: Hammer,
		'x-circle': XCircle,
		'check-circle': CheckCircle,
		'alert-circle': AlertCircle,
		info: Info
	};

	const IconComponent = $derived(iconMap[name.toLowerCase()]);
</script>

{#if IconComponent}
	<IconComponent {size} {strokeWidth} class={className} />
{:else}
	<span class="inline-block {className}" style="width: {size}px; height: {size}px;"></span>
{/if}
