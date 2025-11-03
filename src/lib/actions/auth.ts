"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { handleServerAction } from "@/lib/utils/error";
import { signInSchema, signUpSchema, resetPasswordSchema } from "@/lib/validation/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Sign in with email and password
 */
export async function signIn(formData: FormData) {
  return handleServerAction(async () => {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validatedData = signInSchema.parse(rawData);

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(validatedData);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
  });
}

/**
 * Sign up with email and password
 */
export async function signUp(formData: FormData) {
  return handleServerAction(async () => {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
    };

    const validatedData = signUpSchema.parse(rawData);

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          name: validatedData.name,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.user) {
      // Create user in database
      await prisma.user.create({
        data: {
          id: data.user.id,
          email: validatedData.email,
          name: validatedData.name,
        },
      });
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
  });
}

/**
 * Sign out
 */
export async function signOut() {
  return handleServerAction(async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();

    revalidatePath("/", "layout");
    redirect("/");
  });
}

/**
 * Send password reset email
 */
export async function resetPassword(formData: FormData) {
  return handleServerAction(async () => {
    const rawData = {
      email: formData.get("email") as string,
    };

    const validatedData = resetPasswordSchema.parse(rawData);

    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(validatedData.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  });
}

/**
 * Update password
 */
export async function updatePassword(currentPassword: string, newPassword: string) {
  return handleServerAction(async () => {
    const supabase = await createClient();

    // Verify current password by attempting to sign in
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      throw new Error("User not found");
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (signInError) {
      throw new Error("Current password is incorrect");
    }

    // Update password
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  });
}

