export type Personality = "friendly" | "sarcastic" | "formal" | "random";

export type Theme = "light" | "dark";

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  personality?: Personality;
}

export interface ChatSettings {
  animationsEnabled: boolean;
  memoryEnabled: boolean;
  currentPersonality: Personality;
  theme: Theme;
  selectedVoice: string | null;
}

// ---- Speech Recognition Types ----

// Event type for speech recognition results
export interface SpeechRecognitionResultEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

// Constructor interface
interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

// Extend the built-in SpeechRecognition interface with the props we need
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event) => void) | null;
  start(): void;
  stop(): void;
}

// Extend Window interface for browser support
declare global {
  interface Window {
    webkitSpeechRecognition: SpeechRecognitionConstructor;
    SpeechRecognition: SpeechRecognitionConstructor;
  }
}
