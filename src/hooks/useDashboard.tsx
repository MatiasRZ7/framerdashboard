"use client";

import React, { useState, createContext, useContext } from "react";

interface DashboardContextType {
  showDashboard: boolean;
  toggleDashboard: () => void;
  setShowDashboard: (show: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [showDashboard, setShowDashboard] = useState(false);

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <DashboardContext.Provider
      value={{
        showDashboard,
        toggleDashboard,
        setShowDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
