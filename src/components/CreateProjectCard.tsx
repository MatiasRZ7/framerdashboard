"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";

interface CreateProjectCardProps {
  index: number;
}

export default function CreateProjectCard({ index }: CreateProjectCardProps) {
  const { createProject } = useProjects();
  const [isCreating, setIsCreating] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleCreate = () => {
    if (projectName.trim()) {
      createProject(projectName.trim());
      setProjectName("");
      setIsCreating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreate();
    } else if (e.key === "Escape") {
      setIsCreating(false);
      setProjectName("");
    }
  };

  if (isCreating) {
    return (
      <motion.div
        className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-blue-500 border-dashed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <div className="aspect-[4/3] bg-[#2a2a2a] flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-8 h-8 text-blue-400 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="text-xs text-blue-400">Creating project...</p>
          </div>
        </div>

        <div className="p-3">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Project name"
            className="w-full text-white text-sm font-medium bg-[#2a2a2a] border border-[#3a3a3a] rounded px-2 py-1.5 focus:outline-none focus:border-blue-500 placeholder-gray-500"
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleCreate}
              disabled={!projectName.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs py-1.5 rounded transition-colors"
            >
              Create
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setProjectName("");
              }}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-xs py-1.5 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-[#1a1a1a] rounded-lg overflow-hidden border-2 border-[#2a2a2a] border-dashed hover:border-blue-500/50 hover:border-solid hover:bg-[#1a1a1a]/80 transition-all cursor-pointer group"
      whileHover={{
        scale: 1.02,
        y: -4,
        borderColor: "rgba(59, 130, 246, 0.5)",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() => setIsCreating(true)}
    >
      <div className="aspect-[4/3] bg-[#2a2a2a] flex items-center justify-center group-hover:bg-[#333333] transition-colors">
        <div className="text-center">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.svg
              className="w-8 h-8 text-gray-600 group-hover:text-blue-400 mx-auto mb-2 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4v16m8-8H4"
              />
            </motion.svg>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-500/20 opacity-0 group-hover:opacity-100"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          <p className="text-xs text-gray-600 group-hover:text-blue-400 transition-colors font-medium">
            New Project
          </p>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-gray-500 text-sm font-medium group-hover:text-gray-400 transition-colors">
          Create new project
        </h3>
        <p className="text-xs text-gray-600 group-hover:text-gray-500 transition-colors">
          Start building something amazing
        </p>
      </div>
    </motion.div>
  );
}
