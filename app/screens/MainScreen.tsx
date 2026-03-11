import React from 'react';
import { motion, Variants, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { useApp } from '../context/AppContext';
import { Settings, Star, Utensils, Users, Dumbbell, Sparkles } from 'lucide-react';
import { Character } from '../components/Character';

export const MainScreen = () => {
  const { t, points, characterState, currentUser, userData, language, darkMode } = useApp();
  const navigate = useNavigate();

  const [showTutorial, setShowTutorial] = React.useState(false);
  const [tutorialStep, setTutorialStep] = React.useState(0);

  React.useEffect(() => {
    // Check if user has completed the questionnaire
    const hasCompletedQuestionnaire = userData?.goal && userData?.fitness && 
      (userData?.medicalConditions || userData?.allergies !== undefined);
    
    console.log('=== MAIN SCREEN DEBUG ===');
    console.log('userData:', userData);
    console.log('hasCompletedQuestionnaire:', hasCompletedQuestionnaire);
    console.log('goal:', userData?.goal);
    console.log('fitness:', userData?.fitness);
    console.log('medicalConditions:', userData?.medicalConditions);
    console.log('allergies:', userData?.allergies);
    console.log('==========================');
    
    if (!hasCompletedQuestionnaire) {
      // Redirect to questionnaire if not completed
      navigate('/questionnaire/language');
      return;
    }

    const hasSeenTutorial = localStorage.getItem('hasSeenMainTutorial_v2');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, [userData, navigate]);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem('hasSeenMainTutorial_v2', 'true');
  };

  const tutorialSteps = [
    {
      title: t('tutorialTitle1'),
      description: t('tutorialDesc1'),
      target: "character"
    },
    {
      title: t('tutorialTitle2'),
      description: t('tutorialDesc2'),
      target: "character"
    },
    {
      title: t('tutorialTitle3'),
      description: t('tutorialDesc3'),
      target: "buttons"
    }
  ];

  const floatingVariant: Variants = {
    animate: (custom: number) => ({
      y: [0, -6, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: custom * 0.4,
      },
    }),
  };

  const isRTL = language === 'he';

  return (
    <MobileContainer className={`min-h-screen relative flex flex-col ${darkMode ? 'bg-slate-900' : ''}`}>

      {/* Header */}
      <div className="flex items-center justify-between p-6 w-full absolute top-0 left-0 right-0 z-20">
        <button
          onClick={() => navigate('/settings')}
          className={`p-3 rounded-full shadow-lg transition-colors border ${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-gray-100 hover:bg-gray-50'}`}
        >
          <Settings className={darkMode ? 'text-gray-300' : 'text-gray-500'} size={24} />
        </button>

        <div
          onClick={() => navigate('/points')}
          className={`flex items-center rounded-full px-6 py-2.5 shadow-lg space-x-3 border cursor-pointer transition-colors ${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-gray-100 hover:bg-gray-50'}`}
        >
          <span className={`font-black text-lg mr-2 ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>{points}</span>
          <Star className="text-yellow-400 fill-yellow-400" size={20} />
        </div>
      </div>

      {/* Main Content Area - scrollable on small screens */}
      <div className="flex-1 flex flex-col items-center justify-start relative w-full px-4 pt-20 pb-8 overflow-y-auto overflow-x-hidden min-h-0">

        {/* Welcome Text */}
        <div className="w-full text-center z-10 mb-4">
          <h2 className="text-3xl font-black text-gray-800 dark:text-gray-100 mb-1 tracking-tight">
            {(userData?.displayName || currentUser?.displayName)
              ? t('welcomeBackUser').replace('{name}', (userData?.displayName || currentUser?.displayName || '').split(' ')[0])
              : (t('welcomeBack') || "ברוך שובך!")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold text-base">
            {t('readyForGoals') || "מוכן ליעדים היומיים שלך?"}
          </p>
        </div>

        {/* Character Area */}
        <motion.div
          custom={1.5}
          variants={floatingVariant}
          animate="animate"
          className="relative z-10 w-full aspect-square flex flex-col items-center justify-center cursor-pointer group"
          onClick={() => navigate('/character')}
        >
          <div className="relative z-10 transform scale-[0.8] mt-[-20px]">
            <Character state={characterState} size="xl" width={220} />
          </div>

          {/* Floating Sparkles Button */}
          <div className="absolute top-10 right-4 bg-yellow-400 text-white p-4 rounded-full shadow-2xl z-30 group-hover:scale-110 transition-transform border-4 border-white/30">
            <Sparkles size={32} />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-3 gap-3 mt-4 relative">
          {/* Social */}
          <motion.div
            custom={0}
            variants={floatingVariant}
            animate="animate"
            onClick={() => navigate('/social')}
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            <div className="w-full aspect-square bg-[#B2F2BB] rounded-2xl flex items-center justify-center shadow-lg group-hover:opacity-80 transition-all relative overflow-hidden">
              <Users className="text-green-600" size={32} />
            </div>
            <span className={`font-bold text-[11px] truncate w-full text-center uppercase tracking-tighter ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>{t('social')}</span>
          </motion.div>

          {/* Workouts */}
          <motion.div
            custom={1}
            variants={floatingVariant}
            animate="animate"
            onClick={() => navigate('/workouts')}
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            <div className="w-full aspect-square bg-[#BDE0FE] rounded-2xl flex items-center justify-center shadow-lg group-hover:opacity-80 transition-all relative overflow-hidden">
              <Dumbbell className="text-blue-600" size={32} />
            </div>
            <span className={`font-bold text-[11px] truncate w-full text-center uppercase tracking-tighter ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>{t('workouts')}</span>
          </motion.div>

          {/* Nutrition */}
          <motion.div
            custom={2}
            variants={floatingVariant}
            animate="animate"
            onClick={() => navigate('/nutrition')}
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            <div className="w-full aspect-square bg-[#FFD1DC] rounded-2xl flex items-center justify-center shadow-lg group-hover:opacity-80 transition-all relative overflow-hidden">
              <Utensils className="text-pink-600" size={32} />
            </div>
            <span className={`font-bold text-[11px] truncate w-full text-center uppercase tracking-tighter ${darkMode ? 'text-slate-200' : 'text-gray-700'}`}>{t('nutrition')}</span>
          </motion.div>
        </div>

        {/* Tutorial Overlay — responds to selected language */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className={`rounded-[2rem] p-8 shadow-2xl text-center max-w-sm w-full ${darkMode ? 'bg-slate-800' : 'bg-white'}`}
                onClick={(e) => e.stopPropagation()}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <div className="text-5xl mb-4">
                  {tutorialStep === 0 ? '👋' : tutorialStep === 1 ? '👤' : '🛠️'}
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-slate-100' : 'text-gray-800'}`}>
                  {tutorialSteps[tutorialStep].title}
                </h3>
                <p className={`mb-8 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                  {tutorialSteps[tutorialStep].description}
                </p>

                <div className="flex gap-3">
                  {tutorialStep > 0 && (
                    <button
                      onClick={() => setTutorialStep(prev => prev - 1)}
                      className="flex-1 py-4 rounded-xl bg-gray-100 text-gray-500 font-bold"
                    >
                      {t('back')}
                    </button>
                  )}
                  {tutorialStep < tutorialSteps.length - 1 ? (
                    <button
                      onClick={() => setTutorialStep(prev => prev + 1)}
                      className="flex-[2] py-4 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold shadow-lg"
                    >
                      {t('continue')}
                    </button>
                  ) : (
                    <button
                      onClick={handleTutorialComplete}
                      className="flex-[2] py-4 rounded-xl bg-green-500 text-white font-bold shadow-lg"
                    >
                      {t('tutorialGotIt')}
                    </button>
                  )}
                </div>

                {/* Steps Dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {tutorialSteps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === tutorialStep ? 'w-6 bg-pink-500' : 'w-1.5 bg-gray-200'}`}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileContainer>
  );
};