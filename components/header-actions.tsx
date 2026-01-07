"use client";

import * as React from "react";
import { Moon, Sun, Lock } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeaderActions() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="absolute top-6 right-6 flex items-center gap-4">
                <div className="w-5 h-5" />
                <div className="w-5 h-5" />
            </div>
        )
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-6 right-6 flex items-center gap-6 z-50 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
        >
            <button
                onClick={toggleTheme}
                className="outline-none"
                aria-label="Toggle theme"
            >
                {theme === "dark" ? (
                    <Sun size={20} className="hover:text-yellow-400 transition-colors" />
                ) : (
                    <Moon size={20} className="hover:text-cyan-600 transition-colors" />
                )}
            </button>

            <Link href="/admin/login" aria-label="Admin Access">
                <Lock size={18} className="hover:text-red-500 transition-colors opacity-50 hover:opacity-100" />
            </Link>
        </motion.div>
    );
}
