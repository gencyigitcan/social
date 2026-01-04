"use client";

import { useState } from "react";
import { SocialPlatform, SiteSettings } from "@/lib/db";
import { PlatformManager } from "@/components/admin/platform-manager";
import { SettingsManager } from "@/components/admin/settings-manager";
import { motion, AnimatePresence } from "framer-motion";

interface AdminDashboardClientProps {
    platforms: SocialPlatform[];
    settings: SiteSettings;
    isPersistent?: boolean;
}

export function AdminDashboardClient({ platforms, settings, isPersistent }: AdminDashboardClientProps) {
    const [activeTab, setActiveTab] = useState<'platforms' | 'profile'>('platforms');

    return (
        <div className="space-y-6">
            {/* Tabs & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-1">
                <div className="flex gap-6">
                    <button
                        onClick={() => setActiveTab('platforms')}
                        className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'platforms' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'}`}
                    >
                        Platformlar
                        {activeTab === 'platforms' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'profile' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'}`}
                    >
                        Profil Ayarları
                        {activeTab === 'profile' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
                        )}
                    </button>
                </div>

                {/* Storage Indicator */}
                <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-neutral-800/50 border border-neutral-800 self-start sm:self-auto">
                    <div className={`w-2 h-2 rounded-full ${isPersistent ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-blue-500'}`} />
                    <span className="text-neutral-400 font-medium tracking-tight">
                        {isPersistent ? 'Cloud Database' : 'Local Database'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'platforms' ? (
                        <PlatformManager initialPlatforms={platforms} />
                    ) : (
                        <SettingsManager initialSettings={settings} />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
