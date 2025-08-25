import { z } from "zod";

export const shareSchema = z.object({
  email: z.string().email("Invalid email")
});

export type ShareFormData = z.infer<typeof shareSchema>;
