import { prefersReducedMotion } from '$lib/utils/motion';

type SectionRevealParams = {
	enabled?: boolean;
	y?: number;
	stagger?: number;
	delay?: number;
	threshold?: number;
	rootMargin?: string;
};

const DEFAULT_PARAMS: Required<SectionRevealParams> = {
	enabled: true,
	y: 28,
	stagger: 90,
	delay: 0,
	threshold: 0.12,
	rootMargin: '0px 0px -12% 0px'
};

function isRevealCandidate(element: Element): element is HTMLElement {
	if (!(element instanceof HTMLElement)) return false;
	if (element.hasAttribute('data-reveal-skip')) return false;
	if (element.getAttribute('aria-hidden') === 'true') return false;
	if (element.matches('script, style, link, meta')) return false;
	if (element.classList.contains('absolute') || element.classList.contains('fixed')) return false;
	return true;
}

function isLayoutGroup(element: HTMLElement): boolean {
	if (element.hasAttribute('data-reveal-self')) return false;
	if (element.children.length < 2 || element.children.length > 12) return false;
	return element.classList.contains('grid') || element.classList.contains('flex');
}

function collectRevealItems(node: HTMLElement): HTMLElement[] {
	const directChildren = Array.from(node.children).filter(isRevealCandidate);

	return directChildren.flatMap((child) => {
		if (!isLayoutGroup(child)) return [child];

		const groupChildren = Array.from(child.children).filter(isRevealCandidate);
		return groupChildren.length > 1 ? groupChildren : [child];
	});
}

export function sectionReveal(node: HTMLElement, params: SectionRevealParams = {}) {
	let observer: IntersectionObserver | null = null;
	let items: HTMLElement[] = [];
	let currentKey = '';

	function cleanup() {
		observer?.disconnect();
		observer = null;

		for (const item of items) {
			item.classList.remove('section-reveal-item', 'section-reveal-item--visible');
			item.style.removeProperty('--section-reveal-y');
			item.style.removeProperty('--section-reveal-delay');
		}

		items = [];
	}

	function setup(nextParams: SectionRevealParams = {}) {
		const options = { ...DEFAULT_PARAMS, ...nextParams };
		const nextKey = JSON.stringify(options);
		if (nextKey === currentKey) return;

		currentKey = nextKey;
		cleanup();

		if (!options.enabled || prefersReducedMotion()) return;

		items = collectRevealItems(node);
		if (items.length === 0) return;

		if (typeof IntersectionObserver === 'undefined') {
			for (const item of items) {
				item.classList.add('section-reveal-item', 'section-reveal-item--visible');
			}
			return;
		}

		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;

					const item = entry.target as HTMLElement;
					item.classList.add('section-reveal-item--visible');
					observer?.unobserve(item);
				}
			},
			{
				threshold: options.threshold,
				rootMargin: options.rootMargin
			}
		);

		items.forEach((item, index) => {
			item.style.setProperty('--section-reveal-y', `${options.y}px`);
			item.style.setProperty('--section-reveal-delay', `${options.delay + index * options.stagger}ms`);
			item.classList.add('section-reveal-item');
			observer?.observe(item);
		});
	}

	setup(params);

	return {
		update(nextParams: SectionRevealParams = {}) {
			setup(nextParams);
		},
		destroy() {
			cleanup();
			currentKey = '';
		}
	};
}
