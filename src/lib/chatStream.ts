import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";

// Replace this with your actual OpenAI API key
// You can get one from: https://platform.openai.com/api-keys
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openai = createOpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function streamChatResponse(
  messages: ModelMessage[],
  queryContext?: { title: string; sql: string }
) {
  // Build system prompt with query context if available
  let systemPrompt =
    "You are a helpful SQL assistant. Help users write and understand SQL queries.";

  if (queryContext) {
    systemPrompt += `\n\nCurrent Query Context:
- Query Title: "${queryContext.title}"
- Current SQL Query:
\`\`\`sql
${queryContext.sql}
\`\`\`

Use this context to provide more relevant and specific assistance. You can reference the current query, suggest improvements, explain parts of it, or help build upon it.`;
  }

  const result = await streamText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    messages,
  });

  return result.toTextStreamResponse();
}
