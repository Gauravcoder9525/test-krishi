"""
🌍 Soil Classification Router
POST /api/soil-classify — Classify soil into Red/Black/Clay/Alluvial.
POST /api/soil-anomaly  — Check if image is valid soil or non-soil.
"""

from fastapi import APIRouter, HTTPException
from models.schemas import SoilClassifyRequest, SoilAnomalyRequest
from utils.image_utils import decode_base64_image
from services.soil_service import classify_soil_image, check_soil_anomaly

router = APIRouter(prefix="/api", tags=["Soil Classification"])


@router.post("/soil-classify")
async def classify_soil(request: SoilClassifyRequest):
    """
    Classify a soil image into one of four types:
    Red Soil, Black Soil, Clay Soil, Alluvial Soil.
    """
    try:
        image = decode_base64_image(request.image)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image data: {str(e)}")

    try:
        result = classify_soil_image(image)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Soil classification failed: {str(e)}")


@router.post("/soil-anomaly")
async def soil_anomaly(request: SoilAnomalyRequest):
    """
    Check if the uploaded image contains valid agricultural soil
    or is a non-soil outlier (e.g., cat, car, building).
    """
    try:
        image = decode_base64_image(request.image)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image data: {str(e)}")

    try:
        result = check_soil_anomaly(image)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Anomaly detection failed: {str(e)}")


@router.post("/soil-batch")
async def soil_batch(request: SoilClassifyRequest):
    """
    Batch soil classification endpoint (same as classify for single image).
    """
    try:
        image = decode_base64_image(request.image)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image data: {str(e)}")

    try:
        result = classify_soil_image(image)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Batch classification failed: {str(e)}")
