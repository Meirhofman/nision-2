import React from 'react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../../components/MobileContainer';
import { Button } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { motion } from 'motion/react';
import { Globe } from 'lucide-react';

export const StepLanguage = () => {
  const navigate = useNavigate();
  const { t, setLanguage, language } = useApp();

  const handleLanguageSelect = (lang: 'en' | 'he') => {
    setLanguage(lang);
    setTimeout(() => {
        navigate('/questionnaire/username');
    }, 300);
  };

  return (
    <MobileContainer className="p-8 items-center justify-center space-y-12 bg-white">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col items-center space-y-4"
      >
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
           <Globe size={40} className="text-pink-300" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 text-center">{t('chooseLanguage')}</h1>
      </motion.div>

      <div className="w-full space-y-4 max-w-xs">
        <Button 
          fullWidth 
          variant={language === 'en' ? 'primary' : 'secondary'}
          onClick={() => handleLanguageSelect('en')}
          className="h-16 text-lg"
        >
          {t('english')}
        </Button>
        <Button 
          fullWidth 
          variant={language === 'he' ? 'primary' : 'secondary'}
          onClick={() => handleLanguageSelect('he')}
          className="h-16 text-lg font-hebrew"
        >
          {t('hebrew')}
        </Button>
      </div>
    </MobileContainer>
  );
};
