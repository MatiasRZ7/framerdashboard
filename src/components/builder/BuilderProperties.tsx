import { useState, useCallback } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  TrashIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { BuilderElement } from "@/hooks/useBuilder";

interface BuilderPropertiesProps {
  selectedElement: BuilderElement | null;
  onUpdateElement: (
    elementId: string,
    updates: Partial<BuilderElement>
  ) => void;
  onUpdateElementStyles: (
    elementId: string,
    styles: Partial<BuilderElement["styles"]>
  ) => void;
  onDuplicateElement?: (elementId: string) => void;
  onDeleteElement?: (elementId: string) => void;
}

export default function BuilderProperties({
  selectedElement,
  onUpdateElement,
  onUpdateElementStyles,
  onDuplicateElement,
  onDeleteElement,
}: BuilderPropertiesProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "content",
    "position",
    "size",
    "appearance",
  ]);

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  }, []);

  const updateStyle = useCallback(
    (property: string, value: string) => {
      if (selectedElement) {
        onUpdateElementStyles(selectedElement.id, { [property]: value });
      }
    },
    [selectedElement, onUpdateElementStyles]
  );

  const updateContent = useCallback(
    (content: string) => {
      if (selectedElement) {
        onUpdateElement(selectedElement.id, { content });
      }
    },
    [selectedElement, onUpdateElement]
  );

  const updateName = useCallback(
    (name: string) => {
      if (selectedElement) {
        onUpdateElement(selectedElement.id, { name });
      }
    },
    [selectedElement, onUpdateElement]
  );

  if (!selectedElement) {
    return (
      <div className="w-80 bg-[#0f0f0f] border-l border-[#2a2a2a] p-6">
        <div className="text-center text-gray-500">
          <div className="w-12 h-12 bg-[#2a2a2a] rounded-lg mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
          <p className="text-sm">
            Selecciona un elemento para editar sus propiedades
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-[#0f0f0f] border-l border-[#2a2a2a] overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            {selectedElement.type}
          </span>
          <div className="flex gap-1">
            <button
              className="p-1 text-gray-400 hover:text-white transition-colors"
              onClick={() => onDuplicateElement?.(selectedElement.id)}
              title="Duplicar elemento"
            >
              <DocumentDuplicateIcon className="w-4 h-4" />
            </button>
            <button
              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              onClick={() => onDeleteElement?.(selectedElement.id)}
              title="Eliminar elemento"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <input
          type="text"
          value={selectedElement.name}
          onChange={(e) => updateName(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
        />
      </div>

      <div className="p-4 space-y-4">
        {/* Content Section */}
        {(selectedElement.type === "text" ||
          selectedElement.type === "button") && (
          <div>
            <button
              onClick={() => toggleSection("content")}
              className="flex items-center justify-between w-full text-left mb-3"
            >
              <span className="text-white text-sm font-medium">Contenido</span>
              {expandedSections.includes("content") ? (
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {expandedSections.includes("content") && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Texto
                  </label>
                  <textarea
                    value={selectedElement.content || ""}
                    onChange={(e) => updateContent(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm resize-none"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Position Section */}
        <div>
          <button
            onClick={() => toggleSection("position")}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="text-white text-sm font-medium">Posición</span>
            {expandedSections.includes("position") ? (
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expandedSections.includes("position") && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">X</label>
                  <input
                    type="number"
                    value={parseInt(selectedElement.styles.left || "0")}
                    onChange={(e) => updateStyle("left", `${e.target.value}px`)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Y</label>
                  <input
                    type="number"
                    value={parseInt(selectedElement.styles.top || "0")}
                    onChange={(e) => updateStyle("top", `${e.target.value}px`)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Size Section */}
        <div>
          <button
            onClick={() => toggleSection("size")}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="text-white text-sm font-medium">Tamaño</span>
            {expandedSections.includes("size") ? (
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expandedSections.includes("size") && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Ancho
                  </label>
                  <input
                    type="text"
                    value={selectedElement.styles.width || "auto"}
                    onChange={(e) => updateStyle("width", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                    placeholder="auto"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Alto
                  </label>
                  <input
                    type="text"
                    value={selectedElement.styles.height || "auto"}
                    onChange={(e) => updateStyle("height", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                    placeholder="auto"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Appearance Section */}
        <div>
          <button
            onClick={() => toggleSection("appearance")}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="text-white text-sm font-medium">Apariencia</span>
            {expandedSections.includes("appearance") ? (
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expandedSections.includes("appearance") && (
            <div className="space-y-3">
              {/* Background Color */}
              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Color de fondo
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={selectedElement.styles.backgroundColor || "#ffffff"}
                    onChange={(e) =>
                      updateStyle("backgroundColor", e.target.value)
                    }
                    className="w-8 h-8 bg-[#1a1a1a] border border-[#2a2a2a] rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={selectedElement.styles.backgroundColor || ""}
                    onChange={(e) =>
                      updateStyle("backgroundColor", e.target.value)
                    }
                    className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                    placeholder="transparent"
                  />
                </div>
              </div>

              {/* Text Color */}
              {(selectedElement.type === "text" ||
                selectedElement.type === "button") && (
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Color de texto
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={selectedElement.styles.color || "#000000"}
                      onChange={(e) => updateStyle("color", e.target.value)}
                      className="w-8 h-8 bg-[#1a1a1a] border border-[#2a2a2a] rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedElement.styles.color || ""}
                      onChange={(e) => updateStyle("color", e.target.value)}
                      className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              )}

              {/* Font Size */}
              {(selectedElement.type === "text" ||
                selectedElement.type === "button") && (
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Tamaño de fuente
                  </label>
                  <input
                    type="text"
                    value={selectedElement.styles.fontSize || "16px"}
                    onChange={(e) => updateStyle("fontSize", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                    placeholder="16px"
                  />
                </div>
              )}

              {/* Font Weight */}
              {(selectedElement.type === "text" ||
                selectedElement.type === "button") && (
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Peso de fuente
                  </label>
                  <select
                    value={selectedElement.styles.fontWeight || "normal"}
                    onChange={(e) => updateStyle("fontWeight", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                  >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="600">600</option>
                    <option value="700">700</option>
                    <option value="800">800</option>
                    <option value="900">900</option>
                  </select>
                </div>
              )}

              {/* Border for vector shapes */}
              {(selectedElement.type === "rectangle" ||
                selectedElement.type === "oval" ||
                selectedElement.type === "polygon" ||
                selectedElement.type === "star" ||
                selectedElement.type === "path") && (
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Border
                  </label>
                  <input
                    type="text"
                    value={selectedElement.styles.border || "2px solid #1e40af"}
                    onChange={(e) => updateStyle("border", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                    placeholder="2px solid #1e40af"
                  />
                </div>
              )}

              {/* Border Radius */}
              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Border radius
                </label>
                <input
                  type="text"
                  value={selectedElement.styles.borderRadius || "0px"}
                  onChange={(e) => updateStyle("borderRadius", e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                  placeholder="0px"
                />
              </div>

              {/* Padding */}
              <div>
                <label className="text-xs text-gray-400 block mb-1">
                  Padding
                </label>
                <input
                  type="text"
                  value={selectedElement.styles.padding || "0px"}
                  onChange={(e) => updateStyle("padding", e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                  placeholder="0px"
                />
              </div>
            </div>
          )}
        </div>

        {/* Layout Section for containers */}
        {selectedElement.type === "container" && (
          <div>
            <button
              onClick={() => toggleSection("layout")}
              className="flex items-center justify-between w-full text-left mb-3"
            >
              <span className="text-white text-sm font-medium">Layout</span>
              {expandedSections.includes("layout") ? (
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {expandedSections.includes("layout") && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    Display
                  </label>
                  <select
                    value={selectedElement.styles.display || "block"}
                    onChange={(e) => updateStyle("display", e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                  >
                    <option value="block">Block</option>
                    <option value="flex">Flex</option>
                    <option value="inline">Inline</option>
                    <option value="inline-block">Inline Block</option>
                    <option value="grid">Grid</option>
                  </select>
                </div>

                {selectedElement.styles.display === "flex" && (
                  <>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">
                        Flex Direction
                      </label>
                      <select
                        value={selectedElement.styles.flexDirection || "row"}
                        onChange={(e) =>
                          updateStyle("flexDirection", e.target.value)
                        }
                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                      >
                        <option value="row">Row</option>
                        <option value="column">Column</option>
                        <option value="row-reverse">Row Reverse</option>
                        <option value="column-reverse">Column Reverse</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 block mb-1">
                        Justify Content
                      </label>
                      <select
                        value={
                          selectedElement.styles.justifyContent || "flex-start"
                        }
                        onChange={(e) =>
                          updateStyle("justifyContent", e.target.value)
                        }
                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                      >
                        <option value="flex-start">Flex Start</option>
                        <option value="center">Center</option>
                        <option value="flex-end">Flex End</option>
                        <option value="space-between">Space Between</option>
                        <option value="space-around">Space Around</option>
                        <option value="space-evenly">Space Evenly</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 block mb-1">
                        Align Items
                      </label>
                      <select
                        value={selectedElement.styles.alignItems || "stretch"}
                        onChange={(e) =>
                          updateStyle("alignItems", e.target.value)
                        }
                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm"
                      >
                        <option value="stretch">Stretch</option>
                        <option value="flex-start">Flex Start</option>
                        <option value="center">Center</option>
                        <option value="flex-end">Flex End</option>
                        <option value="baseline">Baseline</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
