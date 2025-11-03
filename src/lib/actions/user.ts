"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { handleServerAction } from "@/lib/utils/error";
import { updateUserSchema } from "@/lib/validation/user";
import { revalidatePath } from "next/cache";

/**
 * Get current user profile
 */
export async function getUserProfile() {
  return handleServerAction(async () => {
    const authUser = await getCurrentUser();
    if (!authUser) {
      throw new Error("Not authenticated");
    }

    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
        subscription: {
          select: {
            status: true,
            currentPeriodEnd: true,
            stripePriceId: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  });
}

/**
 * Update user profile
 */
export async function updateUserProfile(formData: FormData) {
  return handleServerAction(async () => {
    const authUser = await getCurrentUser();
    if (!authUser) {
      throw new Error("Not authenticated");
    }

    const rawData = {
      name: formData.get("name") as string,
      avatarUrl: formData.get("avatarUrl") as string,
    };

    const validatedData = updateUserSchema.parse(rawData);

    const user = await prisma.user.update({
      where: { id: authUser.id },
      data: validatedData,
    });

    revalidatePath("/dashboard/settings");
    return user;
  });
}

/**
 * Get user usage statistics
 */
export async function getUserUsage() {
  return handleServerAction(async () => {
    const authUser = await getCurrentUser();
    if (!authUser) {
      throw new Error("Not authenticated");
    }

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const usage = await prisma.usage.aggregate({
      where: {
        userId: authUser.id,
        createdAt: {
          gte: startOfMonth,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return {
      totalUsage: usage._sum.amount || 0,
      period: "month",
    };
  });
}

/**
 * Delete user account
 */
export async function deleteUserAccount() {
  return handleServerAction(async () => {
    const authUser = await getCurrentUser();
    if (!authUser) {
      throw new Error("Not authenticated");
    }

    // Delete user from database (cascades to related records)
    await prisma.user.delete({
      where: { id: authUser.id },
    });

    // Delete from Supabase Auth
    // Note: This requires admin privileges
    // await supabase.auth.admin.deleteUser(authUser.id);

    revalidatePath("/", "layout");
    return { success: true };
  });
}

