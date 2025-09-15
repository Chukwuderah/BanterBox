"use client";

import { useState, useEffect, useRef } from "react";

type SpeechRecognitionConstructor =
  | typeof window.SpeechRecognition
  | typeof window.webkitSpeechRecognition;

type SpeechRecognitionInstance =
  InstanceType<SpeechRecognitionConstructor> | null;

export const useVoices = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);

      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      // Load voices immediately if available
      loadVoices();

      // Listen for voices changed event (some browsers load voices asynchronously)
      window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      };
    }
  }, []);

  return { voices, supported };
};

export const useSpeechSynthesis = () => {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  const speak = (text: string, voiceName?: string | null) => {
    if (!supported || typeof window === "undefined") return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    // Set selected voice if provided
    if (voiceName) {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find((voice) => voice.name === voiceName);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  return { speak, stop, speaking, supported };
};

export const useSpeechRecognition = () => {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognitionInstance>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSupported(
        "webkitSpeechRecognition" in window || "SpeechRecognition" in window
      );
    }
  }, []);

  const startListening = (onResult: (transcript: string) => void) => {
    if (!supported || typeof window === "undefined") return;

    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);

    type SpeechRecognitionEvent = Event & {
      results: SpeechRecognitionResultList;
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      setTranscript(transcript);

      if (result.isFinal) {
        onResult(transcript);
      }
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      // Only reset if we didn’t manually stop
      if (recognitionRef.current) setListening(false);
    };

    recognition.start();

    return recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setListening(false);
    }
  };

  return { startListening, stopListening, listening, supported, transcript };
};
