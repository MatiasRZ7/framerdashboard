"use client";

import { motion } from "framer-motion";
import { useInviteMemberModal } from "@/hooks/useInviteMemberModal";
import { useNewProjectModal } from "@/hooks/useNewProjectModal";
import { useColors } from "../hooks/useColors";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import WebBuilderStatusBadge from "./WebBuilderStatusBadge";

export default function Header() {
  const { openModal: openInviteModal } = useInviteMemberModal();
  const { openModal: openNewProjectModal } = useNewProjectModal();
  const { classes } = useColors();
  const { openPalette } = useCommandPalette();

  return (
    <motion.header
      className={`h-14 ${classes.bg.primary} border-b ${classes.border.primary} flex items-center justify-end px-4`}
      initial={{ y: -56 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Web Builder Status Badge */}
        <WebBuilderStatusBadge size="sm" />
        {/* Command Palette Button */}
        <motion.button
          onClick={openPalette}
          className={`flex items-center gap-2 px-3 py-1.5 ${classes.bg.secondary} ${classes.bg.hover} ${classes.text.secondary} text-sm rounded-md border ${classes.border.primary} transition-colors group`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          title="Open command palette (⌘K)"
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-xs bg-gray-600/50 rounded font-mono">
            ⌘K
          </kbd>
        </motion.button>

        {/* Team Members */}
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
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
          <span>1</span>
        </div>

        {/* Invite Member Button */}
        <motion.button
          onClick={openInviteModal}
          className={`px-3 py-1.5 ${classes.bg.secondary} ${classes.bg.hover} ${classes.text.secondary} text-sm rounded-md border ${classes.border.primary} transition-colors`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Invite Member
        </motion.button>

        {/* New Project Button */}
        <motion.button
          onClick={openNewProjectModal}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md font-medium transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          New Project
        </motion.button>
      </div>
    </motion.header>
  );
}
