import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { CommandAction } from "@/hooks/useCommandPalette";

interface CommandPaletteProps {
  isOpen: boolean;
  search: string;
  selectedIndex: number;
  actions: CommandAction[];
  onSearchChange: (value: string) => void;
  onSelectedIndexChange: (index: number) => void;
  onExecuteAction: (action: CommandAction) => void;
  onClose: () => void;
}

// Fuzzy search function
function fuzzySearch(needle: string, haystack: string): boolean {
  if (!needle) return true;

  const hlen = haystack.length;
  const nlen = needle.length;

  if (nlen > hlen) return false;
  if (nlen === hlen) return needle.toLowerCase() === haystack.toLowerCase();

  let j = 0;
  for (let i = 0; i < hlen && j < nlen; i++) {
    if (haystack[i].toLowerCase() === needle[j].toLowerCase()) {
      j++;
    }
  }

  return j === nlen;
}

export default function CommandPalette({
  isOpen,
  search,
  selectedIndex,
  actions,
  onSearchChange,
  onSelectedIndexChange,
  onExecuteAction,
  onClose,
}: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter actions based on search
  const filteredActions = useMemo(() => {
    if (!search.trim()) return actions;

    return actions.filter((action) => {
      const searchTerms = [
        action.name,
        action.description || "",
        ...action.keywords,
      ].join(" ");

      return fuzzySearch(search, searchTerms);
    });
  }, [actions, search]);

  // Reset selected index when filtered actions change
  useEffect(() => {
    if (selectedIndex >= filteredActions.length) {
      onSelectedIndexChange(-1);
    }
  }, [filteredActions.length, selectedIndex, onSelectedIndexChange]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (selectedIndex === -1) {
            onSelectedIndexChange(0);
          } else {
            onSelectedIndexChange(
              selectedIndex < filteredActions.length - 1 ? selectedIndex + 1 : 0
            );
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (selectedIndex === -1) {
            onSelectedIndexChange(filteredActions.length - 1);
          } else {
            onSelectedIndexChange(
              selectedIndex > 0 ? selectedIndex - 1 : filteredActions.length - 1
            );
          }
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex !== -1 && filteredActions[selectedIndex]) {
            onExecuteAction(filteredActions[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    selectedIndex,
    filteredActions,
    onSelectedIndexChange,
    onExecuteAction,
    onClose,
  ]);

  // Handle mouse interactions to reset selection when scrolling/moving mouse
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = () => {
      // Reset selection when mouse moves (indicating user is using mouse instead of keyboard)
      if (selectedIndex !== -1) {
        onSelectedIndexChange(-1);
      }
    };

    const resultsContainer = document.querySelector("[data-results-container]");
    if (resultsContainer) {
      resultsContainer.addEventListener("mousemove", handleMouseMove);
      return () =>
        resultsContainer.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isOpen, selectedIndex, onSelectedIndexChange]);

  if (!isOpen) return null;

  const content = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Command Palette */}
        <motion.div
          className="relative w-full max-w-2xl mx-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="border-b border-[#2a2a2a] p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-[#2a2a2a] rounded-lg">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-white text-lg placeholder-gray-500 outline-none"
                spellCheck={false}
              />
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <kbd className="px-1.5 py-0.5 bg-[#2a2a2a] rounded text-[10px] font-mono">
                  ⌘K
                </kbd>
                <span>to open</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div
            className="max-h-80 overflow-y-auto scrollbar-hide"
            data-results-container
          >
            {filteredActions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-500 mb-2">
                  <svg
                    className="w-8 h-8 mx-auto mb-3 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">No commands found</p>
                <p className="text-xs text-gray-600 mt-1">
                  Try searching for something else
                </p>
              </div>
            ) : (
              <div className="py-2">
                {filteredActions.map((action, index) => (
                  <motion.button
                    key={action.id}
                    onClick={() => onExecuteAction(action)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      index === selectedIndex && selectedIndex !== -1
                        ? "bg-blue-600/20 text-white"
                        : "text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    whileHover={{ x: 2 }}
                  >
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                        index === selectedIndex && selectedIndex !== -1
                          ? "bg-blue-600/30"
                          : "bg-[#2a2a2a]"
                      }`}
                    >
                      {action.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{action.name}</div>
                      {action.description && (
                        <div className="text-sm text-gray-500 truncate">
                          {action.description}
                        </div>
                      )}
                    </div>
                    {index === selectedIndex && selectedIndex !== -1 && (
                      <div className="text-xs text-gray-500">
                        <kbd className="px-1.5 py-0.5 bg-[#2a2a2a] rounded font-mono">
                          ↵
                        </kbd>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-[#2a2a2a] px-4 py-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[#2a2a2a] rounded font-mono">
                    ↑↓
                  </kbd>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[#2a2a2a] rounded font-mono">
                    ↵
                  </kbd>
                  <span>to select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[#2a2a2a] rounded font-mono">
                    esc
                  </kbd>
                  <span>to close</span>
                </div>
              </div>
              <div className="text-gray-600">
                {filteredActions.length}{" "}
                {filteredActions.length === 1 ? "command" : "commands"}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Render to portal for proper z-index layering
  return typeof window !== "undefined"
    ? createPortal(content, document.body)
    : null;
}
