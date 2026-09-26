"""
🦠 Disease Detection Router
POST /api/disease-detect — Upload crop photo, detect disease, return red bounding boxes.
"""

from fastapi import APIRouter, HTTPException
from models.schemas import DiseaseDetectRequest
from utils.image_utils import decode_base64_image
from services.disease_service import analyze_image_for_disease

router = APIRouter(prefix="/api", tags=["Disease Detection"])


@router.post("/disease-detect")
async def detect_disease(request: DiseaseDetectRequest):
    """
    Analyze a crop leaf photo to detect plant disease.
    Returns disease name, confidence, severity, red bounding boxes, and annotated image.
    """
    try:
        image = decode_base64_image(request.image)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image data: {str(e)}")

    try:
        result = analyze_image_for_disease(image)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Disease detection failed: {str(e)}")


@router.post("/disease-classify")
async def classify_disease(request: DiseaseDetectRequest):
    """
    Alias endpoint for /api/disease-detect (compatibility with existing frontend).
    """
    try:
        image = decode_base64_image(request.image)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image data: {str(e)}")

    try:
        result = analyze_image_for_disease(image)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Disease classification failed: {str(e)}")
