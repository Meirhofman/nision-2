import React from 'react';
import { useApp } from '../context/AppContext';

export const MobileContainer = ({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const { isRTL } = useApp();

  return (
    <div
      className={`w-full max-w-md mx-auto min-h-[100dvh] min-h-screen relative shadow-xl flex flex-col overflow-hidden pt-safe pb-safe ${className.includes('bg-') ? className : `bg-[#fff5f7] ${className}`}`}
      style={style}
    >
      {children}
    </div>
  );
};
