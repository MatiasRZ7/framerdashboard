"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface InviteMemberModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const InviteMemberModalContext = createContext<
  InviteMemberModalContextType | undefined
>(undefined);

export function InviteMemberModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <InviteMemberModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </InviteMemberModalContext.Provider>
  );
}

export function useInviteMemberModal() {
  const context = useContext(InviteMemberModalContext);
  if (context === undefined) {
    throw new Error(
      "useInviteMemberModal must be used within an InviteMemberModalProvider"
    );
  }
  return context;
}
