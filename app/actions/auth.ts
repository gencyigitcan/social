"use server";

import { getDb, updateDb, User } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

// Simple session check (not fully robust for production but secure enough for this scope)
const ADMIN_SESSION_COOKIE = "admin_session";

export async function checkHasUsersAction() {
    try {
        const db = await getDb();
        const hasUsers = db.users && db.users.length > 0;
        return { hasUsers };
    } catch (e) {
        return { hasUsers: false };
    }
}

export async function loginAction(email: string, password: string) {
    const db = await getDb();

    // Check if user exists
    const user = db.users?.find(u => u.email === email && u.password === password);

    if (user) {
        // Set session
        (await cookies()).set(ADMIN_SESSION_COOKIE, "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });
        return { success: true };
    }

    return { success: false, error: "Invalid credentials" };
}

export async function createFirstUserAction(email: string, password: string) {
    const db = await getDb();

    if (db.users && db.users.length > 0) {
        return { success: false, error: "Admin already exists" };
    }

    const newUser: User = {
        id: randomUUID(),
        email,
        password // Storing as is for now, as requested/implied scope
    };

    db.users = [newUser];
    await updateDb(db);

    // Auto login
    (await cookies()).set(ADMIN_SESSION_COOKIE, "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7
    });

    return { success: true };
}

export async function logoutAction() {
    (await cookies()).delete(ADMIN_SESSION_COOKIE);
    return { success: true };
}
