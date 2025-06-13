import {
  ChevronLeftIcon,
  PlayIcon,
  EyeIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface BuilderToolbarProps {
  projectId: string;
  activeTool: string;
  onToolChange: (tool: string) => void;
}

export default function BuilderToolbar({
  projectId,
  activeTool,
  onToolChange,
}: BuilderToolbarProps) {
  const router = useRouter();

  const handleGoBack = useCallback(() => {
    router.push("/");
  }, [router]);

  const handlePreview = useCallback(() => {
    // TODO: Implementar preview
    console.log("Preview");
  }, []);

  const handlePublish = useCallback(() => {
    // TODO: Implementar publish
    console.log("Publish");
  }, []);

  return (
    <div className="h-12 bg-[#111111] border-b border-[#2a2a2a] flex items-center justify-between px-4">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          <span className="text-sm">Dashboard</span>
        </button>

        <div className="w-px h-6 bg-[#2a2a2a]" />

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-sm text-gray-300">Untitled</span>
        </div>
      </div>

      {/* Center section - Tools */}
      <div className="flex items-center gap-1 bg-[#1a1a1a] rounded-lg p-1">
        {[
          { icon: "👆", label: "Select", id: "select" },
          { icon: "📝", label: "Insert", id: "insert" },
          { icon: "📐", label: "Layout", id: "layout" },
          { icon: "📝", label: "Text", id: "text" },
          { icon: "🎨", label: "Vector", id: "vector" },
          { icon: "📦", label: "CMS", id: "cms" },
        ].map((tool, index) => (
          <button
            key={index}
            onClick={() => onToolChange(tool.id)}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              activeTool === tool.id
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-[#2a2a2a]"
            }`}
          >
            {tool.label}
          </button>
        ))}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span>Desktop</span>
          <span className="text-gray-600">1200</span>
        </div>

        <div className="w-px h-6 bg-[#2a2a2a]" />

        <button
          onClick={handlePreview}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <PlayIcon className="w-4 h-4" />
          <span>Preview</span>
        </button>

        <button
          onClick={handlePublish}
          className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
