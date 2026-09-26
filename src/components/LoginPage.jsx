import React, { useState } from 'react';
import { 
  Sprout, 
  Sparkles, 
  ShieldCheck, 
  Droplets, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Lock,
  Mail,
  User,
  LogOut,
  ChevronLeft,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { signInWithGoogle, loginWithEmail, registerWithEmail, logoutUser } from '../services/firebase';
import { getUserDisplayName, getUserInitial } from '../utils/greetingUtils';

export default function LoginPage({ 
  lang, 
  t, 
  user, 
  onClose, 
  onLoginSuccess 
}) {
  const isHi = lang === 'hi';
  const [authMode, setAuthMode] = useState('google'); // 'google' | 'email_login' | 'email_signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle direct Google Sign-in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    setErrorCode('');
    setSuccessMsg('');
    const { user: loggedInUser, error, code } = await signInWithGoogle();
    setLoading(false);
    if (error) {
      setErrorCode(code || '');
      if (code === 'auth/configuration-not-found' || error.includes('configuration-not-found')) {
        setErrorMsg(isHi 
          ? 'फायरबेस कंसोल में "Google Sign-in" अभी चालू (Enable) नहीं है।' 
          : 'Google Sign-in provider is not yet enabled in Firebase Console for this project.');
      } else {
        setErrorMsg(isHi ? `लॉगिन में समस्या: ${error}` : `Google Sign-in failed: ${error}`);
      }
    } else if (loggedInUser) {
      const name = getUserDisplayName(loggedInUser, isHi ? 'किसान भाई' : 'Kisan Mitra');
      setSuccessMsg(isHi ? `स्वागत है, ${name}!` : `Welcome, ${name}!`);
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(loggedInUser);
        if (onClose) onClose();
      }, 900);
    }
  };

  // Instant Demo Farmer Login fallback
  const handleDemoFarmerLogin = () => {
    const demoUser = {
      uid: 'demo-farmer-104',
      displayName: isHi ? 'रमेश सिंह (प्रमाणित किसान)' : 'Ramesh Singh (Verified Farmer)',
      email: 'ramesh.farmer@krishi-ai.in',
      photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      emailVerified: true
    };
    setSuccessMsg(isHi ? 'डेमो किसान खाते से लॉगिन सफल!' : 'Logged in as Demo Kisan!');
    setTimeout(() => {
      if (onLoginSuccess) onLoginSuccess(demoUser);
      if (onClose) onClose();
    }, 600);
  };

  // Handle Email / Password Login
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setErrorCode('');
    setSuccessMsg('');

    if (authMode === 'email_signup') {
      const { user: newUser, error, code } = await registerWithEmail(displayName, email, password);
      setLoading(false);
      if (error) {
        setErrorCode(code || '');
        setErrorMsg(error);
      } else if (newUser) {
        const name = getUserDisplayName(newUser, isHi ? 'किसान भाई' : 'Kisan Mitra');
        setSuccessMsg(isHi ? `पंजीकरण सफल! स्वागत है, ${name}!` : `Account created! Welcome, ${name}!`);
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(newUser);
          if (onClose) onClose();
        }, 900);
      }
    } else {
      const { user: loggedInUser, error, code } = await loginWithEmail(email, password);
      setLoading(false);
      if (error) {
        setErrorCode(code || '');
        setErrorMsg(error);
      } else if (loggedInUser) {
        const name = getUserDisplayName(loggedInUser, isHi ? 'किसान भाई' : 'Kisan Mitra');
        setSuccessMsg(isHi ? `लॉगिन सफल! स्वागत है, ${name}!` : `Welcome back, ${name}!`);
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(loggedInUser);
          if (onClose) onClose();
        }, 900);
      }
    }
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    setLoading(true);
    await logoutUser();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-800 flex flex-col justify-between selection:bg-emerald-600 selection:text-white relative overflow-hidden">
      
      {/* Background ambient glowing shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/60 to-transparent blur-3xl -z-10 pointer-events-none"></div>

      {/* Top Simple Navigation */}
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <button 
          onClick={onClose}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-slate-700 hover:text-emerald-900 bg-white border border-slate-200 shadow-xs px-4 py-2 rounded-2xl transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{isHi ? 'वापस मुख्य पृष्ठ पर जाएं' : 'Back to KrishiAI App'}</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl overflow-hidden bg-emerald-950 flex items-center justify-center shadow-md border border-emerald-600/40 p-0.5">
            <img 
              src="/logo.png" 
              alt="KrishiAI Logo" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <span className="text-xl font-black text-emerald-950 tracking-tight">KrishiAI</span>
        </div>
      </header>

      {/* Main Login Screen Container */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow flex items-center justify-center">
        
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 w-full">
          
          {/* Left Panel: Branding & Farmer Benefits (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-black border border-emerald-700/50">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isHi ? 'किसान डिजिटल मंच' : 'Kisan Digital Gateway'}</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                  {isHi ? 'स्मार्ट खेती के नए युग में आपका स्वागत है' : 'Smarter Farming Starts with KrishiAI'}
                </h2>
                <p className="text-xs sm:text-sm text-emerald-200/90 font-medium leading-relaxed">
                  {isHi 
                    ? 'अपने गूगल खाते से सीधे जुड़ें और सटीक मौसम, स्प्रे का सही समय और ग्राम स्तरीय जल प्रबंधन पाएं।' 
                    : 'Sign in directly with your Google account to unlock real-time spray windows, satellite telemetry, and AI agronomist intelligence.'}
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-3 p-3 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-white">{isHi ? 'लाइव मौसम व सुरक्षित स्प्रे विंडो' : 'Precision Spray Window Radar'}</p>
                    <p className="text-[11px] text-emerald-200">{isHi ? 'बारिश व हवा के आधार पर दवा छिड़काव का सही समय' : 'Deterministic 24-72h spray safety calculations'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-white">{isHi ? 'स्मार्ट सिंचाई और 100-फार्म ग्रिड' : 'Smart Micro-Irrigation'}</p>
                    <p className="text-[11px] text-emerald-200">{isHi ? 'दैनिक 800L पानी और 35% बिजली की बचत' : 'Save 40%+ groundwater across village farms'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-white">{isHi ? 'मंडी भाव व सरकारी सब्सिडी' : 'Mandi Rates & Direct DBT Subsidies'}</p>
                    <p className="text-[11px] text-emerald-200">{isHi ? 'APMC लाइव भाव और पीएम-कुसुम सोलर योजनाएं' : 'APMC price surge alerts and subsidy grants'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-emerald-800/80 text-[11px] text-emerald-300 flex items-center justify-between">
              <span>🔒 {isHi ? '100% सुरक्षित फायरबेस प्रमाणीकरण' : 'Firebase Secured Auth'}</span>
              <span>⚡ KrishiAI v2.0</span>
            </div>
          </div>

          {/* Right Panel: Direct Google Login & Auth Actions (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
            
            {/* If User Already Logged In */}
            {user ? (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center gap-4 p-5 bg-emerald-50 rounded-3xl border-2 border-emerald-200">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={getUserDisplayName(user, 'Farmer')} 
                      className="w-16 h-16 rounded-2xl border-2 border-white shadow-md object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white font-black text-2xl flex items-center justify-center">
                      {getUserInitial(user, 'K')}
                    </div>
                  )}

                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-extrabold uppercase">
                      {isHi ? 'लॉगिन स्थिति: सक्रिय' : 'Logged In as Farmer'}
                    </span>
                    <h3 className="text-xl font-black text-slate-900">
                      {getUserDisplayName(user, isHi ? 'किसान मित्र' : 'Kisan Mitra')}
                    </h3>
                    <p className="text-xs text-slate-600 font-semibold">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={onClose}
                    className="w-full py-4 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm shadow-lg shadow-emerald-900/20 transition flex items-center justify-center gap-2"
                  >
                    <span>{isHi ? 'डैशबोर्ड पर आगे बढ़ें' : 'Enter Dashboard'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 font-extrabold text-sm border border-slate-200 transition flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isHi ? 'लॉग आउट करें' : 'Sign Out'}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* If Not Logged In: Direct Google Sign-In & Email Options */
              <div className="space-y-6 animate-in fade-in">
                
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {isHi ? 'किसान खाता लॉगिन' : 'Sign in to KrishiAI'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {isHi 
                      ? 'अपने गूगल जीमेल खाते से 1-क्लिक में सीधा प्रवेश करें।' 
                      : 'Access your smart farm telemetry, spray alerts, and crop reports.'}
                  </p>
                </div>

                {/* Detailed Guidance for configuration-not-found */}
                {errorCode === 'auth/configuration-not-found' && (
                  <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs space-y-2 animate-in fade-in">
                    <div className="flex items-center gap-2 font-black text-amber-900">
                      <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                      <span>{isHi ? 'फायरबेस सेटअप गाइड (Firebase Console):' : 'Enable Google Provider in Firebase Console:'}</span>
                    </div>
                    <p className="leading-relaxed">
                      {isHi 
                        ? 'फायरबेस कंसोल में Authentication > Sign-in method में जाकर "Google" को Enable करें और Save दबाएं।' 
                        : 'Go to your Firebase Console under Authentication > Sign-in method, click Google, toggle "Enable", select your support email, and save.'}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <a
                        href="https://console.firebase.google.com/project/krishi-9ec19/authentication/providers"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold transition"
                      >
                        <span>{isHi ? 'फायरबेस कंसोल खोलें' : 'Open Firebase Console'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        type="button"
                        onClick={handleDemoFarmerLogin}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold transition"
                      >
                        <span>⚡ {isHi ? 'डेमो किसान लॉगिन से तुरंत चलाएं' : 'Continue with Demo Farmer'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Generic Error Message */}
                {errorMsg && errorCode !== 'auth/configuration-not-found' && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* DIRECT GOOGLE LOGIN BUTTON (PRIMARY FOCUS) */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-base border-2 border-slate-300 shadow-md hover:shadow-xl hover:border-emerald-600 transition flex items-center justify-center gap-3.5 group relative"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
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
                    )}
                    <span className="tracking-tight group-hover:text-emerald-950">
                      {isHi ? 'Google खाते से सीधा लॉगिन करें' : 'Sign in with Google Mail'}
                    </span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold px-1">
                    <span>{isHi ? '✓ 1-क्लिक सुरक्षित प्रवेश' : '✓ One-tap instant authentication'}</span>
                    <button
                      type="button"
                      onClick={handleDemoFarmerLogin}
                      className="text-emerald-800 hover:text-emerald-950 font-black underline"
                    >
                      {isHi ? '⚡ डेमो किसान लॉगिन' : '⚡ Demo Farmer Login'}
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-grow h-px bg-slate-200"></div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase">{isHi ? 'अथवा ईमेल से' : 'Or with Email'}</span>
                  <div className="flex-grow h-px bg-slate-200"></div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailAuth} className="space-y-3">
                  {authMode === 'email_signup' && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700 uppercase">
                        {isHi ? 'किसान का नाम' : 'Farmer Name'}
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder={isHi ? 'रमेश कुमार' : 'Ramesh Kumar'}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50/50"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-700 uppercase">
                      {isHi ? 'ईमेल पता' : 'Email Address'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="farmer@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-700 uppercase">
                      {isHi ? 'पासवर्ड' : 'Password'}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition shadow-md flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <span>
                        {authMode === 'email_signup' 
                          ? (isHi ? 'नया खाता बनाएं' : 'Create Free Account') 
                          : (isHi ? 'ईमेल से लॉगिन करें' : 'Sign in with Password')}
                      </span>
                    )}
                  </button>
                </form>

                {/* Toggle between Login and Signup */}
                <div className="text-center text-xs">
                  {authMode === 'email_signup' ? (
                    <p className="text-slate-600">
                      {isHi ? 'पहले से खाता है?' : 'Already have an account?'}{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('email_login')}
                        className="font-black text-emerald-800 hover:underline"
                      >
                        {isHi ? 'लॉगिन करें' : 'Sign in here'}
                      </button>
                    </p>
                  ) : (
                    <p className="text-slate-600">
                      {isHi ? 'नया खाता बनाना चाहते हैं?' : "Don't have an account?"}{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('email_signup')}
                        className="font-black text-emerald-800 hover:underline"
                      >
                        {isHi ? 'यहाँ मुफ्त पंजीकरण करें' : 'Sign up here'}
                      </button>
                    </p>
                  )}
                </div>

              </div>
            )}

          </div>

        </div>

      </main>

      {/* Simple Footer */}
      <footer className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 text-center text-xs text-slate-500 font-medium">
        {isHi ? 'कृषिAI — भारतीय किसानों के सशक्तिकरण के लिए समर्पित • सुरक्षित फायरबेस गूगल ऑथ' : 'KrishiAI — Dedicated to Farmer Empowerment • Secure Firebase Google Auth'}
      </footer>

    </div>
  );
}
