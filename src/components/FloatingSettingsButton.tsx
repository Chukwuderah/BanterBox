"use client";

import React from "react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";

interface FloatingSettingsButtonProps {
  onClick: () => void;
}

const FloatingSettingsButton: React.FC<FloatingSettingsButtonProps> = ({
  onClick,
}) => {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{
        scale: 1.1,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-28 right-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      aria-label="Open settings"
      title="Open settings"
    >
      <motion.div
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Settings className="w-6 h-6" />
      </motion.div>
    </motion.button>
  );
};

export default FloatingSettingsButton;
