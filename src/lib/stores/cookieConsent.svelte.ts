import { browser } from '$app/environment';

type ConsentState = 'pending' | 'accepted' | 'rejected';

interface PersistedConsent {
	state: ConsentState;
	analytics: boolean;
	marketing: boolean;
}

const STORAGE_KEY = 'aras_living_cookie_consent';

function readStoredConsent(): PersistedConsent | null {
	if (!browser) return null;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as Partial<PersistedConsent>;
		if (
			parsed.state &&
			['pending', 'accepted', 'rejected'].includes(parsed.state) &&
			typeof parsed.analytics === 'boolean' &&
			typeof parsed.marketing === 'boolean'
		) {
			return parsed as PersistedConsent;
		}
	} catch {
		// ignore corrupt storage
	}
	return null;
}

function createCookieConsent() {
	const stored = readStoredConsent();

	let state = $state<ConsentState>(stored?.state ?? 'pending');
	let analytics = $state(stored?.analytics ?? false);
	let marketing = $state(stored?.marketing ?? false);
	let necessary = $state(true);
	let customizeOpen = $state(false);

	function persist() {
		if (!browser) return;
		const payload: PersistedConsent = { state, analytics, marketing };
		localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
	}

	function acceptAll() {
		state = 'accepted';
		analytics = true;
		marketing = true;
		persist();
	}

	function rejectOptional() {
		state = 'rejected';
		analytics = false;
		marketing = false;
		persist();
	}

	function savePreferences(allowAnalytics: boolean, allowMarketing: boolean) {
		state = 'accepted';
		analytics = allowAnalytics;
		marketing = allowMarketing;
		persist();
	}

	function toggleAnalytics() {
		analytics = !analytics;
	}

	function toggleMarketing() {
		marketing = !marketing;
	}

	function reset() {
		state = 'pending';
		analytics = false;
		marketing = false;
		customizeOpen = false;
		if (browser) localStorage.removeItem(STORAGE_KEY);
	}

	return {
		get state() {
			return state;
		},
		get analytics() {
			return analytics;
		},
		get marketing() {
			return marketing;
		},
		get necessary() {
			return necessary;
		},
		get customizeOpen() {
			return customizeOpen;
		},
		set customizeOpen(value: boolean) {
			customizeOpen = value;
		},
		acceptAll,
		rejectOptional,
		savePreferences,
		toggleAnalytics,
		toggleMarketing,
		reset
	};
}

export const cookieConsent = createCookieConsent();
