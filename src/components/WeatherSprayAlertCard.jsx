import React, { useState } from 'react';
import { 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  Thermometer, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  RefreshCw,
  Search,
  Gauge
} from 'lucide-react';
import { DISTRICT_PRESETS } from '../services/weatherEngine';

export default function WeatherSprayAlertCard({ 
  lang, 
  t, 
  weatherData, 
  decision, 
  loading, 
  onRefresh, 
  onOpenForecastModal, 
  onSelectLocation,
  onSelectScenario,
  currentLocation,
  currentScenario,
  onDetectLocation,
  locatingGps
}) {
  const isHi = lang === 'hi';
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = decision?.stats || {
    rainProb: 75,
    rainfall: 18,
    windSpeed: 11,
    temp: 28,
    humidity: 71,
    deltaT: 3.4
  };

  const safeWindows = decision?.safeWindows || [];
  const idealWindow = decision?.idealWindow;

  const filteredPresets = DISTRICT_PRESETS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white shadow-md overflow-hidden relative transition-all duration-300">
      
      {/* Top Bar: Live Status & Location Switcher */}
      <div className="bg-slate-900 text-white px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-extrabold uppercase tracking-wider text-emerald-300 text-[11px]">
            {isHi ? 'लाइव कृषि-मौसम रडार' : 'Live Agro-Weather Radar'}
          </span>
          <span className="text-slate-500">•</span>
          <div className="flex items-center gap-1.5 text-slate-200 font-bold">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentLocation?.name || 'Meerut'}, {currentLocation?.state || 'Uttar Pradesh'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick GPS Auto-Detect Button in Card Header */}
          {onDetectLocation && (
            <button
              onClick={onDetectLocation}
              disabled={locatingGps}
              title={lang === 'en' ? "Detect My Live GPS Location" : "मेरा लाइव स्थान खोजें"}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center gap-1.5 text-[11px] shadow-sm disabled:opacity-50"
            >
              <Compass className={`w-3.5 h-3.5 ${locatingGps ? 'animate-spin' : ''}`} />
              <span>{locatingGps ? (isHi ? 'स्थान खोज रहे...' : 'Locating...') : (isHi ? '📍 लाइव GPS खोजें' : '📍 Auto-Detect GPS')}</span>
            </button>
          )}

          <button 
            onClick={() => setShowLocationPicker(!showLocationPicker)}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition flex items-center gap-1 text-[11px]"
          >
            <span>{isHi ? 'स्थान बदलें' : 'Change Location'}</span>
            <span className="text-[10px]">▼</span>
          </button>

          <button 
            onClick={onRefresh}
            disabled={loading}
            title="Refresh live weather"
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Location Picker Dropdown / Overlay */}
      {showLocationPicker && (
        <div className="p-4 bg-slate-50 border-b border-slate-200 animate-in fade-in slide-in-from-top-2 text-xs space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-black text-slate-800 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>{isHi ? 'जिला या शहर चुनें' : 'Select District or Indian Farming Belt'}</span>
            </p>
            <button 
              onClick={() => setShowLocationPicker(false)}
              className="text-slate-400 hover:text-slate-700 font-bold"
            >
              ✕
            </button>
          </div>

          {/* Dedicated GPS Locator Bar inside Picker */}
          {onDetectLocation && (
            <button
              onClick={() => {
                onDetectLocation();
                setShowLocationPicker(false);
              }}
              disabled={locatingGps}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 text-white font-extrabold flex items-center justify-center gap-2 shadow-md hover:from-emerald-700 hover:to-emerald-800 transition active:scale-98 text-xs"
            >
              <MapPin className={`w-4 h-4 text-amber-300 ${locatingGps ? 'animate-bounce' : ''}`} />
              <span>
                {locatingGps
                  ? (isHi ? 'सैटेलाइट से लाइव स्थान खोज रहे हैं...' : 'Detecting GPS coordinates via satellite...')
                  : (isHi ? '🎯 मेरी वर्तमान लाइव लोकेशन खोजें (Use Live GPS)' : '🎯 Detect My Current Live Location (GPS)')}
              </span>
            </button>
          )}

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchLocationPlaceholder}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto pt-1">
            {filteredPresets.map((preset) => {
              const isSelected = currentLocation?.name === preset.name && !currentScenario;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    onSelectLocation(preset);
                    setShowLocationPicker(false);
                    setSearchQuery('');
                  }}
                  className={`p-2 rounded-xl text-left border transition flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm' 
                      : 'bg-white hover:bg-emerald-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <p className="font-extrabold truncate">{preset.name}</p>
                  <p className={`text-[10px] truncate ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>{preset.tag}</p>
                </button>
              );
            })}
          </div>

          {/* Quick Scenario Toggles for Instant Testing */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.simulatedScenariosLabel}</span>
            </span>
            <button
              onClick={() => { onSelectScenario('rain'); setShowLocationPicker(false); }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition border ${
                currentScenario === 'rain' ? 'bg-blue-600 text-white border-blue-700' : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
              }`}
            >
              {t.scenarioRain}
            </button>
            <button
              onClick={() => { onSelectScenario('clear'); setShowLocationPicker(false); }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition border ${
                currentScenario === 'clear' ? 'bg-emerald-700 text-white border-emerald-800' : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {t.scenarioClear}
            </button>
            <button
              onClick={() => { onSelectScenario('wind'); setShowLocationPicker(false); }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition border ${
                currentScenario === 'wind' ? 'bg-purple-700 text-white border-purple-800' : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
              }`}
            >
              {t.scenarioWind}
            </button>
            <button
              onClick={() => { onSelectScenario('heat'); setShowLocationPicker(false); }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition border ${
                currentScenario === 'heat' ? 'bg-orange-600 text-white border-orange-700' : 'bg-orange-50 text-orange-900 border-orange-200 hover:bg-orange-100'
              }`}
            >
              {t.scenarioHeat}
            </button>
          </div>
        </div>
      )}

      {/* Main Dynamic Advisory Banner */}
      <div className={`p-6 sm:p-7 space-y-6 ${decision?.alertBannerColor || 'bg-blue-50/50'}`}>
        
        {/* Header Title & Condition Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-3xl flex-shrink-0">
              {decision?.statusIcon || '🌧️'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wide ${decision?.alertBadgeColor || 'bg-blue-200 text-blue-900'}`}>
                  {isHi ? 'कृषि मौसम सलाह' : 'Agricultural Advisory'}
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  {currentLocation?.name || 'Ghaziabad'} • {isHi ? 'अगले 24-72 घंटे' : 'Next 24-72 Hours'}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 leading-tight">
                {decision?.alertTitle || (isHi ? 'कल भारी बारिश का अनुमान' : 'Heavy Rain Expected Tomorrow')}
              </h3>
            </div>
          </div>

          <button 
            onClick={onOpenForecastModal}
            className="self-stretch sm:self-auto px-4 py-2.5 bg-white hover:bg-slate-900 text-slate-900 hover:text-white rounded-xl text-xs font-black border border-slate-300 shadow-sm transition flex items-center justify-center gap-2 group"
          >
            <span>{t.checkForecastBtn}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* Live Forecast Metric Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          
          <div className="p-3 bg-white/90 rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <CloudRain className="w-3 h-3 text-blue-600" />
              <span>{t.rainProbability}</span>
            </p>
            <p className="text-xl font-black text-slate-900">{stats.rainProb}%</p>
            <p className="text-[10px] text-blue-700 font-bold">{stats.rainProb >= 60 ? (isHi ? 'उच्च संभावना' : 'High Risk') : (isHi ? 'कम जोखिम' : 'Low')}</p>
          </div>

          <div className="p-3 bg-white/90 rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <Droplets className="w-3 h-3 text-sky-600" />
              <span>{t.expectedRainfall}</span>
            </p>
            <p className="text-xl font-black text-slate-900">{stats.rainfall} mm</p>
            <p className="text-[10px] text-sky-700 font-bold">{stats.rainfall > 5 ? (isHi ? 'धुलने का खतरा' : 'Washoff Risk') : (isHi ? 'सुरक्षित' : 'Dry/Trace')}</p>
          </div>

          <div className="p-3 bg-white/90 rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <Wind className="w-3 h-3 text-teal-600" />
              <span>{t.windSpeed}</span>
            </p>
            <p className="text-xl font-black text-slate-900">{stats.windSpeed} km/h</p>
            <p className="text-[10px] text-teal-700 font-bold">{stats.windSpeed > 15 ? (isHi ? 'तेज बहाव' : 'High Drift') : (isHi ? 'शांत / अनुकूल' : 'Optimal Wind')}</p>
          </div>

          <div className="p-3 bg-white/90 rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-amber-600" />
              <span>{t.temperature}</span>
            </p>
            <p className="text-xl font-black text-slate-900">{stats.temp}°C</p>
            <p className="text-[10px] text-amber-700 font-bold">{stats.temp > 32 ? (isHi ? 'झुलसन खतरा' : 'Scorch Risk') : (isHi ? 'अनुकूल' : 'Optimal')}</p>
          </div>

          <div className="p-3 bg-white/90 rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <Droplets className="w-3 h-3 text-indigo-600" />
              <span>{t.humidity}</span>
            </p>
            <p className="text-xl font-black text-slate-900">{stats.humidity}%</p>
            <p className="text-[10px] text-indigo-700 font-bold">{stats.humidity > 80 ? (isHi ? 'अति आर्द्र' : 'Humid') : (isHi ? 'सामान्य' : 'Normal')}</p>
          </div>

          <div className="p-3 bg-white/90 rounded-2xl border border-slate-200/80 shadow-xs space-y-0.5">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <Gauge className="w-3 h-3 text-emerald-600" />
              <span>{t.deltaTLabel}</span>
            </p>
            <p className="text-xl font-black text-emerald-900">{stats.deltaT}°C</p>
            <p className="text-[10px] text-emerald-700 font-bold">{stats.deltaT >= 2 && stats.deltaT <= 8 ? (isHi ? 'उत्तम स्वीट स्पॉट' : 'Ideal 2-8°C') : (isHi ? 'सतर्कता' : 'Caution')}</p>
          </div>

        </div>

        {/* Primary Agronomic Recommendation Box */}
        <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>{isHi ? 'कृषि वैज्ञानिक सलाह (Actionable Advisory):' : 'Agronomist Action Recommendation:'}</span>
          </div>
          <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
            {decision?.recommendation}
          </p>
          <p className="text-xs text-slate-600 font-medium">
            {decision?.subNote}
          </p>
        </div>

        {/* Safe Spraying Window Timeline (Requested Core Feature) */}
        <div className="bg-white/90 rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-base">🌱</span>
              <h4 className="font-black text-slate-900 text-sm sm:text-base">
                {t.sprayingAdvisoryTitle}
              </h4>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              {isHi ? 'घंटेवार मौसम विश्लेषण आधारित' : 'Calculated via Hourly Agrometeorology'}
            </span>
          </div>

          {/* Window Slots Breakdown List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {safeWindows.slice(0, 3).map((win, idx) => {
              const isIdeal = win.status === 'ideal';
              const isMarginal = win.status === 'marginal';
              const isUnsafe = win.status === 'unsafe';

              return (
                <div 
                  key={idx}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 transition ${
                    isIdeal 
                      ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20' 
                      : isMarginal
                      ? 'bg-amber-50 border-amber-200'
                      : 'bg-red-50/80 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      {isIdeal && '✅'}
                      {isMarginal && '⚠️'}
                      {isUnsafe && '❌'}
                      <span>{isHi ? win.slotTimeLabelHi : win.slotTimeLabelEn}</span>
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      isIdeal ? 'bg-emerald-200 text-emerald-900' : isMarginal ? 'bg-amber-200 text-amber-900' : 'bg-red-200 text-red-900'
                    }`}>
                      {isIdeal ? (isHi ? 'सर्वोत्तम' : 'Ideal') : isMarginal ? (isHi ? 'सावधानी' : 'Marginal') : (isHi ? 'असुरक्षित' : 'Unsafe')}
                    </span>
                  </div>

                  <p className={`text-xs font-bold leading-tight ${
                    isIdeal ? 'text-emerald-900' : isMarginal ? 'text-amber-900' : 'text-red-900'
                  }`}>
                    {isHi ? win.reasonShortHi : win.reasonShortEn}
                  </p>

                  <div className="text-[10px] text-slate-500 flex items-center justify-between font-semibold pt-1 border-t border-slate-200/60">
                    <span>💧 {win.maxRainProb}% {isHi ? 'वर्षा' : 'Rain'}</span>
                    <span>💨 {win.maxWind} km/h</span>
                    <span>🌡️ {win.avgTemp}°C</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommended Window Highlight Banner */}
          {idealWindow && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
              <div className="space-y-0.5">
                <p className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t.recommendedWindowLabel}</span>
                </p>
                <p className="text-base sm:text-lg font-black text-white">
                  {isHi ? idealWindow.slotTimeLabelHi : idealWindow.slotTimeLabelEn}
                </p>
                <p className="text-xs text-emerald-100 font-medium">
                  {isHi ? idealWindow.reasonShortHi : idealWindow.reasonShortEn} • {isHi ? 'पत्तियों में न्यूनतम वाष्पीकरण एवं अधिकतम अवशोषण' : 'Lowest drift & optimal stomatal absorption'}
                </p>
              </div>

              <button 
                onClick={onOpenForecastModal}
                className="px-4 py-2 bg-white text-emerald-950 hover:bg-emerald-50 rounded-xl text-xs font-extrabold shadow-sm transition whitespace-nowrap"
              >
                {isHi ? 'विस्तृत समय देखें' : 'View Full Schedule'} →
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
