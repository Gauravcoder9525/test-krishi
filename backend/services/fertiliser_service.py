"""
🧪 Fertiliser Prediction Service
Multi-modal agronomic expert engine that recommends fertilisers
based on disease diagnosis, soil type, and sensor data.
"""

from typing import Any, Dict, Optional


# ──────────────────────────────────────────────
# Fertiliser Knowledge Base
# ──────────────────────────────────────────────
DISEASE_FERTILISER_MAP = {
    "Leaf Blight": {
        "recommendedFertilizer": "Mancozeb 75% WP + Carbendazim 50% WP",
        "category": "Systemic + Contact Fungicide Combo",
        "dosage": "2.5 g + 1 g per Litre",
        "sprayFrequency": "2 Sprays (10-day gap)",
        "estimatedPriceINR": 420,
        "subsidyINR": 100,
    },
    "Powdery Mildew": {
        "recommendedFertilizer": "Sulphur 80% WP + Hexaconazole 5% EC",
        "category": "Contact Fungicide + Triazole",
        "dosage": "3 g + 2 ml per Litre",
        "sprayFrequency": "2 Sprays (7-day gap)",
        "estimatedPriceINR": 380,
        "subsidyINR": 90,
    },
    "Rust": {
        "recommendedFertilizer": "Propiconazole 25% EC",
        "category": "Systemic Triazole Fungicide",
        "dosage": "1.0 ml per Litre",
        "sprayFrequency": "2 Sprays (10-day gap)",
        "estimatedPriceINR": 520,
        "subsidyINR": 130,
    },
    "Anthracnose": {
        "recommendedFertilizer": "Carbendazim 12% + Mancozeb 63% WP (Saaf)",
        "category": "Broad-Spectrum Combo Fungicide",
        "dosage": "2.0 g per Litre",
        "sprayFrequency": "2-3 Sprays (7-day gap)",
        "estimatedPriceINR": 460,
        "subsidyINR": 110,
    },
    "Downy Mildew": {
        "recommendedFertilizer": "Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold)",
        "category": "Systemic + Protective Fungicide",
        "dosage": "2.5 g per Litre",
        "sprayFrequency": "2 Sprays (7-day gap)",
        "estimatedPriceINR": 680,
        "subsidyINR": 170,
    },
    "Bacterial Spot": {
        "recommendedFertilizer": "Streptocycline + Copper Oxychloride 50% WP",
        "category": "Antibiotic + Copper Fungicide",
        "dosage": "0.5 g + 3 g per Litre",
        "sprayFrequency": "3 Sprays (5-day gap)",
        "estimatedPriceINR": 350,
        "subsidyINR": 80,
    },
    "Leaf Curl": {
        "recommendedFertilizer": "Imidacloprid 17.8% SL + Neem Oil 10000 PPM",
        "category": "Systemic Insecticide + Bio-Repellent",
        "dosage": "0.5 ml + 3 ml per Litre",
        "sprayFrequency": "2 Sprays (10-day gap)",
        "estimatedPriceINR": 440,
        "subsidyINR": 110,
    },
    "Mosaic Virus": {
        "recommendedFertilizer": "Thiamethoxam 25% WG + Neem Extract",
        "category": "Vector Control Insecticide + Bio-Agent",
        "dosage": "0.5 g + 3 ml per Litre",
        "sprayFrequency": "2 Sprays (7-day gap) for vector control only",
        "estimatedPriceINR": 400,
        "subsidyINR": 100,
    },
    "Cercospora Leaf Spot": {
        "recommendedFertilizer": "Chlorothalonil 75% WP + Mancozeb 75% WP",
        "category": "Contact Fungicide Rotation",
        "dosage": "2 g per Litre (alternate sprays)",
        "sprayFrequency": "3 Sprays (7-day gap)",
        "estimatedPriceINR": 390,
        "subsidyINR": 95,
    },
}

SOIL_NUTRITION_MAP = {
    "Red": {
        "deficiency": "Nitrogen, Phosphorus & Humus",
        "boost": "DAP 50 kg + Urea 40 kg + FYM 2 tonnes per acre",
        "action_modifier": "needs heavy organic matter supplement"
    },
    "Black": {
        "deficiency": "Nitrogen & Phosphorus (rich in Ca, Mg)",
        "boost": "Urea 45 kg + SSP 75 kg per acre",
        "action_modifier": "holds moisture well; avoid overwatering"
    },
    "Clay": {
        "deficiency": "Aeration & drainage issues",
        "boost": "Gypsum 100 kg + Vermicompost 1 tonne per acre",
        "action_modifier": "improve drainage before fertiliser application"
    },
    "Alluvial": {
        "deficiency": "Moderate Nitrogen & Phosphorus",
        "boost": "DAP 50 kg + MOP 30 kg + Zinc Sulphate 5 kg per acre",
        "action_modifier": "highly fertile; balanced NPK maintains productivity"
    }
}


def predict_fertiliser(payload: dict) -> dict:
    """
    Generate a complete fertiliser prescription based on:
    - Plant disease diagnosis
    - Soil type and condition
    - MQTT sensor data (moisture, temperature, humidity)
    """
    plant_data = payload.get("plantDiseaseData") or {}
    mqtt_data = payload.get("mqttData") or {}
    soil_data = payload.get("soilData") or {}

    disease_name = plant_data.get("disease", "Pearl Millet Downy Mildew / Rust")
    is_healthy = "healthy" in disease_name.lower()

    moisture = mqtt_data.get("soil1", 43.5)
    temperature = mqtt_data.get("temperature", 28.2)
    humidity_val = mqtt_data.get("humidity", 64)
    rain = mqtt_data.get("rain", False)

    soil_type_raw = soil_data.get("soilType", "Red Soil (लाल मिट्टी)")

    # Parse soil type key
    soil_key = "Alluvial"
    for key in ["Red", "Black", "Clay", "Alluvial"]:
        if key.lower() in soil_type_raw.lower():
            soil_key = key
            break

    soil_info = SOIL_NUTRITION_MAP.get(soil_key, SOIL_NUTRITION_MAP["Alluvial"])

    if is_healthy:
        return {
            "success": True,
            "data": {
                "problemSummary": f"Crop foliage is healthy. Soil ({soil_type_raw}) moisture is {moisture}% at {temperature}°C. Recommended preventive nutrition boost.",
                "recommendedFertilizer": "Bio-NPK 19:19:19 + Zinc Micronutrient Booster",
                "category": "Bio-Fertilizer & Plant Nutrition Booster",
                "dosage": "2.0 g / Litre",
                "sprayTiming": "06:30 AM – 08:30 AM",
                "sprayFrequency": "1 Maintenance Spray (15-day gap)",
                "estimatedPriceINR": 320,
                "costPerAcre": "₹320 / एकड़",
                "subsidyINR": 80,
                "netPriceINR": 240,
                "safetyWindow": "2.5 Hours Safe",
                "rainfastness": "2.5 Hours Safe",
                "totalMix": "200 Litres total tank mix per acre",
                "soilAction": f"Soil ({soil_key}) moisture ({moisture}%) is optimal for nutrient uptake. {soil_info['boost']}",
                "urgency": "Low (Preventive)"
            }
        }

    # Find matching disease fertiliser
    matched_fert = None
    for d_name, d_fert in DISEASE_FERTILISER_MAP.items():
        if d_name.lower() in disease_name.lower():
            matched_fert = d_fert
            break

    if not matched_fert:
        # Default to Downy Mildew treatment for unknown diseases
        matched_fert = DISEASE_FERTILISER_MAP["Downy Mildew"]

    estimated_price = matched_fert["estimatedPriceINR"]
    subsidy = matched_fert["subsidyINR"]
    net_price = estimated_price - subsidy

    # Adjust urgency based on sensor data
    if moisture < 30 or temperature > 38:
        urgency = "Critical (Immediate Action Required)"
    elif rain:
        urgency = "High (Wait for rain to stop, then spray within 6 hours)"
    else:
        urgency = "High (Immediate Spray Needed)"

    # Spray timing adjustment
    if temperature > 35:
        spray_timing = "05:30 AM – 07:30 AM (Early morning only due to high heat)"
    elif humidity_val > 85:
        spray_timing = "07:00 AM – 09:00 AM (After dew dries)"
    else:
        spray_timing = "06:30 AM – 08:30 AM"

    # Rainfastness
    rainfastness = "3 Hours Safe" if rain else "2.5 Hours Safe"
    safety_window = rainfastness

    return {
        "success": True,
        "data": {
            "problemSummary": f'Detected "{disease_name}" on crop. Soil ({soil_type_raw}) moisture is {moisture}% at {temperature}°C. {soil_info["action_modifier"].capitalize()}. Rapid curative treatment required.',
            "recommendedFertilizer": matched_fert["recommendedFertilizer"],
            "category": matched_fert["category"],
            "dosage": matched_fert["dosage"],
            "sprayTiming": spray_timing,
            "sprayFrequency": matched_fert["sprayFrequency"],
            "estimatedPriceINR": estimated_price,
            "costPerAcre": f"₹{estimated_price} / एकड़",
            "subsidyINR": subsidy,
            "netPriceINR": net_price,
            "safetyWindow": safety_window,
            "rainfastness": rainfastness,
            "totalMix": "200 Litres total tank mix per acre",
            "soilAction": f"Soil ({soil_key}) moisture ({moisture}%) is within safe absorption range. Additional soil treatment: {soil_info['boost']}",
            "urgency": urgency
        }
    }
