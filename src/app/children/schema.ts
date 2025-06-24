import { z } from "zod";
export const addChildrenSchema = z.object({
  firstname: z
    .string()
    .min(1, "auth.errors.firstName.required"),
  birthday: z
    .string()
    .min(1, "birthday.required")
});

export const childrenSchema = z.object({
  id: z.string(),
  firstname: z
    .string()
    .min(1, "auth.errors.firstName.required"),
  lastname: z
    .string()
    .optional(),
  birthday: z
    .string()
    .min(1, "birthday.required"),
  avatarUrl: z.string().url("avatarUrl.invalid").optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

