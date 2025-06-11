"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface NewProjectModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const NewProjectModalContext = createContext<
  NewProjectModalContextType | undefined
>(undefined);

export function NewProjectModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <NewProjectModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </NewProjectModalContext.Provider>
  );
}

export function useNewProjectModal() {
  const context = useContext(NewProjectModalContext);
  if (context === undefined) {
    throw new Error(
      "useNewProjectModal must be used within a NewProjectModalProvider"
    );
  }
  return context;
}
