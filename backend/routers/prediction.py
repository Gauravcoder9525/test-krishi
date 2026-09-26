"""
🧪 Fertiliser Prediction Router
POST /api/prediction/fertilizer — Get fertiliser recommendation based on disease + soil + sensors.
"""

from fastapi import APIRouter
from models.schemas import FertiliserRequest
from services.fertiliser_service import predict_fertiliser

router = APIRouter(prefix="/api/prediction", tags=["Fertiliser Prediction"])


@router.post("/fertilizer")
async def get_fertiliser_prediction(payload: FertiliserRequest):
    """
    Get a complete fertiliser prescription based on:
    - Plant disease diagnosis
    - Soil type and condition
    - MQTT sensor data (moisture, temperature, humidity, rain)

    Returns: fertiliser name, dosage, spray timing, cost, subsidy, urgency.
    """
    result = predict_fertiliser(payload.model_dump())
    return result
