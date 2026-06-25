export type ClassValue =
	| string
	| number
	| boolean
	| null
	| undefined
	| ClassValue[]
	| Record<string, boolean | null | undefined>;

export function cx(...inputs: ClassValue[]): string {
	const classes: string[] = [];

	for (const input of inputs) {
		if (!input) continue;

		if (typeof input === 'string' || typeof input === 'number') {
			classes.push(String(input));
		} else if (Array.isArray(input)) {
			classes.push(cx(...input));
		} else if (typeof input === 'object') {
			for (const [key, value] of Object.entries(input)) {
				if (value) classes.push(key);
			}
		}
	}

	return classes.join(' ');
}

export const cn = cx;

export function sanitizePhone(phone: string): string {
	return phone.replace(/\D/g, '');
}

export function formatPhoneE164(phone: string): string {
	const digits = sanitizePhone(phone);
	return digits.startsWith('353') || digits.startsWith('1') || digits.startsWith('+')
		? digits
		: `353${digits}`;
}

export function slugify(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

export function truncate(input: string, maxLength: number, suffix = '…'): string {
	if (input.length <= maxLength) return input;
	return input.slice(0, maxLength - suffix.length).trimEnd() + suffix;
}

export function capitalize(input: string): string {
	return input.charAt(0).toUpperCase() + input.slice(1);
}
