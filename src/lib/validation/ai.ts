import { z } from "zod";

/**
 * AI generation validation schemas
 */

export const generateContentSchema = z.object({
  prompt: z.string().min(1, "Prompt is required").max(5000),
  model: z.string().optional(),
  maxTokens: z.number().min(1).max(4000).optional(),
  temperature: z.number().min(0).max(2).optional(),
  systemPrompt: z.string().optional(),
});

export const generateCodeSchema = z.object({
  task: z.string().min(1, "Task description is required").max(2000),
  language: z.string().min(1, "Programming language is required"),
  context: z.string().max(3000).optional(),
});

export const summarizeSchema = z.object({
  content: z.string().min(1, "Content is required").max(10000),
  maxLength: z.number().min(50).max(1000).optional(),
});

export const translateSchema = z.object({
  text: z.string().min(1, "Text is required").max(5000),
  targetLanguage: z.string().min(1, "Target language is required"),
});

export type GenerateContentInput = z.infer<typeof generateContentSchema>;
export type GenerateCodeInput = z.infer<typeof generateCodeSchema>;
export type SummarizeInput = z.infer<typeof summarizeSchema>;
export type TranslateInput = z.infer<typeof translateSchema>;

