import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { QuestionLayout } from './QuestionLayout';
import { useApp } from '../../context/AppContext';
import { NumberInput } from '../../components/NumberInput';

export const StepAge = () => {
  const navigate = useNavigate();
  const { t, updateUserData, userData } = useApp();
  const [age, setAge] = useState<number>(userData.age || 14);

  const handleNext = () => {
    updateUserData({ age });
    navigate('/questionnaire/weight-height');
  };

  return (
    <QuestionLayout 
      title={t('ageQuestion')} 
      onNext={handleNext}
      canNext={age > 0}
      showBack={true}
    >
      <div className="flex flex-col items-center justify-center space-y-4 w-full">
        <NumberInput 
          value={age} 
          onChange={setAge} 
          min={5} 
          max={20} 
          label={t('ageQuestion')} 
          suffix={t('yearsOld')} 
        />
      </div>
    </QuestionLayout>
  );
};
