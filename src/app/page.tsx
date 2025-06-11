"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ProjectsHeader from "@/components/ProjectsHeader";
import ProjectCard from "@/components/ProjectCard";
import ProjectListItem from "@/components/ProjectListItem";
import CreateProjectCard from "@/components/CreateProjectCard";
import { useProjects, ProjectsProvider } from "@/hooks/useProjects";
import {
  ContactModal,
  useContactModal,
  ContactModalProvider,
} from "@/components/modals/ContactModal";
import {
  AccountModal,
  useAccountModal,
  AccountModalProvider,
} from "@/components/modals/AccountModal";
import {
  SettingsModal,
  useSettingsModal,
  SettingsModalProvider,
} from "@/components/modals/SettingsModal";
import {
  UpdatesModal,
  useUpdatesModal,
  UpdatesModalProvider,
} from "@/components/modals/UpdatesModal";
import EditProjectModal from "@/components/EditProjectModal";
import { EditProjectModalProvider } from "@/hooks/useEditProjectModal";
import InviteMemberModal from "@/components/InviteMemberModal";
import { InviteMemberModalProvider } from "@/hooks/useInviteMemberModal";
import NewProjectModal from "@/components/NewProjectModal";
import { NewProjectModalProvider } from "@/hooks/useNewProjectModal";
import { ThemeProvider } from "../hooks/useTheme";
import { useColors } from "../hooks/useColors";
import { useLocalStorageDebug } from "../hooks/useLocalStorage";
import { FoldersProvider } from "../hooks/useFolders";
import { DashboardProvider, useDashboard } from "../hooks/useDashboard";
import { MenuManagerProvider } from "../hooks/useMenuManager";
import Dashboard from "@/components/Dashboard";
import DraggableProject from "@/components/DraggableProject";
import Toast from "@/components/Toast";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { CommandPaletteProvider } from "@/hooks/useCommandPalette";
import CommandPaletteContent from "@/components/CommandPaletteProvider";

function ProjectsGrid() {
  const { filteredProjects, isLoading, viewMode } = useProjects();

  if (isLoading) {
    return (
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Loading skeletons */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#2a2a2a] animate-pulse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <div className="aspect-[4/3] bg-[#2a2a2a]"></div>
            <div className="p-3">
              <div className="h-3 bg-[#2a2a2a] rounded mb-2"></div>
              <div className="h-2 bg-[#2a2a2a] rounded w-2/3"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (filteredProjects.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          className="w-16 h-16 text-gray-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 className="text-lg font-medium text-white mb-2">
          No projects found
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          Try adjusting your search or create a new project to get started.
        </p>
      </motion.div>
    );
  }

  if (viewMode === "list") {
    return (
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Project list items */}
        {filteredProjects.map((project, index) => (
          <DraggableProject key={project.id} project={project}>
            <ProjectListItem project={project} index={index} />
          </DraggableProject>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Create new project card */}
      <CreateProjectCard index={0} />

      {/* Project cards */}
      {filteredProjects.map((project, index) => (
        <DraggableProject key={project.id} project={project}>
          <ProjectCard project={project} index={index + 1} />
        </DraggableProject>
      ))}
    </motion.div>
  );
}

function HomeContent() {
  const { isOpen: isAccountOpen } = useAccountModal();
  const { isOpen: isSettingsOpen } = useSettingsModal();
  const { isOpen: isUpdatesOpen } = useUpdatesModal();
  const { isOpen: isContactOpen } = useContactModal();
  const { showDashboard } = useDashboard();
  const { classes } = useColors();
  const { moveProjectToFolder } = useProjects();
  const { clearAll, logCurrentData } = useLocalStorageDebug();
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<
    "success" | "info" | "warning" | "error"
  >("info");
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (
    message: string,
    type: "success" | "info" | "warning" | "error" = "info"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const projectId = active.id as string;
    const folderId = over.id as string;
    const dropTargetType = over.data.current?.type;

    // Only move if dropping on a folder
    if (dropTargetType === "folder") {
      moveProjectToFolder(projectId, folderId);

      const folderName = over.data.current?.folderName || "folder";
      showToastMessage(`Project moved to ${folderName}!`, "success");
    } else {
    }
  };

  // Debug keyboard shortcuts (only in development)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Shift+C to clear localStorage
      if (event.ctrlKey && event.shiftKey && event.key === "C") {
        event.preventDefault();
        clearAll();
        showToastMessage("localStorage cleared! Reloading...", "warning");
        setTimeout(() => window.location.reload(), 1000);
      }
      // Ctrl+Shift+L to log localStorage data
      if (event.ctrlKey && event.shiftKey && event.key === "L") {
        event.preventDefault();
        logCurrentData();
        showToastMessage("localStorage data logged to console", "info");
      }
    };

    if (process.env.NODE_ENV === "development") {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [clearAll, logCurrentData]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={`flex h-screen ${classes.bg.primary}`}>
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          {/* Main Content */}
          <main className="flex-1 p-4 overflow-auto">
            {showDashboard ? (
              <Dashboard />
            ) : (
              <>
                <ProjectsHeader />
                <ProjectsGrid />
              </>
            )}
          </main>
        </div>

        {/* Modals */}
        <AccountModal isOpen={isAccountOpen} />
        <SettingsModal isOpen={isSettingsOpen} />
        <UpdatesModal isOpen={isUpdatesOpen} />
        <ContactModal isOpen={isContactOpen} />
        <EditProjectModal />
        <InviteMemberModal />
        <NewProjectModal />

        {/* Toast notifications */}
        <Toast
          message={toastMessage}
          type={toastType}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />

        {/* Command Palette */}
        <CommandPaletteContent />
      </div>
    </DndContext>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <CommandPaletteProvider>
        <MenuManagerProvider>
          <DashboardProvider>
            <FoldersProvider>
              <ProjectsProvider>
                <EditProjectModalProvider>
                  <InviteMemberModalProvider>
                    <NewProjectModalProvider>
                      <AccountModalProvider>
                        <SettingsModalProvider>
                          <UpdatesModalProvider>
                            <ContactModalProvider>
                              <HomeContent />
                            </ContactModalProvider>
                          </UpdatesModalProvider>
                        </SettingsModalProvider>
                      </AccountModalProvider>
                    </NewProjectModalProvider>
                  </InviteMemberModalProvider>
                </EditProjectModalProvider>
              </ProjectsProvider>
            </FoldersProvider>
          </DashboardProvider>
        </MenuManagerProvider>
      </CommandPaletteProvider>
    </ThemeProvider>
  );
}
