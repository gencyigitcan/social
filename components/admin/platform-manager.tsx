"use client";

import { useState } from "react";
import { SocialPlatform } from "@/lib/db";
import { togglePlatformAction, updatePlatformAction, reorderPlatformsAction } from "@/app/actions/social";
import { Save, Eye, EyeOff, GripVertical, ChevronRight, X } from "lucide-react";
import { SocialCard } from "@/components/social-card";
import { motion, AnimatePresence } from "framer-motion";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function PlatformManager({ initialPlatforms }: { initialPlatforms: SocialPlatform[] }) {
    const [platforms, setPlatforms] = useState(initialPlatforms.sort((a, b) => a.order - b.order));
    const [selectedPlatformId, setSelectedPlatformId] = useState<string | null>(null);

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setPlatforms((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over?.id);

                // Create reordered array
                const reorderedItems = arrayMove(items, oldIndex, newIndex);

                // Assign new order values to maintain consistency
                const newOrderWithIndices = reorderedItems.map((item, index) => ({
                    ...item,
                    order: index + 1
                }));

                // Transform to the format expected by the server action
                const updates = newOrderWithIndices.map((item) => ({
                    id: item.id,
                    order: item.order
                }));

                // Trigger server update
                reorderPlatformsAction(updates);

                return newOrderWithIndices;
            });
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const selectedPlatform = platforms.find(p => p.id === selectedPlatformId);

    return (
        <div className="relative">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={platforms.map(p => p.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-2">
                        {platforms.map(p => (
                            <SortablePlatformListItem
                                key={p.id}
                                p={p}
                                onSelect={() => setSelectedPlatformId(p.id)}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {/* Modal / Detail View */}
            <AnimatePresence>
                {selectedPlatform && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedPlatformId(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-neutral-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center p-6 border-b border-neutral-800">
                                <h2 className="text-2xl font-bold">{selectedPlatform.title}</h2>
                                <button
                                    onClick={() => setSelectedPlatformId(null)}
                                    className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6">
                                <PlatformDetailEditor
                                    platform={selectedPlatform}
                                    setPlatforms={setPlatforms}
                                    onClose={() => setSelectedPlatformId(null)}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function SortablePlatformListItem({ p, onSelect }: { p: SocialPlatform, onSelect: () => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: p.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={onSelect}
            className="group flex items-center gap-4 bg-neutral-800/30 hover:bg-neutral-800/80 border border-neutral-800 rounded-lg p-3 transition-colors select-none cursor-pointer"
        >
            <div
                {...attributes}
                {...listeners}
                onClick={(e) => e.stopPropagation()}
                className="cursor-grab touch-none p-2 text-neutral-600 hover:text-white transition-colors"
            >
                <GripVertical size={16} />
            </div>

            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${p.status === 'coming_soon' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]' : p.active ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-neutral-600'}`} />

            <span className="font-medium flex-1 text-sm md:text-base">{p.title}</span>

            <button
                onClick={onSelect}
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700/50 rounded-full transition-colors"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}

function PlatformDetailEditor({ platform, setPlatforms, onClose }: { platform: SocialPlatform, setPlatforms: React.Dispatch<React.SetStateAction<SocialPlatform[]>>, onClose: () => void }) {
    const [p, setLocalP] = useState(platform);
    const [isDirty, setIsDirty] = useState(false);

    const currentStatus = p.status || (p.active ? 'active' : 'hidden');

    const handleStatusChange = (status: 'active' | 'coming_soon' | 'hidden') => {
        const isActive = status === 'active';
        const updated = { ...p, status, active: isActive }; // Update both for compat

        setLocalP(updated);
        setIsDirty(true); // Requiring save for status change is safer or auto-save? Let's make it dirty to require save to confirm visibility change. 
        // Actually for UX, status change usually auto-saves in toggles. But here we have a "Save" button for the form. Let's start with dirty state.
    };

    const handleSave = async () => {
        await updatePlatformAction(p);
        setPlatforms(prev => prev.map(x => x.id === p.id ? p : x));
        setIsDirty(false);
        onClose();
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">

                {/* Status Selector */}
                <div className="bg-neutral-800/30 p-4 rounded-xl border border-neutral-800 space-y-3">
                    <div>
                        <div className="font-medium">Visibility Status</div>
                        <div className="text-xs text-neutral-400">Control how this platform appears on your site</div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <StatusButton
                            active={currentStatus === 'active'}
                            onClick={() => handleStatusChange('active')}
                            color="bg-green-500"
                            label="Active"
                        />
                        <StatusButton
                            active={currentStatus === 'coming_soon'}
                            onClick={() => handleStatusChange('coming_soon')}
                            color="bg-yellow-500"
                            label="Coming Soon"
                        />
                        <StatusButton
                            active={currentStatus === 'hidden'}
                            onClick={() => handleStatusChange('hidden')}
                            color="bg-neutral-600"
                            label="Hidden"
                        />
                    </div>
                </div>

                {/* URL Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Profile URL</label>
                    <input
                        type="text"
                        value={p.url}
                        onChange={(e) => {
                            setLocalP({ ...p, url: e.target.value });
                            setIsDirty(true);
                        }}
                        placeholder="https://..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    />
                </div>

                {isDirty && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={handleSave}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-lg hover:shadow-indigo-500/20"
                    >
                        <Save size={18} /> Save Changes
                    </motion.button>
                )}
            </div>

            {/* Live Preview Side */}
            <div className="flex flex-col items-center">
                <div className="text-xs text-neutral-500 font-mono mb-4 uppercase tracking-wider">Live Preview</div>
                <div className="w-[280px] pointer-events-none">
                    <SocialCard
                        platform={p}
                        userSettings={{
                            siteName: "Preview",
                            avatar: "",
                            description: "Preview Mode",
                            theme: "dark"
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

function StatusButton({ active, onClick, color, label }: { active: boolean, onClick: () => void, color: string, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`p-2 rounded-lg text-xs font-bold transition-all border ${active ? `border-transparent text-white ${color}` : 'border-neutral-700 text-neutral-400 hover:border-neutral-500 bg-neutral-900'}`}
        >
            {label}
        </button>
    )
}

function SimpleSwitch({ checked, onChange }: { checked: boolean, onChange: () => void }) {
    return (
        <button
            onClick={onChange}
            className={`w-12 h-6 rounded-full p-1 transition-colors relative ${checked ? 'bg-green-500' : 'bg-neutral-600'}`}
        >
            <motion.div
                initial={false}
                animate={{ x: checked ? 24 : 0 }}
                className="w-4 h-4 rounded-full bg-white shadow-sm"
            />
        </button>
    )
}
