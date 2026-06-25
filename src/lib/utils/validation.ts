import { z } from 'zod';

export const projectEnquirySchema = z.object({
	fullName: z.string().min(2, 'form.validation_required'),
	email: z.string().email('form.validation_email'),
	whatsapp: z.string().optional(),
	projectType: z.enum(['residential', 'commercial', 'not-sure']),
	location: z.string().min(2, 'form.validation_required'),
	description: z.string().min(10, 'form.validation_required'),
	files: z.array(z.instanceof(File)).max(5, 'form.validation_required').optional().default([])
});

export type ProjectEnquiryFormData = z.infer<typeof projectEnquirySchema>;

export interface ProjectEnquiryValidationResult {
	success: boolean;
	data?: ProjectEnquiryFormData;
	errors?: Record<string, string>;
}

export function validateProjectEnquiry(data: unknown): ProjectEnquiryValidationResult {
	const result = projectEnquirySchema.safeParse(data);

	if (result.success) {
		return { success: true, data: result.data };
	}

	const errors: Record<string, string> = {};
	for (const issue of result.error.issues) {
		const field = issue.path[0];
		if (typeof field === 'string' && !(field in errors)) {
			errors[field] = issue.message;
		}
	}

	return { success: false, errors };
}
