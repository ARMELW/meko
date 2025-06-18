import { BaseServiceImpl } from "@/services/api/http";
import { API_ENDPOINTS } from '@/config/api';
import {
  CreateGameSessionPayload,
  GameSession,
  GameSessionResponse,
  GameSessionListResponse,
  ChildGameSessionListResponse,
  CompleteGameSessionPayload,
  AbandonGameSessionResponse,
  SaveProgressPayload,
  GameSessionHistoryResponse
} from './types';

export class GameSessionServiceImpl extends BaseServiceImpl<GameSession, CreateGameSessionPayload> {
  protected endpoints = {
    base: '',
    list: () => '',
    create: '',
    detail: () => '',
    update: () => '',
    delete: () => ''
  };

  protected serializeParams(): string {
    return '';
  }

  /**
   * Démarre une nouvelle session de jeu
   */
  async startSession(payload: CreateGameSessionPayload): Promise<GameSessionResponse> {
    return this.post<GameSessionResponse>(
      API_ENDPOINTS.gameSessions.start,
      payload
    );
  }

  /**
   * Récupère la liste paginée de toutes les sessions
   */
  async listSessions(params: {
    page?: number;
    limit?: number;
    status?: string;
  } = {}): Promise<GameSessionListResponse> {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);

    return this.get<GameSessionListResponse>(
      API_ENDPOINTS.gameSessions.list(queryParams.toString())
    );
  }

  /**
   * Récupère les sessions d'un enfant spécifique
   */
  async getChildSessions(
    childId: string,
    params: {
      page?: number;
      limit?: number;
      gameId?: string;
    } = {}
  ): Promise<ChildGameSessionListResponse> {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.gameId) queryParams.append('gameId', params.gameId);

    return this.get<ChildGameSessionListResponse>(
      API_ENDPOINTS.gameSessions.listByChild(childId, queryParams.toString())
    );
  }

  /**
   * Récupère les détails d'une session spécifique
   */
  async getSessionDetail(sessionId: string): Promise<GameSessionResponse> {
    return this.get<GameSessionResponse>(
      API_ENDPOINTS.gameSessions.detail(sessionId)
    );
  }

  /**
   * Termine une session de jeu
   */
  async completeSession(
    sessionId: string, 
    data: CompleteGameSessionPayload
  ): Promise<GameSessionResponse> {
    return this.patch<GameSessionResponse>(
      API_ENDPOINTS.gameSessions.complete(sessionId),
      data
    );
  }

  /**
   * Abandonne une session de jeu
   */
  async abandonSession(sessionId: string): Promise<AbandonGameSessionResponse> {
    return this.patch<AbandonGameSessionResponse>(
      API_ENDPOINTS.gameSessions.abandon(sessionId),
      {}
    );
  }

  /**
   * Sauvegarde le progrès d'une session (ancien endpoint pour la compatibilité)
   */
  async saveProgress(
    childId: string, 
    sessionId: string, 
    data: SaveProgressPayload
  ): Promise<void> {
    return this.put<void>(
      API_ENDPOINTS.gameSessions.saveProgress(childId, sessionId),
      data
    );
  }

  /**
   * Récupère la dernière activité d'un enfant
   */
  async getLastActivity(childId: string): Promise<import('./types').LastActivityResponse> {
    return this.get<import('./types').LastActivityResponse>(
      API_ENDPOINTS.gameSessions.lastActivity(childId)
    );
  }

  /**
   * Récupère l'historique des sessions (ancien endpoint pour la compatibilité)
   */
  async getHistory(
    childId: string,
    params: {
      gameId?: string;
      page?: number;
      limit?: number;
    } = {}
  ): Promise<GameSessionHistoryResponse> {
    const queryParams = new URLSearchParams();
    
    if (params.gameId) queryParams.append('gameId', params.gameId);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    return this.get<GameSessionHistoryResponse>(
      API_ENDPOINTS.gameSessions.history(childId, queryParams.toString())
    );
  }
}

export const gameSessionService = new GameSessionServiceImpl();
