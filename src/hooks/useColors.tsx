"use client";

import { useTheme } from "./useTheme";

export function useColors() {
  const { theme, colors } = useTheme();

  // Helper function para generar clases CSS dinámicas
  const getClass = (property: string, colorPath: string) => {
    const colorValue = colorPath
      .split(".")
      .reduce((obj, key) => obj[key], colors as any);
    return `${property}-[${colorValue}]`;
  };

  // Clases CSS comunes pre-generadas
  const classes = {
    // Backgrounds
    bg: {
      primary: `bg-[${colors.primary}]`,
      secondary: `bg-[${colors.secondary}]`,
      tertiary: `bg-[${colors.tertiary}]`,
      hover: `hover:bg-[${colors.hover}]`,
      active: `bg-[${colors.active}]`,
    },

    // Text
    text: {
      primary: `text-[${colors.text.primary}]`,
      secondary: `text-[${colors.text.secondary}]`,
      tertiary: `text-[${colors.text.tertiary}]`,
    },

    // Borders
    border: {
      primary: `border-[${colors.border.primary}]`,
      secondary: `border-[${colors.border.secondary}]`,
    },
  };

  return {
    theme,
    colors,
    classes,
    getClass,
  };
}
