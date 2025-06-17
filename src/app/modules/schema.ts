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
  status: z.enum(["not_started", "in_progress", "completed", "blocked"])
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

// Schemas for module detail
export const gameSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(["available", "completed", "blocked", "in_progress"]),
  completedAt: z.string().optional(),
  prerequisitesMet: z.boolean(),
  coverUrl: z.string().url()
});

export const lessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  order: z.number(),
  totalGames: z.number(),
  completedGames: z.number(),
  availableGames: z.number(),
  blockedGames: z.number(),
  games: z.array(gameSchema)
});

export const moduleDetailSchema = z.object({
  success: z.boolean(),
  moduleId: z.string(),
  moduleName: z.string(),
  moduleDescription: z.string(),
  coverUrl: z.string().url(),
  totalLessons: z.number(),
  totalGames: z.number(),
  completedGames: z.number(),
  progressPercentage: z.number(),
  status: z.enum(["not_started", "in_progress", "completed", "blocked"]),
  lessons: z.array(lessonSchema)
});
