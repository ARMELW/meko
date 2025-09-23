import { create } from 'zustand';

interface AssistantContextState {
  currentValue?: number;
  goal: number; 
  attempt: number;
  isAssistantSpeaking: boolean;
  setCurrentValue: (value?: number) => void;
  setGoal: (goal: number) => void;
  incrementAttempt: () => void;
  resetAttempt: () => void;
  setAssistantSpeaking: (is: boolean) => void;
}

export const useAssistantContextStore = create<AssistantContextState>((set) => ({
  currentValue: 0,
  goal: 0,
  attempt: 1,
  isAssistantSpeaking: false,
  setCurrentValue: (value) => set({ currentValue: value }),
  setGoal: (goal) => set({ goal }),
  incrementAttempt: () => set((state) => ({ attempt: state.attempt + 1 })),
  resetAttempt: () => set({ attempt: 1 }),
  setAssistantSpeaking: (is) => set({ isAssistantSpeaking: is }),
}));
