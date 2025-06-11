"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useInviteMemberModal } from "@/hooks/useInviteMemberModal";

export default function InviteMemberModal() {
  const { isOpen, closeModal } = useInviteMemberModal();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInvite = async () => {
    if (!email.trim()) return;

    setIsLoading(true);

    // Simulate sending invitation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setMessage(`Invitation sent to ${email}`);

    // Reset form after 2 seconds
    setTimeout(() => {
      setEmail("");
      setRole("viewer");
      setMessage("");
      closeModal();
    }, 2000);
  };

  const handleClose = () => {
    setEmail("");
    setRole("viewer");
    setMessage("");
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              className="bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl w-full max-w-md"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#333]">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Invite Team Member
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Collaborate on your projects
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Success Message */}
              {message && (
                <motion.div
                  className="mx-6 mt-4 p-3 bg-green-900/20 border border-green-800 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-green-400 text-sm">{message}</span>
                  </div>
                </motion.div>
              )}

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    disabled={isLoading}
                  />
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    disabled={isLoading}
                  >
                    <option value="viewer">Viewer - Can view projects</option>
                    <option value="editor">Editor - Can edit projects</option>
                    <option value="admin">Admin - Full access</option>
                  </select>
                </div>

                {/* Role Description */}
                <div className="bg-[#2a2a2a] rounded-lg p-3">
                  <h4 className="text-sm font-medium text-white mb-1">
                    Role Permissions
                  </h4>
                  <p className="text-xs text-gray-400">
                    {role === "viewer" &&
                      "Can view and comment on projects, but cannot make changes."}
                    {role === "editor" &&
                      "Can view, edit, and create projects. Cannot manage team settings."}
                    {role === "admin" &&
                      "Full access to all projects and team management features."}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-[#333]">
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] disabled:bg-[#2a2a2a] text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInvite}
                  disabled={isLoading || !email.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      Send Invitation
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
