import { useState } from 'react';

export interface SavedSession {
  email: string;
  lastUsed: string;
  name?: string;
}

export function useSavedSessions() {
  const getSavedSessions = (): SavedSession[] => {
    try {
      const saved = localStorage.getItem('meko_saved_sessions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const [savedSessions, setSavedSessions] = useState<SavedSession[]>(getSavedSessions());

  const saveSession = (email: string) => {
    const sessions = getSavedSessions();
    const existingIndex = sessions.findIndex(s => s.email === email);

    const newSession: SavedSession = {
      email,
      lastUsed: new Date().toISOString(),
      name: email.split('@')[0]
    };

    if (existingIndex >= 0) {
      sessions[existingIndex] = newSession;
    } else {
      sessions.unshift(newSession);
    }

    const limitedSessions = sessions.slice(0, 5);
    localStorage.setItem('meko_saved_sessions', JSON.stringify(limitedSessions));
    setSavedSessions(limitedSessions);
  };

  return { savedSessions, saveSession };
}
