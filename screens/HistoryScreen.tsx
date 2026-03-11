import React from 'react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Clock, MapPin, Footprints, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const typeToKey: Record<string, string> = {
  Walking: 'walking', Running: 'running', Cycling: 'cycling', Yoga: 'yoga',
  Dance: 'dance', HIIT: 'hiit', Swimming: 'swimming',
};

const historyData = [
  { id: 1, dateKey: 'today', dateSuffix: '3:45', type: 'Walking', duration: "24 דק'", steps: '5,420', distance: '3.2 ק״מ', status: 'active' },
  { id: 2, dateKey: 'yesterday', dateSuffix: '17:20', type: 'Running', duration: "32 דק'", steps: '7,840', distance: '5.8 ק״מ', status: 'active' },
  { id: 3, dateKey: 'date', dateVal: '9.2', dateSuffix: '16:15', type: 'Cycling', duration: "45 דק'", distance: '12.5 ק״מ', status: 'active' },
  { id: 4, dateKey: 'date', dateVal: '8.2', dateSuffix: '18:30', type: 'Yoga', duration: "30 דק'", status: 'completed' },
  { id: 5, dateKey: 'date', dateVal: '7.2', dateSuffix: '7:00', type: 'Walking', duration: "28 דק'", steps: '6,240', distance: '3.8 ק״מ', status: 'active' },
  { id: 6, dateKey: 'date', dateVal: '6.2', dateSuffix: '17:45', type: 'Dance', duration: "40 דק'", calories: '320 קלוריות', status: 'active' },
  { id: 7, dateKey: 'date', dateVal: '5.2', dateSuffix: '8:00', type: 'Running', duration: "25 דק'", steps: '4,500', distance: '3.5 ק״מ', status: 'active' },
  { id: 8, dateKey: 'date', dateVal: '4.2', dateSuffix: '18:00', type: 'HIIT', duration: "20 דק'", calories: '280 קלוריות', status: 'completed' },
  { id: 9, dateKey: 'date', dateVal: '3.2', dateSuffix: '17:15', type: 'Walking', duration: "35 דק'", steps: '6,800', distance: '4.2 ק״מ', status: 'active' },
  { id: 10, dateKey: 'date', dateVal: '2.2', dateSuffix: '9:00', type: 'Swimming', duration: "45 דק'", distance: '1.2 ק״מ', status: 'active' },
  { id: 11, dateKey: 'date', dateVal: '1.2', dateSuffix: '16:30', type: 'Cycling', duration: "50 דק'", distance: '15.0 ק״מ', status: 'active' },
];

export const HistoryScreen = () => {
  const navigate = useNavigate();
  const { t } = useApp();

  return (
    <MobileContainer className="min-h-screen flex flex-col relative">
      {/* Header */}
      <div className="p-6 pb-2 pt-12 flex items-center relative justify-center bg-white/50 backdrop-blur-sm z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:bg-gray-50"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">{t('workoutHistory')}</h1>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 [&::-webkit-scrollbar]:hidden pb-24">
        {historyData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100/50"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-gray-400 text-xs font-medium mb-1">
                  {item.dateKey === 'today' ? `${t('today')}, ${item.dateSuffix}` : item.dateKey === 'yesterday' ? `${t('yesterday')}, ${item.dateSuffix}` : `${item.dateVal}, ${item.dateSuffix}`}
                </p>
                <h3 className="text-xl font-bold text-slate-800">{typeToKey[item.type] ? t(typeToKey[item.type]) : item.type}</h3>
              </div>
              <div className="bg-[#f3e8ff] text-[#9333ea] px-3 py-1 rounded-xl text-xs font-bold">
                {item.duration}
              </div>
            </div>

            <div className="flex gap-3">
              {item.status === 'completed' ? (
                <div className="flex items-center gap-2 bg-[#ecfdf5] px-3 py-2 rounded-xl border border-green-100">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-sm font-medium text-gray-600">{t('completed')}</span>
                </div>
              ) : (
                <>
                  {item.steps && (
                    <div className="flex items-center gap-2 bg-[#ecfdf5] px-3 py-2 rounded-xl border border-green-100 min-w-[100px]">
                      <Footprints size={16} className="text-green-500/70" />
                      <span className="text-sm font-medium text-gray-600">{item.steps}</span>
                    </div>
                  )}
                  {item.distance && (
                    <div className="flex items-center gap-2 bg-[#ecfdf5] px-3 py-2 rounded-xl border border-green-100 min-w-[100px]">
                      <MapPin size={16} className="text-green-500/70" />
                      <span className="text-sm font-medium text-gray-600">{item.distance}</span>
                    </div>
                  )}
                   {item.calories && !item.steps && !item.distance && (
                    <div className="flex items-center gap-2 bg-[#ecfdf5] px-3 py-2 rounded-xl border border-green-100 min-w-[100px]">
                      <span className="text-sm font-medium text-gray-600">{item.calories}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      

    </MobileContainer>
  );
};
