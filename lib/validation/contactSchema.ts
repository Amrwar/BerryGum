import { z } from "zod";

/**
 * Single source of truth for contact-form validation, shared between the
 * client form (instant field-level feedback) and the /api/contact route
 * (authoritative server-side check). Previously the API route re-implemented
 * these rules with a hand-rolled regex and the form had none at all.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Please provide a valid email address")
    .email("Please provide a valid email address"),
  phone: z.string().trim().optional().or(z.literal("")),
  company: z.string().trim().optional().or(z.literal("")),
  budget: z.string().trim().optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters long"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactFormValues, string>>;

/**
 * Validates a raw, untrusted payload (e.g. a parsed request body or form
 * state) and returns either the cleaned values or a map of per-field errors
 * keyed the same way the form renders them, so a single validation pass can
 * drive both the API's flat error list and the form's inline field errors.
 */
export function validateContactForm(
  data: unknown
):
  | { success: true; data: ContactFormValues }
  | { success: false; fieldErrors: ContactFieldErrors; errors: string[] } {
  const result = contactFormSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const fieldErrors: ContactFieldErrors = {};
  const errors: string[] = [];
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ContactFormValues | undefined;
    if (field && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
    errors.push(issue.message);
  }

  return { success: false, fieldErrors, errors };
}
