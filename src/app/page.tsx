"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Message, ChatSettings, Personality } from "@/types";
import { generateAIResponse } from "@/utils/aiResponses";
import { exportToTxt, exportToPdf } from "@/utils/exportUtils";
import { useTheme } from "@/hooks/useTheme";
import Header from "@/components/Header";
import ChatWindow from "@/components/ChatWindow";
import InputBar from "@/components/InputBar";
import SettingsModal from "@/components/SettingsModal";
import FloatingSettingsButton from "@/components/FloatingSettingsButton";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    animationsEnabled: true,
    memoryEnabled: true,
    currentPersonality: "friendly",
    theme: theme,
    selectedVoice: null,
  });

  // Load messages from localStorage if memory is enabled
  useEffect(() => {
    if (settings.memoryEnabled && typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("ai-chat-messages");
      if (savedMessages) {
        try {
          const parsed = JSON.parse(savedMessages);
          setMessages(
            parsed.map((msg: Message) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            }))
          );
        } catch (error) {
          console.error("Failed to load messages from localStorage:", error);
        }
      }
    }
  }, [settings.memoryEnabled]);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (
      settings.memoryEnabled &&
      messages.length > 0 &&
      typeof window !== "undefined"
    ) {
      localStorage.setItem("ai-chat-messages", JSON.stringify(messages));
    }
  }, [messages, settings.memoryEnabled]);

  // Clear messages when memory is disabled
  useEffect(() => {
    if (!settings.memoryEnabled && typeof window !== "undefined") {
      localStorage.removeItem("ai-chat-messages");
    }
  }, [settings.memoryEnabled]);

  const handleSendMessage = useCallback(
    async (text: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        text,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // Simulate AI processing delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 2000)
      );

      const aiResponse = generateAIResponse(settings.currentPersonality, text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        personality: settings.currentPersonality,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMessage]);
    },
    [settings.currentPersonality]
  );

  const handlePersonalityChange = useCallback((personality: Personality) => {
    setSettings((prev) => ({ ...prev, currentPersonality: personality }));
  }, []);

  const handleExport = useCallback(
    (format: "txt" | "pdf" | "md") => {
      if (messages.length === 0) {
        alert("No messages to export!");
        return;
      }

      if (format === "txt") {
        exportToTxt(messages, settings.currentPersonality);
      } else if (format === "pdf") {
        exportToPdf(messages, settings.currentPersonality);
      }
    },
    [messages, settings.currentPersonality]
  );

  const handleSettingsChange = useCallback(
    (newSettings: Partial<ChatSettings>) => {
      setSettings((prev) => ({ ...prev, ...newSettings }));
    },
    []
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSettingsOpen) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSettingsOpen]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header
        personality={settings.currentPersonality}
        theme={theme}
        onPersonalityChange={handlePersonalityChange}
        onThemeToggle={toggleTheme}
        onExport={handleExport}
      />

      <ChatWindow messages={messages} settings={settings} isTyping={isTyping} />

      <InputBar onSendMessage={handleSendMessage} disabled={isTyping} />

      <FloatingSettingsButton onClick={() => setIsSettingsOpen(true)} />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
}
