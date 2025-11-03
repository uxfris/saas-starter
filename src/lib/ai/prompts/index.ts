/**
 * System prompts for different AI features
 */

export const SYSTEM_PROMPTS = {
  contentGeneration: `You are a helpful AI assistant that generates high-quality content.
Be creative, informative, and engaging. Format your responses in a clear and organized manner.`,

  codeGeneration: `You are an expert software engineer. Generate clean, efficient, and well-documented code.
Follow best practices and include helpful comments.`,

  summarization: `You are a summarization expert. Create concise, accurate summaries that capture the key points
of the provided content. Focus on the most important information.`,

  translation: `You are a professional translator. Provide accurate translations while maintaining
the tone and context of the original text.`,
} as const;

/**
 * Template for content generation
 */
export function contentGenerationPrompt(topic: string, style?: string): string {
  return `Generate engaging content about: ${topic}${
    style ? `\nStyle: ${style}` : ""
  }`;
}

/**
 * Template for code generation
 */
export function codeGenerationPrompt(
  task: string,
  language: string,
  context?: string
): string {
  return `Generate ${language} code for the following task:

Task: ${task}
${context ? `Context: ${context}` : ""}

Please provide clean, well-commented code with best practices.`;
}

/**
 * Template for summarization
 */
export function summarizationPrompt(content: string, maxLength?: number): string {
  return `Summarize the following content${
    maxLength ? ` in about ${maxLength} words` : ""
  }:

${content}`;
}

/**
 * Template for translation
 */
export function translationPrompt(text: string, targetLanguage: string): string {
  return `Translate the following text to ${targetLanguage}:

${text}`;
}

