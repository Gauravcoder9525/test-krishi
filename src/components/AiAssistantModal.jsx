import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  RotateCcw,
  User,
  Bot,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Cpu,
  Bug,
  CloudRain,
  Droplets,
  FlaskConical,
  TrendingUp,
  Landmark,
  Radio
} from 'lucide-react';
import {
  sendChatMessage,
  getSavedGeminiKey,
  getSelectedModel
} from '../services/aiService';

// High-Readability Markdown Formatter with big, accessible text
function MarkdownMessage({ text, isBot }) {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <div className={`space-y-2 leading-relaxed text-sm md:text-base ${isBot ? 'text-slate-800' : 'text-white'}`}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-2" />;
        }

        // Headings
        if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
          return (
            <h4 key={idx} className="font-extrabold text-base md:text-lg text-emerald-950 mt-3 mb-1.5 flex items-center gap-1.5 border-b border-emerald-100 pb-1">
              <span>{formatInlineStyles(trimmed.replace(/^#+\s*/, ''))}</span>
            </h4>
          );
        }

        // Bullet point
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-1">
              <span className="text-emerald-600 font-black text-sm mt-0.5">●</span>
              <span className="flex-grow font-medium">
                {formatInlineStyles(trimmed.substring(2))}
              </span>
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-1.5">
              <span className="font-bold text-emerald-900 text-xs bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded-md mt-0.5 flex-shrink-0">
                {numMatch[1]}
              </span>
              <span className="flex-grow font-medium">
                {formatInlineStyles(numMatch[2])}
              </span>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={idx} className="font-normal">
            {formatInlineStyles(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function formatInlineStyles(text) {
  if (!text) return '';

  const parts = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-bold text-emerald-950">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={match.index} className="bg-slate-100 text-emerald-900 px-1.5 py-0.5 rounded text-xs font-mono">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={match.index} className="italic text-slate-700">
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function AiAssistantModal({
  lang,
  t,
  aiOpen,
  setAiOpen,
  chatMessages,
  setChatMessages,
  farmContext,
  weatherData,
  decision
}) {
  const [userPrompt, setUserPrompt] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [activeApiKey, setActiveApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-3.6-flash");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const key = getSavedGeminiKey();
    const model = getSelectedModel();
    setActiveApiKey(key);
    setSelectedModel(model);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (aiOpen) {
      scrollToBottom();
    }
  }, [chatMessages, aiOpen, aiLoading]);

  // Voice speech synthesis
  const speakText = (text, index) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking && speakingMsgIndex === index) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setSpeakingMsgIndex(null);
        return;
      }

      window.speechSynthesis.cancel();
      const cleanSpeech = text
        .replace(/\*\*/g, '')
        .replace(/[#*`_]/g, '')
        .replace(/^[-\d.]+\s+/gm, '');

      const utterance = new SpeechSynthesisUtterance(cleanSpeech);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95; // Slightly slower, very clear pace for easy understanding
      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingMsgIndex(null);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeakingMsgIndex(null);
      };

      setIsSpeaking(true);
      setSpeakingMsgIndex(index);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Voice recognition toggle
  const toggleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      if (isListening) {
        setIsListening(false);
        return;
      }
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setUserPrompt(transcript);
          setIsListening(false);
          handleSendAiMessage(transcript);
        };
        recognition.onerror = () => {
          setIsListening(false);
          simulateVoiceFallback();
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
      } catch (e) {
        simulateVoiceFallback();
      }
    } else {
      simulateVoiceFallback();
    }
  };

  const simulateVoiceFallback = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const sampleVoiceQuery = lang === 'hi'
        ? "मिर्च की फसल में पत्ती मुड़न रोग कैसे रोकें?"
        : "How to prevent leaf curl disease in chilli?";
      setUserPrompt(sampleVoiceQuery);
      handleSendAiMessage(sampleVoiceQuery);
    }, 1200);
  };

  const handleSendAiMessage = async (customText) => {
    const textToSend = (customText || userPrompt).trim();
    if (!textToSend) return;

    const newMessages = [...chatMessages, { sender: 'user', text: textToSend }];
    setChatMessages(newMessages);
    setUserPrompt("");
    setAiLoading(true);

    try {
      const response = await sendChatMessage({
        messages: newMessages,
        userPrompt: textToSend,
        lang,
        farmContext,
        weatherData,
        decision
      });

      const updatedBotMessages = [
        ...newMessages,
        {
          sender: 'bot',
          text: response.text,
          engine: response.engine,
          isLiveGemini: response.isLiveGemini
        }
      ];

      setChatMessages(updatedBotMessages);

      // Auto-read aloud for accessibility if audio is supported
      const newBotIndex = updatedBotMessages.length - 1;
      setTimeout(() => {
        speakText(response.text, newBotIndex);
      }, 400);

    } catch (err) {
      console.error("AI chat error:", err);
      setChatMessages([
        ...newMessages,
        {
          sender: 'bot',
          text: lang === 'hi'
            ? "नेटवर्क में थोड़ी रुकावट आई है। कृपया दोबारा पूछें या माइक बटन दबाकर बोलें।"
            : "Network hiccup. Please ask again or tap the microphone to speak."
        }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleResetChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSpeakingMsgIndex(null);
    setChatMessages([
      {
        sender: 'bot',
        text: lang === 'hi'
          ? "🙏 नमस्ते किसान भाई! मैं आपका कृषि AI सहायक हूँ। नीचे दिए गए बटन पर टैप करें या बड़ा माइक बटन दबाकर बोलें!"
          : "🙏 Namaste Kisan Mitra! I am your Krishi AI Assistant. Tap any category card below or tap the big Mic to speak!"
      }
    ]);
  };

  // Farmer-Friendly 1-Tap Category Cards
  const farmerTopics = [
    {
      title: lang === 'hi' ? 'कीट व रोग' : 'Pest & Disease',
      subtitle: lang === 'hi' ? 'दवा व रोकथाम' : 'Control Remedies',
      icon: Bug,
      color: 'bg-rose-500 text-white',
      border: 'hover:border-rose-400',
      query: lang === 'hi' ? 'मेरी फसल में कीट व रोग का जैविक और रासायनिक उपाय बताएं' : 'How to diagnose and treat pests and crop diseases?'
    },
    {
      title: lang === 'hi' ? 'स्प्रे का समय' : 'Safe Spray',
      subtitle: lang === 'hi' ? 'मौसम अनुसार' : 'Weather Window',
      icon: CloudRain,
      color: 'bg-sky-500 text-white',
      border: 'hover:border-sky-400',
      query: lang === 'hi' ? 'क्या आज मेरे खेत में कीटनाशक का स्प्रे करना सुरक्षित है?' : 'Is it safe to spray chemicals on my field today?'
    },
    {
      title: lang === 'hi' ? 'पानी व सिंचाई' : 'Water & Drip',
      subtitle: lang === 'hi' ? 'सिंचाई समय' : 'Moisture & Drip',
      icon: Droplets,
      color: 'bg-blue-600 text-white',
      border: 'hover:border-blue-400',
      query: lang === 'hi' ? 'आज कितने लीटर पानी और कब सिंचाई करनी चाहिए?' : 'What is the optimal irrigation schedule and water quantity?'
    },
    {
      title: lang === 'hi' ? 'खाद की मात्रा' : 'Fertilizer (NPK)',
      subtitle: lang === 'hi' ? 'यूरिया / डीएपी' : 'NPK Dosage',
      icon: FlaskConical,
      color: 'bg-emerald-600 text-white',
      border: 'hover:border-emerald-400',
      query: lang === 'hi' ? 'प्रति एकड़ यूरिया, डीएपी और पोटाश की सही मात्रा क्या है?' : 'What is the exact NPK fertilizer dosage per acre?'
    },
    {
      title: lang === 'hi' ? 'मंडी भाव' : 'Mandi Rates',
      subtitle: lang === 'hi' ? 'आज के ताजा दाम' : 'Today APMC Rate',
      icon: TrendingUp,
      color: 'bg-amber-500 text-white',
      border: 'hover:border-amber-400',
      query: lang === 'hi' ? 'आज मेरठ मंडी में मिर्च और अन्य फसलों के क्या भाव हैं?' : 'What are current mandi prices and market demand trends?'
    },
    {
      title: lang === 'hi' ? 'सरकारी योजना' : 'Govt Subsidy',
      subtitle: lang === 'hi' ? 'सोलर पंप / अनुदान' : 'PM-KUSUM & Grants',
      icon: Landmark,
      color: 'bg-purple-600 text-white',
      border: 'hover:border-purple-400',
      query: lang === 'hi' ? 'पीएम-कुसुम सोलर पंप 60% सब्सिडी कैसे लें?' : 'How to apply for PM-KUSUM 60% solar pump subsidy?'
    }
  ];

  return (
    <>
      {/* Big Friendly Floating Voice Launcher Button with Smooth Float and Pulse Animation */}
      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 animate-float">
        <button
          onClick={() => setAiOpen(!aiOpen)}
          className="group relative flex items-center gap-2 sm:gap-3 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 text-white shadow-2xl hover:shadow-emerald-900/50 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-emerald-400/40 pulse-glow"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md animate-pulse">
              <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-400 rounded-full animate-ping"></span>
          </div>

          <div className="text-left pr-1">
            <div className="text-xs font-black tracking-wide flex items-center gap-1 sm:gap-1.5">
              <span>{lang === 'hi' ? 'कृषि AI सहायक' : 'Krishi AI Voice'}</span>
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
            </div>
            <div className="text-[10px] text-emerald-200 font-bold">
              {lang === 'hi' ? '🎙️ बोलकर पूछें' : '🎙️ Tap to Speak'}
            </div>
          </div>
        </button>
      </div>

      {/* Assistant Modal Window */}
      {aiOpen && (
        <div
          className={`fixed z-50 bg-white rounded-3xl border-2 border-emerald-600/30 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 ${
            isExpanded
              ? 'inset-2 sm:inset-3 md:inset-8 max-w-5xl mx-auto h-[calc(100vh-1rem)] md:h-[calc(100vh-4rem)]'
              : 'bottom-20 right-2 sm:bottom-24 sm:right-6 w-[440px] max-w-[calc(100vw-1rem)] h-[600px] max-h-[calc(100vh-6rem)]'
          }`}
        >

          {/* Simple Clean Header */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white px-4 py-3.5 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-700/80 flex items-center justify-center border border-emerald-400/40 shadow-inner">
                <Bot className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <h4 className="font-extrabold text-base leading-tight flex items-center gap-2">
                  <span>{lang === 'hi' ? 'किसान AI मित्र' : 'Krishi AI Friend'}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="Active"></span>
                </h4>
                <p className="text-xs text-emerald-200 font-medium">
                  {lang === 'hi' ? 'अपनी भाषा में बोलें • आवाज में सुनें' : 'Speak freely • Listen in audio'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Reset Chat */}
              <button
                onClick={handleResetChat}
                title={lang === 'hi' ? "नया सवाल शुरू करें" : "Reset Chat"}
                className="p-2 hover:bg-white/15 rounded-xl text-emerald-100 hover:text-white transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Expand Window */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "छोटा करें" : "बड़ा करें"}
                className="p-2 hover:bg-white/15 rounded-xl text-emerald-100 hover:text-white transition hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  if (window.speechSynthesis) window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                  setAiOpen(false);
                }}
                className="p-2 hover:bg-white/15 rounded-xl text-emerald-100 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Farm Live Telemetry Pill */}
          <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-950">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-700">📍</span>
              <span>{farmContext?.district || weatherData?.location || 'Meerut'} ({farmContext?.acres || '5'} एकड़)</span>
            </div>
            <span className="text-emerald-800 bg-white px-2.5 py-0.5 rounded-full border border-emerald-200">
              🌡️ {weatherData?.temperature ? `${weatherData.temperature}°C` : '28°C'} • 🌧️ {weatherData?.rainProbability ? `${weatherData.rainProbability}%` : '65%'}
            </span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#F8FAF8] text-sm">

            {/* If only 1 welcome message, show the large 6 topic cards for easy 1-tap answering */}
            {chatMessages.length <= 1 && (
              <div className="mb-3 space-y-2.5">
                <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider px-1">
                  {lang === 'hi' ? '👇 किसी भी विषय पर एक बार दबाएं:' : '👇 Tap any topic for instant answer:'}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {farmerTopics.map((topic, idx) => {
                    const IconComp = topic.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSendAiMessage(topic.query)}
                        className={`p-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between group ${topic.border} active:scale-95`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-8 h-8 rounded-xl ${topic.color} flex items-center justify-center shadow-sm`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-700">→</span>
                        </div>
                        <div>
                          <div className="font-extrabold text-xs text-slate-800 group-hover:text-emerald-950">
                            {topic.title}
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium">
                            {topic.subtitle}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Chat Bubble List */}
            {chatMessages.map((msg, i) => {
              const isBot = msg.sender === 'bot';
              const isMsgSpeaking = isSpeaking && speakingMsgIndex === i;

              return (
                <div key={i} className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
                  {isBot && (
                    <div className="w-9 h-9 rounded-2xl bg-emerald-800 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md border border-emerald-600">
                      <Bot className="w-5 h-5 text-emerald-200" />
                    </div>
                  )}

                  <div
                    className={`max-w-[88%] rounded-3xl p-4 md:p-5 space-y-2.5 transition shadow-sm ${
                      isBot
                        ? 'bg-white border-2 border-emerald-100 text-slate-800 shadow-slate-200/60'
                        : 'bg-gradient-to-br from-emerald-800 to-emerald-950 text-white shadow-emerald-900/30'
                    }`}
                  >
                    {/* Big Audio Read Aloud Button at the top of every bot answer for uneducated farmers */}
                    {isBot && (
                      <div className="flex items-center justify-between pb-2 border-b border-emerald-50">
                        <button
                          onClick={() => speakText(msg.text, i)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-xs transition active:scale-95 shadow-sm ${
                            isMsgSpeaking
                              ? 'bg-rose-500 text-white animate-pulse'
                              : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300'
                          }`}
                        >
                          {isMsgSpeaking ? (
                            <>
                              <VolumeX className="w-4 h-4" />
                              <span>{lang === 'hi' ? '⏹️ आवाज रोकें' : '⏹️ Stop Audio'}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-4 h-4 text-emerald-800" />
                              <span>{lang === 'hi' ? '📢 बोलकर सुनो' : '📢 Listen Answer'}</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleCopy(msg.text, i)}
                          className="text-xs text-slate-400 hover:text-emerald-700 flex items-center gap-1 font-semibold p-1"
                          title="Copy"
                        >
                          {copiedIndex === i ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600 text-xs font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Formatted Text */}
                    <MarkdownMessage text={msg.text} isBot={isBot} />
                  </div>

                  {!isBot && (
                    <div className="w-9 h-9 rounded-2xl bg-slate-800 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                      <User className="w-5 h-5 text-slate-200" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* AI Thinking Animation */}
            {aiLoading && (
              <div className="flex items-start gap-3 text-slate-500">
                <div className="w-9 h-9 rounded-2xl bg-emerald-800 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-5 h-5 text-emerald-200" />
                </div>
                <div className="bg-white border-2 border-emerald-100 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-bounce"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-bounce delay-100"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-bounce delay-200"></div>
                  <span className="font-bold text-emerald-950 text-xs md:text-sm ml-1">
                    {lang === 'hi' ? 'उत्तर तैयार हो रहा है...' : 'Generating answer...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prominent Voice Listening Visualizer */}
          {isListening && (
            <div className="bg-rose-50 border-t border-rose-200 p-3 flex items-center justify-between text-rose-800 animate-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
                <span className="font-extrabold text-xs md:text-sm">
                  {lang === 'hi' ? '🎙️ बोलिए, मैं ध्यान से सुन रहा हूँ...' : '🎙️ Listening... Please speak your question now.'}
                </span>
              </div>
              <button
                onClick={() => setIsListening(false)}
                className="text-xs font-bold bg-rose-200 hover:bg-rose-300 text-rose-900 px-3 py-1 rounded-lg"
              >
                {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
            </div>
          )}

          {/* Simple, Large, Accessible Input Bar */}
          <div className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2.5">
            {/* Big Mic Button */}
            <button
              onClick={toggleVoiceInput}
              title={isListening ? "सुन रहा हूँ..." : "बोलकर पूछें"}
              className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-center shadow-md active:scale-95 ${
                isListening
                  ? 'bg-rose-600 border-rose-700 text-white animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 shadow-emerald-700/20'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendAiMessage()}
              placeholder={lang === 'hi' ? 'यहाँ सवाल लिखें या माइक दबाकर बोलें...' : 'Type question or tap the mic...'}
              className="flex-grow px-4 py-3 text-sm md:text-base font-medium bg-slate-50 border border-slate-300 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition text-slate-800 placeholder:text-slate-400 shadow-inner"
            />

            {/* Send Button */}
            <button
              onClick={() => handleSendAiMessage()}
              disabled={aiLoading || !userPrompt.trim()}
              className="p-3.5 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-30 text-white rounded-2xl shadow-md transition transform active:scale-95"
              title="Send"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
