import React, { useState, useEffect, useRef } from 'react';
import { 
  RefreshCw, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  Cpu, 
  Layers, 
  Activity, 
  Scan,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function MarketWatchTab({ lang, t, setActiveTab }) {
  const isHi = lang === 'hi';
  const [streamlitUrl, setStreamlitUrl] = useState("http://localhost:8501");
  const [iframeKey, setIframeKey] = useState(Date.now());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  // Reload iframe
  const handleReload = () => {
    setIframeKey(Date.now());
  };

  // Toggle true browser fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`w-full flex flex-col bg-[#0e1117] text-white select-none ${
        isFullscreen ? 'h-screen w-screen' : 'h-[calc(100vh-64px)]'
      }`}
    >
      {/* Sleek Slim Dark Top Control Bar */}
      <div className="h-11 bg-[#0b0f19] border-b border-[#1e293b] px-4 flex items-center justify-between gap-3 flex-shrink-0 z-10 shadow-md">
        
        {/* Left: Active Python Engine Status */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold tracking-tight">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>AI-Disease-Detection-master</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span className="text-slate-600">|</span>
            <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 text-[11px] font-mono border border-slate-700/60">
              YOLOv11 & Deep CNN
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800/80 text-emerald-400 text-[11px] font-mono border border-slate-700/60">
              localhost:8501
            </span>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2">
          {/* Reload Button */}
          <button
            onClick={handleReload}
            title={isHi ? "रीलोड करें" : "Reload Application"}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700/80 active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{isHi ? 'रिफ्रेश' : 'Reload'}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700/80 active:scale-95"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{isHi ? 'फुलस्क्रीन बंद' : 'Exit Fullscreen'}</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">{isHi ? 'फुलस्क्रीन' : 'Fullscreen'}</span>
              </>
            )}
          </button>

          {/* Open in New Tab */}
          <a
            href={streamlitUrl}
            target="_blank"
            rel="noreferrer"
            title={isHi ? "नए टैब में खोलें" : "Open in new browser tab"}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isHi ? 'नया टैब' : 'New Tab'}</span>
          </a>
        </div>
      </div>

      {/* 100% Edge-to-Edge Streamlit Embed Frame */}
      <div className="flex-1 w-full h-full relative bg-[#0e1117] overflow-hidden">
        <iframe
          key={iframeKey}
          src={`${streamlitUrl}?embed=true`}
          title="AI Disease Detection Master Streamlit Application"
          className="w-full h-full border-0 block"
          style={{ width: '100%', height: '100%', minHeight: '100%', border: 'none' }}
          allow="camera; microphone; clipboard-read; clipboard-write; fullscreen"
        />
      </div>

    </div>
  );
}
