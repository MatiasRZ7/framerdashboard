"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getColors, type ColorTheme } from "../utils/colors";
import { localStorageKeys } from "./useLocalStorage";

interface ThemeContextType {
  theme: ColorTheme;
  colors: ReturnType<typeof getColors>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ColorTheme>("dark");

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(localStorageKeys.THEME);
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        setTheme(savedTheme as ColorTheme);
      }
    } catch (error) {}
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(localStorageKeys.THEME, theme);
  }, [theme]);

  // Aplicar clase al html para el tema (Tailwind CSS dark mode)
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === "dark") {
      htmlElement.classList.add("dark");
      htmlElement.classList.remove("light");
    } else {
      htmlElement.classList.add("light");
      htmlElement.classList.remove("dark");
    }
  }, [theme]);

  const colors = getColors(theme);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
