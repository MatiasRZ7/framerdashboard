import { useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import {
  mockAIResponses,
  aiSuggestionCategories,
  getAIResponse,
} from "@/utils/aiMockResponses";

interface AIFramerProps {
  onCreateElement: (elementType: string, templateName: string) => void;
}

export default function AIFramer({ onCreateElement }: AIFramerProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof aiSuggestionCategories>("popular");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      // Get AI response based on prompt
      const aiResponse = getAIResponse(prompt);

      // Create the element using the existing template system
      onCreateElement("ai-generated", JSON.stringify(aiResponse));

      // Clear the prompt
      setPrompt("");
    } catch (error) {
      console.error("Error generating element:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="border-b border-[#1a1a1a] p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <SparklesIcon className="w-4 h-4 text-purple-400" />
        <h3 className="text-white text-sm font-medium">AI Assistant</h3>
        <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
          Beta
        </span>
      </div>

      {/* Input */}
      <div className="mb-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe what you want to create..."
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500"
          rows={2}
          disabled={isGenerating}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors mb-3"
      >
        {isGenerating ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Generating...
          </div>
        ) : (
          "Generate Element"
        )}
      </button>

      {/* Suggestion Categories */}
      <div className="mb-3">
        <div className="flex gap-1 mb-2">
          {Object.keys(aiSuggestionCategories).map((category) => (
            <button
              key={category}
              onClick={() =>
                setActiveCategory(
                  category as keyof typeof aiSuggestionCategories
                )
              }
              className={`px-2 py-1 text-xs rounded transition-colors ${
                activeCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-[#2a2a2a] text-gray-400 hover:text-white"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Suggestions */}
        <div className="space-y-1">
          {aiSuggestionCategories[activeCategory].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left text-xs text-gray-400 hover:text-white hover:bg-[#2a2a2a] px-2 py-1 rounded transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="text-xs text-gray-500">
        💡 Try: "Create a hero section", "Make a pricing card", "Add a CTA
        button"
      </div>
    </div>
  );
}
