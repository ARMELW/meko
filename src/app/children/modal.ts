import { create } from 'zustand';

type ModalStore<T = unknown> = {
  open: boolean;
  mode: 'create' | 'update';

  openCreate: () => void;
  openUpdate: () => void;
  close: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  open: false,
  mode: 'create',

  openCreate: () => set({
    open: true,
    mode: 'create',
  }),

  openUpdate: () => set({
    open: true,
    mode: 'update'
  }),

  close: () => set({
    open: false
  }),
}));
export default useModalStore;