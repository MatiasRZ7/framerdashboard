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

// Estado global para el modal
let isSettingsModalOpen = false;
let setSettingsModalOpenCallback: ((isOpen: boolean) => void) | null = null;

interface SettingsModalProps {
  isOpen: boolean;
}

const settingsSections = [
  { id: "invite", label: "Invite", icon: "📧" },
  { id: "members", label: "Members", icon: "👥" },
  { id: "plans", label: "Plans", icon: "💳" },
  { id: "permissions", label: "Permissions", icon: "🔒" },
  { id: "fonts", label: "Fonts", icon: "🔤" },
  { id: "details", label: "Details", icon: "📋" },
];

// Contexto para el estado del modal
const SettingsModalContext = createContext<{
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
} | null>(null);

export function SettingsModalProvider({
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
    <SettingsModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </SettingsModalContext.Provider>
  );
}

export function useSettingsModal() {
  const context = useContext(SettingsModalContext);
  if (!context) {
    throw new Error(
      "useSettingsModal must be used within SettingsModalProvider"
    );
  }
  return context;
}

export function SettingsModal({ isOpen }: SettingsModalProps) {
  const [isPending, startTransition] = useTransition();
  const [activeSection, setActiveSection] = useState("invite");
  const { closeModal } = useSettingsModal();

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
      case "invite":
        return (
          <div className="p-6">
            {/* Invite via Link */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">
                Invite via Link
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value="pace--LUNKdipqSJIKqTNuyB"
                  readOnly
                  className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-white text-sm focus:outline-none"
                />
                <select className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-white text-sm">
                  <option>Editor</option>
                  <option>Viewer</option>
                </select>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors">
                  Copy
                </button>
              </div>
            </div>

            {/* Invite via Email */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-3">
                Invite via Email
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="email"
                  placeholder="Emails (comma separated)"
                  className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <select className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-white text-sm">
                  <option>Editor</option>
                  <option>Viewer</option>
                </select>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors">
                  Invite
                </button>
              </div>
            </div>

            {/* Pending Invites */}
            <div className="text-center py-8">
              <div className="text-gray-500 text-sm">
                There are no pending invites
                <br />
                for this workspace.
              </div>
            </div>
          </div>
        );

      case "members":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium text-white mb-4">Members</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#2a2a2a] rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  M
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">
                    Matias Rivera Zahn
                  </div>
                  <div className="text-xs text-gray-500">
                    workax123@googlemail.com
                  </div>
                </div>
                <span className="text-xs text-gray-500 bg-[#1a1a1a] px-2 py-1 rounded">
                  Owner
                </span>
              </div>
            </div>
          </div>
        );

      case "plans":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium text-white mb-4">Plans</h3>
            <div className="bg-[#2a2a2a] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-white font-medium">Free Plan</div>
                <span className="text-xs text-gray-500 bg-[#1a1a1a] px-2 py-1 rounded">
                  CURRENT
                </span>
              </div>
              <div className="text-sm text-gray-400 mb-4">
                Perfect for personal projects and getting started
              </div>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors">
                Upgrade to Pro
              </button>
            </div>
          </div>
        );

      case "permissions":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium text-white mb-4">Permissions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Project Creation</div>
                  <div className="text-sm text-gray-500">
                    Who can create new projects
                  </div>
                </div>
                <select className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-white text-sm">
                  <option>Everyone</option>
                  <option>Admins only</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Invite Members</div>
                  <div className="text-sm text-gray-500">
                    Who can invite new members
                  </div>
                </div>
                <select className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-white text-sm">
                  <option>Everyone</option>
                  <option>Admins only</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "fonts":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Custom Fonts
            </h3>
            <div className="text-center py-8">
              <div className="text-gray-500 text-sm mb-4">
                No custom fonts uploaded yet
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors">
                Upload Font
              </button>
            </div>
          </div>
        );

      case "details":
        return (
          <div className="p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Workspace Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Workspace Name
                </label>
                <input
                  type="text"
                  defaultValue="My Workspace"
                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Add a description for your workspace..."
                  rows={3}
                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Settings">
      <div className="flex h-[500px]">
        {/* Sidebar */}
        <div className="w-48 bg-[#0a0a0a] border-r border-[#2a2a2a] p-3">
          <nav className="space-y-1">
            {settingsSections.map((section) => (
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
