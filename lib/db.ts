import fs from 'fs/promises';
import path from 'path';
import { kv } from '@vercel/kv';
import { createClient } from '@libsql/client';

const DATA_FILE = path.join(process.cwd(), 'lib/data.json');
const KV_KEY = 'social_data';

export interface SocialPlatform {
    id: string;
    platform: string;
    title: string;
    active: boolean;
    status: 'active' | 'coming_soon' | 'hidden';
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

// Default/Initial Data Loader
async function getInitialData(): Promise<DbSchema> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        console.error("Failed to load initial data.json", e);
        return {
            settings: { siteName: "User", avatar: "", description: "", theme: "dark" },
            platforms: [],
            users: []
        };
    }
}

// --- TURSO CLIENT HELPER ---
function getTursoClient() {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    if (url && authToken) {
        return createClient({ url, authToken });
    }
    return null;
}

export async function getDb(): Promise<DbSchema> {
    // 1. TURSO (Priority 1)
    const turso = getTursoClient();
    if (turso) {
        try {
            // Attempt to read from 'app_data' table
            // We use a simple Key-Value structure: table 'storage', col 'key' (primary), col 'value'
            // Ensure table exists (lazy init)
            await turso.execute(`
                CREATE TABLE IF NOT EXISTS storage (
                    key TEXT PRIMARY KEY,
                    value TEXT
                )
            `);

            const result = await turso.execute({
                sql: "SELECT value FROM storage WHERE key = ?",
                args: [KV_KEY]
            });

            if (result.rows.length > 0) {
                const jsonStr = result.rows[0].value as string;
                return JSON.parse(jsonStr);
            } else {
                // First time in Turso: Seed from local file
                console.log("Turso empty, seeding from initial data...");
                const initialData = await getInitialData();
                await turso.execute({
                    sql: "INSERT INTO storage (key, value) VALUES (?, ?)",
                    args: [KV_KEY, JSON.stringify(initialData)]
                });
                return initialData;
            }
        } catch (e) {
            console.error("Turso Error:", e);
            // Fallthrough to next method or throw?
            // If Turso creds are provided but fail, we should probably warn but maybe fallback or throw.
            // Let's attempt fallback to KV just in case.
        }
    }

    // 2. VERCEL KV (Priority 2)
    if (process.env.KV_REST_API_URL) {
        try {
            const data = await kv.get<DbSchema>(KV_KEY);
            if (data) return data;

            // First time KV
            console.log("KV empty, seeding from local data...");
            const initialData = await getInitialData();
            await kv.set(KV_KEY, initialData);
            return initialData;
        } catch (error) {
            console.error("Vercel KV Connection Error:", error);
        }
    }

    // 3. LOCAL FILE (Fallback / Local Dev)
    // Only used if no cloud options are configured.
    console.warn("Using LOCAL FILE storage. Data will be lost on deployment reset.");
    const tmpFile = '/tmp/data.json';
    try {
        await fs.access(tmpFile);
        const data = await fs.readFile(tmpFile, 'utf-8');
        return JSON.parse(data);
    } catch {
        // If /tmp missing, copy from source
        const initialUtil = await getInitialData();
        await fs.writeFile(tmpFile, JSON.stringify(initialUtil));
        return initialUtil;
    }
}

export async function updateDb(newData: DbSchema): Promise<void> {
    // 1. TURSO
    const turso = getTursoClient();
    if (turso) {
        try {
            await turso.execute({
                sql: "INSERT INTO storage (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?",
                args: [KV_KEY, JSON.stringify(newData), JSON.stringify(newData)]
            });
            return;
        } catch (e) {
            console.error("Failed to save to Turso", e);
            throw new Error("Database save failed (Turso)");
        }
    }

    // 2. VERCEL KV
    if (process.env.KV_REST_API_URL) {
        try {
            await kv.set(KV_KEY, newData);
            return;
        } catch (e) {
            console.error("Failed to save to Vercel KV", e);
            throw new Error("Database save failed (KV)");
        }
    }

    // 3. LOCAL
    try {
        const tmpFile = '/tmp/data.json';
        await fs.writeFile(tmpFile, JSON.stringify(newData, null, 2));
    } catch (e: any) {
        console.error("Local file write failed", e);
        throw new Error(`Failed to save to local storage: ${e.message}`);
    }
}
