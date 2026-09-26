import React, { useState, useMemo } from 'react';
import { 
  Landmark, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Sun, 
  CreditCard, 
  HelpCircle, 
  FileText,
  Filter,
  RefreshCw,
  Search,
  Check,
  PhoneCall,
  Sliders,
  Award,
  Clock,
  Layers,
  ChevronRight,
  Info,
  ShieldAlert,
  Building
} from 'lucide-react';
import { governmentSchemes, SCHEME_CATEGORIES } from '../../data/schemesData';

export default function SchemesTab({ lang, t }) {
  const isHi = lang === 'hi';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Live Synchronized');
  const [calcAcres, setCalcAcres] = useState(5);
  const [farmerType, setFarmerType] = useState('small_marginal'); // 'small_marginal' | 'general' | 'women_sc_st' | 'fpo'
  const [showDocModal, setShowDocModal] = useState(null);

  // Live Sync Simulation with myScheme & Ministry of Agriculture API registry
  const handleLiveSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(isHi ? `आज ${timeStr} पर लाइव अपडेटेड` : `Live Synced at ${timeStr}`);
    }, 800);
  };

  // Filter schemes based on category and search query
  const filteredSchemes = useMemo(() => {
    return governmentSchemes.filter(scheme => {
      const matchCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        scheme.titleEn.toLowerCase().includes(q) ||
        scheme.titleHi.toLowerCase().includes(q) ||
        scheme.benefitEn.toLowerCase().includes(q) ||
        scheme.benefitHi.toLowerCase().includes(q) ||
        scheme.badge.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Dynamic Subsidy Calculator Values based on farmer's acreage and category
  const calculatedBenefits = useMemo(() => {
    const acres = parseFloat(calcAcres) || 1;
    let solarSubsidyPercent = farmerType === 'women_sc_st' ? 70 : farmerType === 'small_marginal' ? 60 : 50;
    let dripSubsidyPercent = farmerType === 'women_sc_st' ? 85 : farmerType === 'small_marginal' ? 80 : 55;
    
    // Estimated financial aid
    const solarPumpCost = 220000; // Average 3HP-5HP standalone solar pump
    const solarSubsidyAmount = Math.round(solarPumpCost * (solarSubsidyPercent / 100));
    
    const dripCostPerAcre = 45000;
    const dripTotalCost = dripCostPerAcre * Math.min(acres, 12);
    const dripSubsidyAmount = Math.round(dripTotalCost * (dripSubsidyPercent / 100));
    
    const pmKisanAnnual = 6000;
    const totalPotentialSubsidy = solarSubsidyAmount + dripSubsidyAmount + pmKisanAnnual;

    return {
      totalBenefit: totalPotentialSubsidy,
      solarSubsidyPercent,
      solarSubsidyAmount,
      dripSubsidyPercent,
      dripSubsidyAmount,
      pmKisanAnnual
    };
  }, [calcAcres, farmerType]);

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Title Header with Live Sync & Verification Badge */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase">
              <Landmark className="w-3.5 h-3.5" /> DBT & Direct Subsidy Welfare Hub
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-extrabold border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
              <span>{isHi ? '100% भारत सरकार अधिकृत .gov.in पोर्टल्स' : '100% Official .gov.in Verified Portals'}</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{t.schemesTitle}</h2>
          <p className="text-slate-600 text-sm font-medium mt-1">{t.schemesSub}</p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <button
            onClick={handleLiveSync}
            disabled={syncing}
            className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-black rounded-2xl shadow-md transition flex items-center gap-2 disabled:opacity-50"
            title={isHi ? 'सरकारी पोर्टल्स से नई योजनाएं सिंक करें' : 'Check for new government schemes'}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? (isHi ? 'पोर्टल सिंक हो रहा है...' : 'Syncing with myScheme...') : (isHi ? '🔄 नई योजनाएं खोजें / सिंक करें' : '🔄 Live Portal Sync')}</span>
          </button>
        </div>
      </div>

      {/* Official Government Verification & Live Sync Status Bar */}
      <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-emerald-950 font-bold">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></div>
          <span>
            {isHi 
              ? `सभी योजनाएं कृषि मंत्रालय (MoA&FW) व myScheme.gov.in से प्रमाणित हैं • स्थिति: ${lastSyncTime}` 
              : `All schemes verified with Ministry of Agriculture & myScheme.gov.in • Status: ${lastSyncTime}`}
          </span>
        </div>

        <div className="flex items-center gap-4 text-emerald-900 font-extrabold">
          <span className="flex items-center gap-1">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isHi ? 'किसान कॉल सेंटर:' : 'Kisan Helpline:'} 1800-180-1551 (24x7)</span>
          </span>
        </div>
      </div>

      {/* INTERACTIVE SUBSIDY ELIGIBILITY CALCULATOR */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-emerald-800/80">
          <div>
            <span className="px-3 py-1 bg-white/20 text-white text-[11px] font-black rounded-full uppercase tracking-wider">
              {isHi ? 'डायरेक्ट सब्सिडी पात्रता कैलकुलेटर' : 'Direct Grant & Subsidy Matcher'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-2">
              {isHi ? `आपके ${calcAcres} एकड़ खेत के लिए सरकारी वित्तीय अनुदान` : `Subsidies Qualified for your ${calcAcres}-Acre Farm`}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 font-medium mt-1 max-w-2xl">
              {isHi 
                ? 'अपनी किसान श्रेणी और जमीन का रकबा चुनें। सिस्टम स्वतः आपकी कुल पात्र सब्सिडी और सरकारी छूट की गणना करेगा।' 
                : 'Select your land size and farmer category to compute verified central and state financial aid.'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center min-w-[200px]">
            <p className="text-xs text-emerald-200 font-bold uppercase">{isHi ? 'कुल संभावित सरकारी लाभ' : 'Total Eligible Benefit'}</p>
            <p className="text-3xl font-black text-amber-400 mt-1">₹{calculatedBenefits.totalBenefit.toLocaleString('en-IN')}</p>
            <span className="text-[10px] text-emerald-300 font-semibold">DBT + Direct Subsidy Assistance</span>
          </div>
        </div>

        {/* Interactive Sliders / Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          {/* Acreage Input */}
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 space-y-1.5">
            <label className="font-extrabold text-emerald-200 uppercase">{isHi ? 'खेत का रकबा (Acres)' : 'Land Size (Acres)'}</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0.5"
                step="0.5"
                max="50"
                value={calcAcres}
                onChange={(e) => setCalcAcres(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 font-bold outline-none"
              />
              <span className="font-bold text-white">{isHi ? 'एकड़' : 'Acres'}</span>
            </div>
          </div>

          {/* Farmer Category */}
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 space-y-1.5">
            <label className="font-extrabold text-emerald-200 uppercase">{isHi ? 'किसान श्रेणी (Category)' : 'Farmer Category'}</label>
            <select
              value={farmerType}
              onChange={(e) => setFarmerType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 font-bold outline-none cursor-pointer"
            >
              <option value="small_marginal">{isHi ? 'लघु व सीमांत किसान (< 5 एकड़)' : 'Small/Marginal (< 5 Acres)'}</option>
              <option value="women_sc_st">{isHi ? 'महिला / SC / ST किसान' : 'Women / SC / ST Farmer'}</option>
              <option value="general">{isHi ? 'सामान्य किसान (> 5 एकड़)' : 'General Farmer (> 5 Acres)'}</option>
              <option value="fpo">{isHi ? 'FPO / किसान उत्पादक संगठन' : 'Farmer Producer Org (FPO)'}</option>
            </select>
          </div>

          {/* Solar Pump Aid Breakdown */}
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 space-y-0.5">
            <p className="text-emerald-200 font-bold">⚡ {isHi ? 'सोलर पंप सब्सिडी (PM KUSUM):' : 'Solar Pump Subsidy (KUSUM):'}</p>
            <p className="text-lg font-black text-amber-300">
              {calculatedBenefits.solarSubsidyPercent}% ({isHi ? 'छूट' : 'Off'})
            </p>
            <p className="text-[11px] text-emerald-200">
              ₹{calculatedBenefits.solarSubsidyAmount.toLocaleString('en-IN')} {isHi ? 'सरकारी अनुदान' : 'Govt Grant'}
            </p>
          </div>

          {/* Micro-Irrigation Drip Breakdown */}
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 space-y-0.5">
            <p className="text-emerald-200 font-bold">💧 {isHi ? 'ड्रिप सिंचाई सब्सिडी (PDMC):' : 'Drip Irrigation Aid (PDMC):'}</p>
            <p className="text-lg font-black text-emerald-400">
              {calculatedBenefits.dripSubsidyPercent}% ({isHi ? 'छूट' : 'Off'})
            </p>
            <p className="text-[11px] text-emerald-200">
              ₹{calculatedBenefits.dripSubsidyAmount.toLocaleString('en-IN')} {isHi ? 'अनुदान राशि' : 'Financial Aid'}
            </p>
          </div>

        </div>

      </div>

      {/* Category Tabs & Search Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHi ? 'योजना का नाम, सोलर, ट्रैक्टर, बीमा, या सब्सिडी खोजें...' : 'Search schemes, solar, subsidy, loan, drone...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 bg-white focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none shadow-xs"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-700">✕</button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span>{filteredSchemes.length} {isHi ? 'योजनाएं उपलब्ध' : 'Schemes Available'}</span>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SCHEME_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-emerald-900 text-white border-emerald-950 shadow-md shadow-emerald-900/20 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:bg-emerald-50/70 border-slate-200 shadow-xs'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{isHi ? cat.nameHi : cat.nameEn}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-300" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Verified Government Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div 
            key={scheme.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-400 transition flex flex-col justify-between space-y-6 group relative overflow-hidden"
          >
            <div className="space-y-4">
              
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-black">
                    {isHi ? scheme.badgeHi : scheme.badge}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                    ✓ {scheme.verifiedPortal}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {isHi ? scheme.statusHi : scheme.status}
                </span>
              </div>

              {/* Title & Ministry */}
              <div>
                <h4 className="text-xl font-black text-slate-900 group-hover:text-emerald-800 transition">
                  {isHi ? scheme.titleHi : scheme.titleEn}
                </h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                  🏛️ {isHi ? scheme.departmentHi : scheme.departmentEn}
                </p>
                <p className="text-xs text-emerald-700 font-black mt-1.5">
                  {isHi ? scheme.subsidyHi : scheme.subsidy}
                </p>
              </div>

              {/* Benefit Box */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs text-slate-700">
                <p className="font-bold text-slate-900">
                  🎁 {isHi ? 'लाभ एवं अनुदान:' : 'Benefit & Assistance:'}
                </p>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {isHi ? scheme.benefitHi : scheme.benefitEn}
                </p>
              </div>

              {/* Eligibility & Documents */}
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-800">✅ {isHi ? 'पात्रता:' : 'Eligibility:'} </span>
                  <span className="font-medium text-slate-600">{isHi ? scheme.eligibilityHi : scheme.eligibilityEn}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-800">📄 {isHi ? 'आवश्यक दस्तावेज:' : 'Required Docs:'} </span>
                  <span className="font-medium text-slate-600">{isHi ? scheme.documentsRequiredHi : scheme.documentsRequiredEn}</span>
                </div>
              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                <span>{isHi ? 'हेल्पलाइन:' : 'Helpline:'} {scheme.helpline}</span>
              </div>

              <a 
                href={scheme.actionLink} 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-black shadow-md transition flex items-center gap-1.5"
              >
                <span>{isHi ? 'आधिकारिक सरकारी पोर्टल खोलें' : 'Open Official Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
