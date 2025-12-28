"use server";

import { getDb, updateDb, User } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const ADMIN_SESSION_COOKIE = "admin_session";

export async function checkHasUsersAction() {
    try {
        const db = await getDb();
        // Explicitly check if users array exists
        const hasUsers = Array.isArray(db.users) && db.users.length > 0;
        return { hasUsers, success: true };
    } catch (e) {
        console.error("Auth Check Error:", e);
        return { hasUsers: false, success: false, error: "Database connection failed" };
    }
}

export async function loginAction(email: string, password: string) {
    try {
        const db = await getDb();

        if (!db.users || !Array.isArray(db.users)) {
            return { success: false, error: "System error: User database unavailable" };
        }

        // Case-insensitive email check
        const user = db.users.find(u =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );

        if (user) {
            // Set session
            (await cookies()).set(ADMIN_SESSION_COOKIE, "true", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });
            return { success: true };
        }

        return { success: false, error: "Invalid email or password" };
    } catch (error) {
        console.error("Login Error:", error);
        return { success: false, error: "Authentication failed due to system error" };
    }
}

export async function createFirstUserAction(email: string, password: string) {
    try {
        const db = await getDb();

        // Double check prevention
        if (db.users && db.users.length > 0) {
            return { success: false, error: "Admin account already exists. Please login." };
        }

        const newUser: User = {
            id: randomUUID(),
            email: email.toLowerCase(),
            password // Ideally we should hash this
        };

        db.users = [newUser];
        await updateDb(db);

        // Auto login
        (await cookies()).set(ADMIN_SESSION_COOKIE, "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7
        });

        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to create account" };
    }
}

export async function logoutAction() {
    (await cookies()).delete(ADMIN_SESSION_COOKIE);
    return { success: true };
}
