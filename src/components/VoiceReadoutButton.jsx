import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { voiceAssistant } from '../utils/voiceUtils';

export default function VoiceReadoutButton({
  text,
  lang = 'hi',
  label = null,
  size = 'md', // 'sm' | 'md' | 'lg'
  className = ''
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isHi = lang === 'hi';

  useEffect(() => {
    const unsubscribe = voiceAssistant.subscribe((speaking) => {
      // If voice assistant stopped, reset playing
      if (!speaking) {
        setIsPlaying(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!text) return;

    if (isPlaying) {
      voiceAssistant.stop();
      setIsPlaying(false);
    } else {
      const started = voiceAssistant.speak(text, lang, () => {
        setIsPlaying(false);
      });
      if (started) {
        setIsPlaying(true);
      }
    }
  };

  const defaultLabel = isPlaying 
    ? (isHi ? 'रोकें (Stop)' : 'Stop Audio')
    : (label || (isHi ? 'बोलकर सुनें' : 'Listen Aloud'));

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 shadow-md font-bold'
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={isHi ? 'आवाज में सुनें' : 'Listen with Voice Assistant'}
      className={`inline-flex items-center justify-center rounded-2xl transition-all duration-200 cursor-pointer select-none active:scale-95 ${
        isPlaying
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-4 ring-emerald-300/40 animate-pulse'
          : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
      } ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {isPlaying ? (
        <>
          <VolumeX className={size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
          <span>{defaultLabel}</span>
          <span className="flex items-center gap-0.5 ml-1">
            <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        </>
      ) : (
        <>
          <Volume2 className={size === 'lg' ? 'w-5 h-5 text-emerald-800' : 'w-4 h-4 text-emerald-800'} />
          <span className="font-bold">{defaultLabel}</span>
        </>
      )}
    </button>
  );
}
