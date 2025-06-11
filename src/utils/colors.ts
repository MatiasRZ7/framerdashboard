export const colors = {
  light: {
    // Backgrounds
    primary: "#ffffff",
    secondary: "#f8f9fa",
    tertiary: "#f1f3f4",

    // Text
    text: {
      primary: "#1a1a1a",
      secondary: "#6b7280",
      tertiary: "#9ca3af",
    },

    // Borders
    border: {
      primary: "#e5e7eb",
      secondary: "#d1d5db",
    },

    // Interactive
    hover: "#f3f4f6",
    active: "#e5e7eb",
  },

  dark: {
    // Backgrounds
    primary: "#0a0a0a",
    secondary: "#1a1a1a",
    tertiary: "#2a2a2a",

    // Text
    text: {
      primary: "#ffffff",
      secondary: "#d1d5db",
      tertiary: "#9ca3af",
    },

    // Borders
    border: {
      primary: "#2a2a2a",
      secondary: "#3a3a3a",
    },

    // Interactive
    hover: "#2a2a2a",
    active: "#3a3a3a",
  },
};

export type ColorTheme = "light" | "dark";

export const getColors = (theme: ColorTheme) => colors[theme];
