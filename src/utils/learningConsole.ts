// Utilidades para consultar el sistema de aprendizaje desde la consola del navegador

export const learningConsole = {
  // Mostrar todos los aprendizajes
  showAll: () => {
    const stored = localStorage.getItem("ai-learning-feedback");
    const learnings = stored ? JSON.parse(stored) : [];

    console.group("🧠 All Learning Entries");
    learnings.forEach((learning: any, index: number) => {
      console.group(`${index + 1}. ${learning.title}`);
      console.log(
        "📅 Date:",
        new Date(learning.timestamp).toLocaleDateString()
      );
      console.log("🔍 Description:", learning.description);
      console.log("✅ Solution:", learning.solution);
      console.log("📂 Files:", learning.files);
      console.log("🏷️ Tags:", learning.tags);
      console.log("⚠️ Severity:", learning.severity);
      console.groupEnd();
    });
    console.groupEnd();

    return learnings;
  },

  // Buscar por tags
  searchByTags: (tags: string[]) => {
    const stored = localStorage.getItem("ai-learning-feedback");
    const learnings = stored ? JSON.parse(stored) : [];

    const filtered = learnings.filter((learning: any) =>
      tags.some((tag) => learning.tags.includes(tag))
    );

    console.group(`🔍 Search Results for tags: ${tags.join(", ")}`);
    filtered.forEach((learning: any) => {
      console.log(`📝 ${learning.title} - ${learning.description}`);
    });
    console.groupEnd();

    return filtered;
  },

  // Mostrar estadísticas
  showStats: () => {
    const stored = localStorage.getItem("ai-learning-feedback");
    const learnings = stored ? JSON.parse(stored) : [];

    const stats = {
      total: learnings.length,
      byType: learnings.reduce((acc: any, l: any) => {
        acc[l.type] = (acc[l.type] || 0) + 1;
        return acc;
      }, {}),
      bySeverity: learnings.reduce((acc: any, l: any) => {
        acc[l.severity] = (acc[l.severity] || 0) + 1;
        return acc;
      }, {}),
      prevented: learnings.filter((l: any) => l.preventedRecurrence).length,
    };

    console.group("📊 Learning Statistics");
    console.log("Total learnings:", stats.total);
    console.log("By type:", stats.byType);
    console.log("By severity:", stats.bySeverity);
    console.log("Prevented recurrences:", stats.prevented);
    console.groupEnd();

    return stats;
  },

  // Limpiar todos los aprendizajes
  clear: () => {
    localStorage.removeItem("ai-learning-feedback");
    console.log("🗑️ All learning entries cleared");
  },

  // Exportar aprendizajes como JSON
  export: () => {
    const stored = localStorage.getItem("ai-learning-feedback");
    const learnings = stored ? JSON.parse(stored) : [];

    const dataStr = JSON.stringify(learnings, null, 2);
    console.log("📤 Learning data (copy this):");
    console.log(dataStr);

    return learnings;
  },
};

// Hacer disponible globalmente en desarrollo
if (typeof window !== "undefined") {
  (window as any).learningConsole = learningConsole;
}
