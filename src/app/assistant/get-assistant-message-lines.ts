import { assistantMessageService } from '@/services/api/assistant-message';
import type { AssistantMessageRequest, AssistantMessageResponse } from '@/app/assistant/types';

/**
 * Appelle l'API assistant-message pour n'importe quel jeu/persona/event.
 * @param params - Les paramètres de la requête assistant (voir AssistantMessageRequest)
 * @returns Les lignes de réponse de l'assistant ou un message d'erreur.
 */
export async function getAssistantMessageLines(params: AssistantMessageRequest): Promise<string[]> {
  try {
    const res: AssistantMessageResponse = await assistantMessageService.send(params);
    if (res.success && Array.isArray(res.lines)) {
      return res.lines;
    }
    return [res.error || 'Erreur lors de la récupération du message.'];
  } catch {
    return ['Erreur technique lors de la récupération du message.'];
  }
}
