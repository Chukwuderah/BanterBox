"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Message, ChatSettings } from "@/types";
import { getPersonalityEmoji, getPersonalityColor } from "@/utils/aiResponses";
import { useSpeechSynthesis } from "@/hooks/useSpeech";

interface MessageBubbleProps {
  message: Message;
  settings: ChatSettings;
  isTyping?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  settings,
  isTyping = false,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const { speak, stop, speaking, supported } = useSpeechSynthesis();

  useEffect(() => {
    if (!message.isUser && settings.animationsEnabled && !isTyping) {
      setIsAnimating(true);
      setDisplayedText("");

      let currentIndex = 0;
      const typewriterInterval = setInterval(() => {
        if (currentIndex < message.text.length) {
          setDisplayedText(message.text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsAnimating(false);
          clearInterval(typewriterInterval);
        }
      }, 30);

      return () => clearInterval(typewriterInterval);
    } else {
      setDisplayedText(message.text);
    }
  }, [message.text, message.isUser, settings.animationsEnabled, isTyping]);

  const handleSpeak = () => {
    if (speaking) {
      stop();
    } else {
      speak(message.text, settings.selectedVoice);
    }
  };

  const bubbleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, x: message.isUser ? 50 : -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className={`flex ${
        message.isUser ? "justify-end" : "justify-start"
      } mb-4 px-4`}
      role="article"
      aria-label={`${message.isUser ? "Your" : "AI"} message`}
    >
      <div
        className={`flex max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg ${
          message.isUser ? "flex-row-reverse" : "flex-row"
        } items-end space-x-2`}
      >
        {/* Avatar */}
        {!message.isUser && (
          <div
            className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold mb-1 flex-shrink-0"
            aria-label={`AI with ${
              message.personality || "default"
            } personality`}
          >
            {message.personality
              ? getPersonalityEmoji(message.personality)
              : "🤖"}
          </div>
        )}

        {/* Message Bubble */}
        <div className="flex flex-col">
          <div
            className={`px-4 py-3 rounded-2xl shadow-sm ${
              message.isUser
                ? "bg-blue-500 text-white rounded-br-sm"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm"
            }`}
          >
            {isTyping ? (
              <div
                className="flex items-center space-x-1"
                aria-label="AI is typing"
              >
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-gray-500 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-gray-500 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-gray-500 rounded-full"
                />
              </div>
            ) : (
              <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
                {settings.animationsEnabled && !message.isUser
                  ? displayedText
                  : message.text}
                {isAnimating && (
                  <motion.span
                    animate={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-0.5 h-4 bg-current ml-1"
                    aria-hidden="true"
                  />
                )}
              </p>
            )}
          </div>

          {/* AI Message Controls */}
          {!message.isUser && !isTyping && (
            <div className="flex items-center mt-1 space-x-2">
              {message.personality && (
                <span
                  className={`text-xs ${getPersonalityColor(
                    message.personality
                  )} capitalize`}
                >
                  {message.personality}
                </span>
              )}
              {supported && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSpeak}
                  className={`p-1 rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    speaking
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                  }`}
                  aria-label={
                    speaking
                      ? "Stop reading message aloud"
                      : "Read message aloud"
                  }
                  title={speaking ? "Stop speaking" : "Read aloud"}
                >
                  {speaking ? (
                    <VolumeX className="w-3 h-3" />
                  ) : (
                    <Volume2 className="w-3 h-3" />
                  )}
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
