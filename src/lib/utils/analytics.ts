import { env } from '$env/dynamic/public';
import { cookieConsent } from '$lib/stores/cookieConsent.svelte';

const GA4_ID = env.PUBLIC_GA4_ID ?? '';

declare global {
	interface Window {
		dataLayer: unknown[];
		gtag: (...args: unknown[]) => void;
	}
}

function isAnalyticsAllowed() {
	return cookieConsent.state === 'accepted' && cookieConsent.analytics;
}

function pushDataLayer(event: string, params: Record<string, unknown> = {}) {
	if (typeof window === 'undefined') return;
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event, ...params });

	if (typeof window.gtag === 'function') {
		window.gtag('event', event, params);
	}
}

function pushEvent(name: string, params: Record<string, unknown> = {}) {
	if (!isAnalyticsAllowed()) return;
	pushDataLayer(name, { send_to: GA4_ID, ...params });
}

export function page_view(path: string, title?: string) {
	pushEvent('page_view', { page_path: path, page_title: title });
}

export function form_open(source: string) {
	pushEvent('form_open', { form_source: source });
}

export function form_submit(status: 'success' | 'error') {
	pushEvent('form_submit', { form_status: status });
}

export function whatsapp_click(context: string) {
	pushEvent('whatsapp_click', { click_context: context });
}

export function project_view(slug: string, title: string) {
	pushEvent('project_view', { project_slug: slug, project_title: title });
}

export function project_filter(category: string) {
	pushEvent('project_filter', { filter_category: category });
}

export function scroll_depth(depth: number) {
	pushEvent('scroll_depth', { depth });
}

export function consent_granted() {
	pushDataLayer('consent_granted', { analytics_storage: 'granted', ad_storage: 'granted' });
}

export function consent_denied() {
	pushDataLayer('consent_denied', { analytics_storage: 'denied', ad_storage: 'denied' });
}
