import { z } from "zod";

export const UserSchema = z.object({
    id: z.union([z.string(), z.number()]).optional(),
    user_role: z.string().optional(),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().nullable().optional(),
    dob: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    address2: z.string().nullable().optional(),
    zip_code: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    image: z.any().nullable().optional(),
    is_active: z.union([z.string(), z.number(), z.boolean()]).optional(),
    email_verified_at: z.string().nullable().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});

export const OfficerDetailSchema = z.object({
    officer_type: z.enum(["commissioned", "non-commissioned"]),
    drug_test_status: z.string().nullable().optional(),
    id_card_badge_access: z.string().nullable().optional(),
    uniform_issued: z.string().nullable().optional(),
    background_status: z.string().nullable().optional(),
    job_title: z.string().nullable().optional(),
    employment_type: z.string().min(1, "Employment type is required"),
    employee_id: z.string().min(1, "Employee ID is required"),
    emergency_contact_name: z.string().nullable().optional(),
    emergency_contact_number: z.string().nullable().optional(),
    hire_date: z.string().nullable().optional(),
    shift: z.string().min(1, "Shift is required"),
    license_number: z.string().nullable().optional(),
    license_expiry_date: z.string().nullable().optional(),
    certifications: z.string().nullable().optional(),
    equipment_issued: z.string().nullable().optional(),
});

export const OfficerRegistrationSchema = UserSchema.extend({
    detail: OfficerDetailSchema,
});

export type TOfficerRegistrationSchema = z.infer<typeof OfficerRegistrationSchema>;
