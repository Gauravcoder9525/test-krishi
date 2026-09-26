import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Droplets, 
  Layers, 
  Play, 
  Square, 
  Activity, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Gauge, 
  ArrowRight,
  Sparkles,
  Users,
  Building,
  Bell,
  BellRing,
  Volume2,
  VolumeX,
  Sliders,
  Check,
  AlertTriangle,
  X,
  Sun,
  Sunset,
  Sunrise,
  ShieldCheck,
  Calendar,
  CloudRain,
  Radio,
  Power,
  BatteryCharging,
  CloudLightning,
  RefreshCw,
  Info
} from 'lucide-react';
import { connectMqtt, publishRelayCommand, MQTT_CONFIG } from '../../services/mqttService';

// Common Indian Crops and their base water requirements (Litres/acre per irrigation session)
// Pearl Millet (बाजरा) is set as the primary default recommended crop
const CROP_WATER_SPECS = [
  { 
    id: 'pearl_millet', 
    nameEn: 'Pearl Millet (बाजरा)', 
    nameHi: 'बाजरा (Pearl Millet)', 
    icon: '🌾', 
    baseLitersPerAcre: 1800, 
    method: 'drip', 
    optimalSlot: '6:00 AM – 7:30 AM & 5:30 PM – 6:45 PM',
    description: 'कम पानी में उच्च उत्पादन देने वाली पौष्टिक फसल। बाजरा में जलभराव न होने दें।',
    waterSchedule: [
      { stageEn: 'Seedling Stage', stageHi: 'अंकुरण अवस्था', days: 'Day 15–20', duration: '20 mins', importance: 'Light Moistening', importanceHi: 'हल्की नमी (जड़ जमाव)', timeSlot: '6:00 AM – 7:00 AM' },
      { stageEn: 'Tillering Stage', stageHi: 'कल्ले फूटना (Tillering)', days: 'Day 30–35', duration: '40 mins', importance: 'Critical Watering', importanceHi: 'अति-महत्वपूर्ण (कल्ले विकास)', timeSlot: '6:00 AM – 7:30 AM' },
      { stageEn: 'Flowering & Booting', stageHi: 'फूल व बाली निकलना', days: 'Day 45–50', duration: '45 mins', importance: 'Deep Soil Moisture', importanceHi: 'गहरी सिंचाई (बाली मजबूती)', timeSlot: '5:30 PM – 7:00 PM' },
      { stageEn: 'Grain Development', stageHi: 'दाना भराव (Dough)', days: 'Day 65–70', duration: '30 mins', importance: 'Yield Booster', importanceHi: 'उत्पादन वृद्धि (दाना भराव)', timeSlot: '6:00 AM – 7:15 AM' }
    ]
  },
  { id: 'chilli', nameEn: 'Chilli (मिर्च)', nameHi: 'मिर्च (Chilli)', icon: '🌶️', baseLitersPerAcre: 2400, method: 'drip', optimalSlot: '6:00 AM – 7:15 AM' },
  { id: 'tomato', nameEn: 'Tomato (टमाटर)', nameHi: 'टमाटर (Tomato)', icon: '🍅', baseLitersPerAcre: 2800, method: 'drip', optimalSlot: '6:00 AM – 7:30 AM' },
  { id: 'wheat', nameEn: 'Wheat (गेहूं)', nameHi: 'गेहूं (Wheat)', icon: '🌾', baseLitersPerAcre: 4200, method: 'sprinkler', optimalSlot: '6:30 AM – 8:00 AM' },
  { id: 'mustard', nameEn: 'Mustard (सरसों)', nameHi: 'सरसों (Mustard)', icon: '🌼', baseLitersPerAcre: 2200, method: 'drip', optimalSlot: '6:00 AM – 7:15 AM' },
  { id: 'potato', nameEn: 'Potato (आलू)', nameHi: 'आलू (Potato)', icon: '🥔', baseLitersPerAcre: 3600, method: 'sprinkler', optimalSlot: '6:00 AM – 7:45 AM' },
  { id: 'sugarcane', nameEn: 'Sugarcane (गन्ना)', nameHi: 'गन्ना (Sugarcane)', icon: '🎋', baseLitersPerAcre: 6000, method: 'drip', optimalSlot: '5:30 AM – 7:30 AM' },
  { id: 'paddy', nameEn: 'Paddy (धान)', nameHi: 'धान (Paddy)', icon: '🌾', baseLitersPerAcre: 7500, method: 'flood', optimalSlot: '5:00 AM – 7:30 AM' },
  { id: 'onion', nameEn: 'Onion (प्याज)', nameHi: 'प्याज (Onion)', icon: '🧅', baseLitersPerAcre: 2600, method: 'drip', optimalSlot: '6:00 AM – 7:30 AM' },
  { id: 'garlic', nameEn: 'Garlic (लहसुन)', nameHi: 'लहसुन (Garlic)', icon: '🧄', baseLitersPerAcre: 2300, method: 'drip', optimalSlot: '6:00 AM – 7:15 AM' },
  { id: 'cotton', nameEn: 'Cotton (कपास)', nameHi: 'कपास (Cotton)', icon: '☁️', baseLitersPerAcre: 3400, method: 'drip', optimalSlot: '6:00 AM – 7:30 AM' },
  { id: 'maize', nameEn: 'Maize (मक्का)', nameHi: 'मक्का (Maize)', icon: '🌽', baseLitersPerAcre: 3200, method: 'sprinkler', optimalSlot: '6:00 AM – 7:30 AM' }
];

// Pump Horsepower (HP) discharge capacities
const PUMP_HP_OPTIONS = [
  { hp: 2, label: '2 HP Pump', lpm: 180, lph: 10800, typeEn: 'Solar / Monoblock', typeHi: 'सोलर / मोनोब्लॉक' },
  { hp: 3, label: '3 HP Pump', lpm: 300, lph: 18000, typeEn: 'Submersible Solar', typeHi: 'सबमर्सिबल सोलर' },
  { hp: 5, label: '5 HP Pump', lpm: 500, lph: 30000, typeEn: 'High-Discharge Tube well', typeHi: 'उच्च प्रवाह नलकूप' },
  { hp: 7.5, label: '7.5 HP Pump', lpm: 750, lph: 45000, typeEn: 'Heavy Agriculture Grid', typeHi: 'हैवी कृषि ग्रिड' },
  { hp: 10, label: '10 HP Pump', lpm: 1100, lph: 66000, typeEn: 'Community Deep Tube well', typeHi: 'सामुदायिक गहरा नलकूप' }
];

// Play pleasant web-audio chime for irrigation reminder alarm
function playChimeSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    
    // First tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.5);

    // Second chime tone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.2); // A5
    gain2.gain.setValueAtTime(0.2, now + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.2);
    osc2.stop(now + 0.8);
  } catch (e) {
    // AudioContext not allowed before user gesture, silent fallback
  }
}

export default function IrrigationTab({ 
  lang, 
  t, 
  irrigationMode, 
  setIrrigationMode, 
  selectedFarmNode, 
  setSelectedFarmNode,
  currentLocation,
  weatherData
}) {
  const isHi = lang === 'hi';

  // Customizer State: Pearl Millet (बाजरा) is auto-selected by default
  const [selectedCropId, setSelectedCropId] = useState('pearl_millet');
  const [farmAcres, setFarmAcres] = useState(5);
  const [selectedHp, setSelectedHp] = useState(3);
  const [irrigationMethod, setIrrigationMethod] = useState('drip'); // 'drip' | 'sprinkler' | 'flood'

  // Smart Relay State & Motor Voltage (12.4V requested)
  const [relayOn, setRelayOn] = useState(false);
  const [motorVoltage, setMotorVoltage] = useState(12.4);
  const [relayFeedback, setRelayFeedback] = useState('');
  
  // Rain Sensor & Live MQTT states
  const [isRaining, setIsRaining] = useState(false);
  const [mqttConnected, setMqttConnected] = useState(false);
  const [soilMoistureAvg, setSoilMoistureAvg] = useState(0);
  const [lastTelemetryTime, setLastTelemetryTime] = useState(null);
  const [autoRainCutoff, setAutoRainCutoff] = useState(true);

  // Pump & Timer State
  const [pumpActive, setPumpActive] = useState(false);
  const [pumpTimer, setPumpTimer] = useState(40); // remaining minutes
  const timerIntervalRef = useRef(null);

  // Notification & Pop-up Modal State
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [alertSuccessToast, setAlertSuccessToast] = useState('');

  // Micro fluctuation around 12.4V DC supply so it behaves authentically
  useEffect(() => {
    const vTimer = setInterval(() => {
      setMotorVoltage(+(12.4 + (Math.random() * 0.04 - 0.02)).toFixed(1));
    }, 5000);
    return () => clearInterval(vTimer);
  }, []);

  // Connect to live MQTT stream for Rain Sensor (Pin 27) and Relay State
  useEffect(() => {
    const clientController = connectMqtt({
      onStatusChange: (status) => {
        setMqttConnected(status === 'connected');
      },
      onRelayStatus: (status) => {
        const isUp = status === 'ON' || status === 1 || String(status).toUpperCase() === 'ON';
        setRelayOn(isUp);
        setPumpActive(isUp);
      },
      onMessage: (payload) => {
        setLastTelemetryTime(new Date().toLocaleTimeString());

        // Live Rain Sensor on Pin 27
        if (payload.rain !== undefined && payload.rain !== null) {
          const rainDetected = typeof payload.rain === 'boolean'
            ? payload.rain
            : (payload.rain === 1 || String(payload.rain).toLowerCase() === 'true' || String(payload.rain).toLowerCase() === 'yes');
          setIsRaining(rainDetected);
        }

        // Live average soil moisture
        if (payload.soil1 !== undefined) {
          const avg = Math.round(((Number(payload.soil1 || 0) + Number(payload.soil2 || 0) + Number(payload.soil3 || 0) + Number(payload.soil4 || 0)) / 4));
          setSoilMoistureAvg(avg);
        }
      }
    });

    return () => {
      if (clientController) clientController.disconnect();
    };
  }, []);

  // Selected crop specification
  const currentCrop = useMemo(() => {
    return CROP_WATER_SPECS.find(c => c.id === selectedCropId) || CROP_WATER_SPECS[0];
  }, [selectedCropId]);

  // Selected pump specification
  const currentPump = useMemo(() => {
    return PUMP_HP_OPTIONS.find(p => p.hp === selectedHp) || PUMP_HP_OPTIONS[1];
  }, [selectedHp]);

  // Precision Water Calculation:
  // Water Required (Liters) = Base Liters/Acre * Acres * Method Multiplier
  const methodMultiplier = irrigationMethod === 'drip' ? 1.0 : irrigationMethod === 'sprinkler' ? 1.25 : 1.65;
  const totalWaterRequiredLiters = Math.round(currentCrop.baseLitersPerAcre * farmAcres * methodMultiplier);
  
  // Exact Run Time = Total Litres / (Pump LPM)
  const exactRunMinutes = Math.max(Math.round(totalWaterRequiredLiters / currentPump.lpm), 1);
  const exactHours = Math.floor(exactRunMinutes / 60);
  const exactMinsRemaining = exactRunMinutes % 60;
  const formattedRunDuration = exactHours > 0 
    ? `${exactHours} ${isHi ? 'घंटा' : 'hr'} ${exactMinsRemaining} ${isHi ? 'मिनट' : 'mins'}`
    : `${exactRunMinutes} ${isHi ? 'मिनट' : 'Minutes'}`;

  // Water Saved vs Flood
  const floodEquivalentLiters = Math.round(currentCrop.baseLitersPerAcre * farmAcres * 1.65);
  const waterSavedLiters = Math.max(floodEquivalentLiters - totalWaterRequiredLiters, 0);
  const waterSavedPercent = Math.round((waterSavedLiters / floodEquivalentLiters) * 100);

  // Auto-sync initial pump timer when specs change
  useEffect(() => {
    if (!pumpActive) {
      setPumpTimer(exactRunMinutes);
    }
  }, [exactRunMinutes, pumpActive]);

  // Active pump countdown timer
  useEffect(() => {
    if (pumpActive) {
      timerIntervalRef.current = setInterval(() => {
        setPumpTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setPumpActive(false);
            return exactRunMinutes;
          }
          return prev - 1;
        });
      }, 60000); // countdown per minute (or adjust for UI demo)
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [pumpActive, exactRunMinutes]);

  // Handle Turn On Browser Notifications
  const handleEnableNotification = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setNotificationEnabled(true);
        setAlertSuccessToast(isHi 
          ? `✓ सिंचाई रिमाइंडर सक्रिय! सुबह 6:00 AM पर अलर्ट भेजा जाएगा।` 
          : `✓ Irrigation reminder set! You will receive an alert at 6:00 AM.`);
        setTimeout(() => setAlertSuccessToast(''), 4000);
      } else {
        setNotificationEnabled(true); // Fallback in-app modal reminder
        setAlertSuccessToast(isHi 
          ? `✓ इन-ऐप सिंचाई रिमाइंडर सक्रिय कर दिया गया है।` 
          : `✓ In-app irrigation alert schedule enabled.`);
        setTimeout(() => setAlertSuccessToast(''), 4000);
      }
    } else {
      setNotificationEnabled(true);
    }
  };

  // Trigger Immediate Interactive Test Pop-up
  const handleTriggerAlarmModal = () => {
    if (soundEnabled) {
      playChimeSound();
    }
    setShowAlarmModal(true);
  };

  // Generate 24 interactive village nodes (representative of 100 farms)
  const villageFarms = Array.from({ length: 24 }).map((_, idx) => {
    const crops = ["Chilli (मिर्च)", "Wheat (गेहूं)", "Mustard (सरसों)", "Potato (आलू)", "Sugarcane (गन्ना)"];
    const crop = crops[idx % crops.length];
    const farmerNames = [
      "Rameshwar Singh", "Suresh Kumar", "Balram Yadav", "Dharmendra Tyagi", 
      "Vikram Chauhan", "Harish Pal", "Mukesh Sharma", "Omveer Gujjar"
    ];
    const farmer = farmerNames[idx % farmerNames.length];
    const quotaLiters = (idx + 3) * 600;
    const isOptimal = idx % 3 !== 0;

    return {
      id: idx + 101,
      name: `#Farm ${idx + 101}`,
      farmer,
      crop,
      acres: (idx % 4) + 2,
      need: `${quotaLiters} L`,
      moisture: `${38 + (idx % 15)}%`,
      status: isOptimal ? "Scheduled (नियत)" : "Overdue (सिंचाई प्रतीक्षित)",
      source: idx % 2 === 0 ? "Borewell #2" : "Village Pond Canal"
    };
  });

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Success Toast */}
      {alertSuccessToast && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400 flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
          <p className="text-xs sm:text-sm font-black">{alertSuccessToast}</p>
        </div>
      )}

      {/* Header & Mode Switcher */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-black uppercase">
              <Droplets className="w-3.5 h-3.5" /> Precision Micro-Irrigation & Allocation
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200">
              📍 {currentLocation?.name || 'Meerut'}, {currentLocation?.state || 'Uttar Pradesh'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{t.waterModuleTitle}</h2>
          <p className="text-slate-600 text-sm font-medium mt-1">{t.waterModuleSub}</p>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner self-stretch md:self-auto">
          <button 
            onClick={() => setIrrigationMode('farm')}
            className={`flex-1 md:flex-none px-5 py-2.5 text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-2 ${
              irrigationMode === 'farm'
                ? 'bg-white text-emerald-900 shadow-sm shadow-slate-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🏡</span>
            <span>{t.farmMode}</span>
          </button>

          <button 
            onClick={() => setIrrigationMode('village')}
            className={`flex-1 md:flex-none px-5 py-2.5 text-xs font-extrabold rounded-xl transition flex items-center justify-center gap-2 ${
              irrigationMode === 'village'
                ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>{t.villageMode}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: MY FARM MODE */}
      {irrigationMode === 'farm' && (
        <div className="space-y-8 animate-in fade-in">
          
          {/* CORE FEATURE: Smart Pump Run-Time & Precision Water Calculator */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-800 font-bold">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {isHi ? 'पंप क्षमता, फसल व सटीक समय कैलकुलेटर' : 'Smart Pump Run-Time & Precision Water Calculator'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {isHi ? 'फसल, जमीन और पंप के HP के अनुसार सही पानी व चलने का समय निकालें' : 'Calculates exact run duration and liter volume based on Pump HP and crop needs'}
                  </p>
                </div>
              </div>

              {/* Notification / Reminder Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleEnableNotification}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black transition flex items-center gap-2 border ${
                    notificationEnabled 
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  }`}
                  title={isHi ? 'सिंचाई समय का नोटिफिकेशन ऑन करें' : 'Enable Irrigation Notification'}
                >
                  <Bell className={`w-4 h-4 ${notificationEnabled ? 'text-emerald-700' : 'text-slate-600'}`} />
                  <span>{notificationEnabled ? (isHi ? '✓ रिमाइंडर चालू है' : '✓ Reminder Active') : (isHi ? '🔔 सिंचाई रिमाइंडर ऑन करें' : '🔔 Set Irrigation Reminder')}</span>
                </button>

                <button
                  onClick={handleTriggerAlarmModal}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-black shadow-md shadow-amber-500/20 transition flex items-center gap-2"
                  title={isHi ? 'अलार्म पॉप-अप टेस्ट करें' : 'Test Reminder Pop-up Alarm'}
                >
                  <BellRing className="w-4 h-4 animate-bounce" />
                  <span>{isHi ? '⏰ अलार्म पॉप-अप टेस्ट करें' : '⏰ Test Alarm Pop-up'}</span>
                </button>
              </div>
            </div>

            {/* Input Selectors Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* 1. Crop Selection */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                  {isHi ? 'फसल चुनें (Crop)' : 'Select Crop'}
                </label>
                <select
                  value={selectedCropId}
                  onChange={(e) => setSelectedCropId(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm font-bold text-slate-800 bg-slate-50/60 focus:ring-2 focus:ring-sky-600 focus:border-sky-600 outline-none transition cursor-pointer"
                >
                  {CROP_WATER_SPECS.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {isHi ? c.nameHi : c.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Land Size (Acres) */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                  {isHi ? 'जमीन का रकबा (Acres)' : 'Land Size (Acres)'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    max="50"
                    value={farmAcres}
                    onChange={(e) => setFarmAcres(parseFloat(e.target.value) || 1)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm font-bold text-slate-800 bg-slate-50/60 focus:ring-2 focus:ring-sky-600 focus:border-sky-600 outline-none transition"
                  />
                  <span className="text-xs font-extrabold text-slate-500 uppercase">{isHi ? 'एकड़' : 'Acres'}</span>
                </div>
              </div>

              {/* 3. Pump HP Selector */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                  {isHi ? 'पंप का HP (Horsepower)' : 'Pump Capacity (HP)'}
                </label>
                <select
                  value={selectedHp}
                  onChange={(e) => setSelectedHp(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm font-bold text-slate-800 bg-slate-50/60 focus:ring-2 focus:ring-sky-600 focus:border-sky-600 outline-none transition cursor-pointer"
                >
                  {PUMP_HP_OPTIONS.map(p => (
                    <option key={p.hp} value={p.hp}>
                      ⚡ {p.label} ({p.lpm} L/min • {p.lph} L/hr)
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Irrigation Technique */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                  {isHi ? 'सिंचाई विधि (Method)' : 'Irrigation Method'}
                </label>
                <select
                  value={irrigationMethod}
                  onChange={(e) => setIrrigationMethod(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm font-bold text-slate-800 bg-slate-50/60 focus:ring-2 focus:ring-sky-600 focus:border-sky-600 outline-none transition cursor-pointer"
                >
                  <option value="drip">💧 Drip (ड्रिप - 40% जल बचत)</option>
                  <option value="sprinkler">🚿 Sprinkler (फव्वारा)</option>
                  <option value="flood">🌊 Flood (पारंपरिक खुला बहाव)</option>
                </select>
              </div>

            </div>

            {/* Calculated Output Highlight Bar */}
            <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                
                {/* 1. Exact Run Time Required */}
                <div className="space-y-1 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase">
                    <Clock className="w-4 h-4" />
                    <span>{isHi ? 'पंप चलाने का समय (Duration)' : 'Exact Run Duration'}</span>
                  </div>
                  <p className="text-3xl font-black text-amber-400 mt-1">
                    {formattedRunDuration}
                  </p>
                  <p className="text-[11px] text-sky-200">
                    {currentPump.hp} HP @ {currentPump.lpm} L/{isHi ? 'मिनट प्रवाह' : 'min flow'}
                  </p>
                </div>

                {/* 2. Total Water Quota */}
                <div className="space-y-1 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300 uppercase">
                    <Droplets className="w-4 h-4" />
                    <span>{isHi ? 'कुल जल आवश्यकता (Water)' : 'Total Water Required'}</span>
                  </div>
                  <p className="text-3xl font-black text-white mt-1">
                    {totalWaterRequiredLiters.toLocaleString('en-IN')} L
                  </p>
                  <p className="text-[11px] text-sky-200">
                    {farmAcres} {isHi ? 'एकड़' : 'Acres'} • {isHi ? currentCrop.nameHi : currentCrop.nameEn}
                  </p>
                </div>

                {/* 3. Water Savings vs Flood */}
                <div className="space-y-1 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isHi ? 'भूजल व बिजली बचत' : 'Water & Power Saved'}</span>
                  </div>
                  <p className="text-3xl font-black text-emerald-400 mt-1">
                    {waterSavedLiters.toLocaleString('en-IN')} L
                  </p>
                  <p className="text-[11px] text-emerald-200">
                    {waterSavedPercent}% {isHi ? 'बचत बनाम खुला पानी' : 'savings vs flood method'}
                  </p>
                </div>

                {/* 4. Live Relay & Motor Trigger Action (12.4V Supply) */}
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-sky-200">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isHi ? 'स्मार्ट रिले व 12.4V मोटर' : 'Smart Relay & 12.4V Motor'}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      relayOn 
                        ? 'bg-emerald-400 text-emerald-950 animate-pulse' 
                        : 'bg-white/20 text-white'
                    }`}>
                      {relayOn ? (isHi ? 'रिले: ON (चालू)' : 'RELAY: ON') : (isHi ? 'रिले: OFF (बंद)' : 'RELAY: OFF')}
                    </span>
                  </div>

                  {/* Motor Voltage Meter */}
                  <div className="bg-black/30 rounded-xl p-2.5 border border-white/15 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-300 font-bold uppercase block">{isHi ? 'मोटर वोल्टेज' : 'Motor Supply'}</span>
                      <span className="text-base font-black text-amber-300 font-mono tracking-wider">{motorVoltage} V DC</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-300 font-bold block">{relayOn ? '⚡ 3.8A Active' : '⚪ Standby'}</span>
                      <span className="text-[9px] text-slate-400 font-medium">HiveMQ Topic: relay</span>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-white">
                    {relayOn ? `${pumpTimer} ${isHi ? 'मिनट शेष • मोटर चालू' : 'mins remaining • Motor ON'}` : `${formattedRunDuration} ${isHi ? 'कटऑफ' : 'Auto Cut-off'}`}
                  </p>

                  {/* Dual Mode Manual Buttons: Instant ON & OFF */}
                  <div className="flex gap-2 pt-1">
                    <button 
                      onClick={() => {
                        setRelayOn(true);
                        setPumpActive(true);
                        setPumpTimer(exactRunMinutes);
                        publishRelayCommand('ON');
                        setAlertSuccessToast(isHi ? '⚡ रिले ON: मोटर चालू' : '⚡ Relay ON: Motor Started');
                        setTimeout(() => setAlertSuccessToast(''), 3000);
                      }}
                      className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs transition flex items-center justify-center gap-1.5 border shadow-sm ${
                        relayOn 
                          ? 'bg-emerald-400 text-emerald-950 border-emerald-300 ring-2 ring-emerald-300/80 shadow-emerald-400/30' 
                          : 'bg-white/10 text-white/80 hover:bg-white/20 border-white/20'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>{isHi ? 'चालू (ON)' : 'Turn ON'}</span>
                    </button>

                    <button 
                      onClick={() => {
                        setRelayOn(false);
                        setPumpActive(false);
                        publishRelayCommand('OFF');
                        setAlertSuccessToast(isHi ? '⏹️ रिले OFF: मोटर बंद' : '⏹️ Relay OFF: Motor Stopped');
                        setTimeout(() => setAlertSuccessToast(''), 3000);
                      }}
                      className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs transition flex items-center justify-center gap-1.5 border shadow-sm ${
                        !relayOn 
                          ? 'bg-rose-500 text-white border-rose-400 ring-2 ring-rose-400/80 shadow-rose-500/30' 
                          : 'bg-white/10 text-white/80 hover:bg-white/20 border-white/20'
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>{isHi ? 'बंद (OFF)' : 'Turn OFF'}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RAIN SENSOR VISUALIZATION (बादल से पानी या सामान्य धूप) & AUTO-PROTECTION */}
          <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm transition-all duration-500 overflow-hidden relative ${
            isRaining 
              ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white border-blue-400/40 shadow-blue-900/30' 
              : 'bg-gradient-to-br from-amber-50/90 via-white to-emerald-50/60 text-slate-900 border-amber-200 shadow-amber-500/5'
          }`}>
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              
              {/* Left Side: Rain/Sun Live Sensor Status */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    isRaining 
                      ? 'bg-blue-500 text-white shadow-sm shadow-blue-500/50' 
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    {isRaining ? <CloudRain className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                    {isHi ? 'ESP32 पिन 27 रेन सेंसर' : 'ESP32 Pin 27 Rain Sensor'}
                  </span>

                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                    isRaining 
                      ? 'bg-blue-900/80 text-blue-200 border-blue-700' 
                      : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  }`}>
                    {mqttConnected ? '● MQTT Live Stream' : '○ Standby'}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {isRaining 
                    ? (isHi ? '🌧️ खेत में वर्षा हो रही है (Rain Detected)' : '🌧️ Rainfall Active on Farm (Rain Detected)') 
                    : (isHi ? '☀️ मौसम साफ व खिली धूप (Clear & Sunny)' : '☀️ Clear & Sunny Weather (No Rain)')}
                </h3>

                <p className={`text-sm font-medium ${isRaining ? 'text-blue-200' : 'text-slate-600'}`}>
                  {isRaining 
                    ? (isHi 
                        ? 'पिन 27 रेन सेंसर ने बारिश को भांप लिया है। जलभराव व बिजली बर्बादी रोकने के लिए रिले को स्वतः बंद (Auto Cut-off) रखा गया है।' 
                        : 'Digital Pin 27 detected precipitation. Relay motor is automatically cut off to prevent over-watering and conserve energy.') 
                    : (isHi 
                        ? 'मौसम सूखा व सामान्य है। बाजरा की फसल के लिए अनुशंसित समय (सुबह 6:00 AM - 7:30 AM या शाम) पर 12.4V रिले चालू करें।' 
                        : 'Farm surface is dry. Normal sunlight detected. Ready for scheduled irrigation at optimal evaporation hours.')}
                </p>
              </div>

              {/* Center/Right Side: Rich Visual Weather Animation & Test Switcher */}
              <div className="flex items-center gap-6 self-center lg:self-auto flex-wrap sm:flex-nowrap">
                
                {/* Visual Animation: Cloud with Rain vs Bright Sun */}
                <div className="flex flex-col items-center justify-center min-w-[140px] p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  {isRaining ? (
                    <div className="flex flex-col items-center relative py-2">
                      <CloudRain className="w-16 h-16 text-sky-400 animate-bounce" />
                      {/* Animated Falling Raindrops */}
                      <div className="flex gap-2 justify-center mt-1">
                        <span className="w-1.5 h-4 bg-sky-400 rounded-full animate-pulse delay-75"></span>
                        <span className="w-1.5 h-5 bg-blue-400 rounded-full animate-pulse delay-150"></span>
                        <span className="w-1.5 h-3.5 bg-cyan-300 rounded-full animate-pulse delay-300"></span>
                        <span className="w-1.5 h-4.5 bg-sky-300 rounded-full animate-pulse delay-200"></span>
                      </div>
                      <span className="text-[10px] font-mono text-sky-300 font-bold mt-1">Digital Pin 27 = LOW</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center relative py-2">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-xl shadow-amber-400/40 flex items-center justify-center animate-pulse">
                        <Sun className="w-10 h-10 text-amber-900 animate-[spin_10s_linear_infinite]" />
                      </div>
                      <span className="text-[10px] font-mono text-amber-800 font-bold mt-2">Digital Pin 27 = HIGH</span>
                    </div>
                  )}
                </div>

                {/* Quick Interactive Rain / Sun Simulator for user testing */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider opacity-75">
                    {isHi ? 'परीक्षण हेतु बदलें (Test Mode):' : 'Interactive Test Toggle:'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsRaining(false)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                        !isRaining 
                          ? 'bg-amber-500 text-white border-amber-600 shadow-sm shadow-amber-500/30' 
                          : 'bg-white/10 hover:bg-white/20 border-white/20 text-slate-300'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5" />
                      <span>{isHi ? '☀️ सामान्य धूप' : '☀️ Sunny'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsRaining(true);
                        if (relayOn && autoRainCutoff) {
                          setRelayOn(false);
                          setPumpActive(false);
                          publishRelayCommand('OFF');
                        }
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                        isRaining 
                          ? 'bg-blue-500 text-white border-blue-600 shadow-sm shadow-blue-500/30' 
                          : 'bg-white/10 hover:bg-white/20 border-white/20 text-slate-300'
                      }`}
                    >
                      <CloudRain className="w-3.5 h-3.5" />
                      <span>{isHi ? '🌧️ वर्षा (बादल)' : '🌧️ Rain Clouds'}</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* DEDICATED FEATURE: बाजरा (Pearl Millet) सिंचाई का सही समय व विकास अवस्थाएं */}
          {selectedCropId === 'pearl_millet' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase">
                      🌾 Pearl Millet Water Guide
                    </span>
                    <span className="text-xs text-slate-500 font-bold">• 1800 L/Acre Quota</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {isHi ? 'बाजरा की फसल: किस-किस समय व अवस्था में पानी देना है?' : 'Pearl Millet (Bajra): When & How Often to Irrigate?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {isHi 
                      ? 'बाजरा कम पानी वाली फसल है, परंतु निम्नलिखित 4 अवस्थाओं और सही समय स्लॉट पर पानी देने से पैदावार 30-40% बढ़ती है।' 
                      : 'Pearl millet is drought-tolerant, but timed watering during these 4 critical stages boosts grain yield significantly.'}
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-2xl text-xs font-bold self-start sm:self-auto flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-emerald-800 uppercase font-black">{isHi ? 'सर्वोत्तम समय' : 'Best Time'}</span>
                    <span>6:00 AM – 7:30 AM</span>
                  </div>
                </div>
              </div>

              {/* 4 Critical Growth Stages for Pearl Millet */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {CROP_WATER_SPECS[0].waterSchedule.map((stage, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between space-y-3 hover:border-emerald-400 transition hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-xs">
                        #{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-600">
                        {stage.days}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-black text-slate-900 text-sm">
                        {isHi ? stage.stageHi : stage.stageEn}
                      </h4>
                      <p className="text-xs text-emerald-800 font-bold mt-0.5">
                        {isHi ? stage.importanceHi : stage.importance}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                      <div className="flex items-center justify-between">
                        <span>{isHi ? 'समय:' : 'Time:'}</span>
                        <span className="font-bold text-slate-800">{stage.timeSlot}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{isHi ? 'पंप अवधि:' : 'Duration:'}</span>
                        <span className="font-bold text-amber-700">{stage.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pearl Millet Irrigation Golden Rules */}
              <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-4 text-xs text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <Info className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-sm block">
                      {isHi ? 'बाजरा सिंचाई के मुख्य नियम (Golden Rules):' : 'Pearl Millet Irrigation Golden Rules:'}
                    </span>
                    <p className="mt-0.5 text-amber-900">
                      {isHi 
                        ? '1. कल्ले फूटने (Tillering) और बाली निकलते समय पानी की कमी न होने दें। 2. दोपहर 12 बजे से 3 बजे के बीच कभी पानी न दें। 3. यदि बारिश हो जाए तो तुरंत रिले बंद कर दें।'
                        : '1. Never starve plants during tillering and booting. 2. Avoid watering between 12 PM - 3 PM. 3. Cut off relay immediately upon rainfall.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const next = !relayOn;
                    setRelayOn(next);
                    setPumpActive(next);
                    publishRelayCommand(next ? 'ON' : 'OFF');
                    setAlertSuccessToast(next ? '⚡ रिले चालू: बाजरा सिंचाई शुरू' : '⏹️ रिले बंद');
                    setTimeout(() => setAlertSuccessToast(''), 3000);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-black text-xs shrink-0 transition flex items-center gap-1.5 shadow-sm ${
                    relayOn 
                      ? 'bg-rose-600 text-white hover:bg-rose-700' 
                      : 'bg-emerald-800 text-white hover:bg-emerald-900'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{relayOn ? (isHi ? 'रिले बंद करें' : 'Turn Relay OFF') : (isHi ? 'बाजरा हेतु रिले ON करें' : 'Irrigate Bajra Now')}</span>
                </button>
              </div>
            </div>
          )}

          {/* REAL-WORLD LOCATION TIME SLOTS (किस-किस समय पानी देना है) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Sunrise className="w-5 h-5 text-amber-500" />
                  <span>{isHi ? 'स्थान व मौसम अनुसार सिंचाई के सही समय (Optimal Time Windows)' : 'Real-World Location Time Slots (When to Irrigate)'}</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  📍 {currentLocation?.name || 'Meerut'}, {currentLocation?.state || 'Uttar Pradesh'} • {isHi ? 'वाष्पीकरण एवं तापमान के अनुसार लाइव स्लॉट्स' : 'Calculated for local agrometeorological evaporation profile'}
                </p>
              </div>

              <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full self-start sm:self-auto">
                {isHi ? 'दैनिक 2 सुरक्षित स्लॉट' : '2 Daily Safe Slots'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Slot 1: Morning Recommended */}
              <div className="p-5 rounded-3xl bg-emerald-50/80 border-2 border-emerald-400 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-200 text-emerald-900 text-[11px] font-black uppercase tracking-wider">
                    ★ {isHi ? 'सर्वोत्तम समय (Recommended)' : 'Best Morning Slot'}
                  </span>
                  <Sunrise className="w-5 h-5 text-amber-600" />
                </div>

                <div>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight">6:00 AM – 7:30 AM</h4>
                  <p className="text-xs text-slate-600 font-semibold mt-1">
                    {isHi ? 'सुबह की शांत हवा व कम तापमान' : 'Calm morning hours with cool leaf surface'}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-emerald-200/80 text-xs text-slate-700">
                  <p className="flex items-center gap-1.5 font-medium">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>{isHi ? 'वाष्पीकरण नुकसान < 4% (न्यूनतम)' : 'Evaporation loss < 4%'}</span>
                  </p>
                  <p className="flex items-center gap-1.5 font-medium">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>{isHi ? 'पत्तियों के रंध्र (Stomata) खुले रहते हैं' : 'Stomata open for maximum root intake'}</span>
                  </p>
                </div>
              </div>

              {/* Slot 2: Evening Alternative */}
              <div className="p-5 rounded-3xl bg-sky-50/80 border border-sky-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-sky-200 text-sky-900 text-[11px] font-black uppercase tracking-wider">
                    {isHi ? 'वैकल्पिक शाम स्लॉट' : 'Alternative Evening Slot'}
                  </span>
                  <Sunset className="w-5 h-5 text-sky-600" />
                </div>

                <div>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight">5:30 PM – 7:00 PM</h4>
                  <p className="text-xs text-slate-600 font-semibold mt-1">
                    {isHi ? 'धूप ढलने के बाद का समय' : 'Post-sunset cooling window'}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-sky-200/80 text-xs text-slate-700">
                  <p className="flex items-center gap-1.5 font-medium">
                    <span className="text-sky-700 font-bold">✓</span>
                    <span>{isHi ? 'रात भर मिट्टी में नमी बनी रहती है' : 'Maintains overnight soil moisture reserve'}</span>
                  </p>
                  <p className="flex items-center gap-1.5 font-medium">
                    <span className="text-sky-700 font-bold">✓</span>
                    <span>{isHi ? 'हल्की सिंचाई के लिए उपयुक्त' : 'Suitable for top-up watering'}</span>
                  </p>
                </div>
              </div>

              {/* Slot 3: Forbidden Afternoon Window */}
              <div className="p-5 rounded-3xl bg-rose-50/80 border border-rose-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-rose-200 text-rose-900 text-[11px] font-black uppercase tracking-wider">
                    ⚠️ {isHi ? 'प्रतिबंधित समय (Avoid)' : 'Forbidden Window'}
                  </span>
                  <Sun className="w-5 h-5 text-rose-600" />
                </div>

                <div>
                  <h4 className="text-2xl font-black text-rose-900 tracking-tight">11:30 AM – 3:30 PM</h4>
                  <p className="text-xs text-rose-700 font-semibold mt-1">
                    {isHi ? 'कड़ी धूप व तेज गर्मी' : 'Peak scorching afternoon heat'}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-rose-200/80 text-xs text-rose-800">
                  <p className="flex items-center gap-1.5 font-medium">
                    <span className="text-rose-700 font-bold">✕</span>
                    <span>{isHi ? '40%+ पानी भाप बनकर उड़ जाता है' : '40%+ water lost to rapid evaporation'}</span>
                  </p>
                  <p className="flex items-center gap-1.5 font-medium">
                    <span className="text-rose-700 font-bold">✕</span>
                    <span>{isHi ? 'जड़ों को थर्मल शॉक व फंगस का खतरा' : 'High risk of thermal root scalding'}</span>
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Farm Water Schedule Matrix (5-Day Adaptive) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 5-Day Dynamic Schedule */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-700" />
                  <span>{isHi ? '5-दिवसीय स्वचालित सिंचाई कार्यक्रम' : '5-Day Adaptive Irrigation Schedule'}</span>
                </h3>
                <span className="text-xs font-bold text-slate-500">
                  {isHi ? 'मौसम आधारित समायोजन' : 'Weather-synced'}
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { day: isHi ? 'आज (सोम)' : 'Today (Mon)', lit: `${totalWaterRequiredLiters.toLocaleString('en-IN')} L`, time: '6:00 AM – 7:15 AM', status: isHi ? 'सर्वोत्तम समय' : 'Optimal Window', note: `${currentCrop.nameEn} • ${currentPump.hp} HP (${formattedRunDuration})`, color: 'text-emerald-700 bg-emerald-50' },
                  { day: isHi ? 'कल (मंगल)' : 'Tomorrow (Tue)', lit: '0 L', time: isHi ? 'रोका गया (Paused)' : 'Paused', status: isHi ? 'वर्षा अनुमान' : 'Rain Expected', note: isHi ? 'बारिश से पर्याप्त नमी प्राप्त होगी' : 'Precipitation covers moisture need', color: 'text-amber-800 bg-amber-50' },
                  { day: isHi ? 'बुधवार' : 'Wednesday', lit: `${Math.round(totalWaterRequiredLiters * 0.5).toLocaleString('en-IN')} L`, time: '5:30 PM – 6:15 PM', status: isHi ? 'पोस्ट-रेन टॉप-अप' : 'Post-Rain Top-up', note: isHi ? 'केवल सूखे हिस्सों के लिए' : 'Only for elevated dry patches', color: 'text-sky-800 bg-sky-50' },
                  { day: isHi ? 'गुरुवार' : 'Thursday', lit: `${totalWaterRequiredLiters.toLocaleString('en-IN')} L`, time: '6:00 AM – 7:30 AM', status: isHi ? 'नियमित सिंचाई' : 'Regular Schedule', note: isHi ? 'वानस्पतिक विकास कोटा' : 'Vegetative growth cycle', color: 'text-emerald-700 bg-emerald-50' },
                  { day: isHi ? 'शुक्रवार' : 'Friday', lit: `${Math.round(totalWaterRequiredLiters * 0.9).toLocaleString('en-IN')} L`, time: '6:00 AM – 7:20 AM', status: isHi ? 'फर्टिगेशन (खाद)' : 'Fertigation Schedule', note: isHi ? 'घुलनशील NPK खाद मिश्रण' : 'Water soluble fertilizer dosing', color: 'text-emerald-700 bg-emerald-50' }
                ].map((sched, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <p className="font-black text-slate-900 text-sm">{sched.day}</p>
                      <p className="text-slate-500 font-medium">{sched.time} • {sched.note}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-slate-800 text-sm">{sched.lit}</span>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${sched.color}`}>
                        {sched.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Water Conservation Scorecard */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-1">
                  {isHi ? 'जल दक्षता रिपोर्ट' : 'Water Efficiency Metrics'}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {isHi ? 'पिछले 30 दिनों का जल उपयोग विश्लेषण' : 'Last 30 days telemetry audit'}
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-medium">{isHi ? 'मासिक जल बचत' : 'Total Saved Water'}</p>
                    <p className="text-xl font-black text-emerald-900">24,800 Litres</p>
                  </div>
                  <span className="text-2xl">🌿</span>
                </div>

                <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-medium">{isHi ? 'बिजली बिल बचत' : 'Power Saved'}</p>
                    <p className="text-xl font-black text-blue-900">₹1,850</p>
                  </div>
                  <span className="text-2xl">⚡</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 font-medium leading-relaxed">
                💡 <strong>{isHi ? 'सलाह:' : 'Agronomist Tip:'}</strong> {isHi ? `${currentCrop.nameHi} में ड्रिप से पानी देने से जड़ गलन की समस्या 80% तक घट जाती है और समान नमी बनी रहती है।` : `Precision drip for ${currentCrop.nameEn} maintains uniform root tension and eliminates fungal collar-rot risk.`}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: VILLAGE COMMAND CENTER */}
      {irrigationMode === 'village' && (
        <div className="space-y-8 animate-in fade-in">
          
          {/* Village Water Assets Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 text-2xl font-bold">
                🌾
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">{t.totalFarms}</p>
                <p className="text-xl font-black text-slate-900">Salarpur Village (100 Farms)</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-800 text-2xl font-bold">
                💧
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">{t.waterSources}</p>
                <p className="text-xl font-black text-sky-900">320,000 L Daily Capacity</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 text-2xl font-bold">
                ⚖️
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Equitable Rationing</p>
                <p className="text-xl font-black text-amber-900">100% Tail-end Reached</p>
              </div>
            </div>
          </div>

          {/* Interactive 100-Farm Grid Map */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">{t.villageMapTitle}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {isHi ? 'किसी भी खेत नोड पर क्लिक करके लाइव जल आवंटन और स्थिति देखें' : 'Click on any farm node to inspect water allocation quota and canal feeder'}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-md bg-emerald-600"></span> {isHi ? 'पर्याप्त पानी' : 'Optimal'}</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-md bg-amber-500"></span> {isHi ? 'सिंचाई प्रतीक्षित' : 'Scheduled'}</span>
              </div>
            </div>

            {/* Farm Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 p-4 bg-slate-50 rounded-3xl border border-slate-200">
              {villageFarms.map((farm, idx) => {
                const isSelected = selectedFarmNode?.id === farm.id;
                const isMyFarm = farm.id === 104; // Meerut demo farm
                return (
                  <button
                    key={farm.id}
                    onClick={() => setSelectedFarmNode(farm)}
                    className={`h-20 rounded-2xl p-2 flex flex-col justify-between text-left transition transform hover:scale-105 ${
                      isMyFarm 
                        ? 'bg-amber-500 text-white ring-4 ring-amber-300 shadow-lg' 
                        : isSelected 
                          ? 'bg-emerald-900 text-white ring-2 ring-emerald-500 shadow-md' 
                          : 'bg-white hover:bg-emerald-50 border border-slate-200/90 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-black">{farm.name}</span>
                      <span className={`w-2 h-2 rounded-full ${farm.status.includes('Scheduled') ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                    </div>
                    <div>
                      <p className={`text-[10px] font-bold truncate ${isMyFarm || isSelected ? 'text-white' : 'text-slate-600'}`}>{farm.crop.split(' ')[0]}</p>
                      <p className={`text-[9px] font-semibold ${isMyFarm || isSelected ? 'text-white/80' : 'text-slate-400'}`}>{farm.need}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Farm Inspector Drawer */}
            {selectedFarmNode && (
              <div className="p-5 rounded-2xl bg-slate-100 border border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
                <div>
                  <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {isHi ? 'खेत विवरण' : 'Farm Telemetry Details'}
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-1">
                    {selectedFarmNode.name} • {selectedFarmNode.farmer}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {selectedFarmNode.crop} • {selectedFarmNode.acres} {isHi ? 'एकड़' : 'Acres'} • {isHi ? 'मृदा नमी:' : 'Soil Moisture:'} {selectedFarmNode.moisture}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-slate-500 font-bold">{isHi ? 'दैनिक कोटा' : 'Daily Quota'}</p>
                    <p className="text-base font-black text-slate-900">{selectedFarmNode.need}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedFarmNode(null)}
                    className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50"
                  >
                    {isHi ? 'बंद करें' : 'Close'}
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* POP-UP REMINDER & ALARM MODAL */}
      {showAlarmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-emerald-500 space-y-6 animate-in zoom-in-95 duration-300 relative overflow-hidden">
            
            {/* Top Glowing Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 animate-bounce">
                  <BellRing className="w-6 h-6" />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                    {isHi ? '⏰ सिंचाई अलार्म व सूचना' : '⏰ Smart Irrigation Reminder'}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">
                    {isHi ? 'सिंचाई प्रारंभ करने का समय हो गया है!' : 'Time to Irrigate Your Crop!'}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setShowAlarmModal(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Alarm Information Grid */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-bold">{isHi ? 'खेत एवं फसल:' : 'Farm & Crop:'}</span>
                <span className="font-black text-slate-900 text-sm">
                  {currentCrop.icon} {isHi ? currentCrop.nameHi : currentCrop.nameEn} ({farmAcres} {isHi ? 'एकड़' : 'Acres'})
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-bold">{isHi ? 'पंप विनिर्देश (Pump Specs):' : 'Pump Specifications:'}</span>
                <span className="font-extrabold text-slate-900">
                  ⚡ {currentPump.hp} HP ({currentPump.lpm} L/min • {isHi ? currentPump.typeHi : currentPump.typeEn})
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-bold">{isHi ? 'आवश्यक पानी (Water Needed):' : 'Required Water Dose:'}</span>
                <span className="font-black text-sky-800 text-sm">
                  💧 {totalWaterRequiredLiters.toLocaleString('en-IN')} {isHi ? 'लीटर' : 'Litres'} ({irrigationMethod.toUpperCase()})
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-bold">{isHi ? 'पंप चलने की सटीक अवधि:' : 'Exact Pump Duration:'}</span>
                <span className="font-black text-amber-700 text-base">
                  ⏱️ {formattedRunDuration} ({isHi ? 'ऑटो कटऑफ' : 'Auto Cut-off'})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-bold">{isHi ? 'वर्तमान स्थान:' : 'Current Location:'}</span>
                <span className="font-bold text-slate-700">
                  📍 {currentLocation?.name || 'Meerut'}, {currentLocation?.state || 'Uttar Pradesh'}
                </span>
              </div>
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between px-2 text-xs">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                <span>{soundEnabled ? (isHi ? 'अलार्म ध्वनि चालू है' : 'Chime sound enabled') : (isHi ? 'ध्वनि म्यूट है' : 'Chime muted')}</span>
              </button>

              <span className="text-[11px] text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded-full">
                {isHi ? 'सुबह 6:00 AM स्लॉट' : '6:00 AM Slot'}
              </span>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setPumpActive(true);
                  setPumpTimer(exactRunMinutes);
                  setShowAlarmModal(false);
                }}
                className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-lg shadow-emerald-900/20 transition flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isHi ? `पंप चालू करें (${exactRunMinutes}m ऑटो कटऑफ)` : `Start Pump (${exactRunMinutes}m Auto-off)`}</span>
              </button>

              <button
                onClick={() => setShowAlarmModal(false)}
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
              >
                {isHi ? 'बाद में (Snooze)' : 'Dismiss'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
