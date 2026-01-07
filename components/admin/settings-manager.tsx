"use client";

import { useState } from "react";
import { SiteSettings } from "@/lib/db";
import { updateSettings, resetSettings } from "@/app/actions/settings";
import { Save, RotateCcw, Image as ImageIcon, Type, AlignLeft } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function SettingsManager({ initialSettings }: { initialSettings: SiteSettings }) {
    const [settings, setSettings] = useState(initialSettings);
    const [isDirty, setIsDirty] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (key: keyof SiteSettings, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        setIsDirty(true);
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            const result = await updateSettings(settings);
            if (result.success) {
                setIsDirty(false);
            } else {
                alert("Hata: " + (result.error || "Bilinmeyen hata"));
            }
        } catch (error) {
            console.error(error);
            alert("Ayarlar kaydedilirken beklenmedik bir hata oluştu.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = async () => {
        if (!confirm("Tüm ayarları varsayılan değerlere sıfırlamak istediğinize emin misiniz?")) return;

        try {
            setIsSaving(true);
            const result = await resetSettings();

            if (result.success) {
                // We need to refresh the page or update local state properly, 
                // but for now a reload is safest to get defaults
                window.location.reload();
            } else {
                alert("Sıfırlama hatası: " + (result.error || "Bilinmeyen hata"));
            }
        } catch (error) {
            alert("Sıfırlama sırasında hata oluştu.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">Profil Ayarları</h2>
                    <p className="text-neutral-400 text-sm">Sitenizin genel görünümünü ve içeriğini yönetin.</p>
                </div>

                <button
                    onClick={handleReset}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 hover:bg-red-900/10 px-3 py-2 rounded-lg transition-colors"
                >
                    <RotateCcw size={14} />
                    Varsayılanlara Dön
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="space-y-5 bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">

                    {/* Site Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                            <Type size={16} className="text-cyan-400" />
                            İsim / Başlık
                        </label>
                        <input
                            type="text"
                            value={settings.siteName}
                            onChange={(e) => handleChange("siteName", e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-neutral-600"
                            placeholder="Adınız veya Sitenizin Adı"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                            <AlignLeft size={16} className="text-blue-400" />
                            Açıklama / Biyografi
                        </label>
                        <textarea
                            value={settings.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            rows={3}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-neutral-600 resize-none"
                            placeholder="Kendinizden kısaca bahsedin..."
                        />
                    </div>

                    {/* Avatar URL */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                            <ImageIcon size={16} className="text-emerald-400" />
                            Profil Resmi URL
                        </label>
                        <input
                            type="text"
                            value={settings.avatar}
                            onChange={(e) => handleChange("avatar", e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-neutral-600"
                            placeholder="https://..."
                        />
                        <p className="text-[10px] text-neutral-500">
                            Öneri: GitHub avatar URL'nizi veya Unsplash gibi bir kaynaktan direkt resim linki kullanabilirsiniz.
                        </p>
                    </div>

                    {/* Save Button */}
                    <div className="pt-2">
                        <button
                            onClick={handleSave}
                            disabled={!isDirty || isSaving}
                            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${isDirty
                                ? "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                                : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                                }`}
                        >
                            {isSaving ? (
                                <span className="animate-pulse">Kaydediliyor...</span>
                            ) : (
                                <>
                                    <Save size={18} /> Değişiklikleri Kaydet
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="flex flex-col items-center justify-center p-6 bg-neutral-900/30 rounded-2xl border border-neutral-800 border-dashed">
                    <div className="text-xs text-neutral-500 font-mono mb-6 uppercase tracking-wider">CANLI ÖNİZLEME</div>

                    <div className="relative flex flex-col items-center">
                        {/* Avatar Preview */}
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-neutral-900 shadow-2xl bg-neutral-800 mb-6 group">
                            {settings.avatar ? (
                                <Image
                                    src={settings.avatar}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-neutral-600">
                                    <ImageIcon size={40} />
                                </div>
                            )}
                        </div>

                        {/* Text Preview */}
                        <div className="text-center max-w-sm space-y-3">
                            <h1 className="text-3xl font-bold tracking-tight text-white empty:h-8">
                                {settings.siteName || <span className="opacity-20 italic">İsim Yok</span>}
                            </h1>
                            <p className="text-neutral-400 text-lg leading-relaxed empty:h-6">
                                {settings.description || <span className="opacity-20 italic">Açıklama girilmedi.</span>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
