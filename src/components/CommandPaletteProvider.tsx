"use client";

import { useMemo } from "react";
import { useCommandPalette, CommandAction } from "@/hooks/useCommandPalette";
import CommandPalette from "./CommandPalette";
import { useNewProjectModal } from "@/hooks/useNewProjectModal";
import { useInviteMemberModal } from "@/hooks/useInviteMemberModal";
import { useAccountModal } from "./modals/AccountModal";
import { useSettingsModal } from "./modals/SettingsModal";
import { useUpdatesModal } from "./modals/UpdatesModal";
import { useContactModal } from "./modals/ContactModal";
import { useDashboard } from "@/hooks/useDashboard";
import { useProjects } from "@/hooks/useProjects";

export default function CommandPaletteContent() {
  const {
    isOpen,
    search,
    selectedIndex,
    setSearch,
    setSelectedIndex,
    executeAction,
    closePalette,
  } = useCommandPalette();

  // Modal hooks
  const { openModal: openNewProject } = useNewProjectModal();
  const { openModal: openInviteMember } = useInviteMemberModal();
  const { openModal: openAccount } = useAccountModal();
  const { openModal: openSettings } = useSettingsModal();
  const { openModal: openUpdates } = useUpdatesModal();
  const { openModal: openContact } = useContactModal();

  // Other hooks
  const { toggleDashboard, showDashboard } = useDashboard();
  const { projects, setFilterBy, setSearchQuery } = useProjects();

  // Define all available actions
  const actions: CommandAction[] = useMemo(() => {
    const baseActions: CommandAction[] = [
      {
        id: "new-project",
        name: "Create New Project",
        description: "Start a new project",
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
              d="M12 4v16m8-8H4"
            />
          </svg>
        ),
        action: openNewProject,
        keywords: ["create", "new", "project", "add"],
      },
      {
        id: "invite-member",
        name: "Invite Team Member",
        description: "Add someone to your workspace",
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
        action: openInviteMember,
        keywords: ["invite", "member", "team", "collaborate", "add", "user"],
      },
      {
        id: "dashboard",
        name: showDashboard ? "Hide Dashboard" : "Show Dashboard",
        description: showDashboard
          ? "Hide analytics dashboard"
          : "View analytics and insights",
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
        action: toggleDashboard,
        keywords: ["dashboard", "analytics", "insights", "stats", "overview"],
      },
      {
        id: "account",
        name: "Account Settings",
        description: "Manage your account",
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
        action: openAccount,
        keywords: ["account", "profile", "user", "settings"],
      },
      {
        id: "settings",
        name: "Settings",
        description: "Configure your workspace",
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
        action: openSettings,
        keywords: ["settings", "preferences", "config", "workspace"],
      },
      {
        id: "updates",
        name: "What's New",
        description: "See recent updates and features",
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
        action: openUpdates,
        keywords: ["updates", "news", "features", "changelog", "new"],
      },
      {
        id: "contact",
        name: "Contact Support",
        description: "Get help or send feedback",
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
        action: openContact,
        keywords: ["contact", "support", "help", "feedback", "bug"],
      },
      {
        id: "filter-all",
        name: "Show All Projects",
        description: "View all projects in workspace",
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
        action: () => setFilterBy("all"),
        keywords: ["all", "projects", "view", "filter", "show"],
      },
      {
        id: "filter-draft",
        name: "Show Draft Projects",
        description: "View only draft projects",
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        ),
        action: () => setFilterBy("draft"),
        keywords: ["draft", "projects", "filter", "wip", "work in progress"],
      },
      {
        id: "filter-published",
        name: "Show Published Projects",
        description: "View only published projects",
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        ),
        action: () => setFilterBy("published"),
        keywords: ["published", "projects", "filter", "live", "completed"],
      },
      {
        id: "clear-search",
        name: "Clear Search",
        description: "Remove current search filters",
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ),
        action: () => setSearchQuery(""),
        keywords: ["clear", "search", "reset", "remove", "filter"],
      },
    ];

    // Add project-specific search actions
    const projectActions: CommandAction[] = projects
      .slice(0, 8)
      .map((project) => ({
        id: `project-${project.id}`,
        name: `Go to ${project.name}`,
        description: `Open ${project.name} project`,
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
        action: () => {
          // In a real app, this would navigate to the project

          alert(`Would open project: ${project.name}`);
        },
        keywords: [
          "project",
          "go to",
          "open",
          project.name.toLowerCase(),
          ...project.tags,
        ],
      }));

    return [...baseActions, ...projectActions];
  }, [
    openNewProject,
    openInviteMember,
    openAccount,
    openSettings,
    openUpdates,
    openContact,
    toggleDashboard,
    showDashboard,
    setFilterBy,
    setSearchQuery,
    projects,
  ]);

  return (
    <CommandPalette
      isOpen={isOpen}
      search={search}
      selectedIndex={selectedIndex}
      actions={actions}
      onSearchChange={setSearch}
      onSelectedIndexChange={setSelectedIndex}
      onExecuteAction={executeAction}
      onClose={closePalette}
    />
  );
}
