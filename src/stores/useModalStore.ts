import { create } from 'zustand';

export type MODAL_VIEWS =
  | "LOGIN_VIEW"
  | "SIGNUP_VIEW"
  | "FORGET_PASSWORD"
  | "PRODUCT_VIDEO"
  | "RESET_PASSWORD"
  | "PRODUCT_VIEW"
  | "INSTAGRAM_VIEW"
  | "WRITE_REVIEW"
  | "ADDRESS_BOOK"; 

interface ModalState {
    view?: MODAL_VIEWS;
    data?: any;
    isOpen: boolean;
    openModal: (view?: MODAL_VIEWS, data?: any) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>(
    (set) => ({
    view: undefined,
    data: null,
    isOpen: false,
    openModal: (view, data) => set({ isOpen: true, view, data }),
    closeModal: () => set({ isOpen: false, view: undefined, data: null }),
}));
