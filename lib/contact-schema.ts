import { z } from "zod";
import { services } from "@/data/services";

// Single source of validation for the contact form — imported by BOTH the client
// (React Hook Form resolver) and the server (API route re-validation). Do not
// duplicate these rules anywhere.

// Service dropdown options are derived from the one services source, never
// hardcoded — add/rename a service in data/services.ts and this follows.
export const serviceOptions = services.map((s) => s.title);

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  business: z.string().trim().max(120).optional(),
  // Optional service pick — "" (nothing chosen) is allowed; any non-empty value
  // must be one of the real service titles.
  service: z
    .string()
    .refine(
      (v) => v === "" || serviceOptions.includes(v),
      "Pick one of the listed services",
    )
    .optional(),
  message: z.string().trim().min(1, "Please add a project message").max(5000),
  // Honeypot: hidden from humans, bots fill it. Kept in the shared shape so the
  // field is part of the contract; the empty-check / spam handling lives in the
  // API route (it's spam handling, not user-input validation).
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
