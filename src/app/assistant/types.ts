// Types pour l'API assistant-message

export interface AssistantMessageRequest {
  game: string;
  eventType: string;
  context: Record<string, unknown>;
  lang: string;
  persona: string;
}

export interface AssistantMessageResponse {
  success: boolean;
  lines: string[];
  error?: string;
}
