"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Project } from "@/types";

interface DraggableProjectProps {
  project: Project;
  children: React.ReactNode;
}

export default function DraggableProject({
  project,
  children,
}: DraggableProjectProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: project.id,
      data: {
        type: "project",
        project,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  // Función para manejar el inicio del drag
  const handlePointerDown = (event: React.PointerEvent) => {
    const target = event.target as HTMLElement;

    // Lista de selectores que deben ser excluidos del drag
    const excludedSelectors = [
      "[data-no-drag]",
      ".dropdown-menu",
      ".menu-trigger",
    ];

    // Verificar si el click es en un elemento excluido o dentro de uno
    const isExcluded = excludedSelectors.some((selector) => {
      return target.closest(selector) !== null;
    });

    if (isExcluded) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Si no está excluido, permitir el drag
    if (listeners?.onPointerDown) {
      listeners.onPointerDown(event);
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "opacity-50 z-50" : ""}`}
      animate={{
        scale: isDragging ? 1.05 : 1,
        rotate: isDragging ? 2 : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      <div
        {...attributes}
        onPointerDown={handlePointerDown}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{
          touchAction: "none",
          userSelect: "none",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
