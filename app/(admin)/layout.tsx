"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ExternalLink, LogOut } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // If we are on the login page, don't show the admin shell
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col">
            <header className="h-16 border-b border-neutral-800 flex items-center justify-between px-6 bg-neutral-900/50 backdrop-blur sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold">A</div>
                    <span className="font-semibold tracking-tight">Antigravity</span>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        target="_blank"
                        className="text-sm text-neutral-400 hover:text-white flex items-center gap-2 transition-colors"
                    >
                        <ExternalLink size={16} />
                        <span className="hidden sm:inline">View Site</span>
                    </Link>
                    <button
                        onClick={async () => {
                            await logoutAction();
                            window.location.href = "/admin/login";
                        }}
                        className="text-sm text-red-400 hover:text-red-300 flex items-center gap-2 transition-colors"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </header>

            <div className="flex-1 container mx-auto p-4 sm:p-8 max-w-5xl">
                {children}
            </div>
        </div>
    );
}
