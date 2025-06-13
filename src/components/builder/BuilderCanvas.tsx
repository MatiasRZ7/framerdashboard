import { useCallback, useState, useRef, useEffect } from "react";
import { BuilderPage, BuilderAsset, BuilderElement } from "@/hooks/useBuilder";
import ResizeableElement from "./ResizeableElement";

interface BuilderCanvasProps {
  elements: BuilderElement[];
  selectedElementId: string | null;
  onSelectElement: (elementId: string | null) => void;
  onUpdateElement: (
    elementId: string,
    updates: Partial<BuilderElement>
  ) => void;
  currentBreakpoint: "desktop" | "tablet" | "phone";
  zoom: number;
  activeTool: string;
  selectedVectorShape: string | null;
  onAddTextAtPosition: (position: { x: number; y: number }) => void;
  onAddVectorShape: (
    shapeType: "rectangle" | "oval" | "polygon" | "star" | "path",
    position: { x: number; y: number }
  ) => void;
}

export default function BuilderCanvas({
  elements,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  currentBreakpoint,
  zoom,
  activeTool,
  selectedVectorShape,
  onAddTextAtPosition,
  onAddVectorShape,
}: BuilderCanvasProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragElementId, setDragElementId] = useState<string | null>(null);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLDivElement>(null);

  // Effect para activar automáticamente la edición de texto recién creado
  useEffect(() => {
    const selectedElement = elements.find((el) => el.id === selectedElementId);
    if (
      selectedElement &&
      selectedElement.type === "text" &&
      selectedElement.content === "Type something"
    ) {
      setEditingTextId(selectedElement.id);
      // Enfocar el elemento de texto después de un pequeño delay
      setTimeout(() => {
        const textElement = document.querySelector(
          `[data-text-id="${selectedElement.id}"]`
        ) as HTMLDivElement;
        if (textElement) {
          textElement.focus();
          // Seleccionar todo el texto
          const range = document.createRange();
          range.selectNodeContents(textElement);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, 50);
    }
  }, [selectedElementId, elements]);

  const getCanvasSize = () => {
    switch (currentBreakpoint) {
      case "desktop":
        return { width: 1200, height: 800 };
      case "tablet":
        return { width: 834, height: 1194 };
      case "phone":
        return { width: 390, height: 844 };
      default:
        return { width: 1200, height: 800 };
    }
  };

  const canvasSize = getCanvasSize();

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, elementId: string) => {
      // Don't start drag if clicking on resize handles
      if ((e.target as HTMLElement).classList.contains("resize-handle")) {
        return;
      }

      e.stopPropagation();

      const element = elements.find((el) => el.id === elementId);
      if (!element) return;

      // Si es un elemento de texto y está siendo editado, no iniciar drag
      if (element.type === "text" && editingTextId === elementId) {
        return;
      }

      onSelectElement(elementId);

      // Iniciar drag
      setIsDragging(true);
      setDragElementId(elementId);

      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setDragStart({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    },
    [elements, onSelectElement, editingTextId]
  );

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, elementId: string, handle: string) => {
      e.stopPropagation();

      const element = elements.find((el) => el.id === elementId);
      if (!element) return;

      setIsResizing(true);
      setDragElementId(elementId);
      setResizeHandle(handle);

      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setDragStart({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });

        // Guardar tamaño y posición inicial
        setInitialSize({
          width: parseInt(element.styles.width || "100"),
          height: parseInt(element.styles.height || "100"),
        });
        setInitialPosition({
          x: parseInt(element.styles.left || "0"),
          y: parseInt(element.styles.top || "0"),
        });
      }
    },
    [elements]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragElementId || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const deltaX = currentX - dragStart.x;
      const deltaY = currentY - dragStart.y;

      const element = elements.find((el) => el.id === dragElementId);
      if (!element) return;

      if (isResizing && resizeHandle) {
        // Lógica de redimensionamiento
        let newWidth = initialSize.width;
        let newHeight = initialSize.height;
        let newLeft = initialPosition.x;
        let newTop = initialPosition.y;

        switch (resizeHandle) {
          case "nw": // Esquina superior izquierda
            newWidth = Math.max(20, initialSize.width - deltaX);
            newHeight = Math.max(20, initialSize.height - deltaY);
            newLeft = initialPosition.x + (initialSize.width - newWidth);
            newTop = initialPosition.y + (initialSize.height - newHeight);
            break;
          case "ne": // Esquina superior derecha
            newWidth = Math.max(20, initialSize.width + deltaX);
            newHeight = Math.max(20, initialSize.height - deltaY);
            newTop = initialPosition.y + (initialSize.height - newHeight);
            break;
          case "sw": // Esquina inferior izquierda
            newWidth = Math.max(20, initialSize.width - deltaX);
            newHeight = Math.max(20, initialSize.height + deltaY);
            newLeft = initialPosition.x + (initialSize.width - newWidth);
            break;
          case "se": // Esquina inferior derecha
            newWidth = Math.max(20, initialSize.width + deltaX);
            newHeight = Math.max(20, initialSize.height + deltaY);
            break;
        }

        onUpdateElement(dragElementId, {
          styles: {
            ...element.styles,
            width: `${newWidth}px`,
            height: `${newHeight}px`,
            left: `${newLeft}px`,
            top: `${newTop}px`,
          },
        });
      } else if (isDragging) {
        // Lógica de arrastre
        const currentLeft = parseInt(element.styles.left || "0");
        const currentTop = parseInt(element.styles.top || "0");

        const newLeft = Math.max(0, currentLeft + deltaX);
        const newTop = Math.max(0, currentTop + deltaY);

        onUpdateElement(dragElementId, {
          styles: {
            ...element.styles,
            left: `${newLeft}px`,
            top: `${newTop}px`,
          },
        });

        setDragStart({ x: currentX, y: currentY });
      }
    },
    [
      isDragging,
      isResizing,
      dragElementId,
      dragStart,
      resizeHandle,
      initialSize,
      initialPosition,
      elements,
      onUpdateElement,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setDragElementId(null);
    setResizeHandle(null);
  }, []);

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        // Salir del modo de edición de texto
        setEditingTextId(null);

        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Handle Text tool
          if (activeTool === "text") {
            onAddTextAtPosition({ x, y });
            return;
          }

          // Handle Vector tool
          if (activeTool === "vector" && selectedVectorShape) {
            onAddVectorShape(
              selectedVectorShape as
                | "rectangle"
                | "oval"
                | "polygon"
                | "star"
                | "path",
              { x, y }
            );
            return;
          }

          // Default behavior - deselect element
          onSelectElement(null);
        }
      }
    },
    [
      onSelectElement,
      activeTool,
      selectedVectorShape,
      onAddTextAtPosition,
      onAddVectorShape,
    ]
  );

  const renderElement = (element: BuilderElement) => {
    const isSelected = selectedElementId === element.id;
    const isTextEditing =
      element.type === "text" && editingTextId === element.id;

    return (
      <div
        key={element.id}
        className={`absolute group transition-all duration-200 ${
          isSelected ? "ring-2 ring-blue-500 ring-opacity-50 shadow-lg" : ""
        } ${
          !isTextEditing
            ? "hover:ring-2 hover:ring-blue-300 hover:ring-opacity-30 hover:shadow-md hover:scale-[1.02]"
            : ""
        }`}
        style={{
          position: "absolute",
          left: element.styles.left,
          top: element.styles.top,
          width: element.styles.width,
          height: element.styles.height,
          backgroundColor: element.styles.backgroundColor,
          color: element.styles.color,
          fontSize: element.styles.fontSize,
          fontWeight: element.styles.fontWeight,
          fontFamily: element.styles.fontFamily,
          padding: element.styles.padding,
          margin: element.styles.margin,
          border: element.styles.border,
          borderRadius: element.styles.borderRadius,
          userSelect: isTextEditing ? "text" : "none",
          zIndex: isSelected ? 1000 : 1,
          cursor: isTextEditing ? "text" : isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={(e) => handleMouseDown(e, element.id)}
      >
        {/* Invisible drag area for better UX */}
        {!isTextEditing && (
          <div
            className="absolute inset-0 -m-4 cursor-grab hover:cursor-grab"
            style={{
              zIndex: -1,
              pointerEvents: "auto",
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown(e, element.id);
            }}
          />
        )}

        {/* Element content */}
        {element.type === "text" && (
          <div
            className="min-h-[20px] outline-none cursor-text"
            contentEditable
            suppressContentEditableWarning
            data-text-id={element.id}
            onFocus={() => setEditingTextId(element.id)}
            onBlur={(e) => {
              const newContent = e.currentTarget.textContent || "";
              onUpdateElement(element.id, {
                content: newContent,
              });
              setEditingTextId(null);
            }}
            onKeyDown={(e) => {
              // Permitir Enter para nueva línea, Escape para salir de edición
              if (e.key === "Escape") {
                e.currentTarget.blur();
              }
              // Prevenir que los eventos de teclado se propaguen al canvas
              e.stopPropagation();
            }}
            onClick={(e) => {
              // Prevenir que el click se propague al elemento padre
              e.stopPropagation();
              setEditingTextId(element.id);
            }}
            style={{
              fontSize: element.styles.fontSize,
              fontWeight: element.styles.fontWeight,
              color: element.styles.color,
              fontFamily: element.styles.fontFamily,
              lineHeight: element.styles.lineHeight,
              textAlign: element.styles.textAlign as any,
              border:
                editingTextId === element.id
                  ? "1px dashed #3b82f6"
                  : "1px dashed transparent",
              borderRadius: "2px",
              padding: "2px",
            }}
          >
            {element.content}
          </div>
        )}

        {element.type === "container" && (
          <div
            className="min-h-[50px] min-w-[50px] flex items-center justify-center text-gray-500"
            style={{
              backgroundColor: element.styles.backgroundColor,
              borderRadius: element.styles.borderRadius,
              padding: element.styles.padding,
              border: element.styles.border,
              display: element.styles.display,
              alignItems: element.styles.alignItems,
              justifyContent: element.styles.justifyContent,
              flexDirection: element.styles.flexDirection as any,
            }}
          >
            {element.content || "Container"}
          </div>
        )}

        {element.type === "button" && (
          <button
            className="px-4 py-2 rounded transition-colors"
            style={{
              backgroundColor: element.styles.backgroundColor || "#3b82f6",
              color: element.styles.color || "white",
              fontSize: element.styles.fontSize,
              fontWeight: element.styles.fontWeight,
              borderRadius: element.styles.borderRadius,
              border: element.styles.border,
              cursor: element.styles.cursor,
            }}
          >
            {element.content || "Button"}
          </button>
        )}

        {element.type === "image" && (
          <div
            className="bg-gray-200 flex items-center justify-center text-gray-500"
            style={{
              width: element.styles.width || "200px",
              height: element.styles.height || "150px",
              borderRadius: element.styles.borderRadius,
            }}
          >
            {element.content ? (
              <img
                src={element.content}
                alt={element.name}
                className="w-full h-full object-cover"
                style={{ borderRadius: element.styles.borderRadius }}
              />
            ) : (
              "Image"
            )}
          </div>
        )}

        {/* Vector shapes */}
        {(element.type === "rectangle" ||
          element.type === "oval" ||
          element.type === "polygon" ||
          element.type === "star" ||
          element.type === "path") && (
          <div
            className="w-full h-full"
            style={{
              backgroundColor: element.styles.backgroundColor,
              border: element.styles.border,
              borderRadius: element.styles.borderRadius,
              clipPath: element.styles.clipPath,
            }}
          />
        )}

        {/* Drag indicator on hover (only when not editing text) */}
        {!isTextEditing && (
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-blue-500 text-white p-1 rounded shadow-lg">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" />
              </svg>
            </div>
          </div>
        )}

        {/* Selection and resize controls */}
        {isSelected && (
          <>
            {/* Resize corners */}
            <div
              className="resize-handle absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize hover:bg-blue-600 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, element.id, "nw")}
            ></div>
            <div
              className="resize-handle absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize hover:bg-blue-600 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, element.id, "ne")}
            ></div>
            <div
              className="resize-handle absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize hover:bg-blue-600 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, element.id, "sw")}
            ></div>
            <div
              className="resize-handle absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize hover:bg-blue-600 transition-colors"
              onMouseDown={(e) => handleResizeStart(e, element.id, "se")}
            ></div>

            {/* Element label */}
            <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {element.name}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="flex items-center justify-center min-h-full p-8">
        <div
          ref={canvasRef}
          className="bg-white shadow-lg relative"
          style={{
            width: canvasSize.width * (zoom / 100),
            height: canvasSize.height * (zoom / 100),
            transform: `scale(${zoom / 100})`,
            transformOrigin: "center center",
            cursor:
              activeTool === "text"
                ? "text"
                : activeTool === "vector" && selectedVectorShape
                ? "crosshair"
                : "default",
          }}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Empty page message overlay */}
          {elements.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-20">📱</div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  Empty Page
                </h3>
                <p className="text-gray-400 mb-4">
                  Use the Insert panel to add elements to your page
                </p>
                <div className="text-sm text-gray-300">
                  Size: {canvasSize.width} × {canvasSize.height}px
                </div>
              </div>
            </div>
          )}

          {elements.map(renderElement)}

          {/* Helper grid when no elements are selected */}
          {!selectedElementId && (
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #000 1px, transparent 1px),
                  linear-gradient(to bottom, #000 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
