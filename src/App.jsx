import React, { useState, useEffect, useCallback } from 'react';
import { dict } from './data/translations';
import { getCropRecommendation } from './data/cropDatabase';
import {
  DISTRICT_PRESETS,
  fetchLiveAgriculturalWeather,
  generateAgriculturalDecision
} from './services/weatherEngine';
import { subscribeToAuth } from './services/firebase';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AiAssistantModal from './components/AiAssistantModal';
import ForecastSprayModal from './components/ForecastSprayModal';
import LoginPage from './components/LoginPage';

import LandingTab from './components/tabs/LandingTab';
import DashboardTab from './components/tabs/DashboardTab';
import FarmerHubTab from './components/tabs/FarmerHubTab';
import FertilizerCompanyTab from './components/tabs/FertilizerCompanyTab';
import RecommendationTab from './components/tabs/RecommendationTab';
import RiskGuardianTab from './components/tabs/RiskGuardianTab';
import IrrigationTab from './components/tabs/IrrigationTab';
import SoilStudioTab from './components/tabs/SoilStudioTab';
import PearlMilletTab from './components/tabs/PearlMilletTab';
import SchemesTab from './components/tabs/SchemesTab';

import { detectUserLiveLocation } from './services/locationService';

export default function App() {
  const [lang, setLang] = useState('en');
  const t = dict[lang];

  const [activeTab, setActiveTab] = useState('landing');
  const [showNotifications, setShowNotifications] = useState(false);
  const [irrigationMode, setIrrigationMode] = useState('farm');
  const [selectedFarmNode, setSelectedFarmNode] = useState(null);

  // Firebase Auth User State
  const [user, setUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Weather & Agricultural Decision State
  const [currentLocation, setCurrentLocation] = useState(DISTRICT_PRESETS[0]); // Ghaziabad default for heavy rain demonstration
  const [currentScenario, setCurrentScenario] = useState('rain'); // 'rain' | 'clear' | 'wind' | 'heat' | null
  const [weatherData, setWeatherData] = useState(null);
  const [decision, setDecision] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [locatingGps, setLocatingGps] = useState(false);
  const [forecastModalOpen, setForecastModalOpen] = useState(false);

  // Form State for Crop Recommendation
  const [formData, setFormData] = useState({
    state: "Uttar Pradesh",
    district: "Ghaziabad",
    acres: "5",
    soil: "Loamy",
    water: "Moderate",
    season: "Kharif",
    goal: "Highest Profit"
  });
  const [recommendationResult, setRecommendationResult] = useState(null);

  // Shared Plant Disease and Soil Analysis State across Tabs
  const [plantData, setPlantData] = useState(() => {
    try {
      const stored = localStorage.getItem('krishi_last_disease_data');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const [soilData, setSoilData] = useState(() => {
    try {
      const stored = localStorage.getItem('krishi_last_soil_data');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const handlePlantAnalyzed = (data) => {
    setPlantData(data);
  };

  const handleSoilAnalyzed = (data) => {
    setSoilData(data);
  };

  // AI Assistant Chat State
  const [aiOpen, setAiOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: lang === 'en'
        ? "Namaste! I am your Krishi AI Farming Assistant. Ask me anything about crop health, spray schedules, irrigation, fertilizer doses, or mandi prices."
        : "नमस्ते किसान भाई! मैं आपका कृषि AI सहायक हूँ। मुझसे फसल स्वास्थ्य, स्प्रे का सही समय, सिंचाई, खाद की सही मात्रा या मंडी भाव के बारे में कुछ भी पूछें।"
    }
  ]);

  // Subscribe to Firebase Auth State
  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser) => {
      setUser(currentUser);
      setAuthInitialized(true);
    });
    return () => unsubscribe();
  }, []);

  // Load weather and compute decision
  const loadWeather = useCallback(async (loc, scenario = null) => {
    setWeatherLoading(true);
    try {
      const data = await fetchLiveAgriculturalWeather(loc.lat, loc.lon, loc.name, loc.state, scenario);
      setWeatherData(data);
      const dec = generateAgriculturalDecision(data, lang);
      setDecision(dec);
    } catch (err) {
      console.error("Error fetching weather:", err);
    } finally {
      setWeatherLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    loadWeather(currentLocation, currentScenario);
  }, [currentLocation, currentScenario, loadWeather]);

  // Re-evaluate decision when language changes
  useEffect(() => {
    if (weatherData) {
      setDecision(generateAgriculturalDecision(weatherData, lang));
    }
  }, [lang, weatherData]);

  // Location selector handler
  const handleSelectLocation = (preset) => {
    setCurrentLocation(preset);
    setCurrentScenario(null); // Switch to live API mode for chosen location
    setFormData(prev => ({ ...prev, district: preset.name, state: preset.state }));
    loadWeather(preset, null);
  };

  // Live GPS Auto-Detection handler
  const handleDetectLiveLocation = async () => {
    setLocatingGps(true);
    try {
      const detected = await detectUserLiveLocation();
      if (detected) {
        setCurrentLocation(detected);
        setCurrentScenario(null); // Switch to live satellite grid forecast for exact GPS coordinates
        const updatedDistrict = detected.name || detected.district || 'My District';
        const updatedState = detected.state || 'India';
        
        setFormData(prev => ({
          ...prev,
          district: updatedDistrict,
          state: updatedState
        }));

        await loadWeather(detected, null);

        // Update crop recommendation tailored to user's real location
        const newFormInput = {
          ...formData,
          district: updatedDistrict,
          state: updatedState
        };
        setRecommendationResult(getCropRecommendation(newFormInput, lang));
      }
    } catch (err) {
      console.error("GPS detection error:", err);
    } finally {
      setLocatingGps(false);
    }
  };

  // Scenario selector handler
  const handleSelectScenario = (scenarioKey) => {
    setCurrentScenario(scenarioKey);
    let targetLoc = currentLocation;
    if (scenarioKey === 'rain') targetLoc = DISTRICT_PRESETS.find(p => p.id === 'ghaziabad') || currentLocation;
    if (scenarioKey === 'clear') targetLoc = DISTRICT_PRESETS.find(p => p.id === 'nashik') || currentLocation;
    if (scenarioKey === 'wind') targetLoc = DISTRICT_PRESETS.find(p => p.id === 'ludhiana') || currentLocation;
    if (scenarioKey === 'heat') targetLoc = DISTRICT_PRESETS.find(p => p.id === 'jaipur') || currentLocation;
    setCurrentLocation(targetLoc);
    loadWeather(targetLoc, scenarioKey);
  };

  // Load Demo Farm Action
  const loadDemoFarm = () => {
    const demoLoc = DISTRICT_PRESETS.find(p => p.id === 'ghaziabad') || DISTRICT_PRESETS[0];
    setCurrentLocation(demoLoc);
    setCurrentScenario('rain');
    const demoInput = {
      state: demoLoc.state,
      district: demoLoc.name,
      acres: "5",
      soil: "Loamy",
      water: "Moderate",
      season: "Kharif",
      goal: "Highest Profit"
    };
    setFormData(demoInput);
    setRecommendationResult(getCropRecommendation(demoInput, lang));
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If on login tab, display dedicated login screen
  if (activeTab === 'login') {
    return (
      <LoginPage
        lang={lang}
        t={t}
        user={user}
        onClose={() => setActiveTab('dashboard')}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setActiveTab('dashboard');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen font-sans flex flex-col justify-between selection:bg-emerald-600 selection:text-white bg-[#FAF9F5] text-slate-800">

      {/* Top Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        loadDemoFarm={loadDemoFarm}
        user={user}
        currentLocation={currentLocation}
        onDetectLocation={handleDetectLiveLocation}
        locatingGps={locatingGps}
      />

      {/* Main Feature Tab Content with Smooth Page Transitions */}
      <main className="flex-grow">
        <div key={activeTab} className="page-transition">
          {activeTab === 'landing' && (
            <LandingTab
              lang={lang}
              t={t}
              setActiveTab={setActiveTab}
              loadDemoFarm={loadDemoFarm}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardTab
              user={user}
              lang={lang}
              t={t}
              setActiveTab={setActiveTab}
              weatherData={weatherData}
              decision={decision}
              weatherLoading={weatherLoading}
              refreshWeather={() => loadWeather(currentLocation, currentScenario)}
              selectLocation={handleSelectLocation}
              selectScenario={handleSelectScenario}
              currentLocation={currentLocation}
              currentScenario={currentScenario}
              onOpenForecastModal={() => setForecastModalOpen(true)}
              onDetectLocation={handleDetectLiveLocation}
              locatingGps={locatingGps}
            />
          )}

          {activeTab === 'farmerhub' && (
            <FarmerHubTab
              lang={lang}
              t={t}
              setActiveTab={setActiveTab}
              currentLocation={currentLocation}
              plantDataProp={plantData}
              soilDataProp={soilData}
            />
          )}

          {activeTab === 'pearlmillet' && (
            <PearlMilletTab
              lang={lang}
              t={t}
              setActiveTab={setActiveTab}
              onPlantAnalyzed={handlePlantAnalyzed}
            />
          )}

          {activeTab === 'recommendation' && (
            <RecommendationTab
              lang={lang}
              t={t}
              formData={formData}
              setFormData={setFormData}
              recommendationResult={recommendationResult}
              setRecommendationResult={setRecommendationResult}
              setActiveTab={setActiveTab}
              currentLocation={currentLocation}
              onDetectLocation={handleDetectLiveLocation}
              locatingGps={locatingGps}
            />
          )}

          {(activeTab === 'fertilizercompany' || activeTab === 'risk') && (
            <FertilizerCompanyTab
              lang={lang}
              t={t}
              setActiveTab={setActiveTab}
              currentLocation={currentLocation}
            />
          )}

          {activeTab === 'irrigation' && (
            <IrrigationTab
              lang={lang}
              t={t}
              irrigationMode={irrigationMode}
              setIrrigationMode={setIrrigationMode}
              selectedFarmNode={selectedFarmNode}
              setSelectedFarmNode={setSelectedFarmNode}
              currentLocation={currentLocation}
              weatherData={weatherData}
            />
          )}

          {activeTab === 'market' && (
            <SoilStudioTab
              lang={lang}
              t={t}
              setActiveTab={setActiveTab}
              onSoilAnalyzed={handleSoilAnalyzed}
            />
          )}

          {activeTab === 'schemes' && (
            <SchemesTab
              lang={lang}
              t={t}
            />
          )}
        </div>
      </main>

      {/* Precision Weather & Spray Advisory Modal */}
      <ForecastSprayModal
        isOpen={forecastModalOpen}
        onClose={() => setForecastModalOpen(false)}
        lang={lang}
        t={t}
        weatherData={weatherData}
        decision={decision}
        currentLocation={currentLocation}
        onDetectLocation={handleDetectLiveLocation}
        locatingGps={locatingGps}
      />

      {/* Floating AI Farming Assistant */}
      <AiAssistantModal
        lang={lang}
        t={t}
        aiOpen={aiOpen}
        setAiOpen={setAiOpen}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        farmContext={formData}
        weatherData={weatherData}
        decision={decision}
      />

      {/* Footer */}
      <Footer
        lang={lang}
        t={t}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}
