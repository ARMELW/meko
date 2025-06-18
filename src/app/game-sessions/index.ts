// Composants
export { GameSimulationModal } from './components/game-simulation-modal';

// Hooks
export { useGameSession } from './hooks/use-game-session';
export { 
  useGameSessionList, 
  useChildGameSessions, 
  useGameSessionDetail 
} from './hooks/use-game-session-list';

// Types
export type { 
  GameSession,
  GameSessionWithGame,
  CreateGameSessionPayload, 
  CompleteGameSessionPayload,
  GameSessionResponse,
  GameSessionListResponse,
  ChildGameSessionListResponse,
  AbandonGameSessionResponse,
  GameSessionStatus,
  // Types de compatibilité
  SaveProgressPayload, 
  CreateGameSessionResponse,
  GameSessionHistoryItem,
  GameSessionStats,
  GameSessionHistoryResponse
} from './types';

// Schémas
export { 
  gameSessionSchema,
  createGameSessionSchema,
  saveProgressSchema,
  completeGameSessionSchema,
  gameSessionHistoryItemSchema
} from './schema';

// Service
export { gameSessionService } from './service';
