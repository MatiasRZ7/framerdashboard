// Mock responses for AI-generated elements
export const mockAIResponses = {
  button: {
    type: "container" as const,
    name: "AI Button",
    content: "Get Started",
    styles: {
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      padding: "12px 24px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "600",
      textAlign: "center",
      cursor: "pointer",
      border: "none",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      width: "140px",
      height: "44px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  "cta-button": {
    type: "container" as const,
    name: "CTA Button",
    content: "Start Free Trial →",
    styles: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#ffffff",
      padding: "16px 32px",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "700",
      textAlign: "center",
      cursor: "pointer",
      border: "none",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      width: "200px",
      height: "56px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
    },
  },
  "ghost-button": {
    type: "container" as const,
    name: "Ghost Button",
    content: "Learn More",
    styles: {
      backgroundColor: "transparent",
      color: "#374151",
      padding: "12px 24px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      textAlign: "center",
      cursor: "pointer",
      border: "2px solid #d1d5db",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      width: "140px",
      height: "44px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  box: {
    type: "container" as const,
    name: "AI Container",
    content: "Content goes here\nAdd your text or elements",
    styles: {
      backgroundColor: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "24px",
      fontSize: "14px",
      color: "#64748b",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      width: "300px",
      height: "150px",
      lineHeight: "1.6",
    },
  },
  card: {
    type: "container" as const,
    name: "Feature Card",
    content:
      "✨ Amazing Feature\nThis feature will revolutionize your workflow and boost productivity by 300%.\n\nLearn More →",
    styles: {
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "16px",
      padding: "32px",
      fontSize: "15px",
      color: "#374151",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      width: "320px",
      height: "200px",
      lineHeight: "1.7",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    },
  },
  hero: {
    type: "container" as const,
    name: "AI Hero Section",
    content:
      "🚀 Build amazing websites\nCreate stunning designs with our intuitive builder\n\nGet Started →",
    styles: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#ffffff",
      padding: "60px 40px",
      borderRadius: "16px",
      fontSize: "16px",
      fontWeight: "500",
      textAlign: "center",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      width: "500px",
      height: "250px",
      lineHeight: "1.8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
  },
  "pricing-card": {
    type: "container" as const,
    name: "Pricing Card",
    content:
      "💎 Pro Plan\n$29/month\n\n✓ Unlimited projects\n✓ Advanced features\n✓ Priority support\n\nChoose Plan",
    styles: {
      backgroundColor: "#ffffff",
      border: "2px solid #3b82f6",
      borderRadius: "20px",
      padding: "40px 24px",
      fontSize: "14px",
      color: "#374151",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      width: "280px",
      height: "320px",
      lineHeight: "1.6",
      textAlign: "center",
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)",
    },
  },
  testimonial: {
    type: "container" as const,
    name: "Testimonial",
    content:
      '💬 "This tool completely transformed our design process. We\'re now 5x faster!"\n\n— Sarah Johnson, Design Lead at TechCorp',
    styles: {
      backgroundColor: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: "16px",
      borderLeft: "4px solid #10b981",
      padding: "24px",
      fontSize: "15px",
      color: "#374151",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      width: "400px",
      height: "140px",
      lineHeight: "1.6",
      fontStyle: "italic",
    },
  },
  "stats-widget": {
    type: "container" as const,
    name: "Stats Widget",
    content:
      "📊 Performance\n\n🚀 99.9% Uptime\n👥 10K+ Users\n⭐ 4.9/5 Rating\n📈 500% Growth",
    styles: {
      backgroundColor: "#1f2937",
      color: "#ffffff",
      borderRadius: "16px",
      padding: "32px",
      fontSize: "14px",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      width: "240px",
      height: "200px",
      lineHeight: "1.8",
      textAlign: "center",
    },
  },
};

// Predefined suggestions by category
export const aiSuggestionCategories = {
  popular: [
    "Create a CTA button",
    "Create a hero section",
    "Create a feature card",
    "Create a pricing card",
  ],
  buttons: [
    "Create a button",
    "Create a CTA button",
    "Create a ghost button",
    "Create a download button",
  ],
  sections: [
    "Create a hero section",
    "Create a testimonial",
    "Create a stats widget",
    "Create a pricing section",
  ],
  content: [
    "Create a feature card",
    "Create a container box",
    "Create a text block",
    "Create an image placeholder",
  ],
};

// Helper function to get AI response based on prompt
export function getAIResponse(prompt: string) {
  const lowerPrompt = prompt.toLowerCase();

  // Simple keyword matching for mock responses
  if (lowerPrompt.includes("cta") || lowerPrompt.includes("call to action")) {
    return mockAIResponses["cta-button"];
  }
  if (lowerPrompt.includes("ghost") && lowerPrompt.includes("button")) {
    return mockAIResponses["ghost-button"];
  }
  if (lowerPrompt.includes("button")) {
    return mockAIResponses.button;
  }
  if (lowerPrompt.includes("hero")) {
    return mockAIResponses.hero;
  }
  if (lowerPrompt.includes("pricing")) {
    return mockAIResponses["pricing-card"];
  }
  if (lowerPrompt.includes("testimonial")) {
    return mockAIResponses.testimonial;
  }
  if (lowerPrompt.includes("stats") || lowerPrompt.includes("statistics")) {
    return mockAIResponses["stats-widget"];
  }
  if (lowerPrompt.includes("card") || lowerPrompt.includes("feature")) {
    return mockAIResponses.card;
  }
  if (lowerPrompt.includes("box") || lowerPrompt.includes("container")) {
    return mockAIResponses.box;
  }

  // Default fallback
  return mockAIResponses.card;
}

// Type definitions for better TypeScript support
export type AIResponseKey = keyof typeof mockAIResponses;
export type AISuggestionCategory = keyof typeof aiSuggestionCategories;
