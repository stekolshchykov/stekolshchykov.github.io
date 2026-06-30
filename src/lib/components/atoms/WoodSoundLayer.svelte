<script lang="ts">
	import { onMount } from 'svelte';

	const SOUND_COUNT = 30;
	const SOUND_PATHS = Array.from(
		{ length: SOUND_COUNT },
		(_, index) => `/audio/wood/wood-${String(index + 1).padStart(2, '0')}.wav`
	);

	const INTERACTIVE_SELECTOR = [
		'a[href]',
		'button:not([disabled])',
		'input:not([disabled])',
		'textarea:not([disabled])',
		'select:not([disabled])',
		'[role="button"]',
		'[data-wood-sound]',
		'.luxury-corners',
		'.luxury-surface'
	].join(',');

	const AudioContextCtor = () =>
		window.AudioContext ??
		(window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

	let context: AudioContext | null = null;
	let master: GainNode | null = null;
	let buffers: AudioBuffer[] = [];
	let loadPromise: Promise<void> | null = null;
	let unlocked = false;
	let hoverIndex = 0;
	let clickIndex = 11;
	let focusIndex = 22;
	let lastGlobalPlay = 0;
	const lastElementPlay = new WeakMap<Element, number>();

	function shouldSkipAudio() {
		return (
			typeof window === 'undefined' ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
			('connection' in navigator &&
				Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData))
		);
	}

	function createContext() {
		if (context) return context;
		const Ctor = AudioContextCtor();
		if (!Ctor) return null;
		context = new Ctor();
		master = context.createGain();
		master.gain.value = 0.24;
		master.connect(context.destination);
		return context;
	}

	function loadSounds() {
		if (loadPromise) return loadPromise;
		const audio = createContext();
		if (!audio) return Promise.resolve();

		loadPromise = Promise.all(
			SOUND_PATHS.map(async (path) => {
				const response = await fetch(path);
				const data = await response.arrayBuffer();
				return audio.decodeAudioData(data);
			})
		)
			.then((decoded) => {
				buffers = decoded;
			})
			.catch(() => {
				buffers = [];
			});

		return loadPromise;
	}

	function findInteractive(target: EventTarget | null) {
		if (!(target instanceof Element)) return null;
		return target.closest(INTERACTIVE_SELECTOR);
	}

	function chooseVariant(kind: 'hover' | 'click' | 'focus') {
		if (kind === 'click') {
			clickIndex = (clickIndex + 7) % SOUND_COUNT;
			return clickIndex;
		}
		if (kind === 'focus') {
			focusIndex = (focusIndex + 5) % SOUND_COUNT;
			return focusIndex;
		}
		hoverIndex = (hoverIndex + 3) % SOUND_COUNT;
		return hoverIndex;
	}

	function play(kind: 'hover' | 'click' | 'focus', element: Element) {
		const now = performance.now();
		const elementLast = lastElementPlay.get(element) ?? 0;
		const minGap = kind === 'hover' ? 180 : 80;
		if (now - elementLast < minGap || now - lastGlobalPlay < 38) return;
		lastElementPlay.set(element, now);
		lastGlobalPlay = now;

		const audio = createContext();
		if (!audio || !master || !unlocked || buffers.length === 0) return;

		const buffer = buffers[chooseVariant(kind)];
		if (!buffer) return;

		const source = audio.createBufferSource();
		const gain = audio.createGain();
		const filter = audio.createBiquadFilter();
		const start = audio.currentTime;
		const level = kind === 'click' ? 0.46 : kind === 'focus' ? 0.22 : 0.16;

		source.buffer = buffer;
		source.playbackRate.value = kind === 'click' ? 0.94 + Math.random() * 0.18 : 0.9 + Math.random() * 0.24;
		filter.type = 'lowpass';
		filter.frequency.value = kind === 'click' ? 2400 : 1900;
		gain.gain.setValueAtTime(0.0001, start);
		gain.gain.exponentialRampToValueAtTime(level, start + 0.012);
		gain.gain.exponentialRampToValueAtTime(0.0001, start + buffer.duration + 0.05);

		source.connect(filter);
		filter.connect(gain);
		gain.connect(master);
		source.start(start);
		source.stop(start + buffer.duration + 0.08);
	}

	async function unlockAndPlay(event: PointerEvent | KeyboardEvent) {
		const element = findInteractive(event.target);
		if (!element) return;
		const audio = createContext();
		if (!audio) return;
		const soundsReady = loadSounds();
		await audio.resume();
		unlocked = true;

		if (buffers.length === 0) {
			void soundsReady.then(() => {
				play('click', element);
			});
			return;
		}

		play('click', element);
	}

	function handlePointerOver(event: PointerEvent) {
		if (!unlocked || event.pointerType === 'touch') return;
		const element = findInteractive(event.target);
		if (!element) return;
		if (event.relatedTarget instanceof Node && element.contains(event.relatedTarget)) return;
		if (buffers.length === 0) {
			void loadSounds();
			return;
		}
		play('hover', element);
	}

	function handleFocusIn(event: FocusEvent) {
		const element = findInteractive(event.target);
		if (!element) return;
		if (!unlocked) return;
		if (buffers.length === 0) {
			void loadSounds();
			return;
		}
		play('focus', element);
	}

	onMount(() => {
		if (shouldSkipAudio()) return;

		document.addEventListener('pointerdown', unlockAndPlay, { capture: true });
		document.addEventListener('keydown', unlockAndPlay, { capture: true });
		document.addEventListener('pointerover', handlePointerOver, { capture: true });
		document.addEventListener('focusin', handleFocusIn, { capture: true });

		return () => {
			document.removeEventListener('pointerdown', unlockAndPlay, { capture: true });
			document.removeEventListener('keydown', unlockAndPlay, { capture: true });
			document.removeEventListener('pointerover', handlePointerOver, { capture: true });
			document.removeEventListener('focusin', handleFocusIn, { capture: true });
			void context?.close();
		};
	});
</script>

<span class="hidden" data-wood-sound-layer aria-hidden="true"></span>
