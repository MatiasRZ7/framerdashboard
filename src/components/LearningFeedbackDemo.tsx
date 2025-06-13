"use client";

import { useEffect } from "react";
import { useLearningFeedback } from "@/hooks/useLearningFeedback";

export default function LearningFeedbackDemo() {
  const { logLearning, getStats, checkSimilarLearning } = useLearningFeedback();

  useEffect(() => {
    // Verificar si ya registramos este aprendizaje
    const existingLearning = checkSimilarLearning("Props Serialization Error", [
      "nextjs",
      "serialization",
      "use-client",
    ]);

    if (!existingLearning) {
      // Registrar el aprendizaje actual
      logLearning({
        type: "error",
        title: "Props Serialization Error en Next.js",
        description:
          'Componentes hijos tenían "use client" innecesario cuando su componente padre ya lo tenía. Next.js requiere que props sean serializables en componentes client-side.',
        solution:
          'Eliminar "use client" de componentes hijos cuando el padre ya lo tiene. Verificar jerarquía de componentes antes de agregar "use client". Solo el componente de nivel superior necesita "use client" en la mayoría de casos.',
        files: [
          "src/components/builder/BuilderSidebar.tsx",
          "src/components/builder/BuilderProperties.tsx",
          "src/components/builder/InsertPanel.tsx",
        ],
        tags: ["nextjs", "serialization", "use-client", "props"],
        severity: "medium",
        timeToResolve: "15 minutes",
      });

      console.log("🎯 Learning registered successfully!");
    } else {
      console.log(
        "📚 Similar learning already exists:",
        existingLearning.title
      );
    }

    // Mostrar estadísticas actuales
    const stats = getStats();
    console.log("📊 Learning Stats:", stats);
  }, [logLearning, getStats, checkSimilarLearning]);

  return (
    <div className="hidden">
      {/* Este componente es solo para demostrar el hook */}
      {/* En producción, el hook se usaría directamente donde sea necesario */}
    </div>
  );
}
