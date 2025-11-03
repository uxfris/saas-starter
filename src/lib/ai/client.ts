import OpenAI from "openai";
import { env } from "@/env.mjs";

export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

/**
 * Default OpenAI model configuration
 */
export const DEFAULT_MODEL = "gpt-4-turbo-preview";
export const DEFAULT_MAX_TOKENS = 2000;
export const DEFAULT_TEMPERATURE = 0.7;

/**
 * Generate text completion using OpenAI
 */
export async function generateCompletion(
  prompt: string,
  options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    systemPrompt?: string;
  }
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: options?.model || DEFAULT_MODEL,
    messages: [
      ...(options?.systemPrompt
        ? [{ role: "system" as const, content: options.systemPrompt }]
        : []),
      { role: "user" as const, content: prompt },
    ],
    max_tokens: options?.maxTokens || DEFAULT_MAX_TOKENS,
    temperature: options?.temperature || DEFAULT_TEMPERATURE,
  });

  return response.choices[0]?.message?.content || "";
}

/**
 * Generate streaming completion using OpenAI
 */
export async function* generateStreamingCompletion(
  prompt: string,
  options?: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    systemPrompt?: string;
  }
): AsyncGenerator<string> {
  const stream = await openai.chat.completions.create({
    model: options?.model || DEFAULT_MODEL,
    messages: [
      ...(options?.systemPrompt
        ? [{ role: "system" as const, content: options.systemPrompt }]
        : []),
      { role: "user" as const, content: prompt },
    ],
    max_tokens: options?.maxTokens || DEFAULT_MAX_TOKENS,
    temperature: options?.temperature || DEFAULT_TEMPERATURE,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield content;
    }
  }
}
