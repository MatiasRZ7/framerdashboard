"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { ProjectFolder, Activity } from "@/types";
import { localStorageKeys } from "./useLocalStorage";

const defaultFolders: ProjectFolder[] = [
  {
    id: "client-webs",
    name: "Client Webs",
    icon: "🌐",
    color: "#3b82f6",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

interface FoldersContextType {
  folders: ProjectFolder[];
  activities: Activity[];
  createFolder: (name: string, icon?: string, color?: string) => void;
  deleteFolder: (id: string) => void;
  updateFolder: (id: string, updates: Partial<ProjectFolder>) => void;
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void;
  clearActivities: () => void;
}

const FoldersContext = createContext<FoldersContextType | null>(null);

export function FoldersProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<ProjectFolder[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedFolders = localStorage.getItem(localStorageKeys.FOLDERS);
      const savedActivities = localStorage.getItem(localStorageKeys.ACTIVITIES);

      if (savedFolders) {
        const parsedFolders = JSON.parse(savedFolders);
        const foldersWithDates = parsedFolders.map((folder: any) => ({
          ...folder,
          createdAt: new Date(folder.createdAt),
          updatedAt: new Date(folder.updatedAt),
        }));
        setFolders(foldersWithDates);
      } else {
        setFolders(defaultFolders);
      }

      if (savedActivities) {
        const parsedActivities = JSON.parse(savedActivities);
        const activitiesWithDates = parsedActivities.map((activity: any) => ({
          ...activity,
          timestamp: new Date(activity.timestamp),
        }));
        setActivities(activitiesWithDates);
      }
    } catch (error) {
      setFolders(defaultFolders);
      setActivities([]);
    }
  }, []);

  // Save folders to localStorage
  useEffect(() => {
    if (folders.length > 0) {
      localStorage.setItem(localStorageKeys.FOLDERS, JSON.stringify(folders));
    }
  }, [folders]);

  // Save activities to localStorage
  useEffect(() => {
    if (activities.length >= 0) {
      localStorage.setItem(
        localStorageKeys.ACTIVITIES,
        JSON.stringify(activities)
      );
    }
  }, [activities]);

  const addActivity = useCallback(
    (activity: Omit<Activity, "id" | "timestamp">) => {
      const newActivity: Activity = {
        ...activity,
        id: `activity-${Date.now()}`,
        timestamp: new Date(),
      };
      setActivities((prev) => [newActivity, ...prev].slice(0, 50)); // Keep only last 50 activities
    },
    []
  );

  const createFolder = useCallback(
    (name: string, icon = "📁", color = "#6b7280") => {
      const newFolder: ProjectFolder = {
        id: `folder-${Date.now()}`,
        name,
        icon,
        color,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setFolders((prev) => {
        const updated = [...prev, newFolder];
        return updated;
      });

      addActivity({
        type: "created",
        projectId: newFolder.id,
        projectName: newFolder.name,
        description: `Created folder "${newFolder.name}"`,
        folder: newFolder.id,
      });
    },
    [addActivity]
  );

  const deleteFolder = useCallback(
    (id: string) => {
      const folder = folders.find((f) => f.id === id);
      if (folder) {
        setFolders((prev) => prev.filter((f) => f.id !== id));
        addActivity({
          type: "deleted",
          projectId: id,
          projectName: folder.name,
          description: `Deleted folder "${folder.name}"`,
        });
      }
    },
    [folders, addActivity]
  );

  const updateFolder = useCallback(
    (id: string, updates: Partial<ProjectFolder>) => {
      setFolders((prev) =>
        prev.map((folder) =>
          folder.id === id
            ? { ...folder, ...updates, updatedAt: new Date() }
            : folder
        )
      );
    },
    []
  );

  const clearActivities = useCallback(() => {
    setActivities([]);
  }, []);

  return (
    <FoldersContext.Provider
      value={{
        folders,
        activities,
        createFolder,
        deleteFolder,
        updateFolder,
        addActivity,
        clearActivities,
      }}
    >
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useFolders must be used within a FoldersProvider");
  }
  return context;
}
