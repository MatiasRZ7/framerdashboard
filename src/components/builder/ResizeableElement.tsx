import { useState, useCallback, useRef, useEffect } from "react";
import { BuilderElement } from "@/hooks/useBuilder";

interface ResizeableElementProps {
  element: BuilderElement;
  isSelected: boolean;
  onSelect: (elementId: string) => void;
  onUpdatePosition: (
    elementId: string,
    position: { x: number; y: number }
  ) => void;
  onUpdateSize: (
    elementId: string,
    size: { width: number; height: number }
  ) => void;
  children: React.ReactNode;
}

export default function ResizeableElement({
  element,
  isSelected,
  onSelect,
  onUpdatePosition,
  onUpdateSize,
  children,
}: ResizeableElementProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const elementRef = useRef<HTMLDivElement>(null);

  // Manejo de drag (mover)
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onSelect(element.id);

      const currentLeft = parseInt(element.styles.left || "0");
      const currentTop = parseInt(element.styles.top || "0");

      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setElementStart({ x: currentLeft, y: currentTop, width: 0, height: 0 });
    },
    [element.id, element.styles.left, element.styles.top, onSelect]
  );

  // Manejo de resize
  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.preventDefault();
      e.stopPropagation();

      const currentLeft = parseInt(element.styles.left || "0");
      const currentTop = parseInt(element.styles.top || "0");
      const currentWidth = parseInt(
        element.styles.width?.replace("px", "") || "200"
      );
      const currentHeight = parseInt(
        element.styles.height?.replace("px", "") || "100"
      );

      setIsResizing(true);
      setResizeDirection(direction);
      setDragStart({ x: e.clientX, y: e.clientY });
      setElementStart({
        x: currentLeft,
        y: currentTop,
        width: currentWidth,
        height: currentHeight,
      });
    },
    [element.styles]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        const newX = Math.max(0, elementStart.x + deltaX);
        const newY = Math.max(0, elementStart.y + deltaY);

        if (elementRef.current) {
          elementRef.current.style.left = `${newX}px`;
          elementRef.current.style.top = `${newY}px`;
        }
      } else if (isResizing) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        let newWidth = elementStart.width;
        let newHeight = elementStart.height;
        let newX = elementStart.x;
        let newY = elementStart.y;

        switch (resizeDirection) {
          case "se": // bottom-right
            newWidth = Math.max(50, elementStart.width + deltaX);
            newHeight = Math.max(30, elementStart.height + deltaY);
            break;
          case "sw": // bottom-left
            newWidth = Math.max(50, elementStart.width - deltaX);
            newHeight = Math.max(30, elementStart.height + deltaY);
            newX = elementStart.x + deltaX;
            break;
          case "ne": // top-right
            newWidth = Math.max(50, elementStart.width + deltaX);
            newHeight = Math.max(30, elementStart.height - deltaY);
            newY = elementStart.y + deltaY;
            break;
          case "nw": // top-left
            newWidth = Math.max(50, elementStart.width - deltaX);
            newHeight = Math.max(30, elementStart.height - deltaY);
            newX = elementStart.x + deltaX;
            newY = elementStart.y + deltaY;
            break;
          case "e": // right
            newWidth = Math.max(50, elementStart.width + deltaX);
            break;
          case "w": // left
            newWidth = Math.max(50, elementStart.width - deltaX);
            newX = elementStart.x + deltaX;
            break;
          case "s": // bottom
            newHeight = Math.max(30, elementStart.height + deltaY);
            break;
          case "n": // top
            newHeight = Math.max(30, elementStart.height - deltaY);
            newY = elementStart.y + deltaY;
            break;
        }

        if (elementRef.current) {
          elementRef.current.style.width = `${newWidth}px`;
          elementRef.current.style.height = `${newHeight}px`;
          elementRef.current.style.left = `${newX}px`;
          elementRef.current.style.top = `${newY}px`;
        }
      }
    },
    [isDragging, isResizing, dragStart, elementStart, resizeDirection]
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        const newX = Math.max(0, elementStart.x + deltaX);
        const newY = Math.max(0, elementStart.y + deltaY);

        onUpdatePosition(element.id, { x: newX, y: newY });
        setIsDragging(false);
      } else if (isResizing) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        let newWidth = elementStart.width;
        let newHeight = elementStart.height;
        let newX = elementStart.x;
        let newY = elementStart.y;

        switch (resizeDirection) {
          case "se":
            newWidth = Math.max(50, elementStart.width + deltaX);
            newHeight = Math.max(30, elementStart.height + deltaY);
            break;
          case "sw":
            newWidth = Math.max(50, elementStart.width - deltaX);
            newHeight = Math.max(30, elementStart.height + deltaY);
            newX = elementStart.x + deltaX;
            break;
          case "ne":
            newWidth = Math.max(50, elementStart.width + deltaX);
            newHeight = Math.max(30, elementStart.height - deltaY);
            newY = elementStart.y + deltaY;
            break;
          case "nw":
            newWidth = Math.max(50, elementStart.width - deltaX);
            newHeight = Math.max(30, elementStart.height - deltaY);
            newX = elementStart.x + deltaX;
            newY = elementStart.y + deltaY;
            break;
          case "e":
            newWidth = Math.max(50, elementStart.width + deltaX);
            break;
          case "w":
            newWidth = Math.max(50, elementStart.width - deltaX);
            newX = elementStart.x + deltaX;
            break;
          case "s":
            newHeight = Math.max(30, elementStart.height + deltaY);
            break;
          case "n":
            newHeight = Math.max(30, elementStart.height - deltaY);
            newY = elementStart.y + deltaY;
            break;
        }

        // Actualizar tanto posición como tamaño
        if (newX !== elementStart.x || newY !== elementStart.y) {
          onUpdatePosition(element.id, { x: newX, y: newY });
        }
        onUpdateSize(element.id, { width: newWidth, height: newHeight });

        setIsResizing(false);
        setResizeDirection("");
      }
    },
    [
      isDragging,
      isResizing,
      dragStart,
      elementStart,
      resizeDirection,
      element.id,
      onUpdatePosition,
      onUpdateSize,
    ]
  );

  // Event listeners globales
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = isDragging ? "grabbing" : "default";
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const elementStyles = {
    position: "absolute" as const,
    left: element.styles?.left || "50px",
    top: element.styles?.top || "50px",
    width: element.styles?.width || "auto",
    height: element.styles?.height || "auto",
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      ref={elementRef}
      className={`absolute transition-all duration-200 ${
        isSelected ? "ring-2 ring-blue-500 ring-offset-2 z-10" : "z-0"
      } ${isDragging || isResizing ? "z-20" : ""}`}
      style={elementStyles}
      onMouseDown={handleMouseDown}
    >
      {children}

      {/* Resize Handles - solo se muestran cuando está seleccionado */}
      {isSelected && (
        <>
          {/* Corner handles */}
          <div
            className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-nw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
          />
          <div
            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-ne-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
          />
          <div
            className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-sw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
          />
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-se-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "se")}
          />

          {/* Edge handles */}
          <div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-n-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "n")}
          />
          <div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-s-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "s")}
          />
          <div
            className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-w-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "w")}
          />
          <div
            className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-e-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "e")}
          />
        </>
      )}
    </div>
  );
}
