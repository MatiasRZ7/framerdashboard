"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Project } from "@/types";

interface DeleteConfirmModalContextType {
  isOpen: boolean;
  projectToDelete: Project | null;
  openModal: (project: Project) => void;
  closeModal: () => void;
}

const DeleteConfirmModalContext = createContext<
  DeleteConfirmModalContextType | undefined
>(undefined);

export function DeleteConfirmModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const openModal = useCallback((project: Project) => {
    setProjectToDelete(project);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setProjectToDelete(null);
  }, []);

  return (
    <DeleteConfirmModalContext.Provider
      value={{
        isOpen,
        projectToDelete,
        openModal,
        closeModal,
      }}
    >
      {children}
    </DeleteConfirmModalContext.Provider>
  );
}

export function useDeleteConfirmModal() {
  const context = useContext(DeleteConfirmModalContext);
  if (context === undefined) {
    throw new Error(
      "useDeleteConfirmModal must be used within a DeleteConfirmModalProvider"
    );
  }
  return context;
}
