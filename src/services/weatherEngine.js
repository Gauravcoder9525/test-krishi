/**
 * KrishiAI Agricultural Weather & Precision Spray Decision Engine
 * Integrates live Open-Meteo API data with deterministic agro-meteorological rules
 * and safe spraying window calculations.
 */

export const DISTRICT_PRESETS = [
  { id: 'ghaziabad', name: 'Ghaziabad', state: 'Uttar Pradesh', lat: 28.6692, lon: 77.4538, tag: '🌧️ Heavy Rain Demo' },
  { id: 'meerut', name: 'Meerut', state: 'Uttar Pradesh', lat: 28.9845, lon: 77.7064, tag: '📍 Default Farm' },
  { id: 'muzaffarnagar', name: 'Muzaffarnagar', state: 'Uttar Pradesh', lat: 29.4727, lon: 77.7085, tag: '🌾 Sugarcane Belt' },
  { id: 'bulandshahr', name: 'Bulandshahr', state: 'Uttar Pradesh', lat: 28.4070, lon: 77.8498, tag: '🌽 Grain & Veg' },
  { id: 'karnal', name: 'Karnal', state: 'Haryana', lat: 29.6857, lon: 76.9905, tag: '🌾 Basmati Hub' },
  { id: 'ludhiana', name: 'Ludhiana', state: 'Punjab', lat: 30.9010, lon: 75.8573, tag: '🌾 Wheat & Rice' },
  { id: 'nashik', name: 'Nashik', state: 'Maharashtra', lat: 19.9975, lon: 73.7898, tag: '🍇 Grape & Onion' },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567, tag: '🍅 Horticulture' },
  { id: 'guntur', name: 'Guntur', state: 'Andhra Pradesh', lat: 16.3067, lon: 80.4365, tag: '🌶️ Chilli Hub' },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873, tag: '☀️ Arid Zone' },
  { id: 'indore', name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577, tag: '🌱 Soybean & Wheat' },
  { id: 'patna', name: 'Patna', state: 'Bihar', lat: 25.5941, lon: 85.1376, tag: '🌾 Gangetic Plain' }
];

/**
 * Calculates Delta T (°C), an agronomist-standard index for spray evaporation and droplet survival.
 * Delta T = Dry Bulb Temp - Wet Bulb Temp (approximated via relative humidity)
 * Ideal Delta T range for spraying is 2°C to 8°C.
 */
export function calculateDeltaT(tempC, humidityPercent) {
  // Stull's approximation for Wet Bulb Temperature
  const T = tempC;
  const RH = humidityPercent;
  const Tw = T * Math.atan(0.151977 * Math.pow(RH + 8.313659, 0.5)) +
    Math.atan(T + RH) -
    Math.atan(RH - 1.676331) +
    0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH) -
    4.686035;
  const deltaT = Math.max(0, parseFloat((T - Tw).toFixed(1)));
  return deltaT;
}

/**
 * Evaluates spraying suitability for a single hour based on deterministic agro-meteorological rules.
 */
export function evaluateHourlySpraySuitability({
  temp,
  rainProb,
  rainfall,
  windSpeed,
  windGusts = windSpeed * 1.3,
  humidity
}) {
  const deltaT = calculateDeltaT(temp, humidity);
  const reasons = [];
  let score = 100; // 0 to 100
  let status = 'ideal'; // 'ideal' | 'marginal' | 'unsafe'

  // 1. Rain Risk Rule (Washoff Hazard)
  if (rainProb >= 70 || rainfall >= 8) {
    status = 'unsafe';
    score -= 60;
    reasons.push({ type: 'rain', level: 'danger', en: `Heavy rain risk (${rainProb}% prob, ${rainfall}mm)`, hi: `भारी बारिश का खतरा (${rainProb}% संभावना, ${rainfall}mm)` });
  } else if (rainProb >= 35 || rainfall >= 2) {
    if (status !== 'unsafe') status = 'marginal';
    score -= 30;
    reasons.push({ type: 'rain', level: 'warning', en: `Moderate rain risk (${rainProb}%)`, hi: `मध्यम वर्षा की संभावना (${rainProb}%)` });
  }

  // 2. Wind Drift Rule
  if (windSpeed >= 16 || windGusts >= 22) {
    status = 'unsafe';
    score -= 50;
    reasons.push({ type: 'wind', level: 'danger', en: `High wind drift (${windSpeed} km/h, gusts ${Math.round(windGusts)} km/h)`, hi: `तेज हवा से दवा बहने का खतरा (${windSpeed} किमी/घंटा)` });
  } else if (windSpeed >= 12) {
    if (status !== 'unsafe') status = 'marginal';
    score -= 20;
    reasons.push({ type: 'wind', level: 'warning', en: `Breezy conditions (${windSpeed} km/h) — use drift-reduction nozzles`, hi: `हवा तेज (${windSpeed} किमी/घंटा) — सावधानी आवश्यक` });
  } else if (windSpeed < 3) {
    // Inversion risk during calm winds in daytime
    reasons.push({ type: 'wind', level: 'info', en: `Very low wind (${windSpeed} km/h) — check for thermal inversion`, hi: `हवा बहुत धीमी (${windSpeed} किमी/घंटा)` });
  }

  // 3. Temperature & Evaporative Scorching Rule
  if (temp >= 33) {
    status = 'unsafe';
    score -= 40;
    reasons.push({ type: 'temp', level: 'danger', en: `Extreme heat (${temp}°C) — rapid evaporation & leaf scorch risk`, hi: `अत्यधिक तापमान (${temp}°C) — पत्ती जलने का खतरा` });
  } else if (temp >= 30) {
    if (status !== 'unsafe') status = 'marginal';
    score -= 15;
    reasons.push({ type: 'temp', level: 'warning', en: `Warm temperature (${temp}°C)`, hi: `तापमान अधिक (${temp}°C)` });
  } else if (temp < 12) {
    if (status !== 'unsafe') status = 'marginal';
    score -= 15;
    reasons.push({ type: 'temp', level: 'warning', en: `Cold temperature (${temp}°C) — slow foliar uptake`, hi: `तापमान कम (${temp}°C) — धीमी अवशोषण दर` });
  }

  // 4. Humidity & Delta T
  if (humidity > 90 && rainfall === 0) {
    reasons.push({ type: 'humidity', level: 'warning', en: `Very high humidity (${humidity}%) — extended drying time`, hi: `उच्च आर्द्रता (${humidity}%)` });
  } else if (humidity < 35 && temp > 28) {
    if (status !== 'unsafe') status = 'marginal';
    reasons.push({ type: 'humidity', level: 'warning', en: `Low humidity (${humidity}%) — droplet evaporation`, hi: `कम आर्द्रता (${humidity}%)` });
  }

  if (deltaT > 8) {
    if (status !== 'unsafe') status = 'marginal';
    score -= 10;
    reasons.push({ type: 'deltaT', level: 'warning', en: `High Delta T (${deltaT}°C) — rapid evaporation`, hi: `उच्च डेल्टा T (${deltaT}°C)` });
  }

  // Determine overall message
  let summaryEn = '';
  let summaryHi = '';
  if (status === 'ideal') {
    summaryEn = 'Optimal spraying conditions (Low rain + gentle wind + good absorption)';
    summaryHi = 'छिड़काव के लिए सर्वोत्तम समय (कम बारिश + शांत हवा + उत्तम तापमान)';
  } else if (status === 'marginal') {
    summaryEn = 'Marginal conditions — proceed only if urgent with coarse droplet nozzles';
    summaryHi = 'मध्यम स्थिति — केवल आवश्यक होने पर बड़े नोजल से छिड़काव करें';
  } else {
    summaryEn = reasons[0]?.en || 'Unsafe spraying conditions';
    summaryHi = reasons[0]?.hi || 'छिड़काव के लिए असुरक्षित समय';
  }

  return {
    status,
    score: Math.max(10, Math.min(100, score)),
    deltaT,
    reasons,
    summaryEn,
    summaryHi
  };
}

/**
 * Analyzes next 24 to 72 hours of hourly weather data to compute distinct time slots
 * and select the Recommended Safe Spraying Window.
 */
export function calculateSafeSprayingWindows(hourlyList) {
  if (!hourlyList || hourlyList.length === 0) return [];

  // Group contiguous hours into practical agricultural windows (Morning: 6-10 AM, Midday: 10 AM-4 PM, Evening: 4-8 PM, Night: 8 PM-6 AM)
  const windows = [];
  let currentGroup = null;

  hourlyList.slice(0, 72).forEach((item) => {
    const date = new Date(item.time);
    const hour = date.getHours();
    const dayLabel = getDayRelativeLabel(date);
    
    // Group type
    let slotType = 'night';
    let slotTimeLabelEn = '';
    let slotTimeLabelHi = '';

    if (hour >= 6 && hour < 11) {
      slotType = 'morning';
      slotTimeLabelEn = `${dayLabel.en} 6 AM – 11 AM`;
      slotTimeLabelHi = `${dayLabel.hi} सुबह 6 – 11 बजे`;
    } else if (hour >= 11 && hour < 16) {
      slotType = 'afternoon';
      slotTimeLabelEn = `${dayLabel.en} 11 AM – 4 PM`;
      slotTimeLabelHi = `${dayLabel.hi} दोपहर 11 – 4 बजे`;
    } else if (hour >= 16 && hour < 20) {
      slotType = 'evening';
      slotTimeLabelEn = `${dayLabel.en} 4 PM – 8 PM`;
      slotTimeLabelHi = `${dayLabel.hi} शाम 4 – 8 बजे`;
    } else {
      slotType = 'night';
      slotTimeLabelEn = `${dayLabel.en} 8 PM – 6 AM`;
      slotTimeLabelHi = `${dayLabel.hi} रात 8 – सुबह 6 बजे`;
    }

    const groupKey = `${dayLabel.en}_${slotType}`;

    if (!currentGroup || currentGroup.key !== groupKey) {
      if (currentGroup) {
        windows.push(finalizeWindowGroup(currentGroup));
      }
      currentGroup = {
        key: groupKey,
        dayLabel,
        slotType,
        slotTimeLabelEn,
        slotTimeLabelHi,
        date,
        items: [item]
      };
    } else {
      currentGroup.items.push(item);
    }
  });

  if (currentGroup) {
    windows.push(finalizeWindowGroup(currentGroup));
  }

  // Filter out night slots for spraying windows presentation (spraying is done during day/morning/evening)
  const activeSprayWindows = windows.filter(w => w.slotType !== 'night');

  return activeSprayWindows;
}

function finalizeWindowGroup(group) {
  const items = group.items;
  const count = items.length;
  const avgTemp = Math.round(items.reduce((s, i) => s + i.temp, 0) / count);
  const maxRainProb = Math.max(...items.map(i => i.rainProb));
  const totalRainfall = parseFloat(items.reduce((s, i) => s + i.rainfall, 0).toFixed(1));
  const maxWind = Math.round(Math.max(...items.map(i => i.windSpeed)));
  const avgHumidity = Math.round(items.reduce((s, i) => s + i.humidity, 0) / count);

  // Evaluate overall window
  const evaluation = evaluateHourlySpraySuitability({
    temp: avgTemp,
    rainProb: maxRainProb,
    rainfall: totalRainfall,
    windSpeed: maxWind,
    humidity: avgHumidity
  });

  let reasonShortEn = '';
  let reasonShortHi = '';

  if (evaluation.status === 'unsafe') {
    if (maxRainProb >= 60 || totalRainfall > 5) {
      reasonShortEn = `Heavy rainfall risk (${maxRainProb}% prob, ${totalRainfall} mm)`;
      reasonShortHi = `भारी बारिश का जोखिम (${maxRainProb}% संभावना, ${totalRainfall} mm)`;
    } else if (maxWind >= 15) {
      reasonShortEn = `High wind drift (${maxWind} km/h)`;
      reasonShortHi = `तेज हवा से बहाव (${maxWind} किमी/घं)`;
    } else if (avgTemp >= 32) {
      reasonShortEn = `High temperature (${avgTemp}°C) & heat risk`;
      reasonShortHi = `अत्यधिक तापमान (${avgTemp}°C)`;
    } else {
      reasonShortEn = 'Unfavorable spray conditions';
      reasonShortHi = 'प्रतिकूल मौसम स्थिति';
    }
  } else if (evaluation.status === 'marginal') {
    reasonShortEn = `Moderate conditions (Wind ${maxWind} km/h, Rain ${maxRainProb}%)`;
    reasonShortHi = `मध्यम स्थिति (हवा ${maxWind} किमी/घं, वर्षा ${maxRainProb}%)`;
  } else {
    reasonShortEn = `Low rainfall + suitable wind (${maxWind} km/h, ${avgTemp}°C)`;
    reasonShortHi = `शांत हवा (${maxWind} किमी/घं) + अनुकूल मौसम (${avgTemp}°C)`;
  }

  return {
    ...group,
    avgTemp,
    maxRainProb,
    totalRainfall,
    maxWind,
    avgHumidity,
    status: evaluation.status,
    score: evaluation.score,
    deltaT: evaluation.deltaT,
    reasonShortEn,
    reasonShortHi
  };
}

function getDayRelativeLabel(date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24));

  const dayNamesEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayNamesHi = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];

  if (diffDays === 0) return { en: 'Today', hi: 'आज' };
  if (diffDays === 1) return { en: 'Tomorrow', hi: 'कल' };
  if (diffDays === 2) return { en: dayNamesEn[date.getDay()], hi: dayNamesHi[date.getDay()] };
  return { en: dayNamesEn[date.getDay()], hi: dayNamesHi[date.getDay()] };
}

/**
 * Maps WMO weather code to readable icon and agricultural description
 */
export function mapWeatherCode(code) {
  switch (code) {
    case 0:
      return { icon: '☀️', conditionEn: 'Clear Skies', conditionHi: 'साफ मौसम', isRain: false };
    case 1:
    case 2:
      return { icon: '🌤️', conditionEn: 'Partly Cloudy', conditionHi: 'आंशिक बादल', isRain: false };
    case 3:
      return { icon: '⛅', conditionEn: 'Overcast', conditionHi: 'बादल छाए रहेंगे', isRain: false };
    case 45:
    case 48:
      return { icon: '🌫️', conditionEn: 'Foggy / Dewy', conditionHi: 'कोहरा / ओस', isRain: false };
    case 51:
    case 53:
    case 55:
      return { icon: '🌦️', conditionEn: 'Light Drizzle', conditionHi: 'हल्की बूंदाबांदी', isRain: true };
    case 61:
    case 63:
      return { icon: '🌧️', conditionEn: 'Rain Showers', conditionHi: 'वर्षा की फुहारें', isRain: true };
    case 65:
    case 67:
      return { icon: '🌧️', conditionEn: 'Heavy Rainfall', conditionHi: 'भारी बारिश', isRain: true };
    case 80:
    case 81:
    case 82:
      return { icon: '⛈️', conditionEn: 'Thunderstorms & Rain', conditionHi: 'गरज के साथ बारिश', isRain: true };
    default:
      return { icon: '⛅', conditionEn: 'Cloudy Intervals', conditionHi: 'बादल और धूप', isRain: false };
  }
}

/**
 * Generates synthetic resilient data matching user scenarios for instant demo/testing
 */
export function generateScenarioWeatherData(districtName = 'Ghaziabad', scenario = 'rain') {
  const now = new Date();
  const hourly = [];
  const daily = [];

  const isRainScenario = scenario === 'rain' || districtName.toLowerCase().includes('ghaziabad');
  const isWindScenario = scenario === 'wind' || districtName.toLowerCase().includes('ludhiana');
  const isHeatScenario = scenario === 'heat' || districtName.toLowerCase().includes('jaipur');

  // Generate 72 hours
  for (let i = 0; i < 72; i++) {
    const time = new Date(now.getTime() + i * 3600 * 1000);
    const hour = time.getHours();
    const dayOffset = Math.floor(i / 24);

    let temp = 28;
    let rainProb = 15;
    let rainfall = 0;
    let windSpeed = 8;
    let humidity = 60;
    let code = 1;

    // Diurnal variation
    if (hour >= 12 && hour <= 16) {
      temp += 4;
      humidity -= 15;
    } else if (hour >= 2 && hour <= 6) {
      temp -= 5;
      humidity += 20;
    }

    if (isRainScenario) {
      // Heavy Rain concentrated Tomorrow (dayOffset === 1, hours 10 to 18)
      if (dayOffset === 1 && hour >= 9 && hour <= 18) {
        rainProb = 85;
        rainfall = hour === 13 ? 8.5 : 3.2;
        humidity = 88;
        temp = 25;
        code = 65;
        windSpeed = 12;
      } else if (dayOffset === 1 && hour > 18) {
        rainProb = 45;
        rainfall = 0.8;
        humidity = 82;
        code = 61;
      } else if (dayOffset === 2 && hour >= 6 && hour <= 11) {
        // Wednesday Morning: Perfect clear window!
        rainProb = 10;
        rainfall = 0;
        windSpeed = 7;
        temp = 24;
        humidity = 62;
        code = 0;
      } else {
        rainProb = 25;
        rainfall = 0;
        windSpeed = 9;
      }
    } else if (isWindScenario) {
      windSpeed = (hour >= 10 && hour <= 18) ? 22 : 11;
      rainProb = 5;
      temp = 30;
      code = 2;
    } else if (isHeatScenario) {
      temp = (hour >= 12 && hour <= 16) ? 38 : 29;
      humidity = 30;
      rainProb = 0;
      code = 0;
      windSpeed = 10;
    } else {
      // Normal / Ideal conditions
      rainProb = 10;
      rainfall = 0;
      windSpeed = (hour >= 6 && hour <= 10) ? 6 : 10;
      temp = (hour >= 6 && hour <= 10) ? 24 : 29;
      humidity = 60;
      code = 0;
    }

    hourly.push({
      time: time.toISOString(),
      temp: Math.round(temp),
      rainProb,
      rainfall,
      windSpeed: Math.round(windSpeed),
      humidity: Math.min(100, Math.max(20, Math.round(humidity))),
      weatherCode: code
    });
  }

  // Generate 7 daily summaries
  for (let d = 0; d < 7; d++) {
    const dayDate = new Date(now.getTime() + d * 24 * 3600 * 1000);
    const dayHours = hourly.slice(d * 24, (d + 1) * 24);
    const maxTemp = Math.max(...dayHours.map(h => h.temp));
    const minTemp = Math.min(...dayHours.map(h => h.temp));
    const maxRainProb = Math.max(...dayHours.map(h => h.rainProb));
    const totalRain = parseFloat(dayHours.reduce((s, h) => s + h.rainfall, 0).toFixed(1));
    const maxWind = Math.max(...dayHours.map(h => h.windSpeed));
    const dominantCode = dayHours.find(h => h.weatherCode >= 50)?.weatherCode || dayHours[12]?.weatherCode || 0;

    const weatherInfo = mapWeatherCode(dominantCode);

    daily.push({
      date: dayDate.toISOString(),
      dayLabel: getDayRelativeLabel(dayDate),
      maxTemp,
      minTemp,
      tempLabel: `${maxTemp}° / ${minTemp}°C`,
      rainProb: maxRainProb,
      totalRain,
      maxWind,
      weatherCode: dominantCode,
      icon: weatherInfo.icon,
      conditionEn: weatherInfo.conditionEn,
      conditionHi: weatherInfo.conditionHi
    });
  }

  return {
    locationName: districtName,
    stateName: 'India',
    source: 'Deterministic Agro Model (Simulated Radar)',
    current: {
      temp: hourly[0].temp,
      humidity: hourly[0].humidity,
      rainProb: hourly[0].rainProb,
      rainfall: hourly[0].rainfall,
      windSpeed: hourly[0].windSpeed,
      weatherCode: hourly[0].weatherCode,
      deltaT: calculateDeltaT(hourly[0].temp, hourly[0].humidity),
      icon: mapWeatherCode(hourly[0].weatherCode).icon,
      conditionEn: mapWeatherCode(hourly[0].weatherCode).conditionEn,
      conditionHi: mapWeatherCode(hourly[0].weatherCode).conditionHi
    },
    hourly,
    daily
  };
}

/**
 * Fetches Live Weather from Open-Meteo API for given coordinates with fallback
 */
export async function fetchLiveAgriculturalWeather(lat, lon, locationName = 'Meerut', stateName = 'Uttar Pradesh', scenario = null) {
  if (scenario) {
    return generateScenarioWeatherData(locationName, scenario);
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timezone=auto&forecast_days=7`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Weather API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Process hourly
    const hourly = [];
    const hData = data.hourly;
    if (hData && hData.time) {
      for (let i = 0; i < Math.min(hData.time.length, 72); i++) {
        hourly.push({
          time: hData.time[i],
          temp: Math.round(hData.temperature_2m[i] || 0),
          humidity: Math.round(hData.relative_humidity_2m[i] || 50),
          rainProb: Math.round(hData.precipitation_probability[i] || 0),
          rainfall: parseFloat((hData.precipitation[i] || 0).toFixed(1)),
          weatherCode: hData.weather_code[i] || 0,
          windSpeed: Math.round(hData.wind_speed_10m[i] || 0),
          windGusts: Math.round(hData.wind_gusts_10m[i] || hData.wind_speed_10m[i] * 1.3)
        });
      }
    }

    // Process daily
    const daily = [];
    const dData = data.daily;
    if (dData && dData.time) {
      for (let d = 0; d < dData.time.length; d++) {
        const dayDate = new Date(dData.time[d]);
        const dominantCode = dData.weather_code[d] || 0;
        const weatherInfo = mapWeatherCode(dominantCode);

        daily.push({
          date: dData.time[d],
          dayLabel: getDayRelativeLabel(dayDate),
          maxTemp: Math.round(dData.temperature_2m_max[d] || 0),
          minTemp: Math.round(dData.temperature_2m_min[d] || 0),
          tempLabel: `${Math.round(dData.temperature_2m_max[d])}° / ${Math.round(dData.temperature_2m_min[d])}°C`,
          rainProb: Math.round(dData.precipitation_probability_max[d] || 0),
          totalRain: parseFloat((dData.precipitation_sum[d] || 0).toFixed(1)),
          maxWind: Math.round(dData.wind_speed_10m_max[d] || 0),
          weatherCode: dominantCode,
          icon: weatherInfo.icon,
          conditionEn: weatherInfo.conditionEn,
          conditionHi: weatherInfo.conditionHi
        });
      }
    }

    const currentHour = hourly[0] || { temp: 28, humidity: 65, rainProb: 10, rainfall: 0, windSpeed: 8, weatherCode: 0 };
    const currentWeatherInfo = mapWeatherCode(currentHour.weatherCode);

    return {
      locationName,
      stateName,
      source: 'Open-Meteo Live Satellite Grid',
      current: {
        temp: currentHour.temp,
        humidity: currentHour.humidity,
        rainProb: currentHour.rainProb,
        rainfall: currentHour.rainfall,
        windSpeed: currentHour.windSpeed,
        weatherCode: currentHour.weatherCode,
        deltaT: calculateDeltaT(currentHour.temp, currentHour.humidity),
        icon: currentWeatherInfo.icon,
        conditionEn: currentWeatherInfo.conditionEn,
        conditionHi: currentWeatherInfo.conditionHi
      },
      hourly,
      daily
    };
  } catch (err) {
    console.warn("Using fallback weather generator:", err.message);
    return generateScenarioWeatherData(locationName, locationName.toLowerCase().includes('ghaziabad') ? 'rain' : 'ideal');
  }
}

/**
 * Searches Indian cities/districts via Open-Meteo Geocoding
 */
export async function searchLocations(query) {
  if (!query || query.trim().length < 2) return [];
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    if (data && data.results) {
      return data.results.map(item => ({
        id: `${item.name}-${item.latitude}`,
        name: item.name,
        state: item.admin1 || item.country || 'India',
        lat: item.latitude,
        lon: item.longitude,
        country: item.country
      }));
    }
    return [];
  } catch (e) {
    return DISTRICT_PRESETS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }
}

/**
 * Comprehensive Agricultural Decision Evaluation on the dataset
 */
export function generateAgriculturalDecision(weatherData, lang = 'en') {
  const isHi = lang === 'hi';
  const current = weatherData.current;
  const hourly = weatherData.hourly || [];
  const daily = weatherData.daily || [];

  // Tomorrow weather metrics
  const tomorrowDaily = daily[1] || daily[0];
  const tomorrowHours = hourly.filter((_, idx) => idx >= 24 && idx < 48);
  const tomorrowMaxRainProb = tomorrowDaily?.rainProb || Math.max(...(tomorrowHours.map(h => h.rainProb) || [0]));
  const tomorrowRainfall = tomorrowDaily?.totalRain || parseFloat((tomorrowHours.reduce((s, h) => s + h.rainfall, 0) || 0).toFixed(1));
  const tomorrowMaxWind = tomorrowDaily?.maxWind || Math.max(...(tomorrowHours.map(h => h.windSpeed) || [10]));

  // Compute 24-72h safe windows
  const safeWindows = calculateSafeSprayingWindows(hourly);
  const idealWindow = safeWindows.find(w => w.status === 'ideal') || safeWindows.find(w => w.status === 'marginal') || safeWindows[0];

  // Evaluate Overall Alert Level
  let alertType = 'safe'; // 'heavy_rain' | 'moderate_rain' | 'high_wind' | 'extreme_heat' | 'safe'
  let alertTitleEn = '';
  let alertTitleHi = '';
  let alertBannerColor = 'bg-emerald-50 border-emerald-300 text-emerald-950';
  let alertBadgeColor = 'bg-emerald-100 text-emerald-900';
  let statusIcon = '☀️';

  let recommendationEn = '';
  let recommendationHi = '';
  let subNoteEn = '';
  let subNoteHi = '';

  if (tomorrowMaxRainProb >= 70 || tomorrowRainfall >= 10 || current.rainProb >= 70) {
    alertType = 'heavy_rain';
    statusIcon = '🌧️';
    alertTitleEn = 'Heavy Rain Expected Tomorrow';
    alertTitleHi = 'कल भारी बारिश का अनुमान';
    alertBannerColor = 'bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent border-2 border-blue-400 text-blue-950';
    alertBadgeColor = 'bg-blue-200 text-blue-900';

    recommendationEn = 'Delay all foliar fertilizer and pesticide spraying until clear skies return.';
    recommendationHi = 'कीटनाशक व फोलियर खाद (यूरिया/NPK) का छिड़काव तुरंत रोकें, ताकि दवा पानी में बहकर बर्बाद न हो।';

    subNoteEn = idealWindow 
      ? `A safe spraying window is expected on ${idealWindow.slotTimeLabelEn} after rainfall subsides.`
      : 'A safer spraying window is expected once rainfall subsides on Wednesday.';
    subNoteHi = idealWindow
      ? `बारिश थमने के बाद ${idealWindow.slotTimeLabelHi} छिड़काव के लिए सुरक्षित समय रहेगा।`
      : 'बुधवार को बारिश थमने के बाद सुरक्षित छिड़काव विंडो बनेगी।';

  } else if (tomorrowMaxRainProb >= 35 || tomorrowRainfall >= 2) {
    alertType = 'moderate_rain';
    statusIcon = '🌦️';
    alertTitleEn = 'Scattered Showers Expected';
    alertTitleHi = 'कल हल्की से मध्यम बारिश की संभावना';
    alertBannerColor = 'bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent border-2 border-amber-400 text-amber-950';
    alertBadgeColor = 'bg-amber-200 text-amber-900';

    recommendationEn = 'Rain showers may wash off chemical deposits. Delay spraying or use rainfast sticker adjuvant.';
    recommendationHi = 'हल्की बारिश से दवा धुलने का खतरा है। छिड़काव टालें अथवा चिपको (Sticker/Adjuvant) का प्रयोग करें।';

    subNoteEn = idealWindow ? `Recommended window: ${idealWindow.slotTimeLabelEn}.` : 'Recheck hourly radar before chemical application.';
    subNoteHi = idealWindow ? `अनुशंसित समय: ${idealWindow.slotTimeLabelHi}।` : 'छिड़काव से पहले मौसम रडार पुनः जांचें।';

  } else if (tomorrowMaxWind >= 16 || current.windSpeed >= 16) {
    alertType = 'high_wind';
    statusIcon = '💨';
    alertTitleEn = 'High Wind Drift Warning';
    alertTitleHi = 'तेज हवा चेतावनी (स्प्रे बहाव का खतरा)';
    alertBannerColor = 'bg-gradient-to-br from-purple-500/15 via-purple-500/5 to-transparent border-2 border-purple-400 text-purple-950';
    alertBadgeColor = 'bg-purple-200 text-purple-900';

    recommendationEn = 'High wind speed will cause severe droplet drift and off-target contamination. Postpone spray.';
    recommendationHi = 'तेज हवा के कारण दवा पौधों पर टिकने के बजाय उड़ जाएगी। हवा शांत होने तक रुकें।';

    subNoteEn = idealWindow ? `Safe calm window: ${idealWindow.slotTimeLabelEn}.` : 'Wait for calm morning hours (4-10 km/h wind).';
    subNoteHi = idealWindow ? `शांत हवा का समय: ${idealWindow.slotTimeLabelHi}।` : 'सुबह के शांत समय (4-10 किमी/घंटा) का इंतजार करें।';

  } else if (current.temp >= 33 || tomorrowDaily?.maxTemp >= 34) {
    alertType = 'extreme_heat';
    statusIcon = '🌡️';
    alertTitleEn = 'High Heat & Evaporation Alert';
    alertTitleHi = 'अत्यधिक तापमान एवं वाष्पीकरण चेतावनी';
    alertBannerColor = 'bg-gradient-to-br from-orange-500/15 via-orange-500/5 to-transparent border-2 border-orange-400 text-orange-950';
    alertBadgeColor = 'bg-orange-200 text-orange-900';

    recommendationEn = 'High daytime temperatures trigger rapid spray droplet evaporation and leaf phytotoxicity burn.';
    recommendationHi = 'दोपहर की तेज धूप और गर्मी में छिड़काव करने से पत्तियां झुलस सकती हैं और दवा उड़ जाती है।';

    subNoteEn = 'Spray only during early morning (6 AM – 9 AM) or late cool evening.';
    subNoteHi = 'केवल सुबह 6 से 9 बजे अथवा शाम ढलने पर ही छिड़काव करें।';

  } else {
    alertType = 'safe';
    statusIcon = '☀️';
    alertTitleEn = 'Suitable Spraying Conditions';
    alertTitleHi = 'छिड़काव के लिए अनुकूल मौसम';
    alertBannerColor = 'bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent border-2 border-emerald-400 text-emerald-950';
    alertBadgeColor = 'bg-emerald-200 text-emerald-900';

    recommendationEn = 'Conditions are currently suitable for foliar fertilizer and pesticide application. Low rain probability and gentle wind expected.';
    recommendationHi = 'वर्तमान में मौसम पूरी तरह अनुकूल है। बारिश की न्यूनतम संभावना और शांत हवा के साथ फोलियर खाद व कीटनाशक का छिड़काव किया जा सकता है।';

    subNoteEn = 'Ideal window: morning 6:00 AM – 10:00 AM for maximum stomatal uptake.';
    subNoteHi = 'उत्तम समय: सुबह 6:00 से 10:00 बजे पत्तियों के रंध्र खुले रहने पर सर्वोत्तम अवशोषण।';
  }

  return {
    alertType,
    statusIcon,
    alertTitle: isHi ? alertTitleHi : alertTitleEn,
    alertTitleEn,
    alertTitleHi,
    alertBannerColor,
    alertBadgeColor,
    recommendation: isHi ? recommendationHi : recommendationEn,
    recommendationEn,
    recommendationHi,
    subNote: isHi ? subNoteHi : subNoteEn,
    subNoteEn,
    subNoteHi,
    safeWindows,
    idealWindow,
    stats: {
      rainProb: tomorrowMaxRainProb,
      rainfall: tomorrowRainfall,
      windSpeed: tomorrowMaxWind,
      temp: current.temp,
      humidity: current.humidity,
      deltaT: current.deltaT
    }
  };
}

/**
 * Chemical-specific rainfastness and spray guidelines
 */
export const CHEMICAL_SPRAY_GUIDELINES = [
  {
    categoryEn: 'Foliar Fertilizers (19:19:19 / Nano Urea)',
    categoryHi: 'फोलियर खाद (NPK 19:19:19 / नैनो यूरिया)',
    rainfastHours: '2 – 4 Hours',
    rainfastHoursHi: '2 से 4 घंटे',
    optimalWind: '4 – 10 km/h',
    bestTimeEn: 'Early morning (6 AM – 9:30 AM) when leaf stomata are open.',
    bestTimeHi: 'सुबह 6:00 से 9:30 बजे जब पत्तियों के रंध्र खुले हों।',
    icon: '🌱'
  },
  {
    categoryEn: 'Systemic Fungicides (Hexaconazole / Mancozeb)',
    categoryHi: 'फफूंदनाशक दवा (हेक्साकोनाजोल / मैंकोजेब)',
    rainfastHours: '4 – 6 Hours',
    rainfastHoursHi: '4 से 6 घंटे',
    optimalWind: '4 – 12 km/h',
    bestTimeEn: 'Avoid spraying when rain is forecasted within 6 hours.',
    bestTimeHi: 'यदि अगले 6 घंटे में बारिश की संभावना हो तो छिड़काव बिल्कुल न करें।',
    icon: '🛡️'
  },
  {
    categoryEn: 'Contact Insecticides & Bio-Pesticides (Neem Oil)',
    categoryHi: 'कीटनाशक व जैविक दवा (नीम तेल)',
    rainfastHours: '6 – 8 Hours',
    rainfastHoursHi: '6 से 8 घंटे',
    optimalWind: '3 – 8 km/h',
    bestTimeEn: 'Cool evening (4:30 PM – 6:30 PM) to avoid harming honeybees.',
    bestTimeHi: 'शाम 4:30 से 6:30 बजे ताकि मधुमक्खियों को नुकसान न पहुंचे।',
    icon: '🧪'
  },
  {
    categoryEn: 'Herbicides & Weed Control',
    categoryHi: 'खरपतवार नाशक (Herbicide)',
    rainfastHours: '4 – 6 Hours',
    rainfastHoursHi: '4 से 6 घंटे',
    optimalWind: '3 – 8 km/h (Strict drift limit)',
    bestTimeEn: 'Strictly avoid during wind gusts above 12 km/h to prevent crop burn.',
    bestTimeHi: 'हवा 12 किमी/घंटा से अधिक होने पर छिड़काव न करें, फसल को नुकसान हो सकता है।',
    icon: '🌿'
  }
];
