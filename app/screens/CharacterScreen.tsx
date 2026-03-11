import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Check, Palette, Sparkles } from 'lucide-react';

import { Character } from '../components/Character';


interface Item {
    id: string;
    name: string;
    image: string;
    type: 'hat' | 'shirt' | 'accessory' | 'shoes' | 'skin' | 'model';
    price?: number;
}

const ITEMS: Item[] = [];


export const CharacterScreen = () => {
    const { t, characterState, updateCharacterState, isRTL } = useApp();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>('skin');
    
    // Reset all clothing items to 'none' when screen loads
    const [localState, setLocalState] = useState(() => ({
        ...characterState,
        hat: 'none',
        shirt: 'none',
        pants: 'none',
        shoes: 'none',
        accessory: 'none',
    }));

    const tabs = [
        { id: 'skin', icon: Palette, label: "צבע" },
    ];


    const SKIN_COLORS: Item[] = [
        { id: 'normal', name: 'רגיל', image: '', type: 'skin' },
        { id: 'tan', name: 'שזוף', image: '', type: 'skin' },
        { id: 'blue', name: 'כחול', image: '', type: 'skin' },
        { id: 'green', name: 'ירוק', image: '', type: 'skin' },
        { id: 'red', name: 'אדום', image: '', type: 'skin' },
        { id: 'purple', name: 'סגול', image: '', type: 'skin' },
        { id: 'orange', name: 'כתום', image: '', type: 'skin' },
        { id: 'yellow', name: 'צהוב', image: '', type: 'skin' },
        { id: 'pink', name: 'ורוד', image: '', type: 'skin' },
        { id: 'cyan', name: 'טורקיז', image: '', type: 'skin' },
    ];


    const handleSelect = (item: Item) => {
        if (item.type === 'skin') {
            setLocalState((prev: any) => ({
                ...prev,
                skin: item.id
            }));
        }
    };

    const handleSave = () => {
        updateCharacterState(localState);
        navigate(-1);
    };

    const filteredItems = activeTab === 'skin' ? SKIN_COLORS : ITEMS.filter(item => item.type === activeTab);

    // Map skin IDs to actual colors for the UI circles
    const SKIN_UI_COLORS: Record<string, string> = {
        normal: 'bg-[#FFDBAC]',
        tan: 'bg-[#D2B48C]',
        blue: 'bg-blue-400',
        green: 'bg-green-400',
        red: 'bg-red-400',
        purple: 'bg-purple-400',
        orange: 'bg-orange-400',
        yellow: 'bg-yellow-400',
        pink: 'bg-pink-400',
        cyan: 'bg-cyan-400',
    };

    return (
        <MobileContainer className="min-h-screen relative flex flex-col"
        >

            {/* Header */}
            <div className="flex items-center justify-between p-6 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                >
                    <ChevronLeft className={isRTL ? 'rotate-180 text-gray-500' : 'text-gray-500'} size={24} />
                </button>
                <h1 className="text-2xl font-black text-black drop-shadow-md">מעצב דמות</h1>
                <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors font-black text-sm flex items-center gap-2"
                >
                    <Check size={20} />
                    <span>שמור</span>
                </button>
            </div>

            {/* Character Preview */}
            <div className="flex-1 flex flex-col items-center justify-center relative p-8">

                <div className="relative z-10 transform scale-[1.7] cursor-ns-resize">
                    <Character state={localState} width={240} />
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-t-[4rem] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.2)] p-8 pb-14 min-h-[400px]">
                <div className="flex justify-between mb-8 overflow-x-auto no-scrollbar gap-3 pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center p-4 rounded-[2rem] transition-all min-w-[80px] ${activeTab === tab.id
                                ? 'bg-pink-100 text-pink-600 scale-110 shadow-lg shadow-pink-100'
                                : 'bg-gray-50 text-gray-400 opacity-60'
                                }`}
                        >
                            <tab.icon size={28} />
                            <span className="text-[11px] mt-2 font-black tracking-tight whitespace-nowrap uppercase">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Items Grid */}
                <div className="pr-1">
                    <AnimatePresence mode="wait">
                        {filteredItems.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center justify-center py-16 text-gray-400 bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100"
                            >
                                <div className="bg-white p-4 rounded-3xl shadow-sm mb-4">
                                    <Sparkles className="text-pink-300" size={32} />
                                </div>
                                <p className="text-2xl font-black tracking-tight text-gray-400 uppercase italic">בקרוב מאוד!</p>
                                <p className="text-xs font-bold text-gray-300 mt-2 px-8 text-center leading-relaxed">אנחנו מעצבים פריטים חדשים שיתאימו בדיוק לסגנון שלך. הישארו מעודכנים!</p>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-4 gap-4">
                                {filteredItems.map((item) => {
                                    const isEquipped = localState[item.type] === item.id;
                                    return (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            whileTap={{ scale: 0.93 }}
                                            onClick={() => handleSelect(item)}
                                            className={`relative aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2 cursor-pointer transition-all ${isEquipped
                                                ? 'border-pink-400 bg-pink-50 shadow-md'
                                                : 'border-slate-100 bg-slate-50 hover:border-pink-200'
                                                }`}
                                        >
                                            {item.type === 'skin' ? (
                                                <div className={`w-10 h-10 rounded-full shadow-inner border-2 border-white ${SKIN_UI_COLORS[item.id] || 'bg-gray-200'}`} />
                                            ) : (
                                                <div className="w-10 h-10 flex items-center justify-center">
                                                    <img src={item.image} alt="" className="max-w-full max-h-full object-contain" />
                                                </div>
                                            )}
                                            <p className="text-[9px] text-gray-500 font-bold mt-2 text-center leading-tight">{item.name}</p>

                                            {/* Equipped badge */}
                                            {isEquipped && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 shadow-sm"
                                                >
                                                    <Check size={8} className="text-white" />
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </MobileContainer>
    );
};
