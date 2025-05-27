import { z } from "zod";
export const addChildrenSchema = z.object({
  firstname: z
    .string()
    .min(1, "firstname.required"),
  lastname: z
    .string(),
  birthday: z
    .string()
    .min(1, "birthday.required")
});

export const childrenSchema = z.object({
  id: z.string(),
  firstname: z
    .string()
    .min(1, "firstname.required"),
  lastname: z
    .string(),
  birthday: z
    .string()
    .min(1, "birthday.required"),
  avatarUrl: z.string().url("avatarUrl.invalid").optional(),
  firstLogin: z.boolean().default(true),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

