import fs from 'fs/promises';
import path from 'path';
import { kv } from '@vercel/kv';

const DATA_FILE = path.join(process.cwd(), 'lib/data.json');
const KV_KEY = 'social_data';

export interface SocialPlatform {
    id: string;
    platform: string; // Expanded type to string to support many platforms
    title: string;
    active: boolean; // Deprecated in favor of status, kept for transition
    status?: 'active' | 'coming_soon' | 'hidden';
    url: string;
    order: number;
}

export interface SiteSettings {
    siteName: string;
    avatar: string;
    description: string;
    coverImage?: string;
    theme: 'dark' | 'light';
}

export interface DbSchema {
    settings: SiteSettings;
    platforms: SocialPlatform[];
}

export async function getDb(): Promise<DbSchema> {
    // Priority: Vercel KV > Local JSON File
    if (process.env.KV_REST_API_URL) {
        try {
            const data = await kv.get<DbSchema>(KV_KEY);
            if (data) return data;
            // If KV is empty, try to seed it with local JSON content?
            // For now, fall through to local file to "seed" the initial state conceptually
        } catch (error) {
            console.error("Vercel KV Connection Error:", error);
        }
    }

    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Local Database read error:", error);
        return {
            settings: {
                siteName: "Yiğitcan Genç",
                avatar: "",
                description: "",
                theme: "dark"
            },
            platforms: []
        };
    }
}

export async function updateDb(newData: DbSchema): Promise<void> {
    if (process.env.KV_REST_API_URL) {
        try {
            await kv.set(KV_KEY, newData);
            return;
        } catch (e) {
            console.error("Using Vercel KV but update failed", e);
        }
    }

    // Fallback to local file (development or no KV link)
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2));
    } catch (e) {
        console.error("Local file write failed", e);
    }
}
