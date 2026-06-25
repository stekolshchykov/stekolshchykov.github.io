export type ProjectType = 'residential' | 'commercial' | 'not-sure';

export type BudgetRange =
	| 'under-10k'
	| '10k-25k'
	| '25k-50k'
	| '50k-100k'
	| 'over-100k'
	| 'prefer-not-to-say';

export type ReferralSource =
	| 'google'
	| 'instagram'
	| 'pinterest'
	| 'referral'
	| 'previous-client'
	| 'other';

export interface ContactFormData {
	name: string;
	email: string;
	phone: string;
	location: string;
	projectType: ProjectType;
	service: string;
	budget: BudgetRange;
	message: string;
	referral: ReferralSource;
	files: File[];
	consent: boolean;
}

export type FormFieldName = keyof ContactFormData;

export interface FormFieldError {
	field: FormFieldName;
	message: string;
}

export interface FormValidationResult {
	valid: boolean;
	errors: FormFieldError[];
}

export interface FormSubmissionState {
	status: 'idle' | 'submitting' | 'success' | 'error';
	message: string;
	errors: FormFieldError[];
}

export type SelectOption = {
	value: string;
	label: string;
};
