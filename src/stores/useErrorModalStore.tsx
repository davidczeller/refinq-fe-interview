import { create } from "zustand";

type ErrorModalState = {
  isOpen: boolean;
  message: string;
  openErrorModal: (message: string) => void;
  closeErrorModal: () => void;
};

export const useErrorModalStore = create<ErrorModalState>(set => ({
  isOpen: false,
  message: "",
  openErrorModal: (message: string) => set({ isOpen: true, message }),
  closeErrorModal: () => set({ isOpen: false, message: "" }),
}));
