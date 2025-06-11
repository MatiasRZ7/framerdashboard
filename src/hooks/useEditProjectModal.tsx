"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Project } from "@/types";

interface EditProjectModalContextType {
  isOpen: boolean;
  project: Project | null;
  openModal: (project: Project) => void;
  closeModal: () => void;
}

const EditProjectModalContext = createContext<
  EditProjectModalContextType | undefined
>(undefined);

export function EditProjectModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);

  const openModal = (selectedProject: Project) => {
    setProject(selectedProject);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProject(null);
  };

  return (
    <EditProjectModalContext.Provider
      value={{
        isOpen,
        project,
        openModal,
        closeModal,
      }}
    >
      {children}
    </EditProjectModalContext.Provider>
  );
}

export function useEditProjectModal() {
  const context = useContext(EditProjectModalContext);
  if (context === undefined) {
    throw new Error(
      "useEditProjectModal must be used within an EditProjectModalProvider"
    );
  }
  return context;
}
