import { prisma } from "@/lib/db";

/**
 * Track AI usage for a user
 */
export async function trackUsage(
  userId: string,
  tokens: number,
  description?: string
): Promise<void> {
  await prisma.usage.create({
    data: {
      userId,
      type: "AI_GENERATION",
      amount: tokens,
      description,
    },
  });
}

/**
 * Get user's AI usage for the current month
 */
export async function getMonthlyUsage(userId: string): Promise<number> {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const usage = await prisma.usage.aggregate({
    where: {
      userId,
      type: "AI_GENERATION",
      createdAt: {
        gte: startOfMonth,
      },
    },
    _sum: {
      amount: true,
    },
  });

  return usage._sum.amount || 0;
}

/**
 * Check if user has exceeded their monthly limit
 */
export async function hasExceededLimit(
  userId: string,
  limit: number
): Promise<boolean> {
  const usage = await getMonthlyUsage(userId);
  return usage >= limit;
}

/**
 * Estimate token count for a text string
 * Rough estimation: 1 token ≈ 4 characters
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Save generated content to database
 */
export async function saveGeneratedContent(
  userId: string,
  prompt: string,
  content: string,
  model: string,
  tokens: number
): Promise<void> {
  await prisma.generatedContent.create({
    data: {
      userId,
      prompt,
      content,
      model,
      tokens,
    },
  });
}

