"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useContactModal } from "./modals/ContactModal";
import { useAccountModal } from "./modals/AccountModal";
import { useSettingsModal } from "./modals/SettingsModal";
import { useUpdatesModal } from "./modals/UpdatesModal";
import { useProjects } from "@/hooks/useProjects";
import { useColors } from "../hooks/useColors";
import { useFolders } from "@/hooks/useFolders";
import { useDashboard } from "@/hooks/useDashboard";
import DragDropZone from "./DragDropZone";

export default function Sidebar() {
  const { openModal: openAccount } = useAccountModal();
  const { openModal: openSettings } = useSettingsModal();
  const { openModal: openUpdates } = useUpdatesModal();
  const { openModal: openContact } = useContactModal();
  const {
    projects,
    archivedProjects,
    filterBy,
    setFilterBy,
    getProjectsByFolder,
  } = useProjects();
  const { classes } = useColors();
  const { folders, createFolder } = useFolders();

  // Debug: Log folders when they change
  useEffect(() => {}, [folders]);
  const { showDashboard, toggleDashboard } = useDashboard();

  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsWorkspaceDropdownOpen(false);
      }
    }

    if (isWorkspaceDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isWorkspaceDropdownOpen]);

  const handleAccountClick = () => {
    openAccount();
  };

  const handleSettingsClick = () => {
    openSettings();
  };

  const handleUpdatesClick = () => {
    openUpdates();
  };

  const handleContactClick = () => {
    openContact();
  };

  const handleLogOut = () => {
    alert("Log out functionality will be implemented with authentication");
  };

  const handleAddWorkspace = () => {
    const workspaceName = prompt("Enter workspace name:");
    if (workspaceName?.trim()) {
      alert(`Workspace "${workspaceName}" would be created here`);
    }
  };

  const handleNewFolder = () => {
    const folderName = prompt("Enter folder name:");
    if (folderName?.trim()) {
      createFolder(folderName);
    }
  };

  const sidebarItems = [
    {
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      label: "Account",
      active: false,
      onClick: handleAccountClick,
    },
    {
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      label: "Settings",
      active: false,
      onClick: handleSettingsClick,
    },
    {
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      label: "Updates",
      active: false,
      onClick: handleUpdatesClick,
    },
    {
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      label: "Contact",
      active: false,
      onClick: handleContactClick,
    },
    {
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      label: "Dashboard",
      active: showDashboard,
      onClick: toggleDashboard,
    },
  ];

  const handleProjectNavigation = (filterValue: string) => {
    setFilterBy(filterValue);
    if (showDashboard) {
      toggleDashboard(); // Desactivar dashboard si está activo
    }
  };

  const projectItems = [
    {
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      label: "All",
      active: filterBy === "all",
      onClick: () => handleProjectNavigation("all"),
    },
    {
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      ),
      label: "Archive",
      active: filterBy === "archived",
      count: archivedProjects.length,
      onClick: () => handleProjectNavigation("archived"),
    },
    ...folders.map((folder) => ({
      icon: <span className="text-sm">{folder.icon}</span>,
      label: folder.name,
      active: filterBy === folder.id,
      count: getProjectsByFolder(folder.id).length,
      onClick: () => handleProjectNavigation(folder.id),
      isFolder: true,
    })),
  ];

  return (
    <motion.aside
      className={`w-48 ${classes.bg.secondary} border-r ${classes.border.primary} flex flex-col h-screen`}
      initial={{ x: -192 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        position: "relative",
        zIndex: 1,
        pointerEvents: "auto",
      }}
    >
      {/* Workspace Header with Dropdown */}
      <div
        className={`px-3 py-3 border-b ${classes.border.primary} relative`}
        ref={dropdownRef}
      >
        <motion.button
          onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
          className={`flex items-center gap-2 w-full ${classes.bg.hover} rounded-md p-1 transition-colors`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-white font-medium text-xs">
            M
          </div>
          <div className="flex items-center gap-1 flex-1">
            <span className={`${classes.text.primary} text-sm font-medium`}>
              My Workspace
            </span>
            <motion.svg
              className="w-3 h-3 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isWorkspaceDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </div>
        </motion.button>

        {/* Workspace Dropdown */}
        <AnimatePresence>
          {isWorkspaceDropdownOpen && (
            <motion.div
              className="absolute top-full left-2 right-2 mt-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg shadow-xl py-2 z-50"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {/* Current Workspace */}
              <div className="px-3 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
                Workspaces
              </div>

              <button className="w-full px-3 py-2 text-left text-sm text-white hover:bg-[#3a3a3a] transition-colors flex items-center gap-2">
                <svg
                  className="w-3 h-3 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>My Workspace</span>
                <span className="ml-auto text-xs px-1.5 py-0.5 bg-gray-600 text-gray-200 rounded uppercase font-medium">
                  FREE
                </span>
              </button>

              <div className="border-t border-[#3a3a3a] my-1"></div>

              {/* Add Workspace */}
              <button
                onClick={handleAddWorkspace}
                className="w-full px-3 py-2 text-left text-sm text-white hover:bg-[#3a3a3a] transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Workspace
              </button>

              <div className="border-t border-[#3a3a3a] my-1"></div>

              {/* Workspace Templates */}
              <button className="w-full px-3 py-2 text-left text-sm text-gray-400 hover:text-white hover:bg-[#3a3a3a] transition-colors">
                Workspace Templates
              </button>

              {/* Sign Out */}
              <button
                onClick={handleLogOut}
                className="w-full px-3 py-2 text-left text-sm text-white hover:bg-[#3a3a3a] transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-2">
        <nav className="px-2 space-y-0.5">
          {sidebarItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={item.onClick}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors text-left ${
                item.active
                  ? "bg-[#2a2a2a] text-white"
                  : "text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {item.icon}
              {item.label}
            </motion.button>
          ))}
        </nav>

        {/* Projects Section */}
        <div className="mt-6 px-2" style={{ position: "relative", zIndex: 2 }}>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 px-2">
            Projects
          </h3>
          <nav
            className="space-y-2"
            style={{ position: "relative", zIndex: 3 }}
          >
            {projectItems
              .filter((item) => !(item as any).isFolder)
              .map((item) => (
                <motion.button
                  key={item.label}
                  onClick={item.onClick}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors text-left ${
                    item.active
                      ? "bg-[#2a2a2a] text-white"
                      : "text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="text-xs bg-[#3a3a3a] text-gray-300 px-1.5 py-0.5 rounded">
                      {item.count}
                    </span>
                  )}
                </motion.button>
              ))}

            {/* Folders with Drag & Drop */}
            {folders.map((folder, index) => (
              <DragDropZone
                key={folder.id}
                folderId={folder.id}
                folderName={folder.name}
                folderIcon={folder.icon}
                isActive={filterBy === folder.id}
                projectCount={getProjectsByFolder(folder.id).length}
                onClick={() => handleProjectNavigation(folder.id)}
              />
            ))}

            {/* New Folder Button */}
            <motion.button
              onClick={handleNewFolder}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-500 hover:text-gray-300 hover:bg-[#2a2a2a] transition-colors w-full text-left"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Folder...
            </motion.button>
          </nav>
        </div>
      </div>
    </motion.aside>
  );
}
