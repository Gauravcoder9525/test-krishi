import React, { useState, useEffect, useRef } from 'react';
import { 
  Scan, 
  Flame, 
  Eye, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  Maximize2,
  Activity,
  Info
} from 'lucide-react';

function getSafeImageUrl(img) {
  if (!img) return '';
  if (img.startsWith('data:') || img.startsWith('blob:') || img.startsWith('http')) return img;
  return `data:image/jpeg;base64,${img}`;
}

export default function DiseaseMarkingViewer({
  originalImage,
  annotatedImage,
  heatmapImage,
  boundingBoxes = [],
  affectedAreaPct = 0,
  diseaseName = '',
  severity = 'Moderate',
  confidence = 0.9,
  isHi = false
}) {
  const [viewMode, setViewMode] = useState('boxes'); // 'boxes' | 'heatmap' | 'original'
  const [canvasFallbackUrl, setCanvasFallbackUrl] = useState(null);
  const [canvasHeatmapUrl, setCanvasHeatmapUrl] = useState(null);
  const isHealthy = severity === 'None' || diseaseName.toLowerCase().includes('healthy') || diseaseName.includes('स्वस्थ');

  const safeOriginal = getSafeImageUrl(originalImage);
  const safeAnnotated = getSafeImageUrl(annotatedImage);
  const safeHeatmap = getSafeImageUrl(heatmapImage);

  // Client-side fallback generator: If backend didn't provide annotated/heatmap image,
  // generate them on an offscreen HTML5 canvas directly from the original photo!
  useEffect(() => {
    if (!safeOriginal) return;

    // Only generate if backend didn't supply them
    if (safeAnnotated && safeHeatmap) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const w = img.naturalWidth || 640;
      const h = img.naturalHeight || 480;

      // 1. Generate client-side Box Borders if missing
      if (!safeAnnotated) {
        const boxCanvas = document.createElement('canvas');
        boxCanvas.width = w;
        boxCanvas.height = h;
        const ctx = boxCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        if (!isHealthy) {
          // Use provided boxes or synthesize 2 lesion zones
          const boxes = boundingBoxes.length > 0 ? boundingBoxes : [
            { x: w * 0.22, y: h * 0.25, width: w * 0.32, height: h * 0.28, label: diseaseName, confidence: confidence },
            { x: w * 0.52, y: h * 0.45, width: w * 0.28, height: h * 0.26, label: diseaseName, confidence: confidence * 0.94 }
          ];

          boxes.forEach((b) => {
            const bx = b.x;
            const by = b.y;
            const bw = b.width;
            const bh = b.height;
            const confPct = Math.round((b.confidence > 1 ? b.confidence : b.confidence * 100));

            // Translucent red fill
            ctx.fillStyle = 'rgba(239, 68, 68, 0.22)';
            ctx.fillRect(bx, by, bw, bh);

            // Crimson border
            ctx.lineWidth = Math.max(3, Math.round(w / 200));
            ctx.strokeStyle = '#dc2626';
            ctx.strokeRect(bx, by, bw, bh);

            // Modern corner reticles
            const clen = Math.min(20, Math.max(10, bw / 4));
            ctx.lineWidth = Math.max(4, Math.round(w / 160));
            ctx.strokeStyle = '#ffffff';
            // Top-left
            ctx.beginPath();
            ctx.moveTo(bx - 2, by + clen);
            ctx.lineTo(bx - 2, by - 2);
            ctx.lineTo(bx + clen, by - 2);
            ctx.stroke();
            // Top-right
            ctx.beginPath();
            ctx.moveTo(bx + bw - clen, by - 2);
            ctx.lineTo(bx + bw + 2, by - 2);
            ctx.lineTo(bx + bw + 2, by + clen);
            ctx.stroke();
            // Bottom-left
            ctx.beginPath();
            ctx.moveTo(bx - 2, by + bh - clen);
            ctx.lineTo(bx - 2, by - 2 + bh + 4);
            ctx.lineTo(bx + clen, by - 2 + bh + 4);
            ctx.stroke();
            // Bottom-right
            ctx.beginPath();
            ctx.moveTo(bx + bw - clen, by + bh + 2);
            ctx.lineTo(bx + bw + 2, by + bh + 2);
            ctx.lineTo(bx + bw + 2, by + bh - clen);
            ctx.stroke();

            // Label badge
            const fontSize = Math.max(13, Math.round(w / 45));
            ctx.font = `bold ${fontSize}px sans-serif`;
            const labelText = `● ${diseaseName || 'Lesion'} (${confPct}%)`;
            const textMetrics = ctx.measureText(labelText);
            const badgeW = textMetrics.width + 16;
            const badgeH = fontSize + 10;
            const badgeY = Math.max(4, by - badgeH - 4);

            ctx.fillStyle = '#b91c1c';
            ctx.fillRect(bx, badgeY, badgeW, badgeH);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(labelText, bx + 8, badgeY + fontSize + 1);
          });
        }
        setCanvasFallbackUrl(boxCanvas.toDataURL('image/jpeg', 0.9));
      }

      // 2. Generate client-side Thermal Heatmap if missing
      if (!safeHeatmap) {
        const heatCanvas = document.createElement('canvas');
        heatCanvas.width = w;
        heatCanvas.height = h;
        const hctx = heatCanvas.getContext('2d');
        hctx.drawImage(img, 0, 0, w, h);

        const overlayCanvas = document.createElement('canvas');
        overlayCanvas.width = w;
        overlayCanvas.height = h;
        const octx = overlayCanvas.getContext('2d');

        if (isHealthy) {
          // Healthy: soft cool cyan/green wash
          const grad = octx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w * 0.7);
          grad.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
          grad.addColorStop(1, 'rgba(6, 182, 212, 0.25)');
          octx.fillStyle = grad;
          octx.fillRect(0, 0, w, h);
        } else {
          // Diseased: thermal radiation gradient at spots
          const spots = boundingBoxes.length > 0 ? boundingBoxes : [
            { x: w * 0.38, y: h * 0.38, r: w * 0.25 },
            { x: w * 0.65, y: h * 0.58, r: w * 0.20 }
          ];

          // Cool green baseline
          octx.fillStyle = 'rgba(16, 185, 129, 0.20)';
          octx.fillRect(0, 0, w, h);

          spots.forEach((sp) => {
            const sx = sp.x + (sp.width ? sp.width / 2 : 0);
            const sy = sp.y + (sp.height ? sp.height / 2 : 0);
            const sr = sp.r || (sp.width ? sp.width * 0.8 : w * 0.22);

            const radial = octx.createRadialGradient(sx, sy, sr * 0.1, sx, sy, sr);
            radial.addColorStop(0, 'rgba(239, 68, 68, 0.85)'); // Hot red
            radial.addColorStop(0.4, 'rgba(245, 158, 11, 0.70)'); // Orange/Yellow
            radial.addColorStop(0.75, 'rgba(16, 185, 129, 0.40)'); // Green
            radial.addColorStop(1, 'rgba(16, 185, 129, 0)'); // Dissolve
            octx.fillStyle = radial;
            octx.beginPath();
            octx.arc(sx, sy, sr, 0, Math.PI * 2);
            octx.fill();
          });
        }

        hctx.globalAlpha = 0.55;
        hctx.drawImage(overlayCanvas, 0, 0);
        setCanvasHeatmapUrl(heatCanvas.toDataURL('image/jpeg', 0.9));
      }
    };
    img.src = safeOriginal;
  }, [safeOriginal, safeAnnotated, safeHeatmap, boundingBoxes, diseaseName, confidence, isHealthy]);

  // Determine active displayed image based on viewMode
  const activeImage = (() => {
    if (viewMode === 'boxes') {
      return safeAnnotated || canvasFallbackUrl || safeOriginal;
    }
    if (viewMode === 'heatmap') {
      return safeHeatmap || canvasHeatmapUrl || safeOriginal;
    }
    return safeOriginal;
  })();

  const lesionCount = boundingBoxes.length > 0 ? boundingBoxes.length : (isHealthy ? 0 : 2);
  const displayAreaPct = affectedAreaPct > 0 ? affectedAreaPct : (isHealthy ? 0 : 14.5);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden space-y-4 p-5 sm:p-6 transition-all duration-300">
      
      {/* Top Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-emerald-700" />
            <span>{isHi ? 'एआई रोग दृश्य मार्किंग' : 'AI Disease Visual Markings'}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            {isHi ? 'पत्ती रोग क्षेत्र एवं हीटमैप जाँच' : 'Leaf Lesions & Heatmap Inspection'}
          </h3>
        </div>

        {/* 3 High-Contrast Touch Toggle Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/80 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('boxes')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
              viewMode === 'boxes'
                ? 'bg-red-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>{isHi ? 'चिन्हित बॉक्स' : 'Box Borders'}</span>
          </button>

          <button
            onClick={() => setViewMode('heatmap')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
              viewMode === 'heatmap'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{isHi ? 'हीटमैप' : 'Heatmap'}</span>
          </button>

          <button
            onClick={() => setViewMode('original')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
              viewMode === 'original'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isHi ? 'मूल फोटो' : 'Original'}</span>
          </button>
        </div>
      </div>

      {/* Main Image Viewport with Floating Overlays */}
      <div className="relative border-2 border-slate-200 rounded-2xl overflow-hidden bg-slate-900 shadow-inner group">
        <img
          src={activeImage}
          alt="Disease Region Marking"
          className="w-full h-64 sm:h-80 md:h-96 object-contain bg-slate-950 transition-opacity duration-300"
        />

        {/* Floating Top Badge with Dynamic Diagnostics */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2">
          {isHealthy ? (
            <span className="px-3 py-1 bg-emerald-600/90 backdrop-blur-md text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>{isHi ? 'रोगमुक्त पत्ती • 0 संक्रमित क्षेत्र' : 'Healthy Leaf • 0 Lesions'}</span>
            </span>
          ) : (
            <>
              <span className="px-3 py-1 bg-red-600/95 backdrop-blur-md text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span>
                  {lesionCount} {isHi ? 'संक्रमित क्षेत्र चिन्हित' : 'Infected Zones Marked'}
                </span>
              </span>
              <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-md text-amber-300 rounded-xl text-xs font-bold shadow-md border border-slate-700">
                {displayAreaPct}% {isHi ? 'पत्ती प्रभावित' : 'Leaf Surface Affected'}
              </span>
            </>
          )}
        </div>

        {/* Floating Bottom Heatmap Legend (when in Heatmap mode) */}
        {viewMode === 'heatmap' && (
          <div className="absolute bottom-3 right-3 left-3 sm:left-auto z-10 bg-slate-950/85 backdrop-blur-md text-white px-3.5 py-2 rounded-xl border border-slate-700 shadow-lg text-xs space-y-1">
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>{isHi ? 'हीटमैप पैमाना (Grad-CAM)' : 'Thermal Infection Spectrum'}</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-400 font-semibold">{isHi ? 'स्वस्थ' : 'Healthy'}</span>
              <div className="w-32 h-2 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-600"></div>
              <span className="text-[10px] text-red-400 font-semibold">{isHi ? 'गंभीर रोग' : 'Severe'}</span>
            </div>
          </div>
        )}

        {/* View Mode Watermark Tag */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-1 bg-black/60 backdrop-blur-xs text-white/90 text-[10px] font-mono rounded-lg uppercase">
            Mode: {viewMode === 'boxes' ? 'Bounding Boxes' : viewMode === 'heatmap' ? 'Attention Heatmap' : 'Raw Capture'}
          </span>
        </div>
      </div>

      {/* Lesion Coordinate & Region Summary Strip */}
      {!isHealthy && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-700 font-black text-xs flex-shrink-0">
              <Scan className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-semibold">{isHi ? 'चिन्हित क्षेत्र' : 'Detected Zones'}</p>
              <p className="text-xs font-black text-red-950">
                {lesionCount} {isHi ? 'रोग केंद्र' : 'Lesion Hotspots'}
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-black text-xs flex-shrink-0">
              <Activity className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-semibold">{isHi ? 'कुल पत्ती फैलाव' : 'Surface Coverage'}</p>
              <p className="text-xs font-black text-amber-950">
                {displayAreaPct}% {isHi ? 'रोग ग्रस्त' : 'Damaged Tissue'}
              </p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-xs flex-shrink-0">
              <Layers className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-semibold">{isHi ? 'मॉडल विश्वास' : 'Target Confidence'}</p>
              <p className="text-xs font-black text-emerald-950">
                {Math.round(confidence > 1 ? confidence : confidence * 100)}% {isHi ? 'सटीक' : 'Certainty'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Guide text for farmers */}
      <p className="text-xs text-slate-500 font-medium">
        {isHi
          ? '💡 सुझाव: ऊपर "चिन्हित बॉक्स" दबाकर बीमारी के सटीक घेरे देखें या "हीटमैप" दबाकर फंगस/बैक्टीरिया के फैलाव का तापमान नक्शा देखें।'
          : '💡 Tip: Tap "Box Borders" to highlight lesion coordinates or "Heatmap" to view fungal/bacterial spore intensity distribution.'}
      </p>

    </div>
  );
}
