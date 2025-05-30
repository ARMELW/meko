import { create } from 'zustand';

type ModalMode = 'create' | 'update' | 'delete';

type ModalStore = {
  open: boolean;
  mode: ModalMode;

  openCreate: () => void;
  openUpdate: () => void;
  openDelete: () => void; 
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
    mode: 'update',
  }),

  openDelete: () => set({
    open: true,
    mode: 'delete',
  }),

  close: () => set({
    open: false,
    mode: 'create',
  }),
}));

export default useModalStore;
