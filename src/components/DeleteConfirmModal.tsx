"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { useDeleteConfirmModal } from "@/hooks/useDeleteConfirmModal";
import { useProjects } from "@/hooks/useProjects";

interface DeleteConfirmModalProps {
  onDelete?: (projectName: string) => void;
}

export default function DeleteConfirmModal({
  onDelete,
}: DeleteConfirmModalProps) {
  const { isOpen, closeModal, projectToDelete } = useDeleteConfirmModal();
  const { deleteProject } = useProjects();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);

    // Simulate deletion process
    await new Promise((resolve) => setTimeout(resolve, 500));

    deleteProject(projectToDelete.id);

    setIsDeleting(false);
    closeModal();

    // Callback for showing toast after 2 seconds
    if (onDelete) {
      setTimeout(() => {
        onDelete(projectToDelete.name);
      }, 2000);
    }
  }, [projectToDelete, deleteProject, closeModal, onDelete]);

  const handleClose = useCallback(() => {
    if (!isDeleting) {
      closeModal();
    }
  }, [isDeleting, closeModal]);

  return (
    <AnimatePresence>
      {isOpen && projectToDelete && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              className="bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl w-full max-w-md"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#333]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-900/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-red-400"
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
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Delete Project
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                  disabled={isDeleting}
                >
                  <svg
                    className="w-6 h-6"
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
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-300 text-center">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-white">
                    "{projectToDelete.name}"
                  </span>
                  ?
                </p>
                <p className="text-sm text-gray-400 text-center mt-2">
                  All project data will be permanently removed from your
                  account.
                </p>

                {/* Project Preview */}
                <div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#3a3a3a] mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-gray-600"
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
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-sm font-medium">
                        {projectToDelete.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {projectToDelete.description || "No description"}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                        <span className="text-xs text-gray-400">
                          {projectToDelete.status}
                        </span>
                        <span className="text-xs px-1.5 py-0.5 bg-gray-600 text-gray-200 rounded uppercase font-medium">
                          {projectToDelete.plan}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-[#333]">
                <button
                  onClick={handleClose}
                  disabled={isDeleting}
                  className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] disabled:bg-[#2a2a2a] text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete Project
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
