"""
🌾 Crop Disease Model Service
Loads the trained MobileNetV3-Large PyTorch model once at startup.
Reuses the exact preprocessing pipeline and inference logic from model-main/model_inference.py.

Model: best_crop_model.pth (42 classes across Cotton, Rice, Wheat, Maize, Sugarcane)
Architecture: MobileNetV3-Large with custom classifier head
"""

import os
import json
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

# Import the agronomic database from the copied model assets
from ml_model.agronomic_db import get_agronomic_analysis

# ──────────────────────────────────────────────
# Paths — relative to backend/ directory
# ──────────────────────────────────────────────
_BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_MODEL_DIR = os.path.join(_BASE_DIR, "ml_model")
_MODEL_PATH = os.path.join(_MODEL_DIR, "best_crop_model.pth")
_CLASS_NAMES_PATH = os.path.join(_MODEL_DIR, "class_names.json")


class CropClassifier:
    """
    Singleton crop disease classifier.
    Loads the trained MobileNetV3-Large model and class names once.
    Provides predict(pil_image) → dict with disease name, confidence, agronomic analysis.
    """

    def __init__(self):
        self.device = torch.device("mps") if torch.backends.mps.is_available() else (
            torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
        )
        self.class_names = []
        self.model = None
        self.model_loaded = False

        # Exact same preprocessing as model-main/model_inference.py
        self.transform = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])

        self._load_classes()
        self._load_model()

    def _load_classes(self):
        """Load class names from class_names.json."""
        if os.path.exists(_CLASS_NAMES_PATH):
            with open(_CLASS_NAMES_PATH, "r") as f:
                self.class_names = json.load(f)
            print(f"✅ Loaded {len(self.class_names)} class names from {_CLASS_NAMES_PATH}")
        else:
            print(f"⚠️ class_names.json not found at {_CLASS_NAMES_PATH}")

    def _load_model(self):
        """Load the trained MobileNetV3-Large model from checkpoint."""
        num_classes = len(self.class_names) if self.class_names else 42

        # Build the MobileNetV3-Large architecture (no pretrained weights needed
        # since we load our own trained checkpoint on top)
        try:
            # Try with pretrained weights first (matches original model_inference.py)
            import ssl
            ssl._create_default_https_context = ssl._create_unverified_context
            weights = models.MobileNet_V3_Large_Weights.DEFAULT
            model = models.mobilenet_v3_large(weights=weights)
        except Exception:
            # Fallback: build architecture without pretrained weights
            model = models.mobilenet_v3_large(weights=None)
        in_features = model.classifier[3].in_features
        model.classifier[3] = nn.Linear(in_features, num_classes)

        if os.path.exists(_MODEL_PATH):
            try:
                checkpoint = torch.load(_MODEL_PATH, map_location=self.device)
                if isinstance(checkpoint, dict) and "model_state_dict" in checkpoint:
                    model.load_state_dict(checkpoint["model_state_dict"])
                    if "class_names" in checkpoint:
                        self.class_names = checkpoint["class_names"]
                else:
                    model.load_state_dict(checkpoint)
                print(f"✅ Loaded trained model weights from {_MODEL_PATH}")
                self.model_loaded = True
            except Exception as e:
                print(f"❌ Failed to load model checkpoint: {e}")
                self.model_loaded = False
        else:
            print(f"❌ Model checkpoint not found at {_MODEL_PATH}")
            self.model_loaded = False

        model = model.to(self.device)
        model.eval()
        self.model = model

    def predict(self, pil_image: Image.Image, top_k: int = 5) -> dict:
        """
        Run inference on a PIL Image.
        Returns dict with prediction, confidence, top_candidates, agronomic_analysis.
        """
        if not self.model_loaded:
            raise RuntimeError("Model not loaded — checkpoint missing or failed to load")

        image = pil_image.convert("RGB")
        tensor = self.transform(image).unsqueeze(0).to(self.device)

        with torch.no_grad():
            outputs = self.model(tensor)
            probabilities = torch.softmax(outputs, dim=1)[0]

        top_probs, top_indices = torch.topk(probabilities, min(top_k, len(self.class_names)))

        results = []
        for prob, idx in zip(top_probs, top_indices):
            class_name = self.class_names[idx.item()]
            conf = float(prob.item() * 100)
            results.append({
                "class_name": class_name,
                "confidence": round(conf, 2),
                "crop": get_agronomic_analysis(class_name).get("crop", "Unknown")
            })

        top_prediction = results[0]
        agronomic_data = get_agronomic_analysis(top_prediction["class_name"])

        return {
            "prediction": top_prediction["class_name"],
            "confidence": top_prediction["confidence"],
            "top_candidates": results,
            "agronomic_analysis": agronomic_data,
            "model_ready": self.model_loaded
        }


# ──────────────────────────────────────────────
# Global singleton — loaded once when the service is first imported
# ──────────────────────────────────────────────
_classifier = None


def get_classifier() -> CropClassifier:
    """Get or create the singleton CropClassifier instance."""
    global _classifier
    if _classifier is None:
        print("🌾 Initializing Crop Disease Model (MobileNetV3-Large)...")
        _classifier = CropClassifier()
        print(f"🌾 Model ready on device: {_classifier.device}")
    return _classifier


def predict_crop_disease(pil_image: Image.Image) -> dict:
    """Convenience function: run prediction on a PIL Image."""
    classifier = get_classifier()
    return classifier.predict(pil_image)
