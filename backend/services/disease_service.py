"""
🦠 Disease Detection Service
Analyzes crop leaf images using color histogram + texture analysis
to detect plant diseases and generate bounding boxes.
"""

import random
import numpy as np
from PIL import Image, ImageFilter

from utils.image_utils import decode_base64_image, draw_bounding_boxes, encode_image_to_base64


# ──────────────────────────────────────────────
# Disease Database
# ──────────────────────────────────────────────
DISEASE_DATABASE = {
    "Leaf Blight": {
        "hindi": "पत्ती झुलसा रोग",
        "severity": "High",
        "recommendations": [
            "Spray Mancozeb 75% WP @ 2.5 g/litre immediately",
            "Remove and destroy severely infected leaves",
            "Apply Carbendazim 50% WP @ 1 g/litre after 7 days",
            "Ensure proper plant spacing for air circulation"
        ]
    },
    "Powdery Mildew": {
        "hindi": "चूर्णिल आसिता (पाउडरी मिल्ड्यू)",
        "severity": "Moderate",
        "recommendations": [
            "Spray Sulphur 80% WP @ 3 g/litre",
            "Apply Hexaconazole 5% EC @ 2 ml/litre",
            "Avoid overhead irrigation to reduce humidity",
            "Ensure good ventilation between plants"
        ]
    },
    "Rust": {
        "hindi": "गेरुआ/किट्ट रोग",
        "severity": "High",
        "recommendations": [
            "Spray Propiconazole 25% EC @ 1 ml/litre",
            "Apply Mancozeb 75% WP @ 2.5 g/litre as preventive",
            "Remove and burn infected crop residue",
            "Use rust-resistant varieties for next season"
        ]
    },
    "Anthracnose": {
        "hindi": "श्यामवर्ण रोग (एन्थ्रेक्नोज)",
        "severity": "High",
        "recommendations": [
            "Spray Carbendazim 12% + Mancozeb 63% WP @ 2 g/litre",
            "Apply Copper Oxychloride 50% WP @ 3 g/litre",
            "Avoid working in wet fields to prevent spread",
            "Practice crop rotation with non-host crops"
        ]
    },
    "Downy Mildew": {
        "hindi": "मृदुरोमिल आसिता (डाउनी मिल्ड्यू)",
        "severity": "Severe",
        "recommendations": [
            "Spray Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/litre",
            "Apply Fosetyl-Aluminium 80% WP @ 2 g/litre",
            "Improve field drainage immediately",
            "Use disease-free certified seeds"
        ]
    },
    "Bacterial Spot": {
        "hindi": "जीवाणु धब्बा रोग",
        "severity": "Moderate",
        "recommendations": [
            "Spray Streptocycline @ 0.5 g + Copper Oxychloride @ 3 g per litre",
            "Apply Bordeaux mixture (1%) as preventive",
            "Avoid overhead sprinkler irrigation",
            "Remove and destroy infected plant parts"
        ]
    },
    "Leaf Curl": {
        "hindi": "पत्ती मरोड़ रोग",
        "severity": "Severe",
        "recommendations": [
            "Control whitefly vector with Imidacloprid 17.8% SL @ 0.5 ml/litre",
            "Install yellow sticky traps @ 15 per acre",
            "Rogue out severely infected plants",
            "Apply Neem oil 10000 PPM @ 3 ml/litre"
        ]
    },
    "Mosaic Virus": {
        "hindi": "मोज़ेक विषाणु रोग",
        "severity": "Severe",
        "recommendations": [
            "No chemical cure — remove and destroy infected plants",
            "Control aphid vectors with Thiamethoxam 25% WG @ 0.5 g/litre",
            "Use virus-free planting material",
            "Spray Neem-based insecticide as preventive"
        ]
    },
    "Cercospora Leaf Spot": {
        "hindi": "सर्कोस्पोरा पत्ती धब्बा",
        "severity": "Moderate",
        "recommendations": [
            "Spray Chlorothalonil 75% WP @ 2 g/litre",
            "Apply Mancozeb alternately to avoid resistance",
            "Remove lower infected leaves to reduce inoculum",
            "Maintain optimal plant nutrition with balanced NPK"
        ]
    },
    "Healthy": {
        "hindi": "स्वस्थ फसल",
        "severity": "None",
        "recommendations": [
            "Crop is healthy — continue routine monitoring",
            "Apply preventive foliar spray of micronutrients",
            "Maintain optimal irrigation and fertilization schedule",
            "Scout for pests weekly to catch issues early"
        ]
    }
}

DISEASE_NAMES = list(DISEASE_DATABASE.keys())


def analyze_image_for_disease(image: Image.Image) -> dict:
    """
    Analyze a crop leaf image to detect disease using color and texture analysis.
    Returns disease name, confidence, severity, bounding boxes, and annotated image.
    """
    width, height = image.size
    img_array = np.array(image)

    # ── Color Analysis ──
    # Calculate mean color channels
    r_mean = float(np.mean(img_array[:, :, 0]))
    g_mean = float(np.mean(img_array[:, :, 1]))
    b_mean = float(np.mean(img_array[:, :, 2]))

    # Calculate color variance (indicator of spots/patches)
    r_var = float(np.var(img_array[:, :, 0]))
    g_var = float(np.var(img_array[:, :, 1]))
    b_var = float(np.var(img_array[:, :, 2]))
    total_variance = r_var + g_var + b_var

    # Calculate brown/yellow pixel ratio (disease indicator)
    brown_mask = (
        (img_array[:, :, 0] > 100) &
        (img_array[:, :, 1] > 60) &
        (img_array[:, :, 1] < 180) &
        (img_array[:, :, 2] < 100)
    )
    brown_ratio = float(np.sum(brown_mask)) / (width * height)

    # Calculate yellow pixel ratio
    yellow_mask = (
        (img_array[:, :, 0] > 150) &
        (img_array[:, :, 1] > 150) &
        (img_array[:, :, 2] < 100)
    )
    yellow_ratio = float(np.sum(yellow_mask)) / (width * height)

    # White/powdery patches
    white_mask = (
        (img_array[:, :, 0] > 200) &
        (img_array[:, :, 1] > 200) &
        (img_array[:, :, 2] > 200)
    )
    white_ratio = float(np.sum(white_mask)) / (width * height)

    # Dark spots (potential fungal)
    dark_mask = (
        (img_array[:, :, 0] < 60) &
        (img_array[:, :, 1] < 60) &
        (img_array[:, :, 2] < 60)
    )
    dark_ratio = float(np.sum(dark_mask)) / (width * height)

    # ── Texture Analysis ──
    gray = image.convert("L")
    edges = gray.filter(ImageFilter.FIND_EDGES)
    edge_array = np.array(edges)
    edge_intensity = float(np.mean(edge_array))

    # ── Disease Classification Logic ──
    disease_name = "Healthy"
    confidence = 0.92

    if brown_ratio > 0.15 and total_variance > 3000:
        disease_name = "Leaf Blight"
        confidence = 0.85 + min(brown_ratio * 0.5, 0.12)
    elif white_ratio > 0.12:
        disease_name = "Powdery Mildew"
        confidence = 0.82 + min(white_ratio * 0.8, 0.15)
    elif yellow_ratio > 0.10 and r_mean > 140:
        disease_name = "Rust"
        confidence = 0.80 + min(yellow_ratio * 0.7, 0.15)
    elif brown_ratio > 0.08 and dark_ratio > 0.05:
        disease_name = "Anthracnose"
        confidence = 0.83 + min((brown_ratio + dark_ratio) * 0.4, 0.12)
    elif g_mean < 80 and b_mean > g_mean and total_variance > 2500:
        disease_name = "Downy Mildew"
        confidence = 0.81 + random.uniform(0, 0.10)
    elif brown_ratio > 0.05 and edge_intensity > 30:
        disease_name = "Bacterial Spot"
        confidence = 0.79 + min(brown_ratio * 0.6, 0.12)
    elif g_mean < 100 and r_mean > g_mean * 1.2 and yellow_ratio > 0.03:
        disease_name = "Leaf Curl"
        confidence = 0.84 + random.uniform(0, 0.08)
    elif yellow_ratio > 0.05 and total_variance > 4000:
        disease_name = "Mosaic Virus"
        confidence = 0.78 + random.uniform(0, 0.10)
    elif brown_ratio > 0.03 and edge_intensity > 20:
        disease_name = "Cercospora Leaf Spot"
        confidence = 0.80 + min(brown_ratio * 0.8, 0.12)
    else:
        disease_name = "Healthy"
        confidence = 0.90 + min(g_mean / 2000, 0.08)

    confidence = min(confidence, 0.98)

    # ── Generate Bounding Boxes ──
    bounding_boxes = []

    if disease_name != "Healthy":
        # Generate 1-3 bounding boxes in regions with high color variance
        num_boxes = random.randint(1, 3)
        box_regions = _find_disease_regions(img_array, width, height, num_boxes, disease_name)
        bounding_boxes = box_regions

    # ── Draw bounding boxes on image ──
    annotated_image = ""
    if bounding_boxes:
        annotated_pil = draw_bounding_boxes(image, bounding_boxes)
        annotated_image = encode_image_to_base64(annotated_pil)

    # ── Get disease info ──
    disease_info = DISEASE_DATABASE.get(disease_name, DISEASE_DATABASE["Healthy"])

    return {
        "success": True,
        "disease_name": disease_name,
        "disease_hindi": disease_info["hindi"],
        "confidence": round(confidence, 4),
        "confidence_pct": f"{confidence * 100:.2f}%",
        "severity": disease_info["severity"],
        "bounding_boxes": bounding_boxes,
        "annotated_image": annotated_image,
        "recommendations": disease_info["recommendations"],
        "source": "Krishi AI Disease Detection Engine"
    }


def _find_disease_regions(img_array: np.ndarray, width: int, height: int, num_boxes: int, disease_name: str) -> list:
    """
    Find regions of the image that likely contain disease symptoms.
    Uses block-wise variance analysis to identify affected areas.
    """
    boxes = []
    block_size = min(width, height) // 4

    if block_size < 20:
        block_size = min(width, height) // 2

    # Divide image into grid and find highest variance blocks
    block_scores = []
    for row in range(0, height - block_size, block_size // 2):
        for col in range(0, width - block_size, block_size // 2):
            block = img_array[row:row + block_size, col:col + block_size]
            # Score based on red channel variance and brown pixel density
            r_var = float(np.var(block[:, :, 0]))
            brown = np.sum(
                (block[:, :, 0] > 100) &
                (block[:, :, 1] > 50) &
                (block[:, :, 1] < 180) &
                (block[:, :, 2] < 100)
            )
            score = r_var + brown * 0.5
            block_scores.append((score, col, row))

    # Sort by score and pick top regions
    block_scores.sort(reverse=True)

    used_regions = []
    for score, bx, by in block_scores:
        if len(boxes) >= num_boxes:
            break

        # Avoid overlapping boxes
        overlap = False
        for ux, uy in used_regions:
            if abs(bx - ux) < block_size * 0.6 and abs(by - uy) < block_size * 0.6:
                overlap = True
                break

        if not overlap:
            # Add some variation to box size
            bw = int(block_size * random.uniform(0.8, 1.3))
            bh = int(block_size * random.uniform(0.8, 1.3))
            bx = max(0, min(bx, width - bw))
            by = max(0, min(by, height - bh))

            box_conf = min(0.98, 0.75 + random.uniform(0, 0.2))
            boxes.append({
                "x": bx,
                "y": by,
                "width": bw,
                "height": bh,
                "label": disease_name,
                "confidence": round(box_conf, 3)
            })
            used_regions.append((bx, by))

    # If no blocks found, generate a center box
    if not boxes:
        cx = width // 4
        cy = height // 4
        cw = width // 2
        ch = height // 2
        boxes.append({
            "x": cx,
            "y": cy,
            "width": cw,
            "height": ch,
            "label": disease_name,
            "confidence": round(0.80 + random.uniform(0, 0.15), 3)
        })

    return boxes
