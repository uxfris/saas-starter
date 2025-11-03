import { createClient } from "@/lib/supabase/server";
import { cache } from "react";
import type { User } from "@supabase/supabase-js";

/**
 * Get the current authenticated user
 * Cached per request for performance
 */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

/**
 * Get the current session
 */
export async function getSession() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

/**
 * Check if user has an active subscription
 */
export async function hasActiveSubscription(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  // TODO: Implement subscription check with Prisma
  // const subscription = await prisma.subscription.findUnique({
  //   where: { userId: user.id },
  // });
  // return subscription?.status === "ACTIVE";

  return false;
}

