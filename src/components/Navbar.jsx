import React, { useState } from 'react';
import { 
  Sprout, 
  Globe, 
  Bell, 
  Sparkles, 
  User, 
  LogIn, 
  LogOut, 
  ChevronDown, 
  MapPin, 
  Menu, 
  X,
  LayoutDashboard,
  Home,
  ShieldAlert,
  ShieldCheck,
  Building2,
  Droplets,
  TrendingUp,
  Landmark,
  Layers,
  Compass,
  ArrowRight,
  Activity,
  Scan
} from 'lucide-react';
import { logoutUser } from '../services/firebase';
import { getUserDisplayName, getUserFirstName, getUserInitial } from '../utils/greetingUtils';

export default function Navbar({ 
  lang, 
  setLang, 
  t, 
  activeTab, 
  setActiveTab, 
  showNotifications, 
  setShowNotifications, 
  loadDemoFarm,
  user,
  currentLocation,
  onDetectLocation,
  locatingGps
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isHi = lang === 'hi';

  const menuItems = [
    { 
      id: 'landing', 
      label: t.navLanding, 
      desc: isHi ? 'होम पेज व मुख्य विशेषताएं' : 'Overview & platform features',
      icon: Home,
      color: 'bg-emerald-100 text-emerald-800'
    },
    { 
      id: 'dashboard', 
      label: t.navDashboard, 
      desc: isHi ? 'लाइव मौसम रडार व दैनिक कार्य' : 'Live weather & priority actions',
      icon: LayoutDashboard,
      color: 'bg-teal-100 text-teal-800'
    },
    { 
      id: 'farmerhub', 
      label: t.navFarmerHub || '👨‍🌾 Farmer Blockchain Hub', 
      desc: isHi ? '3-फैक्टर टेलीमेट्री बंडल व MST ब्लॉकचेन डिस्पैच' : '3-Factor farm telemetry & MST blockchain dispatch',
      icon: ShieldCheck,
      color: 'bg-emerald-100 text-emerald-800'
    },
    { 
      id: 'pearlmillet', 
      label: t.navPearlMillet, 
      desc: isHi ? 'YOLOv11 + ViT पादप रोग, पत्ती पहचान व AI सलाह' : 'YOLOv11 + ViT Dual-Model Plant Disease Detector',
      icon: Scan,
      color: 'bg-amber-100 text-amber-800'
    },
    { 
      id: 'recommendation', 
      label: t.navGrow, 
      desc: isHi ? '3D खेत लेआउट व ESP32 लाइव सेंसर' : 'ESP32 IoT sensors & 3D farm telemetry',
      icon: Activity,
      color: 'bg-emerald-100 text-emerald-800'
    },
    { 
      id: 'fertilizercompany', 
      label: t.navFertilizerCompany || '🏢 Fertilizer Company', 
      desc: isHi ? 'Gemini AI सटीक खाद, स्प्रे शेड्यूल व ब्लॉक सत्यापन' : 'Gemini AI precision fertilizer, spray schedule & block minting',
      icon: Building2,
      color: 'bg-amber-100 text-amber-800'
    },
    { 
      id: 'irrigation', 
      label: t.navWater, 
      desc: isHi ? 'स्मार्ट ड्रिप व गांव जल आवंटन' : 'Smart water & drip allocation',
      icon: Droplets,
      color: 'bg-blue-100 text-blue-800'
    },
    { 
      id: 'market', 
      label: t.navMarket, 
      desc: isHi ? 'PyTorch ResNet-18 मृदा पहचान व 4-वर्ग विश्लेषण' : 'PyTorch ResNet-18 Soil Classification & Agronomics',
      icon: Sprout,
      color: 'bg-emerald-100 text-emerald-800'
    },
    { 
      id: 'schemes', 
      label: t.navSchemes, 
      desc: isHi ? 'पीएम-कुसुम व सरकारी अनुदान' : 'PM-KUSUM & farmer subsidies',
      icon: Landmark,
      color: 'bg-purple-100 text-purple-800'
    },
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-2">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group flex-shrink-0" 
            onClick={() => handleSelectTab('landing')}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl overflow-hidden bg-emerald-950 flex items-center justify-center shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform duration-200 border border-emerald-600/40 flex-shrink-0 p-0.5">
              <img 
                src="/logo.png" 
                alt="KrishiAI Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex-shrink-0">
              <span className="text-lg sm:text-xl font-black text-emerald-950 tracking-tight block leading-tight">
                {t.brand}
              </span>
              <p className="text-[10px] text-slate-500 hidden md:block leading-none mt-0.5 font-medium">
                {isHi ? 'स्मार्ट कृषि निर्णय मंच' : 'Smart Farm Decision Engine'}
              </p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            
            {/* Quick GPS Location Detect Button */}
            {onDetectLocation && (
              <button
                onClick={onDetectLocation}
                disabled={locatingGps}
                title={isHi ? "मेरी लाइव GPS लोकेशन खोजें" : "Detect My Live GPS Location"}
                className="px-2 sm:px-3 py-1.5 text-xs font-bold border border-emerald-300 rounded-xl bg-emerald-50/90 hover:bg-emerald-100 text-emerald-950 transition flex items-center gap-1 sm:gap-1.5 shadow-xs disabled:opacity-50 active:scale-95 whitespace-nowrap"
              >
                <MapPin className={`w-3.5 h-3.5 text-emerald-700 flex-shrink-0 ${locatingGps ? 'animate-bounce text-amber-600' : ''}`} />
                <span className="font-bold max-w-[65px] sm:max-w-[120px] truncate text-[11px] sm:text-xs">
                  {locatingGps 
                    ? (isHi ? 'खोज रहे...' : 'Locating...') 
                    : (currentLocation?.name || (isHi ? 'लोकेशन' : 'Locate'))}
                </span>
              </button>
            )}

            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="px-2 sm:px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 hover:border-emerald-300 transition flex items-center gap-1 sm:gap-1.5 shadow-xs whitespace-nowrap"
              title={lang === 'en' ? "हिंदी में बदलें" : "Switch to English"}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
              <span className="font-extrabold text-[11px] sm:text-xs">
                {lang === 'en' ? 'हिंदी' : 'EN'}
              </span>
            </button>

            {/* Notifications Drawer */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 rounded-xl border border-slate-200 hover:bg-slate-50 relative transition flex items-center justify-center"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white animate-pulse"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-96 max-w-sm bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-4 space-y-3 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-sm text-slate-900">
                        {isHi ? 'खेत सूचनाएं एवं चेतावनी' : 'Real-time Farm Alerts'}
                      </span>
                    </div>
                    <span className="text-[11px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                      3 New
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <p className="font-bold text-amber-900 flex items-center gap-1.5">
                        🌧️ {isHi ? 'उच्च आर्द्रता व वर्षा चेतावनी' : 'High Humidity & Rain Alert'}
                      </p>
                      <p className="text-amber-800 mt-1">
                        {isHi 
                          ? '71% आर्द्रता। पत्ती धब्बा रोग का खतरा बढ़ा। रासायनिक छिड़काव टालें।'
                          : '71% Humidity in Meerut. Risk of fungal leaf spot elevated. Postpone chemical sprays.'}
                      </p>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <p className="font-bold text-blue-900 flex items-center gap-1.5">
                        💧 {isHi ? 'सिंचाई अनुकूलन' : 'Irrigation Optimizer'}
                      </p>
                      <p className="text-blue-800 mt-1">
                        {isHi 
                          ? 'आज पानी 2,400 लीटर तक सीमित रखें। मौजूदा नमी के आधार पर 800 लीटर बचत होगी।'
                          : 'Cap daily water usage to 2,400L. Save 800L based on current root zone moisture.'}
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <p className="font-bold text-emerald-900 flex items-center gap-1.5">
                        📈 {isHi ? 'मंडी भाव में उछाल' : 'Mandi Price Spike'}
                      </p>
                      <p className="text-emerald-800 mt-1">
                        {isHi 
                          ? 'मेरठ APMC मंडी में हरी मिर्च ₹78.5/किग्रा पर पहुंची (+14.2%)।'
                          : 'Green Chilli rate reached ₹78.5/kg in Meerut APMC (+14.2%).'}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="w-full text-center py-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold border-t border-slate-100"
                  >
                    {isHi ? 'बंद करें' : 'Close Notifications'}
                  </button>
                </div>
              )}
            </div>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl sm:rounded-2xl transition shadow-xs"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={getUserDisplayName(user, 'Farmer')}
                      className="w-6 h-6 rounded-full object-cover border border-emerald-400 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {getUserInitial(user, 'K')}
                    </div>
                  )}
                  <span className="hidden md:inline-block text-xs font-black text-emerald-950 max-w-[100px] truncate">
                    {getUserFirstName(user, isHi ? 'किसान' : 'Farmer')}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-emerald-700 hidden sm:inline-block" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-60 sm:w-64 max-w-[calc(100vw-1.5rem)] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-4 space-y-3 animate-in fade-in zoom-in-95">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Farmer"
                          className="w-10 h-10 rounded-full border"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center">
                          {getUserInitial(user, 'K')}
                        </div>
                      )}
                      <div className="space-y-0.5 overflow-hidden">
                        <p className="font-extrabold text-xs text-slate-900 truncate">
                          {getUserDisplayName(user, isHi ? 'किसान भाई' : 'Kisan Mitra')}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        handleSelectTab('dashboard');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left py-2 px-3 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-2"
                    >
                      <span>📊</span>
                      <span>{isHi ? 'फार्म डैशबोर्ड' : 'Farm Dashboard'}</span>
                    </button>

                    <button
                      onClick={async () => {
                        await logoutUser();
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left py-2 px-3 rounded-xl hover:bg-red-50 text-xs font-bold text-red-700 flex items-center gap-2 border-t border-slate-100"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{isHi ? 'लॉग आउट' : 'Sign Out'}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleSelectTab('login')}
                className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-white border border-slate-300 text-slate-800 shadow-xs hover:border-emerald-600 hover:bg-emerald-50/50 transition group"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24">
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
                <span>{isHi ? 'लॉगिन' : 'Sign In'}</span>
              </button>
            )}

            {/* Clean, Sleek Master Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-emerald-900 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md shadow-emerald-950/20 transition active:scale-95 border border-emerald-700/60 whitespace-nowrap"
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 flex-shrink-0" /> : <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 flex-shrink-0" />}
              <span className="text-[11px] sm:text-xs">{isHi ? 'मेन्यू' : 'Menu'}</span>
            </button>

          </div>
        </div>
      </header>

      {/* Slide-over Fullscreen/Drawer Menu Modal */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          
          {/* Backdrop Click */}
          <div className="flex-grow" onClick={() => setMenuOpen(false)}></div>

          {/* Drawer Container */}
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-slate-200">
            
            {/* Drawer Header */}
            <div className="p-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white flex items-center justify-between border-b border-emerald-800 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl overflow-hidden bg-emerald-950 flex items-center justify-center text-white border border-emerald-500/50 shadow-inner p-0.5">
                  <img 
                    src="/logo.png" 
                    alt="KrishiAI Logo" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">
                    {isHi ? 'कृषि AI मेन्यू' : 'Krishi AI Navigation'}
                  </h3>
                  <p className="text-xs text-emerald-200 font-medium">
                    {isHi ? 'सभी सुविधाएं एवं मॉड्यूल' : 'All Modules & Features'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items List */}
            <div className="p-4 sm:p-5 space-y-2 flex-grow overflow-y-auto">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider px-2 pb-1">
                {isHi ? 'मुख्य फीचर्स' : 'Platform Features'}
              </div>

              {menuItems.map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full p-3.5 rounded-2xl text-left transition flex items-center justify-between gap-3 border ${
                      isActive
                        ? 'bg-emerald-900 text-white border-emerald-950 shadow-md shadow-emerald-900/20'
                        : 'bg-white hover:bg-emerald-50/70 border-slate-200/90 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold ${
                        isActive ? 'bg-emerald-800 text-white' : item.color
                      }`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-black text-sm truncate">
                          {item.label}
                        </div>
                        <div className={`text-xs truncate ${isActive ? 'text-emerald-200' : 'text-slate-500'}`}>
                          {item.desc}
                        </div>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-emerald-300' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-2.5">
              
              {/* Load Demo Farm */}
              <button
                onClick={() => {
                  loadDemoFarm();
                  setMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.demoFarmBtn}</span>
              </button>

              {/* User state in mobile drawer */}
              {user ? (
                <div className="bg-emerald-50/80 rounded-2xl p-3 border border-emerald-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Farmer"
                        className="w-8 h-8 rounded-full border border-emerald-400"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {getUserInitial(user, 'K')}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-black text-slate-900 truncate">
                        {getUserDisplayName(user, isHi ? 'किसान भाई' : 'Kisan Mitra')}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      await logoutUser();
                      setMenuOpen(false);
                    }}
                    className="p-2 rounded-xl bg-red-100/80 hover:bg-red-200 text-red-700 transition flex-shrink-0"
                    title={isHi ? 'लॉग आउट' : 'Sign Out'}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleSelectTab('login');
                    setMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-2xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4 text-emerald-800" />
                  <span>{isHi ? 'किसान खाता लॉगिन करें' : 'Sign In to Farmer Account'}</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
