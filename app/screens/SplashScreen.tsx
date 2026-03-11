import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { useNavigate } from 'react-router';
import { Logo } from '../components/Icons';
import { Button, Input } from '../components/ui';
import { useApp } from '../context/AppContext';
import { MobileContainer } from '../components/MobileContainer';
import { X } from 'lucide-react';
import { Character } from '../components/Character';

export const SplashScreen = () => {
  const navigate = useNavigate();
  const { t } = useApp();
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'growing' | 'shrinking' | 'completed'>('initial');
  const [showLogin, setShowLogin] = useState(false);
  const [loginMode, setLoginMode] = useState<'returning' | 'new'>('returning');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'welcome' | 'gettingStarted' | 'changeDetails'>('welcome');
  const { characterState } = useApp();

  useEffect(() => {
    // Sequence of animations
    const growTimer = setTimeout(() => {
      setAnimationPhase('growing');
    }, 1000); // Wait 1s before growing

    const shrinkTimer = setTimeout(() => {
      setAnimationPhase('shrinking');
    }, 3000); // Grow for 2s

    const completeTimer = setTimeout(() => {
      setAnimationPhase('completed');
      setShowLogin(true);
    }, 4500); // Shrink for 1.5s

    return () => {
      clearTimeout(growTimer);
      clearTimeout(shrinkTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  const handleLogin = () => {
    setModalType('welcome');
    setShowModal(true);
  };

  const handleCreateAccount = () => {
    setLoginMode('new');
    setModalType('gettingStarted');
    setShowModal(true);
  };

  const handleModalContinue = () => {
    if (modalType === 'welcome') {
      navigate('/main');
    } else if (modalType === 'gettingStarted') {
      setModalType('changeDetails');
    } else if (modalType === 'changeDetails') {
      navigate('/language');
    }
    if (modalType !== 'gettingStarted') {
      setShowModal(false);
    }
  };

  // Variants for the character hero animation
  const characterHeroVariants: Variants = {
    initial: { scale: 0.8, opacity: 1, y: 0 },
    growing: {
      scale: 1.2,
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        type: "spring",
        bounce: 0.5
      }
    },
    shrinking: {
      scale: 0.8,
      y: -220,
      transition: {
        duration: 1.2,
        ease: "easeInOut"
      }
    },
    completed: { scale: 0.8, y: -220 }
  };


  // We need to be careful with the "growing" phase. 
  // If the heart grows too big, it covers everything. 
  // The background is pink, so maybe we just expand the background?
  // The prompt says "Grows to fill the screen, background turns pink (matching the heart)".
  // Then "Shrinks and moves to the top".

  return (
    <MobileContainer className="flex flex-col items-center justify-center relative">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-[#ffb6c1] z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: animationPhase === 'growing' ? 1 : (animationPhase === 'shrinking' || animationPhase === 'completed') ? 0 : 0 }}
        transition={{ duration: 1 }}
      />

      {/* Hero Character Animation */}
      <motion.div
        variants={characterHeroVariants}
        initial="initial"
        animate={animationPhase}
        className="z-20 relative flex flex-col items-center justify-center"
      >
        <Character state={characterState} size="xl" />
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: (animationPhase === 'shrinking' || animationPhase === 'completed') ? 1 : 0 }}
          className="text-4xl font-black text-gray-800 mt-4 tracking-tighter"
        >
          LAZOZ
        </motion.h2>
      </motion.div>

      {/* Login Form Container - Fades in after animation */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 mt-10 w-full max-w-sm px-8 flex flex-col space-y-4 z-20"
          >
            <Input placeholder={t('userName')} type="text" />
            {loginMode === 'returning' && (
              <Input placeholder={t('password')} type="password" />
            )}

            {loginMode === 'returning' ? (
              <>
                <Button onClick={handleLogin} fullWidth>{t('login')}</Button>
                <Button variant="secondary" onClick={() => setLoginMode('new')} fullWidth>{t('createAccount')}</Button>
              </>
            ) : (
              <>
                <Button onClick={handleCreateAccount} fullWidth>{t('next')}</Button>
                <Button variant="secondary" onClick={() => setLoginMode('returning')} fullWidth>{t('login')}</Button>
              </>
            )}

            <div className="relative flex items-center w-full py-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm">{t('orLoginWith')}</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full">
              <Button variant="social" onClick={handleLogin}>
                {/* Google Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              </Button>
              <Button variant="social" onClick={handleLogin}>
                {/* Facebook Icon */}
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.606.492-2.606 1.691v1.889h4.196l-.66 3.667h-3.536v7.979A11.96 11.96 0 0 0 24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.628 3.887 10.33 9.101 11.691Z" /></svg>
              </Button>
              <Button variant="social" onClick={handleLogin}>
                {/* Apple Icon */}
                <svg className="w-5 h-5" fill="black" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" /></svg>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popups */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm space-y-4 shadow-xl text-center"
            >
              <div className="flex justify-end">
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="py-4">
                <p className="text-xl font-bold text-gray-800">
                  {modalType === 'welcome' && t('welcomeBack')}
                  {modalType === 'gettingStarted' && t('gettingStarted')}
                  {modalType === 'changeDetails' && t('changeLater')}
                </p>
              </div>
              <Button fullWidth onClick={handleModalContinue}>{t('continue')}</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileContainer>
  );
};
