import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Always fetch fresh data

export async function GET() {
    try {
        const db = await getDb();

        // Sort logic to match frontend
        const sortedPlatforms = db.platforms.sort((a, b) => a.order - b.order);

        return NextResponse.json({
            settings: db.settings,
            platforms: sortedPlatforms
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch config" }, { status: 500 });
    }
}
