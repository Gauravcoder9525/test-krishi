/**
 * KrishiAI Engine Configuration & Abstraction Layer
 * 
 * Reads the Gemini API Key from the `.env` file (VITE_GEMINI_API_KEY).
 * When configured, the application abstracts the key entirely from the UI,
 * allowing every user to seamlessly interact with Gemini without entering anything.
 */

export const GEMINI_CONFIG = {
  // Read Gemini API Key from .env (Vite environment variable)
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || "", 
  
  // Default model for conversational AI
  defaultModel: "gemini-3.6-flash",
  
  // Alternative models
  models: [
    { id: "gemini-3.6-flash", name: "Gemini 3.6 Flash (Fastest & Latest)" },
    { id: "gemini-3.6-pro", name: "Gemini 3.6 Pro (Deep Agronomic Reasoning)" },
    { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash" }
  ]
};
