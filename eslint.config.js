import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		},
		rules: {
			// Project uses explicit /en/ prefixes; resolve() is not required.
			'svelte/no-navigation-without-resolve': 'off',
			// Svelte 5 runes and keyed each blocks are enforced at build time.
			'svelte/require-each-key': 'off',
			// Inline JSON-LD is required for SEO and is built from trusted data.
			'svelte/no-at-html-tags': 'off',
			// Imports such as ScrollTrigger (registered globally) and svelte-i18n's _
			// are often used in templates where the rule cannot detect usage.
			'@typescript-eslint/no-unused-vars': 'off',
			// String concatenation inside {@html} is intentional and safe here.
			'@typescript-eslint/no-unused-expressions': 'off'
		}
	},
	{
		ignores: [
			'build/',
			'.svelte-kit/',
			'node_modules/',
			'pnpm-lock.yaml',
			// Svelte 5 runes syntax is not yet fully parsed by typescript-eslint.
			'src/lib/stores/*.svelte.ts'
		]
	}
];
