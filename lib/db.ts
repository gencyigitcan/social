import fs from 'fs/promises';
import path from 'path';
import { kv } from '@vercel/kv';

const DATA_FILE = path.join(process.cwd(), 'lib/data.json');
const KV_KEY = 'social_data';

export interface SocialPlatform {
    id: string;
    platform: string;
    title: string;
    active: boolean;
    status?: 'active' | 'coming_soon' | 'hidden';
    url: string;
    order: number;
    content?: string;
    defaultContent?: string;
}

export interface SiteSettings {
    siteName: string;
    avatar: string;
    description: string;
    coverImage?: string;
    theme: 'dark' | 'light';
}

export interface User {
    id: string;
    email: string;
    password: string;
}

export interface DbSchema {
    settings: SiteSettings;
    platforms: SocialPlatform[];
    users?: User[];
}

// In Vercel (or similar production envs), the project root is often read-only.
// We'll fallback to /tmp/data.json if we detect a write error, or just use /tmp/data.json by default if we want to be safe in those envs.
// However, /tmp is ephemeral. For Vercel production, you MUST use Vercel KV or another DB.
// Since the user is likely seeing this on a deployed instance without KV, we'll try to use /tmp as a fallback to at least make it work for a session.
const TMP_DATA_FILE = '/tmp/data.json';

// Helper to get the correct writable path
async function getWritableFilePath() {
    try {
        await fs.access(DATA_FILE, fs.constants.W_OK);
        return DATA_FILE;
    } catch {
        // If we can't write to the standard file (e.g. EROFS), use /tmp
        return TMP_DATA_FILE;
    }
}

export async function getDb(): Promise<DbSchema> {
    // Priority: Vercel KV > Local JSON File
    if (process.env.KV_REST_API_URL) {
        try {
            const data = await kv.get<DbSchema>(KV_KEY);
            if (data) return data;
        } catch (error) {
            console.error("Vercel KV Connection Error:", error);
            throw new Error("Database connection failed");
        }
    }

    // Try reading from the writable path first (e.g. /tmp/data.json) if it exists
    try {
        const filePath = await getWritableFilePath();
        // If using /tmp and it doesn't exist, we need to seed it from our read-only source
        if (filePath === TMP_DATA_FILE) {
            try {
                await fs.access(TMP_DATA_FILE);
            } catch {
                // TMP file doesn't exist, copy from source
                const initialData = await fs.readFile(DATA_FILE, 'utf-8');
                await fs.writeFile(TMP_DATA_FILE, initialData);
            }
        }

        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Local Database read error:", error);
        // Fallback for first-time read errors
        return {
            settings: {
                siteName: "Yiğitcan Genç",
                avatar: "",
                description: "",
                theme: "dark"
            },
            platforms: [],
            users: []
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
            throw new Error("Failed to save to Vercel KV");
        }
    }

    // Fallback to local file
    try {
        const filePath = await getWritableFilePath();
        await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
    } catch (e: any) {
        console.error("Local file write failed", e);
        throw new Error(`Failed to save to local storage: ${e.message}`);
    }
}
