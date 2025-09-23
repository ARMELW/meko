import { useMutation } from '@tanstack/react-query';
import { assistantMessageService } from '@/services/api/assistant-message';
import type { AssistantMessageRequest, AssistantMessageResponse } from '../types';

export function useAssistantMessage() {
  return useMutation<AssistantMessageResponse, unknown, AssistantMessageRequest>({
    mutationFn: assistantMessageService.send,
  });
}
