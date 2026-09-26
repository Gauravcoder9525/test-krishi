import React from 'react';
import { PhoneCall, ShieldCheck, Sprout, Heart } from 'lucide-react';

export default function Footer({ lang, t, setActiveTab }) {
  return (
    <footer className="bg-emerald-950 text-white pt-12 pb-8 border-t border-emerald-900">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        
        {/* Top Emergency / Helpline Strip */}
        <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
                {lang === 'en' ? 'National Agri-Expert Helpline' : 'राष्ट्रीय किसान सहायता हेल्पलाइन'}
              </p>
              <p className="text-sm sm:text-base font-extrabold text-white">
                {t.kisanCallCenter} (24x7 Free)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('schemes')}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl border border-emerald-600 transition"
            >
              {lang === 'en' ? 'Explore Govt Schemes' : 'सरकारी योजनाएं देखें'}
            </button>
            <button
              onClick={() => setActiveTab('risk')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition"
            >
              {lang === 'en' ? 'Report Crop Issue' : 'फसल समस्या बताएं'}
            </button>
          </div>
        </div>

        {/* Quick Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-emerald-200/80">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white font-extrabold text-base">
              <img 
                src="/logo.png" 
                alt="KrishiAI" 
                className="w-7 h-7 rounded-lg object-cover border border-emerald-400/40 shadow-xs" 
              />
              <span>KrishiAI Platform</span>
            </div>
            <p className="text-emerald-300/70 leading-relaxed">
              {lang === 'en'
                ? 'Empowering Indian farmers with precision AI insights, weather prediction, crop health protection, and community water optimization.'
                : 'भारतीय किसान भाइयों के लिए एआई आधारित स्मार्ट कृषि सलाह, मौसम पूर्वानुमान, रोग नियंत्रण और साझा जल प्रबंधन।'}
            </p>
          </div>

          <div>
            <p className="text-white font-bold text-sm mb-3">
              {lang === 'en' ? 'Core Intelligence' : 'प्रमुख सुविधाएं'}
            </p>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveTab('pearlmillet')} className="hover:text-white transition">{t.navPearlMillet}</button></li>
              <li><button onClick={() => setActiveTab('recommendation')} className="hover:text-white transition">{t.navGrow}</button></li>
              <li><button onClick={() => setActiveTab('risk')} className="hover:text-white transition">{t.navGuardian}</button></li>
              <li><button onClick={() => setActiveTab('irrigation')} className="hover:text-white transition">{t.navWater}</button></li>
              <li><button onClick={() => setActiveTab('market')} className="hover:text-white transition">{t.navMarket}</button></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-bold text-sm mb-3">
              {lang === 'en' ? 'Govt Direct Benefits' : 'सरकारी सेवाएं'}
            </p>
            <ul className="space-y-2">
              <li><a href="https://pmkisan.gov.in/" target="_blank" rel="noreferrer" className="hover:text-white transition">PM-KISAN Samman Nidhi</a></li>
              <li><a href="https://pmfby.gov.in/" target="_blank" rel="noreferrer" className="hover:text-white transition">PM Fasal Bima (PMFBY)</a></li>
              <li><a href="https://pmksy.gov.in/" target="_blank" rel="noreferrer" className="hover:text-white transition">Micro-Irrigation Subsidy</a></li>
              <li><a href="https://enam.gov.in/" target="_blank" rel="noreferrer" className="hover:text-white transition">e-NAM National Agriculture Market</a></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-bold text-sm mb-3">
              {lang === 'en' ? 'Scientific Disclaimer' : 'वैज्ञानिक अस्वीकरण'}
            </p>
            <p className="text-emerald-300/70 leading-relaxed">
              {t.disclaimer}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-400">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-2">
            <span>Made with precision for Indian Agriculture</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
          </div>
        </div>

      </div>
    </footer>
  );
}
