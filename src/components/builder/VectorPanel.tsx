import { useCallback } from "react";

interface VectorPanelProps {
  onSelectShape: (
    shapeType: "rectangle" | "oval" | "polygon" | "star" | "path"
  ) => void;
  selectedShape: string | null;
}

export default function VectorPanel({
  onSelectShape,
  selectedShape,
}: VectorPanelProps) {
  const shapes = [
    {
      id: "rectangle",
      name: "Rectangle",
      icon: "⬜",
      shortcut: "R",
    },
    {
      id: "oval",
      name: "Oval",
      icon: "⭕",
      shortcut: "O",
    },
    {
      id: "polygon",
      name: "Polygon",
      icon: "🔺",
      shortcut: "P",
    },
    {
      id: "star",
      name: "Star",
      icon: "⭐",
      shortcut: "S",
    },
    {
      id: "path",
      name: "Path",
      icon: "〰️",
      shortcut: "P",
    },
  ];

  const handleShapeClick = useCallback(
    (shapeType: "rectangle" | "oval" | "polygon" | "star" | "path") => {
      onSelectShape(shapeType);
    },
    [onSelectShape]
  );

  return (
    <div className="w-64 bg-[#111111] border-r border-[#2a2a2a] flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[#2a2a2a]">
        <h3 className="text-sm font-medium text-white mb-1">Vector Shapes</h3>
        <p className="text-xs text-gray-400">
          Click a shape, then click on canvas to create
        </p>
      </div>

      {/* Shapes Grid */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-gray-300 uppercase tracking-wide mb-3">
            Basic Shapes
          </h4>

          <div className="grid grid-cols-2 gap-2">
            {shapes.map((shape) => (
              <button
                key={shape.id}
                onClick={() => handleShapeClick(shape.id as any)}
                className={`
                  p-3 rounded-lg border transition-all duration-200 text-left
                  ${
                    selectedShape === shape.id
                      ? "bg-blue-600/20 border-blue-500 text-blue-400"
                      : "bg-[#1a1a1a] border-[#2a2a2a] text-gray-300 hover:bg-[#222222] hover:border-[#333333]"
                  }
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl">{shape.icon}</span>
                  <div className="text-center">
                    <div className="text-xs font-medium">{shape.name}</div>
                    <div className="text-xs text-gray-500">
                      {shape.shortcut}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-3 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
          <div className="text-xs text-gray-400">
            <div className="font-medium text-gray-300 mb-2">How to use:</div>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Select a shape above</li>
              <li>Click anywhere on the canvas</li>
              <li>Shape will be created at that position</li>
              <li>Use properties panel to customize</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
