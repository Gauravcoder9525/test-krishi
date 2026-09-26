/**
 * 🔊 Kisan Voice Assistant (Text-to-Speech)
 * Enables illiterate and rural farmers to listen to crop disease diagnostics,
 * soil test results, and spraying advisories in clear Hindi or English.
 */

class VoiceAssistant {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.listeners = new Set();

    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices() || [];
  }

  getBestVoice(lang = 'hi') {
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }

    if (lang === 'hi') {
      // Prioritize Hindi voices
      const hiVoice = this.voices.find(v => v.lang && (v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi') || v.lang.includes('IN')));
      if (hiVoice) return hiVoice;
    }

    // English (India) or default English
    const inEnVoice = this.voices.find(v => v.lang === 'en-IN' || v.name.includes('India'));
    if (inEnVoice) return inEnVoice;

    return this.voices.find(v => v.lang.startsWith('en')) || this.voices[0] || null;
  }

  cleanTextForSpeech(text) {
    if (!text) return '';
    return text
      .replace(/[#*`_~[\]()]/g, ' ')
      .replace(/[\n\r]+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  speak(text, lang = 'hi', onEndCallback = null) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return false;
    }

    // Stop any existing speech
    this.stop();

    const cleanText = this.cleanTextForSpeech(text);
    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = lang === 'hi' ? 0.92 : 0.95; // Slightly slower pace for clarity
    utterance.pitch = 1.0;

    const voice = this.getBestVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }

    this.currentUtterance = utterance;
    this.isSpeaking = true;
    this.notifyListeners();

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      this.notifyListeners();
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      this.notifyListeners();
      if (onEndCallback) onEndCallback();
    };

    try {
      this.synth.speak(utterance);
      return true;
    } catch (err) {
      console.warn('Speech synthesis speak error:', err);
      this.isSpeaking = false;
      this.notifyListeners();
      return false;
    }
  }

  stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.notifyListeners();
  }

  toggle(text, lang = 'hi') {
    if (this.isSpeaking) {
      this.stop();
      return false;
    } else {
      return this.speak(text, lang);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(fn => fn(this.isSpeaking));
  }
}

export const voiceAssistant = new VoiceAssistant();
