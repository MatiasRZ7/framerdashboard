"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface MenuManagerContextType {
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  closeAllMenus: () => void;
}

const MenuManagerContext = createContext<MenuManagerContextType | null>(null);

export function MenuManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const closeAllMenus = useCallback(() => {
    setOpenMenuId(null);
  }, []);

  return (
    <MenuManagerContext.Provider
      value={{
        openMenuId,
        setOpenMenuId,
        closeAllMenus,
      }}
    >
      {children}
    </MenuManagerContext.Provider>
  );
}

export function useMenuManager() {
  const context = useContext(MenuManagerContext);
  if (!context) {
    throw new Error("useMenuManager must be used within a MenuManagerProvider");
  }
  return context;
}
