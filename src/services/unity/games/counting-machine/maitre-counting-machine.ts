
import { assistantMessageService } from '@/services/api/assistant-message';
import type { AssistantMessageRequest, AssistantMessageResponse } from '@/app/assistant/types';

// Fonction utilitaire pour obtenir dynamiquement le texte de l'assistant
export async function getMaitreCountingMachineLines(params: {
  eventType: string;
  context: Record<string, unknown>;
  lang?: string;
  persona?: string;
}): Promise<string[]> {
  const payload: AssistantMessageRequest = {
    game: 'counting-machine',
    eventType: params.eventType,
    context: params.context,
    lang: params.lang || 'fr',
    persona: params.persona || 'Maître Rouleau, vieux magicien des chiffres, drôle, patient, toujours encourageant, adore les énigmes et félicite chaque progrès.'
  };
  try {
    const res: AssistantMessageResponse = await assistantMessageService.send(payload);
    if (res.success && Array.isArray(res.lines)) {
      return res.lines;
    }
    return [res.error || 'Erreur lors de la récupération du message.'];
  } catch (e) {
    return ['Erreur technique lors de la récupération du message.'];
  }
}
