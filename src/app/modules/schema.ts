import { z } from "zod";

export const moduleSchema = z.object({
  id: z.string(),
  name: z.string(),
  coverUrl: z.string().url(),
  description: z.string(),
  totalGames: z.number(),
  completedGames: z.number(),
  availableGames: z.number(),
  blockedGames: z.number(),
  progressPercentage: z.number(),
  status: z.enum(["not_started", "in_progress", "completed"])
});

export const paginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
});

export const statsSchema = z.object({
  totalModules: z.number(),
  completedModules: z.number(),
  totalGames: z.number(),
  completedGames: z.number(),
  overallPercentage: z.number()
});

export const modulesResponseSchema = z.object({
  success: z.boolean(),
  childId: z.string(),
  modules: z.array(moduleSchema),
  pagination: paginationSchema,
  stats: statsSchema
});
