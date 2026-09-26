"""
🌡️ Environmental Data Service
Fetches live weather data (temperature, humidity, rain, altitude)
from the Open-Meteo API (free, no API key needed).
"""

import httpx


OPEN_METEO_WEATHER_URL = "https://api.open-meteo.com/v1/forecast"
OPEN_METEO_ELEVATION_URL = "https://api.open-meteo.com/v1/elevation"


async def fetch_environment_data(lat: float, lon: float) -> dict:
    """
    Fetch live environmental data for given coordinates.
    Returns temperature, humidity, rain, altitude, wind speed, and weather description.
    """
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            # ── Fetch current weather ──
            weather_params = {
                "latitude": lat,
                "longitude": lon,
                "current": "temperature_2m,relative_humidity_2m,rain,wind_speed_10m,weather_code",
                "timezone": "auto"
            }
            weather_resp = await client.get(OPEN_METEO_WEATHER_URL, params=weather_params)
            weather_data = weather_resp.json()

            # ── Fetch elevation ──
            elevation_params = {
                "latitude": lat,
                "longitude": lon
            }
            elevation_resp = await client.get(OPEN_METEO_ELEVATION_URL, params=elevation_params)
            elevation_data = elevation_resp.json()

        current = weather_data.get("current", {})
        temperature = current.get("temperature_2m", 28.0)
        humidity = current.get("relative_humidity_2m", 65.0)
        rain = current.get("rain", 0.0)
        wind_speed = current.get("wind_speed_10m", 5.0)
        weather_code = current.get("weather_code", 0)

        # Parse elevation
        elevations = elevation_data.get("elevation", [0.0])
        altitude = elevations[0] if isinstance(elevations, list) and elevations else 0.0

        # Convert WMO weather code to description
        weather_description = _wmo_code_to_description(weather_code)

        return {
            "success": True,
            "temperature": round(float(temperature), 1),
            "humidity": round(float(humidity), 1),
            "rain": round(float(rain), 1),
            "altitude": round(float(altitude), 1),
            "wind_speed": round(float(wind_speed), 1),
            "weather_description": weather_description,
            "location": f"{lat:.4f}°N, {lon:.4f}°E",
            "source": "Open-Meteo API"
        }

    except httpx.TimeoutException:
        return _fallback_data(lat, lon, "API request timed out")
    except httpx.ConnectError:
        return _fallback_data(lat, lon, "No internet connection")
    except Exception as e:
        return _fallback_data(lat, lon, str(e))


def _fallback_data(lat: float, lon: float, error: str) -> dict:
    """Provide fallback estimated data when API is unavailable."""
    # Rough temperature estimation based on latitude
    # Tropical (0-23°): ~30°C, Subtropical (23-35°): ~25°C, Temperate (35+°): ~18°C
    abs_lat = abs(lat)
    if abs_lat < 23:
        est_temp = 30.0
    elif abs_lat < 35:
        est_temp = 25.0
    else:
        est_temp = 18.0

    return {
        "success": True,
        "temperature": est_temp,
        "humidity": 65.0,
        "rain": 0.0,
        "altitude": 200.0,
        "wind_speed": 8.0,
        "weather_description": f"Estimated data (API unavailable: {error})",
        "location": f"{lat:.4f}°N, {lon:.4f}°E",
        "source": "Estimated (Open-Meteo offline)"
    }


def _wmo_code_to_description(code: int) -> str:
    """Convert WMO weather interpretation code to human-readable description."""
    wmo_codes = {
        0: "Clear sky ☀️",
        1: "Mainly clear 🌤️",
        2: "Partly cloudy ⛅",
        3: "Overcast ☁️",
        45: "Fog 🌫️",
        48: "Depositing rime fog 🌫️",
        51: "Light drizzle 🌦️",
        53: "Moderate drizzle 🌦️",
        55: "Dense drizzle 🌧️",
        56: "Light freezing drizzle 🌨️",
        57: "Dense freezing drizzle 🌨️",
        61: "Slight rain 🌧️",
        63: "Moderate rain 🌧️",
        65: "Heavy rain 🌧️🌧️",
        66: "Light freezing rain 🌨️",
        67: "Heavy freezing rain 🌨️",
        71: "Slight snowfall ❄️",
        73: "Moderate snowfall ❄️",
        75: "Heavy snowfall ❄️❄️",
        77: "Snow grains ❄️",
        80: "Slight rain showers 🌦️",
        81: "Moderate rain showers 🌧️",
        82: "Violent rain showers ⛈️",
        85: "Slight snow showers 🌨️",
        86: "Heavy snow showers 🌨️",
        95: "Thunderstorm ⛈️",
        96: "Thunderstorm with slight hail ⛈️",
        99: "Thunderstorm with heavy hail ⛈️⛈️"
    }
    return wmo_codes.get(code, f"Weather code {code}")
