import React from 'react';
import { Scan, Sprout, CloudSun, Droplets, FileText } from 'lucide-react';

export default function KisanBottomNav({ activeTab, setActiveTab, lang = 'hi', kisanMode = true }) {
  if (!kisanMode) return null;
  const isHi = lang === 'hi';

  const quickNav = [
    {
      id: 'pearlmillet',
      label: isHi ? 'फसल डॉक्टर' : 'Crop Doctor',
      sub: isHi ? 'रोग पहचान' : 'Disease Diagnosis',
      icon: Scan
    },
    {
      id: 'market',
      label: isHi ? 'मिट्टी जाँच' : 'Soil Test',
      sub: isHi ? 'खाद व फसल' : 'Nutrients',
      icon: Sprout
    },
    {
      id: 'dashboard',
      label: isHi ? 'मौसम व स्प्रे' : 'Weather',
      sub: isHi ? 'बारिश रडार' : 'Rain Radar',
      icon: CloudSun
    },
    {
      id: 'irrigation',
      label: isHi ? 'सिंचाई' : 'Irrigation',
      sub: isHi ? 'जल प्रबंधन' : 'Water Plan',
      icon: Droplets
    },
    {
      id: 'farmerhub',
      label: isHi ? 'दवा पर्ची' : 'Prescription',
      sub: isHi ? 'प्रमाणित' : 'Official',
      icon: FileText
    }
  ];

  return (
    <nav aria-label="Quick Actions" className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-md px-2 py-1.5 sm:py-2">
      <div className="max-w-2xl mx-auto flex items-center justify-around gap-1">
        {quickNav.map((item) => {
          const IconComp = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition cursor-pointer select-none ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-50'
              }`}
            >
              <IconComp className={`w-5 h-5 mb-0.5 ${isActive ? 'text-white' : 'text-slate-600'}`} />
              <span className={`text-[11px] sm:text-xs font-bold tracking-tight leading-tight ${isActive ? 'text-white' : 'text-slate-800'}`}>
                {item.label}
              </span>
              <span className={`text-[9px] font-medium leading-none hidden sm:block ${isActive ? 'text-emerald-200' : 'text-slate-500'}`}>
                {item.sub}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
