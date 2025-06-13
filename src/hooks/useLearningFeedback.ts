"use client";

import { useCallback } from "react";

export interface LearningEntry {
  id: string;
  timestamp: string;
  type: "error" | "optimization" | "architecture" | "debugging" | "performance";
  title: string;
  description: string;
  solution: string;
  files: string[];
  tags: string[];
  severity: "low" | "medium" | "high" | "critical";
  timeToResolve?: string;
  preventedRecurrence?: boolean;
}

export function useLearningFeedback() {
  // Función para registrar un nuevo aprendizaje
  const logLearning = useCallback(
    (learning: Omit<LearningEntry, "id" | "timestamp">) => {
      const entry: LearningEntry = {
        id: `learning-${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...learning,
        severity: learning.severity || "medium", // default if not provided
      };

      // Guardar en localStorage para persistencia
      const existingLearnings = getLearnings();
      const updatedLearnings = [...existingLearnings, entry];
      localStorage.setItem(
        "ai-learning-feedback",
        JSON.stringify(updatedLearnings)
      );

      // Log en consola para desarrollo
      console.group("🧠 AI Learning Feedback");
      console.log("📝 New learning registered:", entry.title);
      console.log("🔍 Description:", entry.description);
      console.log("✅ Solution:", entry.solution);
      console.log("📂 Files affected:", entry.files);
      console.log("🏷️ Tags:", entry.tags);
      console.groupEnd();

      // Actualizar LEARNING.md automáticamente (simulado)
      updateLearningFile(updatedLearnings);

      return entry;
    },
    []
  );

  // Función para obtener todos los aprendizajes
  const getLearnings = useCallback((): LearningEntry[] => {
    try {
      const stored = localStorage.getItem("ai-learning-feedback");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading learning feedback:", error);
      return [];
    }
  }, []);

  // Función para buscar aprendizajes por tags
  const searchLearnings = useCallback(
    (tags: string[]): LearningEntry[] => {
      const allLearnings = getLearnings();
      return allLearnings.filter((learning) =>
        tags.some((tag) => learning.tags.includes(tag))
      );
    },
    [getLearnings]
  );

  // Función para marcar un aprendizaje como que previno recurrencia
  const markAsPreventedRecurrence = useCallback(
    (learningId: string) => {
      const learnings = getLearnings();
      const updatedLearnings = learnings.map((learning) =>
        learning.id === learningId
          ? { ...learning, preventedRecurrence: true }
          : learning
      );
      localStorage.setItem(
        "ai-learning-feedback",
        JSON.stringify(updatedLearnings)
      );

      console.log("✅ Learning marked as prevented recurrence:", learningId);
    },
    [getLearnings]
  );

  // Función para obtener estadísticas
  const getStats = useCallback(() => {
    const learnings = getLearnings();
    const totalLearnings = learnings.length;
    const preventedErrors = learnings.filter(
      (l) => l.preventedRecurrence
    ).length;
    const byType = learnings.reduce((acc, learning) => {
      acc[learning.type] = (acc[learning.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const bySeverity = learnings.reduce((acc, learning) => {
      acc[learning.severity] = (acc[learning.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalLearnings,
      preventedErrors,
      byType,
      bySeverity,
      mostCommonTags: getMostCommonTags(learnings),
    };
  }, [getLearnings]);

  // Función auxiliar para obtener tags más comunes
  const getMostCommonTags = (learnings: LearningEntry[]) => {
    const tagCount = learnings.reduce((acc, learning) => {
      learning.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(tagCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));
  };

  // Función para simular actualización del archivo LEARNING.md
  const updateLearningFile = useCallback((learnings: LearningEntry[]) => {
    // En un entorno real, esto podría hacer una llamada a una API
    // que actualice el archivo LEARNING.md en el repositorio
    console.log(
      "📄 LEARNING.md would be updated with",
      learnings.length,
      "entries"
    );
  }, []);

  // Función para verificar si un error similar ya fue registrado
  const checkSimilarLearning = useCallback(
    (title: string, tags: string[]): LearningEntry | null => {
      const learnings = getLearnings();
      return (
        learnings.find(
          (learning) =>
            learning.title.toLowerCase().includes(title.toLowerCase()) ||
            tags.some((tag) => learning.tags.includes(tag))
        ) || null
      );
    },
    [getLearnings]
  );

  return {
    logLearning,
    getLearnings,
    searchLearnings,
    markAsPreventedRecurrence,
    getStats,
    checkSimilarLearning,
  };
}
