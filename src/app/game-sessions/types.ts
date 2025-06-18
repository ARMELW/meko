import { z } from "zod";
import {
  createGameSessionSchema,
  gameSessionSchema,
  gameSessionWithGameSchema,
  gameSessionResponseSchema,
  createGameSessionResponseSchema,
  completeGameSessionSchema,
  abandonGameSessionSchema,
  gameSessionListResponseSchema,
  childGameSessionListResponseSchema,
  saveProgressSchema,
  gameSessionHistoryItemSchema,
  gameSessionStatsSchema,
  gameSessionHistoryResponseSchema,
  paginationSchema
} from "./schema";

// Types principaux
export type CreateGameSessionPayload = z.infer<typeof createGameSessionSchema>;
export type GameSession = z.infer<typeof gameSessionSchema>;
export type GameSessionWithGame = z.infer<typeof gameSessionWithGameSchema>;
export type GameSessionResponse = z.infer<typeof gameSessionResponseSchema>;
export type CreateGameSessionResponse = z.infer<typeof createGameSessionResponseSchema>;

// Types pour les actions
export type CompleteGameSessionPayload = z.infer<typeof completeGameSessionSchema>;
export type AbandonGameSessionResponse = z.infer<typeof abandonGameSessionSchema>;

// Types pour les listes
export type GameSessionListResponse = z.infer<typeof gameSessionListResponseSchema>;
export type ChildGameSessionListResponse = z.infer<typeof childGameSessionListResponseSchema>;
export type Pagination = z.infer<typeof paginationSchema>;

// Types pour la compatibilité
export type SaveProgressPayload = z.infer<typeof saveProgressSchema>;
export type GameSessionHistoryItem = z.infer<typeof gameSessionHistoryItemSchema>;
export type GameSessionStats = z.infer<typeof gameSessionStatsSchema>;
export type GameSessionHistoryResponse = z.infer<typeof gameSessionHistoryResponseSchema>;

// Types d'énumération
export type GameSessionStatus = 'in_progress' | 'completed' | 'abandoned';
