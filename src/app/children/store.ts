import { create } from 'zustand';
import { Children } from './type';

interface ChildrenStore {
  currentChild: Children | null;
  setCurrentChild: (child: Children) => void;
  clearCurrentChild: () => void;
}

export const useChildrenStore = create<ChildrenStore>((set) => ({
  currentChild: null,
  setCurrentChild: (child) => set({ currentChild: child}),
  clearCurrentChild: () => set({ currentChild: null }),
}));
