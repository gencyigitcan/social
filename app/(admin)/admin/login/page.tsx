"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // TODO: Call server action here
            // const res = await loginAction(email, password);

            // Simulate login for UI dev
            if (email === "admin@example.com" && password === "admin") {
                router.push("/admin/dashboard");
            } else {
                setError("Invalid credentials (try admin@example.com / admin)");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mb-4">
                        <Lock size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Access</h1>
                    <p className="text-neutral-400 text-sm mt-2">Enter your credentials to continue</p>
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
                            placeholder="admin@example.com"
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
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm bg-red-400/10 p-2 rounded border border-red-400/20">
                            {error}
                        </div>
                    )}

                    <button
                        type="button"
                        disabled={loading}
                        onClick={handleSubmit} // Explicitly using onClick for dev simplicity as form submit sometimes behaves oddly with prevents
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Checking..." : "Sign In"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
