import React, { useState } from 'react';
import {
  Sprout,
  ShieldAlert,
  Droplets,
  Play,
  ChevronRight,
  ShieldCheck,
  Info,
  Activity,
  Scan,
  CloudRain,
  Layers,
  Database
} from 'lucide-react';
import heroBgImage from '../../assets/hero-bg.jpg';

export default function LandingTab({ lang, t, setActiveTab, loadDemoFarm }) {
  const isHi = lang === 'hi';
  const [showStatsInfo, setShowStatsInfo] = useState(false);

  return (
    <div className="space-y-16 pb-20">

      {/* Hero Section with Clean Human-Made Agricultural Background */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-20 sm:pb-28 bg-slate-950">

        {/* Full-bleed Background Image with Grounded Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgImage}
            alt="Indian crop field at sunrise"
            className="w-full h-full object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/70 via-transparent to-slate-950/60"></div>
        </div>

        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">

          {/* Top Label Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-emerald-950 text-emerald-300 text-xs sm:text-sm font-semibold border border-emerald-500/40 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.heroBadge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            {t.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
            {t.heroSub}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
            <button
              onClick={() => setActiveTab('login')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-md border border-emerald-500/30 transition flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg className="w-4 h-4 flex-shrink-0 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{lang === 'en' ? 'Sign in with Google Mail' : 'Google खाते से सीधा लॉगिन करें'}</span>
            </button>

            <button
              onClick={loadDemoFarm}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm transition shadow-sm border border-slate-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-emerald-800 text-emerald-800" />
              <span>{t.ctaStart}</span>
            </button>
          </div>

          {/* Verified Farm Telemetry Summary Card */}
          <div className="mt-10 max-w-4xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-xl p-5 sm:p-7 text-left space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                    {lang === 'en' ? 'Agronomic Decision Support' : 'कृषि निर्णय सहायता'}
                  </p>
                  <h3 className="text-base font-bold text-slate-900">
                    {lang === 'en' ? 'Operational Farm Overview (Ghaziabad District)' : 'खेत अवलोकन (गाजियाबाद जिला)'}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-md border border-emerald-200">
                  Active Station
                </span>
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-md transition"
                >
                  {lang === 'en' ? 'Open Dashboard' : 'डैशबोर्ड खोलें'} -&gt;
                </button>
              </div>
            </div>

            {/* Factual Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">{t.cropHealthTitle}</p>
                <div className="flex items-center gap-1.5 mt-1 text-emerald-800 font-bold text-lg">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>Healthy</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Vegetative Stage</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">{t.weatherTitle}</p>
                <div className="flex items-center gap-1.5 mt-1 text-slate-800 font-bold text-lg">
                  <CloudRain className="w-5 h-5 text-blue-600" />
                  <span>26°C</span>
                </div>
                <p className="text-[11px] text-blue-700 font-medium mt-0.5">Rain Expected</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Spraying Advisory</p>
                <div className="flex items-center gap-1.5 mt-1 text-amber-800 font-bold text-lg">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <span>Hold Spray</span>
                </div>
                <p className="text-[11px] text-amber-700 font-medium mt-0.5">High wash-off risk</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">{t.waterAvailTitle}</p>
                <div className="flex items-center gap-1.5 mt-1 text-slate-800 font-bold text-lg">
                  <Droplets className="w-5 h-5 text-sky-600" />
                  <span>72%</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Adequate Moisture</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Core Agricultural Tools Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'en' ? 'Core Agricultural Modules' : 'कृषि निर्णय के प्रमुख स्तंभ'}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {lang === 'en'
              ? 'Field-tested tools designed for Indian agronomic conditions, localized weather patterns, and crop disease management.'
              : 'भारतीय परिस्थितियों, स्थानीय मौसम चक्र और फसल सुरक्षा के लिए तैयार की गई वैज्ञानिक सुविधाएं।'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Card 1: Plant Disease Diagnosis */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
                <Scan className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.pearlMilletModuleTitle}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t.pearlMilletModuleSub}</p>
            </div>
            <button
              onClick={() => {
                setActiveTab('pearlmillet');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-6 w-full py-2.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{t.btnViewPearlMillet}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Card 2: Field Sensor Telemetry */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.recModuleTitle}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t.recModuleSub}</p>
            </div>
            <button
              onClick={() => {
                setActiveTab('recommendation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-6 w-full py-2.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{t.btnGetRecommendation}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Card 3: Crop Guardian Risk Assessment */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center border border-rose-200">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.riskModuleTitle}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t.riskModuleSub}</p>
            </div>
            <button
              onClick={() => {
                setActiveTab('pearlmillet');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-6 w-full py-2.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{t.btnCheckHealth}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Card 4: Irrigation Management */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center border border-sky-200">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.waterModuleTitle}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t.waterModuleSub}</p>
            </div>
            <button
              onClick={() => {
                setActiveTab('irrigation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-6 w-full py-2.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{t.btnViewWater}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

        </div>
      </section>

      {/* Factual System Capabilities & Standards Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="bg-emerald-950 rounded-2xl p-6 sm:p-10 text-white border border-emerald-900">

          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-emerald-900">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                {isHi ? 'प्रणाली विनिर्देश एवं मानक' : 'Platform Standards & Technical Architecture'}
              </span>
            </div>
            <button
              onClick={() => setShowStatsInfo(!showStatsInfo)}
              className="text-xs text-emerald-200 hover:text-white font-medium flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-900 border border-emerald-800 transition cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showStatsInfo ? (isHi ? 'संक्षिप्त विवरण' : 'Hide Technical Details') : (isHi ? 'तकनीकी विवरण देखें' : 'View Technical Details')}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-900">
            {/* 1. MobileNetV3 42 Classes */}
            <div className="pt-3 md:pt-0 space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                42 Classes
              </p>
              <p className="text-xs sm:text-sm text-emerald-200 font-semibold">
                {isHi ? 'पादप रोग श्रेणियां' : 'Crop Disease Classes'}
              </p>
              <p className="text-[11px] text-emerald-400">
                {isHi ? 'पायटॉर्च MobileNetV3 मॉडल' : 'PyTorch MobileNetV3'}
              </p>
            </div>

            {/* 2. 4 Major Soil Profiles */}
            <div className="pt-3 md:pt-0 space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                4 Classes
              </p>
              <p className="text-xs sm:text-sm text-emerald-200 font-semibold">
                {isHi ? 'प्रमुख मृदा वर्गीकरण' : 'Major Indian Soil Types'}
              </p>
              <p className="text-[11px] text-emerald-400">
                {isHi ? 'जलोढ़, काली, चिकनी, लाल' : 'Alluvial, Black, Clay, Red'}
              </p>
            </div>

            {/* 3. 72-Hour Weather Radar */}
            <div className="pt-3 md:pt-0 space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                72 Hours
              </p>
              <p className="text-xs sm:text-sm text-emerald-200 font-semibold">
                {isHi ? 'मौसम व छिड़काव रडार' : 'Hourly Spray Radar'}
              </p>
              <p className="text-[11px] text-emerald-400">
                {isHi ? 'हवा, वर्षा व डेल्टा टी' : 'Wind, rainfastness, Delta T'}
              </p>
            </div>

            {/* 4. Privacy & Compliance */}
            <div className="pt-3 md:pt-0 space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                DPDP 2023
              </p>
              <p className="text-xs sm:text-sm text-emerald-200 font-semibold">
                {isHi ? 'डेटा गोपनीयता अनुरूप' : 'Data Governance'}
              </p>
              <p className="text-[11px] text-emerald-400">
                {isHi ? 'शून्य डेटा बिक्री नीति' : 'Zero third-party monetization'}
              </p>
            </div>
          </div>

          {/* Technical Details Breakdown */}
          {showStatsInfo && (
            <div className="mt-8 pt-6 border-t border-emerald-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-800 space-y-1.5">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Scan className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isHi ? 'रोग पहचान मॉडल:' : 'Disease Classifier:'}</span>
                </p>
                <p className="text-emerald-200 leading-relaxed">
                  {isHi
                    ? '42 फसल एवं पत्ती रोग वर्गों पर प्रशिक्षित PyTorch MobileNetV3 आर्किटेक्चर।'
                    : 'PyTorch MobileNetV3 vision architecture trained on 42 agricultural plant pathology classes.'}
                </p>
              </div>

              <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-800 space-y-1.5">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isHi ? 'मृदा डेटाबेस:' : 'Soil Database:'}</span>
                </p>
                <p className="text-emerald-200 leading-relaxed">
                  {isHi
                    ? 'आईसीएआर मानकों पर आधारित जलोढ़, काली, चिकनी और लाल मिट्टी के पीएच और पोषक तत्व गुण।'
                    : 'Structured profiles covering pH ranges, nutrient balances, and crop compatibility for Indian soils.'}
                </p>
              </div>

              <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-800 space-y-1.5">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isHi ? 'मौसम गणना:' : 'Meteorological Engine:'}</span>
                </p>
                <p className="text-emerald-200 leading-relaxed">
                  {isHi
                    ? '3-घंटेवार उपग्रह डेटा, आर्द्रता और डेल्टा टी के आधार पर दवा के बहने के जोखिम की गणना।'
                    : '3-hourly Open-Meteo satellite feeds computing Delta T and chemical wash-off windows.'}
                </p>
              </div>

              <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-800 space-y-1.5">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isHi ? 'गोपनीयता नीति:' : 'Privacy Commitment:'}</span>
                </p>
                <p className="text-emerald-200 leading-relaxed">
                  {isHi
                    ? 'किसान के खेत की छवियां और सेंसर आंकड़े किसी भी तीसरे पक्ष या विज्ञापन नेटवर्क को नहीं बेचे जाते।'
                    : 'Field photographs and sensor telemetry are processed securely and never sold to advertisers.'}
                </p>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
