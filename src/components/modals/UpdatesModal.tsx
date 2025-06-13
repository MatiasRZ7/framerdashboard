"use client";

import {
  useState,
  useEffect,
  useTransition,
  createContext,
  useContext,
  useCallback,
} from "react";
import Modal from "../Modal";
import WebBuilderStatusBadge from "../WebBuilderStatusBadge";

// Estado global para el modal
let isUpdatesModalOpen = false;
let setUpdatesModalOpenCallback: ((isOpen: boolean) => void) | null = null;

interface UpdatesModalProps {
  isOpen: boolean;
}

const updates = [
  {
    id: 1,
    title: "🎉 Web Builder Now Live!",
    description:
      "Our advanced web builder is now fully functional! Create stunning websites with drag & drop, vector tools, and real-time editing.",
    date: "Just now",
    type: "feature",
  },
  {
    id: 2,
    title: "New Component Library",
    description:
      "We've added a comprehensive component library with over 100 pre-built components.",
    date: "2 days ago",
    type: "feature",
  },
  {
    id: 3,
    title: "Performance Improvements",
    description:
      "Faster loading times and improved rendering performance across all projects.",
    date: "1 week ago",
    type: "improvement",
  },
  {
    id: 4,
    title: "Bug Fixes",
    description:
      "Fixed issues with project sharing and collaboration features.",
    date: "2 weeks ago",
    type: "fix",
  },
];

// Contexto para el estado del modal
const UpdatesModalContext = createContext<{
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
} | null>(null);

export function UpdatesModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <UpdatesModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </UpdatesModalContext.Provider>
  );
}

export function useUpdatesModal() {
  const context = useContext(UpdatesModalContext);
  if (!context) {
    throw new Error("useUpdatesModal must be used within UpdatesModalProvider");
  }
  return context;
}

export function UpdatesModal({ isOpen }: UpdatesModalProps) {
  const [isPending, startTransition] = useTransition();
  const { closeModal } = useUpdatesModal();

  // Wrapper para el evento de cierre usando startTransition
  const handleClose = () => {
    startTransition(() => {
      closeModal();
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "bg-blue-500/10 text-blue-400";
      case "improvement":
        return "bg-green-500/10 text-green-400";
      case "fix":
        return "bg-orange-500/10 text-orange-400";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Updates"
      width="max-w-2xl"
    >
      <div className="p-6">
        {/* Web Builder Status Badge */}
        <div className="flex justify-center mb-6">
          <WebBuilderStatusBadge size="md" />
        </div>

        <div className="space-y-4">
          {updates.map((update) => (
            <div key={update.id} className="bg-[#2a2a2a] rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-medium">{update.title}</h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getTypeColor(
                      update.type
                    )}`}
                  >
                    {update.type}
                  </span>
                  <span className="text-xs text-gray-500">{update.date}</span>
                </div>
              </div>
              <p className="text-sm text-gray-400">{update.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            View all updates
          </button>
        </div>
      </div>
    </Modal>
  );
}
