import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = 'euro' | 'chf';
export type Language = 'fr' | 'en';

interface SettingsState {
  currency: Currency;
  language: Language;
  setCurrency: (currency: Currency) => void;
  setLanguage: (language: Language) => void;
  reset: () => void;
}

const initialState = {
  currency: 'euro' as Currency,
  language: 'fr' as Language,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => set({ language }),
      reset: () => set(initialState),
    }),
    {
      name: 'meko-settings',
      version: 1,
    }
  )
);
