"""
Pydantic request/response models for all Krishi AI Backend APIs.
"""

from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any


# ──────────────────────────────────────────────
# Disease Detection
# ──────────────────────────────────────────────

class DiseaseDetectRequest(BaseModel):
    image: str = Field(..., description="Base64-encoded image (with or without data URI prefix)")

class BoundingBox(BaseModel):
    x: int
    y: int
    width: int
    height: int
    label: str
    confidence: float

class DiseaseDetectResponse(BaseModel):
    success: bool = True
    disease_name: str
    disease_hindi: str = ""
    confidence: float
    confidence_pct: str
    severity: str = "Moderate"
    bounding_boxes: List[BoundingBox] = []
    annotated_image: str = ""
    recommendations: List[str] = []
    source: str = "Krishi AI Disease Detection Engine"


# ──────────────────────────────────────────────
# Soil Classification
# ──────────────────────────────────────────────

class SoilClassifyRequest(BaseModel):
    image: str = Field(..., description="Base64-encoded soil image")

class SoilMetadata(BaseModel):
    ph_range: str = ""
    water_retention: str = ""
    suitable_crops: List[str] = []
    nutrients: str = ""
    description: str = ""
    region: str = ""

class SoilClassifyResponse(BaseModel):
    success: bool = True
    soil_class: str = Field(..., alias="class")
    confidence: float
    confidence_pct: str
    probabilities: Dict[str, float] = {}
    metadata: Optional[SoilMetadata] = None
    source: str = "Krishi AI Soil Classification Engine"

    class Config:
        populate_by_name = True

class SoilAnomalyRequest(BaseModel):
    image: str

class SoilAnomalyResponse(BaseModel):
    success: bool = True
    is_valid_soil: bool
    soil_confidence: str
    status_label: str
    spectral_match: str
    soil_type_hint: str = "Multi-class compatible"


# ──────────────────────────────────────────────
# Environmental Data
# ──────────────────────────────────────────────

class EnvironmentResponse(BaseModel):
    success: bool = True
    temperature: float
    humidity: float
    rain: float
    altitude: float
    wind_speed: float = 0.0
    weather_description: str = ""
    location: str = ""
    source: str = "Open-Meteo API"


# ──────────────────────────────────────────────
# Blockchain
# ──────────────────────────────────────────────

class FarmerRequestPayload(BaseModel):
    farmerName: str = "Rameshwar Sharma (Kisan)"
    farmerId: str = "KISAN-7829"
    location: str = "Ghaziabad, Uttar Pradesh"
    crop: str = "Pearl Millet (Bajra)"
    plantDiseaseData: Optional[Dict[str, Any]] = None
    mqttData: Optional[Dict[str, Any]] = None
    soilData: Optional[Dict[str, Any]] = None
    leaves: Optional[Dict[str, str]] = None
    merkleRoot: Optional[str] = None

class BlockResponse(BaseModel):
    success: bool = True
    message: str = ""
    block: Optional[Dict[str, Any]] = None

class CompanySolutionPayload(BaseModel):
    companyName: str = "IFFCO Precision Agri-Chemicals & Bio-Solutions"
    companyId: str = "IFFCO-IND-409"
    prescription: Optional[Dict[str, Any]] = None
    officerNotes: str = "Approved by Chief Agronomist"

class CompanySolutionResponse(BaseModel):
    success: bool = True
    message: str = ""
    result: Optional[Dict[str, Any]] = None

class ChainResponse(BaseModel):
    success: bool = True
    blocks: List[Dict[str, Any]] = []
    length: int = 0


# ──────────────────────────────────────────────
# Fertiliser Prediction
# ──────────────────────────────────────────────

class FertiliserRequest(BaseModel):
    plantDiseaseData: Optional[Dict[str, Any]] = None
    mqttData: Optional[Dict[str, Any]] = None
    soilData: Optional[Dict[str, Any]] = None

class FertiliserPrediction(BaseModel):
    problemSummary: str
    recommendedFertilizer: str
    category: str
    dosage: str
    sprayTiming: str
    sprayFrequency: str
    estimatedPriceINR: int
    costPerAcre: str
    subsidyINR: int
    netPriceINR: int
    safetyWindow: str
    rainfastness: str
    totalMix: str
    soilAction: str
    urgency: str

class FertiliserResponse(BaseModel):
    success: bool = True
    data: Optional[FertiliserPrediction] = None
