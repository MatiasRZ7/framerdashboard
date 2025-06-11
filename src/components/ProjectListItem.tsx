"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Project } from "@/types";
import { useProjects } from "@/hooks/useProjects";
import { useEditProjectModal } from "@/hooks/useEditProjectModal";
import { useDeleteConfirmModal } from "@/hooks/useDeleteConfirmModal";
import { useMenuManager } from "@/hooks/useMenuManager";

interface ProjectListItemProps {
  project: Project;
  index: number;
}

export default function ProjectListItem({
  project,
  index,
}: ProjectListItemProps) {
  const {
    deleteProject,
    updateProject,
    duplicateProject,
    archiveProject,
    unarchiveProject,
  } = useProjects();
  const { openModal } = useEditProjectModal();
  const { openModal: openDeleteModal } = useDeleteConfirmModal();
  const { openMenuId, setOpenMenuId } = useMenuManager();
  const showMenu = openMenuId === project.id;
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(project.name);
  const menuRef = useRef<HTMLDivElement>(null);

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
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "free":
        return "bg-gray-600 text-gray-200";
      case "pro":
        return "bg-blue-600 text-blue-200";
      case "team":
        return "bg-purple-600 text-purple-200";
      default:
        return "bg-gray-600 text-gray-200";
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
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRename();
    } else if (e.key === "Escape") {
      setNewName(project.name);
      setIsRenaming(false);
    }
  };

  return (
    <motion.div
      className="bg-[#1a1a1a] border border-[#333] rounded-lg hover:border-[#444] transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      whileHover={{ scale: 1.01 }}
      onMouseEnter={() => {
        // Si hay un menú abierto y no es el de este proyecto, cerrarlo
        if (openMenuId && openMenuId !== project.id) {
          setOpenMenuId(null);
        }
      }}
    >
      <div className="flex items-center p-4 gap-4">
        {/* Thumbnail */}
        <div className="w-12 h-12 bg-[#2a2a2a] rounded-lg flex items-center justify-center flex-shrink-0">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <svg
              className="w-6 h-6 text-gray-600"
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

        {/* Project Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div
              className={`w-2 h-2 rounded-full ${getStatusColor(
                project.status
              )} flex-shrink-0`}
            />
            {isRenaming ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={handleKeyPress}
                className="text-white text-sm font-medium bg-[#2a2a2a] border border-[#3a3a3a] rounded px-2 py-1 flex-1 focus:outline-none focus:border-blue-500"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h3 className="text-white text-sm font-medium truncate flex-1">
                {project.name}
              </h3>
            )}
            <span
              className={`text-xs px-2 py-1 rounded uppercase font-medium ${getPlanColor(
                project.plan
              )} flex-shrink-0`}
            >
              {project.plan}
            </span>
          </div>

          {project.description && (
            <p className="text-xs text-gray-500 mb-2 truncate">
              {project.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>
              {project.lastViewedAt
                ? `Viewed ${formatDate(project.lastViewedAt)}`
                : "Never viewed"}
            </span>
            <span>Created {formatDate(project.createdAt)}</span>
            {project.tags.length > 0 && (
              <div className="flex gap-1">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-gray-400 bg-[#2a2a2a] px-1.5 py-0.5 rounded text-[10px]"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 2 && (
                  <span className="text-gray-400 text-[10px]">
                    +{project.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div
          className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          data-no-drag
        >
          <motion.button
            onClick={() => openModal(project)}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-no-drag
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </motion.button>

          {/* Three dots menu */}
          <div className="relative" ref={menuRef} data-no-drag>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId(showMenu ? null : project.id);
              }}
              className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-no-drag
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2-.9-2-2-2z" />
              </svg>
            </motion.button>

            {showMenu && (
              <motion.div
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
                    openDeleteModal(project);
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
          </div>
        </div>
      </div>
    </motion.div>
  );
}
