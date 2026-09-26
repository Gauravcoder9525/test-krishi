"""
Image utility functions for Krishi AI Backend.
Handles base64 decoding, image processing, and bounding box rendering.
"""

import base64
import io
from PIL import Image, ImageDraw, ImageFont


def decode_base64_image(base64_string: str) -> Image.Image:
    """
    Decode a base64 image string (with or without data URI prefix) to a PIL Image.
    Supports: data:image/jpeg;base64,... or raw base64 string.
    """
    if "," in base64_string:
        base64_string = base64_string.split(",", 1)[1]

    image_bytes = base64.b64decode(base64_string)
    image = Image.open(io.BytesIO(image_bytes))

    # Convert to RGB if needed (handle RGBA, palette, etc.)
    if image.mode != "RGB":
        image = image.convert("RGB")

    return image


def encode_image_to_base64(image: Image.Image, format: str = "JPEG", quality: int = 85) -> str:
    """
    Encode a PIL Image to a base64 data URI string.
    """
    buffer = io.BytesIO()
    image.save(buffer, format=format, quality=quality)
    buffer.seek(0)
    b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    mime = "image/jpeg" if format.upper() == "JPEG" else f"image/{format.lower()}"
    return f"data:{mime};base64,{b64}"


def draw_bounding_boxes(image: Image.Image, boxes: list) -> Image.Image:
    """
    Draw high-contrast, modern bounding boxes with corner reticles and labels on the image.
    Each box dict: { x, y, width, height, label, confidence }
    Returns a new annotated image.
    """
    annotated = image.convert("RGBA").copy()
    overlay = Image.new("RGBA", annotated.size, (0, 0, 0, 0))
    draw_overlay = ImageDraw.Draw(overlay)
    draw_solid = ImageDraw.Draw(annotated)

    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 15)
    except (OSError, IOError):
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 15)
        except (OSError, IOError):
            font = ImageFont.load_default()

    for box in boxes:
        x = int(box.get("x", 0))
        y = int(box.get("y", 0))
        w = int(box.get("width", 60))
        h = int(box.get("height", 60))
        label = box.get("label", "Disease")
        conf = float(box.get("confidence", 0.0))

        # Semi-transparent tinted fill over infected zone
        draw_overlay.rectangle([x, y, x + w, y + h], fill=(239, 68, 68, 45))

        # Primary border (2px bright crimson red)
        for i in range(2):
            draw_solid.rectangle([x - i, y - i, x + w + i, y + h + i], outline=(220, 38, 38))

        # Modern Corner Brackets / Target Reticles (length 14px, 4px thickness)
        corner_len = min(16, max(8, w // 4, h // 4))
        reticle_color = (255, 255, 255)
        # Top-left corner
        draw_solid.line([(x - 2, y - 2), (x + corner_len, y - 2)], fill=reticle_color, width=3)
        draw_solid.line([(x - 2, y - 2), (x - 2, y + corner_len)], fill=reticle_color, width=3)
        # Top-right corner
        draw_solid.line([(x + w + 2, y - 2), (x + w - corner_len, y - 2)], fill=reticle_color, width=3)
        draw_solid.line([(x + w + 2, y - 2), (x + w + 2, y + corner_len)], fill=reticle_color, width=3)
        # Bottom-left corner
        draw_solid.line([(x - 2, y + h + 2), (x + corner_len, y + h + 2)], fill=reticle_color, width=3)
        draw_solid.line([(x - 2, y + h + 2), (x - 2, y + h - corner_len)], fill=reticle_color, width=3)
        # Bottom-right corner
        draw_solid.line([(x + w + 2, y + h + 2), (x + w - corner_len, y + h + 2)], fill=reticle_color, width=3)
        draw_solid.line([(x + w + 2, y + h + 2), (x + w + 2, y + h - corner_len)], fill=reticle_color, width=3)

        # Label tag badge
        label_text = f"● {label} ({conf * 100:.1f}%)" if conf <= 1.0 else f"● {label} ({conf:.1f}%)"
        bbox = draw_solid.textbbox((0, 0), label_text, font=font)
        text_w = bbox[2] - bbox[0]
        text_h = bbox[3] - bbox[1]

        label_y = max(4, y - text_h - 10)
        draw_solid.rectangle(
            [x, label_y, x + text_w + 12, label_y + text_h + 8],
            fill=(185, 28, 28)
        )
        draw_solid.text((x + 6, label_y + 4), label_text, fill=(255, 255, 255), font=font)

    # Composite translucent fill with solid lines
    annotated = Image.alpha_composite(annotated, overlay)
    return annotated.convert("RGB")


def generate_heatmap_overlay(image: Image.Image, boxes: list, is_healthy: bool = False) -> Image.Image:
    """
    Generate a Grad-CAM / thermal attention heatmap overlay pinpointing infected leaf lesions.
    Healthy tissue maps to cool green/teal tones, while lesions glow in warm amber/fiery red.
    Blends with original leaf image so leaf veins and margins remain visible.
    """
    import numpy as np
    from PIL import ImageFilter

    base_rgb = image.convert("RGB")
    width, height = base_rgb.size

    # Float intensity grid for smooth Gaussian diffusion
    grid_w = max(32, min(160, width // 4))
    grid_h = max(32, min(160, height // 4))
    intensity = np.zeros((grid_h, grid_w), dtype=np.float32)

    if not is_healthy and boxes:
        for box in boxes:
            bx = float(box.get("x", 0))
            by = float(box.get("y", 0))
            bw = float(box.get("width", width * 0.25))
            bh = float(box.get("height", height * 0.25))
            b_conf = float(box.get("confidence", 0.85))
            if b_conf > 1.0:
                b_conf = b_conf / 100.0

            cx = (bx + bw / 2.0) / width * grid_w
            cy = (by + bh / 2.0) / height * grid_h
            sigma_x = max(2.5, (bw / width * grid_w) / 2.4)
            sigma_y = max(2.5, (bh / height * grid_h) / 2.4)

            y_indices, x_indices = np.ogrid[:grid_h, :grid_w]
            dist_sq = ((x_indices - cx) / sigma_x) ** 2 + ((y_indices - cy) / sigma_y) ** 2
            kernel = np.exp(-0.5 * dist_sq)
            intensity = np.maximum(intensity, kernel * max(0.6, b_conf))
    elif is_healthy:
        # Uniform cool green/teal baseline indicating healthy chlorophyll
        intensity.fill(0.08)
    else:
        # Center subtle hotspot fallback
        cy, cx = grid_h / 2.0, grid_w / 2.0
        y_indices, x_indices = np.ogrid[:grid_h, :grid_w]
        dist_sq = ((x_indices - cx) / 8.0) ** 2 + ((y_indices - cy) / 8.0) ** 2
        intensity = np.exp(-0.5 * dist_sq) * 0.85

    # Normalize intensity to [0, 1]
    max_val = np.max(intensity)
    if max_val > 0:
        intensity = intensity / max_val

    # Map intensity through Jet/Turbo thermal colormap
    v = intensity
    heatmap_rgb = np.zeros((grid_h, grid_w, 3), dtype=np.uint8)

    r = np.clip(np.where(v < 0.35, 20 + v * 120, np.where(v < 0.65, 80 + (v - 0.35) * 520, 240 + (v - 0.65) * 45)), 0, 255).astype(np.uint8)
    g = np.clip(np.where(v < 0.25, 60 + v * 350, np.where(v < 0.70, 180 + (v - 0.25) * 160, 255 - (v - 0.70) * 780)), 0, 255).astype(np.uint8)
    b = np.clip(np.where(v < 0.25, 180 - v * 400, np.where(v < 0.55, 60 - (v - 0.25) * 140, 15)), 0, 255).astype(np.uint8)

    heatmap_rgb[:, :, 0] = r
    heatmap_rgb[:, :, 1] = g
    heatmap_rgb[:, :, 2] = b

    # Bicubic upscale to original image resolution for smooth gradient
    heatmap_pil = Image.fromarray(heatmap_rgb).resize((width, height), Image.Resampling.BICUBIC)
    heatmap_pil = heatmap_pil.filter(ImageFilter.GaussianBlur(radius=max(3, width // 120)))

    # Blend with 55% thermal gradient overlay so underlying plant veins remain crisp
    blended = Image.blend(base_rgb, heatmap_pil, alpha=0.52)
    return blended



def get_image_dimensions(image: Image.Image) -> tuple:
    """Return (width, height) of an image."""
    return image.size


def calculate_dominant_colors(image: Image.Image, num_colors: int = 5) -> list:
    """
    Get dominant colors from an image using quantization.
    Returns list of (R, G, B) tuples.
    """
    small = image.resize((100, 100))
    result = small.quantize(colors=num_colors, method=Image.Quantize.MEDIANCUT)
    palette = result.getpalette()

    colors = []
    for i in range(num_colors):
        r = palette[i * 3]
        g = palette[i * 3 + 1]
        b = palette[i * 3 + 2]
        colors.append((r, g, b))

    return colors
