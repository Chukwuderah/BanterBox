"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mic, MicOff } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/useSpeech";

interface InputBarProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const InputBar: React.FC<InputBarProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [message, setMessage] = useState("");
  const { startListening, stopListening, listening, supported } =
    useSpeechRecognition();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Detect if on mobile
  const isMobile =
    typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleVoiceInput = () => {
    if (listening) {
      stopListening();
    } else {
      startListening((transcript) => {
        setMessage(transcript);
      });
    }
  };

  // Global Esc listener (for when textarea is disabled during voice mode)
  useEffect(() => {
    if (!listening) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        stopListening();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [listening, stopListening]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    if (e.key === "Escape" && listening) {
      e.preventDefault();
      stopListening();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [message]);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 p-4"
      role="region"
      aria-label="Message input"
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-3">
          {/* Voice Input Button */}
          {supported && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVoiceInput}
              disabled={disabled}
              className={`p-3 rounded-full transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                listening
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label={listening ? "Stop voice input" : "Start voice input"}
              title={
                listening
                  ? isMobile
                    ? "Tap again to stop voice input"
                    : "Listening... (Press Esc to cancel)"
                  : "Voice input"
              }
            >
              {listening ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Mic className="w-5 h-5" />
                </motion.div>
              ) : (
                <MicOff className="w-5 h-5" />
              )}
            </motion.button>
          )}

          {/* Text Input */}
          <div className="flex-1">
            <label htmlFor="message-input" className="sr-only">
              Type your message
            </label>
            <textarea
              id="message-input"
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={listening ? "Listening..." : "Type a message..."}
              disabled={disabled || listening}
              rows={1}
              className="w-full overflow-hidden px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 disabled:opacity-50 focus:outline-none"
              style={{ minHeight: "48px", maxHeight: "120px" }}
              aria-describedby="input-help"
            />
          </div>

          {/* Send Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!message.trim() || disabled || listening}
            className={`p-3 rounded-full transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              message.trim() && !disabled && !listening
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
                : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
            aria-label="Send message"
            title="Send message (Enter)"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Voice Input Indicator */}
        {listening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-2 text-center"
            role="status"
            aria-live="polite"
          >
            <span className="text-red-500 text-sm font-medium">
              🎤{" "}
              {isMobile
                ? "Listening... Tap the mic to stop"
                : "Listening... Press Esc to cancel"}
            </span>
          </motion.div>
        )}

        {/* Keyboard Shortcuts Hint */}
        <div
          id="input-help"
          className="hidden sm:block mt-2 text-xs text-gray-500 dark:text-gray-400 text-center"
        >
          Press{" "}
          <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs">
            Enter
          </kbd>{" "}
          to send
          {supported && !isMobile && (
            <>
              {" "}
              •{" "}
              <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs">
                Esc
              </kbd>{" "}
              to cancel voice
            </>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default InputBar;
