import { z } from "zod";

export const gameSearchSchema = z.object({
  search: z.string().optional(),
  page: z.number().min(1),
  limit: z.number().min(1).max(100)
});
