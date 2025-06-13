import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import AIFramer from "./AIFramer";

interface InsertPanelProps {
  onAddElement: (elementType: string, templateName: string) => void;
  onAddBasicElement?: (type: "text" | "button" | "container" | "image") => void;
}

export default function InsertPanel({
  onAddElement,
  onAddBasicElement,
}: InsertPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "Navigation",
  ]);

  const categories = [
    {
      title: "Start",
      icon: "🚀",
      items: [{ name: "Wireframe", icon: "📱" }],
    },
    {
      title: "Navigation",
      icon: "🧭",
      items: [
        { name: "Navigation Horizontal", icon: "☰", preview: "light" },
        { name: "Navigation Minimal", icon: "◯", preview: "light" },
        { name: "Navigation Split", icon: "⫸", preview: "light" },
      ],
    },
    {
      title: "Menus",
      icon: "📋",
      items: [
        { name: "Menu Dropdown", icon: "📋", preview: "light" },
        { name: "Menu Sidebar", icon: "📑", preview: "light" },
        { name: "Menu Grid", icon: "⊞", preview: "light" },
        { name: "Menu Cards", icon: "🗂️", preview: "light" },
        { name: "Menu Tabs", icon: "📂", preview: "light" },
      ],
    },
    {
      title: "CMS",
      icon: "📦",
      items: [
        { name: "Collections", icon: "📂" },
        { name: "Fields", icon: "📝" },
      ],
    },
    {
      title: "Elements",
      icon: "🎨",
      items: [
        { name: "Icons", icon: "⭐" },
        { name: "Media", icon: "🖼️" },
        { name: "Forms", icon: "📝" },
        { name: "Interactive", icon: "🎯" },
        { name: "Social", icon: "🌐" },
        { name: "Utility", icon: "🔧" },
        { name: "Creative", icon: "🎨" },
      ],
    },
  ];

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryTitle)
        ? prev.filter((title) => title !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  const darkMenuItems = [
    { name: "Menu Simple", icon: "☰" },
    { name: "Menu Icons", icon: "🔵" },
    { name: "Menu Rows", icon: "≡" },
  ];

  return (
    <div className="w-80 bg-[#0f0f0f] border-r border-[#2a2a2a] flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[#2a2a2a]">
        <div className="relative">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* AIFramer Component */}
        <AIFramer onCreateElement={onAddElement} />

        {/* Basic Elements Section */}
        <div className="border-b border-[#1a1a1a] p-4">
          <h3 className="text-white text-sm font-medium mb-3">
            Basic Elements
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddBasicElement?.("text")}
              className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:bg-[#2a2a2a] transition-colors text-left"
            >
              <div className="text-lg mb-1">📝</div>
              <div className="text-xs text-gray-300">Text</div>
            </button>
            <button
              onClick={() => onAddBasicElement?.("button")}
              className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:bg-[#2a2a2a] transition-colors text-left"
            >
              <div className="text-lg mb-1">🔘</div>
              <div className="text-xs text-gray-300">Button</div>
            </button>
            <button
              onClick={() => onAddBasicElement?.("container")}
              className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:bg-[#2a2a2a] transition-colors text-left"
            >
              <div className="text-lg mb-1">📦</div>
              <div className="text-xs text-gray-300">Container</div>
            </button>
            <button
              onClick={() => onAddBasicElement?.("image")}
              className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:bg-[#2a2a2a] transition-colors text-left"
            >
              <div className="text-lg mb-1">🖼️</div>
              <div className="text-xs text-gray-300">Image</div>
            </button>
          </div>
        </div>

        {categories.map((category, index) => (
          <div key={index} className="border-b border-[#1a1a1a]">
            {/* Category Header */}
            <button
              className="w-full p-4 text-left flex items-center gap-3 hover:bg-[#1a1a1a] transition-colors"
              onClick={() => toggleCategory(category.title)}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-white font-medium">{category.title}</span>
              <span className="ml-auto text-gray-400">
                {expandedCategories.includes(category.title) ? "−" : "+"}
              </span>
            </button>

            {/* Category Items */}
            {expandedCategories.includes(category.title) &&
              category.title === "Navigation" && (
                <div className="px-4 pb-4">
                  <div className="grid grid-cols-1 gap-3">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="bg-[#1a1a1a] rounded-lg p-3 cursor-pointer hover:bg-[#2a2a2a] transition-colors border border-[#2a2a2a]"
                        onClick={() => onAddElement("navigation", item.name)}
                      >
                        <div className="bg-white rounded p-2 mb-2 h-16 flex items-center justify-center relative overflow-hidden">
                          {/* Tag Navigation */}
                          <div className="absolute top-1 left-1 bg-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium z-10">
                            Navigation
                          </div>

                          {item.name === "Navigation Horizontal" && (
                            <div className="w-full mt-3">
                              <div className="flex justify-between items-center text-[10px] text-gray-800">
                                <span className="font-medium">🐦</span>
                                <div className="flex gap-2 text-gray-600">
                                  <span>Features</span>
                                  <span>Gallery</span>
                                  <span>Templates</span>
                                  <span>Blog</span>
                                </div>
                              </div>
                              <div className="mt-1 h-px bg-gray-200"></div>
                            </div>
                          )}
                          {item.name === "Navigation Minimal" && (
                            <div className="w-full mt-3">
                              <div className="flex justify-between items-center text-[10px] text-gray-800">
                                <span className="font-medium">🐦</span>
                                <div className="flex gap-2 text-gray-600">
                                  <span>Features</span>
                                  <span>Gallery</span>
                                  <span>Templates</span>
                                </div>
                              </div>
                            </div>
                          )}
                          {item.name === "Navigation Split" && (
                            <div className="w-full mt-3">
                              <div className="flex justify-between items-center text-[10px] text-gray-800">
                                <span className="font-medium">🐦</span>
                                <div className="flex gap-2 text-gray-600">
                                  <span>Product ▽</span>
                                  <span>Resources ▽</span>
                                  <span>Pricing</span>
                                </div>
                              </div>
                              <div className="mt-1 h-px bg-gray-200"></div>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-300">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Menu Items */}
            {expandedCategories.includes(category.title) &&
              category.title === "Menus" && (
                <div className="px-4 pb-4">
                  <div className="grid grid-cols-1 gap-3">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="bg-[#1a1a1a] rounded-lg p-3 cursor-pointer hover:bg-[#2a2a2a] transition-colors border border-[#2a2a2a]"
                        onClick={() => onAddElement("menu", item.name)}
                      >
                        <div className="bg-white rounded p-2 mb-2 h-16 flex items-center justify-center relative overflow-hidden">
                          {/* Tag Menu */}
                          <div className="absolute top-1 left-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium z-10">
                            Menu
                          </div>

                          {item.name === "Menu Dropdown" && (
                            <div className="w-full flex flex-col items-center">
                              <div className="text-[10px] text-gray-800 font-medium mb-1">
                                Menu
                              </div>
                              <div className="bg-gray-50 border rounded p-1 text-[8px] text-gray-600">
                                <div>Design</div>
                                <div>Content</div>
                                <div>Publish</div>
                              </div>
                            </div>
                          )}
                          {item.name === "Menu Sidebar" && (
                            <div className="w-full flex">
                              <div className="bg-gray-100 w-8 h-12 rounded-l border-r flex flex-col p-1 gap-1">
                                <div className="bg-gray-300 h-1 rounded"></div>
                                <div className="bg-gray-300 h-1 rounded"></div>
                                <div className="bg-gray-300 h-1 rounded"></div>
                              </div>
                              <div className="flex-1 h-12 bg-gray-50 rounded-r"></div>
                            </div>
                          )}
                          {item.name === "Menu Grid" && (
                            <div className="w-full">
                              <div className="text-[9px] text-gray-800 text-center mb-1">
                                PRODUCT
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                <div className="bg-gray-100 h-3 rounded text-[7px] p-1">
                                  Design
                                </div>
                                <div className="bg-gray-100 h-3 rounded text-[7px] p-1">
                                  Content
                                </div>
                                <div className="bg-gray-100 h-3 rounded text-[7px] p-1">
                                  Publish
                                </div>
                                <div className="bg-gray-100 h-3 rounded text-[7px] p-1">
                                  API
                                </div>
                              </div>
                            </div>
                          )}
                          {item.name === "Menu Cards" && (
                            <div className="w-full flex gap-1">
                              <div className="bg-gray-100 rounded p-1 flex-1 text-center">
                                <div className="text-[8px] font-medium">
                                  Design
                                </div>
                                <div className="text-[7px] text-gray-500">
                                  Canvas
                                </div>
                              </div>
                              <div className="bg-gray-100 rounded p-1 flex-1 text-center">
                                <div className="text-[8px] font-medium">
                                  Content
                                </div>
                                <div className="text-[7px] text-gray-500">
                                  Blog
                                </div>
                              </div>
                            </div>
                          )}
                          {item.name === "Menu Tabs" && (
                            <div className="w-full">
                              <div className="flex border-b text-[8px]">
                                <div className="px-2 py-1 border-b-2 border-blue-500 text-blue-500">
                                  Design
                                </div>
                                <div className="px-2 py-1 text-gray-500">
                                  Content
                                </div>
                                <div className="px-2 py-1 text-gray-500">
                                  Publish
                                </div>
                              </div>
                              <div className="h-6 bg-gray-50 rounded-b"></div>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-300">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
