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
    Twitch,
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Mic2,
    Cast,
    Bell,
    Search,
    Code,
    GitBranch,
    Star,
    Hash,
    UserCircle,
    ChevronLeft,
    Check,
    Eye,
    Image as ImageIcon
} from "lucide-react";
import { SocialPlatform, SiteSettings } from "@/lib/db";
import { cn } from "@/lib/utils";
import Image from "next/image";

// --- HELPERS ---
const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(num);
};

const getHandleFromUrl = (url: string, prefix: string = "@") => {
    if (!url) return "";
    try {
        // Handle mailto separately
        if (url.startsWith('mailto:')) return url.replace('mailto:', '');

        // Ensure protocol for URL parsing
        const safeUrl = url.startsWith('http') ? url : `https://${url}`;
        const urlObj = new URL(safeUrl);
        const parts = urlObj.pathname.split('/').filter(p => p !== '');

        // Usually the last part is the username
        if (parts.length > 0) {
            return `${prefix}${parts[parts.length - 1]}`;
        }
    } catch (e) {
        // Fallback for non-standard URLs
        const text = url.split('/').pop();
        if (text) return `${prefix}${text}`;
    }
    return "";
};

// --- INSTAGRAM ---
function InstagramCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-white text-black flex flex-col font-sans select-none">
            <div className="flex items-center justify-between p-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white p-[2px] overflow-hidden relative">
                            {settings.avatar ? <Image src={settings.avatar} alt="User" fill className="object-cover" /> : <div className="w-full h-full bg-neutral-200" />}
                        </div>
                    </div>
                    <span className="text-xs font-semibold lowercase">{getHandleFromUrl(platform.url) || platform.title.toLowerCase()}</span>
                </div>
                <MoreHorizontal size={16} />
            </div>
            <div className="flex-1 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] relative">
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                    <Instagram size={64} />
                </div>
            </div>
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
                <p className="text-xs line-clamp-2">
                    <span className="font-semibold mr-1">{getHandleFromUrl(platform.url, "") || platform.title.toLowerCase()}</span>
                    <span>{platform.content || "Check out my latest updates! 📸 #life #design"}</span>
                </p>
            </div>
        </div>
    );
}

// --- LINKEDIN ---
function LinkedinCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-white text-black flex flex-col font-sans select-none border border-neutral-200">
            <div className="p-4 flex gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {settings.avatar ? <Image src={settings.avatar} alt="User" fill className="object-cover" /> : <div className="w-full h-full bg-neutral-300" />}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                        <h3 className="text-xs font-bold truncate">{settings.siteName}</h3>
                        <span className="text-[10px] text-neutral-500">• 1st</span>
                    </div>
                    <p className="text-[10px] text-neutral-500 truncate">{settings.description || "Digital Creator"}</p>
                </div>
                <div className="text-blue-600 font-semibold text-xs flex items-center gap-1 self-start">+ Follow</div>
            </div>
            <div className="px-4 pb-2 text-xs leading-relaxed line-clamp-3">
                {platform.content || "Excited to share my professional journey! Connect with me to see what I'm building next. 🚀 #development #career"}
            </div>
            <div className="flex-1 bg-neutral-100 relative mt-1 border-y border-neutral-100">
                <div className="absolute inset-0 bg-[#0077b5]/10 flex items-center justify-center">
                    <Linkedin size={48} className="text-[#0077b5]/50" />
                </div>
            </div>
            <div className="px-4 py-2 flex items-center gap-3 text-[10px] text-neutral-500 border-b border-neutral-100">
                <div className="flex items-center gap-1"><ThumbsUp size={12} className="text-blue-600" /> 124</div>
                <span>• 42 comments</span>
            </div>
        </div>
    );
}

// --- X / TWITTER ---
function XCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-black text-white flex flex-col font-sans select-none border border-neutral-800">
            <div className="flex gap-2 p-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-neutral-800">
                    {settings.avatar && <Image src={settings.avatar} alt="User" fill className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-sm">
                        <span className="font-bold truncate">{settings.siteName}</span>
                        <span className="text-neutral-500 truncate">{getHandleFromUrl(platform.url) || `@${platform.title.toLowerCase()}`}</span>
                    </div>
                    <p className="text-sm mt-0.5 whitespace-pre-wrap">{platform.content || "Just shipped a new update! 🚢 Check out the link below. #buildinginpublic"}</p>
                </div>
                <MoreHorizontal size={14} className="text-neutral-500" />
            </div>
            <div className="mx-4 mb-2 rounded-xl border border-neutral-800 overflow-hidden bg-neutral-900/50 flex-1 relative">
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                    <Twitter size={48} />
                </div>
            </div>
            <div className="px-4 py-3 flex justify-between text-neutral-500 text-xs border-t border-neutral-900">
                <div className="flex items-center gap-1"><MessageCircle size={14} /> <span>24</span></div>
                <div className="flex items-center gap-1"><Repeat size={14} /> <span>12</span></div>
                <div className="flex items-center gap-1"><Heart size={14} /> <span>145</span></div>
            </div>
        </div>
    )
}

// --- SPOTIFY ---
function SpotifyCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-gradient-to-b from-[#1db954]/20 to-black text-white flex flex-col font-sans select-none">
            <div className="p-4 pt-6 flex-1 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-32 h-32 bg-neutral-800 shadow-2xl rounded-lg overflow-hidden relative group">
                    {settings.avatar ? <Image src={settings.avatar} alt="Cover" fill className="object-cover opacity-80" /> : <div className="w-full h-full bg-neutral-700 animate-pulse" />}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Music size={40} className="text-white drop-shadow-md" />
                    </div>
                </div>
                <div className="w-full px-2">
                    <h3 className="font-bold text-lg truncate leading-tight">{platform.title}</h3>
                    <p className="text-neutral-400 text-sm truncate">{settings.siteName}</p>
                </div>
            </div>

            {/* Player Controls UI */}
            <div className="px-6 pb-8 space-y-4">
                <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-white rounded-full" />
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                    <div className="text-[10px]">1:23</div>
                    <div className="text-[10px]">-2:45</div>
                </div>
                <div className="flex justify-between items-center px-2">
                    <SkipBack size={24} className="fill-white text-white" />
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                        <Play size={24} className="fill-black ml-1" />
                    </div>
                    <SkipForward size={24} className="fill-white text-white" />
                </div>
                <div className="text-center mt-2">
                    <p className="text-xs text-[#1db954] font-medium tracking-wide uppercase">{platform.content || "Tap to Listen"}</p>
                </div>
            </div>
        </div>
    )
}

// --- YOUTUBE ---
function YoutubeCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-[#0f0f0f] text-white flex flex-col font-sans select-none">
            {/* Video Preview Area */}
            <div className="h-1/2 bg-neutral-800 relative group overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Youtube size={64} className="text-red-600 drop-shadow-2xl" />
                </div>
                {/* Fake timeline */}
                <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-medium">
                    10:24
                </div>
            </div>

            <div className="p-4 flex gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-neutral-700">
                    {settings.avatar && <Image src={settings.avatar} alt="User" fill className="object-cover" />}
                </div>
                <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-sm line-clamp-2 leading-snug">
                        {platform.content || "Watch my latest videos and tutorials! 🎥"}
                    </h3>
                    <div className="text-[11px] text-neutral-400 flex items-center gap-1">
                        <span>{platform.title}</span>
                        <span>•</span>
                        <span>12K views</span>
                        <span>•</span>
                        <span>2 days ago</span>
                    </div>
                </div>
                <MoreHorizontal size={16} className="text-white transform rotate-90" />
            </div>

            <div className="mt-auto px-4 pb-6">
                <div className="w-full bg-red-600 text-black font-bold text-sm py-2 rounded-full flex items-center justify-center gap-2">
                    Subscribe
                </div>
            </div>
        </div>
    )
}

// --- GITHUB ---
function GithubCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-[#0d1117] text-white flex flex-col font-sans select-none border border-neutral-800">
            <div className="p-5 flex items-center gap-3 border-b border-neutral-800 bg-[#161b22]">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-neutral-700">
                    {settings.avatar && <Image src={settings.avatar} alt="User" fill className="object-cover" />}
                </div>
                <div>
                    <h3 className="font-semibold text-neutral-200">{platform.title}</h3>
                    <p className="text-xs text-neutral-500">{getHandleFromUrl(platform.url) || `@${settings.siteName.replace(/\s/g, '').toLowerCase()}`}</p>
                </div>
            </div>

            <div className="p-5 space-y-4">
                <div className="text-sm text-neutral-300">
                    {platform.content || "Building open source software and exploring new technologies. 💻"}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <GitBranch size={14} />
                        <span>Pinned Repositories</span>
                    </div>

                    <div className="border border-neutral-800 rounded-lg p-3 bg-[#0d1117] hover:bg-[#161b22] transition-colors">
                        <div className="flex items-center gap-2 font-semibold text-sm text-blue-400 mb-1">
                            <span className="truncate">project-social</span>
                            <span className="px-1.5 py-0.5 rounded-full border border-neutral-700 text-[9px] text-neutral-400">Public</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 line-clamp-1">Next.js social wrapper application</p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-neutral-500">
                            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400" /> TypeScript</div>
                            <div className="flex items-center gap-1"><Star size={10} /> 12</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto bg-[#161b22] p-2 flex justify-center border-t border-neutral-800">
                {/* Fake Contribution Graph */}
                <div className="flex gap-[2px]">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-[2px]">
                            {[...Array(5)].map((_, j) => (
                                <div key={j} className={cn("w-2.5 h-2.5 rounded-[2px]", Math.random() > 0.5 ? "bg-[#238636]" : "bg-[#161b22] border border-neutral-800")} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// --- TIKTOK ---
function TikTokCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-black text-white flex flex-col font-sans select-none border border-neutral-800">
            {/* Video background placeholder */}
            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center opacity-50">
                <Video size={48} className="text-neutral-700" />
            </div>

            {/* UI Overlay */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                <div className="flex justify-center pt-2">
                    <span className="font-semibold drop-shadow-md">Following | <span className="text-white font-bold border-b-2 border-white pb-0.5">For You</span></span>
                </div>

                <div className="flex items-end justify-between">
                    <div className="space-y-2 mb-2 w-3/4">
                        <div className="font-bold text-shadow-sm">{getHandleFromUrl(platform.url) || `@${settings.siteName.replace(/\s/g, '').toLowerCase()}`}</div>
                        <div className="text-sm leading-tight drop-shadow-md">
                            {platform.content || "Check out my latest TikToks! 🎵 #trending #viral"}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold">
                            <Music size={12} />
                            <span className="truncate">Original Sound - {getHandleFromUrl(platform.url) || `@${settings.siteName}`}</span>
                        </div>
                    </div>

                    {/* Side Actions */}
                    <div className="flex flex-col items-center gap-4 pb-2">
                        <div className="relative w-10 h-10 rounded-full border border-white overflow-hidden mb-2">
                            {settings.avatar ? <Image src={settings.avatar} alt="User" fill className="object-cover" /> : <div className="w-full h-full bg-neutral-500" />}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5">
                                <div className="w-2 h-0.5 bg-white" />
                                <div className="w-0.5 h-2 bg-white absolute top-0.5 left-1" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                            <Heart size={28} className="fill-white text-white drop-shadow-md" />
                            <span className="text-xs font-bold text-shadow-sm">84k</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                            <MessageCircle size={28} className="fill-white text-white drop-shadow-md" />
                            <span className="text-xs font-bold text-shadow-sm">1024</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                            <Bookmark size={28} className="fill-white text-white drop-shadow-md" />
                            <span className="text-xs font-bold text-shadow-sm">402</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                            <Share2 size={28} className="fill-white text-white drop-shadow-md" />
                            <span className="text-xs font-bold text-shadow-sm">Share</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- TWITCH ---
function TwitchCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-[#18181b] text-white flex flex-col font-sans select-none border border-[#9146ff]/30">
            {/* Stream Player */}
            <div className="relative h-1/2 bg-black">
                <div className="absolute top-2 left-2 bg-red-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live
                </div>
                <div className="absolute top-2 right-2 bg-black/60 px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1">
                    <UserCircle size={10} /> 1.2k
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Twitch size={64} className="text-[#9146ff] opacity-50" />
                </div>
            </div>

            <div className="p-3 flex-1 flex flex-col gap-3">
                <div className="flex gap-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#9146ff]">
                        {settings.avatar && <Image src={settings.avatar} alt="User" fill className="object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm truncate">{settings.siteName}</h3>
                        <p className="text-xs text-[#bf94ff] truncate">{platform.content || "Just Chatting about Code & Design"}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            <span className="bg-neutral-800 text-neutral-400 px-1.5 rounded text-[9px]">English</span>
                            <span className="bg-neutral-800 text-neutral-400 px-1.5 rounded text-[9px]">Development</span>
                        </div>
                    </div>
                </div>

                {/* Chat Preview */}
                <div className="flex-1 bg-black/20 rounded-lg p-2 space-y-1.5 overflow-hidden text-[10px] relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] to-transparent pointer-events-none" />
                    <p><span className="font-bold text-[#e1ff00]">User123</span>: POG!</p>
                    <p><span className="font-bold text-[#00ffc3]">Dev_Guy</span>: Nice setup...</p>
                    <p><span className="font-bold text-[#ff7b00]">Sub_Hype</span>: gifted 5 subs!</p>
                </div>
            </div>
        </div>
    )
}

// --- DISCORD ---
function DiscordCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-[#313338] text-white flex flex-col font-sans select-none">
            {/* Server Header */}
            <div className="bg-[#2b2d31] p-4 border-b border-[#1e1f22] flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold">
                    <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center">
                        <MessageCircle size={16} fill="white" />
                    </div>
                    {settings.siteName} Community
                </div>
                <MoreHorizontal size={16} className="text-neutral-400" />
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 space-y-4">
                {/* Fake Previous Messages */}
                <div className="flex gap-3 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-neutral-600 flex-shrink-0" />
                    <div>
                        <div className="h-2 w-20 bg-neutral-600 rounded mb-1" />
                        <div className="h-2 w-32 bg-neutral-700 rounded" />
                    </div>
                </div>

                {/* Main Message */}
                <div className="flex gap-3 group">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#5865F2]">
                        {settings.avatar && <Image src={settings.avatar} alt="User" fill className="object-cover" />}
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="font-bold hover:underline cursor-pointer">{settings.siteName}</span>
                            <span className="text-[10px] text-neutral-400 bg-[#5865F2] px-1 rounded text-white">BOT</span>
                            <span className="text-[10px] text-neutral-400">Today at 4:20 PM</span>
                        </div>
                        <div className="text-sm text-neutral-100 mt-1 leading-relaxed">
                            {platform.content || "Join our server to chat, share projects, and hang out! 🎮 💻"}
                        </div>
                        <div className="mt-2 bg-[#2b2d31] border-l-4 border-[#5865F2] p-2 rounded text-xs text-neutral-300">
                            Click the link to join instantly!
                        </div>
                    </div>
                </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#383a40] mx-3 mb-3 rounded-lg flex items-center gap-2 text-neutral-400">
                <div className="w-5 h-5 rounded-full bg-neutral-500 flex items-center justify-center text-[#383a40] font-bold text-xs">+</div>
                <div className="text-xs">Message #{platform.platform}</div>
            </div>
        </div>
    )
}

// --- WHATSAPP ---
function WhatsAppCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-[#0b141a] text-white flex flex-col font-sans select-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-opacity-10">
            {/* Header */}
            <div className="bg-[#202c33] p-3 flex items-center gap-3 shadow-sm z-10">
                <div className="p-1 hover:bg-neutral-700/50 rounded-full cursor-pointer">
                    <ChevronLeft size={20} className="text-[#aebac1]" />
                </div>
                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    {settings.avatar ? <Image src={settings.avatar} alt="User" fill className="object-cover" /> : <div className="w-full h-full bg-neutral-500" />}
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-sm truncate">{settings.siteName}</h3>
                    <p className="text-[10px] text-[#aebac1] truncate">online</p>
                </div>
                <Video size={20} className="text-[#aebac1] mr-2" />
                <Phone size={18} className="text-[#aebac1] mr-2" />
                <MoreHorizontal size={18} className="text-[#aebac1]" />
            </div>

            {/* Chat */}
            <div className="flex-1 p-4 flex flex-col justify-end space-y-2 relative">
                <div className="absolute inset-0 bg-black/80 z-0 content-['']" />

                <div className="self-start bg-[#202c33] rounded-lg rounded-tl-none p-2 max-w-[80%] z-10 shadow-sm relative">
                    <p className="text-sm text-neutral-200">Hello! 👋</p>
                    <span className="text-[9px] text-[#8696a0] absolute bottom-1 right-2">10:00 AM</span>
                </div>

                <div className="self-end bg-[#005c4b] rounded-lg rounded-tr-none p-2 pl-3 max-w-[85%] z-10 shadow-sm min-w-[120px]">
                    <div className="flex flex-col">
                        <p className="text-sm text-neutral-100 break-words leading-snug">
                            {platform.content || "Hey there! Feel free to message me directly here."}
                        </p>
                        <div className="flex items-center justify-end gap-1 mt-1 -mb-1 opacity-80">
                            <span className="text-[10px] text-[#ffffff99]">10:02 AM</span>
                            <div className="text-[#53bdeb] flex"><Check size={14} className="-ml-1" /><Check size={14} className="-ml-2" /></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input */}
            <div className="bg-[#202c33] p-2 flex items-center gap-2 z-10">
                <div className="p-2"><div className="w-5 h-5 rounded-lg border-2 border-[#8696a0] flex items-center justify-center opacity-50">+</div></div>
                <div className="flex-1 bg-[#2a3942] rounded-lg h-9 px-3 flex items-center text-sm text-[#8696a0]">Message...</div>
                <div className="p-2 bg-[#00a884] rounded-full text-white"><Send size={16} /></div>
            </div>
        </div>
    )
}

// --- BEHANCE ---
function BehanceCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-[#053eff] text-white flex flex-col font-sans select-none">
            {/* Header */}
            <div className="p-4 flex justify-between items-start">
                <div className="bg-black/20 p-2 rounded-full backdrop-blur-sm">
                    <ShoppingBag size={20} />
                </div>
                <div className="bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm text-xs font-bold">
                    Follow
                </div>
            </div>

            {/* Content / Portfolio Preview */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                    {settings.avatar ? <Image src={settings.avatar} alt="User" fill className="object-cover" /> : <div className="w-full h-full bg-blue-800" />}
                </div>

                <div>
                    <h3 className="text-2xl font-bold">{settings.siteName}</h3>
                    <p className="text-blue-200 text-sm mt-1">{platform.content || "UI/UX Designer & Art Director"}</p>
                </div>

                <div className="flex gap-4 p-4 w-full justify-center bg-black/10 rounded-2xl backdrop-blur-md">
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-lg">14.2k</span>
                        <span className="text-[9px] uppercase tracking-wider opacity-70">Project Views</span>
                    </div>
                    <div className="w-[1px] bg-white/20" />
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-lg">842</span>
                        <span className="text-[9px] uppercase tracking-wider opacity-70">Appreciations</span>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="w-full bg-white text-[#053eff] py-3 rounded-xl font-bold text-center shadow-lg">
                    View Portfolio
                </div>
            </div>
        </div>
    )
}

// --- DRIBBBLE ---
function DribbbleCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-[#ea4c89] text-white flex flex-col font-sans select-none">
            {/* Header */}
            <div className="p-5 flex items-center justify-between">
                <Globe size={24} />
                <MoreHorizontal size={24} />
            </div>

            {/* Shot Preview */}
            <div className="mx-4 mb-4 flex-1 bg-white rounded-2xl shadow-2xl overflow-hidden relative group">
                {/* Placeholder for a "Shot" */}
                <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center text-neutral-300">
                    <ImageIcon size={48} className="opacity-50" />
                </div>
                {/* Use avatar as a "stamp" of brand */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        {settings.avatar ? <Image src={settings.avatar} alt="User" fill className="object-cover" /> : <div className="w-full h-full bg-pink-300" />}
                    </div>
                    <span className="text-neutral-600 font-bold text-xs bg-white/80 backdrop-blur px-2 py-1 rounded-md shadow-sm">{settings.siteName}</span>
                </div>
            </div>

            <div className="px-6 pb-8 space-y-2">
                <h3 className="font-bold text-xl leading-tight">
                    {platform.content || "Check out my latest design shots!"}
                </h3>
                <div className="flex items-center gap-4 text-pink-200 text-sm">
                    <div className="flex items-center gap-1"><Heart size={16} className="fill-pink-200" /> 1,204</div>
                    <div className="flex items-center gap-1"><Eye size={16} className="fill-pink-200" /> 24.5k</div>
                </div>
            </div>
        </div>
    )
}

// --- WEBSITE ---
function WebsiteCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-neutral-900 text-white flex flex-col font-sans select-none border border-neutral-800">
            {/* Browser Bar */}
            <div className="bg-neutral-800 p-3 flex items-center gap-3 border-b border-neutral-700">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 bg-neutral-900 rounded-md py-1 px-3 text-[10px] text-neutral-500 flex items-center gap-2 truncate">
                    <Globe size={10} />
                    {platform.url.replace(/^https?:\/\//, '')}
                </div>
            </div>

            {/* Web Content Preview */}
            <div className="flex-1 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 relative flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-2xl flex items-center justify-center mb-2">
                    <span className="font-bold text-3xl">Aa</span>
                </div>

                <div>
                    <h3 className="text-xl font-bold">{platform.title}</h3>
                    <p className="text-neutral-400 text-xs mt-2 max-w-[200px] mx-auto leading-relaxed">
                        {platform.content || "Visit my personal website to see my full portfolio, blog posts, and more."}
                    </p>
                </div>

                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-8 text-neutral-500"
                >
                    <ChevronLeft size={24} className="-rotate-90" />
                </motion.div>
            </div>

            <div className="p-4 bg-neutral-900 border-t border-neutral-800">
                <div className="w-full bg-white text-black py-3 rounded-xl font-bold text-center text-sm shadow-lg hover:bg-neutral-200 transition-colors">
                    Visit Website
                </div>
            </div>
        </div>
    )
}

// --- EMAIL ---
function EmailCard({ platform, settings }: { platform: SocialPlatform, settings: SiteSettings }) {
    // Smartly extract email: remove mailto: prefix if present.
    // If the URL is empty or generic placeholder, fallback is handled but we try to use what's there.
    const rawUrl = platform.url || "";
    let emailAddress = rawUrl.replace(/^mailto:/, '');

    // If the stripped address looks like a URL (http), it's probably wrong, but we display it or a placeholder.
    if (emailAddress.startsWith('http')) {
        emailAddress = "email@example.com";
    }

    // If completely empty after strip (e.g. user entered "mailto:"), fallback
    if (!emailAddress) emailAddress = "email@example.com";

    return (
        <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-[#e5e5e5] text-neutral-800 flex flex-col font-sans select-none border border-white">
            {/* Envelope Flap Effect */}
            <div className="absolute top-0 inset-x-0 h-32 bg-white shadow-sm z-10 flex items-center justify-center rounded-b-[3rem]">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center shadow-inner">
                    <Mail size={32} className="text-neutral-400" />
                </div>
            </div>
            <div className="absolute top-0 inset-x-0 h-16 bg-white z-0" />

            <div className="flex-1 flex flex-col items-center justify-end p-6 pb-8 space-y-6 pt-40">
                <div className="text-center space-y-1">
                    <h3 className="font-bold text-2xl text-neutral-900">Get in Touch</h3>
                    <p className="text-neutral-500 text-sm">{platform.content || "Have a project in mind? Let's talk!"}</p>
                </div>

                <div className="w-full bg-white p-4 rounded-2xl shadow-sm space-y-3">
                    <div className="flex items-center gap-3 text-sm text-neutral-600 border-b border-neutral-100 pb-3">
                        <span className="font-semibold w-12 text-neutral-400">To:</span>
                        <span className="truncate">{settings.siteName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <span className="font-semibold w-12 text-neutral-400">From:</span>
                        <span className="text-neutral-500 italic truncate">{emailAddress}</span>
                    </div>
                </div>

                <div className="w-full bg-neutral-900 text-white py-3.5 rounded-xl font-bold text-center shadow-xl flex items-center justify-center gap-2">
                    <Send size={18} /> Send Email
                </div>
            </div>
        </div>
    )
}

// --- GENERIC / OTHERS ---
function GenericCard({ platform, config }: { platform: SocialPlatform, config: any }) {
    const Icon = config.icon;
    return (
        <div className={cn(
            "relative w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300",
            config.style || "bg-neutral-800 text-white"
        )}>
            <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300" />

            <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div className="self-end opacity-80 backdrop-blur-sm bg-white/10 p-2 rounded-full">
                    <Icon size={28} />
                </div>

                <div className="space-y-2">
                    <h3 className="text-3xl font-bold tracking-tight">{platform.title || config.label}</h3>
                    <p className="text-sm font-medium opacity-90 leading-relaxed">
                        {platform.content || "Tap to visit"}
                    </p>
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
    youtube: { icon: Youtube, style: "", label: "YouTube" }, // Handled by custom component now, but keeping in config
    website: { icon: Globe, style: "bg-emerald-600 text-white", label: "Website" },
    tiktok: { icon: Video, style: "bg-black text-white border border-neutral-800", label: "TikTok" }, // Custom
    github: { icon: Github, style: "", label: "GitHub" }, // Custom component
    behance: { icon: ShoppingBag, style: "bg-[#1769ff] text-white", label: "Behance" },
    dribbble: { icon: Globe, style: "bg-[#ea4c89] text-white", label: "Dribbble" },
    spotify: { icon: Music, style: "bg-[#1db954] text-white", label: "Spotify" }, // Custom component
    twitch: { icon: Twitch, style: "bg-[#9146ff] text-white", label: "Twitch" }, // Custom
    discord: { icon: MessageCircle, style: "bg-[#5865F2] text-white", label: "Discord" }, // Custom
    whatsapp: { icon: Phone, style: "bg-[#25D366] text-white", label: "WhatsApp" }, // Custom
    email: { icon: Mail, style: "bg-neutral-600 text-white", label: "Email" },
    other: { icon: LinkIcon, style: "bg-neutral-800 text-white", label: "Link" }
};

export function SocialCard({ platform, userSettings }: { platform: SocialPlatform, userSettings?: SiteSettings }) {
    const config = platformConfig[platform.platform] || platformConfig.other;

    // Default settings fallback
    const settings = userSettings || {
        siteName: "User",
        avatar: "",
        description: "Creator",
        theme: "dark"
    } as SiteSettings;

    const isComingSoon = platform.status === 'coming_soon' || (!platform.active && !platform.status);

    let CardContent;
    switch (platform.platform) {
        case 'instagram': CardContent = <InstagramCard platform={platform} settings={settings} />; break;
        case 'linkedin': CardContent = <LinkedinCard platform={platform} settings={settings} />; break;
        case 'x': CardContent = <XCard platform={platform} settings={settings} />; break;
        case 'spotify': CardContent = <SpotifyCard platform={platform} settings={settings} />; break;
        case 'youtube': CardContent = <YoutubeCard platform={platform} settings={settings} />; break;
        case 'github': CardContent = <GithubCard platform={platform} settings={settings} />; break;
        case 'tiktok': CardContent = <TikTokCard platform={platform} settings={settings} />; break;
        case 'twitch': CardContent = <TwitchCard platform={platform} settings={settings} />; break;
        case 'discord': CardContent = <DiscordCard platform={platform} settings={settings} />; break;
        case 'whatsapp': CardContent = <WhatsAppCard platform={platform} settings={settings} />; break;
        case 'behance': CardContent = <BehanceCard platform={platform} settings={settings} />; break;
        case 'dribbble': CardContent = <DribbbleCard platform={platform} settings={settings} />; break;
        case 'website': CardContent = <WebsiteCard platform={platform} settings={settings} />; break;
        case 'email': CardContent = <EmailCard platform={platform} settings={settings} />; break;
        default: CardContent = <GenericCard platform={platform} config={config} />; break;
    }

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

    // Auto-fix usage of "github.com/user" without protocol
    let finalUrl = platform.url;
    if (!finalUrl) finalUrl = "";

    if (platform.platform === 'email') {
        if (!finalUrl.startsWith('mailto:') && !finalUrl.startsWith('http')) {
            finalUrl = `mailto:${finalUrl}`;
        }
    } else {
        // For other platforms, ensure https:// if no protocol is present
        if (finalUrl && !finalUrl.startsWith('http') && !finalUrl.startsWith('mailto:')) {
            finalUrl = `https://${finalUrl}`;
        }
    }

    return (
        <a
            href={finalUrl}
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
