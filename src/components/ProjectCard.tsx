"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Project } from "@/types";
import { useProjects } from "@/hooks/useProjects";
import { useEditProjectModal } from "@/hooks/useEditProjectModal";
import { useMenuManager } from "@/hooks/useMenuManager";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const {
    deleteProject,
    updateProject,
    duplicateProject,
    archiveProject,
    unarchiveProject,
  } = useProjects();
  const { openModal } = useEditProjectModal();
  const { openMenuId, setOpenMenuId } = useMenuManager();
  const showMenu = openMenuId === project.id;
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(project.name);
  const [isSelected, setIsSelected] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú cuando se hace click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showMenu, setOpenMenuId]);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "Viewed just now";
    if (hours < 24) return `Viewed ${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days < 7) return `Viewed ${days} day${days > 1 ? "s" : ""} ago`;
    return `Viewed on ${date.toLocaleDateString()}`;
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "free":
        return "text-gray-400 bg-gray-800";
      case "pro":
        return "text-blue-400 bg-blue-900/50";
      case "team":
        return "text-purple-400 bg-purple-900/50";
      default:
        return "text-gray-400 bg-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "draft":
        return "bg-yellow-500";
      case "archived":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleRename = () => {
    if (newName.trim() && newName !== project.name) {
      updateProject(project.id, { name: newName.trim() });
    }
    setIsRenaming(false);
    setNewName(project.name);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRename();
    } else if (e.key === "Escape") {
      setIsRenaming(false);
      setNewName(project.name);
    }
  };

  return (
    <>
      <motion.div
        className={`bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden transition-all duration-300 group relative ${
          isSelected
            ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20"
            : "hover:border-[#444]"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{
          scale: 1.02,
          y: -4,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Thumbnail */}
        <div className="aspect-[4/3] bg-[#2a2a2a] flex items-center justify-center group-hover:bg-[#333333] transition-colors relative">
          {/* Selection area - always show status, checkbox on hover */}
          <div className="absolute top-2 left-2">
            {/* Status indicator with tooltip */}
            <div className="group/status relative">
              <div
                className={`w-3 h-3 rounded-full ${getStatusColor(
                  project.status
                )} shadow-sm transition-opacity ${
                  isSelected ? "opacity-30" : "opacity-100"
                }`}
              />

              {/* Checkbox overlay - appears on hover */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isSelected ? 1 : 0,
                  scale: isSelected ? 1 : 0.8,
                }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSelected(!isSelected);
                  }}
                  className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? "bg-blue-600 border-blue-600"
                      : "bg-black/80 border-white/60 hover:border-white backdrop-blur-sm"
                  }`}
                >
                  {isSelected && (
                    <motion.svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  )}
                </button>
              </motion.div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover/status:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {project.status.charAt(0).toUpperCase() +
                  project.status.slice(1)}
              </div>
            </div>
          </div>

          {/* Project icon/preview */}
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>

        {/* Card Content */}
        <div className="p-3">
          <div className="flex items-start justify-between mb-1">
            {isRenaming ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={handleKeyPress}
                className="text-white text-sm font-medium bg-[#2a2a2a] border border-[#3a3a3a] rounded px-1 py-0.5 flex-1 mr-2 focus:outline-none focus:border-blue-500"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h3 className="text-white text-sm font-medium flex-1 truncate">
                {project.name}
              </h3>
            )}

            <span
              className={`text-xs px-1.5 py-0.5 rounded text-[10px] font-medium uppercase ${getPlanColor(
                project.plan
              )}`}
            >
              {project.plan}
            </span>
          </div>

          {project.description && (
            <p className="text-xs text-gray-500 mb-1 truncate">
              {project.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {project.lastViewedAt
                ? formatDate(project.lastViewedAt)
                : "Never viewed"}
            </p>

            {project.tags.length > 0 && (
              <div className="flex gap-1">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] text-gray-400 bg-[#2a2a2a] px-1 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 2 && (
                  <span className="text-[9px] text-gray-400">
                    +{project.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Click overlay - exclude menu area */}
        <div
          className="absolute inset-0"
          onClick={() => openModal(project)}
          style={{ zIndex: 1 }}
        />

        {/* Menu area with higher z-index */}
        <div
          className="absolute top-2 right-2"
          style={{ zIndex: 10 }}
          onClick={(e) => e.stopPropagation()}
          data-no-drag
        >
          {/* Three dots menu button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuId(showMenu ? null : project.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 hover:bg-black/30 rounded"
            data-no-drag
          >
            <motion.svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: showMenu ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01"
              />
            </motion.svg>
          </button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                ref={menuRef}
                className="absolute top-8 right-0 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg shadow-xl py-0.5 z-50 min-w-[130px] max-h-[280px] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                onClick={(e) => e.stopPropagation()}
                data-no-drag
                style={{
                  // Ajustar posición para que no se corte
                  transform: "translateY(-70%)",
                  top: "50%",
                }}
              >
                {/* Open */}
                <button
                  onClick={() => {
                    updateProject(project.id, { lastViewedAt: new Date() });
                    setOpenMenuId(null);
                  }}
                  className="w-full px-2.5 py-1 text-left text-sm text-white hover:bg-[#3a3a3a] transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Open
                </button>

                {/* Edit */}
                <button
                  onClick={() => {
                    openModal(project);
                    setOpenMenuId(null);
                  }}
                  className="w-full px-2.5 py-1 text-left text-sm text-white hover:bg-[#3a3a3a] transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-3 h-3"
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
                  Edit
                </button>

                {/* Rename */}
                <button
                  onClick={() => {
                    setIsRenaming(true);
                    setOpenMenuId(null);
                  }}
                  className="w-full px-2.5 py-1 text-left text-sm text-white hover:bg-[#3a3a3a] transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  Rename
                </button>

                {/* Duplicate */}
                <button
                  onClick={() => {
                    duplicateProject(project);
                    setOpenMenuId(null);
                  }}
                  className="w-full px-2.5 py-1 text-left text-sm text-white hover:bg-[#3a3a3a] transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Duplicate
                </button>

                {/* Divider */}
                <div className="border-t border-[#3a3a3a] my-0.5"></div>

                {/* Move to folder */}
                <button
                  onClick={() => {
                    setOpenMenuId(null);
                  }}
                  className="w-full px-2.5 py-1 text-left text-sm text-white hover:bg-[#3a3a3a] transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  Move to folder
                </button>

                {/* Share */}
                <button
                  onClick={() => {
                    setOpenMenuId(null);
                  }}
                  className="w-full px-2.5 py-1 text-left text-sm text-white hover:bg-[#3a3a3a] transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  Share
                </button>

                {/* Divider */}
                <div className="border-t border-[#3a3a3a] my-0.5"></div>

                {/* Archive/Unarchive */}
                <button
                  onClick={() => {
                    if (project.status === "archived") {
                      unarchiveProject(project.id);
                    } else {
                      archiveProject(project.id);
                    }
                    setOpenMenuId(null);
                  }}
                  className="w-full px-2.5 py-1 text-left text-sm text-white hover:bg-[#3a3a3a] transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-3 h-3"
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
                  {project.status === "archived" ? "Unarchive" : "Archive"}
                </button>

                {/* Delete */}
                <button
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to delete this project?")
                    ) {
                      deleteProject(project.id);
                    }
                    setOpenMenuId(null);
                  }}
                  className="w-full px-2.5 py-1 text-left text-sm text-red-400 hover:bg-red-900/20 transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
