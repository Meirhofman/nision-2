import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { useApp } from '../context/AppContext';
import { ChevronDown, Clock, Footprints, MapPin, Play, History, Calendar, Share2, BarChart2, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui';

const ProgressStar = ({ percentage }: { percentage: number }) => {
  const [currentFill, setCurrentFill] = useState(0);

  useEffect(() => {
    // Animate from 0 to percentage
    const timer = setTimeout(() => {
      setCurrentFill(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
        <defs>
          <linearGradient id="starGradient" x1="0" x2="0" y1="1" y2="0">
            <stop offset={`${currentFill}%`} stopColor="#fbbf24" />
            <stop offset={`${currentFill}%`} stopColor="#e5e7eb" />
          </linearGradient>
          <clipPath id="starClip">
            <path d="M50 0L61 35H98L68 57L79 91L50 70L21 91L32 57L2 35H39L50 0Z" />
          </clipPath>
        </defs>

        {/* Background Star (Stroke) */}
        <path
          d="M50 0L61 35H98L68 57L79 91L50 70L21 91L32 57L2 35H39L50 0Z"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Filled Star */}
        <path
          d="M50 0L61 35H98L68 57L79 91L50 70L21 91L32 57L2 35H39L50 0Z"
          fill="url(#starGradient)"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeLinejoin="round"
          className="transition-all duration-[2000ms] ease-out"
        />
      </svg>
    </div>
  );
};

export const WorkoutsScreen = () => {
  const navigate = useNavigate();
  const { t, isRTL, userData } = useApp();
  const suggestedType = (() => {
    const g = userData?.goal;
    if (g === 'loseWeight') return 'הליכה';
    if (g === 'buildMuscle') return 'אימון כוח';
    if (g === 'improveEndurance') return 'ריצה';
    if (g === 'flexibility') return 'יוגה';
    return 'הליכה';
  })();
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [workoutType, setWorkoutType] = useState(suggestedType);
  const [progress, setProgress] = useState(60);

  const handleShare = async () => {
    const shareData = {
      title: 'האימון שלי 🏃‍♂️',
      text: `היום עשיתי ${progress} מהיעד שלי! הצטרפו אליי לאימון ${workoutType} 🎯`,
      url: window.location.origin
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('הקישור הועתק ללוח! שתף אותו עם חברים 🔥');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const workoutTypes = [
    'הליכה', 'ריצה', 'רכיבה על אופניים', 'יוגה', 'שחייה', 'ריקוד',
    'פילאטיס', 'HIIT', 'אימון כוח', 'טיולים', 'קיקבוקסינג', 'קפיצה בחבל',
    'אליפטיקל', 'חתירה', 'מתיחות'
  ];

  return (
    <MobileContainer className="min-h-screen relative flex flex-col"
    >
      {/* Header */}
      <div className="p-4 pb-0 relative">
        <button
          onClick={() => navigate('/main')}
          className="absolute top-6 left-6 p-2 bg-gray-100 rounded-full text-gray-600 shadow-sm border border-gray-200 z-10 rtl:left-auto rtl:right-6"
        >
          {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        <div className="flex items-center justify-center mb-4 pt-2">
          <p className="text-gray-800 font-bold text-lg">מרכז האימונים</p>
        </div>

        <div className="space-y-1 mt-2">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">מה עושים היום?</p>
          <button
            onClick={() => setShowTypeModal(true)}
            className="w-full bg-gray-50 rounded-2xl p-5 flex items-center justify-between shadow-sm border border-gray-100 group active:scale-95 transition-all"
          >
            <span className="font-black text-xl text-gray-800 tracking-tight">{workoutType}</span>
            <div className="bg-orange-100 p-2 rounded-xl group-hover:rotate-180 transition-transform">
              <ChevronDown className="text-orange-600" size={24} />
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-4 space-y-3 overflow-y-auto [&::-webkit-scrollbar]:hidden pt-2">

        {/* Star Progress - no background per request */}
        <div className="flex flex-col items-center justify-center p-4 rounded-[2.5rem] w-full">
          <ProgressStar percentage={68} />
          <div className="text-center mt-2">
            <h2 className="text-5xl font-black text-gray-800 tracking-tighter">5,420</h2>
            <p className="text-gray-500 font-bold mt-1">{t('stepsOf')} {(userData?.fitness === 'advanced' ? 10000 : userData?.fitness === 'intermediate' ? 9000 : 8000).toLocaleString()} {t('steps')}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 w-full">
          <div className="bg-[#DCFCE7] rounded-3xl p-4 flex flex-col items-center justify-center space-y-1 shadow-md border border-green-100">
            <Clock size={24} className="text-green-600 mb-1" />
            <span className="text-xl font-black text-gray-800 tracking-tighter">24m</span>
            <span className="text-[10px] font-black text-gray-400 uppercase">זמן פעילות</span>
          </div>
          <div className="bg-[#DCFCE7] rounded-3xl p-4 flex flex-col items-center justify-center space-y-1 shadow-md border border-green-100">
            <Footprints size={24} className="text-green-600 mb-1" />
            <span className="text-xl font-black text-gray-800 tracking-tighter">5,420</span>
            <span className="text-[10px] font-black text-gray-400 uppercase">צעדים</span>
          </div>
          <div className="bg-[#DCFCE7] rounded-3xl p-4 flex flex-col items-center justify-center space-y-1 shadow-md border border-green-100">
            <MapPin size={24} className="text-green-600 mb-1" />
            <span className="text-xl font-black text-gray-800 tracking-tighter">3.2</span>
            <span className="text-[10px] font-black text-gray-400 uppercase">מרחק (ק״מ)</span>
          </div>
        </div>

        {/* Start Button */}
        <Button
          className="w-full h-20 bg-[#FCE7F3] text-pink-600 rounded-3xl shadow-lg flex flex-row items-center justify-center gap-3 active:scale-95 transition-all border-4 border-pink-100"
        >
          <div className="bg-pink-500 p-2 rounded-full text-white shadow-md">
            <Play fill="currentColor" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tight">התחל אימון {workoutType}</span>
        </Button>

        {/* Grid Options */}
        <div className="grid grid-cols-2 gap-3 w-full pb-20">
          <button onClick={() => navigate('/history')} className="bg-[#DBEAFE] p-5 rounded-3xl shadow-md border border-blue-100 flex flex-col items-center justify-center gap-2 h-24 hover:bg-blue-200 transition-all group">
            <History className="text-blue-600 group-hover:rotate-12 transition-transform" size={28} />
            <span className="text-xs font-black text-blue-700">היסטוריית אימונים</span>
          </button>
          <button className="bg-[#DBEAFE] p-5 rounded-3xl shadow-md border border-blue-100 flex flex-col items-center justify-center gap-2 h-24 hover:bg-blue-200 transition-all group" title={t('scheduleWorkout')}>
            <Calendar className="text-blue-600 group-hover:rotate-12 transition-transform" size={28} />
            <span className="text-xs font-black text-blue-700">{t('scheduleWorkout')}</span>
          </button>
          <button onClick={handleShare} className="bg-[#DBEAFE] p-5 rounded-3xl shadow-md border border-blue-100 flex flex-col items-center justify-center gap-2 h-24 hover:bg-blue-200 transition-all group" title={t('shareWithFriends')}>
            <Share2 className="text-blue-600 group-hover:rotate-12 transition-transform" size={28} />
            <span className="text-xs font-black text-blue-700">{t('shareWithFriends')}</span>
          </button>
          <button onClick={() => navigate('/summary')} className="bg-[#DBEAFE] p-5 rounded-3xl shadow-md border border-blue-100 flex flex-col items-center justify-center gap-2 h-24 hover:bg-blue-200 transition-all group">
            <BarChart2 className="text-blue-600 group-hover:rotate-12 transition-transform" size={28} />
            <span className="text-xs font-black text-blue-700">סיכום ביצועים</span>
          </button>
        </div>
      </div>


      {/* Workout Type Modal */}
      <AnimatePresence>
        {showTypeModal && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTypeModal(false)}
            className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
          />
        )}
        {showTypeModal && (
          <motion.div
            key="modal"
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            className="absolute top-[120px] left-6 right-6 bg-white rounded-2xl z-50 shadow-xl border border-gray-100 overflow-hidden max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex flex-col">
              {workoutTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setWorkoutType(type);
                    setShowTypeModal(false);
                  }}
                  className={`p-4 text-left font-medium hover:bg-pink-50 transition-colors ${workoutType === type ? 'bg-pink-50 text-pink-600' : 'text-gray-700'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileContainer>
  );
};
