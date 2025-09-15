"use client";

import React, { useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { Message, ChatSettings } from "@/types";
import MessageBubble from "./MessageBubble";
import BackgroundPattern from "./BackgroundPattern";

interface ChatWindowProps {
  messages: Message[];
  settings: ChatSettings;
  isTyping: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  settings,
  isTyping,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div
      className="flex-1 overflow-y-auto pt-20 pb-24 relative"
      role="main"
      aria-label="Chat conversation"
      style={{ height: "calc(100vh - 160px)" }}
    >
      <BackgroundPattern />

      <div className="relative z-10 min-h-full">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center h-full px-4"
          >
            <div className="text-center py-12 max-w-md">
              <DotLottieReact
                src="https://lottie.host/65b3eddb-183b-42fa-88a4-44f008102ecf/hZCVSM1dTV.lottie"
                // loop
                autoplay
              />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome to Banter Box!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Start a conversation by typing a message below. You can change
                my personality, use voice input, and export our conversation
                anytime.
              </p>
              <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                <p>💡 Try asking me anything or just say hello!</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="py-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                settings={settings}
              />
            ))}
            {isTyping && (
              <MessageBubble
                message={{
                  id: "typing",
                  text: "",
                  isUser: false,
                  timestamp: new Date(),
                  personality: settings.currentPersonality,
                }}
                settings={settings}
                isTyping={true}
              />
            )}
          </div>
        )}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>
    </div>
  );
};

export default ChatWindow;
