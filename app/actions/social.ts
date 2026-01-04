"use server";

import { getDb, updateDb, SocialPlatform } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updatePlatformAction(platform: SocialPlatform) {
    try {
        const db = await getDb();
        const index = db.platforms.findIndex(p => p.id === platform.id);

        if (index !== -1) {
            db.platforms[index] = platform;
            await updateDb(db);
            revalidatePath("/");
            revalidatePath("/admin/dashboard");
            return { success: true };
        }
        return { success: false, error: "Platform not found" };
    } catch (error: any) {
        console.error("Update error:", error);
        return { success: false, error: error.message || "Database error" };
    }
}

export async function togglePlatformAction(id: string, active: boolean) {
    try {
        const db = await getDb();
        const platform = db.platforms.find(p => p.id === id);
        if (platform) {
            platform.active = active;
            await updateDb(db);
            revalidatePath("/");
            revalidatePath("/admin/dashboard");
            return { success: true };
        }
        return { success: false, error: "Platform not found" };
    } catch (error: any) {
        return { success: false, error: error.message || "Database error" };
    }
}

export async function reorderPlatformsAction(items: { id: string; order: number }[]) {
    try {
        const db = await getDb();

        // Update order for each item in the list
        items.forEach(item => {
            const platform = db.platforms.find(p => p.id === item.id);
            if (platform) {
                platform.order = item.order;
            }
        });

        await updateDb(db);
        revalidatePath("/");
        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error: any) {
        console.error("Reorder error:", error);
        return { success: false, error: error.message || "Database error" };
    }
}
