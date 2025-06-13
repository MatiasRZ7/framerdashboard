import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface WebBuilderStatusBadgeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function WebBuilderStatusBadge({
  className = "",
  size = "md",
}: WebBuilderStatusBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <motion.div
      className={`
        inline-flex items-center gap-2 
        bg-gradient-to-r from-green-500 to-emerald-500 
        text-white font-medium rounded-full
        shadow-lg shadow-green-500/25
        ${sizeClasses[size]}
        ${className}
      `}
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(34, 197, 94, 0.4)",
          "0 0 0 8px rgba(34, 197, 94, 0)",
          "0 0 0 0 rgba(34, 197, 94, 0.4)",
        ],
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <CheckCircleIcon className={iconSizes[size]} />
      <span>Web Builder Working!</span>
    </motion.div>
  );
}
