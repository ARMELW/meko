import { create } from 'zustand';

type AssistantStore = {
  assistantLoading: boolean;
  setAssistantLoading: (loading: boolean) => void;
  assistantReady: boolean;
  setAssistantReady: (ready: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export const useAssistantStore = create<AssistantStore>((set) => ({
  assistantLoading: true,
  isLoading: true,
  setIsLoading: (loading: boolean) => set(() => ({ isLoading: loading })),
  setAssistantLoading: (loading: boolean) => set(() => ({ assistantLoading: loading })),
  assistantReady: false,
  setAssistantReady: (ready: boolean) => set(() => ({ assistantReady: ready })),
}));
