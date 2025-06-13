import { useState, useCallback, useRef, useEffect } from "react";
import { BuilderElement } from "@/hooks/useBuilder";

interface DraggableElementProps {
  element: BuilderElement;
  isSelected: boolean;
  onSelect: (elementId: string) => void;
  onUpdatePosition: (
    elementId: string,
    position: { x: number; y: number }
  ) => void;
  children: React.ReactNode;
}

export default function DraggableElement({
  element,
  isSelected,
  onSelect,
  onUpdatePosition,
  children,
}: DraggableElementProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onSelect(element.id);

      const rect = elementRef.current?.getBoundingClientRect();
      if (!rect) return;

      const currentLeft = parseInt(element.styles.left || "0");
      const currentTop = parseInt(element.styles.top || "0");

      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setElementStart({ x: currentLeft, y: currentTop });
    },
    [element.id, element.styles.left, element.styles.top, onSelect]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const newX = Math.max(0, elementStart.x + deltaX);
      const newY = Math.max(0, elementStart.y + deltaY);

      // Actualizar posición visualmente
      if (elementRef.current) {
        elementRef.current.style.left = `${newX}px`;
        elementRef.current.style.top = `${newY}px`;
      }
    },
    [isDragging, dragStart, elementStart]
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const newX = Math.max(0, elementStart.x + deltaX);
      const newY = Math.max(0, elementStart.y + deltaY);

      // Guardar la nueva posición
      onUpdatePosition(element.id, { x: newX, y: newY });

      setIsDragging(false);
    },
    [isDragging, dragStart, elementStart, element.id, onUpdatePosition]
  );

  // Event listeners globales
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const elementStyles = {
    position: "absolute" as const,
    left: element.styles?.left || "50px",
    top: element.styles?.top || "50px",
    cursor: isDragging ? "grabbing" : "grab",
    // No incluir otros estilos aquí para evitar conflictos
  };

  return (
    <div
      ref={elementRef}
      className={`absolute transition-all duration-200 ${
        isSelected ? "ring-2 ring-blue-500 ring-offset-2 z-10" : "z-0"
      } ${isDragging ? "z-20" : ""}`}
      style={elementStyles}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
}
