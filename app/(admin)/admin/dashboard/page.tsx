import { getDb } from "@/lib/db";
import { AdminDashboardClient } from "@/components/admin/dashboard-client";

export const revalidate = 0;

export default async function DashboardPage() {
    const db = await getDb();
    // Sort by order so admin sees the logical order
    const sorted = [...db.platforms].sort((a, b) => a.order - b.order);
    const isPersistent = !!process.env.KV_REST_API_URL;

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-10 border-b border-neutral-800 pb-6">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                    Kontrol Merkezi
                </h1>
                <p className="text-neutral-400 mt-2 text-lg">Dijital varlığınızı gerçek zamanlı yönetin.</p>
            </div>

            <AdminDashboardClient platforms={sorted} settings={db.settings} isPersistent={isPersistent} />
        </div>
    )
}
