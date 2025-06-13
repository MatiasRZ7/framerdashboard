import { useState, useCallback } from "react";
import {
  DocumentIcon,
  Square3Stack3DIcon,
  PhotoIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { BuilderProject, BuilderAsset } from "@/hooks/useBuilder";
import PageRenameModal from "./PageRenameModal";

interface BuilderSidebarProps {
  activeTab: "pages" | "layers" | "assets";
  onTabChange: (tab: "pages" | "layers" | "assets") => void;
  selectedElement: string | null;
  onElementSelect: (elementId: string | null) => void;
  project: BuilderProject;
  onAddPage: (name: string) => void;
  onSwitchPage: (pageId: string) => void;
  onRenamePage: (pageId: string, newName: string) => void;
  currentBreakpoint: "desktop" | "tablet" | "phone";
  onBreakpointChange: (breakpoint: "desktop" | "tablet" | "phone") => void;
  onAddAsset: (file: File) => BuilderAsset;
  onRemoveAsset: (assetId: string) => void;
}

export default function BuilderSidebar({
  activeTab,
  onTabChange,
  selectedElement,
  onElementSelect,
  project,
  onAddPage,
  onSwitchPage,
  onRenamePage,
  currentBreakpoint,
  onBreakpointChange,
  onAddAsset,
  onRemoveAsset,
}: BuilderSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "desktop",
    "stack",
  ]);
  const [showPageRenameModal, setShowPageRenameModal] = useState(false);
  const [renamingPageId, setRenamingPageId] = useState<string | null>(null);
  const [renamingPageName, setRenamingPageName] = useState("");

  const toggleExpanded = useCallback((itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        Array.from(files).forEach((file) => {
          onAddAsset(file);
        });
      }
      // Reset input
      event.target.value = "";
    },
    [onAddAsset]
  );

  const handleDragStart = useCallback(
    (e: React.DragEvent, asset: BuilderAsset) => {
      e.dataTransfer.setData("application/json", JSON.stringify(asset));
      e.dataTransfer.effectAllowed = "copy";
    },
    []
  );

  const formatFileSize = useCallback((bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, []);

  const tabs = [
    { id: "pages" as const, icon: DocumentIcon, label: "Pages" },
    { id: "layers" as const, icon: Square3Stack3DIcon, label: "Layers" },
    { id: "assets" as const, icon: PhotoIcon, label: "Assets" },
  ];

  return (
    <div className="w-56 bg-[#0f0f0f] border-r border-[#2a2a2a] flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-[#2a2a2a]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1 px-2 py-2.5 text-xs transition-colors ${
              activeTab === tab.id
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "pages" && (
          <div className="p-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Pages
              </span>
              <button
                onClick={() => setShowPageRenameModal(true)}
                className="text-gray-400 hover:text-white transition-colors"
                title="Add new page"
              >
                <PlusIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              {project.pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => onSwitchPage(page.id)}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setRenamingPageId(page.id);
                    setRenamingPageName(page.name);
                    setShowPageRenameModal(true);
                  }}
                  className={`flex items-center gap-2 w-full p-1.5 text-left rounded transition-colors ${
                    project.currentPageId === page.id
                      ? "bg-[#1a1a1a] text-white"
                      : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                  }`}
                >
                  <DocumentIcon className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs truncate">{page.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "layers" && (
          <div className="p-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Layers
              </span>
            </div>

            <div className="space-y-1">
              {/* Desktop breakpoint */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    toggleExpanded("desktop");
                    onBreakpointChange("desktop");
                  }}
                  className={`flex items-center gap-1.5 w-full p-1.5 text-left rounded transition-colors ${
                    currentBreakpoint === "desktop"
                      ? "bg-[#1a1a1a] text-white"
                      : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                  }`}
                >
                  {expandedItems.includes("desktop") ? (
                    <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400" />
                  )}
                  <span className="text-xs">Desktop</span>
                  <span className="text-xs text-gray-500 ml-auto">Primary</span>
                </button>

                {expandedItems.includes("desktop") && (
                  <div className="ml-4 space-y-1">
                    {/* Stack container */}
                    <button
                      onClick={() => toggleExpanded("stack")}
                      className="flex items-center gap-1.5 w-full p-1.5 text-left rounded hover:bg-[#1a1a1a] transition-colors"
                    >
                      {expandedItems.includes("stack") ? (
                        <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400" />
                      ) : (
                        <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400" />
                      )}
                      <div className="w-3 h-3 bg-blue-500 rounded" />
                      <span className="text-xs text-white">Stack</span>
                    </button>

                    {expandedItems.includes("stack") && (
                      <div className="ml-4 space-y-1">
                        {project.pages
                          .find((p) => p.id === project.currentPageId)
                          ?.elements.map((element) => (
                            <button
                              key={element.id}
                              onClick={() => onElementSelect(element.id)}
                              className={`flex items-center gap-1.5 w-full p-1.5 text-left rounded transition-colors ${
                                selectedElement === element.id
                                  ? "bg-blue-600/20 border border-blue-500"
                                  : "hover:bg-[#1a1a1a]"
                              }`}
                            >
                              <div
                                className={`w-3 h-3 rounded ${
                                  element.type === "text"
                                    ? "bg-green-500"
                                    : element.type === "container"
                                    ? "bg-blue-500"
                                    : element.type === "image"
                                    ? "bg-purple-500"
                                    : "bg-gray-500"
                                }`}
                              />
                              <span className="text-xs text-gray-300 truncate">
                                {element.name}
                              </span>
                            </button>
                          )) || []}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tablet and Phone breakpoints */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    toggleExpanded("tablet");
                    onBreakpointChange("tablet");
                  }}
                  className={`flex items-center gap-1.5 w-full p-1.5 text-left rounded transition-colors ${
                    currentBreakpoint === "tablet"
                      ? "bg-[#1a1a1a] text-white"
                      : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                  }`}
                >
                  <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs">Tablet</span>
                  <span className="text-xs text-gray-500 ml-auto">834</span>
                </button>
                <button
                  onClick={() => {
                    toggleExpanded("phone");
                    onBreakpointChange("phone");
                  }}
                  className={`flex items-center gap-1.5 w-full p-1.5 text-left rounded transition-colors ${
                    currentBreakpoint === "phone"
                      ? "bg-[#1a1a1a] text-white"
                      : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                  }`}
                >
                  <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs">Phone</span>
                  <span className="text-xs text-gray-500 ml-auto">390</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "assets" && (
          <div className="p-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Assets
              </span>
              <label
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Upload asset"
              >
                <PlusIcon className="w-3.5 h-3.5" />
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {project.assets.length > 0 ? (
              <div className="space-y-1">
                {project.assets.map((asset) => (
                  <div
                    key={asset.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, asset)}
                    className="group relative bg-[#1a1a1a] rounded p-2 cursor-move hover:bg-[#2a2a2a] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {asset.type === "image" ? (
                        <div
                          className="w-8 h-8 bg-cover bg-center rounded"
                          style={{ backgroundImage: `url(${asset.url})` }}
                        />
                      ) : (
                        <div
                          className={`w-8 h-8 rounded flex items-center justify-center text-xs ${
                            asset.type === "video"
                              ? "bg-red-500"
                              : asset.type === "audio"
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                        >
                          <span className="text-white">
                            {asset.type === "video"
                              ? "🎥"
                              : asset.type === "audio"
                              ? "🎵"
                              : "📄"}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white truncate leading-tight">
                          {asset.name}
                        </p>
                        <p className="text-xs text-gray-500 leading-tight">
                          {formatFileSize(asset.size)}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveAsset(asset.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all text-sm"
                        title="Remove asset"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <PhotoIcon className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-xs text-gray-500 mb-2">No assets yet</p>
                <label className="text-xs text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                  Upload your first asset
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Page Rename Modal */}
      <PageRenameModal
        isOpen={showPageRenameModal}
        onClose={() => {
          setShowPageRenameModal(false);
          setRenamingPageId(null);
          setRenamingPageName("");
        }}
        onConfirm={(name) => {
          if (renamingPageId) {
            // Renaming existing page
            onRenamePage(renamingPageId, name);
          } else {
            // Creating new page
            onAddPage(name);
          }
          setShowPageRenameModal(false);
          setRenamingPageId(null);
          setRenamingPageName("");
        }}
        title={renamingPageId ? "Rename page" : "Create new page"}
        placeholder="Enter page name"
        initialValue={renamingPageName}
      />
    </div>
  );
}
