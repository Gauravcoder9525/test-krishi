import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Sparkles, 
  Activity, 
  Radio, 
  Cpu, 
  Wifi, 
  Droplets, 
  Thermometer, 
  Wind, 
  Gauge, 
  CloudRain, 
  Sun, 
  Zap,
  Power,
  Play, 
  Pause,
  Layers,
  MapPin,
  RefreshCw,
  Terminal,
  Info,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Bug,
  CheckCircle2,
  ArrowRight,
  HeartPulse,
  Sprout,
  TrendingDown,
  TrendingUp
} from 'lucide-react';

import { connectMqtt, publishRelayCommand, MQTT_CONFIG } from '../../services/mqttService';

export default function RecommendationTab({ 
  lang = 'en', 
  t = {}, 
  setActiveTab,
  currentLocation 
}) {
  const isHi = lang === 'hi';

  // Smart Relay State & Motor Voltage (12.4V DC Supply)
  const [relayOn, setRelayOn] = useState(false);
  const [motorVoltage, setMotorVoltage] = useState(12.4);

  // Soil Moisture States for 4 Fixed Zones
  const [soil1, setSoil1] = useState(0);
  const [soil2, setSoil2] = useState(0);
  const [soil3, setSoil3] = useState(0);
  const [soil4, setSoil4] = useState(0);

  // Environmental Telemetry States
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [rain, setRain] = useState(false);
  const [counter, setCounter] = useState(0);
  const [deviceName, setDeviceName] = useState('ESP32');
  const [deviceStatus, setDeviceStatus] = useState('online');

  // Real-time MQTT vs Simulation states
  const [liveMode, setLiveMode] = useState(true); // Default to Real ESP32 stream
  const [autoSimulate, setAutoSimulate] = useState(false);
  const [mqttStatus, setMqttStatus] = useState('connecting'); // 'connecting' | 'connected' | 'reconnecting' | 'disconnected' | 'error'
  const [mqttError, setMqttError] = useState(null);
  const [lastPacketTime, setLastPacketTime] = useState(null);
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [isFreshPacket, setIsFreshPacket] = useState(false);
  const [rawPayload, setRawPayload] = useState(null);
  const [packetCount, setPacketCount] = useState(0);
  const [reconnectTrigger, setReconnectTrigger] = useState(0);

  // MQTT Server and Topic from Config
  const mqttServer = MQTT_CONFIG.broker;
  const mqttTopic = MQTT_CONFIG.dataTopic || 'gogul/agriculture/data';
  const [logs, setLogs] = useState([
    { time: new Date().toLocaleTimeString(), msg: `Initiating WebSocket connection to HiveMQ Cloud (${MQTT_CONFIG.broker}:${MQTT_CONFIG.port}${MQTT_CONFIG.path})...` }
  ]);

  const canvasContainerRef = useRef(null);
  const zonesRef = useRef([]);

  // Second ticker to show active latency since last received telemetry packet
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Micro fluctuation around 12.4V DC supply so it behaves authentically
  useEffect(() => {
    const vTimer = setInterval(() => {
      setMotorVoltage(+(12.4 + (Math.random() * 0.04 - 0.02)).toFixed(1));
    }, 5000);
    return () => clearInterval(vTimer);
  }, []);

  // Connect to Real HiveMQ Cloud MQTT Broker via Paho WebSockets
  useEffect(() => {
    let clientController = null;

    const addLog = (msg) => {
      setLogs(prev => [
        { time: new Date().toLocaleTimeString(), msg },
        ...prev.slice(0, 24)
      ]);
    };

    clientController = connectMqtt({
      onStatusChange: (status) => {
        setMqttStatus(status);
        if (status === 'connected') {
          setMqttError(null);
        }
      },
      onError: (err) => {
        setMqttError(err.message || String(err));
      },
      onLog: (msg) => {
        addLog(msg);
      },
      onRelayStatus: (status) => {
        const isUp = status === 'ON' || status === 1 || String(status).toUpperCase() === 'ON';
        setRelayOn(isUp);
        addLog(`[MQTT Relay] Status updated: ${isUp ? 'ON' : 'OFF'}`);
      },
      onDeviceStatus: (status) => {
        setDeviceStatus(status);
        addLog(`Device status: ${status.toUpperCase()}`);
      },
      onMessage: (payload, rawText, topic) => {
        const now = new Date().toLocaleTimeString();
        setLastPacketTime(now);
        setSecondsAgo(0);
        setIsFreshPacket(true);
        setTimeout(() => setIsFreshPacket(false), 1400);

        setRawPayload(rawText);
        setPacketCount(c => c + 1);

        if (payload.device) setDeviceName(payload.device);

        // When in live mode, update all sensors from incoming ESP32 packet
        if (liveMode) {
          if (payload.soil1 !== undefined && payload.soil1 !== null) setSoil1(Number(payload.soil1));
          if (payload.soil2 !== undefined && payload.soil2 !== null) setSoil2(Number(payload.soil2));
          if (payload.soil3 !== undefined && payload.soil3 !== null) setSoil3(Number(payload.soil3));
          if (payload.soil4 !== undefined && payload.soil4 !== null) setSoil4(Number(payload.soil4));

          if (payload.temperature !== undefined && payload.temperature !== null) setTemperature(Number(payload.temperature));
          if (payload.humidity !== undefined && payload.humidity !== null) setHumidity(Number(payload.humidity));
          if (payload.pressure !== undefined && payload.pressure !== null) setPressure(Number(payload.pressure));
          if (payload.counter !== undefined && payload.counter !== null) setCounter(Number(payload.counter));

          if (payload.rain !== undefined && payload.rain !== null) {
            const isRaining = typeof payload.rain === 'boolean'
              ? payload.rain
              : (payload.rain === 1 || String(payload.rain).toLowerCase() === 'true' || String(payload.rain).toLowerCase() === 'yes');
            setRain(isRaining);
          }

          addLog(`[ESP32 Live #${payload.counter || '?'}] T:${payload.temperature}°C H:${payload.humidity}% P:${payload.pressure}hPa S1:${payload.soil1}% S2:${payload.soil2}% S3:${payload.soil3}% S4:${payload.soil4}% Rain:${payload.rain ? 'YES' : 'NO'}`);
        }
      }
    });

    return () => {
      if (clientController) {
        clientController.disconnect();
      }
    };
  }, [reconnectTrigger, liveMode]);

  // Optional Manual Simulation (only active if user explicitly turns it on)
  useEffect(() => {
    if (!autoSimulate || liveMode) return;
    const interval = setInterval(() => {
      setSoil1(prev => Math.min(100, Math.max(0, prev + (Math.floor(Math.random() * 7) - 3))));
      setSoil2(prev => Math.min(100, Math.max(0, prev + (Math.floor(Math.random() * 7) - 3))));
      setSoil3(prev => Math.min(100, Math.max(0, prev + (Math.floor(Math.random() * 7) - 3))));
      setSoil4(prev => Math.min(100, Math.max(0, prev + (Math.floor(Math.random() * 7) - 3))));
      setTemperature(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setHumidity(prev => +(Math.min(100, Math.max(20, prev + (Math.random() * 1 - 0.5)))).toFixed(1));
      
      setCounter(c => {
        const nextC = c + 1;
        setLogs(prev => [
          { time: new Date().toLocaleTimeString(), msg: `[Manual Sim #${nextC}] Simulation tick generated` },
          ...prev.slice(0, 24)
        ]);
        return nextC;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [autoSimulate, liveMode]);

  // Three.js 3D Farm Layout Initialization
  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    // Soft light studio background matching the website's light theme
    scene.background = new THREE.Color(0xf1f5f9);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 14, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 1.25);
    dirLight.position.set(15, 25, 15);
    scene.add(dirLight);

    const coords = [
      { x: -3.2, z: -3.2, id: 1, label: 'Zone 1 (Pin 32)' },
      { x: 3.2, z: -3.2, id: 2, label: 'Zone 2 (Pin 33)' },
      { x: -3.2, z: 3.2, id: 3, label: 'Zone 3 (Pin 34)' },
      { x: 3.2, z: 3.2, id: 4, label: 'Zone 4 (Pin 35)' }
    ];

    zonesRef.current = [];

    coords.forEach((c) => {
      const group = new THREE.Group();
      group.position.set(c.x, 0, c.z);

      // Soil Box: slightly taller height (0.5) so rich brown soil is prominent
      const soilGeo = new THREE.BoxGeometry(5.2, 0.5, 5.2);
      const soilMat = new THREE.MeshStandardMaterial({ 
        color: 0x5c3a21, 
        roughness: 0.8,
        metalness: 0.08
      });
      const soilMesh = new THREE.Mesh(soilGeo, soilMat);
      group.add(soilMesh);

      const edgesGeo = new THREE.EdgesGeometry(soilGeo);
      const edgesMat = new THREE.LineBasicMaterial({ color: 0x64748b, linewidth: 2 });
      const wireframe = new THREE.LineSegments(edgesGeo, edgesMat);
      group.add(wireframe);

      const grassGroup = new THREE.Group();
      grassGroup.position.y = 0.26;

      // Realistic crop shoots: smaller size so soil surface is prominently visible
      const bladeGeo = new THREE.ConeGeometry(0.04, 0.45, 4);
      bladeGeo.translate(0, 0.22, 0);

      const bladesCount = 42;
      const bladeMeshes = [];

      for (let i = 0; i < bladesCount; i++) {
        const bladeMat = new THREE.MeshStandardMaterial({ 
          color: 0x22c55e, 
          roughness: 0.5,
          side: THREE.DoubleSide
        });
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        
        const bx = (Math.random() - 0.5) * 4.3;
        const bz = (Math.random() - 0.5) * 4.3;
        blade.position.set(bx, 0, bz);

        const scaleY = 0.6 + Math.random() * 0.6;
        blade.scale.set(1, scaleY, 1);
        blade.rotation.x = (Math.random() - 0.5) * 0.25;
        blade.rotation.z = (Math.random() - 0.5) * 0.25;

        grassGroup.add(blade);
        bladeMeshes.push(blade);
      }

      group.add(grassGroup);

      // Number badge sprite
      const canvasTag = document.createElement('canvas');
      canvasTag.width = 128;
      canvasTag.height = 128;
      const ctx = canvasTag.getContext('2d');
      ctx.fillStyle = '#064e3b'; // Deep emerald circle matching site primary color
      ctx.beginPath();
      ctx.arc(64, 64, 52, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 7;
      ctx.strokeStyle = '#34d399'; // Mint/emerald border
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 52px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`#${c.id}`, 64, 64);

      const texture = new THREE.CanvasTexture(canvasTag);
      const spriteMat = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.2, 1.2, 1.2);
      sprite.position.set(0, 1.8, 0);
      group.add(sprite);

      scene.add(group);
      zonesRef.current.push({ soilMat, bladeMeshes });
    });

    // Subtle grid helper for light theme
    const gridHelper = new THREE.GridHelper(30, 30, 0x94a3b8, 0xcbd5e1);
    gridHelper.position.y = -0.23;
    scene.add(gridHelper);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update 3D Soil & Grass Colors based on real moisture values
  useEffect(() => {
    if (!zonesRef.current || zonesRef.current.length < 4) return;
    const readings = [soil1, soil2, soil3, soil4];

    // Three Reference Colors for smooth realistic soil transition
    const lightBrown = new THREE.Color(0xd8a268); // Light dry brown (pani nahi hoga / 0%)
    const midBrown = new THREE.Color(0x6b3f1f);   // Farm brown (sensor data increase hone par ~50%)
    const darkBrown = new THREE.Color(0x43270f);  // Exact requested color for 100% reading (#43270f)

    zonesRef.current.forEach((zone, idx) => {
      const val = readings[idx];
      const factor = Math.max(0, Math.min(100, val)) / 100;

      const soilColor = new THREE.Color();
      if (factor < 0.5) {
        // 0% to 50%: Light Brown -> Medium Brown
        soilColor.lerpColors(lightBrown, midBrown, factor * 2);
      } else {
        // 50% to 100%: Medium Brown -> Dark Brown
        soilColor.lerpColors(midBrown, darkBrown, (factor - 0.5) * 2);
      }

      zone.soilMat.color.copy(soilColor);
      // Roughness decreases with moisture for wet mud sheen
      zone.soilMat.roughness = Math.max(0.2, 0.95 - (factor * 0.7));

      // Grass color ALWAYS STAYS GREEN as requested
      zone.bladeMeshes.forEach(blade => {
        blade.material.color.setHex(0x22c55e); // Fresh vibrant green
      });
    });
  }, [soil1, soil2, soil3, soil4]);

  const getStatusBadge = (val) => {
    if (val <= 20) {
      return (
        <span className="px-2.5 py-0.5 text-xs bg-amber-50 text-amber-900 border border-amber-300 rounded-full font-bold shadow-xs">
          ⚠️ {val}%: {isHi ? 'पानी नहीं है (हल्की भूरी मिट्टी)' : 'No Water (Light Brown Soil)'}
        </span>
      );
    }
    if (val >= 80) {
      return (
        <span className="px-2.5 py-0.5 text-xs bg-[#241206]/10 text-[#451e08] border border-[#78350f]/30 rounded-full font-bold shadow-xs flex items-center gap-1">
          💧 {val}%: {isHi ? '100% नमी (डार्क ब्राउन मिट्टी)' : 'High Moisture (Dark Brown Soil)'}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 text-xs bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-full font-bold shadow-xs">
        ✨ {val}%: {isHi ? 'उचित नमी (भूरी मिट्टी)' : 'Optimal Moisture (Brown Soil)'}
      </span>
    );
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Title Header Matching Site Light Theme */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> AI Telemetry Engine v2.0
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
              🌾 4 Fixed Zones • ESP32 & HiveMQ Cloud
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isHi ? 'रियल-टाइम फार्मिंग डेटा' : 'Real Time Farming Data'}
          </h2>
          <p className="text-slate-600 text-sm font-medium mt-1">
            {isHi 
              ? 'ESP32 आईओटी लाइव टेलीमेट्री, HiveMQ SSL ब्रोकर स्ट्रीम और 3D खेत नमी निगरानी।' 
              : 'Live ESP32 sensor telemetry, HiveMQ SSL MQTT broker stream, and 3D farm soil visualization.'}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          {/* Live ESP32 vs Manual Simulation Toggle */}
          <button 
            onClick={() => {
              const nextMode = !liveMode;
              setLiveMode(nextMode);
              if (nextMode) {
                setAutoSimulate(false);
              }
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-2 border shadow-sm ${
              liveMode 
                ? 'bg-emerald-600 border-emerald-700 text-white shadow-emerald-500/20' 
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
            title={liveMode ? 'ESP32 Live MQTT Mode Active' : 'Switch back to ESP32 Live Stream'}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${liveMode ? 'bg-white animate-pulse' : 'bg-slate-400'}`}></span>
            {liveMode 
              ? (isHi ? '📡 ESP32 रियल-टाइम चालू' : '📡 ESP32 Live Stream Active') 
              : (isHi ? '🧪 सिमुलेशन / टेस्ट मोड' : '🧪 Manual / Simulation Mode')}
          </button>

          {/* MQTT Status Indicator */}
          <div className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border text-xs font-bold shadow-sm transition ${
            mqttStatus === 'connected'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : mqttStatus === 'connecting' || mqttStatus === 'reconnecting'
              ? 'bg-amber-50 border-amber-300 text-amber-900 animate-pulse'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full ${
              mqttStatus === 'connected' ? 'bg-emerald-500 animate-ping' : mqttStatus === 'connecting' ? 'bg-amber-500' : 'bg-rose-500'
            }`}></span>
            <span>
              {mqttStatus === 'connected' 
                ? `MQTT Online (${packetCount} pkts)` 
                : mqttStatus === 'connecting' 
                ? 'Connecting to HiveMQ...' 
                : mqttStatus === 'reconnecting'
                ? 'Reconnecting...'
                : 'MQTT Offline'}
            </span>
            {mqttStatus !== 'connected' && (
              <button
                onClick={() => setReconnectTrigger(r => r + 1)}
                className="ml-1 text-[11px] underline font-black hover:text-rose-950"
              >
                {isHi ? 'पुनः कनेक्ट' : 'Retry'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Left 3D Viewport & Logs / Right Telemetry & Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        
        {/* Left Column: 3D Farm Layout + HiveMQ Payload */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* 3D Farm Layout Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col flex-1 min-h-[480px]">
            <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-lg">🌿</span> 
                  {isHi ? '3D खेत लेआउट (निश्चित 4 ज़ोन #1, #2, #3, #4)' : '3D Farm Layout (Stationary Zones #1, #2, #3, #4)'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isHi 
                    ? 'मॉडल स्थिर है ताकि आप प्रत्येक सेंसर ज़ोन की नमी आसानी से पहचान सकें।' 
                    : 'Model is locked in place so you can instantly identify each sensor zone.'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {lastPacketTime && (
                  <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border transition-all duration-300 flex items-center gap-1.5 ${
                    isFreshPacket 
                      ? 'bg-emerald-500 text-white font-black scale-105 border-emerald-600 shadow-md shadow-emerald-500/30' 
                      : 'text-emerald-900 bg-emerald-100/90 border-emerald-200'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${isFreshPacket ? 'bg-white animate-ping' : 'bg-emerald-600'}`}></span>
                    <span>Pkt #{counter} ({secondsAgo}s ago)</span>
                  </span>
                )}
                <div className="text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-full font-mono font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  {mqttTopic}
                </div>
              </div>
            </div>

            {/* 3D Canvas Container */}
            <div 
              ref={canvasContainerRef} 
              className="flex-1 w-full rounded-2xl overflow-hidden relative border border-slate-200 bg-slate-100 shadow-inner min-h-[380px]"
            >
              {/* Overlay Sensor Moisture Color Guide */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md border border-slate-200 p-3 rounded-xl text-xs flex flex-col gap-1.5 shadow-lg pointer-events-none z-10">
                <div className="font-bold text-slate-900 mb-0.5 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-700" />
                  {isHi ? 'रंग गाइड (Color Guide)' : 'Moisture Color Guide'}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-md bg-[#22c55e] border border-emerald-600"></div>
                  <span className="text-slate-700 font-semibold">{isHi ? '🌿 घास (Grass): हमेशा हरी' : '🌿 Grass: Always Green'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-md bg-[#d8a268] border border-[#a66e3b]"></div>
                  <span className="text-slate-700 font-semibold">0% ({isHi ? 'पानी नहीं' : 'No Water'}): {isHi ? 'हल्की भूरी मिट्टी' : 'Light Brown Soil'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-md bg-[#6b3f1f] border border-[#3e2412]"></div>
                  <span className="text-slate-700 font-semibold">50% ({isHi ? 'बढ़ती नमी' : 'Normal'}): {isHi ? 'भूरी मिट्टी' : 'Brown Soil'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-md bg-[#43270f] border border-black shadow-xs"></div>
                  <span className="text-slate-900 font-bold">100% ({isHi ? 'पूरी नमी' : 'Full'}): {isHi ? 'डार्क ब्राउन (#43270f)' : 'Dark Brown (#43270f)'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* HiveMQ Live JSON Payload Console */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-700" />
                <span>📡 HiveMQ Live JSON Payload & Telemetry Stream</span>
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  WSS Port 8884 (/mqtt)
                </span>
                <span className="text-[11px] font-mono text-slate-700 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-300 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  {deviceName} • {deviceStatus.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="bg-slate-950 rounded-2xl p-4 font-mono text-xs text-emerald-400 h-44 overflow-y-auto border border-slate-800 flex flex-col gap-1.5 shadow-inner">
              <div className="text-slate-500 flex justify-between">
                <span>// Broker: {mqttServer} | Topic: {mqttTopic}</span>
                <span className={mqttStatus === 'connected' ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                  [{mqttStatus.toUpperCase()}]
                </span>
              </div>
              <div className={`font-semibold p-2.5 rounded-xl border transition-all duration-300 break-all whitespace-pre-wrap ${
                isFreshPacket 
                  ? 'bg-emerald-900/60 border-emerald-500 text-white shadow-xs' 
                  : 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
              }`}>
                {rawPayload || `{ "device": "${deviceName}", "counter": ${counter}, "temperature": ${temperature}, "humidity": ${humidity}, "pressure": ${pressure}, "soil1": ${soil1}, "soil2": ${soil2}, "soil3": ${soil3}, "soil4": ${soil4}, "rain": ${rain} }`}
              </div>
              {logs.map((l, i) => (
                <div key={i} className="text-slate-400 flex items-center gap-2 text-[11px]">
                  <span className="text-slate-500 font-bold">[{l.time}]</span>
                  <span className="text-teal-400 font-black">→</span>
                  <span>{l.msg}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Environmental Telemetry & 4 Moisture Zone Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Environmental Telemetry (DHT11 & BMP280) */}
          <div className={`bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm transition-all duration-300 ${
            isFreshPacket ? 'ring-2 ring-emerald-500/40 shadow-emerald-500/10' : ''
          }`}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-lg">🌤️</span> 
                {isHi ? 'पर्यावरणीय टेलीमेट्री (DHT11 व BMP280)' : 'Environmental Telemetry (DHT11 & BMP280)'}
              </h3>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border font-bold transition-all ${
                isFreshPacket ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {isFreshPacket ? '⚡ Live Sync' : `${secondsAgo}s ago`}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Temperature */}
              <div className={`p-4 rounded-2xl flex flex-col gap-1 shadow-xs transition-all duration-300 ${
                isFreshPacket 
                  ? 'bg-amber-100/80 border border-amber-400 ring-2 ring-amber-300/60' 
                  : 'bg-amber-50/60 border border-amber-200/80'
              }`}>
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-amber-700" />
                  {isHi ? 'तापमान' : 'Temperature'}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-amber-700">{temperature}°C</div>
                <div className="text-[10px] text-amber-800/70 font-semibold mt-0.5">DHT11 (Pin 13)</div>
              </div>

              {/* Humidity */}
              <div className={`p-4 rounded-2xl flex flex-col gap-1 shadow-xs transition-all duration-300 ${
                isFreshPacket 
                  ? 'bg-blue-100/80 border border-blue-400 ring-2 ring-blue-300/60' 
                  : 'bg-blue-50/60 border border-blue-200/80'
              }`}>
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-700" />
                  {isHi ? 'हवा में नमी' : 'Humidity'}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-blue-700">{humidity}%</div>
                <div className="text-[10px] text-blue-800/70 font-semibold mt-0.5">
                  {isHi ? 'सापेक्ष आर्द्रता' : 'Relative Humidity'}
                </div>
              </div>

              {/* Pressure */}
              <div className={`p-4 rounded-2xl flex flex-col gap-1 shadow-xs transition-all duration-300 ${
                isFreshPacket 
                  ? 'bg-teal-100/80 border border-teal-400 ring-2 ring-teal-300/60' 
                  : 'bg-teal-50/60 border border-teal-200/80'
              }`}>
                <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-teal-700" />
                  {isHi ? 'वायुमंडलीय दबाव' : 'Pressure'}
                </span>
                <div className="text-xl sm:text-2xl font-black text-teal-800">
                  {pressure} <span className="text-xs font-semibold text-teal-700">hPa</span>
                </div>
                <div className="text-[10px] text-teal-800/70 font-semibold mt-0.5">BMP280 I2C (21, 22)</div>
              </div>

              {/* Motor Voltage Card (12.4V) */}
              <div className="bg-amber-50/70 border border-amber-300 p-4 rounded-2xl flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    {isHi ? 'मोटर वोल्टेज' : 'Motor Supply Voltage'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-900 mt-1">
                    {motorVoltage} <span className="text-xs font-bold text-amber-700">V DC</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-amber-800 mt-1 pt-1 border-t border-amber-200/70">
                  <span>{relayOn ? '⚡ Load Active (45W)' : '⚪ Standby Supply'}</span>
                  <span className="text-emerald-700">✓ Healthy</span>
                </div>
              </div>

              {/* Rain Sensor (Dynamic Cloud Rain vs Normal Sun) */}
              <div className={`p-4 rounded-2xl flex flex-col justify-between shadow-xs transition-all ${
                rain 
                  ? 'bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-blue-500/50' 
                  : 'bg-amber-50/70 border border-amber-300/80 text-amber-950'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold flex items-center gap-1.5 ${rain ? 'text-blue-200' : 'text-amber-900'}`}>
                    <CloudRain className="w-3.5 h-3.5" />
                    {isHi ? 'वर्षा सेंसर (पिन 27)' : 'Rain Sensor (Pin 27)'}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    rain ? 'bg-blue-500 text-white animate-pulse' : 'bg-amber-200 text-amber-900'
                  }`}>
                    {rain ? (isHi ? 'बारिश सक्रिय' : 'Rain Active') : (isHi ? 'धूप / सूखा' : 'Dry / Clear')}
                  </span>
                </div>

                {/* Rain animation vs Sunny animation */}
                <div className="my-2 py-1 flex items-center justify-center">
                  {rain ? (
                    <div className="flex flex-col items-center">
                      <div className="relative flex items-center justify-center">
                        <span className="text-3xl">☁️</span>
                        <div className="absolute -bottom-2 flex gap-1 animate-bounce">
                          <span className="w-1 h-3 bg-cyan-400 rounded-full"></span>
                          <span className="w-1 h-2 bg-blue-300 rounded-full delay-100"></span>
                          <span className="w-1 h-3 bg-sky-400 rounded-full delay-200"></span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-sky-200 mt-2">
                        {isHi ? '🌧️ बादल से पानी गिर रहा है' : '🌧️ Rainfall Detected'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-md shadow-amber-400/40 flex items-center justify-center animate-pulse">
                        <Sun className="w-6 h-6 text-amber-900 animate-[spin_10s_linear_infinite]" />
                      </div>
                      <span className="text-[11px] font-bold text-amber-900 mt-1">
                        {isHi ? '☀️ सामान्य धूप / मौसम साफ' : '☀️ Normal Sun / Clear Weather'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-1.5 pt-1 border-t border-slate-200/40">
                  <button 
                    onClick={() => {
                      setRain(false);
                      if (liveMode) setLiveMode(false);
                    }}
                    className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition border ${
                      !rain 
                        ? 'bg-amber-500 text-white border-amber-600' 
                        : 'bg-white/10 hover:bg-white/20 text-slate-300 border-white/20'
                    }`}
                  >
                    ☀️ {isHi ? 'धूप' : 'Sun'}
                  </button>
                  <button 
                    onClick={() => {
                      setRain(true);
                      if (liveMode) setLiveMode(false);
                    }}
                    className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition border ${
                      rain 
                        ? 'bg-blue-600 text-white border-blue-700' 
                        : 'bg-white/60 hover:bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    🌧️ {isHi ? 'बारिश' : 'Rain'}
                  </button>
                </div>
              </div>

              {/* Smart Relay Remote Control */}
              <div className={`p-4 rounded-2xl flex flex-col justify-between shadow-xs transition-all ${
                relayOn 
                  ? 'bg-emerald-900 text-white border border-emerald-500 ring-2 ring-emerald-400/50' 
                  : 'bg-slate-50 border border-slate-200/90 text-slate-900'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold flex items-center gap-1.5 ${relayOn ? 'text-emerald-200' : 'text-slate-800'}`}>
                    <Power className="w-3.5 h-3.5" />
                    {isHi ? 'स्मार्ट रिले मोटर कंट्रोल' : 'Smart Relay Switch'}
                  </span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                    relayOn ? 'bg-emerald-400 text-emerald-950 animate-pulse' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {relayOn ? (isHi ? 'चालू (ON)' : 'ON') : (isHi ? 'बंद (OFF)' : 'OFF')}
                  </span>
                </div>

                <div className="my-2">
                  <div className="text-[11px] font-bold opacity-85">
                    {relayOn 
                      ? (isHi ? '⚡ मोटर सक्रिय • जल प्रवाह चालू' : '⚡ Motor Active • Pumping Water') 
                      : (isHi ? '⚪ मोटर बंद • स्टैंडबाय 12.4V' : '⚪ Motor Inactive • Standby 12.4V')}
                  </div>
                  <div className="text-[10px] font-mono opacity-70 mt-0.5">
                    Topic: gogul/agriculture/control
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setRelayOn(true);
                      publishRelayCommand('ON');
                    }}
                    className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-xs border ${
                      relayOn 
                        ? 'bg-emerald-400 text-emerald-950 border-emerald-300 ring-2 ring-emerald-300/80' 
                        : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{isHi ? 'चालू (ON)' : 'Turn ON'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setRelayOn(false);
                      publishRelayCommand('OFF');
                    }}
                    className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-xs border ${
                      !relayOn 
                        ? 'bg-rose-600 text-white border-rose-500 ring-2 ring-rose-400/80' 
                        : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{isHi ? 'बंद (OFF)' : 'Turn OFF'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Soil Moisture Zones */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-lg">🌱</span> 
                  {isHi ? '4 मृदा नमी ज़ोन (Pins 32, 33, 34, 35)' : '4 Soil Moisture Zones (Pins 32, 33, 34, 35)'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {liveMode 
                    ? (isHi ? 'ESP32 पिन 32, 33, 34, 35 से लाइव नमी डेटा स्ट्रीम हो रहा है।' : 'Streaming live sensor values from ESP32 pins 32, 33, 34, 35.') 
                    : (isHi ? 'प्रत्येक सेंसर का मान बदलें और 3D मॉडल में रंग परिवर्तन देखें।' : 'Adjust sliders to simulate live soil reading and view 3D color reactivity.')}
                </p>
              </div>
              {!liveMode && (
                <button
                  onClick={() => {
                    setLiveMode(true);
                    setAutoSimulate(false);
                  }}
                  className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold px-3 py-1.5 rounded-xl transition border border-emerald-300 shadow-xs flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                  {isHi ? 'वापस लाइव करें' : 'Sync Live ESP32'}
                </button>
              )}
            </div>

            {/* Hardware calibration note */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3 text-xs text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold">
                  {isHi ? 'सेंसर रीडिंग नोट:' : 'Hardware Calibration Note:'}
                </span>{' '}
                {isHi 
                  ? 'हवा/सूखी मिट्टी में एनालॉग मान 4095 होने पर ESP32 0% भेजता है। जैसे ही आप सेंसर को पानी या गीली मिट्टी में डालेंगे, मान 0% से बढ़कर 50%-100% होगा और 3D मॉडल में मिट्टी डार्क ब्राउन हो जाएगी!' 
                  : 'In open air or dry soil (4095), ESP32 calculates 0%. Submerge pins 32-35 into water or wet mud to see readings surge & 3D soil darken!'}
              </div>
            </div>

            <div className="flex flex-col gap-3.5 flex-1 justify-around">
              
              {/* Soil Sensor 1 */}
              <div className="bg-slate-50 border border-slate-200/90 p-4 rounded-2xl flex flex-col gap-2 shadow-xs hover:border-emerald-300 transition">
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-slate-800 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black border border-emerald-300">
                      1
                    </span>
                    {isHi ? 'मृदा सेंसर 1 (Pin 32)' : 'Soil Sensor 1 (Pin 32)'}
                  </span>
                  {getStatusBadge(soil1)}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <input 
                    type="range" min="0" max="100" value={soil1} 
                    onChange={(e) => setSoil1(Number(e.target.value))}
                    className="flex-1 accent-emerald-600 bg-slate-200 h-2.5 rounded-lg cursor-pointer"
                  />
                  <span className="font-mono font-black text-emerald-800 w-12 text-right text-base">
                    {soil1}%
                  </span>
                </div>
              </div>

              {/* Soil Sensor 2 */}
              <div className="bg-slate-50 border border-slate-200/90 p-4 rounded-2xl flex flex-col gap-2 shadow-xs hover:border-teal-300 transition">
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-slate-800 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-black border border-teal-300">
                      2
                    </span>
                    {isHi ? 'मृदा सेंसर 2 (Pin 33)' : 'Soil Sensor 2 (Pin 33)'}
                  </span>
                  {getStatusBadge(soil2)}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <input 
                    type="range" min="0" max="100" value={soil2} 
                    onChange={(e) => setSoil2(Number(e.target.value))}
                    className="flex-1 accent-teal-600 bg-slate-200 h-2.5 rounded-lg cursor-pointer"
                  />
                  <span className="font-mono font-black text-teal-800 w-12 text-right text-base">
                    {soil2}%
                  </span>
                </div>
              </div>

              {/* Soil Sensor 3 */}
              <div className="bg-slate-50 border border-slate-200/90 p-4 rounded-2xl flex flex-col gap-2 shadow-xs hover:border-cyan-300 transition">
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-slate-800 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center text-xs font-black border border-cyan-300">
                      3
                    </span>
                    {isHi ? 'मृदा सेंसर 3 (Pin 34)' : 'Soil Sensor 3 (Pin 34)'}
                  </span>
                  {getStatusBadge(soil3)}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <input 
                    type="range" min="0" max="100" value={soil3} 
                    onChange={(e) => setSoil3(Number(e.target.value))}
                    className="flex-1 accent-cyan-600 bg-slate-200 h-2.5 rounded-lg cursor-pointer"
                  />
                  <span className="font-mono font-black text-cyan-800 w-12 text-right text-base">
                    {soil3}%
                  </span>
                </div>
              </div>

              {/* Soil Sensor 4 */}
              <div className="bg-slate-50 border border-slate-200/90 p-4 rounded-2xl flex flex-col gap-2 shadow-xs hover:border-indigo-300 transition">
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-slate-800 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs font-black border border-indigo-300">
                      4
                    </span>
                    {isHi ? 'मृदा सेंसर 4 (Pin 35)' : 'Soil Sensor 4 (Pin 35)'}
                  </span>
                  {getStatusBadge(soil4)}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <input 
                    type="range" min="0" max="100" value={soil4} 
                    onChange={(e) => setSoil4(Number(e.target.value))}
                    className="flex-1 accent-indigo-600 bg-slate-200 h-2.5 rounded-lg cursor-pointer"
                  />
                  <span className="font-mono font-black text-indigo-800 w-12 text-right text-base">
                    {soil4}%
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 🔬 AI PEARL MILLET DISEASE & IRRIGATION HEALTH DIAGNOSTIC ENGINE (LIVE) */}
      {/* ========================================================================= */}
      {(() => {
        const avgSoil = (soil1 + soil2 + soil3 + soil4) / 4;

        // 1. Pearl Millet Downy Mildew (Sclerospora graminicola) Risk Computation
        // Ideal pathogen development: Temp 20-28°C (peak 24°C), RH > 70%, Wet Soil / Rain
        let downyRisk = 0;
        if (temperature >= 18 && temperature <= 32) {
          const tempFactor = 1 - Math.abs(temperature - 24) / 10;
          const humFactor = humidity / 100;
          const rainFactor = rain ? 0.35 : 0;
          const soilFactor = (avgSoil / 100) * 0.25;
          downyRisk = Math.min(100, Math.max(5, Math.round((tempFactor * 0.35 + humFactor * 0.45 + rainFactor + soilFactor) * 100)));
        } else {
          downyRisk = Math.min(100, Math.max(5, Math.round((humidity / 100) * 35)));
        }

        // 2. Rust & Leaf Blast (Puccinia substriata & Pyricularia grisea)
        let rustRisk = 0;
        if (temperature >= 20 && temperature <= 32) {
          rustRisk = Math.min(100, Math.max(5, Math.round(((temperature / 32) * 0.3 + (humidity / 100) * 0.7) * 100)));
        } else {
          rustRisk = Math.min(100, Math.max(5, Math.round((humidity / 100) * 30)));
        }

        // 3. Root Rot & Waterlogging Damping-Off (Pythium / Fusarium)
        let rootRotRisk = 0;
        if (avgSoil > 75) {
          rootRotRisk = Math.min(100, Math.round(((avgSoil - 75) / 25) * 85 + 15));
        } else {
          rootRotRisk = Math.max(4, Math.round((avgSoil / 75) * 20));
        }

        // 4. Drought Stress & Moisture Deficit
        let droughtStress = 0;
        if (avgSoil < 30) {
          droughtStress = Math.min(100, Math.round(((30 - avgSoil) / 30) * 100));
        }

        // Overall Disease & Stress Status
        const maxRisk = Math.max(downyRisk, rustRisk, rootRotRisk);
        const isHighDiseaseRisk = maxRisk >= 70;
        const isModerateDiseaseRisk = maxRisk >= 40 && maxRisk < 70;

        // Irrigation Prescription:
        let waterStatus = 'OPTIMAL';
        let waterTitle = isHi ? 'संतुलित मृदा नमी (40% - 75%)' : 'Optimal Soil Moisture (40% - 75%)';
        let waterDirective = isHi ? 'पानी सामान्य रखें' : 'Maintain Standard Drip';
        let waterAdvice = isHi 
          ? 'खेत में नमी का स्तर संतुलित है। ड्रिप सिंचाई का नियमित समय चक्र बनाए रखें।' 
          : 'Soil moisture is in the optimal range. Maintain scheduled drip fertigation cycles.';
        let waterColor = 'emerald';

        if (avgSoil < 25) {
          waterStatus = 'CRITICAL_DRY';
          waterTitle = isHi ? '⚠️ जल अभाव - मिट्टी सूखी है (पानी की सख्त ज़रूरत)' : '⚠️ Severe Drought Stress - Water Urgently Needed!';
          waterDirective = isHi ? '💧 पानी तुरंत चालू करें (Turn ON Pump)' : '💧 Turn ON Water Pump';
          waterAdvice = isHi
            ? `खेत की औसत नमी बहुत कम (${avgSoil.toFixed(0)}%) है। पौधों की जड़ों को सूखने से बचाने के लिए तुरंत वाटर पंप चालू करें और पर्याप्त पानी दें।`
            : `Average soil moisture is critically dry (${avgSoil.toFixed(0)}%). Irrigate immediately to prevent root desiccation and stunted tillering.`;
          waterColor = 'amber';
        } else if (avgSoil > 75 || (humidity > 80 && avgSoil > 65)) {
          waterStatus = 'EXCESS_WATER';
          waterTitle = isHi ? '🛑 अतिरिक्त पानी चेतावनी - पानी कम डालें!' : '🛑 Overwatering Alert - Reduce Irrigation Immediately!';
          waterDirective = isHi ? '🚫 पानी कम डालें / बंद रखें (Stop Pump)' : '🚫 Stop Pump / Reduce Water';
          waterAdvice = isHi
            ? `खेत में नमी अत्यधिक (${avgSoil.toFixed(0)}%) है। अधिक पानी और उच्च आर्द्रता से डाउनी मिल्ड्यू फफूंद व जड़ गलन का प्रसार बहुत तेज होता है। सिंचाई तुरंत बंद रखें और जल निकासी सुनिश्चित करें।`
            : `Soil is saturated (${avgSoil.toFixed(0)}%). Excessive moisture combined with humidity creates ideal spore germination for Downy Mildew & Root Rot. Halt irrigation and open drainage channels.`;
          waterColor = 'rose';
        }

        return (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7 animate-in fade-in duration-300">
            
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                    {isHi ? 'लाइव टेलीमेट्री AI रोग व स्वास्थ्य इंजन' : 'Live IoT Telemetry Disease & Health Engine'}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                    🌾 {isHi ? 'बाजरा व फसल रोग मॉडल' : 'Pearl Millet (Bajra) Disease Predictor'}
                  </span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {isHi 
                    ? 'लाइव सेंसर डेटा आधारित बाजरा रोग व जल प्रबंधन विश्लेषण' 
                    : 'Live Sensor-Based Pearl Disease Detection & Irrigation Protocol'}
                </h3>
                
                <p className="text-slate-600 text-sm font-medium mt-1">
                  {isHi 
                    ? `ESP32 से प्राप्त वास्तविक डेटा (तापमान: ${temperature}°C, आर्द्रता: ${humidity}%, दबाव: ${pressure} hPa, औसत नमी: ${avgSoil.toFixed(0)}%, बारिश: ${rain ? 'हाँ' : 'नहीं'}) के आधार पर रोग जोखिम और पानी की सलाह:`
                    : `Evaluated dynamically using live incoming ESP32 telemetry (Temp: ${temperature}°C, Humidity: ${humidity}%, Pressure: ${pressure} hPa, Soil: ${avgSoil.toFixed(0)}%, Rain: ${rain ? 'Yes' : 'No'}):`}
                </p>
              </div>

              {/* Current Risk Badge */}
              <div className={`px-5 py-3.5 rounded-2xl border flex items-center gap-3 shadow-xs ${
                isHighDiseaseRisk 
                  ? 'bg-rose-50 border-rose-300 text-rose-900' 
                  : isModerateDiseaseRisk 
                    ? 'bg-amber-50 border-amber-300 text-amber-900' 
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}>
                {isHighDiseaseRisk ? (
                  <ShieldAlert className="w-7 h-7 text-rose-600 shrink-0 animate-bounce" />
                ) : isModerateDiseaseRisk ? (
                  <AlertTriangle className="w-7 h-7 text-amber-600 shrink-0" />
                ) : (
                  <ShieldCheck className="w-7 h-7 text-emerald-600 shrink-0" />
                )}
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider opacity-80">
                    {isHi ? 'रोग जोखिम स्थिति' : 'Overall Disease Vulnerability'}
                  </div>
                  <div className="text-lg font-black">
                    {isHighDiseaseRisk 
                      ? (isHi ? `🔴 उच्च जोखिम (${maxRisk}%)` : `🔴 High Threat (${maxRisk}%)`) 
                      : isModerateDiseaseRisk 
                        ? (isHi ? `🟡 मध्यम जोखिम (${maxRisk}%)` : `🟡 Moderate (${maxRisk}%)`) 
                        : (isHi ? `🟢 फसल सुरक्षित (${maxRisk}%)` : `🟢 Safe Crop (${maxRisk}%)`)}
                  </div>
                </div>
              </div>
            </div>

            {/* 🌟 Highlight Banner: Live Water Recommendation & Direct Pump Trigger */}
            <div className={`rounded-3xl p-6 sm:p-7 border transition-all ${
              waterColor === 'rose'
                ? 'bg-gradient-to-br from-rose-950 via-rose-900 to-slate-900 text-white border-rose-500 shadow-xl'
                : waterColor === 'amber'
                  ? 'bg-gradient-to-br from-amber-950 via-amber-900 to-slate-900 text-white border-amber-500 shadow-xl'
                  : 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white border-emerald-500 shadow-xl'
            }`}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-black text-amber-300 uppercase tracking-wide">
                    <Droplets className="w-4 h-4 text-cyan-300" />
                    <span>{isHi ? 'AI सिंचाई व जल प्रबंधन निर्देश' : 'AI Irrigation & Moisture Prescription'}</span>
                  </div>
                  
                  <h4 className="text-xl sm:text-2xl font-black text-white">
                    {waterTitle}
                  </h4>
                  
                  <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed">
                    {waterAdvice}
                  </p>
                </div>

                {/* Directive Action Button */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center w-full sm:w-auto">
                    <div className="text-xs text-emerald-200 font-bold uppercase">{isHi ? 'सलाह' : 'Action'}</div>
                    <div className="text-base font-black text-amber-300 whitespace-nowrap mt-0.5">
                      {waterDirective}
                    </div>
                  </div>

                  {/* One-click pump trigger */}
                  <button
                    onClick={() => {
                      const nextState = !relayOn;
                      setRelayOn(nextState);
                      publishRelayCommand(nextState ? 'ON' : 'OFF');
                    }}
                    className={`w-full sm:w-auto px-5 py-3.5 rounded-2xl text-xs font-black transition flex items-center justify-center gap-2 shadow-lg ${
                      relayOn
                        ? 'bg-rose-600 hover:bg-rose-500 text-white border border-rose-400'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950 border border-emerald-300'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    <span>
                      {relayOn 
                        ? (isHi ? 'वाटर पंप बंद करें (Turn OFF)' : 'Stop Water Pump') 
                        : (isHi ? 'वाटर पंप चालू करें (Turn ON)' : 'Start Water Pump')}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Disease & Environmental Telemetry Prediction Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Disease 1: Downy Mildew */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-emerald-400 transition space-y-3 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center text-sm font-black">
                      🌾
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                      downyRisk >= 70 ? 'bg-rose-100 text-rose-800' : downyRisk >= 40 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {downyRisk}% Risk
                    </span>
                  </div>

                  <h5 className="font-black text-slate-900 text-base mt-2">
                    {isHi ? 'डाउनी मिल्ड्यू / हरी बाली' : 'Pearl Millet Downy Mildew'}
                  </h5>
                  <p className="text-xs text-slate-500 font-semibold">Sclerospora graminicola</p>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-700">
                    <p>
                      <strong>{isHi ? 'ट्रिगर स्थितियां:' : 'Trigger Factors:'}</strong> {isHi ? 'तापमान 20-28°C + आर्द्रता >70% + गीली मिट्टी' : 'Temp 20-28°C + RH >70% + Wet Soil'}
                    </p>
                    <p>
                      <strong>{isHi ? 'वर्तमान स्थिति:' : 'Live Status:'}</strong> {downyRisk >= 50 
                        ? (isHi ? '⚠️ फफूंद बीजाणु अंकुरण अनुकूल' : '⚠️ Spore Germination Active') 
                        : (isHi ? '✅ आर्द्रता कम होने से सुरक्षित' : '✅ Low Pathogen Pressure')}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 text-xs">
                  <span className="font-bold text-emerald-800 block mb-0.5">
                    {isHi ? 'रोकथाम व स्प्रे:' : 'Cure & Spray Protocol:'}
                  </span>
                  <span className="text-slate-600 text-[11px] leading-tight block">
                    {isHi 
                      ? 'रिडोमिल एमजेड (Metalaxyl 8% + Mancozeb 64%) @ 2 ग्राम/लीटर पानी में घोलकर स्प्रे करें।' 
                      : 'Spray Ridomil MZ (Metalaxyl + Mancozeb) @ 2g/L or Metalaxyl 35% WS.'}
                  </span>
                </div>
              </div>

              {/* Disease 2: Rust & Leaf Blast */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-emerald-400 transition space-y-3 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center text-sm font-black">
                      🍂
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                      rustRisk >= 70 ? 'bg-rose-100 text-rose-800' : rustRisk >= 40 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {rustRisk}% Risk
                    </span>
                  </div>

                  <h5 className="font-black text-slate-900 text-base mt-2">
                    {isHi ? 'गेरुआ व पत्ती ब्लास्ट' : 'Rust & Leaf Blast'}
                  </h5>
                  <p className="text-xs text-slate-500 font-semibold">Puccinia / Pyricularia</p>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-700">
                    <p>
                      <strong>{isHi ? 'ट्रिगर स्थितियां:' : 'Trigger Factors:'}</strong> {isHi ? 'तापमान 22-30°C + आर्द्रता >75%' : 'Temp 22-30°C + RH >75%'}
                    </p>
                    <p>
                      <strong>{isHi ? 'वर्तमान स्थिति:' : 'Live Status:'}</strong> {rustRisk >= 50 
                        ? (isHi ? '⚠️ पत्तियों पर भूरे धब्बों का खतरा' : '⚠️ Leaf Pustules Potential') 
                        : (isHi ? '✅ मौसम अनुकूल, खतरा कम' : '✅ Minimal Infection Window')}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 text-xs">
                  <span className="font-bold text-emerald-800 block mb-0.5">
                    {isHi ? 'रोकथाम व स्प्रे:' : 'Cure & Spray Protocol:'}
                  </span>
                  <span className="text-slate-600 text-[11px] leading-tight block">
                    {isHi 
                      ? 'मैंकोजेब 75 WP @ 2 ग्राम/लीटर या हेक्साकोनाजोल 5 EC @ 1 मिली/लीटर स्प्रे करें।' 
                      : 'Apply Mancozeb 75 WP @ 2g/L or Hexaconazole 5% EC @ 1ml/L.'}
                  </span>
                </div>
              </div>

              {/* Disease 3: Root Rot & Waterlogging */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-emerald-400 transition space-y-3 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center text-sm font-black">
                      💧
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                      rootRotRisk >= 70 ? 'bg-rose-100 text-rose-800' : rootRotRisk >= 40 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {rootRotRisk}% Risk
                    </span>
                  </div>

                  <h5 className="font-black text-slate-900 text-base mt-2">
                    {isHi ? 'जड़ गलन व जलभराव' : 'Root Rot & Wilt'}
                  </h5>
                  <p className="text-xs text-slate-500 font-semibold">Pythium / Fusarium</p>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-700">
                    <p>
                      <strong>{isHi ? 'ट्रिगर स्थितियां:' : 'Trigger Factors:'}</strong> {isHi ? 'मृदा नमी >80% + जलभराव' : 'Soil Moisture >80% + Saturated Soil'}
                    </p>
                    <p>
                      <strong>{isHi ? 'वर्तमान स्थिति:' : 'Live Status:'}</strong> {avgSoil >= 75 
                        ? (isHi ? '🛑 जड़ें सड़ने का अत्यधिक खतरा! पानी कम करें' : '🛑 Saturated roots! Stop water') 
                        : (isHi ? '✅ जड़ों में हवा का संचार सामान्य' : '✅ Good Soil Aeration')}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 text-xs">
                  <span className="font-bold text-emerald-800 block mb-0.5">
                    {isHi ? 'रोकथाम व उपाय:' : 'Cure & Agronomic Action:'}
                  </span>
                  <span className="text-slate-600 text-[11px] leading-tight block">
                    {isHi 
                      ? 'खेत से अतिरिक्त पानी निकालें। ट्राइकोडर्मा विरिडी 2.5 किग्रा/हेक्टेयर गोबर की खाद में मिलाकर दें।' 
                      : 'Drain excess water. Drench with Trichoderma viride bio-fungicide @ 2.5kg/ha.'}
                  </span>
                </div>
              </div>

              {/* Disease 4: Barometric & Rain Weather Window */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-emerald-400 transition space-y-3 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center text-sm font-black">
                      ⚡
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-slate-200 text-slate-800">
                      {pressure.toFixed(1)} hPa
                    </span>
                  </div>

                  <h5 className="font-black text-slate-900 text-base mt-2">
                    {isHi ? 'दबाव व स्प्रे मौसम रडार' : 'Barometer & Spray Radar'}
                  </h5>
                  <p className="text-xs text-slate-500 font-semibold">BMP280 Live Agrometeorology</p>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-700">
                    <p>
                      <strong>{isHi ? 'दबाव स्थिति:' : 'Pressure Level:'}</strong> {pressure < 980 
                        ? (isHi ? '📉 निम्न दबाव (बारिश/तूफान की संभावना)' : '📉 Low Pressure (Rain Threat)') 
                        : (isHi ? '☀️ स्थिर वायुमंडलीय दबाव' : '☀️ Stable Atmosphere')}
                    </p>
                    <p>
                      <strong>{isHi ? 'बारिश सेंसर:' : 'Rain Sensor:'}</strong> {rain 
                        ? (isHi ? '🌧️ बारिश चालू है' : '🌧️ Rain Detected') 
                        : (isHi ? '☀️ सूखा मौसम' : '☀️ Dry Weather')}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 text-xs">
                  <span className="font-bold text-emerald-800 block mb-0.5">
                    {isHi ? 'स्प्रे उपयुक्तता:' : 'Spray Window Timing:'}
                  </span>
                  <span className="text-slate-600 text-[11px] leading-tight block">
                    {rain || pressure < 975 
                      ? (isHi ? '🚫 अभी कोई स्प्रे न करें (दवा धूल जाएगी)।' : '🚫 Avoid foliar spraying now (runoff risk).') 
                      : (isHi ? '✅ पत्ते सूखे हैं, स्प्रे के लिए सुरक्षित समय।' : '✅ Dry foliage, optimal absorption window.')}
                  </span>
                </div>
              </div>

            </div>

            {/* Comprehensive Prescription Summary Box */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 text-xs text-emerald-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="font-black text-sm text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isHi ? 'अंतिम कृषि AI निष्कर्ष व कार्य योजना:' : 'AI Integrated Crop Health Summary:'}</span>
                </div>
                <p className="text-emerald-800 font-medium">
                  {isHi
                    ? avgSoil < 25 
                      ? `तापमान ${temperature}°C अनुकूल है, लेकिन मिट्टी में नमी (0% - ${avgSoil.toFixed(0)}%) नहीं है। सबसे पहले वाटर पंप चलाकर पानी दें। वर्तमान में फफूंद का खतरा कम है।`
                      : avgSoil > 75 
                        ? `खेत में पानी बहुत अधिक (${avgSoil.toFixed(0)}%) है। डाउनी मिल्ड्यू व जड़ गलन रोकने के लिए तुरंत पानी बंद करें (कम डालें) और फफूंदनाशक का स्प्रे करें।`
                        : `तापमान ${temperature}°C व नमी ${avgSoil.toFixed(0)}% संतुलित है। सामान्य ड्रिप सिंचाई जारी रखें और फसल स्वास्थ्य की नियमित निगरानी करें।`
                    : avgSoil < 25
                      ? `Temperature (${temperature}°C) is normal, but soil is dry (${avgSoil.toFixed(0)}%). Prioritize irrigation immediately. Fungal spore risk is low due to low moisture.`
                      : avgSoil > 75
                        ? `Excessive moisture (${avgSoil.toFixed(0)}%). High threat of Downy Mildew and root damping-off. Reduce/stop water and apply protective fungicide.`
                        : `Crop micro-climate is optimal (Soil: ${avgSoil.toFixed(0)}%, Temp: ${temperature}°C). Continue scheduled drip irrigation.`}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 font-mono font-black text-emerald-900 shadow-xs">
                  ESP32 Packet #{counter}
                </span>
              </div>
            </div>

          </div>
        );
      })()}

    </div>
  );
}

