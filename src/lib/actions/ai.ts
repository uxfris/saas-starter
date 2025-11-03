"use server";

import { getCurrentUser } from "@/lib/auth";
import { handleServerAction } from "@/lib/utils/error";
import { generateCompletion } from "@/lib/ai/client";
import {
  trackUsage,
  hasExceededLimit,
  estimateTokens,
  saveGeneratedContent,
} from "@/lib/ai/utils";
import {
  SYSTEM_PROMPTS,
  contentGenerationPrompt,
  codeGenerationPrompt,
  summarizationPrompt,
  translationPrompt,
} from "@/lib/ai/prompts";
import {
  generateContentSchema,
  generateCodeSchema,
  summarizeSchema,
  translateSchema,
} from "@/lib/validation/ai";

// Usage limits (adjust based on your pricing tiers)
const FREE_TIER_LIMIT = 10000; // tokens per month
const PRO_TIER_LIMIT = 100000; // tokens per month

/**
 * Generate content using AI
 */
export async function generateContent(formData: FormData) {
  return handleServerAction(async () => {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const rawData = {
      prompt: formData.get("prompt") as string,
      model: formData.get("model") as string | undefined,
      maxTokens: formData.get("maxTokens")
        ? Number(formData.get("maxTokens"))
        : undefined,
      temperature: formData.get("temperature")
        ? Number(formData.get("temperature"))
        : undefined,
    };

    const validatedData = generateContentSchema.parse(rawData);

    // Check usage limits
    const exceeded = await hasExceededLimit(user.id, FREE_TIER_LIMIT);
    if (exceeded) {
      throw new Error("Monthly usage limit exceeded. Please upgrade your plan.");
    }

    // Generate content
    const content = await generateCompletion(validatedData.prompt, {
      model: validatedData.model,
      maxTokens: validatedData.maxTokens,
      temperature: validatedData.temperature,
      systemPrompt: SYSTEM_PROMPTS.contentGeneration,
    });

    // Track usage
    const tokens = estimateTokens(validatedData.prompt + content);
    await trackUsage(user.id, tokens, "Content generation");
    await saveGeneratedContent(
      user.id,
      validatedData.prompt,
      content,
      validatedData.model || "default",
      tokens
    );

    return { content, tokens };
  });
}

/**
 * Generate code using AI
 */
export async function generateCode(task: string, language: string, context?: string) {
  return handleServerAction(async () => {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const validatedData = generateCodeSchema.parse({ task, language, context });

    // Check usage limits
    const exceeded = await hasExceededLimit(user.id, FREE_TIER_LIMIT);
    if (exceeded) {
      throw new Error("Monthly usage limit exceeded. Please upgrade your plan.");
    }

    const prompt = codeGenerationPrompt(
      validatedData.task,
      validatedData.language,
      validatedData.context
    );

    const code = await generateCompletion(prompt, {
      systemPrompt: SYSTEM_PROMPTS.codeGeneration,
    });

    const tokens = estimateTokens(prompt + code);
    await trackUsage(user.id, tokens, "Code generation");

    return { code, tokens };
  });
}

/**
 * Summarize content using AI
 */
export async function summarizeContent(content: string, maxLength?: number) {
  return handleServerAction(async () => {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const validatedData = summarizeSchema.parse({ content, maxLength });

    const prompt = summarizationPrompt(validatedData.content, validatedData.maxLength);

    const summary = await generateCompletion(prompt, {
      systemPrompt: SYSTEM_PROMPTS.summarization,
      maxTokens: validatedData.maxLength ? validatedData.maxLength * 2 : 500,
    });

    const tokens = estimateTokens(prompt + summary);
    await trackUsage(user.id, tokens, "Summarization");

    return { summary, tokens };
  });
}

/**
 * Translate text using AI
 */
export async function translateText(text: string, targetLanguage: string) {
  return handleServerAction(async () => {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const validatedData = translateSchema.parse({ text, targetLanguage });

    const prompt = translationPrompt(validatedData.text, validatedData.targetLanguage);

    const translation = await generateCompletion(prompt, {
      systemPrompt: SYSTEM_PROMPTS.translation,
    });

    const tokens = estimateTokens(prompt + translation);
    await trackUsage(user.id, tokens, "Translation");

    return { translation, tokens };
  });
}

