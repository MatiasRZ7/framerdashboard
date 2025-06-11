"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { ProjectSortBy, ProjectFilterBy } from "@/types";

export default function ProjectsHeader() {
  const {
    filteredProjects,
    sortBy,
    filterBy,
    searchQuery,
    viewMode,
    setSortBy,
    setFilterBy,
    setSearchQuery,
    setViewMode,
  } = useProjects();

  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const sortOptions: { value: ProjectSortBy; label: string }[] = [
    { value: "lastViewed", label: "Last viewed by me" },
    { value: "created", label: "Recently created" },
    { value: "updated", label: "Recently updated" },
    { value: "name", label: "Name (A-Z)" },
  ];

  const filterOptions: {
    value: ProjectFilterBy;
    label: string;
    count?: number;
  }[] = [
    { value: "all", label: "All projects" },
    { value: "draft", label: "Drafts" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" },
  ];

  const currentSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label ||
    "Last viewed by me";
  const currentFilterLabel =
    filterOptions.find((option) => option.value === filterBy)?.label ||
    "All projects";

  return (
    <div className="mb-6">
      {/* Main header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-medium text-white">
            {filterBy === "all" ? "All Projects" : currentFilterLabel}
          </h1>
          <span className="text-sm text-gray-500">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSortMenu(!showSortMenu);
              setShowFilterMenu(false);
            }}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-400 transition-colors"
          >
            <span>{currentSortLabel}</span>
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showSortMenu && (
            <motion.div
              className="absolute top-8 right-0 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg shadow-lg py-1 z-20 min-w-[180px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value);
                    setShowSortMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                    sortBy === option.value
                      ? "text-blue-400 bg-blue-900/20"
                      : "text-white hover:bg-[#3a3a3a]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
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
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Filter dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowFilterMenu(!showFilterMenu);
              setShowSortMenu(false);
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              filterBy === "all"
                ? "text-gray-400 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#3a3a3a]"
                : "text-blue-400 bg-blue-900/20 border border-blue-800"
            }`}
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filter</span>
          </button>

          {showFilterMenu && (
            <motion.div
              className="absolute top-10 right-0 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg shadow-lg py-1 z-20 min-w-[150px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFilterBy(option.value);
                    setShowFilterMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                    filterBy === option.value
                      ? "text-blue-400 bg-blue-900/20"
                      : "text-white hover:bg-[#3a3a3a]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* View toggle (grid/list) */}
        <div className="flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
          <motion.button
            onClick={() => setViewMode("grid")}
            className={`p-2 transition-colors ${
              viewMode === "grid"
                ? "text-blue-400 bg-blue-900/20"
                : "text-gray-500 hover:text-gray-400 hover:bg-[#2a2a2a]"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
            </svg>
          </motion.button>
          <motion.button
            onClick={() => setViewMode("list")}
            className={`p-2 transition-colors ${
              viewMode === "list"
                ? "text-blue-400 bg-blue-900/20"
                : "text-gray-500 hover:text-gray-400 hover:bg-[#2a2a2a]"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
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
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
