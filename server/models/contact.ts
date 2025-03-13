import { z } from "zod";

// Define the schema for contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le prénom doit comporter au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  message: z.string().min(10, {
    message: "Le message doit comporter au moins 10 caractères.",
  }),
});

// Type for contact form data
export type ContactFormData = z.infer<typeof contactFormSchema>;

// Function to validate and parse contact form data
export function parseContactForm(data: unknown): ContactFormData {
  return contactFormSchema.parse(data);
}
