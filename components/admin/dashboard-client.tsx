"use client";

import { useState } from "react";
import { SocialPlatform, SiteSettings } from "@/lib/db";
import { PlatformManager } from "@/components/admin/platform-manager";
import { SettingsManager } from "@/components/admin/settings-manager";
import { LayoutGrid, UserCircle } from "lucide-react";

export function AdminDashboardClient({
    platforms,
    settings
}: {
    platforms: SocialPlatform[],
    settings: SiteSettings
}) {
    const [activeTab, setActiveTab] = useState<'platforms' | 'profile'>('platforms');

    return (
        <div className="space-y-8">
            {/* Tabs */}
            <div className="flex p-1 bg-neutral-800/50 rounded-xl w-fit border border-neutral-800 backdrop-blur-sm">
                <button
                    onClick={() => setActiveTab('platforms')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'platforms'
                            ? 'bg-neutral-800 shadow-sm text-white'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                        }`}
                >
                    <LayoutGrid size={16} />
                    Platformlar
                </button>
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'profile'
                            ? 'bg-neutral-800 shadow-sm text-white'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                        }`}
                >
                    <UserCircle size={16} />
                    Profil Ayarları
                </button>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {activeTab === 'platforms' ? (
                    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-white">Bağlantılar</h2>
                            <p className="text-neutral-400 text-sm">Sosyal medya hesaplarınızı ve bağlantılarınızı düzenleyin.</p>
                        </div>
                        <PlatformManager initialPlatforms={platforms} />
                    </div>
                ) : (
                    <SettingsManager initialSettings={settings} />
                )}
            </div>
        </div>
    );
}
