"use client";

import {
  useState,
  useCallback,
  useEffect,
  useTransition,
  createContext,
  useContext,
} from "react";
import Modal from "../Modal";

interface AccountModalProps {
  isOpen: boolean;
}

const accountSections = [
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "workspaces", label: "Workspaces", icon: "🏢" },
  { id: "sessions", label: "Sessions", icon: "📱" },
];

// Contexto para el estado del modal
const AccountModalContext = createContext<{
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
} | null>(null);

export function AccountModalProvider({
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
    <AccountModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </AccountModalContext.Provider>
  );
}

export function useAccountModal() {
  const context = useContext(AccountModalContext);
  if (!context) {
    throw new Error("useAccountModal must be used within AccountModalProvider");
  }
  return context;
}

export function AccountModal({ isOpen }: AccountModalProps) {
  const [isPending, startTransition] = useTransition();
  const [activeSection, setActiveSection] = useState("profile");
  const { closeModal } = useAccountModal();

  // Wrapper para el evento de cierre usando startTransition
  const handleClose = () => {
    startTransition(() => {
      closeModal();
    });
  };

  const handleSectionChange = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="p-6">
            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#2a2a2a] rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Matias"
                    className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Rivera Zahn"
                    className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="workax123@googlemail.com"
                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-2">
                  This email address is associated with your Framer account.
                  <br />
                  To update your billing email, go to Workspace Settings →
                  Plans.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-sm rounded-md transition-colors">
                Sign Out
              </button>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        );

      case "workspaces":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium text-white mb-4">Workspaces</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#2a2a2a] rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white font-medium text-sm">
                  M
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">My Workspace</div>
                  <div className="text-xs text-gray-500">Owner</div>
                </div>
                <span className="text-xs text-gray-500 bg-[#1a1a1a] px-2 py-1 rounded">
                  FREE
                </span>
              </div>
            </div>
          </div>
        );

      case "sessions":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Active Sessions
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      Windows • Chrome
                    </div>
                    <div className="text-xs text-gray-500">
                      Current session • Active now
                    </div>
                  </div>
                </div>
                <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">
                  Current
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Account">
      <div className="flex h-[500px]">
        {/* Sidebar */}
        <div className="w-48 bg-[#0a0a0a] border-r border-[#2a2a2a] p-3">
          <nav className="space-y-1">
            {accountSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-left ${
                  activeSection === section.id
                    ? "bg-[#2a2a2a] text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                }`}
              >
                <span className="text-sm">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#1a1a1a]">{renderContent()}</div>
      </div>
    </Modal>
  );
}
