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
    content?: string; // Custom text/description for the card
    defaultContent?: string; // To allow resetting
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
    password: string; // Plaintext for simplicity in this project scope, or simple hash
}

export interface DbSchema {
    settings: SiteSettings;
    platforms: SocialPlatform[];
    users?: User[];
}

export async function getDb(): Promise<DbSchema> {
    // Priority: Vercel KV > Local JSON File
    if (process.env.KV_REST_API_URL) {
        try {
            const data = await kv.get<DbSchema>(KV_KEY);
            if (data) return data;
            // If KV is empty (first run), fall through to seed execution from local file
        } catch (error) {
            console.error("Vercel KV Connection Error:", error);
            // CRITICAL: Do not fall back to local file on connection error, as it would reset security settings
            throw new Error("Database connection failed");
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
        }
    }

    // Fallback to local file (development or no KV link)
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2));
    } catch (e) {
        console.error("Local file write failed", e);
    }
}
