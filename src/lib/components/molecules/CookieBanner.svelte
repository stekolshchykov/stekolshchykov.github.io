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
			: 'fixed bottom-0 left-0 right-0 z-50'} border-t border-white/10 bg-bg-primary p-3 md:p-5"
		role="dialog"
		aria-modal="true"
		aria-label={$t('cookie_banner.message')}
	>
		<div
			class="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between"
		>
			<p class="max-w-2xl font-sans text-xs leading-relaxed text-text-secondary">
				{$t('cookie_banner.message')}
			</p>

			<div class="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:items-center">
				<button
					type="button"
					onclick={handleAcceptAll}
					class="inline-flex items-center justify-center rounded-none bg-accent px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.06em] text-bg-primary transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#D4A57A] active:scale-[0.97]"
				>
					{$t('cookie_banner.accept_all')}
				</button>
				<button
					type="button"
					onclick={handleRejectOptional}
					class="hidden items-center justify-center border border-white/20 px-4 py-2 font-sans text-xs text-text-primary transition-colors hover:bg-white/5 md:inline-flex"
				>
					{$t('cookie_banner.reject_optional')}
				</button>
				<button
					type="button"
					onclick={customize ? hideCustomize : showCustomize}
					class="col-span-2 px-4 py-2 font-sans text-xs text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary md:col-span-1"
				>
					{$t('cookie_banner.customise')}
				</button>
			</div>
		</div>

		{#if customize}
			<div class="mx-auto mt-6 max-w-7xl border-t border-white/10 pt-6">
				<div class="grid gap-4 sm:grid-cols-3">
					<label
						class="flex cursor-pointer items-start justify-between gap-4 border border-white/10 p-4 opacity-70"
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
						class="flex cursor-pointer items-start justify-between gap-4 border border-white/10 p-4 transition-colors hover:bg-white/[0.02]"
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
						class="flex cursor-pointer items-start justify-between gap-4 border border-white/10 p-4 transition-colors hover:bg-white/[0.02]"
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
						onclick={handleRejectOptional}
						class="inline-flex items-center justify-center border border-white/20 px-4 py-2 font-sans text-xs text-text-primary transition-colors hover:bg-white/5 md:hidden"
					>
						{$t('cookie_banner.reject_optional')}
					</button>
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
