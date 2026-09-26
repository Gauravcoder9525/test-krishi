import React from 'react';
import {
  Activity,
  Droplets,
  Sun,
  CloudRain,
  ShieldAlert,
  TrendingUp,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Wind,
  Compass,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import WeatherSprayAlertCard from '../WeatherSprayAlertCard';
import { getUserGreeting } from '../../utils/greetingUtils';

export default function DashboardTab({
  user,
  lang,
  t,
  setActiveTab,
  weatherData,
  decision,
  weatherLoading,
  refreshWeather,
  selectLocation,
  selectScenario,
  currentLocation,
  currentScenario,
  onOpenForecastModal,
  onDetectLocation,
  locatingGps
}) {
  const isHi = lang === 'hi';
  const greetingInfo = getUserGreeting(user, lang);

  const dailyForecast = weatherData?.daily || [];
  const currentTemp = weatherData?.current?.temp || 28;
  const currentHumidity = weatherData?.current?.humidity || 71;
  const currentRainProb = weatherData?.current?.rainProb || 20;

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-8 animate-in fade-in duration-300">

      {/* Top Banner with Farmer Greeting & Badges */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider">
              {isHi ? `खेत आईडी #${currentLocation?.name?.substring(0, 3)?.toUpperCase() || 'UP'}-104` : `Farm ID #${currentLocation?.name?.substring(0, 3)?.toUpperCase() || 'UP'}-104`}
            </span>
            <span className="text-xs text-slate-400 font-semibold">• Live Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {greetingInfo.timeText}, <span className="text-emerald-800">{greetingInfo.userName}</span> {greetingInfo.icon}
          </h2>
          <p className="text-slate-600 text-sm font-medium">{t.subGreeting}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <button 
            onClick={onDetectLocation}
            disabled={locatingGps}
            title={isHi ? "मेरी लाइव GPS लोकेशन खोजें" : "Auto-detect my live GPS location"}
            className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-xs transition group disabled:opacity-50"
          >
            <MapPin className={`w-4 h-4 text-emerald-700 ${locatingGps ? 'animate-bounce text-amber-600' : 'group-hover:scale-110'} transition`} />
            <span>
              {locatingGps 
                ? (isHi ? 'स्थान खोज रहे...' : 'Locating...') 
                : `${currentLocation?.name || 'Meerut'}, ${currentLocation?.state || 'Uttar Pradesh'}`}
            </span>
            <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-1.5 py-0.5 rounded-md uppercase font-black">
              {currentLocation?.isGps ? 'GPS' : (isHi ? 'स्थान खोजें' : 'Locate')}
            </span>
          </button>

          <div className="px-4 py-2.5 bg-slate-100 text-slate-800 border border-slate-200 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-xs">
            <span>🌶️</span>
            <span>{t.farmSizeLabel}</span>
          </div>
        </div>
      </div>

      {/* CORE FEATURE: Dynamic Agricultural Weather & Safe Spraying Advisory Engine */}
      <WeatherSprayAlertCard
        lang={lang}
        t={t}
        weatherData={weatherData}
        decision={decision}
        loading={weatherLoading}
        onRefresh={refreshWeather}
        onOpenForecastModal={onOpenForecastModal}
        onSelectLocation={selectLocation}
        onSelectScenario={selectScenario}
        currentLocation={currentLocation}
        currentScenario={currentScenario}
        onDetectLocation={onDetectLocation}
        locatingGps={locatingGps}
      />

      {/* Priority Farm Actions (Critical Daily Guide) */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-3xl p-6 sm:p-8 border-2 border-amber-300/80 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-amber-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black">
              ⚡
            </div>
            <div>
              <h3 className="text-xl font-black text-amber-950">{t.todayActionsTitle}</h3>
              <p className="text-xs text-amber-800 font-semibold">
                {isHi ? 'कृषि AI द्वारा आज के लिए निर्धारित प्राथमिक कार्य' : 'Action items prioritized by AI Agronomist for today'}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-amber-200 text-amber-900 text-xs font-black rounded-full shadow-xs">
            3 {isHi ? 'आवश्यक कार्य' : 'Actions Required'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Action 1 */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm flex flex-col justify-between hover:shadow-md transition group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-sky-800 bg-sky-100 px-2.5 py-1 rounded-lg uppercase tracking-wide">
                  💧 {isHi ? 'सिंचाई नियंत्रण' : 'Irrigation'}
                </span>
                <span className="text-[11px] text-emerald-700 font-bold">Save 800L</span>
              </div>
              <p className="text-base font-black text-slate-900 leading-snug">
                {decision?.alertType === 'heavy_rain'
                  ? (isHi ? 'बारिश के कारण सिंचाई पूर्णतः स्थगित रखें' : 'Pause Irrigation Due to Rain')
                  : (isHi ? 'आज सिंचाई 2,400 लीटर पर सीमित रखें' : 'Cap Water at 2,400 L Today')}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {isHi
                  ? `मिट्टी की नमी (${40 + (currentRainProb > 50 ? 8 : 2)}%) पर्याप्त है। ${currentLocation?.name} में मौसम अनुमान के अनुसार सिंचाई को अनुकूलित रखें।`
                  : `Root zone moisture is currently at ${40 + (currentRainProb > 50 ? 8 : 2)}%. Optimized according to upcoming precipitation in ${currentLocation?.name}.`}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('irrigation')}
              className="mt-4 text-xs font-extrabold text-sky-800 hover:text-sky-950 flex items-center gap-1.5 transition"
            >
              <span>{isHi ? 'सिंचाई चार्ट देखें' : 'View Water Plan'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </button>
          </div>

          {/* Action 2: Precision Spray Advisory */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm flex flex-col justify-between hover:shadow-md transition group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg uppercase tracking-wide">
                  {decision?.statusIcon} {isHi ? 'मौसम सावधानी' : 'Weather Alert'}
                </span>
                <span className="text-[11px] text-amber-700 font-bold">Rain {decision?.stats?.rainProb}%</span>
              </div>
              <p className="text-base font-black text-slate-900 leading-snug">
                {decision?.alertTitle}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium truncate-2-lines">
                {decision?.recommendation}
              </p>
            </div>
            <button
              onClick={onOpenForecastModal}
              className="mt-4 text-xs font-extrabold text-amber-900 hover:text-amber-950 flex items-center gap-1.5 transition"
            >
              <span>{isHi ? '7-दिवसीय मौसम देखें' : 'Check Forecast'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </button>
          </div>

          {/* Action 3: Disease Guard */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm flex flex-col justify-between hover:shadow-md transition group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-red-900 bg-red-100 px-2.5 py-1 rounded-lg uppercase tracking-wide">
                  🛡️ {isHi ? 'रोग निगरानी' : 'Disease Guard'}
                </span>
                <span className="text-[11px] text-red-700 font-bold">{currentHumidity > 75 ? '72%' : '48%'} Risk</span>
              </div>
              <p className="text-base font-black text-slate-900 leading-snug">
                {isHi ? 'पत्ती धब्बा रोग (Leaf Spot) की जांच' : 'Inspect for Fungal Leaf Spot'}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {isHi
                  ? `${currentHumidity}% नमी से फफूंद के बीजाणु सक्रिय हो सकते हैं। मिर्च के निचले पत्तों पर काले गोल धब्बों की जांच करें।`
                  : `${currentHumidity}% humidity triggers fungal spore risk. Check bottom leaves for concentric dark rings.`}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('risk')}
              className="mt-4 text-xs font-extrabold text-red-800 hover:text-red-950 flex items-center gap-1.5 transition"
            >
              <span>{isHi ? 'उपचार विधि देखें' : 'View Remediation'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </button>
          </div>

        </div>
      </div>

      {/* Live IoT Sensors & Sustainability Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2 Cols: Live Sensors */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-emerald-700" />
              <span>{t.iotSensorsTitle}</span>
            </h3>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              {isHi ? 'सेंसर ऑनलाइन' : 'Live Sync'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            {/* Sensor 1: Soil Moisture */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 text-center space-y-1 hover:border-emerald-300 transition">
              <div className="w-8 h-8 mx-auto rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
                💧
              </div>
              <p className="text-xs text-slate-500 font-semibold">{isHi ? 'मिट्टी की नमी' : 'Soil Moisture'}</p>
              <p className="text-2xl font-black text-emerald-900">
                {42 + (currentRainProb > 60 ? 6 : 0)}%
              </p>
              <span className="inline-block text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                {isHi ? 'आदर्श (Optimal)' : 'Optimal'}
              </span>
            </div>

            {/* Sensor 2: Air Temp */}
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-100 text-center space-y-1 hover:border-amber-300 transition">
              <div className="w-8 h-8 mx-auto rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                🌡️
              </div>
              <p className="text-xs text-slate-500 font-semibold">{isHi ? 'वायु तापमान' : 'Air Temp'}</p>
              <p className="text-2xl font-black text-amber-900">{currentTemp}°C</p>
              <span className="inline-block text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                {currentTemp > 32 ? (isHi ? 'अति ऊष्ण' : 'High') : (isHi ? 'सामान्य' : 'Normal')}
              </span>
            </div>

            {/* Sensor 3: Humidity */}
            <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 text-center space-y-1 hover:border-blue-300 transition">
              <div className="w-8 h-8 mx-auto rounded-xl bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                💨
              </div>
              <p className="text-xs text-slate-500 font-semibold">{isHi ? 'हवा में नमी' : 'Air Humidity'}</p>
              <p className="text-2xl font-black text-blue-900">{currentHumidity}%</p>
              <span className="inline-block text-[10px] bg-blue-200 text-blue-900 font-bold px-2 py-0.5 rounded-full">
                {currentHumidity > 75 ? (isHi ? 'उच्च (High)' : 'Elevated') : (isHi ? 'संतुलित' : 'Balanced')}
              </span>
            </div>

            {/* Sensor 4: Tank Water */}
            <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-100 text-center space-y-1 hover:border-sky-300 transition">
              <div className="w-8 h-8 mx-auto rounded-xl bg-sky-100 flex items-center justify-center text-sky-800 font-bold">
                🚰
              </div>
              <p className="text-xs text-slate-500 font-semibold">{isHi ? 'जल संचय टैंक' : 'Water Storage'}</p>
              <p className="text-2xl font-black text-sky-900">64%</p>
              <span className="inline-block text-[10px] bg-sky-200 text-sky-900 font-bold px-2 py-0.5 rounded-full">
                {isHi ? 'पर्याप्त' : 'Ready'}
              </span>
            </div>

          </div>
        </div>

        {/* Right Col: Sustainability Eco-Score */}
        <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg text-white">{t.sustScore}</h3>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-xs text-emerald-300/80 mt-1">{t.ecoEfficiencyRating}</p>
          </div>

          <div className="flex items-center gap-5 my-2">
            <div className="w-20 h-20 rounded-full bg-emerald-800 border-4 border-amber-400 flex items-center justify-center text-3xl font-black text-white shadow-inner">
              82
            </div>
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 bg-emerald-700 text-emerald-100 text-[10px] font-black rounded-full uppercase">
                {isHi ? 'शीर्ष 15% फार्म' : 'Top 15% Farm'}
              </span>
              <p className="text-xs text-emerald-200 leading-relaxed font-medium">
                {isHi
                  ? `${currentLocation?.name} क्षेत्र में आपका खेत जल संरक्षण व पोषण दक्षता में अग्रणी है।`
                  : `Your farm is in the top 15% sustainability tier in ${currentLocation?.name} region.`}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-emerald-800 text-[11px] text-emerald-300 flex items-center justify-between">
            <span>{isHi ? 'वार्षिक जल बचत:' : 'Annual Water Saved:'} <strong>34,000 L</strong></span>
            <span>{isHi ? 'कार्बन क्रेडिट:' : 'Credits:'} <strong>+12 Pts</strong></span>
          </div>
        </div>

      </div>

      {/* 7-Day Precision Weather Forecast Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-500" />
              <span>{isHi ? `7-दिवसीय सूक्ष्म मौसम पूर्वानुमान (${currentLocation?.name || 'मेरठ'})` : `7-Day Micro-Weather Forecast (${currentLocation?.name || 'Meerut'})`}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {isHi ? 'वर्षा की संभावना, तापमान व कृषि कार्य हेतु अनुकूलता' : 'Precipitation odds, temperature, and spray advisory window'}
            </p>
          </div>
          <button
            onClick={onOpenForecastModal}
            className="text-xs font-extrabold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-xl transition border border-emerald-200 flex items-center gap-1.5"
          >
            <span>{isHi ? 'विस्तृत 72-घंटे रडार खोलें' : 'Open 72-Hour Radar'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {dailyForecast.map((item, idx) => {
            const isHighlightDay = item.rainProb >= 50 || idx === 1;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border text-center space-y-1.5 transition ${isHighlightDay
                    ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-400/20'
                    : 'bg-slate-50/80 border-slate-200/80 hover:bg-slate-100'
                  }`}
              >
                <p className="text-xs font-black text-slate-700">
                  {isHi ? item.dayLabel?.hi : item.dayLabel?.en}
                </p>
                <span className="text-2xl block py-0.5">{item.icon}</span>
                <p className="text-sm font-black text-slate-900">{item.tempLabel}</p>
                <p className={`text-[11px] font-bold ${item.rainProb >= 50 ? 'text-blue-700' : 'text-slate-600'}`}>
                  💧 {item.rainProb}% {item.totalRain > 0 ? `(${item.totalRain}mm)` : ''}
                </p>
                <p className="text-[10px] text-slate-500 leading-tight font-medium truncate">
                  {isHi ? item.conditionHi : item.conditionEn}
                </p>
                <span className={`inline-block text-[9px] font-black px-2 py-0.5 rounded-full ${item.rainProb < 25 ? 'bg-emerald-100 text-emerald-900' : item.rainProb < 50 ? 'bg-amber-100 text-amber-900' : 'bg-red-100 text-red-900'
                  }`}>
                  {item.rainProb < 25 ? (isHi ? 'स्प्रे ✅' : 'Spray ✅') : item.rainProb < 50 ? (isHi ? 'सतर्कता ⚠️' : 'Caution ⚠️') : (isHi ? 'रोकें ❌' : 'Delay ❌')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
