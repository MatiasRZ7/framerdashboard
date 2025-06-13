"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import BuilderCanvas from "@/components/builder/BuilderCanvas";
import BuilderSidebar from "@/components/builder/BuilderSidebar";
import BuilderProperties from "@/components/builder/BuilderProperties";
import BuilderToolbar from "@/components/builder/BuilderToolbar";
import InsertPanel from "@/components/builder/InsertPanel";
import VectorPanel from "@/components/builder/VectorPanel";
import { useBuilder } from "@/hooks/useBuilder";
import LearningFeedbackDemo from "@/components/LearningFeedbackDemo";
import "@/utils/learningConsole";

export default function BuilderPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [zoom, setZoom] = useState(100);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [selectedVectorShape, setSelectedVectorShape] = useState<string | null>(
    null
  );

  const {
    project,
    currentPage,
    selectedElement,
    selectedElementId,
    activeTool,
    sidebarTab,
    currentBreakpoint,
    selectElement,
    updateElement,
    updateElementStyles,
    updateElementPosition,
    updateElementSize,
    addPage,
    switchPage,
    renamePage,
    setActiveTool,
    setSidebarTab,
    setBreakpoint,
    addAsset,
    removeAsset,
    addElementFromAsset,
    addElementFromTemplate,
    duplicateElement,
    deleteElement,
    addBasicElement,
    addTextAtPosition,
    addVectorShape,
  } = useBuilder(projectId);

  // Reset selected vector shape when changing tools
  useEffect(() => {
    if (activeTool !== "vector") {
      setSelectedVectorShape(null);
    }
  }, [activeTool]);

  const handleZoomIn = () => setZoom((prev) => Math.min(200, prev + 25));
  const handleZoomOut = () => setZoom((prev) => Math.max(25, prev - 25));
  const handleZoomReset = () => setZoom(100);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent shortcuts when editing text
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Ctrl/Cmd + D: Duplicar elemento seleccionado
      if ((e.ctrlKey || e.metaKey) && e.key === "d" && selectedElementId) {
        e.preventDefault();
        duplicateElement(selectedElementId);
      }

      // Delete/Backspace: Eliminar elemento seleccionado
      if ((e.key === "Delete" || e.key === "Backspace") && selectedElementId) {
        e.preventDefault();
        deleteElement(selectedElementId);
      }

      // Escape: Deseleccionar elemento
      if (e.key === "Escape") {
        selectElement(null);
      }

      // T: Añadir texto
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        addBasicElement("text");
      }

      // B: Añadir botón
      if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        addBasicElement("button");
      }

      // C: Añadir contenedor
      if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        addBasicElement("container");
      }

      // I: Añadir imagen
      if (e.key === "i" || e.key === "I") {
        e.preventDefault();
        addBasicElement("image");
      }

      // Ctrl/Cmd + +: Zoom in
      if ((e.ctrlKey || e.metaKey) && e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      }

      // Ctrl/Cmd + -: Zoom out
      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        handleZoomOut();
      }

      // Ctrl/Cmd + 0: Reset zoom
      if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault();
        handleZoomReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedElementId,
    duplicateElement,
    deleteElement,
    selectElement,
    addBasicElement,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
  ]);

  return (
    <div className="h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <LearningFeedbackDemo />
      <BuilderToolbar
        projectId={projectId}
        activeTool={activeTool}
        onToolChange={setActiveTool}
      />

      <div className="flex h-[calc(100vh-48px)]">
        {activeTool === "insert" ? (
          <InsertPanel
            onAddElement={addElementFromTemplate}
            onAddBasicElement={addBasicElement}
          />
        ) : activeTool === "vector" ? (
          <VectorPanel
            onSelectShape={setSelectedVectorShape}
            selectedShape={selectedVectorShape}
          />
        ) : (
          <BuilderSidebar
            activeTab={sidebarTab}
            onTabChange={setSidebarTab}
            selectedElement={selectedElementId}
            onElementSelect={selectElement}
            project={project}
            onAddPage={addPage}
            onSwitchPage={switchPage}
            onRenamePage={renamePage}
            currentBreakpoint={currentBreakpoint}
            onBreakpointChange={setBreakpoint}
            onAddAsset={addAsset}
            onRemoveAsset={removeAsset}
          />
        )}

        <div className="flex-1 relative">
          <BuilderCanvas
            elements={currentPage?.elements || []}
            selectedElementId={selectedElementId}
            onSelectElement={selectElement}
            onUpdateElement={updateElement}
            currentBreakpoint={currentBreakpoint}
            zoom={zoom}
            activeTool={activeTool}
            selectedVectorShape={selectedVectorShape}
            onAddTextAtPosition={addTextAtPosition}
            onAddVectorShape={addVectorShape}
          />

          {/* Controles de zoom */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-[#2a2a2a] rounded-lg px-4 py-2 shadow-lg">
            <button
              onClick={handleZoomOut}
              className="text-white hover:text-blue-400 transition-colors w-6 h-6 flex items-center justify-center"
            >
              −
            </button>
            <span className="text-white text-sm min-w-[60px] text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              className="text-white hover:text-blue-400 transition-colors w-6 h-6 flex items-center justify-center"
            >
              +
            </button>
            <div className="w-px h-4 bg-gray-600 mx-2" />
            <button
              onClick={handleZoomReset}
              className="text-white hover:text-blue-400 transition-colors text-sm px-2"
            >
              Fit
            </button>
          </div>

          {/* Indicador de breakpoint */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#2a2a2a] rounded-lg px-3 py-1 shadow-lg">
            <span className="text-white text-sm capitalize">
              {currentBreakpoint}
            </span>
            <span className="text-gray-400 text-sm ml-2">
              {currentBreakpoint === "desktop" && "1200px"}
              {currentBreakpoint === "tablet" && "834px"}
              {currentBreakpoint === "phone" && "390px"}
            </span>
          </div>

          {/* Keyboard shortcuts help button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowShortcuts(!showShortcuts)}
              className="bg-[#2a2a2a] text-white p-2 rounded-lg hover:bg-[#3a3a3a] transition-colors"
              title="Keyboard shortcuts"
            >
              ⌨️
            </button>
          </div>

          {/* Keyboard shortcuts panel */}
          {showShortcuts && (
            <div className="absolute top-16 right-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 shadow-xl z-50 w-64">
              <h3 className="text-white font-medium mb-3">
                Keyboard Shortcuts
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Duplicate</span>
                  <span className="text-white">Ctrl+D</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Delete</span>
                  <span className="text-white">Delete</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Deselect</span>
                  <span className="text-white">Escape</span>
                </div>
                <div className="border-t border-[#2a2a2a] my-2"></div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Add Text</span>
                  <span className="text-white">T</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Add Button</span>
                  <span className="text-white">B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Add Container</span>
                  <span className="text-white">C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Add Image</span>
                  <span className="text-white">I</span>
                </div>
                <div className="border-t border-[#2a2a2a] my-2"></div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Zoom In</span>
                  <span className="text-white">Ctrl++</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Zoom Out</span>
                  <span className="text-white">Ctrl+-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reset Zoom</span>
                  <span className="text-white">Ctrl+0</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <BuilderProperties
          selectedElement={selectedElement || null}
          onUpdateElement={updateElement}
          onUpdateElementStyles={updateElementStyles}
          onDuplicateElement={duplicateElement}
          onDeleteElement={deleteElement}
        />
      </div>
    </div>
  );
}
