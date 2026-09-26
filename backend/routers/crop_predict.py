"""
🌾 Crop Disease Prediction Router (PyTorch Model)
POST /api/crop-predict — Upload a crop/leaf image, get real ML prediction.

Uses the trained MobileNetV3-Large model (42 classes) from model-main.
Returns disease name, confidence, severity, crop type, agronomic analysis,
cure roadmap, organic/chemical controls, and nutritional recovery advice.
"""

from fastapi import APIRouter, HTTPException
from models.schemas import DiseaseDetectRequest
from utils.image_utils import decode_base64_image
from services.crop_model_service import predict_crop_disease, get_classifier

router = APIRouter(prefix="/api", tags=["Crop Disease Prediction (PyTorch Model)"])


@router.get("/crop-model-info")
async def crop_model_info():
    """Return model status and metadata."""
    try:
        clf = get_classifier()
        return {
            "success": True,
            "model_loaded": clf.model_loaded,
            "architecture": "MobileNetV3-Large (Transfer Learning)",
            "num_classes": len(clf.class_names),
            "device": str(clf.device),
            "class_names": clf.class_names
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


@router.post("/crop-predict")
async def predict_crop(request: DiseaseDetectRequest):
    """
    Analyze a crop/leaf image using the trained PyTorch MobileNetV3-Large model.

    Accepts: base64-encoded image (with or without data URI prefix).
    Returns: disease name, confidence, severity, agronomic analysis with
             cure roadmap, organic/chemical controls, and treatment advisory.
    """
    # 1. Decode image
    try:
        image = decode_base64_image(request.image)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image data: {str(e)}")

    # 2. Run PyTorch model inference
    try:
        result = predict_crop_disease(image)
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=f"Model not available: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

    # 3. Build response with agronomic data
    agro = result.get("agronomic_analysis", {})

    # Determine severity from agronomic DB
    severity = agro.get("severity", "Moderate")
    display_name = agro.get("display_name", result["prediction"])
    crop = agro.get("crop", "Unknown")
    category = agro.get("category", "Condition")

    # Check if healthy
    is_healthy = "healthy" in result["prediction"].lower()

    # Build recommendations from agronomic data
    recommendations = []
    if is_healthy:
        recommendations = [
            f"✅ {crop} crop appears healthy — continue routine monitoring",
            "Apply preventive foliar spray of micronutrients",
            "Scout for pests weekly to catch issues early",
            "Maintain optimal irrigation and fertilization schedule"
        ]
    else:
        # Combine cure roadmap steps as recommendations
        cure_roadmap = agro.get("cure_roadmap", [])
        for step in cure_roadmap:
            recommendations.append(f"📋 {step.get('day', '')}: {step.get('action', '')}")

        # Add immediate action
        if agro.get("immediate_action"):
            recommendations.insert(0, f"⚡ {agro['immediate_action']}")

    return {
        "success": True,
        "disease_name": display_name,
        "raw_class_name": result["prediction"],
        "confidence": round(result["confidence"] / 100, 4),
        "confidence_pct": f"{result['confidence']:.2f}%",
        "severity": severity if not is_healthy else "None",
        "crop": crop,
        "category": category,
        "bounding_boxes": [],
        "annotated_image": "",
        "recommendations": recommendations,
        "top_candidates": result.get("top_candidates", []),
        "agronomic_analysis": {
            "symptoms": agro.get("symptoms", ""),
            "environmental_factors": agro.get("environmental_factors", ""),
            "future_prediction": agro.get("future_prediction", {}),
            "cure_roadmap": agro.get("cure_roadmap", []),
            "organic_control": agro.get("organic_control", []),
            "chemical_control": agro.get("chemical_control", []),
            "nutritional_recovery": agro.get("nutritional_recovery", ""),
            "preventive_measures": agro.get("preventive_measures", ""),
        },
        "source": f"Krishi AI — MobileNetV3 PyTorch Model ({crop})",
        "model_ready": result.get("model_ready", False)
    }
