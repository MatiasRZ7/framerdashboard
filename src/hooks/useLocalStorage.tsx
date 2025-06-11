"use client";

// Utility functions for localStorage management
export const localStorageKeys = {
  PROJECTS: "framer-projects",
  FOLDERS: "framer-folders",
  ACTIVITIES: "framer-activities",
  SORT_BY: "framer-sortBy",
  FILTER_BY: "framer-filterBy",
  VIEW_MODE: "framer-viewMode",
  THEME: "framer-theme",
} as const;

export function clearAllLocalStorage() {
  try {
    Object.values(localStorageKeys).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {}
}

export function exportLocalStorageData() {
  try {
    const data: Record<string, string | null> = {};
    Object.values(localStorageKeys).forEach((key) => {
      data[key] = localStorage.getItem(key);
    });
    return data;
  } catch (error) {
    return {};
  }
}

export function importLocalStorageData(data: Record<string, string>) {
  try {
    Object.entries(data).forEach(([key, value]) => {
      if (Object.values(localStorageKeys).includes(key as any) && value) {
        localStorage.setItem(key, value);
      }
    });
  } catch (error) {}
}

// Hook for debugging localStorage in development
export function useLocalStorageDebug() {
  const clearAll = clearAllLocalStorage;
  const exportData = exportLocalStorageData;
  const importData = importLocalStorageData;

  const logCurrentData = () => {};

  return {
    clearAll,
    exportData,
    importData,
    logCurrentData,
  };
}
