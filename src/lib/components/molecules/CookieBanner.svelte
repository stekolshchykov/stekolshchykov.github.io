<script lang="ts">
	import { cookieConsent } from '$lib/stores/cookieConsent.svelte';
	import { t } from 'svelte-i18n';
	import Checkbox from '$lib/components/atoms/Checkbox.svelte';

	interface Props {
		embedded?: boolean;
	}

	let { embedded = false }: Props = $props();

	let customize = $state(false);
	let allowAnalytics = $state(false);
	let allowMarketing = $state(false);

	function showCustomize() {
		allowAnalytics = cookieConsent.analytics;
		allowMarketing = cookieConsent.marketing;
		customize = true;
	}

	function hideCustomize() {
		customize = false;
	}

	function handleAcceptAll() {
		cookieConsent.acceptAll();
	}

	function handleRejectOptional() {
		cookieConsent.rejectOptional();
	}

	function handleSavePreferences() {
		cookieConsent.savePreferences(allowAnalytics, allowMarketing);
		customize = false;
	}
</script>

{#if embedded || cookieConsent.state === 'pending'}
	<div
		class="{embedded
			? ''
			: 'fixed bottom-3 left-3 right-3 z-50 md:left-auto md:right-5 md:bottom-5 md:w-[min(560px,calc(100vw-2.5rem))]'} luxury-corners border border-text-primary/12 bg-bg-primary/88 p-3 shadow-[0_24px_90px_rgba(0,0,0,0.48),0_0_0_1px_rgba(196,149,106,0.08)] backdrop-blur-xl md:p-4"
		role="dialog"
		aria-modal="true"
		aria-label={$t('cookie_banner.message')}
	>
		<div
			class="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
			aria-hidden="true"
		></div>
		<div class="mx-auto flex max-w-7xl flex-col gap-3">
			<p class="font-sans text-[11px] leading-relaxed text-text-secondary md:text-xs">
				{$t('cookie_banner.message')}
			</p>

			<div class="grid grid-cols-2 gap-2 sm:grid-cols-[auto_auto_1fr] sm:items-center">
				<button
					type="button"
					onclick={handleAcceptAll}
					class="inline-flex items-center justify-center rounded-none bg-accent px-4 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-bg-primary shadow-[0_12px_34px_rgba(196,149,106,0.16)] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-px hover:bg-[#D4A57A] active:scale-[0.97]"
				>
					{$t('cookie_banner.accept_all')}
				</button>
				<button
					type="button"
					onclick={handleRejectOptional}
					class="inline-flex items-center justify-center border border-text-primary/20 px-4 py-2 font-sans text-[11px] text-text-primary transition-colors hover:border-accent/50 hover:bg-white/5 hover:text-accent"
				>
					{$t('cookie_banner.reject_optional')}
				</button>
				<button
					type="button"
					onclick={customize ? hideCustomize : showCustomize}
					class="col-span-2 px-3 py-2 text-left font-sans text-[11px] text-text-secondary underline underline-offset-4 transition-colors hover:text-accent sm:col-span-1 sm:text-right"
				>
					{$t('cookie_banner.customise')}
				</button>
			</div>
		</div>

		{#if customize}
			<div class="mx-auto mt-6 max-w-7xl border-t border-text-primary/10 pt-6">
				<div class="grid gap-4 sm:grid-cols-3">
					<label
						class="flex cursor-pointer items-start justify-between gap-4 border border-text-primary/10 p-4 opacity-70"
					>
						<div>
							<p class="font-sans text-xs uppercase tracking-widest text-text-primary">
								{$t('cookie_banner.necessary_title')}
							</p>
							<p class="font-sans text-xs text-text-secondary">
								{$t('cookie_banner.necessary_description')}
							</p>
						</div>
						<Checkbox checked={true} disabled={true} />
					</label>

					<label
						class="flex cursor-pointer items-start justify-between gap-4 border border-text-primary/10 p-4 transition-colors hover:border-accent/35 hover:bg-white/[0.02]"
					>
						<div>
							<p class="font-sans text-xs uppercase tracking-widest text-text-primary">
								{$t('cookie_banner.analytics_title')}
							</p>
							<p class="font-sans text-xs text-text-secondary">
								{$t('cookie_banner.analytics_description')}
							</p>
						</div>
						<Checkbox bind:checked={allowAnalytics} />
					</label>

					<label
						class="flex cursor-pointer items-start justify-between gap-4 border border-text-primary/10 p-4 transition-colors hover:border-accent/35 hover:bg-white/[0.02]"
					>
						<div>
							<p class="font-sans text-xs uppercase tracking-widest text-text-primary">
								{$t('cookie_banner.marketing_title')}
							</p>
							<p class="font-sans text-xs text-text-secondary">
								{$t('cookie_banner.marketing_description')}
							</p>
						</div>
						<Checkbox bind:checked={allowMarketing} />
					</label>
				</div>

				<div class="mt-4 flex flex-wrap items-center justify-end gap-2">
					<button
						type="button"
						onclick={handleSavePreferences}
						class="inline-flex items-center justify-center rounded-none bg-accent px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.06em] text-bg-primary transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#D4A57A] active:scale-[0.97]"
					>
						{$t('cookie_banner.save_preferences')}
					</button>
				</div>
			</div>
		{/if}
	</div>
{/if}
