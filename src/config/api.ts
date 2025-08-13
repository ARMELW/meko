const prefix = 'api';
export const API_ENDPOINTS = {
  auth: {
    checkEmail: `${prefix}/v1/auth/check-email`,
    verifyOtp: `${prefix}/v1/auth/verify-otp`,
  },
  children: {
    base: `${prefix}/v1/children`,
    create: `${prefix}/v1/children`,
    list: (qs: string) => `${prefix}/v1/parents/children?${qs}`,
    detail: (id: string) => `${prefix}/v1/children/${id}`,
    update: (id: string) => `${prefix}/v1/children/${id}`,
    delete: (id: string) => `${prefix}/v1/children/${id}`,
    requestDelete:(id:string) => `${prefix}/v1/children/${id}/request-delete`,
    verifyDelete:(id:string) => `${prefix}/v1/children/${id}`,
    select(id: string): string {
      return `${prefix}/v1/children/${id}/avatar`
    }
  },
  avatar: {
    base: `${prefix}/v1/avatars`,
  },
  modules: {
    base: `${prefix}/v1/modules`,
    list: (childId: string, qs: string) => `${prefix}/v1/children/${childId}/modules?${qs}`,
    detail: (childId: string, moduleId: string) => `${prefix}/v1/children/${childId}/modules/${moduleId}`,
    create: `${prefix}/v1/modules`,
    update: (id: string) => `${prefix}/v1/modules/${id}`,
    delete: (id: string) => `${prefix}/v1/modules/${id}`
  },
  gameSessions: {
    // Créer une nouvelle session
    start: `${prefix}/v1/game-sessions/start`,
    // Lister toutes les sessions (paginées)
    list: (qs: string) => `${prefix}/v1/game-sessions?${qs}`,
    // Lister les sessions d'un enfant spécifique
    listByChild: (childId: string, qs: string) => `${prefix}/v1/children/${childId}/game-sessions?${qs}`,
    // Détail d'une session spécifique
    detail: (sessionId: string) => `${prefix}/v1/game-sessions/${sessionId}`,
    // Terminer une session
    complete: (sessionId: string) => `${prefix}/v1/game-sessions/${sessionId}/complete`,
    // Abandonner une session
    abandon: (sessionId: string) => `${prefix}/v1/game-sessions/${sessionId}/abandon`,
    // Dernière activité d'un enfant
    lastActivity: (childId: string) => `${prefix}/v1/children/${childId}/last-session`,
    // Ancien endpoint pour la compatibilité (si nécessaire)
    saveProgress: (childId: string, sessionId: string) => `${prefix}/v1/children/${childId}/sessions/${sessionId}/progress`,
    history: (childId: string, qs: string) => `${prefix}/v1/children/${childId}/sessions?${qs}`
  }
} as const;
