"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useProjects } from "@/hooks/useProjects";
import { useEditProjectModal } from "@/hooks/useEditProjectModal";

export default function EditProjectModal() {
  const { isOpen, project, closeModal } = useEditProjectModal();
  const { updateProject } = useProjects();
  const [isLoading, setIsLoading] = useState(false);
  const [isViewLoading, setIsViewLoading] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: "",
  });

  // Reset form when project changes
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || "",
        tags: project.tags.join(", "),
      });
    }
  }, [project]);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      setIsViewLoading(false);
      setShowComingSoon(false);
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!project) return;

    setIsLoading(true);

    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 800));

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    updateProject(project.id, {
      name: formData.name,
      description: formData.description || undefined,
      tags: tagsArray,
      updatedAt: new Date(),
    });

    setIsLoading(false);
    closeModal();
  };

  const handleViewProject = async () => {
    if (!project) return;

    setIsViewLoading(true);

    // Update last viewed
    updateProject(project.id, { lastViewedAt: new Date() });

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsViewLoading(false);
    setShowComingSoon(true);

    // Hide coming soon after 3 seconds
    setTimeout(() => {
      setShowComingSoon(false);
      closeModal();
    }, 3000);
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

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
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
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Edit Project
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusColor(
                        project.status
                      )}`}
                    />
                    <span className="text-xs text-gray-400 capitalize">
                      {project.status}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${getPlanColor(
                        project.plan
                      )} uppercase font-medium`}
                    >
                      {project.plan}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading || isViewLoading}
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

              {/* Coming Soon Overlay */}
              <AnimatePresence>
                {showComingSoon && (
                  <motion.div
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="text-center"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="text-4xl mb-4">🚀</div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Coming Soon!
                      </h3>
                      <p className="text-gray-400">
                        Project visualization will be available soon
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter project name"
                    disabled={isLoading || isViewLoading}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Describe your project (optional)"
                    disabled={isLoading || isViewLoading}
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="web, mobile, design (comma-separated)"
                    disabled={isLoading || isViewLoading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate tags with commas
                  </p>
                </div>

                {/* Project Info */}
                <div className="bg-[#2a2a2a] rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-gray-300">
                      {project.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Last viewed:</span>
                    <span className="text-gray-300">
                      {project.lastViewedAt
                        ? project.lastViewedAt.toLocaleDateString()
                        : "Never"}
                    </span>
                  </div>
                  {project.updatedAt && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Updated:</span>
                      <span className="text-gray-300">
                        {project.updatedAt.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-[#333]">
                {/* View Project Button */}
                <button
                  onClick={handleViewProject}
                  disabled={isLoading || isViewLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isViewLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Loading...
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View Project
                    </>
                  )}
                </button>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={isLoading || isViewLoading || !formData.name.trim()}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Save Changes
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
