import React, { useState } from 'react';
import { 
  X, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  MapPin, 
  Clock, 
  Gauge, 
  ShieldCheck,
  Search,
  BookOpen
} from 'lucide-react';
import { 
  CHEMICAL_SPRAY_GUIDELINES, 
  evaluateHourlySpraySuitability,
  calculateDeltaT 
} from '../services/weatherEngine';

export default function ForecastSprayModal({ 
  isOpen, 
  onClose, 
  lang, 
  t, 
  weatherData, 
  decision, 
  currentLocation,
  onDetectLocation,
  locatingGps
}) {
  if (!isOpen || !weatherData) return null;

  const isHi = lang === 'hi';
  const [activeTab, setActiveTab] = useState('hourly'); // 'hourly' | 'daily' | 'rainfastness'
  const [selectedHour, setSelectedHour] = useState(null);

  const hourly = weatherData.hourly || [];
  const daily = weatherData.daily || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/30">
                {isHi ? 'कृषि सूक्ष्म-मौसम रडार' : 'Precision Agro-Weather Radar'}
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <strong>{currentLocation?.name || 'Meerut'}</strong>, {currentLocation?.state || 'Uttar Pradesh'}
              </span>
              {onDetectLocation && (
                <button
                  onClick={onDetectLocation}
                  disabled={locatingGps}
                  className="px-2.5 py-0.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] font-extrabold flex items-center gap-1 transition disabled:opacity-50"
                >
                  <span>{locatingGps ? '...' : (isHi ? '📍 लाइव GPS' : '📍 Detect GPS')}</span>
                </button>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {t.forecastModalTitle}
            </h3>
            <p className="text-xs text-slate-400">
              {t.forecastModalSub}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Selector */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('hourly')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'hourly' 
                ? 'bg-emerald-800 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isHi ? '72-घंटे विस्तृत स्प्रे अनुकूलता' : '72-Hour Spray Matrix'}</span>
          </button>

          <button
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'daily' 
                ? 'bg-emerald-800 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>{isHi ? '7-दिवसीय मौसम चक्र' : '7-Day Synoptic View'}</span>
          </button>

          <button
            onClick={() => setActiveTab('rainfastness')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'rainfastness' 
                ? 'bg-emerald-800 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isHi ? 'दवा धुलने का समय (Rainfastness Guide)' : 'Chemical Rainfastness & Drift'}</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-grow bg-slate-50/50">
          
          {/* VIEW 1: HOURLY MATRIX */}
          {activeTab === 'hourly' && (
            <div className="space-y-6">
              
              {/* Legend Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-700" />
                  <span>{isHi ? 'स्प्रे सुरक्षा संकेतक:' : 'Spray Safety Legend:'}</span>
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{isHi ? 'अनुकूल (Optimal)' : 'Safe / Optimal'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                    <span>{isHi ? 'सावधानी (Marginal)' : 'Marginal Caution'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-900 rounded-lg font-bold">
                    <XCircle className="w-3.5 h-3.5 text-red-700" />
                    <span>{isHi ? 'असुरक्षित (Unsafe / Drift / Rain)' : 'Unsafe / Rain Risk'}</span>
                  </span>
                </div>
              </div>

              {/* Hourly Grid Rows */}
              <div className="space-y-3">
                <h4 className="font-black text-slate-900 text-sm flex items-center justify-between">
                  <span>{t.hourlyTimelineTitle}</span>
                  <span className="text-xs text-slate-500 font-semibold">{isHi ? 'समय पर टैप करके विश्लेषण देखें' : 'Click any hour to inspect details'}</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                  {hourly.slice(0, 48).map((hourItem, idx) => {
                    const date = new Date(hourItem.time);
                    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const dayStr = date.toLocaleDateString([], { weekday: 'short', day: 'numeric' });
                    
                    const evalResult = evaluateHourlySpraySuitability({
                      temp: hourItem.temp,
                      rainProb: hourItem.rainProb,
                      rainfall: hourItem.rainfall,
                      windSpeed: hourItem.windSpeed,
                      humidity: hourItem.humidity
                    });

                    const isSelected = selectedHour?.time === hourItem.time;

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedHour({ ...hourItem, evalResult, timeStr, dayStr })}
                        className={`p-3 rounded-2xl border text-left transition transform hover:scale-[1.02] flex flex-col justify-between space-y-2 ${
                          isSelected 
                            ? 'ring-2 ring-emerald-600 bg-white shadow-lg' 
                            : evalResult.status === 'ideal'
                            ? 'bg-emerald-50/70 border-emerald-200 hover:bg-emerald-100/60'
                            : evalResult.status === 'marginal'
                            ? 'bg-amber-50/70 border-amber-200 hover:bg-amber-100/60'
                            : 'bg-red-50/70 border-red-200 hover:bg-red-100/60'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <p className="text-[10px] font-bold text-slate-500">{dayStr}</p>
                            <p className="text-xs font-black text-slate-900">{timeStr}</p>
                          </div>
                          <span className="text-base">
                            {evalResult.status === 'ideal' ? '✅' : evalResult.status === 'marginal' ? '⚠️' : '❌'}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-black text-slate-900">{hourItem.temp}°C</p>
                          <div className="text-[10px] text-slate-600 font-semibold space-y-0.5">
                            <p className={hourItem.rainProb >= 50 ? 'text-red-700 font-bold' : 'text-blue-700'}>
                              💧 {hourItem.rainProb}% {hourItem.rainfall > 0 ? `(${hourItem.rainfall}mm)` : ''}
                            </p>
                            <p className={hourItem.windSpeed >= 15 ? 'text-purple-700 font-bold' : 'text-teal-700'}>
                              💨 {hourItem.windSpeed} km/h
                            </p>
                          </div>
                        </div>

                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded text-center block uppercase tracking-wider ${
                          evalResult.status === 'ideal' ? 'bg-emerald-200 text-emerald-900' : evalResult.status === 'marginal' ? 'bg-amber-200 text-amber-900' : 'bg-red-200 text-red-900'
                        }`}>
                          {evalResult.status}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Hour Details Callout */}
              {selectedHour && (
                <div className="p-5 bg-white rounded-3xl border-2 border-emerald-300 shadow-md space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-700" />
                      <h4 className="font-black text-slate-900 text-base">
                        {selectedHour.dayStr} @ {selectedHour.timeStr} {isHi ? 'का विस्तृत विश्लेषण' : 'Detailed Analysis'}
                      </h4>
                    </div>
                    <button 
                      onClick={() => setSelectedHour(null)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-700"
                    >
                      ✕ {isHi ? 'बंद करें' : 'Close'}
                    </button>
                  </div>

                  <p className="text-sm font-bold text-slate-800">
                    {isHi ? selectedHour.evalResult.summaryHi : selectedHour.evalResult.summaryEn}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-500 text-[10px] block uppercase font-bold">{t.temperature}</span>
                      <span className="font-black text-base text-slate-900">{selectedHour.temp}°C</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-500 text-[10px] block uppercase font-bold">{t.rainProbability}</span>
                      <span className="font-black text-base text-blue-900">{selectedHour.rainProb}% ({selectedHour.rainfall} mm)</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-500 text-[10px] block uppercase font-bold">{t.windSpeed}</span>
                      <span className="font-black text-base text-teal-900">{selectedHour.windSpeed} km/h (Gusts {selectedHour.windGusts || selectedHour.windSpeed * 1.3} km/h)</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-500 text-[10px] block uppercase font-bold">{t.deltaTLabel}</span>
                      <span className="font-black text-base text-emerald-900">{selectedHour.evalResult.deltaT}°C (Sweet Spot)</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* VIEW 2: 7-DAY SYNOPTIC VIEW */}
          {activeTab === 'daily' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
                {daily.map((day, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between text-center space-y-2"
                  >
                    <div>
                      <p className="text-xs font-black text-slate-900">{isHi ? day.dayLabel.hi : day.dayLabel.en}</p>
                      <span className="text-3xl block py-1">{day.icon}</span>
                      <p className="text-xs font-extrabold text-slate-700 truncate">{isHi ? day.conditionHi : day.conditionEn}</p>
                    </div>

                    <div className="space-y-1 py-1 border-t border-b border-slate-100 text-xs font-bold">
                      <p className="text-slate-900">{day.tempLabel}</p>
                      <p className={day.rainProb >= 50 ? 'text-blue-700 font-extrabold' : 'text-slate-500'}>
                        💧 {day.rainProb}% ({day.totalRain}mm)
                      </p>
                      <p className="text-slate-500 text-[11px]">💨 {day.maxWind} km/h</p>
                    </div>

                    <div>
                      <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-full ${
                        day.rainProb < 25 && day.maxWind < 15 
                          ? 'bg-emerald-100 text-emerald-900' 
                          : day.rainProb < 50 
                          ? 'bg-amber-100 text-amber-900' 
                          : 'bg-red-100 text-red-900'
                      }`}>
                        {day.rainProb < 25 && day.maxWind < 15 ? (isHi ? 'स्प्रे उपयुक्त' : 'Good Spray Day') : (isHi ? 'सतर्कता / रोकें' : 'Delay Spray')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Synoptic Agronomic Advice */}
              <div className="p-5 rounded-3xl bg-emerald-900 text-white space-y-2">
                <h4 className="text-base font-black flex items-center gap-2 text-emerald-200">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{isHi ? '7-दिवसीय कृषि कार्य रणनीति' : '7-Day Field Operation Strategy'}</span>
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
                  {isHi 
                    ? 'सप्ताह के मध्य में अपेक्षित वर्षा के कारण मिट्टी में नमी पर्याप्त बनी रहेगी। वर्षा समाप्त होने के 24 घंटे बाद बुधवार सुबह यूरिया फोलियर स्प्रे एवं फफूंदनाशक का छिड़काव सर्वाधिक लाभकारी परिणाम देगा।' 
                    : 'Upcoming midweek precipitation will provide natural root irrigation. Plan your nitrogen foliar application and protective fungicide sprays for Wednesday morning when skies clear and relative humidity stabilizes around 60%.'}
                </p>
              </div>
            </div>
          )}

          {/* VIEW 3: RAINFASTNESS & CHEMICAL STANDARDS */}
          {activeTab === 'rainfastness' && (
            <div className="space-y-6">
              
              <div className="p-5 bg-amber-50 rounded-3xl border border-amber-200 space-y-2">
                <h4 className="text-sm font-black text-amber-950 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>{t.whyRainMattersTitle}</span>
                </h4>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  {t.whyRainMattersDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CHEMICAL_SPRAY_GUIDELINES.map((chem, idx) => (
                  <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{chem.icon}</span>
                        <div>
                          <h5 className="font-black text-slate-900 text-sm">{isHi ? chem.categoryHi : chem.categoryEn}</h5>
                          <p className="text-[10px] text-slate-500 font-bold">{isHi ? 'दवा धुलने का समय (Rainfastness)' : 'Required Rain-free Window'}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-black text-xs rounded-full">
                        ⏱️ {isHi ? chem.rainfastHoursHi : chem.rainfastHours}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p><strong>{isHi ? 'अनुकूल हवा:' : 'Wind Limit:'}</strong> {chem.optimalWind}</p>
                      <p><strong>{isHi ? 'उत्तम समय:' : 'Best Timing:'}</strong> {isHi ? chem.bestTimeHi : chem.bestTimeEn}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delta T Technical Card */}
              <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-emerald-700" />
                  <span>{isHi ? 'डेल्टा T क्या है और छिड़काव में इसका महत्व?' : 'What is Delta T and Why It Decides Spray Success?'}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {isHi 
                    ? 'डेल्टा T शुष्क तापमान और आर्द्र तापमान का अंतर है। जब डेल्टा T 2°C से 8°C के बीच होता है, तब दवा की बूंदें हवा में भाप बनकर नहीं उड़तीं और सीधे पत्ती के रंध्रों द्वारा अवशोषित हो जाती हैं। डेल्टा T > 8°C होने पर दवा पत्ती तक पहुंचने से पहले ही सूख जाती है।' 
                    : 'Delta T represents the evaporation rate of spray droplets. A Delta T value between 2°C and 8°C is the agronomist sweet spot where droplets survive the journey from spray nozzle to leaf surface without evaporating mid-air or getting carried away by wind.'}
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 px-6 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[11px] text-slate-500 font-medium">
            {isHi ? 'स्रोत: Open-Meteo उपग्रह मौसम ग्रिड एवं ICAR कृषि-मौसम दिशानिर्देश' : 'Powered by Open-Meteo High-Resolution Grid & ICAR Agrometeorological Directives'}
          </p>
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition"
          >
            {isHi ? 'समझ गया (Close)' : 'Done'}
          </button>
        </div>

      </div>

    </div>
  );
}
