import { create } from 'zustand';
import { Children } from './type';
import { generateUrl } from '@/utils/utils';

interface ChildrenStore {
  currentChild: Children | null;
  setCurrentChild: (child: Children) => void;
  clearCurrentChild: () => void;
}

export const useChildrenStore = create<ChildrenStore>((set) => ({
  currentChild: null,
  setCurrentChild: (child) => set({ currentChild: {
    ...child,
    avatarUrl: generateUrl(child.avatarUrl || '') 
  } }),
  clearCurrentChild: () => set({ currentChild: null }),
}));
