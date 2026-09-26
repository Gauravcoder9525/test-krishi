/**
 * KrishiAI Real-Time Geolocation & Location Detection Service
 * Detects user GPS coordinates and reverse-geocodes to Indian District, City & State.
 */

import { DISTRICT_PRESETS } from './weatherEngine.js';

/**
 * Detect user's current live GPS location with reverse geocoding and fallback
 */
export async function detectUserLiveLocation() {
  // 1. Try Browser Geolocation API
  if (typeof window !== 'undefined' && 'geolocation' in navigator) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
      });

      const lat = parseFloat(position.coords.latitude.toFixed(4));
      const lon = parseFloat(position.coords.longitude.toFixed(4));

      // Reverse geocode coordinates to City / District / State
      const geoInfo = await reverseGeocodeCoordinates(lat, lon);

      return {
        id: `gps-${lat}-${lon}`,
        name: geoInfo.name,
        district: geoInfo.district,
        state: geoInfo.state,
        lat,
        lon,
        isGps: true,
        tag: '🎯 My Live Location'
      };
    } catch (geoError) {
      console.warn("Browser GPS permission denied or failed, attempting IP fallback:", geoError.message);
    }
  }

  // 2. IP-based location fallback
  try {
    const ipRes = await fetch('https://ipapi.co/json/');
    if (ipRes.ok) {
      const ipData = await ipRes.json();
      if (ipData && ipData.latitude && ipData.longitude) {
        return {
          id: `ip-${ipData.city}`,
          name: ipData.city || 'Meerut',
          district: ipData.region || ipData.city || 'Meerut',
          state: ipData.region || 'Uttar Pradesh',
          lat: parseFloat(ipData.latitude.toFixed(4)),
          lon: parseFloat(ipData.longitude.toFixed(4)),
          isGps: true,
          tag: '🌐 IP Location'
        };
      }
    }
  } catch (ipErr) {
    console.warn("IP Geolocation failed:", ipErr);
  }

  // 3. Fallback to default preset
  return {
    ...DISTRICT_PRESETS[1], // Meerut
    isGps: false
  };
}

/**
 * Reverse geocode latitude and longitude to locality, district, and state
 */
export async function reverseGeocodeCoordinates(lat, lon) {
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      
      const city = data.city || data.locality || data.principalSubdivision;
      const district = data.localityInfo?.administrative?.find(a => a.adminLevel === 6 || a.adminLevel === 5 || a.adminLevel === 4)?.name || city;
      const state = data.principalSubdivision || 'India';

      return {
        name: city || district || 'My Farm',
        district: district || city || 'Local District',
        state: state || 'India'
      };
    }
  } catch (err) {
    console.warn("Reverse geocode lookup error:", err);
  }

  return {
    name: 'Current Location',
    district: 'Local District',
    state: 'India'
  };
}
