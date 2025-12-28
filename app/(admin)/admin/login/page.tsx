"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, UserPlus } from "lucide-react";
import { checkHasUsersAction, createFirstUserAction, loginAction } from "@/app/actions/auth";

export default function LoginPage() {
    const [mode, setMode] = useState<'checking' | 'login' | 'setup' | 'error'>('checking');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        checkHasUsersAction().then(res => {
            if (res.success) {
                setMode(res.hasUsers ? 'login' : 'setup');
            } else {
                setMode('error');
                setError(res.error || "System Unavailable");
            }
        });
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let res;
            if (mode === 'setup') {
                res = await createFirstUserAction(email, password);
            } else {
                res = await loginAction(email, password);
            }

            if (res.success) {
                router.push("/admin/dashboard");
            } else {
                setError(res.error || "Operation failed");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    if (mode === 'checking') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (mode === 'error') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black p-4">
                <div className="text-red-500 bg-red-500/10 p-6 rounded-lg border border-red-500/20 max-w-md text-center">
                    <h1 className="text-xl font-bold mb-2">System Unavailable</h1>
                    <p className="text-neutral-300">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl"
                >
                    <div className="flex flex-col items-center mb-8">
                        <div className={`w-12 h-12 ${mode === 'setup' ? 'bg-green-500/10 text-green-500' : 'bg-indigo-500/10 text-indigo-500'} rounded-full flex items-center justify-center mb-4 transition-colors`}>
                            {mode === 'setup' ? <UserPlus size={24} /> : <Lock size={24} />}
                        </div>
                        <h1 className="text-2xl font-bold text-white">
                            {mode === 'setup' ? "Create Admin Account" : "Admin Access"}
                        </h1>
                        <p className="text-neutral-400 text-sm mt-2 text-center">
                            {mode === 'setup'
                                ? "This is the first time setup. Create your master admin account."
                                : "Enter your secure credentials to continue."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-indigo-500 rounded-lg px-4 py-2 text-white outline-none transition-colors"
                                placeholder="you@company.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 focus:border-indigo-500 rounded-lg px-4 py-2 text-white outline-none transition-colors"
                                placeholder={mode === 'setup' ? "Create a strong password" : "••••••••"}
                            />
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm bg-red-400/10 p-2 rounded border border-red-400/20 text-center animate-pulse">
                                {error}
                            </div>
                        )}

                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleSubmit}
                            className={`w-full font-medium py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${mode === 'setup'
                                ? "bg-green-600 hover:bg-green-500 text-white"
                                : "bg-indigo-600 hover:bg-indigo-500 text-white"
                                }`}
                        >
                            {loading ? "Processing..." : (mode === 'setup' ? "Create Account" : "Sign In")}
                        </button>
                    </form>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
