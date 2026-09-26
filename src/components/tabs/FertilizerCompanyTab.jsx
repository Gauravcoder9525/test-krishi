import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  IndianRupee, 
  Droplets, 
  Thermometer, 
  Bot, 
  Send, 
  Layers, 
  Search, 
  RefreshCw, 
  ArrowRight,
  Database,
  Lock,
  Eye,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { 
  fetchBlockchainLedger, 
  analyzeWithGeminiAI, 
  commitCompanyPrescriptionToBlockchain,
  MST_TESTNET_CONFIG
} from '../../services/blockchainClientService';

export default function FertilizerCompanyTab({
  lang = 'en',
  t = {},
  setActiveTab,
  currentLocation
}) {
  const isHi = lang === 'hi';

  // Active Company Profile
  const companyProfile = {
    name: 'IFFCO Precision Agri-Chemicals & Bio-Solutions',
    id: 'IFFCO-IND-409',
    officer: 'Dr. V. K. Pathak (Chief Agronomist & Chemical Evaluator)',
    station: 'Ghaziabad Central Regional Hub'
  };

  // State
  const [activeRequests, setActiveRequests] = useState([
    {
      index: 101,
      blockId: 'MST-TX-7829',
      farmerId: 'KISAN-7829',
      farmerName: 'Rameshwar Sharma',
      location: 'Ghaziabad, Uttar Pradesh',
      crop: 'Pearl Millet (Bajra)',
      timestamp: Date.now() - 1000 * 60 * 12,
      plantDiseaseData: {
        disease: 'Pearl Millet Downy Mildew / Rust',
        confidence: 96.4,
        severity: 'Moderate (Stage 2)',
        imageUri: '/my_crop_photo.jpg'
      },
      mqttData: {
        soil1: 43.5,
        temperature: 28.2,
        humidity: 64,
        rain: false
      },
      soilData: {
        soilType: 'Alluvial Soil (Loamy)',
        ph: '6.8',
        confidence: 94.2
      },
      merkleRoot: '0x4e9c7198b25f0a8274d817361839c02b9e11048261849a93e81726a91837b01c',
      status: 'PENDING_COMPANY_ANALYSIS'
    },
    {
      index: 100,
      blockId: 'MST-TX-7828',
      farmerId: 'KISAN-4102',
      farmerName: 'Balwant Singh',
      location: 'Meerut, Uttar Pradesh',
      crop: 'Chilli & Tomato',
      timestamp: Date.now() - 1000 * 60 * 45,
      plantDiseaseData: {
        disease: 'Early Blight (Alternaria solani)',
        confidence: 93.8,
        severity: 'Early Onset',
        imageUri: '/test.jpg'
      },
      mqttData: {
        soil1: 38.0,
        temperature: 31.0,
        humidity: 58,
        rain: false
      },
      soilData: {
        soilType: 'Clayey Loam Soil',
        ph: '7.2',
        confidence: 91.5
      },
      merkleRoot: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
      status: 'PENDING_COMPANY_ANALYSIS'
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState(activeRequests[0]);
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [aiPrescription, setAiPrescription] = useState(null);
  const [committingBlock, setCommittingBlock] = useState(false);
  const [committedSuccess, setCommittedSuccess] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  // Blockchain Ledger Table State
  const [ledgerBlocks, setLedgerBlocks] = useState([
    {
      index: 1,
      blockId: 'MST-TX-7829',
      blockType: 'FARMER_TELEMETRY_REQUEST',
      sender: 'Rameshwar Sharma (KISAN-7829)',
      merkleRoot: '0x4e9c7198b25f0a8274d817361839c02b9e11048261849a93e81726a91837b01c',
      status: 'PENDING_COMPANY_ANALYSIS',
      time: '12 mins ago'
    },
    {
      index: 0,
      blockId: 'MST-GENESIS',
      blockType: 'GENESIS_BLOCK',
      sender: 'KrishiAI Consortium',
      merkleRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
      status: 'FINALIZED',
      time: 'Genesis Root'
    }
  ]);

  // Synchronize Incoming Dispatched Telemetry from Farmer Hub
  useEffect(() => {
    function loadDispatchedTelemetry() {
      try {
        const storedStr = localStorage.getItem('krishi_active_farmer_request');
        if (storedStr) {
          const req = JSON.parse(storedStr);
          setActiveRequests(prev => {
            const others = prev.filter(r => r.farmerId !== req.farmerId && r.blockId !== req.blockId);
            return [req, ...others];
          });
          setSelectedRequest(prev => {
            if (!prev || prev.blockId === req.blockId || prev.farmerId === req.farmerId) {
              return req;
            }
            return prev;
          });
        }
      } catch (e) {}
    }

    loadDispatchedTelemetry();
    window.addEventListener('krishi_blockchain_dispatched', loadDispatchedTelemetry);
    const interval = setInterval(loadDispatchedTelemetry, 1500);

    return () => {
      window.removeEventListener('krishi_blockchain_dispatched', loadDispatchedTelemetry);
      clearInterval(interval);
    };
  }, []);

  // Run Gemini AI Analysis on selected request
  const handleRunGeminiAnalysis = async () => {
    if (!selectedRequest) return;
    setGeminiLoading(true);
    setCommittedSuccess(false);

    try {
      const payload = {
        plantDiseaseData: selectedRequest.plantDiseaseData,
        mqttData: selectedRequest.mqttData,
        soilData: selectedRequest.soilData,
        cropType: selectedRequest.crop,
        apiKey: geminiApiKey || undefined
      };

      const result = await analyzeWithGeminiAI(payload);
      setAiPrescription(result);
    } catch (err) {
      console.error('Error running Gemini analysis:', err);
    } finally {
      setGeminiLoading(false);
    }
  };

  // Commit Solution onto MST Blockchain
  const handleCommitToBlockchain = async () => {
    if (!selectedRequest || !aiPrescription) return;
    setCommittingBlock(true);

    try {
      const payload = {
        blockIndex: selectedRequest.index,
        companyId: companyProfile.id,
        companyName: companyProfile.name,
        prescription: aiPrescription,
        officerNotes: `Prescription approved by ${companyProfile.officer}`
      };

      const res = await commitCompanyPrescriptionToBlockchain(payload);
      if (res && res.success) {
        setCommittedSuccess(true);
        
        // Update request status
        setSelectedRequest(prev => ({
          ...prev,
          status: 'SOLVED_AND_PRESCRIBED',
          prescription: aiPrescription
        }));

        // Add to ledger table
        const newBlock = {
          index: ledgerBlocks.length + 1,
          blockId: `MST-SOL-${Math.floor(Math.random() * 8000 + 1000)}`,
          blockType: 'FERTILIZER_PRESCRIPTION_SETTLED',
          sender: companyProfile.name,
          merkleRoot: '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
          status: 'VERIFIED_AND_MINTED',
          time: 'Just now'
        };
        setLedgerBlocks([newBlock, ...ledgerBlocks]);
      }
    } catch (err) {
      console.error('Commit error:', err);
    } finally {
      setCommittingBlock(false);
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6 sm:p-10 border border-emerald-800/40 shadow-2xl text-white">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide uppercase">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>{isHi ? '🏢 फर्टिलाइज़र कंपनी सत्यापन पोर्टल' : 'Agro-Chemical & Fertilizer Company Portal'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {isHi ? 'फर्टिलाइजर कंपनी एडवाइजरी व ब्लॉक सत्यापन' : 'Fertilizer Company Diagnostics & Blockchain Minting'}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isHi 
                ? 'किसानों द्वारा भेजे गए 3-फैक्टर टेलीमेट्री ब्लॉक्स को Gemini AI की मदद से जांचें, सटीक खाद व स्प्रे टाइमिंग का प्रेस्क्रिप्शन बनाएं और ब्लॉकचेन पर हैश कमिट करें।'
                : 'Inspect cryptographic farm telemetry bundles, generate precision chemical prescriptions via Gemini AI, and mint verified solution blocks back onto the MST Ledger.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start lg:items-end gap-2 text-left lg:text-right">
            <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Station Node</span>
              <span className="font-bold text-white">{companyProfile.station}</span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-white text-xs">
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Corporate ID</span>
              <span className="font-bold text-amber-300">{companyProfile.id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Incoming Blockchain Requests Queue (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              <span>{isHi ? 'आने वाली किसान रिक्वेस्ट्स' : 'Incoming Farmer Telemetry'}</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              {activeRequests.length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {activeRequests.map((req) => {
              const isSelected = selectedRequest?.blockId === req.blockId;
              return (
                <div
                  key={req.blockId}
                  onClick={() => {
                    setSelectedRequest(req);
                    setAiPrescription(null);
                    setCommittedSuccess(false);
                  }}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-950 text-white border-emerald-500 shadow-xl shadow-emerald-950/20 scale-[1.02]' 
                      : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {req.blockId}
                    </span>
                    <span className={`text-xs font-semibold ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {req.location}
                    </span>
                  </div>

                  <h4 className={`text-base font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {req.farmerName}
                  </h4>
                  <p className={`text-xs mb-3 ${isSelected ? 'text-emerald-300' : 'text-emerald-700 font-medium'}`}>
                    Crop: {req.crop} • {req.plantDiseaseData.disease}
                  </p>

                  <div className={`p-3 rounded-2xl text-xs space-y-1.5 ${
                    isSelected ? 'bg-slate-900/80 border border-slate-800' : 'bg-slate-50 border border-slate-100'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={isSelected ? 'text-slate-400' : 'text-slate-500'}>Soil Moisture:</span>
                      <span className="font-bold">{req.mqttData.soil1}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isSelected ? 'text-slate-400' : 'text-slate-500'}>Soil Class:</span>
                      <span className="font-bold">{req.soilData.soilType}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/20">
                      <span className="text-[10px] font-mono text-slate-400">Merkle Root:</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 truncate max-w-[150px]">
                        {req.merkleRoot}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Telemetry Inspection & Gemini Diagnostic Engine (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {selectedRequest ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              
              {/* Selected Request Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      {selectedRequest.blockId}
                    </span>
                    <span className="text-xs text-slate-500">• Block #{selectedRequest.index}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Farmer Telemetry Inspection: {selectedRequest.farmerName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Location: <span className="font-semibold text-slate-700">{selectedRequest.location}</span> | Crop: <span className="font-semibold text-slate-700">{selectedRequest.crop}</span>
                  </p>
                </div>

                {/* Trigger Gemini Analysis Button */}
                <button
                  onClick={handleRunGeminiAnalysis}
                  disabled={geminiLoading}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm shadow-xl shadow-emerald-900/20 flex items-center gap-2.5 transition active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {geminiLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing with Gemini AI...</span>
                    </>
                  ) : (
                    <>
                      <Bot className="w-5 h-5 text-amber-300" />
                      <span>{isHi ? '🤖 Gemini AI द्वारा विश्लेषण करें' : '🤖 Run Gemini AI Diagnosis'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* 3-Factor Telemetry Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
                  <span className="text-[11px] font-bold text-rose-800 uppercase block mb-1">Plant Disease</span>
                  <div className="flex items-center gap-2.5 mb-1">
                    {selectedRequest.plantDiseaseData?.imageUri && (
                      <img 
                        src={selectedRequest.plantDiseaseData.imageUri} 
                        alt="Leaf Sample" 
                        className="w-10 h-10 rounded-xl object-cover border border-rose-300 flex-shrink-0"
                        onError={(e) => { e.target.src = '/last_disease_scan.jpg'; }}
                      />
                    )}
                    <h5 className="font-extrabold text-slate-900 text-sm leading-snug">{selectedRequest.plantDiseaseData.disease}</h5>
                  </div>
                  <p className="text-xs text-rose-700 mt-1">{selectedRequest.plantDiseaseData.confidence}% Confidence ({selectedRequest.plantDiseaseData.severity})</p>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100">
                  <span className="text-[11px] font-bold text-sky-800 uppercase block mb-1">Live MQTT IoT Telemetry</span>
                  <h5 className="font-extrabold text-slate-900 text-sm">Moisture: {selectedRequest.mqttData.soil1}%</h5>
                  <p className="text-xs text-sky-700 mt-1">{selectedRequest.mqttData.temperature}°C • {selectedRequest.mqttData.humidity}% Humidity</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
                  <span className="text-[11px] font-bold text-amber-800 uppercase block mb-1">Soil Classification</span>
                  <div className="flex items-center gap-2.5 mb-1">
                    {selectedRequest.soilData?.imageUri && (
                      <img 
                        src={selectedRequest.soilData.imageUri} 
                        alt="Soil Sample" 
                        className="w-10 h-10 rounded-xl object-cover border border-amber-300 flex-shrink-0"
                        onError={(e) => { e.target.src = '/last_scanned_soil.jpg'; }}
                      />
                    )}
                    <h5 className="font-extrabold text-slate-900 text-sm leading-snug">{selectedRequest.soilData.soilType}</h5>
                  </div>
                  <p className="text-xs text-amber-700">pH {selectedRequest.soilData.ph} • {selectedRequest.soilData.confidence}% Confidence</p>
                </div>

              </div>

              {/* Merkle Root Hash Proof Bar */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs font-mono space-y-1.5">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Cryptographic MST Merkle Root:</span>
                  <span className="text-emerald-400 font-bold">SHA-256 Validated</span>
                </div>
                <div className="text-emerald-300 break-all font-semibold select-all">
                  {selectedRequest.merkleRoot}
                </div>
              </div>

              {/* Gemini AI Prescription Output Box */}
              {aiPrescription && (
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/40 text-white space-y-6 shadow-xl animate-in fade-in zoom-in-95 duration-300">
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-emerald-800/40">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold">
                        <Sparkles className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-white">
                          {isHi ? 'Gemini AI सटीक खाद व स्प्रे प्रेस्क्रिप्शन' : 'Gemini AI Precision Agronomic Prescription'}
                        </h4>
                        <p className="text-xs text-emerald-300">Multi-Modal Diagnostic Output</p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase">
                      Urgency: {aiPrescription.urgency || 'High'}
                    </span>
                  </div>

                  {/* Problem Summary */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <span className="font-bold text-emerald-400 block mb-1">Diagnostic Problem Summary:</span>
                    {aiPrescription.problemSummary}
                  </div>

                  {/* 4 Pillars of Prescription */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    
                    <div className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-500/30">
                      <span className="text-slate-400 block mb-1">Recommended Fertilizer:</span>
                      <h6 className="font-bold text-sm text-white">{aiPrescription.recommendedFertilizer}</h6>
                      <p className="text-[11px] text-emerald-300 mt-1">{aiPrescription.category}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-900/30 border border-amber-500/30">
                      <span className="text-slate-400 block mb-1 flex items-center justify-between">
                        <span>Spray Timing:</span>
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                      <h6 className="font-bold text-sm text-amber-200">{aiPrescription.sprayTiming}</h6>
                      <p className="text-[11px] text-amber-300 mt-1">Wind & Dew Adjusted</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-sky-900/30 border border-sky-500/30">
                      <span className="text-slate-400 block mb-1">Dosage & Frequency:</span>
                      <h6 className="font-bold text-sm text-sky-200">{aiPrescription.dosage}</h6>
                      <p className="text-[11px] text-sky-300 mt-1">{aiPrescription.sprayFrequency}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-purple-900/30 border border-purple-500/30">
                      <span className="text-slate-400 block mb-1 flex items-center justify-between">
                        <span>Estimated Price:</span>
                        <IndianRupee className="w-3.5 h-3.5 text-purple-400" />
                      </span>
                      <h6 className="font-extrabold text-base text-purple-200">₹{aiPrescription.estimatedPriceINR}</h6>
                      <p className="text-[11px] text-purple-300 mt-1">{aiPrescription.costPerAcre}</p>
                    </div>

                  </div>

                  {/* Commit to MST Blockchain Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-emerald-800/40">
                    <div className="text-xs text-slate-300">
                      Signing as: <span className="font-bold text-white">{companyProfile.officer}</span>
                    </div>

                    <button
                      onClick={handleCommitToBlockchain}
                      disabled={committingBlock || committedSuccess}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2.5 transition active:scale-95 disabled:opacity-75 cursor-pointer"
                    >
                      {committingBlock ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                          <span>Minting Solution Block on Chain...</span>
                        </>
                      ) : committedSuccess ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-950" />
                          <span>✅ Committed & Sent to Farmer!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-slate-950" />
                          <span>{isHi ? '✍️ साइन करें और ब्लॉकचेन पर कमिट करें' : '✍️ Sign & Mint Prescription onto Chain'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {committedSuccess && (
                    <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span>{isHi ? '✅ प्रेस्क्रिप्शन हैश सफलतापूर्वक ब्लॉकचेन पर मिंट हो गया और किसान लेजर में दर्ज कर दिया गया है।' : '✅ Prescription Hash successfully minted onto MST Blockchain Ledger and committed for the farmer.'}</span>
                    </div>
                  )}

                </div>
              )}

            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-500">Select an incoming request from the left queue to inspect telemetry.</p>
            </div>
          )}

          {/* MST Blockchain Live Ledger Explorer */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-600" />
                <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  {isHi ? 'MST ब्लॉकचेन लाइव लेजर एक्सप्लोरर' : 'MST Blockchain Live Ledger Explorer'}
                </h4>
              </div>
              <span className="text-xs text-slate-500 font-mono">Consensus: Proof-of-Agronomy (PoA)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider">
                    <th className="p-3">Block ID</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Sender</th>
                    <th className="p-3">Merkle Root Hash</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Time</th>
                    <th className="p-3 text-right">MSTScan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {ledgerBlocks.map((blk) => (
                    <tr key={blk.blockId} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 font-mono font-bold text-slate-900">{blk.blockId}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          blk.blockType.includes('SETTLED') 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : blk.blockType.includes('REQUEST') 
                            ? 'bg-sky-100 text-sky-800' 
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {blk.blockType}
                        </span>
                      </td>
                      <td className="p-3">{blk.sender}</td>
                      <td className="p-3 font-mono text-[11px] text-emerald-700 truncate max-w-[160px]">
                        {blk.merkleRoot}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                          {blk.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{blk.time}</td>
                      <td className="p-3 text-right">
                        <a
                          href={`https://testnet.mstscan.com/address/0x7Fac28CfC8c26eA704D615B3A64Dc6Ab456aF8aF`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-800 transition"
                        >
                          <span>Explorer</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
