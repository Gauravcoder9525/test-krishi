"""
🌡️ Environmental Data Router
GET /api/environment — Fetch live temperature, humidity, rain, altitude.
"""

from fastapi import APIRouter, Query
from services.environment_service import fetch_environment_data

router = APIRouter(prefix="/api", tags=["Environmental Data"])


@router.get("/environment")
async def get_environment(
    lat: float = Query(28.6692, description="Latitude"),
    lon: float = Query(77.4538, description="Longitude")
):
    """
    Fetch live environmental data from Open-Meteo API.
    Returns temperature (°C), humidity (%), rain (mm), altitude (m), wind speed (km/h).
    """
    result = await fetch_environment_data(lat, lon)
    return result
