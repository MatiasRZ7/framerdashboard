"use client";

import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";

export interface CommandAction {
  id: string;
  name: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords: string[];
}

interface CommandPaletteContextType {
  isOpen: boolean;
  search: string;
  selectedIndex: number;
  setSearch: (search: string) => void;
  setSelectedIndex: (index: number) => void;
  openPalette: () => void;
  closePalette: () => void;
  executeAction: (action: CommandAction) => void;
}

const CommandPaletteContext = createContext<
  CommandPaletteContextType | undefined
>(undefined);

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error(
      "useCommandPalette must be used within a CommandPaletteProvider"
    );
  }
  return context;
}

function useCommandPaletteState() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const openPalette = useCallback(() => {
    setIsOpen(true);
    setSearch("");
    setSelectedIndex(-1);
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setSearch("");
    setSelectedIndex(-1);
  }, []);

  const executeAction = useCallback(
    (action: CommandAction) => {
      action.action();
      closePalette();
    },
    [closePalette]
  );

  // Global keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openPalette();
      }

      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closePalette();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, openPalette, closePalette]);

  return {
    isOpen,
    search,
    selectedIndex,
    setSearch,
    setSelectedIndex,
    openPalette,
    closePalette,
    executeAction,
  };
}

export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const commandPalette = useCommandPaletteState();

  return (
    <CommandPaletteContext.Provider value={commandPalette}>
      {children}
    </CommandPaletteContext.Provider>
  );
}
