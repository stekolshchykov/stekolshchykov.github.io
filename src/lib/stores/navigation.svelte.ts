import { browser } from '$app/environment';

function createNavigation() {
	let mobileOpen = $state(false);
	let hidden = $state(false);
	let lastScrollY = 0;

	function updateScroll() {
		const y = window.scrollY;
		hidden = y > lastScrollY && y > 80;
		lastScrollY = y;
	}

	if (browser) {
		window.addEventListener('scroll', updateScroll, { passive: true });
	}

	function openMenu() {
		mobileOpen = true;
	}

	function closeMenu() {
		mobileOpen = false;
	}

	function toggleMenu() {
		mobileOpen = !mobileOpen;
	}

	return {
		get mobileOpen() {
			return mobileOpen;
		},
		get hidden() {
			return hidden;
		},
		open: openMenu,
		close: closeMenu,
		toggle: toggleMenu
	};
}

export const navigation = createNavigation();
