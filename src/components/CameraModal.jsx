import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, X, RefreshCw, AlertCircle, Check, ImagePlus } from 'lucide-react';

export default function CameraModal({
  isOpen,
  onClose,
  onCapture,
  title = 'Take Photo',
  instruction = 'Position the subject clearly within the frame',
  isHi = false
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [facingMode, setFacingMode] = useState('environment'); // 'environment' (back) or 'user' (front)
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(true);
  const [cameraError, setCameraError] = useState(null);
  const [capturedPreview, setCapturedPreview] = useState(null);
  const [capturedBlob, setCapturedBlob] = useState(null);

  // Stop active camera stream
  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Check if multiple camera devices exist (e.g. front and rear)
  useEffect(() => {
    if (!isOpen) return;
    if (navigator.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const videoInputs = devices.filter((d) => d.kind === 'videoinput');
        setHasMultipleCameras(videoInputs.length > 1);
      }).catch(() => {});
    }
  }, [isOpen]);

  // Start camera stream
  const startCamera = useCallback(async (desiredFacingMode) => {
    stopStream();
    setCameraLoading(true);
    setCameraError(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError(
        isHi
          ? 'आपका ब्राउज़र सीधे कैमरा खोलने का समर्थन नहीं करता।'
          : 'Your browser does not support direct camera streaming.'
      );
      setCameraLoading(false);
      return;
    }

    // Try desired facing mode first (rear camera preferred)
    try {
      const constraints = {
        video: {
          facingMode: desiredFacingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraLoading(false);
    } catch (err) {
      console.warn('Could not open camera with facingMode:', desiredFacingMode, err);
      // Fallback: try default video without facingMode constraint (e.g. laptop webcam)
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        streamRef.current = fallbackStream;
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
          await videoRef.current.play();
        }
        setCameraLoading(false);
      } catch (fallbackErr) {
        console.error('All camera attempts failed:', fallbackErr);
        let errorMsg = isHi
          ? 'कैमरा खोलने की अनुमति नहीं मिली। कृपया ब्राउज़र सेटिंग्स में कैमरा अनुमति दें।'
          : 'Camera permission denied or camera unavailable. Please check browser permissions.';
        if (fallbackErr.name === 'NotFoundError' || fallbackErr.name === 'DevicesNotFoundError') {
          errorMsg = isHi ? 'कोई कैमरा नहीं मिला।' : 'No camera hardware found on this device.';
        } else if (fallbackErr.name === 'NotAllowedError' || fallbackErr.name === 'PermissionDeniedError') {
          errorMsg = isHi ? 'कैमरा अनुमति अस्वीकार कर दी गई।' : 'Camera permission was denied.';
        }
        setCameraError(errorMsg);
        setCameraLoading(false);
      }
    }
  }, [isHi, stopStream]);

  // Start camera on modal open
  useEffect(() => {
    if (isOpen) {
      setCapturedPreview(null);
      setCapturedBlob(null);
      startCamera(facingMode);
    } else {
      stopStream();
      setCapturedPreview(null);
      setCapturedBlob(null);
    }

    return () => {
      stopStream();
    };
  }, [isOpen, facingMode, startCamera, stopStream]);

  // Flip camera (rear <-> front)
  const toggleCamera = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
  };

  // Capture frame from video feed
  const snapPhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    // If using user-facing camera on a laptop/phone, flip horizontally for natural mirror look
    if (facingMode === 'user') {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, width, height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setCapturedBlob(blob);
        const previewUrl = URL.createObjectURL(blob);
        setCapturedPreview(previewUrl);
        // Stop stream while previewing
        stopStream();
      },
      'image/jpeg',
      0.92
    );
  };

  // Retake photo
  const retakePhoto = () => {
    if (capturedPreview) {
      URL.revokeObjectURL(capturedPreview);
    }
    setCapturedPreview(null);
    setCapturedBlob(null);
    startCamera(facingMode);
  };

  // Confirm photo and send to parent
  const confirmPhoto = () => {
    if (!capturedBlob) return;
    const file = new File([capturedBlob], `krishi_camera_${Date.now()}.jpg`, {
      type: 'image/jpeg',
      lastModified: Date.now()
    });
    onCapture(file);
    handleClose();
  };

  // Close and cleanup
  const handleClose = () => {
    stopStream();
    if (capturedPreview) {
      URL.revokeObjectURL(capturedPreview);
    }
    setCapturedPreview(null);
    setCapturedBlob(null);
    onClose();
  };

  // Fallback file input if camera is not supported or blocked
  const triggerFallbackInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        onCapture(file);
        handleClose();
      }
    };
    input.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-emerald-800/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">{title}</h3>
              <p className="text-xs text-slate-400">{instruction}</p>
            </div>
          </div>
          
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Close Camera"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder / Video Feed Area */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[420px] bg-black flex items-center justify-center overflow-hidden">
          
          {/* Live Video Feed */}
          {!capturedPreview && (
            <video
              ref={videoRef}
              playsInline
              autoPlay
              muted
              className="w-full h-full object-cover"
              style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
            />
          )}

          {/* Captured Preview */}
          {capturedPreview && (
            <img
              src={capturedPreview}
              alt="Captured"
              className="w-full h-full object-cover"
            />
          )}

          {/* Hidden Canvas for Frame Capture */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Loading Indicator */}
          {cameraLoading && !cameraError && !capturedPreview && (
            <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center gap-3 text-white">
              <div className="w-10 h-10 border-3 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-300">
                {isHi ? 'कैमरा शुरू हो रहा है...' : 'Starting camera...'}
              </p>
            </div>
          )}

          {/* Error Message with Fallback */}
          {cameraError && !capturedPreview && (
            <div className="absolute inset-0 bg-slate-950/95 p-6 flex flex-col items-center justify-center text-center gap-3 text-white">
              <div className="w-12 h-12 rounded-2xl bg-red-950/50 border border-red-800/40 text-red-400 flex items-center justify-center mb-1">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-red-200">
                {isHi ? 'कैमरा उपलब्ध नहीं' : 'Camera Unavailable'}
              </h4>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                {cameraError}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mt-3">
                <button
                  onClick={() => startCamera(facingMode)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isHi ? 'पुनः प्रयास' : 'Try Again'}</span>
                </button>
                <button
                  onClick={triggerFallbackInput}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ImagePlus className="w-3.5 h-3.5" />
                  <span>{isHi ? 'फ़ाइल / गैलरी से चुनें' : 'Choose File / Gallery'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Viewfinder Target Framing Guides (Shown only while live streaming) */}
          {!cameraLoading && !cameraError && !capturedPreview && (
            <div className="absolute inset-8 sm:inset-12 border-2 border-white/40 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
              <div className="flex justify-between">
                <span className="w-5 h-5 border-t-4 border-l-4 border-emerald-400 rounded-tl-md"></span>
                <span className="w-5 h-5 border-t-4 border-r-4 border-emerald-400 rounded-tr-md"></span>
              </div>
              <div className="text-center">
                <span className="px-3 py-1 rounded-md bg-slate-950/60 backdrop-blur-xs text-[11px] font-bold text-white/90">
                  {isHi ? 'पत्ती या मिट्टी को केंद्र में रखें' : 'Align subject in center'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="w-5 h-5 border-b-4 border-l-4 border-emerald-400 rounded-bl-md"></span>
                <span className="w-5 h-5 border-b-4 border-r-4 border-emerald-400 rounded-br-md"></span>
              </div>
            </div>
          )}

          {/* Flip Camera Button (only if multiple cameras available & live stream) */}
          {!cameraLoading && !cameraError && !capturedPreview && hasMultipleCameras && (
            <button
              onClick={toggleCamera}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-white/20 text-white backdrop-blur-xs transition cursor-pointer active:scale-95 shadow-lg"
              title={isHi ? 'कैमरा बदलें' : 'Switch Camera'}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Bottom Controls Bar */}
        <div className="p-4 sm:p-5 bg-slate-950/95 border-t border-slate-800">
          {!capturedPreview ? (
            /* Live Stream Controls: Big Shutter Button */
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={triggerFallbackInput}
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <ImagePlus className="w-4 h-4" />
                <span>{isHi ? 'गैलरी' : 'Gallery'}</span>
              </button>

              <button
                onClick={snapPhoto}
                disabled={cameraLoading || !!cameraError}
                className="w-18 h-18 rounded-full bg-white hover:bg-emerald-50 active:scale-90 border-4 border-emerald-500 shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed group"
                aria-label="Capture Photo"
              >
                <div className="w-13 h-13 rounded-full bg-emerald-600 group-hover:bg-emerald-500 flex items-center justify-center transition-colors">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </button>

              <button
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition cursor-pointer"
              >
                <span>{isHi ? 'रद्द करें' : 'Cancel'}</span>
              </button>
            </div>
          ) : (
            /* Captured Preview Controls: Retake or Confirm */
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={retakePhoto}
                className="py-3 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{isHi ? 'दोबारा फोटो लें' : 'Retake'}</span>
              </button>

              <button
                onClick={confirmPhoto}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-950 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isHi ? 'फोटो स्वीकारें' : 'Use Photo'}</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
