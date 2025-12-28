import { getDb } from "@/lib/db";
import { PlatformManager } from "@/components/admin/platform-manager";

export const revalidate = 0;

export default async function DashboardPage() {
    const db = await getDb();
    // Sort by order so admin sees the logical order
    const sorted = db.platforms.sort((a, b) => a.order - b.order);

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-10 border-b border-neutral-800 pb-6">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    Control Center
                </h1>
                <p className="text-neutral-400 mt-2 text-lg">Manage your digital presence in real-time.</p>
            </div>

            <PlatformManager initialPlatforms={sorted} />
        </div>
    )
}
