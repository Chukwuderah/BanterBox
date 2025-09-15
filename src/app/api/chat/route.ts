import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { message, personality } = await req.json();

    // personality prompt wrapper
    const personalityPrompts: Record<string, string> = {
      friendly: "Respond warmly, positively, and kindly, with emojis.",
      sarcastic: "Respond with dry, witty sarcasm and humor.",
      formal: "Respond professionally, polite, and structured.",
      random: "Respond unpredictably, playful, and with quirky randomness.",
    };

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Personality: ${personality}
      Instruction: ${personalityPrompts[personality]}
      User message: ${message}
      Reply in a single conversational response.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { text: "Oops, something went wrong. 😅" },
      { status: 500 }
    );
  }
}
