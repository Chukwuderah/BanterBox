"use client";

import React, { useState, useEffect } from "react";
// import Image from "next/image";
import { motion } from "framer-motion";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Sun, Moon, Download, Bot } from "lucide-react";
import { Personality, Theme } from "@/types";

interface HeaderProps {
  personality: Personality;
  theme: Theme;
  onPersonalityChange: (personality: Personality) => void;
  onThemeToggle: () => void;
  onExport: (format: "txt" | "pdf" | "md") => void;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}

const Header: React.FC<HeaderProps> = ({
  personality,
  theme,
  onPersonalityChange,
  onThemeToggle,
  onExport,
}) => {
  const isMobile = useIsMobile();
  const personalities: { value: Personality; label: string; emoji: string }[] =
    [
      { value: "friendly", label: "Friendly", emoji: "😊" },
      { value: "sarcastic", label: "Sarcastic", emoji: "😏" },
      { value: "formal", label: "Formal", emoji: "🎩" },
      { value: "random", label: "Random", emoji: "🎲" },
    ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm"
      role="banner"
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo/Title */}
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"
            aria-label="AI Chat Interface Logo"
          >
            <Bot className="w-6 h-6 text-white" />
            {/* <Image
              className="w-16 h-16"
              src="/logo-transparent.svg"
              alt="AI Chat Interface Logo"
              width={64}
              height={64}
            /> */}
          </motion.div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Banter Box
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Personality Selector */}
          <div className="relative">
            <label htmlFor="personality-select" className="sr-only">
              Select AI Personality
            </label>
            <Select
              value={personality}
              onValueChange={(value) =>
                onPersonalityChange(value as Personality)
              }
            >
              <SelectTrigger className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base">
                <SelectValue
                  placeholder="Select personality"
                  defaultValue={personality}
                >
                  {(() => {
                    const selected = personalities.find(
                      (p) => p.value === personality
                    );
                    if (!selected) return null;
                    return isMobile
                      ? selected.emoji
                      : `${selected.emoji} ${selected.label}`;
                  })()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {personalities.map(({ value, label, emoji }) => (
                  <SelectItem key={value} value={value}>
                    {emoji} {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="hidden absolute inset-y-0 right-0 sm:flex items-center px-2 pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                🎭
              </span>
            </div>
          </div>

          {/* Export Dropdown */}
          <div className="relative group">
            <button
              className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:ring-0 focus:outline-none"
              aria-label="Export conversation"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <Download className="w-5 h-5" />
            </button>
            <div
              className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10"
              role="menu"
              aria-label="Export options"
            >
              <button
                onClick={() => onExport("txt")}
                className="block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none"
                role="menuitem"
              >
                📄 Export .txt
              </button>
              <button
                onClick={() => onExport("pdf")}
                className="block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none"
                role="menuitem"
              >
                📑 Export .pdf
              </button>
              <button
                onClick={() => onExport("md")}
                className="block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none"
                role="menuitem"
              >
                📝 Export .md
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onThemeToggle}
            className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:ring-0 focus:outline-none"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
