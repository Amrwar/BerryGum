import { z } from "zod";

export const consultationFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long"),
  email: z.string().trim().toLowerCase().min(1, "Please provide a valid email address").email("Please provide a valid email address"),
  phone: z.string().trim().optional().or(z.literal("")),
  topic: z.string().trim().min(5, "Tell us a little about what you'd like to discuss (at least 5 characters)"),
  dateKey: z.string().trim().min(1, "Please choose a date"),
  time: z.string().trim().min(1, "Please choose a time"),
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;
export type ConsultationFieldErrors = Partial<Record<keyof ConsultationFormValues, string>>;

export function validateConsultationForm(data: unknown):
  | { success: true; data: ConsultationFormValues }
  | { success: false; fieldErrors: ConsultationFieldErrors; errors: string[] } {
  const result = consultationFormSchema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  const fieldErrors: ConsultationFieldErrors = {};
  const errors: string[] = [];
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ConsultationFormValues | undefined;
    if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    errors.push(issue.message);
  }
  return { success: false, fieldErrors, errors };
}
