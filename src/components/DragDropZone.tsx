import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { useColors } from "@/hooks/useColors";

interface DragDropZoneProps {
  folderId: string;
  folderName: string;
  folderIcon: string;
  isActive: boolean;
  projectCount: number;
  onClick: () => void;
}

export default function DragDropZone({
  folderId,
  folderName,
  folderIcon,
  isActive,
  projectCount,
  onClick,
}: DragDropZoneProps) {
  const { classes } = useColors();
  const { isOver, setNodeRef } = useDroppable({
    id: folderId,
    data: {
      type: "folder",
      folderId: folderId,
      folderName: folderName,
    },
  });

  // Debug logging
  React.useEffect(() => {
    if (isOver) {
    }
  }, [isOver, folderName, folderId]);

  return (
    <div className="relative mb-4">
      <motion.button
        ref={setNodeRef}
        onClick={onClick}
        className={`relative w-full flex items-center gap-2 px-2 py-6.5 rounded-md text-sm transition-all text-left ${
          isActive
            ? "bg-[#2a2a2a] text-white"
            : "text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
        } ${
          isOver
            ? "bg-blue-500/30 border-2 border-blue-500 border-dashed scale-105 shadow-lg"
            : "border-2 border-transparent"
        }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        animate={{
          scale: isOver ? 1.05 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: "relative",
          isolation: "isolate",
        }}
      >
        <span className="text-sm">{folderIcon}</span>
        <span className="flex-1">{folderName}</span>
        {projectCount > 0 && (
          <span className="text-xs bg-[#3a3a3a] text-gray-300 px-1.5 py-0.5 rounded">
            {projectCount}
          </span>
        )}

        {/* Overlay de hover que cubre exactamente el botón */}
        {isOver && (
          <motion.div
            className="absolute inset-0 bg-blue-500/10 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ pointerEvents: "none" }}
          />
        )}
      </motion.button>

      {/* Debug: Mostrar el área exacta de drop - debe coincidir con el botón */}
      {isOver && (
        <div
          className="absolute inset-0 pointer-events-none border-2 border-red-500 border-solid rounded-md"
          style={{
            backgroundColor: "rgba(255, 0, 0, 0.1)",
          }}
        />
      )}
    </div>
  );
}
