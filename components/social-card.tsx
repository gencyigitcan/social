"use client";

import { motion } from "framer-motion";
import {
    Instagram,
    Linkedin,
    Twitter,
    Youtube,
    Globe,
    Link as LinkIcon,
    Heart,
    MessageCircle,
    Bookmark,
    Send,
    MoreHorizontal,
    ThumbsUp,
    MessageSquare,
    Share2,
    Repeat,
    BarChart2,
    Github,
    Music,
    Video,
    Mail,
    Phone,
    ShoppingBag,
    Music2,
    Twitch,
} from "lucide-react";
import { SocialPlatform, SiteSettings } from "@/lib/db";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Helper for formatting large numbers
const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(num);
};

// --- INSTAGRAM CARD DESIGN ---
function InstagramCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-white text-black flex flex-col font-sans select-none">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white p-[2px] overflow-hidden relative">
                            {settings.avatar ? (
                                <Image src={settings.avatar} alt="User" fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full bg-neutral-200" />
                            )}
                        </div>
                    </div>
                    <span className="text-xs font-semibold lowercase">{platform.title.toLowerCase().replace(/\s/g, '')}</span>
                </div>
                <MoreHorizontal size={16} />
            </div>

            {/* Main Content (Gradient as Image) */}
            <div className="flex-1 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] relative">
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                    <Instagram size={64} />
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-4">
                        <Heart size={20} className="hover:text-red-500 transition-colors" />
                        <MessageCircle size={20} />
                        <Send size={20} />
                    </div>
                    <Bookmark size={20} />
                </div>
                <p className="text-xs font-semibold mb-1">2,342 likes</p>
                <p className="text-xs">
                    <span className="font-semibold mr-1">{platform.title.toLowerCase().replace(/\s/g, '')}</span>
                    <span>Check out my latest updates! 📸 #life #design</span>
                </p>
                <p className="text-[10px] text-neutral-400 mt-1 uppercase">2 hours ago</p>
            </div>
        </div>
    );
}

// --- LINKEDIN CARD DESIGN ---
function LinkedinCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-white text-black flex flex-col font-sans select-none border border-neutral-200">
            {/* Header */}
            <div className="p-4 flex gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {settings.avatar ? (
                        <Image src={settings.avatar} alt="User" fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full bg-neutral-300" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                        <h3 className="text-xs font-bold truncate">{settings.siteName}</h3>
                        <span className="text-[10px] text-neutral-500">• 1st</span>
                    </div>
                    <p className="text-[10px] text-neutral-500 truncate">{settings.description || "Digital Creator"}</p>
                    <div className="flex items-center gap-1 text-[10px] text-neutral-500">
                        <span>1d • </span>
                        <Globe size={10} />
                    </div>
                </div>
                <div className="text-blue-600 font-semibold text-xs flex items-center gap-1 self-start">
                    + Follow
                </div>
            </div>

            {/* Content Text */}
            <div className="px-4 pb-2 text-xs leading-relaxed line-clamp-3">
                Excited to share my professional journey! Connect with me to see what I'm building next. 🚀 #development #career
            </div>

            {/* Content Image/Media */}
            <div className="flex-1 bg-neutral-100 relative mt-1 border-y border-neutral-100">
                {/* Using platform color as placeholder media */}
                <div className="absolute inset-0 bg-[#0077b5]/10 flex items-center justify-center">
                    <Linkedin size={48} className="text-[#0077b5]/50" />
                </div>
            </div>

            {/* Likes Count */}
            <div className="px-4 py-2 flex items-center gap-1 text-[10px] text-neutral-500 border-b border-neutral-100">
                <div className="bg-blue-100 p-0.5 rounded-full"><ThumbsUp size={8} className="text-blue-600 fill-blue-600" /></div>
                <span>1,024 comments • 42 reposts</span>
            </div>

            {/* Action Bar */}
            <div className="grid grid-cols-4 py-2 px-1">
                <button className="flex flex-col items-center gap-1 text-neutral-500 hover:bg-neutral-50 rounded py-1">
                    <ThumbsUp size={16} />
                    <span className="text-[9px] font-semibold">Like</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-neutral-500 hover:bg-neutral-50 rounded py-1">
                    <MessageSquare size={16} />
                    <span className="text-[9px] font-semibold">Comment</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-neutral-500 hover:bg-neutral-50 rounded py-1">
                    <Repeat size={16} />
                    <span className="text-[9px] font-semibold">Repost</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-neutral-500 hover:bg-neutral-50 rounded py-1">
                    <Send size={16} />
                    <span className="text-[9px] font-semibold">Send</span>
                </button>
            </div>
        </div>
    );
}

// --- X (TWITTER) DESIGN ---
function XCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-black text-white flex flex-col font-sans select-none border border-neutral-800">
            {/* User Row */}
            <div className="flex gap-2 p-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-neutral-800">
                    {settings.avatar && <Image src={settings.avatar} alt="User" fill className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-sm">
                        <span className="font-bold truncate">{settings.siteName}</span>
                        <span className="text-neutral-500 truncate">@{platform.title.toLowerCase().replace(/\s/g, '')}</span>
                        <span className="text-neutral-500">· 5h</span>
                    </div>
                    <p className="text-sm mt-0.5 whitespace-pre-wrap">Just shipped a new update! 🚢 Check out the link below. #buildinginpublic</p>
                </div>
                <MoreHorizontal size={14} className="text-neutral-500" />
            </div>

            {/* Content Box */}
            <div className="mx-4 mb-2 rounded-xl border border-neutral-800 overflow-hidden bg-neutral-900/50 flex-1 relative">
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                    <Twitter size={48} />
                </div>
            </div>

            {/* Metrics */}
            <div className="px-4 py-3 flex justify-between text-neutral-500 text-xs border-t border-neutral-900">
                <div className="flex items-center gap-1 hover:text-blue-400 transition-colors"><MessageCircle size={14} /> <span>24</span></div>
                <div className="flex items-center gap-1 hover:text-green-400 transition-colors"><Repeat size={14} /> <span>12</span></div>
                <div className="flex items-center gap-1 hover:text-pink-400 transition-colors"><Heart size={14} /> <span>145</span></div>
                <div className="flex items-center gap-1 hover:text-blue-400 transition-colors"><BarChart2 size={14} /> <span>2.4k</span></div>
            </div>
        </div>
    )
}

// --- GENERIC CARD ---
function GenericCard({ platform, config }: { platform: SocialPlatform, config: any }) {
    const Icon = config.icon;
    return (
        <div className={cn(
            "relative w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300",
            config.style
        )}>
            <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300" />

            <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div className="self-end opacity-80">
                    <Icon size={32} />
                </div>

                <div>
                    <h3 className="text-2xl font-bold tracking-tight">{platform.title || config.label}</h3>
                    <p className="text-sm opacity-80 mt-1">Tap to visit</p>
                </div>
            </div>
        </div>
    )
}


const platformConfig: Record<string, {
    icon: any;
    style: string;
    label: string;
}> = {
    instagram: { icon: Instagram, style: "", label: "Instagram" },
    linkedin: { icon: Linkedin, style: "", label: "LinkedIn" },
    x: { icon: Twitter, style: "", label: "X" },
    youtube: { icon: Youtube, style: "bg-[#ff0000] text-white", label: "YouTube" },
    website: { icon: Globe, style: "bg-emerald-600 text-white", label: "Website" },
    tiktok: { icon: Video, style: "bg-black text-white border border-neutral-800", label: "TikTok" }, // Lucide doesn't have TikTok
    github: { icon: Github, style: "bg-[#181717] text-white", label: "GitHub" },
    behance: { icon: ShoppingBag, style: "bg-[#1769ff] text-white", label: "Behance" }, // Placeholder
    dribbble: { icon: Globe, style: "bg-[#ea4c89] text-white", label: "Dribbble" },
    spotify: { icon: Music, style: "bg-[#1db954] text-white", label: "Spotify" },
    twitch: { icon: Twitch, style: "bg-[#9146ff] text-white", label: "Twitch" },
    discord: { icon: MessageCircle, style: "bg-[#5865F2] text-white", label: "Discord" },
    whatsapp: { icon: Phone, style: "bg-[#25D366] text-white", label: "WhatsApp" },
    email: { icon: Mail, style: "bg-neutral-600 text-white", label: "Email" },
    other: { icon: LinkIcon, style: "bg-neutral-800 text-white", label: "Link" }
};

export function SocialCard({ platform, userSettings }: { platform: SocialPlatform, userSettings?: SiteSettings }) {
    const config = platformConfig[platform.platform] || platformConfig.other;
    const Icon = config.icon;

    // Use a default settings object if one isn't provided (e.g. initial load or error case)
    const settings = userSettings || {
        siteName: "User",
        avatar: "",
        description: "Creator",
        theme: "dark"
    } as SiteSettings;

    const isComingSoon = platform.status === 'coming_soon' || (!platform.active && !platform.status);

    const CardContent = (
        platform.platform === 'instagram' ? (
            <InstagramCard platform={platform} settings={settings} />
        ) : platform.platform === 'linkedin' ? (
            <LinkedinCard platform={platform} settings={settings} />
        ) : platform.platform === 'x' ? (
            <XCard platform={platform} settings={settings} />
        ) : (
            <GenericCard platform={platform} config={config} />
        )
    );

    if (isComingSoon) {
        return (
            <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden group cursor-not-allowed select-none border border-neutral-800/50">
                <div className="w-full h-full opacity-30 blur-[2px] grayscale brightness-50 pointer-events-none">
                    {CardContent}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="bg-neutral-900/90 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl backdrop-blur-md border border-white/10 flex items-center gap-2">
                        Coming Soon
                    </div>
                </div>
            </div>
        );
    }

    return (
        <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
        >
            <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-full"
            >
                {CardContent}
            </motion.div>
        </a>
    );
}
