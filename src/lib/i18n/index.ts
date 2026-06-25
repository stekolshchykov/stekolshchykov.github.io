import { register, init } from 'svelte-i18n';

register('en', () => import('./locales/en.json'));
register('fr', () => import('./locales/fr.json'));
register('de', () => import('./locales/de.json'));
register('es', () => import('./locales/es.json'));
register('pl', () => import('./locales/pl.json'));

init({
	fallbackLocale: 'en',
	initialLocale: 'en'
});
