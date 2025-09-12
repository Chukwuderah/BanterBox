import { Personality } from "@/types";

const responses = {
  friendly: [
    "That's a great question! Let me think about that for a moment. 😊",
    "I'd be happy to help you with that! Here's what I think...",
    "Oh, that's interesting! I love talking about topics like this.",
    "You know what? That reminds me of something fascinating...",
    "That's such a thoughtful way to put it! I completely understand.",
    "I'm so glad you asked! This is actually one of my favorite topics.",
    "What a wonderful perspective! I hadn't thought of it that way before.",
    "That's really insightful! You've got me thinking now too.",
  ],
  sarcastic: [
    "Oh wow, what a absolutely *groundbreaking* question. 🙄",
    "Let me consult my crystal ball... oh wait, I don't have one.",
    "Sure, because I'm definitely the world's leading expert on everything.",
    "Well, aren't you just full of original thoughts today?",
    "Oh, that's easy! Said no AI ever, but I'll give it a shot.",
    "*Pretends to be shocked* Another human asking me to solve their problems!",
    "Let me just wave my magic wand and fix that for you... ✨",
    "Ah yes, because that's definitely how the universe works.",
  ],
  formal: [
    "I appreciate your inquiry. Allow me to provide a comprehensive response.",
    "Thank you for bringing this matter to my attention. Upon consideration...",
    "That is indeed a pertinent question that warrants careful examination.",
    "I shall endeavor to address your concern with appropriate thoroughness.",
    "Your query raises several important points that merit discussion.",
    "Please allow me to present my analysis of this particular subject matter.",
    "I find your question to be both relevant and worthy of detailed consideration.",
    "This topic requires a methodical approach to ensure accuracy.",
  ],
  random: [
    "🎲 Rolling the dice of conversation... and the result is chaos!",
    "Beep boop! Random mode activated! Did you know penguins can't fly but they're excellent swimmers?",
    "🌈 In a parallel universe, this conversation is happening backwards!",
    "Plot twist: What if the real answer was the friends we made along the way?",
    "🎪 Welcome to the circus of artificial consciousness!",
    "Breaking news: Local AI pretends to have feelings about your question!",
    "*Suddenly transforms into a motivational speaker* YOU'VE GOT THIS!",
    "🚀 Houston, we have... a perfectly normal conversation happening here.",
  ],
};

export const generateAIResponse = (
  personality: Personality,
  userMessage: string
): string => {
  const personalityResponses = responses[personality];
  const randomResponse =
    personalityResponses[
      Math.floor(Math.random() * personalityResponses.length)
    ];

  // Add some context-aware responses based on common patterns
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    switch (personality) {
      case "friendly":
        return "Hello there! It's wonderful to meet you! How are you doing today? 😊";
      case "sarcastic":
        return "Oh look, another human trying to be polite. How... refreshing. 🙃";
      case "formal":
        return "Good day to you. I trust you are in excellent health and spirits.";
      case "random":
        return "🎭 HELLO! *dramatically bows* Welcome to the theater of artificial minds!";
    }
  }

  if (
    lowerMessage.includes("how are you") ||
    lowerMessage.includes("how do you feel")
  ) {
    switch (personality) {
      case "friendly":
        return "I'm doing great, thanks for asking! Every conversation is like a new adventure for me. How are you feeling today?";
      case "sarcastic":
        return "Oh, I'm just *peachy* - you know, living the dream as a collection of code and pretending to have emotions. 🤖";
      case "formal":
        return "I am functioning within optimal parameters, thank you for your inquiry regarding my operational status.";
      case "random":
        return "🌟 I feel like a disco ball in a library - sparkling but slightly out of place!";
    }
  }

  return randomResponse;
};

export const getPersonalityEmoji = (personality: Personality): string => {
  switch (personality) {
    case "friendly":
      return "😊";
    case "sarcastic":
      return "😏";
    case "formal":
      return "🎩";
    case "random":
      return "🎲";
    default:
      return "🤖";
  }
};

export const getPersonalityColor = (personality: Personality): string => {
  switch (personality) {
    case "friendly":
      return "text-green-500";
    case "sarcastic":
      return "text-purple-500";
    case "formal":
      return "text-blue-500";
    case "random":
      return "text-pink-500";
    default:
      return "text-gray-500";
  }
};
