import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Star, ChevronRight, X, TrendingUp, TrendingDown, Coffee, Music, Gift } from 'lucide-react';
import { Button } from '../components/ui';

export const PointsScreen = () => {
    const navigate = useNavigate();
    const { t, isRTL } = useApp();
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showRewards, setShowRewards] = useState(false);

    const pointsHistory = [
        { id: 1, title: 'סיום ריצת 5 ק״מ', date: '7 בפברואר, 2026', points: 150, type: 'earn' },
        { id: 2, title: 'אימון יוגה יומי', date: '6 בפברואר, 2026', points: 100, type: 'earn' },
        { id: 3, title: 'רכישת שובר מוזיקה', date: '5 בפברואר, 2026', points: -200, type: 'spend' },
        { id: 4, title: 'עמידה ביעד שבועי', date: '4 בפברואר, 2026', points: 200, type: 'earn' },
        { id: 5, title: 'אימון ריקוד 30 דקות', date: '3 בפברואר, 2026', points: 75, type: 'earn' },
    ];

    const rewards = [
        { id: 1, title: 'שובר לקפה', cost: 150, icon: <Coffee size={24} className="text-orange-500" />, color: 'bg-orange-100' },
        { id: 2, title: 'מינוי למוזיקה', cost: 200, icon: <Music size={24} className="text-purple-500" />, color: 'bg-purple-100' },
        { id: 3, title: 'כרטיס מתנה $10', cost: 500, icon: <Gift size={24} className="text-pink-500" />, color: 'bg-pink-100' },
        { id: 4, title: 'מינוי Pro', cost: 1000, icon: <Star size={24} className="text-yellow-500" />, color: 'bg-yellow-100' },
    ];

    return (
        <MobileContainer className="min-h-screen relative flex flex-col"
        >
            {/* Header */}
            <div className="p-6 pb-2 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 rounded-full text-gray-600">
                    <ArrowLeft size={24} className={isRTL ? "rotate-180" : ""} />
                </button>
                <span className="text-gray-800 font-bold text-lg">מעקב נקודות</span>
                <div className="w-10"></div>
            </div>

            <div className="flex-1 px-6 space-y-6 overflow-y-auto pb-24">
                <div className="bg-[#FCE7F3] rounded-3xl p-8 shadow-md border border-pink-100 flex flex-col items-center justify-center space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full -mr-10 -mt-10 opacity-10 blur-3xl"></div>
                    <span className="text-pink-600 font-bold uppercase tracking-wider text-xs">סה״כ נקודות צבורות</span>
                    <div className="flex items-center gap-3">
                        <Star className="text-yellow-500 fill-yellow-500" size={32} />
                        <span className="text-4xl font-black text-gray-800 tracking-tighter">2,450</span>
                    </div>

                    <button
                        onClick={() => setShowBreakdown(true)}
                        className="mt-6 px-8 py-3 bg-white text-pink-600 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-sm border border-pink-100"
                    >
                        פירוט נקודות <ChevronRight size={18} className={isRTL ? "rotate-180" : ""} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-gray-800">פעילויות אחרונות</h3>
                        <button onClick={() => setShowHistory(true)} className="text-sm font-bold text-pink-500 hover:text-pink-600 underline underline-offset-4">צפה בהכל</button>
                    </div>

                    <div className="bg-[#DBEAFE] rounded-[2.5rem] p-5 shadow-sm border border-blue-100 space-y-4">
                        {pointsHistory.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-2 border-b border-gray-100 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl shadow-inner ${item.type === 'earn' ? 'bg-green-100' : 'bg-red-100'}`}>
                                        {item.type === 'earn' ? <TrendingUp size={20} className="text-green-600" /> : <TrendingDown size={20} className="text-red-600" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{item.title}</p>
                                        <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">{item.date}</p>
                                    </div>
                                </div>
                                <span className={`font-black text-lg ${item.type === 'earn' ? 'text-green-600' : 'text-gray-500'}`}>
                                    {item.type === 'earn' ? '+' : ''}{item.points}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-gray-800">חנות הטבות</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {rewards.slice(0, 2).map((reward) => (
                            <div key={reward.id} className="bg-gray-50 p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-3 hover:scale-105 transition-transform cursor-pointer group">
                                <div className={`p-4 rounded-[1.5rem] ${reward.color} mb-1 group-hover:rotate-12 transition-transform shadow-inner`}>
                                    {reward.icon}
                                </div>
                                <span className="text-sm font-black text-gray-800">{reward.title}</span>
                                <div className="bg-yellow-100 px-3 py-1 rounded-full flex items-center gap-1.5 text-yellow-700 text-xs font-black">
                                    <Star size={14} fill="currentColor" />
                                    {reward.cost}
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button
                        onClick={() => setShowRewards(true)}
                        className="h-16 rounded-[2rem] bg-pink-100 text-pink-600 font-black text-lg shadow-sm hover:bg-pink-200 active:scale-95 transition-all mt-4"
                    >
                        לכל ההטבות והפרסים →
                    </Button>
                </div>
            </div>



            {/* Modals */}
            <AnimatePresence>
                {/* Breakdown Modal */}
                {showBreakdown && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    >
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-[3rem] p-8 w-full max-w-sm shadow-2xl relative">
                            <button onClick={() => setShowBreakdown(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full">
                                <X size={20} />
                            </button>
                            <h3 className="text-2xl font-black text-gray-800 mb-8 text-center tracking-tight">פירוט נקודות יומי</h3>
                            <div className="space-y-5">
                                <div className="flex justify-between text-sm"><span className="text-gray-500 font-bold">אימונים שהושלמו</span><span className="font-black text-green-600">+1200</span></div>
                                <div className="flex justify-between text-sm"><span className="text-gray-500 font-bold">יעדים שבועיים</span><span className="font-black text-green-600">+800</span></div>
                                <div className="flex justify-between text-sm"><span className="text-gray-500 font-bold">רצף יומי</span><span className="font-black text-green-600">+450</span></div>
                                <div className="flex justify-between text-sm"><span className="text-gray-500 font-bold">אתגרי בונוס</span><span className="font-black text-green-600">+350</span></div>
                                <div className="flex justify-between text-sm pt-4 border-t border-gray-100"><span className="text-gray-500 font-bold">נקודות שמומשו</span><span className="font-black text-red-500">-350</span></div>
                                <div className="flex justify-between text-2xl font-black pt-6 border-t-2 border-gray-800 text-gray-800"><span className="tracking-tight">סה״כ נקודות</span><span>2,450</span></div>
                            </div>
                            <Button fullWidth onClick={() => setShowBreakdown(false)} className="mt-10 h-16 rounded-2xl bg-purple-600 text-white font-black text-lg hover:bg-purple-700 shadow-xl">סגור</Button>
                        </motion.div>
                    </motion.div>
                )}

                {/* History Modal */}
                {showHistory && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    >
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-[3rem] p-8 w-full max-w-sm shadow-2xl relative max-h-[85vh] flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-gray-800 tracking-tight">היסטוריה מלאה</h3>
                                <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full"><X size={20} /></button>
                            </div>
                            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide">
                                {pointsHistory.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl shadow-sm ${item.type === 'earn' ? 'bg-green-100' : 'bg-red-100'}`}>
                                                {item.type === 'earn' ? <TrendingUp size={18} className="text-green-600" /> : <TrendingDown size={18} className="text-red-600" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">{item.title}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">{item.date}</p>
                                            </div>
                                        </div>
                                        <span className={`font-black text-lg ${item.type === 'earn' ? 'text-green-600' : 'text-gray-500'}`}>
                                            {item.type === 'earn' ? '+' : ''}{item.points}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <Button fullWidth onClick={() => setShowHistory(false)} className="mt-8 h-16 rounded-2xl bg-gray-800 text-white font-black text-lg hover:bg-black shadow-xl">חזרה</Button>
                        </motion.div>
                    </motion.div>
                )}

                {/* Rewards Modal */}
                {showRewards && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    >
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-[3rem] p-8 w-full max-w-sm shadow-2xl relative max-h-[85vh] flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-gray-800 tracking-tight">חנות הטבות</h3>
                                <button onClick={() => setShowRewards(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full"><X size={20} /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto pr-1 scrollbar-hide">
                                {rewards.map((reward) => (
                                    <div key={reward.id} className="bg-gray-50 p-6 rounded-[2rem] border-2 border-transparent hover:border-purple-200 transition-all cursor-pointer flex flex-col items-center text-center space-y-3 group shadow-sm hover:shadow-md">
                                        <div className={`p-4 rounded-[1.5rem] ${reward.color} mb-1 group-hover:rotate-12 transition-transform shadow-inner`}>
                                            {reward.icon}
                                        </div>
                                        <span className="text-sm font-black text-gray-800">{reward.title}</span>
                                        <div className="bg-yellow-100 px-3 py-1 rounded-full flex items-center gap-1.5 text-yellow-700 text-xs font-black">
                                            <Star size={14} fill="currentColor" />
                                            {reward.cost}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button fullWidth onClick={() => setShowRewards(false)} className="mt-8 h-16 rounded-2xl bg-purple-600 text-white font-black text-lg hover:bg-purple-700 shadow-xl">סיום קניה</Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MobileContainer>
    );
};
