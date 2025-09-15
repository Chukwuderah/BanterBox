import { Personality } from "@/types";
import { banterLibrary } from "@/lib/banterLibrary";
import { toast } from "sonner";

// helper to add timeout to fetch
const fetchWithTimeout = (
  url: string,
  options: RequestInit,
  timeout = 5000
) => {
  return Promise.race([
    fetch(url, options),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

export const generateAIResponse = async (
  personality: Personality,
  userMessage: string
): Promise<string> => {
  try {
    const res = await fetchWithTimeout(
      "/api/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personality, message: userMessage }),
      },
      7000 // 7s grace period before fallback
    );

    if (!res.ok) throw new Error("Failed to fetch AI response");

    const data = await res.json();
    return data.text;
  } catch (err) {
    console.error("Falling back to banter library:", err);

    // trigger toast so users know what's up
    toast("⚠️ Falling back to local banter... Gemini is taking a nap.");

    // use old banter library
    const fallback =
      banterLibrary(personality, userMessage) || "Sorry, my banter circuits glitched out. ⚡";

    return fallback;
  }
};
