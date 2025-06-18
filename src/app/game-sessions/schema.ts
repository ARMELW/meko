import { z } from "zod";

// Schema pour créer une session de jeu
export const createGameSessionSchema = z.object({
  childId: z.string(),
  gameId: z.string()
});

// Schema pour une session de jeu (structure mise à jour selon l'API)
export const gameSessionSchema = z.object({
  id: z.string(),
  childId: z.string(),
  gameId: z.string(),
  status: z.enum(['in_progress', 'completed', 'abandoned']),
  score: z.number().optional(),
  timeSpent: z.number().optional(),
  startedAt: z.string(),
  completedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

// Schema pour une session avec détails du jeu
export const gameSessionWithGameSchema = gameSessionSchema.extend({
  game: z.object({
    id: z.string(),
    name: z.string(),
    type: z.string()
  })
});

// Schema pour la réponse de création/détail de session
export const gameSessionResponseSchema = z.object({
  success: z.boolean(),
  data: gameSessionSchema
});

// Schema pour terminer une session
export const completeGameSessionSchema = z.object({
  score: z.number(),
  timeSpent: z.number()
});

// Schema pour abandonner une session
export const abandonGameSessionSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.string(),
    status: z.literal('abandoned')
  })
});

// Schema pour la pagination
export const paginationSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number()
});

// Schema pour la liste paginée de sessions
export const gameSessionListResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    items: z.array(gameSessionSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number()
  })
});

// Schema pour la liste des sessions d'un enfant
export const childGameSessionListResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(gameSessionWithGameSchema)
});

// Anciens schemas pour la compatibilité
export const createGameSessionResponseSchema = gameSessionResponseSchema;

export const saveProgressSchema = z.object({
  score: z.number().optional(),
  data: z.any().optional()
});

export const gameSessionHistoryItemSchema = z.object({
  id: z.string(),
  gameId: z.string(),
  gameTitle: z.string(),
  startedAt: z.string(),
  completedAt: z.string().optional(),
  success: z.boolean().optional(),
  score: z.number().optional(),
  duration: z.number().optional(),
  status: z.enum(['in_progress', 'completed'])
});

export const gameSessionStatsSchema = z.object({
  totalSessions: z.number(),
  completedSessions: z.number(),
  averageScore: z.number(),
  bestScore: z.number(),
  totalPlayTime: z.number()
});

export const gameSessionHistoryResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    sessions: z.array(gameSessionHistoryItemSchema),
    pagination: paginationSchema,
    stats: gameSessionStatsSchema
  })
});
