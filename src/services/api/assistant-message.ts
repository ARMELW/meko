
import { fetchApi } from './http';
import type { AssistantMessageRequest, AssistantMessageResponse } from '@/app/assistant/types';

export const assistantMessageService = {
  send: (payload: AssistantMessageRequest) =>
    fetchApi<AssistantMessageResponse>('api/assistant-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }),
};
