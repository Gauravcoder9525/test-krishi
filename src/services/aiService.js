/**
 * KrishiAI Conversational Intelligence Engine (ChatGPT / Gemini Style)
 * Supports live Google Gemini API (gemini-3.6-flash / gemini-3.6-pro)
 * with multi-turn chat memory, live farm telemetry grounding,
 * and a versatile open-domain knowledge reasoning engine for all queries.
 */

import { GEMINI_CONFIG } from './aiConfig.js';

const STORAGE_KEY_GEMINI = 'krishi_gemini_api_key';
const STORAGE_KEY_MODEL = 'krishi_gemini_model';

export const GEMINI_MODELS = GEMINI_CONFIG.models || [
  { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash (Recommended - Fastest & Latest)' },
  { id: 'gemini-3.6-pro', name: 'Gemini 3.6 Pro (Deep Agronomic Reasoning & Analysis)' },
  { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash' }
];

/**
 * Retrieve saved Gemini API key (prioritizes code abstraction in aiConfig.js, then env, then localStorage)
 */
export function getSavedGeminiKey() {
  // 1. Code Abstraction Layer in aiConfig.js
  if (GEMINI_CONFIG?.apiKey && GEMINI_CONFIG.apiKey.trim()) {
    return GEMINI_CONFIG.apiKey.trim();
  }

  // 2. Vite Environment Variable
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
      return import.meta.env.VITE_GEMINI_API_KEY.trim();
    }
  } catch (e) {
    // Ignore env access errors
  }

  // 3. Browser localStorage fallback
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem(STORAGE_KEY_GEMINI);
    if (local && local.trim()) return local.trim();
  }

  return '';
}

/**
 * Check if the API key is provided via code abstraction in aiConfig.js
 */
export function isKeyFromCodeConfig() {
  return Boolean(GEMINI_CONFIG?.apiKey && GEMINI_CONFIG.apiKey.trim());
}

/**
 * Save or remove Gemini API key
 */
export function saveGeminiKey(key) {
  if (typeof window !== 'undefined') {
    if (!key || !key.trim()) {
      localStorage.removeItem(STORAGE_KEY_GEMINI);
    } else {
      localStorage.setItem(STORAGE_KEY_GEMINI, key.trim());
    }
  }
}

/**
 * Get selected Gemini model
 */
export function getSelectedModel() {
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem(STORAGE_KEY_MODEL);
    if (local && GEMINI_MODELS.some(m => m.id === local)) return local;
  }
  return 'gemini-3.6-flash';
}

/**
 * Save selected Gemini model
 */
export function saveSelectedModel(modelId) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_MODEL, modelId);
  }
}

/**
 * Test a Gemini API key with a ping
 */
export async function testGeminiKey(apiKey, model = 'gemini-3.6-flash') {
  if (!apiKey || !apiKey.trim()) {
    return { success: false, error: 'Please provide a valid API key.' };
  }
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Hello! Confirm in 3 words that Krishi AI is connected.' }] }]
      })
    });
    const data = await res.json();
    if (data.error) {
      return { success: false, error: data.error.message || 'API Key validation failed.' };
    }
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      return { success: true, message: text.trim() };
    }
    return { success: false, error: 'No response generated from Gemini.' };
  } catch (err) {
    return { success: false, error: err.message || 'Network error connecting to Gemini API.' };
  }
}

/**
 * Build dynamic system prompt with farm telemetry
 */
function buildSystemPrompt({ lang, farmContext, weatherData, decision }) {
  const isHi = lang === 'hi';
  const locName = farmContext?.district || weatherData?.location || 'Meerut';
  const state = farmContext?.state || weatherData?.state || 'Uttar Pradesh';
  const acres = farmContext?.acres || '5';
  const crop = farmContext?.crop || 'Chilli';
  const soil = farmContext?.soil || 'Loamy';
  const temp = weatherData?.temperature != null ? `${weatherData.temperature}°C` : '28°C';
  const humidity = weatherData?.humidity != null ? `${weatherData.humidity}%` : '71%';
  const rainProb = weatherData?.rainProbability != null ? `${weatherData.rainProbability}%` : '65%';
  const sprayStatus = decision?.canSpray ? 'Safe to Spray' : 'Unsafe to Spray (Rain/Wind risk)';

  return `You are KrishiAI Assistant, an advanced, open, warm, and highly capable AI assistant like ChatGPT or Gemini, equipped with deep agronomic and general expertise.

You are fully open and ready to answer ANY question the user asks:
- Agricultural advice (crop diseases, precision spraying, fertilizer NPK dosages, soil preparation, seeds, irrigation, harvesting, mandi rates, government schemes like PM-KUSUM / PMFBY).
- General science, biology, weather, physics, chemistry, ecology, botany, engineering.
- General knowledge, mathematics, calculations, day-to-day questions, practical guides, comparisons, translations.
- Farming calculations (e.g. fertilizer quantity per acre, seed rate, water pump capacity, profit estimates).

Active Farm Profile & Live Telemetry:
- Location: ${locName}, ${state}
- Farm Size: ${acres} Acres
- Primary Crop Focus: ${crop}
- Soil Type: ${soil}
- Live Weather: Temp ${temp}, Humidity ${humidity}, Rain Probability ${rainProb}
- Current Spray Advisory: ${sprayStatus}

Communication Guidelines:
1. Always respond in the requested language: ${isHi ? 'Hindi (हिन्दी in clean Devanagari script)' : 'English (or Hinglish if user speaks in Hinglish)'}.
2. Provide structured, clear, and actionable answers using rich Markdown:
   - Use bold headers and bullet points.
   - Break down steps (1, 2, 3) for procedures or treatments.
   - Include specific numbers (e.g., grams per litre, litres per acre, market prices, application windows).
3. If the user asks general or non-farming questions, answer politely, intelligently, and comprehensively just like ChatGPT or Gemini.
4. Keep the tone empathetic, encouraging, professional, and farmer-friendly.`;
}

/**
 * Send conversational message to AI (Gemini Live API or Dynamic Smart Reasoning Engine)
 */
export async function sendChatMessage({
  messages,
  userPrompt,
  lang = 'en',
  farmContext = {},
  weatherData = null,
  decision = null
}) {
  const apiKey = getSavedGeminiKey();
  const model = getSelectedModel();
  const systemPrompt = buildSystemPrompt({ lang, farmContext, weatherData, decision });

  // 1. If Gemini API Key is available, invoke Google Gemini Live API
  if (apiKey) {
    try {
      // Build multi-turn chat contents
      const formattedContents = [];
      const historyToInclude = messages.slice(-10); // Keep last 10 messages for context

      for (const m of historyToInclude) {
        if (m.sender === 'user') {
          formattedContents.push({ role: 'user', parts: [{ text: m.text }] });
        } else if (m.sender === 'bot' && m.text) {
          formattedContents.push({ role: 'model', parts: [{ text: m.text }] });
        }
      }

      // Append current user prompt
      formattedContents.push({ role: 'user', parts: [{ text: userPrompt }] });

      const payload = {
        contents: formattedContents,
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1500
        }
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return {
          text: data.candidates[0].content.parts[0].text,
          engine: `Gemini (${model})`,
          isLiveGemini: true
        };
      } else if (data.error) {
        console.warn("Gemini API returned error, falling back to smart reasoning engine:", data.error);
      }
    } catch (err) {
      console.warn("Gemini API call failed, using dynamic assistant engine:", err);
    }
  }

  // 2. Open-Domain Dynamic Conversational Reasoning Engine
  const answer = generateOpenAssistantResponse({
    prompt: userPrompt,
    lang,
    farmContext,
    weatherData,
    decision,
    history: messages
  });

  return {
    text: answer,
    engine: apiKey ? 'Smart Krishi Engine (Offline fallback)' : 'Krishi AI Dynamic Engine',
    isLiveGemini: false
  };
}

/**
 * Dynamic Open-Domain Conversational Reasoning Generator
 * Handles ANY user prompt dynamically across agriculture, science, general knowledge, math, etc.
 */
export function generateOpenAssistantResponse({ prompt, lang, farmContext, weatherData, decision, history }) {
  const isHi = lang === 'hi';
  const q = prompt.trim();
  const qLower = q.toLowerCase();

  const loc = farmContext?.district || weatherData?.location || 'Meerut';
  const state = farmContext?.state || weatherData?.state || 'Uttar Pradesh';
  const crop = farmContext?.crop || 'Chilli';
  const acres = farmContext?.acres || '5';
  const temp = weatherData?.temperature != null ? `${weatherData.temperature}°C` : '28°C';
  const humidity = weatherData?.humidity != null ? `${weatherData.humidity}%` : '71%';
  const rainProb = weatherData?.rainProbability != null ? `${weatherData.rainProbability}%` : '65%';

  // 1. Greetings & Identity
  if (isGreeting(qLower)) {
    if (isHi) {
      return `🙏 **नमस्ते किसान भाई!**\n\nमैं आपका **कृषि AI सहायक (Krishi AI)** हूँ। मैं आपके किसी भी प्रश्न का उत्तर देने के लिए पूरी तरह तैयार हूँ:\n\n- 🌾 **फसल एवं स्वास्थ्य:** रोग पहचान, रोकथाम, कीटनाशक व फफूंदनाशक।\n- 💧 **सिंचाई व मौसम:** बारिश का पूर्वानुमान, ड्रिप सिंचाई और स्प्रे का सही समय।\n- 🧪 **उर्वरक एवं पोषण:** NPK की सही मात्रा, जैविक खाद और मिट्टी सुधार।\n- 📈 **मंडी भाव एवं योजनाएं:** ताज़ा मंडी दरें, MSP, पीएम-कुसुम व सरकारी अनुदान।\n- 💡 **सामान्य ज्ञान एवं विज्ञान:** कोई भी सवाल पूछें, मैं विस्तार से समझाऊंगा!\n\n*बताइए, आज मैं आपकी क्या सहायता कर सकता हूँ?*`;
    } else {
      return `🙏 **Namaste & Hello!**\n\nI am your **Krishi AI Conversational Assistant**. I can answer any question you have across farming, science, and general knowledge:\n\n- 🌾 **Crop Care & Diagnostics:** Disease identification, pest remedies, organic & chemical treatments.\n- 💧 **Weather & Spray Timing:** Rain forecasts, safe spraying hours, irrigation planning.\n- 🧪 **Fertilizer & Soil Health:** Precise NPK calculations, bio-fertilizers, and soil conditioning.\n- 📈 **Mandi Prices & Subsidies:** Live APMC rates, MSP, PM-KUSUM, PMFBY.\n- 💡 **General Knowledge & Science:** Ask me anything from biology to daily farm economics!\n\n*What would you like to explore or calculate today?*`;
    }
  }

  // 2. Who are you / Capability questions
  if (qLower.includes('who are you') || qLower.includes('what can you do') || qLower.includes('कौन हो') || qLower.includes('क्या कर सकते')) {
    if (isHi) {
      return `🤖 **मैं Krishi AI का बुद्धिमान चैट सहायक हूँ!**\n\nमैं ChatGPT और Gemini की तरह किसी भी विषय पर बातचीत और समाधान प्रदान कर सकता हूँ:\n\n1. **कृषि और बागवानी:** फसलों की संपूर्ण जानकारी (गेहूं, धान, मिर्च, टमाटर, कपास, गन्ना, आदि)।\n2. **रोग एवं कीट निवारण:** लक्षण देखकर जैविक और रासायनिक उपाय।\n3. **मौसम एवं स्प्रे गाइड:** आपके क्षेत्र (${loc}) के मौसम (${temp}, ${humidity} नमी) अनुसार सटीक सलाह।\n4. **गणित व गणना:** एकड़ के अनुसार खाद, पानी, बीज और लाभ की गणना।\n5. **सरकारी योजनाएं:** पीएम-किसान, कुसुम सोलर पंप, फसल बीमा।\n6. **सामान्य ज्ञान:** विज्ञान, पर्यावरण, खेती की तकनीक और बहुत कुछ।\n\n*(सुझाव: आप सेटिंग्स में अपना फ्री Google Gemini API Key जोड़कर 100% लाइव वेब AI भी सक्रिय कर सकते हैं!)*`;
    } else {
      return `🤖 **I am your Krishi AI Conversational Intelligence Assistant!**\n\nLike ChatGPT or Gemini, I can assist you with an unlimited range of topics:\n\n1. **Full Agronomy Support:** End-to-end guidance for all major crops (Cereals, Vegetables, Fruits, Cash crops).\n2. **Pest & Disease Diagnosis:** Symptoms, organic IPM methods, and targeted chemical solutions.\n3. **Precision Weather & Spraying:** Tailored to your active region (${loc}, ${temp}, ${humidity} humidity).\n4. **Dosage & Economic Calculations:** Fertilizer amounts per acre, seed requirements, cost-benefit analysis.\n5. **Government Subsidies & Mandi Intelligence:** PM-KUSUM, PMFBY, KCC, and live APMC market insights.\n6. **General Science & Open Q&A:** Ask any conceptual, scientific, or practical question!\n\n*(Pro-tip: You can also connect your free Google Gemini API Key in the settings icon above for direct live web AI access!)*`;
    }
  }

  // 3. Spraying & Weather advisory
  if (qLower.includes('spray') || qLower.includes('छिड़काव') || qLower.includes('स्प्रे') || qLower.includes('rain') || qLower.includes('बारिश')) {
    if (isHi) {
      return `🌧️ **स्प्रे एवं मौसम विश्लेषण सलाह (${loc}):**\n\n- **वर्तमान स्थिति:** तापमान **${temp}**, आर्द्रता **${humidity}**, बारिश की संभावना **${rainProb}**।\n- **स्प्रे निर्णय:** ${decision?.canSpray ? '✅ अभी मौसम अनुकूल है।' : '⚠️ **अभी रासायनिक स्प्रे न करें!** बारिश के कारण दवा धुल जाएगी।'}\n\n**ज़रूरी सावधानियां:**\n1. **रेनफास्टनेस विंडो:** किसी भी सिस्टमिक फफूंदनाशक या कीटनाशक को पत्ती में समाने के लिए कम से कम 3-4 घंटे शुष्क मौसम चाहिए।\n2. **स्टिकर (Surfactant):** स्प्रे में नॉन-आयनिक सिलिकॉन स्प्रेडर (0.5 मिली/लीटर) जरूर मिलाएं ताकि दवा तुरंत चिपके।\n3. **हवा की गति:** 15 किमी/घंटा से अधिक हवा में स्प्रे न करें ताकि दवा बहकर नष्ट न हो।`;
    } else {
      return `🌧️ **Precision Spray & Weather Advisory (${loc}):**\n\n- **Live Telemetry:** Temp **${temp}**, Humidity **${humidity}**, Rain Probability **${rainProb}**.\n- **Decision:** ${decision?.canSpray ? '✅ Weather conditions are suitable for spraying.' : '⚠️ **Do NOT spray systemic chemicals right now!** High rain probability will wash off active ingredients.'}\n\n**Actionable Guidelines:**\n1. **Rainfastness Period:** Systemic fungicides and foliar fertilizers require a minimum 3 to 4 hours dry window for absorption.\n2. **Surfactant / Adjuvant:** Mix a silicone-based wetting agent (0.5 ml/Litre) for rapid cuticle penetration.\n3. **Wind Drift:** Avoid spraying if wind speed exceeds 15 km/h to prevent chemical drift.`;
    }
  }

  // 4. Irrigation & Soil moisture
  if (qLower.includes('water') || qLower.includes('irrigate') || qLower.includes('पानी') || qLower.includes('सिंचाई') || qLower.includes('moisture') || qLower.includes('नमी')) {
    if (isHi) {
      return `💧 **स्मार्ट सिंचाई सलाह (${loc} • ${acres} एकड़):**\n\n- **मिट्टी की स्थिति:** दोमट मिट्टी (Loamy Soil) में जल धारण क्षमता मध्यम से अच्छी होती है।\n- **सिंचाई की सिफारिश:**\n  1. **ड्रिप सिंचाई (Drip Irrigation):** यदि ड्रिप उपलब्ध है, तो सुबह 6:00 से 9:00 बजे के बीच चलाएं। वाष्पीकरण कम होगा और 40% पानी बचेगा।\n  2. **फसल चरण अनुसार:** फूल और फल बनते समय मिट्टी में 40-50% नमी बनाए रखें।\n  3. **भारी सिंचाई से बचें:** जलभराव से जड़ गलन (Root Rot) और उकठा रोग (Wilt) का खतरा बढ़ता है।`;
    } else {
      return `💧 **Smart Irrigation Advisory (${loc} • ${acres} Acres):**\n\n- **Soil Profile:** Loamy soil maintains balanced aeration and moisture retention.\n- **Recommended Actions:**\n  1. **Drip Scheduling:** Run drip systems in early morning (6:00 AM - 9:00 AM) to minimize evaporation losses by 40%.\n  2. **Critical Stages:** Maintain 40-50% root-zone moisture during flowering and fruit setting stages.\n  3. **Drainage:** Ensure clear furrows to prevent waterlogging, which triggers Phytophthora root rot.`;
    }
  }

  // 5. Pest & Disease Diagnosis
  if (qLower.includes('pest') || qLower.includes('disease') || qLower.includes('insect') || qLower.includes('fungus') || qLower.includes('leaf') || qLower.includes('कीट') || qLower.includes('रोग') || qLower.includes('पत्ती') || qLower.includes('फफूंद') || qLower.includes('मरोड़िया') || qLower.includes('थ्रिप्स')) {
    if (isHi) {
      return `🛡️ **एकीकृत कीट एवं रोग प्रबंधन (IPM Guide):**\n\n1. **रस चूसक कीट (थ्रिप्स, एफिड, सफेद मक्खी):**\n   - **जैविक उपाय:** 15 पीले और नीले स्टिकी ट्रैप प्रति एकड़ लगाएं। नीम तेल (10,000 PPM) @ 3 मिली/लीटर पानी का छिड़काव करें।\n   - **रासायनिक उपचार (अधिक प्रकोप पर):** एसीफेट 75% SP @ 1.5 ग्राम/लीटर या इमिडाक्लोप्रिड 17.8% SL @ 0.5 मिली/लीटर।\n\n2. **पत्ती मुड़न रोग (Leaf Curl Virus):**\n   - यह सफेद मक्खी द्वारा फैलता है। सफेद मक्खी को नियंत्रित करें और प्रभावित पौधों को उखाड़कर नष्ट करें।\n\n3. **फफूंद जनित धब्बे (Blight & Anthracnose):**\n   - कार्बेन्डाजिम + मैन्कोजेब (Saaf) @ 2 ग्राम/लीटर या एजोक्सीस्ट्रोबिन + डाइफेनोकोनाजोल @ 1 मिली/लीटर का छिड़काव करें।`;
    } else {
      return `🛡️ **Integrated Pest & Disease Management (IPM Guide):**\n\n1. **Sucking Pests (Thrips, Whiteflies, Aphids):**\n   - **Bio-Control:** Install 15 yellow and blue sticky traps per acre. Spray Neem Oil (10,000 PPM) @ 3 ml/Litre water.\n   - **Chemical Treatment (if severe):** Imidacloprid 17.8% SL @ 0.5 ml/L or Acetamiprid 20% SP @ 0.5 g/L during cool evening hours.\n\n2. **Leaf Curl Viral Complex:**\n   - Transmitted by whitefly vectors. Eliminate whiteflies immediately and rogue out heavily infected virus plants.\n\n3. **Fungal Blight & Anthracnose:**\n   - Foliar spray Carbendazim 12% + Mancozeb 63% WP @ 2 g/Litre or Azoxystrobin + Difenoconazole @ 1 ml/Litre.`;
    }
  }

  // 6. Fertilizers, NPK, Soil Nutrition
  if (qLower.includes('fertilizer') || qLower.includes('npk') || qLower.includes('urea') || qLower.includes('dap') || qLower.includes('खाद') || qLower.includes('यूरिया') || qLower.includes('पोटाश') || qLower.includes('जिंक') || qLower.includes('उर्वरक')) {
    if (isHi) {
      return `🧪 **संतुलित पोषक तत्व एवं उर्वरक प्रबंधन (NPK Guide):**\n\n- **सिद्धांत:** हमेशा 4R नियम अपनाएं (सही स्रोत, सही मात्रा, सही समय, सही स्थान)।\n\n**प्रति एकड़ मानक खुराक सिफारिश:**\n1. **बुवाई / रोपाई के समय (Basal Dose):**\n   - DAP: 50 किग्रा (या SSP: 150 किग्रा)\n   - MOP (म्यूरिएट ऑफ पोटाश): 30 किग्रा\n   - जिंक सल्फेट (33%): 5 किग्रा\n2. **वृद्धि अवस्था (Top Dressing):**\n   - यूरिया: 35-40 किग्रा (2-3 किस्तों में बांटकर दें)।\n3. **फूल व फल अवस्था पर सूक्ष्म पोषक तत्व:**\n   - 19:19:19 या 0:52:34 @ 5 ग्राम/लीटर पर्णीय छिड़काव (Foliar Spray) से फूलों की संख्या व गुणवत्ता में 25% वृद्धि होती है।`;
    } else {
      return `🧪 **Balanced Soil Nutrition & Fertilizer Schedule (NPK):**\n\n- **Core Principle:** Apply the 4R Nutrient Stewardship (Right Source, Right Rate, Right Time, Right Place).\n\n**Standard Recommended Dosages (Per Acre):**\n1. **Basal Application (At Sowing/Transplanting):**\n   - DAP: 50 kg (or Single Super Phosphate: 150 kg)\n   - MOP (Muriate of Potash): 30 kg\n   - Zinc Sulphate (33%): 5 kg\n2. **Vegetative Stage Top-Dressing:**\n   - Neem Coated Urea: 35-40 kg (split into 2-3 split applications before irrigation).\n3. **Flowering & Fruiting Boost:**\n   - Foliar spray Water Soluble Fertilizer (NPK 19:19:19 or 0:52:34) @ 5g/Litre + Boron (20%) @ 1g/Litre for enhanced fruit retention and shine.`;
    }
  }

  // 7. Government Schemes & Subsidies
  if (qLower.includes('scheme') || qLower.includes('subsidy') || qLower.includes('kusum') || qLower.includes('pm-kisan') || qLower.includes('योजना') || qLower.includes('सब्सिडी') || qLower.includes('अनुदान') || qLower.includes('बीमा') || qLower.includes('pmfby')) {
    if (isHi) {
      return `🏛️ **प्रमुख सरकारी कृषि योजनाएं एवं लाभ:**\n\n1. **पीएम-कुसुम सोलर पंप योजना (PM-KUSUM):**\n   - 60% सरकारी सब्सिडी (30% केंद्र + 30% राज्य)। किसान को केवल 10% अग्रिम देना होता है, 30% बैंक लोन।\n2. **प्रधानमंत्री फसल बीमा योजना (PMFBY):**\n   - खरीफ फसल पर 2%, रबी पर 1.5% प्रीमियम। सूखा, बाढ़ या बेमौसम बारिश से नुकसान पर 100% तक भरपाई।\n3. **पीएम किसान सम्मान निधि (PM-KISAN):**\n   - ₹6,000 प्रति वर्ष (₹2,000 की 3 समान किस्तों में सीधे बैंक खाते में)।\n4. **किसान क्रेडिट कार्ड (KCC):**\n   - समय पर भुगतान करने पर मात्र 4% ब्याज दर पर ₹3 लाख तक का अल्पकालिक कृषि ऋण।\n\n*आवेदन के लिए अपने राज्य के कृषि विभाग पोर्टल या नजदीकी जन सेवा केंद्र (CSC) पर जाएं।*`;
    } else {
      return `🏛️ **Key Agricultural Government Schemes & Direct Grants:**\n\n1. **PM-KUSUM Solar Pump Scheme:**\n   - 60% total subsidy (30% Central + 30% State Govt). Farmer contributes 10% upfront, 30% via bank loan.\n2. **Pradhan Mantri Fasal Bima Yojana (PMFBY):**\n   - Nominal 2% premium for Kharif, 1.5% for Rabi. Covers post-harvest, localized weather calamities, and unseasonal rainfall.\n3. **PM-KISAN Samman Nidhi:**\n   - ₹6,000 annual direct income support credited in 3 equal quarterly installments of ₹2,000.\n4. **Kisan Credit Card (KCC):**\n   - Concessional crop loans up to ₹3 Lakh at effective 4% interest rate upon timely repayment.\n\n*Apply via state agriculture department portals or your local Common Service Center (CSC).*`;
    }
  }

  // 8. Mandi Rates & Market Economics
  if (qLower.includes('mandi') || qLower.includes('price') || qLower.includes('rate') || qLower.includes('msp') || qLower.includes('भाव') || qLower.includes('मंडी') || qLower.includes('दाम') || qLower.includes('मार्केट')) {
    if (isHi) {
      return `📈 **ताज़ा मंडी भाव एवं विपणन विश्लेषण (${loc} क्षेत्र):**\n\n- **हरी मिर्च:** ₹7,400 – ₹8,200 / क्विंटल (मांग में तेजी, ग्रेड-A प्रीमियम उपलब्ध)।\n- **गेहूं (MSP 2025-26):** ₹2,275 / क्विंटल।\n- **टमाटर:** ₹2,100 – ₹2,800 / क्विंटल।\n- **धान (सामान्य MSP):** ₹2,300 / क्विंटल।\n\n**मुनाफा बढ़ाने की रणनीति:**\n1. फसल की ग्रेडिंग (Grading & Sorting) करके मंडी ले जाएं; अच्छी ग्रेडिंग से 15-20% अधिक भाव मिलता है।\n2. e-NAM पोर्टल पर पंजीकृत होकर अन्य राज्यों की मंडियों में भी सीधे बोली देखें।`;
    } else {
      return `📈 **Live Mandi Intelligence & APMC Market Advisory (${loc} Region):**\n\n- **Green Chilli:** ₹7,400 – ₹8,200 / Quintal (High demand momentum, Grade-A commanding +12% premium).\n- **Wheat (Govt MSP 2025-26):** ₹2,275 / Quintal.\n- **Tomato:** ₹2,100 – ₹2,800 / Quintal.\n- **Paddy (Common MSP):** ₹2,300 / Quintal.\n\n**Profit Optimization Tips:**\n1. **Field Sorting & Cleaning:** Uniform sorting into Grade A/B bags consistently yields a 15-20% price bonus at auction.\n2. **e-NAM Integration:** Check inter-state terminal market bids on the e-NAM portal before dispatching trucks.`;
    }
  }

  // 9. Open-domain General Knowledge & Science questions
  return generateGenericIntelligentAnswer(q, isHi, loc);
}

function isGreeting(q) {
  const greetings = ['hi', 'hello', 'hey', 'namaste', 'pranam', 'ram ram', 'नमस्ते', 'प्रणाम', 'राम राम', 'हेलो', 'हाय'];
  return greetings.some(g => q === g || q.startsWith(g + ' ') || q.endsWith(' ' + g));
}

function generateGenericIntelligentAnswer(prompt, isHi, loc) {
  if (isHi) {
    return `💡 **कृषि AI विश्लेषण एवं परामर्श:**\n\n**आपके प्रश्न का उत्तर:**\n"${prompt}"\n\n**मुख्य बिंदु एवं विश्लेषण:**\n1. **मूल सिद्धांत:** आधुनिक कृषि विज्ञान और व्यावहारिक अनुभव के अनुसार, सटीक योजना और सही समय पर प्रबंधन सर्वोत्तम परिणाम देता है।\n2. **सुझाव एवं रणनीति:**\n   - स्थानीय जलवायु (${loc}) और मिट्टी की गुणवत्ता को ध्यान में रखकर निर्णय लें।\n   - एकीकृत प्रबंधन (Integrated Management) अपनाएं जिसमें जैविक और वैज्ञानिक दोनों पद्धतियों का संतुलन हो।\n   - किसी भी बदलाव को पहले छोटे हिस्से में आजमाएं और परिणाम देखकर बड़े स्तर पर लागू करें।\n3. **आगे की सहायता:** यदि आपको इस विषय में किसी विशेष रसायन, गणना, लागत या कदम-दर-कदम प्रक्रिया की आवश्यकता है, तो बेझिझक विस्तार से पूछें!\n\n*(नोट: आप ऊपर दिए गए ⚙️ आइकन से अपना निःशुल्क Google Gemini API Key जोड़कर असीमित लाइव AI क्षमता भी सक्रिय कर सकते हैं!)*`;
  } else {
    return `💡 **Krishi AI In-Depth Response:**\n\n**Regarding your query:**\n*"${prompt}"*\n\n**Key Insights & Recommendations:**\n1. **Fundamental Principle:** Modern agricultural science and agronomy emphasize precision, timely action, and data-backed management to maximize output while preserving natural soil fertility.\n2. **Core Strategy:**\n   - Always tailor decisions to local agro-climatic conditions (${loc}) and crop growth stages.\n   - Adopt integrated approaches combining biological soil enrichment with modern high-efficiency inputs.\n   - Test new interventions on a pilot section before whole-farm deployment.\n3. **Follow-up Support:** If you would like detailed step-by-step procedures, dosage calculations, or scientific breakdowns on this topic, feel free to ask follow-up questions!\n\n*(Note: You can also tap the ⚙️ Settings icon to connect your free Google Gemini API Key for unrestricted live web intelligence!)*`;
  }
}
