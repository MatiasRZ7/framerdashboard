"use client";

import { motion } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import { useFolders } from "@/hooks/useFolders";
import { useColors } from "@/hooks/useColors";
import { Analytics } from "@/types";
import { useMemo } from "react";

export default function Dashboard() {
  const { projects } = useProjects();
  const { activities, folders } = useFolders();
  const { classes } = useColors();

  const analytics: Analytics = useMemo(() => {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Count projects by time periods
    const projectsThisMonth = projects.filter(
      (p) => p.createdAt >= thisMonth
    ).length;
    const projectsThisWeek = projects.filter(
      (p) => p.createdAt >= thisWeek
    ).length;

    // Most used tags
    const tagCounts: { [key: string]: number } = {};
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    const mostUsedTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Projects by status
    const statusCounts: { [key: string]: number } = {};
    projects.forEach((project) => {
      statusCounts[project.status] = (statusCounts[project.status] || 0) + 1;
    });
    const projectsByStatus = Object.entries(statusCounts).map(
      ([status, count]) => ({ status, count })
    );

    // Projects by folder
    const folderCounts: { [key: string]: number } = {};
    projects.forEach((project) => {
      const folderName = project.folder
        ? folders.find((f) => f.id === project.folder)?.name || "Unknown"
        : "No Folder";
      folderCounts[folderName] = (folderCounts[folderName] || 0) + 1;
    });
    const projectsByFolder = Object.entries(folderCounts).map(
      ([folder, count]) => ({ folder, count })
    );

    return {
      totalProjects: projects.length,
      projectsThisMonth,
      projectsThisWeek,
      mostUsedTags,
      projectsByStatus,
      projectsByFolder,
      recentActivity: activities.slice(0, 10),
    };
  }, [projects, activities, folders]);

  const StatCard = ({
    title,
    value,
    icon,
    color = "blue",
  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color?: string;
  }) => (
    <motion.div
      className={`${classes.bg.secondary} ${classes.border.primary} border rounded-lg p-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg ${
            color === "blue"
              ? "bg-blue-500/20 text-blue-400"
              : color === "green"
              ? "bg-green-500/20 text-green-400"
              : color === "purple"
              ? "bg-purple-500/20 text-purple-400"
              : "bg-orange-500/20 text-orange-400"
          }`}
        >
          {icon}
        </div>
        <div>
          <p className={`text-2xl font-bold ${classes.text.primary}`}>
            {value}
          </p>
          <p className={`text-sm ${classes.text.secondary}`}>{title}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${classes.text.primary} mb-2`}>
          Dashboard
        </h1>
        <p className={classes.text.secondary}>
          Overview of your projects and activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Projects"
          value={analytics.totalProjects}
          color="blue"
          icon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
          }
        />
        <StatCard
          title="This Month"
          value={analytics.projectsThisMonth}
          color="green"
          icon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
            </svg>
          }
        />
        <StatCard
          title="This Week"
          value={analytics.projectsThisWeek}
          color="purple"
          icon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          }
        />
        <StatCard
          title="Active Folders"
          value={folders.length}
          color="orange"
          icon={
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
            </svg>
          }
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects by Status */}
        <motion.div
          className={`${classes.bg.secondary} ${classes.border.primary} border rounded-lg p-6`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className={`text-lg font-semibold ${classes.text.primary} mb-4`}>
            Projects by Status
          </h3>
          <div className="space-y-3">
            {analytics.projectsByStatus.map(({ status, count }) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      status === "published"
                        ? "bg-green-500"
                        : status === "draft"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  />
                  <span className={`capitalize ${classes.text.secondary}`}>
                    {status}
                  </span>
                </div>
                <span className={`font-medium ${classes.text.primary}`}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Projects by Folder */}
        <motion.div
          className={`${classes.bg.secondary} ${classes.border.primary} border rounded-lg p-6`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className={`text-lg font-semibold ${classes.text.primary} mb-4`}>
            Projects by Folder
          </h3>
          <div className="space-y-3">
            {analytics.projectsByFolder.map(({ folder, count }) => (
              <div key={folder} className="flex items-center justify-between">
                <span className={classes.text.secondary}>{folder}</span>
                <span className={`font-medium ${classes.text.primary}`}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity & Top Tags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          className={`${classes.bg.secondary} ${classes.border.primary} border rounded-lg p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className={`text-lg font-semibold ${classes.text.primary} mb-4`}>
            Recent Activity
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {analytics.recentActivity.length > 0 ? (
              analytics.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "created"
                        ? "bg-green-500"
                        : activity.type === "updated"
                        ? "bg-blue-500"
                        : activity.type === "moved"
                        ? "bg-purple-500"
                        : activity.type === "archived"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className={`text-sm ${classes.text.secondary}`}>
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className={`text-sm ${classes.text.secondary}`}>
                No recent activity
              </p>
            )}
          </div>
        </motion.div>

        {/* Most Used Tags */}
        <motion.div
          className={`${classes.bg.secondary} ${classes.border.primary} border rounded-lg p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className={`text-lg font-semibold ${classes.text.primary} mb-4`}>
            Most Used Tags
          </h3>
          <div className="space-y-3">
            {analytics.mostUsedTags.length > 0 ? (
              analytics.mostUsedTags.map(({ tag, count }) => (
                <div key={tag} className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded text-xs ${classes.bg.tertiary} ${classes.text.secondary}`}
                  >
                    {tag}
                  </span>
                  <span className={`font-medium ${classes.text.primary}`}>
                    {count}
                  </span>
                </div>
              ))
            ) : (
              <p className={`text-sm ${classes.text.secondary}`}>
                No tags used yet
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
