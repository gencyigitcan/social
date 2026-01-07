"use server";

import { getDb, updateDb, SiteSettings } from "@/lib/db";
import { revalidatePath } from "next/cache";

const DEFAULT_SETTINGS: SiteSettings = {
    siteName: "Yiğitcan Genç",
    description: "Digital Creator & Developer",
    avatar: "https://github.com/shadcn.png", // Stand-in default
    theme: "dark",
    coverImage: "" // Empty as per request to remove it
};

export async function updateSettings(newSettings: Partial<SiteSettings>) {
    try {
        const db = await getDb();

        // Merge existing settings with new updates
        const updatedSettings = {
            ...db.settings,
            ...newSettings
        };

        // Update DB
        await updateDb({
            ...db,
            settings: updatedSettings
        });

        revalidatePath("/", "layout");
        revalidatePath("/admin/dashboard", "layout");

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message || "Failed to update settings" };
    }
}

export async function resetSettings() {
    try {
        const db = await getDb();

        await updateDb({
            ...db,
            settings: DEFAULT_SETTINGS
        });

        revalidatePath("/", "layout");
        revalidatePath("/admin/dashboard", "layout");

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message || "Failed to reset settings" };
    }
}
