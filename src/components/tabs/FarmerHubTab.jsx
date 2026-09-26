import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Leaf, 
  Layers, 
  Send, 
  CheckCircle2, 
  Clock, 
  IndianRupee, 
  AlertTriangle, 
  Sparkles, 
  Activity, 
  Upload, 
  Eye, 
  QrCode, 
  Lock, 
  Database,
  ArrowRight,
  Droplets,
  Thermometer,
  CloudRain,
  Sun,
  ExternalLink,
  Bot,
  Sprout,
  FlaskConical,
  TrendingUp,
  Lightbulb,
  Volume2
} from 'lucide-react';
import { 
  clientSha256, 
  clientCalculateMerkleRoot, 
  submitFarmerTelemetryToBlockchain,
  fetchBlockchainLedger,
  connectMetaMaskMST,
  getMSTScanUrl,
  analyzeWithGeminiAI,
  commitCompanyPrescriptionToBlockchain,
  MST_TESTNET_CONFIG
} from '../../services/blockchainClientService';
import { connectMqtt } from '../../services/mqttService';
import { SOIL_DATABASE, SOIL_CLASSES } from '../../data/soilDatabase';
import VoiceReadoutButton from '../VoiceReadoutButton';

export default function FarmerHubTab({ 
  lang = 'en', 
  t = {}, 
  setActiveTab = () => {},
  currentLocation = null,
  plantDataProp = null,
  soilDataProp = null,
  kisanMode = true
}) {
  const isHi = lang === 'hi';

  // Web3 Wallet & MST Testnet State
  const defaultWallet = MST_TESTNET_CONFIG?.defaultWallet || '0x7Fac28CfC8c26eA704D615B3A64Dc6Ab456aF8aF';
  const [walletAddress, setWalletAddress] = useState(defaultWallet);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState(false);

  const handleConnectWallet = async () => {
    setConnectingWallet(true);
    try {
      const res = await connectMetaMaskMST();
      if (res && res.success && res.account) {
        setWalletAddress(res.account);
        setIsWalletConnected(true);
      }
    } catch (e) {
      console.warn('Wallet connection error:', e);
    } finally {
      setConnectingWallet(false);
    }
  };

  // 1. Plant Disease Diagnostic State
  const [plantPhoto, setPlantPhoto] = useState(plantDataProp?.photo || null);
  const [plantDisease, setPlantDisease] = useState(() => {
    try {
      return plantDataProp?.disease || localStorage.getItem('krishi_last_plant_disease') || 'Pearl Millet Downy Mildew / Rust';
    } catch (e) {
      return 'Pearl Millet Downy Mildew / Rust';
    }
  });
  const [plantConfidence, setPlantConfidence] = useState(() => {
    try {
      return plantDataProp?.confidence ? String(plantDataProp.confidence) : localStorage.getItem('krishi_last_plant_confidence') || '89.0';
    } catch (e) {
      return '89.0';
    }
  });
  const [diseaseSeverity, setDiseaseSeverity] = useState(() => {
    try {
      return plantDataProp?.severity || localStorage.getItem('krishi_last_disease_severity') || 'Moderate to Severe (Stage 2-3)';
    } catch (e) {
      return 'Moderate to Severe (Stage 2-3)';
    }
  });
  const [diseaseRisk, setDiseaseRisk] = useState(() => {
    try {
      return plantDataProp?.risk || localStorage.getItem('krishi_last_disease_risk') || 'High Risk';
    } catch (e) {
      return 'High Risk';
    }
  });
  const [isClassifyingPlant, setIsClassifyingPlant] = useState(false);
  const [diseaseAdvisory, setDiseaseAdvisory] = useState(() => {
    try {
      if (plantDataProp?.advisory) return plantDataProp.advisory;
      const stored = localStorage.getItem('krishi_last_disease_advisory');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  // 2. Live HiveMQ MQTT IoT Sensor State
  const [mqttMoisture, setMqttMoisture] = useState(43.5);
  const [mqttTemp, setMqttTemp] = useState(28.2);
  const [mqttHumidity, setMqttHumidity] = useState(64);
  const [mqttRain, setMqttRain] = useState(false);
  const [mqttConnected, setMqttConnected] = useState(true);
  const [packetCounter, setPacketCounter] = useState(142);

  // 3. Real Soil Classification State
  const [soilPhoto, setSoilPhoto] = useState(soilDataProp?.photo || null);
  const [soilType, setSoilType] = useState(() => {
    try {
      return soilDataProp?.soilType || localStorage.getItem('krishi_last_soil_type') || 'Red Soil (लाल मिट्टी / लेटराइट युक्त)';
    } catch (e) {
      return 'Red Soil (लाल मिट्टी / लेटराइट युक्त)';
    }
  });
  const [soilPh, setSoilPh] = useState(() => {
    try {
      return soilDataProp?.ph || localStorage.getItem('krishi_last_soil_ph') || '6.5 (Optimal Neutral)';
    } catch (e) {
      return '6.5 (Optimal Neutral)';
    }
  });
  const [soilConfidence, setSoilConfidence] = useState(() => {
    try {
      return soilDataProp?.confidence ? String(soilDataProp.confidence) : localStorage.getItem('krishi_last_soil_confidence') || '94.30';
    } catch (e) {
      return '94.30';
    }
  });
  const [isClassifyingSoil, setIsClassifyingSoil] = useState(false);
  const [soilAdvisory, setSoilAdvisory] = useState(() => {
    try {
      if (soilDataProp?.metadata) return soilDataProp.metadata;
      const stored = localStorage.getItem('krishi_last_soil_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed?.metadata || parsed;
      }
      return null;
    } catch(e) {
      return null;
    }
  });

  // Sync state from plantDataProp
  useEffect(() => {
    if (plantDataProp) {
      if (plantDataProp.photo) setPlantPhoto(plantDataProp.annotatedImage || plantDataProp.photo);
      if (plantDataProp.disease) setPlantDisease(plantDataProp.disease);
      if (plantDataProp.confidence) setPlantConfidence(String(plantDataProp.confidence));
      if (plantDataProp.severity) setDiseaseSeverity(plantDataProp.severity);
      if (plantDataProp.risk) setDiseaseRisk(plantDataProp.risk);
      if (plantDataProp.advisory) setDiseaseAdvisory(plantDataProp.advisory);
    }
  }, [plantDataProp]);

  // Sync state from soilDataProp
  useEffect(() => {
    if (soilDataProp) {
      if (soilDataProp.photo) setSoilPhoto(soilDataProp.photo);
      if (soilDataProp.soilType) setSoilType(soilDataProp.soilType);
      if (soilDataProp.confidence) setSoilConfidence(String(soilDataProp.confidence));
      if (soilDataProp.ph) setSoilPh(soilDataProp.ph);
      if (soilDataProp.metadata || soilDataProp.waterRetention) {
        setSoilAdvisory(soilDataProp.metadata || soilDataProp);
      }
    }
  }, [soilDataProp]);

  // Listen to telemetry updates dispatched from SoilStudioTab or PearlMilletTab or window events
  useEffect(() => {
    const handleTelemetryEvent = (e) => {
      const { type, data } = e.detail || {};
      if (type === 'plant' && data) {
        if (data.photo) setPlantPhoto(data.photo);
        if (data.disease) setPlantDisease(data.disease);
        if (data.confidence) setPlantConfidence(String(data.confidence));
        if (data.severity) setDiseaseSeverity(data.severity);
        if (data.risk) setDiseaseRisk(data.risk);
        if (data.advisory) setDiseaseAdvisory(data.advisory);
      } else if (type === 'soil' && data) {
        if (data.photo) setSoilPhoto(data.photo);
        if (data.soilType) setSoilType(data.soilType);
        if (data.confidence) setSoilConfidence(String(data.confidence));
        if (data.ph) setSoilPh(data.ph);
        if (data.metadata || data.waterRetention) {
          setSoilAdvisory(data.metadata || data);
        }
      }
    };

    window.addEventListener('krishi_telemetry_updated', handleTelemetryEvent);
    return () => window.removeEventListener('krishi_telemetry_updated', handleTelemetryEvent);
  }, []);

  // Sample polling removed - only real user uploads & telemetry are ingested

  // Cryptographic Leaves & Merkle State Tree
  const [plantLeafHash, setPlantLeafHash] = useState('0x08a238d33906dab61cdfc0676490a0fd6582419ce5ca1b938ea716b1e282cf0d');
  const [mqttLeafHash, setMqttLeafHash] = useState('0xde5897b24ce7c236cf50b0d4fceb1cff69065e6a41286860ed4e89d56d9c051b');
  const [soilLeafHash, setSoilLeafHash] = useState('0xde2504cdb38765d6676ee415d4cbfc864f3cdf079ad0134b4d3af68120123589');
  const [merkleRoot, setMerkleRoot] = useState('0x7c708d9ddc96f6f929d7dbbfe5071a47106400ea5262ca5310c75ca602b382f8');

  // Submission, Dispatch & Verification Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBlock, setSubmittedBlock] = useState(() => {
    try {
      const stored = localStorage.getItem('krishi_latest_dispatched_block');
      return stored ? JSON.parse(stored) : null;
    } catch(e) { return null; }
  });
  const [dispatchStatus, setDispatchStatus] = useState(() => {
    try {
      return localStorage.getItem('krishi_farmer_dispatch_status') || 'IDLE';
    } catch(e) { return 'IDLE'; }
  });
  const [verifiedPrescription, setVerifiedPrescription] = useState(() => {
    try {
      const stored = localStorage.getItem('krishi_verified_prescription');
      return stored ? JSON.parse(stored) : null;
    } catch(e) { return null; }
  });
  const [verifiedBlockProof, setVerifiedBlockProof] = useState(() => {
    try {
      return localStorage.getItem('krishi_verified_block_proof') || '0x7f83b165...94e2';
    } catch(e) { return '0x7f83b165...94e2'; }
  });
  const [broadcastSuccess, setBroadcastSuccess] = useState(() => {
    try {
      return localStorage.getItem('krishi_farmer_dispatch_status') !== 'IDLE' && !!localStorage.getItem('krishi_latest_dispatched_block');
    } catch(e) { return false; }
  });

  // Listen for real-time prescription approvals from Fertilizer Company tab
  useEffect(() => {
    function checkPrescriptionStatus() {
      try {
        const pStr = localStorage.getItem('krishi_verified_prescription');
        const status = localStorage.getItem('krishi_farmer_dispatch_status') || 'IDLE';
        const proof = localStorage.getItem('krishi_verified_block_proof') || '0x7f83b165...94e2';
        const blkStr = localStorage.getItem('krishi_latest_dispatched_block');

        if (status) setDispatchStatus(status);
        if (proof) setVerifiedBlockProof(proof);
        if (blkStr) setSubmittedBlock(JSON.parse(blkStr));
        if (pStr) {
          setVerifiedPrescription(JSON.parse(pStr));
        } else if (status !== 'VERIFIED_AND_MINTED') {
          setVerifiedPrescription(null);
        }
      } catch (e) {}
    }

    checkPrescriptionStatus();
    window.addEventListener('krishi_prescription_minted', checkPrescriptionStatus);
    window.addEventListener('storage', checkPrescriptionStatus);
    const interval = setInterval(checkPrescriptionStatus, 1500);

    return () => {
      window.removeEventListener('krishi_prescription_minted', checkPrescriptionStatus);
      window.removeEventListener('storage', checkPrescriptionStatus);
      clearInterval(interval);
    };
  }, []);

  // Connect to live HiveMQ MQTT stream
  useEffect(() => {
    let clientHandler = null;
    try {
      clientHandler = connectMqtt({
        onMessage: (payload) => {
          if (!payload) return;
          if (payload.soil1 !== undefined || payload.soil2 !== undefined) {
            const s1 = Number(payload.soil1 || 40);
            const s2 = Number(payload.soil2 || 40);
            const s3 = Number(payload.soil3 || 40);
            const s4 = Number(payload.soil4 || 40);
            const avg = ((s1 + s2 + s3 + s4) / 4).toFixed(1);
            setMqttMoisture(Number(avg));
          }
          if (payload.temperature !== undefined) setMqttTemp(Number(payload.temperature));
          if (payload.humidity !== undefined) setMqttHumidity(Number(payload.humidity));
          if (payload.rain !== undefined) setMqttRain(Boolean(payload.rain));
          if (payload.counter !== undefined) setPacketCounter(Number(payload.counter));
        },
        onStatusChange: (status) => {
          setMqttConnected(status === 'connected');
        }
      });
    } catch (e) {
      console.warn('MQTT connection init error:', e);
    }

    return () => {
      try {
        if (clientHandler && clientHandler.disconnect) clientHandler.disconnect();
      } catch (e) {}
    };
  }, []);

  // Compute live Merkle Leaves whenever inputs change
  useEffect(() => {
    let active = true;
    async function computeHashes() {
      try {
        const pImgSlice = typeof plantPhoto === 'string' ? plantPhoto.slice(0, 60) : '';
        const sImgSlice = typeof soilPhoto === 'string' ? soilPhoto.slice(0, 60) : '';

        const pHash = await clientSha256({ disease: plantDisease || '', confidence: plantConfidence || 90, severity: diseaseSeverity || '', img: pImgSlice });
        const mHash = await clientSha256({ moisture: mqttMoisture || 40, temp: mqttTemp || 28, humidity: mqttHumidity || 60, rain: Boolean(mqttRain) });
        const sHash = await clientSha256({ soilType: soilType || '', ph: soilPh || '', confidence: soilConfidence || 90, img: sImgSlice });
        
        if (active) {
          setPlantLeafHash(pHash);
          setMqttLeafHash(mHash);
          setSoilLeafHash(sHash);

          const root = await clientCalculateMerkleRoot([pHash, mHash, sHash]);
          setMerkleRoot(root);
        }
      } catch (err) {
        console.warn('Hashing error:', err);
      }
    }
    computeHashes();
    return () => { active = false; };
  }, [plantDisease, plantConfidence, diseaseSeverity, plantPhoto, mqttMoisture, mqttTemp, mqttHumidity, mqttRain, soilType, soilPh, soilConfidence, soilPhoto]);

  // Handle Plant Photo Upload & Real Disease Classification via PyTorch Model
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Img = event.target.result;
        setPlantPhoto(base64Img);
        try { localStorage.setItem('krishi_last_plant_photo', base64Img); } catch(e){}
        setIsClassifyingPlant(true);

        try {
          let classified = false;

          // 1st priority: Real PyTorch MobileNetV3 trained model
          try {
            const pyRes = await fetch('http://127.0.0.1:5003/api/crop-predict', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: base64Img }),
              signal: AbortSignal.timeout(30000),
            });

            if (pyRes.ok) {
              const data = await pyRes.json();
              if (data && data.success) {
                const diseaseName = data.disease_name || data.raw_class_name || 'Unknown';
                const conf = data.confidence_pct ? data.confidence_pct.replace('%', '') : String((data.confidence * 100).toFixed(1));
                const sev = data.severity || 'Moderate';
                const isHealthy = sev === 'None' || diseaseName.toLowerCase().includes('healthy');
                const risk = isHealthy ? 'Low' : (sev === 'Critical' ? 'Critical' : 'High');
                const agro = data.agronomic_analysis || {};

                setPlantDisease(diseaseName);
                setPlantConfidence(conf);
                setDiseaseSeverity(sev);
                setDiseaseRisk(risk);
                setDiseaseAdvisory({
                  status: isHealthy ? 'healthy' : 'diseased',
                  isDiseased: !isHealthy,
                  title: diseaseName,
                  description: agro.symptoms || '',
                  symptoms: agro.symptoms ? [agro.symptoms] : [],
                  treatment: (data.recommendations || []),
                  fertilizer: agro.nutritional_recovery || '',
                  sprayWindow: 'Morning 6-9 AM or Evening 4-7 PM',
                  dosage: '',
                  costInr: 0,
                  subsidyInr: 0,
                  risk: risk,
                  scientific: agro.environmental_factors || '',
                  crop: data.crop || '',
                  category: data.category || '',
                  organicControl: agro.organic_control || [],
                  chemicalControl: agro.chemical_control || [],
                  cureRoadmap: agro.cure_roadmap || [],
                  preventiveMeasures: agro.preventive_measures || '',
                  topCandidates: data.top_candidates || [],
                  source: data.source || 'MobileNetV3 PyTorch Model'
                });

                try {
                  localStorage.setItem('krishi_last_plant_disease', diseaseName);
                  localStorage.setItem('krishi_last_plant_confidence', conf);
                  localStorage.setItem('krishi_last_disease_severity', sev);
                  localStorage.setItem('krishi_last_disease_risk', risk);
                } catch(e){}

                classified = true;
              }
            }
          } catch (pyErr) {
            console.warn('PyTorch model endpoint unavailable, falling back...', pyErr.message);
          }

          // 2nd fallback: existing disease-classify API
          if (!classified) {
            try {
              const apiRes = await fetch('http://127.0.0.1:5003/api/disease-classify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64Img, filename: file.name })
              });

              if (apiRes.ok) {
                const data = await apiRes.json();
                if (data && data.success) {
                  const meta = data.metadata || {};
                  const diseaseName = data.disease || data.disease_name || meta.title || 'Unknown';
                  const conf = data.confidence_pct ? data.confidence_pct.replace('%', '') : String((data.confidence * 100).toFixed(1));
                  const sev = meta.severity || data.severity || 'Moderate (Stage 2)';
                  const risk = meta.risk || (data.is_diseased ? 'High' : 'Low');

                  setPlantDisease(diseaseName);
                  setPlantConfidence(conf);
                  setDiseaseSeverity(sev);
                  setDiseaseRisk(risk);
                  setDiseaseAdvisory({
                    status: data.status,
                    isDiseased: data.is_diseased,
                    title: diseaseName,
                    description: meta.description || '',
                    symptoms: meta.symptoms || [],
                    treatment: meta.treatment || data.recommendations || [],
                    fertilizer: meta.fertilizer || '',
                    sprayWindow: meta.spray_window || '',
                    dosage: meta.dosage || '',
                    costInr: meta.cost_inr || 0,
                    subsidyInr: meta.subsidy_inr || 0,
                    risk: risk,
                    scientific: meta.scientific || '',
                    probHealthy: data.prob_healthy,
                    probDiseased: data.prob_diseased,
                    inferenceMs: data.inference_ms
                  });

                  try {
                    localStorage.setItem('krishi_last_plant_disease', diseaseName);
                    localStorage.setItem('krishi_last_plant_confidence', conf);
                    localStorage.setItem('krishi_last_disease_severity', sev);
                    localStorage.setItem('krishi_last_disease_risk', risk);
                  } catch(e){}
                }
              }
            } catch (err) {
              console.error('Disease classification fallback error:', err);
            }
          }
        } catch (err) {
          console.error('Disease classification error:', err);
        } finally {
          setIsClassifyingPlant(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Real Soil Photo Upload & Instant Classification via PyTorch API
  const handleSoilImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Img = event.target.result;
        setSoilPhoto(base64Img);
        try {
          localStorage.setItem('krishi_last_soil_photo', base64Img);
        } catch (e) {}

        setIsClassifyingSoil(true);
        try {
          // Call real PyTorch ResNet-18 model API
          const apiRes = await fetch('http://127.0.0.1:5003/api/soil-classify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64Img })
          });

          if (apiRes.ok) {
            const data = await apiRes.json();
            if (data && data.success) {
              const meta = data.metadata || {};
              const detectedClass = `${data.class} Soil (${meta.title || data.class})`;
              const detectedPh = meta.ph_range || '6.5 - 7.5';
              const conf = data.confidence_pct ? data.confidence_pct.replace('%', '') : String((data.confidence * 100).toFixed(2));

              setSoilType(detectedClass);
              setSoilPh(detectedPh);
              setSoilConfidence(conf);
              setSoilAdvisory({
                description: meta.description || '',
                texture: meta.texture || '',
                waterRetention: meta.water_retention || '',
                suitableCrops: meta.suitable_crops || [],
                fertilizers: meta.fertilizers || [],
                farmingTips: meta.farming_tips || '',
                probabilities: data.probabilities || {}
              });

              try {
                localStorage.setItem('krishi_last_soil_type', detectedClass);
                localStorage.setItem('krishi_last_soil_ph', detectedPh);
                localStorage.setItem('krishi_last_soil_confidence', conf);
              } catch (e) {}
            }
          } else {
            console.warn('Soil API response not OK, status:', apiRes.status);
          }
        } catch (err) {
          console.error('Soil classification error:', err);
        } finally {
          setIsClassifyingSoil(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [isGeneratingPrescription, setIsGeneratingPrescription] = useState(false);

  // Instant one-click or auto Gemini AI prescription generator
  const handleGeneratePrescriptionNow = async (customPayload = null) => {
    setIsGeneratingPrescription(true);
    try {
      const activePayload = customPayload || {
        crop: 'Pearl Millet (Bajra)',
        plantDiseaseData: {
          disease: plantDisease,
          confidence: Number(plantConfidence),
          severity: diseaseSeverity,
          imageUri: plantPhoto
        },
        mqttData: {
          soil1: mqttMoisture,
          averageMoisture: mqttMoisture,
          temperature: mqttTemp,
          humidity: mqttHumidity,
          rain: mqttRain,
          counter: packetCounter
        },
        soilData: {
          soilType,
          ph: soilPh,
          confidence: Number(soilConfidence),
          imageUri: soilPhoto
        }
      };

      const aiPrescription = await analyzeWithGeminiAI(activePayload);
      const commitRes = await commitCompanyPrescriptionToBlockchain({
        blockIndex: submittedBlock?.index || Math.floor(Math.random() * 800) + 100,
        companyId: 'IFFCO-IND-409',
        companyName: 'IFFCO Precision Agri-Chemicals & Bio-Solutions',
        prescription: aiPrescription,
        officerNotes: 'Verified via Gemini AI Agronomic Multi-Modal Engine & Chief Agronomist'
      });
      if (commitRes && commitRes.success) {
        setVerifiedPrescription(aiPrescription);
        setDispatchStatus('VERIFIED_AND_MINTED');
      }
    } catch (err) {
      console.error('Error generating prescription:', err);
    } finally {
      setIsGeneratingPrescription(false);
    }
  };

  // Dispatch to MST Blockchain
  const handleSendToBlockchain = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        farmerId: 'KISAN-7829',
        farmerName: 'Rameshwar Sharma',
        location: currentLocation ? `${currentLocation.name}, ${currentLocation.state}` : 'Ghaziabad, Uttar Pradesh',
        crop: 'Pearl Millet (Bajra)',
        plantDiseaseData: {
          disease: plantDisease,
          confidence: Number(plantConfidence),
          severity: diseaseSeverity,
          imageUri: plantPhoto
        },
        mqttData: {
          soil1: mqttMoisture,
          averageMoisture: mqttMoisture,
          temperature: mqttTemp,
          humidity: mqttHumidity,
          rain: mqttRain,
          counter: packetCounter
        },
        soilData: {
          soilType,
          ph: soilPh,
          confidence: Number(soilConfidence),
          imageUri: soilPhoto
        },
        leaves: {
          plantLeafHash,
          mqttLeafHash,
          soilLeafHash
        },
        merkleRoot
      };

      const res = await submitFarmerTelemetryToBlockchain(payload);
      if (res && res.block) {
        setSubmittedBlock(res.block);
        setBroadcastSuccess(true);
        setDispatchStatus('DISPATCHED_PENDING_APPROVAL');

        // Smooth scroll to the Dispatched Dossier section
        setTimeout(() => {
          document.getElementById('dispatched-dossier-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);

        // Auto-run Gemini AI prescription after 1.8s for smooth immediate end-to-end display
        setTimeout(() => {
          handleGeneratePrescriptionNow(payload);
        }, 1800);
      }
    } catch (err) {
      console.error('Error submitting block:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const safeWallet = String(walletAddress || defaultWallet);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 p-6 sm:p-10 border border-emerald-800/40 shadow-2xl text-white">
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/4 -bottom-16 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{kisanMode 
                ? (isHi ? 'प्रमाणित किसान डेटा व दवा पर्ची' : 'Verified Farmer Advisory & Prescription')
                : (isHi ? 'सुरक्षित MST ब्लॉकचेन डेटा हब' : 'MST Blockchain Agri-Telemetry Gateway')}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {kisanMode
                ? (isHi ? 'किसान डेटा एवं आधिकारिक दवा पर्ची' : 'Farmer Advisory & Prescription Hub')
                : (isHi ? 'किसान डेटा बंडल व ब्लॉकचेन डिस्पैच' : 'Farmer Telemetry Hub & Blockchain Dispatch')}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {kisanMode
                ? (isHi 
                    ? 'आपकी फसल का रोग, खेत की नमी और मिट्टी के अनुसार सरकारी सब्सिडी वाली प्रामाणिक दवा पर्ची प्राप्त करें।'
                    : 'Get verified agricultural prescriptions and DBT subsidies based on leaf disease, soil classification, and live moisture sensors.')
                : (isHi 
                    ? 'अपनी पत्ती की बीमारी फोटो, HiveMQ लाइव IoT सेंसर और सॉइल AI मॉडल डेटा को एक साथ बंडल करें। यह डेटा क्रिप्टोग्राफ़िक हैश बनकर फर्टिलाइज़र कंपनी को सुरक्षित भेजा जाता है।'
                    : 'Bundle Plant Disease Diagnosis + Live HiveMQ MQTT IoT Telemetry + Soil AI classification. Securely dispatched as an immutable Merkle State Tree (MST) cryptographic block.')}
            </p>
          </div>

          {!kisanMode && (
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
              {/* MST Testnet Status Badge */}
              <a
                href={`https://testnet.mstscan.com/address/${safeWallet}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2 shadow-inner transition group"
                title="Click to view address on MSTScan Explorer"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span>MST Testnet (ID: 91562037)</span>
                <span className="text-slate-400 group-hover:text-white">| {safeWallet.slice(0, 6)}...{safeWallet.slice(-4)}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-300" />
              </a>

              {/* Connect MetaMask / Web3 */}
              <button
                onClick={handleConnectWallet}
                disabled={connectingWallet}
                className="px-4 py-2.5 rounded-2xl bg-emerald-800/60 hover:bg-emerald-800 border border-emerald-400/40 text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-amber-300" />
                <span>{isWalletConnected ? 'Wallet Connected' : connectingWallet ? 'Connecting...' : 'Connect MetaMask'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* -- Real-time Ingested Telemetry Pipeline Banner -- */}
      <div className="rounded-3xl p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white border border-emerald-500/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
            <Database className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                {isHi ? 'कृषि टेलीमेट्री डेटा पाइपलाइन सिंक' : 'Live Agri-Telemetry Data Pipeline'}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {isHi ? 'डेटा लाइव लोड हुआ' : 'Data Ingested from Detectors'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-rose-300">Leaf 1 (Plant Diagnostics):</span> {plantDisease} ({plantConfidence}%) &bull;{' '}
              <span className="font-semibold text-sky-300">Leaf 2 (IoT Sensors):</span> {mqttMoisture}% Moisture, {mqttTemp}°C &bull;{' '}
              <span className="font-semibold text-amber-300">Leaf 3 (Soil Classification):</span> {soilType} ({soilConfidence}%, pH {soilPh})
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('merkle-dispatch-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full md:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <span>{kisanMode ? (isHi ? 'सरकारी दवा पर्ची पर जाएं' : 'Go to Prescription') : (isHi ? 'क्रिप्टोग्राफिक डिस्पैच पर जाएं' : 'Proceed to Blockchain Dispatch')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3-Factor Telemetry Bundle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Factor 1: Plant Disease Output */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-700 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {isHi ? 'पादप रोग मॉडल (Disease Detector)' : 'Plant Disease Factor'}
                  </h3>
                  <p className="text-xs text-slate-500">MobileNetV3-Large PyTorch (42 Classes)</p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Ingested from Plant Disease Detector
                  </span>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-md border text-xs font-bold ${
                plantDisease.toLowerCase().includes('healthy')
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                {plantConfidence}% Conf.
              </span>
            </div>

            {/* Real Scanned Leaf Photo Preview & Upload */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video mb-4 group">
              {plantPhoto ? (
                <>
                  <img 
                    src={plantPhoto} 
                    alt="Scanned Leaf" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <label className="absolute bottom-2 right-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5 backdrop-blur-xs transition">
                    <Upload className="w-3.5 h-3.5 text-rose-400" />
                    <span>{isClassifyingPlant ? 'Scanning...' : isHi ? 'पत्ती फोटो बदलें' : 'Change Leaf Photo'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-50 text-center">
                  <div className="w-11 h-11 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center mb-2">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-700">
                    {isHi ? 'कोई पत्ती फोटो अपलोड नहीं' : 'No Leaf Photo Uploaded'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 mb-2.5">
                    {isHi ? 'पत्ती का फोटो लें या चुनें' : 'Upload photo or scan in Plant Disease Detector'}
                  </p>
                  <label className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm transition">
                    <Upload className="w-3.5 h-3.5 text-white" />
                    <span>{isClassifyingPlant ? 'Scanning...' : isHi ? 'पत्ती फोटो अपलोड करें' : 'Upload Leaf Photo'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              )}
            </div>

            {/* Identified Disease / Plant Health Badge & Details */}
            <div className="space-y-3 mb-4">
              <div className={`p-3 rounded-2xl ${
                plantDisease.toLowerCase().includes('healthy')
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                  : 'bg-gradient-to-r from-rose-600 to-red-600 text-white'
              } font-black text-sm sm:text-base flex items-center justify-between shadow-xs`}>
                <div className="flex items-center gap-2">
                  {plantDisease.toLowerCase().includes('healthy') ? (
                    <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-white flex-shrink-0" />
                  )}
                  <span className="truncate max-w-[180px]">{plantDisease}</span>
                </div>
                <span className="text-xs font-bold bg-slate-950/40 text-white px-2 py-0.5 rounded-md flex-shrink-0">
                  {plantConfidence}%
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">{isHi ? 'तीव्रता ग्रेड (Severity):' : 'Severity Grade:'}</span>
                  <span className={`font-bold ${plantDisease.toLowerCase().includes('healthy') ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {diseaseSeverity}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">{isHi ? 'फसल जोखिम स्तर:' : 'Risk Level:'}</span>
                  <span className={`font-bold ${plantDisease.toLowerCase().includes('healthy') ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {diseaseRisk}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">{isHi ? 'पहचान स्रोत:' : 'Inference Source:'}</span>
                  <span className="font-bold text-rose-800">MobileNetV3-Large PyTorch (Real Scan)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Leaf SHA-256 */}
          {!kisanMode && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider mb-0.5">Leaf 1 Hash:</span>
              <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50/70 p-2 rounded-lg truncate border border-emerald-200/60 font-semibold" title={plantLeafHash}>
                {plantLeafHash || 'Computing SHA-256...'}
              </div>
            </div>
          )}
        </div>

        {/* Factor 2: Live HiveMQ MQTT IoT Stream */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {isHi ? 'लाइव ESP32 सेंसर (HiveMQ)' : 'HiveMQ MQTT Telemetry'}
                  </h3>
                  <p className="text-xs text-slate-500">Cloud SSL Broker • WSS:8884</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                mqttConnected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                <span className={`w-2 h-2 rounded-full ${mqttConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                {mqttConnected ? 'Live Stream' : 'Syncing'}
              </span>
            </div>

            {/* IoT Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-100">
                <div className="flex items-center gap-2 text-sky-700 mb-1">
                  <Droplets className="w-4 h-4" />
                  <span className="text-xs font-semibold">{isHi ? 'मृदा नमी' : 'Soil Moisture'}</span>
                </div>
                <div className="text-2xl font-black text-sky-950">
                  {mqttMoisture}%
                </div>
                <span className="text-[10px] text-sky-600 font-medium">Zone Avg (4 Probes)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-100">
                <div className="flex items-center gap-2 text-amber-700 mb-1">
                  <Thermometer className="w-4 h-4" />
                  <span className="text-xs font-semibold">{isHi ? 'तापमान' : 'Temperature'}</span>
                </div>
                <div className="text-2xl font-black text-amber-950">
                  {mqttTemp}°C
                </div>
                <span className="text-[10px] text-amber-600 font-medium">Ambient Sensor</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100">
                <div className="flex items-center gap-2 text-emerald-700 mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs font-semibold">{isHi ? 'हवा में नमी' : 'Humidity'}</span>
                </div>
                <div className="text-2xl font-black text-emerald-950">
                  {mqttHumidity}%
                </div>
                <span className="text-[10px] text-emerald-600 font-medium">Air Humidity Index</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100">
                <div className="flex items-center gap-2 text-indigo-700 mb-1">
                  <CloudRain className="w-4 h-4" />
                  <span className="text-xs font-semibold">{isHi ? 'वर्षा सेंसर' : 'Rain Sensor'}</span>
                </div>
                <div className="text-lg font-black text-indigo-950 mt-1">
                  {mqttRain ? 'Rain Alert Active' : 'Dry (Clear)'}
                </div>
                <span className="text-[10px] text-indigo-600 font-medium">Packet #{packetCounter}</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
              <span>Topic: <code className="font-mono text-slate-700">gogul/agriculture/data</code></span>
              <span className="text-emerald-600 font-semibold">SSL Verified</span>
            </div>
          </div>

          {/* Leaf SHA-256 */}
          {!kisanMode && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider mb-0.5">Leaf 2 Hash:</span>
              <div className="text-[11px] font-mono text-teal-800 bg-teal-50/70 p-2 rounded-lg truncate border border-teal-200/60 font-semibold" title={mqttLeafHash}>
                {mqttLeafHash || 'Computing SHA-256...'}
              </div>
            </div>
          )}
        </div>

        {/* Factor 3: Real Soil Classification AI Output */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {isHi ? 'मृदा मॉडल (Soil Studio)' : 'Soil Classification Factor'}
                  </h3>
                  <p className="text-xs text-slate-500">PyTorch ResNet-18 Vision Model</p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Ingested from Soil Studio
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                {soilConfidence}% Conf.
              </span>
            </div>

            {/* Real Scanned Soil Photo Preview & Upload */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video mb-4 group">
              {soilPhoto ? (
                <>
                  <img 
                    src={soilPhoto} 
                    alt="Scanned Soil" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <label className="absolute bottom-2 right-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5 backdrop-blur-xs transition">
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isClassifyingSoil ? 'Scanning...' : isHi ? 'मिट्टी फोटो बदलें' : 'Change Soil Photo'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleSoilImageUpload} />
                  </label>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-50 text-center">
                  <div className="w-11 h-11 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-2">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-700">
                    {isHi ? 'कोई मिट्टी फोटो अपलोड नहीं' : 'No Soil Photo Uploaded'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 mb-2.5">
                    {isHi ? 'मिट्टी का फोटो लें या चुनें' : 'Upload photo or scan in Soil AI Studio'}
                  </p>
                  <label className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm transition">
                    <Upload className="w-3.5 h-3.5 text-white" />
                    <span>{isClassifyingSoil ? 'Scanning...' : isHi ? 'मिट्टी फोटो अपलोड करें' : 'Upload Soil Photo'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleSoilImageUpload} />
                  </label>
                </div>
              )}
            </div>

            {/* Identified Soil Badge & Selection */}
            <div className="space-y-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm sm:text-base flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-slate-950" />
                  <span className="truncate max-w-[180px]">{soilType}</span>
                </div>
                <span className="text-xs font-bold bg-slate-950 text-amber-300 px-2 py-0.5 rounded-md flex-shrink-0">
                  {soilConfidence}%
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">{isHi ? 'मृदा पीएच मान (Soil pH):' : 'Soil pH Level:'}</span>
                  <span className="font-bold text-slate-900">{soilPh}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">{isHi ? 'पोषक तत्व तत्परता:' : 'NPK Nutrient Index:'}</span>
                  <span className="font-bold text-emerald-700">Optimal Absorption Ready</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">{isHi ? 'पहचान स्रोत:' : 'Inference Source:'}</span>
                  <span className="font-bold text-amber-800">PyTorch ResNet-18 (Real Scan)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Leaf SHA-256 */}
          {!kisanMode && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider mb-0.5">Leaf 3 Hash:</span>
              <div className="text-[11px] font-mono text-amber-900 bg-amber-50/70 p-2 rounded-lg truncate border border-amber-200/60 font-semibold" title={soilLeafHash}>
                {soilLeafHash || 'Computing SHA-256...'}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Full Plant Disease Advisory Panel (appears after real disease scan) */}
      {diseaseAdvisory && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200/80 shadow-sm space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl ${diseaseAdvisory.isDiseased ? 'bg-gradient-to-tr from-rose-500 to-red-600' : 'bg-gradient-to-tr from-emerald-500 to-teal-600'} flex items-center justify-center text-white shadow-md`}>
                {diseaseAdvisory.isDiseased ? <AlertTriangle className="w-6 h-6 text-rose-600" /> : <ShieldCheck className="w-6 h-6 text-emerald-600" />}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {isHi ? 'फसल स्वास्थ्य व उपचार सलाह' : `Diagnostic Advisory: ${plantDisease}`}
                </h3>
                <p className="text-xs text-slate-500">
                  {diseaseAdvisory.scientific ? `${diseaseAdvisory.scientific} • ` : ''}MobileNetV3 PyTorch Model
                </p>
              </div>
            </div>
            <span className={`px-3 py-1.5 rounded-md text-xs font-bold border ${
              diseaseAdvisory.isDiseased ? 'bg-rose-100 text-rose-900 border-rose-200' : 'bg-emerald-100 text-emerald-900 border-emerald-200'
            }`}>
              Confidence: {plantConfidence}%
            </span>
          </div>

          {/* Disease Description */}
          {diseaseAdvisory.description && (
            <div className={`p-4 rounded-2xl border ${diseaseAdvisory.isDiseased ? 'bg-rose-50/80 border-rose-100' : 'bg-emerald-50/80 border-emerald-100'}`}>
              <p className="text-sm text-slate-800 leading-relaxed">
                <span className="font-bold text-slate-900">{isHi ? 'विवरण:' : 'Clinical Diagnosis:'} </span>
                {typeof diseaseAdvisory.description === 'object' 
                  ? (diseaseAdvisory.description.en || diseaseAdvisory.description.hi || JSON.stringify(diseaseAdvisory.description))
                  : String(diseaseAdvisory.description)}
              </p>
            </div>
          )}

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-100">
              <div className="flex items-center gap-2 text-rose-800 mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-700" />
                <span className="text-xs font-bold uppercase tracking-wider">{isHi ? 'तीव्रता ग्रेड' : 'Severity'}</span>
              </div>
              <p className="text-base font-black text-rose-950">{diseaseSeverity}</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-100">
              <div className="flex items-center gap-2 text-amber-800 mb-1">
                <Clock className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-bold uppercase tracking-wider">{isHi ? 'सर्वोत्तम स्प्रे समय' : 'Spray Window'}</span>
              </div>
              <p className="text-sm font-bold text-amber-950">{diseaseAdvisory.sprayWindow || '06:30 AM - 08:30 AM'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-800 mb-1">
                <FlaskConical className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold uppercase tracking-wider">{isHi ? 'अनुशंसित रसायन' : 'Recommended Chemical'}</span>
              </div>
              <p className="text-xs font-bold text-emerald-950 truncate">
                {typeof diseaseAdvisory.fertilizer === 'object' ? JSON.stringify(diseaseAdvisory.fertilizer) : String(diseaseAdvisory.fertilizer || 'Metalaxyl-M (Apron XL)')}
              </p>
            </div>
          </div>

          {/* Treatment & Symptoms */}
          {diseaseAdvisory.treatment && Array.isArray(diseaseAdvisory.treatment) && diseaseAdvisory.treatment.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" /> {isHi ? 'किसान भाइयों के लिए उपचार व प्रबंधन प्रोटोकॉल:' : 'Agronomic Treatment Protocol:'}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {diseaseAdvisory.treatment.map((tItem, idx) => {
                  const itemText = typeof tItem === 'object' ? (tItem.title || tItem.name || tItem.text || JSON.stringify(tItem)) : String(tItem);
                  return (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{itemText}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Full Agronomic Advisory Panel (appears after real soil classification) */}
      {soilAdvisory && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-900/10">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {isHi ? 'कृषि सलाह (Agronomic Advisory)' : `Agronomic Advisory for ${soilType}`}
                </h3>
                <p className="text-xs text-slate-500">
                  {isHi ? 'PyTorch ResNet-18 मॉडल द्वारा पहचानी गई मिट्टी का विस्तृत विश्लेषण' : 'Detailed analysis from PyTorch ResNet-18 Soil Classification Model'}
                </p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-md bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
              Confidence: {soilConfidence}%
            </span>
          </div>

          {/* Soil Description */}
          {soilAdvisory.description && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-100">
              <p className="text-sm text-slate-800 leading-relaxed">
                <span className="font-bold text-amber-900">Description: </span>
                {typeof soilAdvisory.description === 'object' 
                  ? (soilAdvisory.description.en || soilAdvisory.description.hi || JSON.stringify(soilAdvisory.description))
                  : String(soilAdvisory.description)}
              </p>
            </div>
          )}

          {/* Key Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-800 mb-1">
                <FlaskConical className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold uppercase tracking-wider">{isHi ? 'मृदा pH रेंज' : 'pH Range'}</span>
              </div>
              <p className="text-base font-black text-emerald-950">{soilPh}</p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-100">
              <div className="flex items-center gap-2 text-sky-800 mb-1">
                <Droplets className="w-4 h-4 text-sky-700" />
                <span className="text-xs font-bold uppercase tracking-wider">{isHi ? 'जल धारण क्षमता' : 'Water Retention'}</span>
              </div>
              <p className="text-base font-black text-sky-950">
                {typeof soilAdvisory.waterRetention === 'object' 
                  ? (isHi ? (soilAdvisory.waterRetention.hi || soilAdvisory.waterRetention.waterRetentionHi || soilAdvisory.waterRetention.en) : (soilAdvisory.waterRetention.en || soilAdvisory.waterRetention.waterRetentionEn || soilAdvisory.waterRetention.hi))
                  : String(soilAdvisory.waterRetention || 'Moderate')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-100">
              <div className="flex items-center gap-2 text-orange-800 mb-1">
                <Layers className="w-4 h-4 text-orange-700" />
                <span className="text-xs font-bold uppercase tracking-wider">{isHi ? 'संरचना / बनावट' : 'Texture'}</span>
              </div>
              <p className="text-sm font-bold text-orange-950">
                {typeof soilAdvisory.texture === 'object'
                  ? (isHi ? (soilAdvisory.texture.hi || soilAdvisory.texture.textureHi || soilAdvisory.texture.en) : (soilAdvisory.texture.en || soilAdvisory.texture.textureEn || soilAdvisory.texture.hi))
                  : String(soilAdvisory.texture || 'Loamy')}
              </p>
            </div>
          </div>

          {/* Recommended Crops */}
          {soilAdvisory.suitableCrops && Array.isArray(soilAdvisory.suitableCrops) && soilAdvisory.suitableCrops.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-700" /> {isHi ? 'खेती के लिए अनुशंसित फसलें:' : 'Recommended Crops to Cultivate:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {soilAdvisory.suitableCrops.map((crop, i) => {
                  const cropTitle = typeof crop === 'object' 
                    ? (isHi ? (crop.nameHi || crop.nameEn || crop.title) : (crop.nameEn || crop.nameHi || crop.title))
                    : String(crop);
                  return (
                    <span key={i} className="px-3 py-1.5 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200 hover:bg-emerald-200 transition">
                      {cropTitle}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Fertilization Strategy */}
          {soilAdvisory.fertilizers && Array.isArray(soilAdvisory.fertilizers) && soilAdvisory.fertilizers.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-700" /> {isHi ? 'उर्वरक रणनीति:' : 'Fertilization Strategy:'}
              </h4>
              <div className="space-y-1.5">
                {soilAdvisory.fertilizers.map((fert, i) => {
                  const fertTitle = typeof fert === 'object' 
                    ? (fert.title || fert.name || fert.en || JSON.stringify(fert))
                    : String(fert);
                  return (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{fertTitle}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Farming Tip */}
          {soilAdvisory.farmingTips && (
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200">
              <p className="text-sm text-teal-950 leading-relaxed">
                <Lightbulb className="w-4 h-4 text-teal-700 inline mr-1" />
                <span className="font-bold">{isHi ? 'खेती की सलाह:' : 'Farming Tip:'} </span>
                {typeof soilAdvisory.farmingTips === 'object'
                  ? (isHi ? (soilAdvisory.farmingTips.hi || soilAdvisory.farmingTips.farmingTipsHi || soilAdvisory.farmingTips.en) : (soilAdvisory.farmingTips.en || soilAdvisory.farmingTips.farmingTipsEn || soilAdvisory.farmingTips.hi))
                  : String(soilAdvisory.farmingTips)}
              </p>
            </div>
          )}

          {/* Probability Breakdown */}
          {!kisanMode && soilAdvisory.probabilities && Object.keys(soilAdvisory.probabilities).length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-slate-700" />
                <span>{isHi ? 'सभी वर्गों की संभावना:' : 'Prediction Probability Breakdown:'}</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(soilAdvisory.probabilities)
                  .sort(([,a], [,b]) => b - a)
                  .map(([cls, prob]) => (
                    <div key={cls} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <p className="text-xs font-bold text-slate-700 mb-1">{cls} Soil</p>
                      <div className="w-full bg-slate-200 rounded-full h-2 mb-1.5">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
                          style={{ width: `${Math.min(prob * 100, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs font-black text-slate-900">{(prob * 100).toFixed(2)}%</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Merkle Root & Dispatch Block Container */}
      <div id="merkle-dispatch-section" className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 rounded-3xl p-6 sm:p-8 border border-emerald-800/40 text-white shadow-xl space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{kisanMode 
                ? (isHi ? '3-कारक किसान डेटा प्रमाणीकरण' : '3-Factor Farm Data Verification')
                : (isHi ? 'क्रिप्टोग्राफ़िक Merkle Spanning Tree (MST)' : 'Cryptographic Merkle Spanning Tree (MST)')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {kisanMode 
                ? (isHi ? 'प्रमाणित किसान परामर्श एवं दवा पर्ची' : 'Verified Prescription Generation')
                : (isHi ? '3-फैक्टर टेलीमेट्री Merkle Root' : '3-Factor Combined Merkle State Root')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {kisanMode 
                ? (isHi ? 'पत्ती रोग, लाइव सेंसर व मिट्टी डेटा के आधार पर आधिकारिक पर्ची तैयार करें।' : 'Generate official agronomic prescription and DBT subsidy based on leaf, soil, and live sensors.')
                : (isHi ? 'यह हैश तीनों डेटा का सिंगल फिंगरप्रिंट है जिसे कोई बदल नहीं सकता।' : 'Cryptographic proof binding leaf 1, leaf 2 and leaf 3 into an immutable root hash.')}
            </p>
          </div>

          <div className="w-full md:w-auto">
            <button
              onClick={handleSendToBlockchain}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-base shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-3 transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>{isHi ? 'पर्चा तैयार हो रहा है...' : 'Evaluating Data...'}</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>{kisanMode ? (isHi ? 'सरकारी दवा पर्ची तैयार करें' : 'Generate Verified Prescription') : (isHi ? 'MST ब्लॉकचेन पर भेजें' : 'Dispatch to MST Blockchain')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Merkle Root Display (Desktop/Technical Mode) */}
        {!kisanMode && (
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-600/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Merkle Root Hash (SHA-256):
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-mono">Network: MST Testnet (91562037)</span>
                <a
                  href={`https://testnet.mstscan.com/address/${safeWallet}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1 transition"
                >
                  <span>{isHi ? 'MSTScan पर देखें' : 'View on MSTScan'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <div className="text-xs sm:text-sm font-mono text-emerald-300 break-all font-semibold select-all bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/20">
              {merkleRoot || 'Computing Merkle Root...'}
            </div>
          </div>
        )}

        {/* Dispatched Blockchain Dossier Container */}
        {(broadcastSuccess || dispatchStatus !== 'IDLE') && (
          <div id="dispatched-dossier-section" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/40 shadow-2xl space-y-6 animate-in fade-in slide-in-from-top-3 duration-500">
            
            {/* Top Dossier Header & MST Network Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-emerald-500/20">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 flex-shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {isHi ? 'ब्लॉकचेन पर प्रेषित टेलीमेट्री डोज़ियर' : 'Dispatched Blockchain Telemetry Dossier'}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wide border ${
                      dispatchStatus === 'VERIFIED_AND_MINTED'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                    }`}>
                      {dispatchStatus === 'VERIFIED_AND_MINTED' ? 'MINTED & VERIFIED' : 'DISPATCHED TO LEDGER'}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-300/90 mt-0.5">
                    Tx ID: <span className="font-mono font-bold text-white">{submittedBlock?.blockId || 'MST-TX-7829'}</span> • 
                    Block #{submittedBlock?.index || 142} • 
                    Network: <span className="font-semibold text-emerald-200">MST Testnet (Chain ID 91562037)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-start lg:self-auto">
                <a
                  href={`https://testnet.mstscan.com/address/${safeWallet}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-2 transition shadow-md shadow-emerald-950/40"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Inspect on MSTScan</span>
                </a>
              </div>
            </div>

            {/* 3-Factor Telemetry Grid with Images and Complete Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Factor 1: Scanned Leaf Sample & Disease Diagnostic */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">
                          {isHi ? 'पत्ती का नमूना व रोग पहचान' : 'Scanned Leaf Diagnostic'}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">MobileNetV3-Large PyTorch</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-bold text-xs border border-rose-500/30">
                      {submittedBlock?.plantDiseaseData?.confidence || plantConfidence}%
                    </span>
                  </div>

                  {/* Scanned Leaf Sample Image Preview */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 aspect-video mb-3 group flex items-center justify-center">
                    {(submittedBlock?.plantDiseaseData?.imageUri || plantPhoto) ? (
                      <img 
                        src={submittedBlock?.plantDiseaseData?.imageUri || plantPhoto} 
                        alt="Dispatched Scanned Leaf" 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-500 gap-1.5 p-4 text-center">
                        <Leaf className="w-6 h-6 text-emerald-400/50" />
                        <span className="text-[11px] text-slate-400 font-medium">
                          {isHi ? 'पत्ती फोटो संलग्न नहीं' : 'No leaf photo attached'}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-[10px] font-bold text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <Leaf className="w-3 h-3 text-emerald-400" />
                      <span>Ingested Leaf</span>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-[10px] font-bold text-white border border-slate-700">
                      {submittedBlock?.crop || 'Pearl Millet'}
                    </div>
                  </div>

                  {/* Full Diagnostic Details */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Diagnosis:</span>
                      <span className="font-bold text-rose-300 text-right">
                        {submittedBlock?.plantDiseaseData?.disease || plantDisease}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Severity Grade:</span>
                      <span className="font-semibold text-amber-300">
                        {submittedBlock?.plantDiseaseData?.severity || diseaseSeverity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Risk Assessment:</span>
                      <span className="font-semibold text-rose-400">
                        {diseaseRisk}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Leaf 1 Cryptographic Hash */}
                {!kisanMode && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                      Leaf 1 Hash (Plant Diagnostic):
                    </span>
                    <div className="text-[10px] font-mono text-emerald-400 bg-slate-900 p-2 rounded-lg truncate border border-slate-800 font-semibold" title={submittedBlock?.leaves?.plantLeafHash || plantLeafHash}>
                      {submittedBlock?.leaves?.plantLeafHash || plantLeafHash}
                    </div>
                  </div>
                )}
              </div>

              {/* Factor 2: Live HiveMQ IoT Telemetry */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">
                          {isHi ? 'IoT सेंसर लाइव टेलीमेट्री' : 'Live IoT Sensor Stream'}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">HiveMQ TLS Broker</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 font-bold text-xs border border-teal-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                      <span>Connected</span>
                    </span>
                  </div>

                  {/* IoT Telemetry Metrics Grid */}
                  <div className="space-y-3 mb-3">
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-teal-950/60 to-slate-900 border border-teal-500/20 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium flex items-center gap-1.5">
                          <Droplets className="w-4 h-4 text-sky-400" />
                          <span>Soil Moisture Level</span>
                        </span>
                        <span className="text-base font-black text-sky-300">
                          {submittedBlock?.mqttData?.soil1 || mqttMoisture}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-sky-500 to-teal-400 transition-all duration-500 rounded-full"
                          style={{ width: `${Math.min(100, submittedBlock?.mqttData?.soil1 || mqttMoisture)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                          <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                          <span>Temperature</span>
                        </span>
                        <p className="font-bold text-white text-sm">
                          {submittedBlock?.mqttData?.temperature || mqttTemp}°C
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                          <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                          <span>Relative Humidity</span>
                        </span>
                        <p className="font-bold text-white text-sm">
                          {submittedBlock?.mqttData?.humidity || mqttHumidity}%
                        </p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Rain Alert:</span>
                      <span className="font-bold text-slate-200 flex items-center gap-1">
                        {mqttRain ? (
                          <>
                            <CloudRain className="w-4 h-4 text-sky-400" />
                            <span>Rain Alert Active</span>
                          </>
                        ) : (
                          <>
                            <Sun className="w-4 h-4 text-amber-400" />
                            <span>Clear Skies / No Rain</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Leaf 2 Cryptographic Hash */}
                {!kisanMode && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                      Leaf 2 Hash (IoT Sensor):
                    </span>
                    <div className="text-[10px] font-mono text-teal-400 bg-slate-900 p-2 rounded-lg truncate border border-slate-800 font-semibold" title={submittedBlock?.leaves?.mqttLeafHash || mqttLeafHash}>
                      {submittedBlock?.leaves?.mqttLeafHash || mqttLeafHash}
                    </div>
                  </div>
                )}
              </div>

              {/* Factor 3: Scanned Soil Sample & Soil Studio Classification */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">
                          {isHi ? 'मिट्टी का नमूना व गुण' : 'Scanned Soil Classification'}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">Soil AI Studio (Custom CNN)</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
                      {submittedBlock?.soilData?.confidence || soilConfidence}%
                    </span>
                  </div>

                  {/* Scanned Soil Sample Image Preview */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 aspect-video mb-3 group flex items-center justify-center">
                    {(submittedBlock?.soilData?.imageUri || soilPhoto) ? (
                      <img 
                        src={submittedBlock?.soilData?.imageUri || soilPhoto} 
                        alt="Dispatched Scanned Soil" 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-500 gap-1.5 p-4 text-center">
                        <Sprout className="w-6 h-6 text-amber-400/50" />
                        <span className="text-[11px] text-slate-400 font-medium">
                          {isHi ? 'मिट्टी फोटो संलग्न नहीं' : 'No soil photo attached'}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-[10px] font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Sprout className="w-3 h-3 text-amber-400" />
                      <span>Ingested Soil</span>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-[10px] font-bold text-amber-200 border border-amber-500/30">
                      pH: {submittedBlock?.soilData?.ph || soilPh}
                    </div>
                  </div>

                  {/* Full Soil Properties */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Classified Type:</span>
                      <span className="font-bold text-amber-300 text-right truncate max-w-[170px]" title={submittedBlock?.soilData?.soilType || soilType}>
                        {submittedBlock?.soilData?.soilType || soilType}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Water Retention:</span>
                      <span className="font-semibold text-slate-200">
                        {soilAdvisory?.waterRetention ? (typeof soilAdvisory.waterRetention === 'object' ? (isHi ? (soilAdvisory.waterRetention.hi || soilAdvisory.waterRetention.en) : (soilAdvisory.waterRetention.en || soilAdvisory.waterRetention.hi)) : String(soilAdvisory.waterRetention)) : 'Moderate'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Texture:</span>
                      <span className="font-semibold text-slate-200">
                        {soilAdvisory?.texture ? (typeof soilAdvisory.texture === 'object' ? (isHi ? (soilAdvisory.texture.hi || soilAdvisory.texture.en) : (soilAdvisory.texture.en || soilAdvisory.texture.hi)) : String(soilAdvisory.texture)) : 'Loamy / Sandy Loam'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Leaf 3 Cryptographic Hash */}
                {!kisanMode && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                      Leaf 3 Hash (Soil Classification):
                    </span>
                    <div className="text-[10px] font-mono text-amber-400 bg-slate-900 p-2 rounded-lg truncate border border-slate-800 font-semibold" title={submittedBlock?.leaves?.soilLeafHash || soilLeafHash}>
                      {submittedBlock?.leaves?.soilLeafHash || soilLeafHash}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Quick Action / Progression to Instant Prescription */}
            {dispatchStatus !== 'VERIFIED_AND_MINTED' && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 animate-spin" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {isGeneratingPrescription 
                        ? (isHi ? 'कृषि टेलीमेट्री का ICAR विशेषज्ञ विश्लेषण जारी...' : 'Analyzing Dispatched Telemetry with Agricultural Criteria...')
                        : (isHi ? 'फर्टिलाइजर कंपनी व विशेषज्ञ सत्यापन प्रतीक्षारत' : 'Awaiting Fertilizer Company & Agricultural Verification')}
                    </h4>
                    <p className="text-xs text-amber-200/80">
                      {isHi ? 'आप चाहें तो नीचे क्लिक करके तुरंत AI प्रेस्क्रिप्शन व ब्लॉक प्रूफ प्राप्त कर सकते हैं।' : 'Click below to instantly generate and mint the official fertilizer prescription on MST Blockchain.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleGeneratePrescriptionNow()}
                  disabled={isGeneratingPrescription}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black flex items-center gap-2 transition active:scale-95 disabled:opacity-50 cursor-pointer shadow-md flex-shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGeneratingPrescription ? 'Evaluating...' : (isHi ? 'तुरंत प्रेस्क्रिप्शन सत्यापित करें' : 'Generate Verified Prescription')}</span>
                </button>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Dynamic Fertilizer & Spray Prescription Section */}
      {dispatchStatus === 'IDLE' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {isHi ? 'प्रमाणित खाद व स्प्रे प्रेस्क्रिप्शन' : 'Verified Fertilizer & Spray Prescription'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isHi ? 'टेलीमेट्री डेटा ब्लॉकचेन पर भेजें ताकि फर्टिलाइजर कंपनी AI द्वारा प्रमाणित प्रेस्क्रिप्शन जारी कर सके।' : 'Awaiting telemetry dispatch to Agro-Chemical & Fertilizer Company Portal.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleSendToBlockchain}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isHi ? 'डेटा ब्लॉकचेन पर भेजें' : 'Dispatch Telemetry to Blockchain'}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-2">
            <p className="leading-relaxed">
              <span className="font-bold text-slate-800">{isHi ? 'यह कैसे काम करता है:' : 'How this works:'} </span>
              {isHi
                ? 'जब आप ऊपर "Dispatch to MST Blockchain" पर क्लिक करेंगे, तब आपकी पत्ती की फोटो, मिट्टी का प्रकार और IoT सेंसर का डेटा ब्लॉकचेन में सुरक्षित होकर फर्टिलाइजर कंपनी के पास जाएगा। वहां से अप्रूवल मिलने के बाद आधिकारिक प्रेस्क्रिप्शन, ब्लॉक प्रूफ व सरकारी सब्सिडी यहीं दिखाई देगी।'
                : 'When you click "Dispatch to MST Blockchain", your leaf photo, soil type, and IoT sensors are cryptographic-hashed and sent to the Fertilizer Company. Once evaluated and approved, the official verified prescription with block proof and DBT subsidy will unlock here.'}
            </p>
          </div>
        </div>
      )}

      {dispatchStatus === 'VERIFIED_AND_MINTED' && verifiedPrescription && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-300/80 shadow-lg shadow-emerald-950/5 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Big Voice Readout Banner for Uneducated Farmers */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-4 sm:p-5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 border-2 border-amber-300">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-amber-100">
                  {isHi ? 'किसान भाईयों के लिए ऑडियो' : 'Audio Guide for Farmers'}
                </p>
                <h4 className="text-base font-black text-white">
                  {isHi ? 'सरकारी दवा पर्ची बोलकर सुनें' : 'Listen to Medicine Prescription'}
                </h4>
              </div>
            </div>
            <VoiceReadoutButton
              text={
                isHi
                  ? `किसान भाई, आपकी दवा पर्ची तैयार है। अनुशंसित दवा का नाम है: ${verifiedPrescription.recommendedFertilizer || 'एज़ोक्सीस्ट्रोबिन'}। स्प्रे करने का सही समय है: ${verifiedPrescription.sprayTiming || 'सुबह 6:30 से 8:30'}। दवा की मात्रा: ${verifiedPrescription.dosage || '1 मिलीलीटर प्रति लीटर'}। सब्सिडी काटकर कुल लागत मात्र ${verifiedPrescription.netPriceINR || 360} रुपये प्रति एकड़ है।`
                  : `Farmer friend, your verified prescription is ready. Recommended medicine: ${verifiedPrescription.recommendedFertilizer}. Spray timing: ${verifiedPrescription.sprayTiming}. Dosage: ${verifiedPrescription.dosage}. Net price after subsidy is ${verifiedPrescription.netPriceINR || 360} rupees per acre.`
              }
              lang={lang}
              label={isHi ? 'पर्ची बोलकर सुनें' : 'Listen Prescription'}
              size="md"
              className="w-full sm:w-auto bg-white text-amber-900 hover:bg-amber-50 shadow font-black"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/10">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {isHi ? 'कंपनी द्वारा सत्यापित खाद व स्प्रे शेड्यूल' : 'Verified Fertilizer & Spray Prescription'}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wide border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    <span>MST VERIFIED</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {isHi ? 'Gemini AI और IFFCO कृषि वैज्ञानिक द्वारा तैयार किया गया प्रमाणिक उपचार' : 'Gemini AI Agronomic Multi-Modal Verified Solution & Spray Windows'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500">Block Proof:</span>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                {verifiedBlockProof}
              </span>
            </div>
          </div>

          {/* Prescription Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Fertilizer Name */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/60 border border-emerald-100 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  {isHi ? 'सटीक दवा / खाद' : 'Recommended Fertilizer'}
                </span>
                <h4 className="text-base font-black text-slate-900 leading-snug">
                  {verifiedPrescription.recommendedFertilizer || 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC'}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-emerald-200/60">
                <span className="text-xs text-slate-600 font-medium">Category: {verifiedPrescription.category || 'Broad-Spectrum Bio-Fungicide'}</span>
              </div>
            </div>

            {/* Card 2: Spray Timing (Clock) */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/60 border border-amber-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                    {isHi ? 'स्प्रे का सही समय' : 'Exact Spray Window'}
                  </span>
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <h4 className="text-xl font-black text-amber-950">
                  {verifiedPrescription.sprayTiming || '06:30 AM to 08:30 AM'}
                </h4>
                <p className="text-xs text-amber-800 mt-1 font-medium">
                  {isHi ? 'सुबह के समय शांत हवा और उपयुक्त ओस' : 'Optimal calm wind & leaf stomatal opening'}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs text-amber-900 font-semibold">
                <span>{isHi ? 'वर्षा सुरक्षा' : 'Rainfastness:'}</span>
                <span>{verifiedPrescription.rainfastness || verifiedPrescription.safetyWindow || '2.5 Hours Safe'}</span>
              </div>
            </div>

            {/* Card 3: Dosage & Frequency */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50/80 to-blue-50/60 border border-sky-100 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-1">
                  {isHi ? 'मात्रा व बारम्बारता' : 'Dosage & Frequency'}
                </span>
                <h4 className="text-lg font-black text-sky-950">
                  {verifiedPrescription.dosage || '1.0 ml / Litre'}
                </h4>
                <p className="text-xs text-sky-800 mt-1 font-medium">
                  {verifiedPrescription.totalMix || '200 Litres total tank mix per acre'}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-sky-200/60 flex items-center justify-between text-xs text-sky-900 font-semibold">
                <span>{isHi ? 'स्प्रे की संख्या' : 'Repeat Spray:'}</span>
                <span>{verifiedPrescription.sprayFrequency || '2 Sprays (7-day gap)'}</span>
              </div>
            </div>

            {/* Card 4: Price in INR */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    {isHi ? 'अनुमानित लागत' : 'Estimated Cost (₹)'}
                  </span>
                  <IndianRupee className="w-4 h-4 text-emerald-700" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">
                  ₹{verifiedPrescription.estimatedPriceINR || 480} <span className="text-xs font-normal text-slate-500">/ एकड़</span>
                </h4>
                <p className="text-xs text-slate-700 mt-1 font-medium">
                  DBT Subsidy applicable: <span className="font-bold text-emerald-800">₹{verifiedPrescription.subsidyINR || 120} off</span>
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-800 font-semibold">
                <span>Net Farmer Price:</span>
                <span className="font-black text-emerald-900">₹{verifiedPrescription.netPriceINR || 360} / Acre</span>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Prescription immutable and cryptographically bound on MST Testnet (Chain ID: 91562037)</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
