import { createOpenAI } from "@ai-sdk/openai";
import { generateText, type CoreMessage } from "ai";

// Replace this with your actual OpenAI API key
// You can get one from: https://platform.openai.com/api-keys
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openai = createOpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function generateChatResponse(messages: CoreMessage[]) {
  try {
    const { text, response } = await generateText({
      model: openai("gpt-4o"),
      system:
        "You are a helpful SQL assistant. Help users write and understand SQL queries.",
      messages,
    });

    return {
      success: true,
      text,
      messages: response.messages,
    };
  } catch (error) {
    console.error("Error generating chat response:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
