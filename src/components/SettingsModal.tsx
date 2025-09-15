"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Zap, Brain, Info, Volume2 } from "lucide-react";
import { ChatSettings } from "@/types";
import { useVoices } from "../hooks/useSpeech";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ChatSettings;
  onSettingsChange: (settings: Partial<ChatSettings>) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}) => {
  const { voices, supported: voicesSupported } = useVoices();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2
                    id="settings-title"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Settings
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  aria-label="Close settings"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Animations Toggle */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Animations
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Enable smooth transitions and typewriter effects
                      </p>
                    </div>
                  </div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.animationsEnabled}
                      onChange={(e) =>
                        onSettingsChange({
                          animationsEnabled: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      aria-describedby="animations-description"
                    />
                    <span className="text-gray-900 dark:text-white">
                      {settings.animationsEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </label>
                  <p id="animations-description" className="sr-only">
                    Toggle smooth animations and typewriter effects for AI
                    messages
                  </p>
                </div>

                {/* Memory Toggle */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Brain className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Memory
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Remember conversation context across sessions
                      </p>
                    </div>
                  </div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.memoryEnabled}
                      onChange={(e) =>
                        onSettingsChange({ memoryEnabled: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      aria-describedby="memory-description"
                    />
                    <span className="text-gray-900 dark:text-white">
                      {settings.memoryEnabled ? "Persistent" : "Session only"}
                    </span>
                  </label>
                  <p id="memory-description" className="sr-only">
                    Toggle whether conversations are saved between browser
                    sessions
                  </p>
                </div>

                {/* Voice Selection */}
                {voicesSupported && voices.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                        <Volume2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Voice
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Choose your preferred text-to-speech voice
                        </p>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="voice-select" className="sr-only">
                        Select preferred voice for text-to-speech
                      </label>
                      <select
                        id="voice-select"
                        value={settings.selectedVoice || ""}
                        onChange={(e) =>
                          onSettingsChange({
                            selectedVoice: e.target.value || null,
                          })
                        }
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        aria-describedby="voice-description"
                      >
                        <option value="">Default System Voice</option>
                        {voices.map((voice) => (
                          <option key={voice.name} value={voice.name}>
                            {voice.name} ({voice.lang})
                            {voice.default ? " - Default" : ""}
                          </option>
                        ))}
                      </select>
                      <p
                        id="voice-description"
                        className="mt-1 text-xs text-gray-500 dark:text-gray-400"
                      >
                        {settings.selectedVoice
                          ? `Selected: ${
                              voices.find(
                                (v) => v.name === settings.selectedVoice
                              )?.name || "Unknown"
                            }`
                          : "Using system default voice"}
                      </p>
                    </div>
                  </div>
                )}

                {/* About Section */}
                <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <Info className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        About
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Banter Box - AI Chat Interface v2.0
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      Banter Box is a sleek AI chat experience built with
                      Next.js, TypeScript, Tailwind CSS, and Framer Motion.
                      Version 2.0 introduces typed safety upgrades, Google
                      Gemini API integration for more dynamic responses,
                      multiple AI personalities, voice input/output, and
                      conversation export features.
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-xs md:text-center text-gray-500 dark:text-gray-400">
                        Built as a side project • Fully responsive • Powered by
                        Gemini AI
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
