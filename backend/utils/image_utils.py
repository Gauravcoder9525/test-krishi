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
    Draw red bounding boxes with labels on the image.
    Each box dict: { x, y, width, height, label, confidence }
    Returns a new annotated image.
    """
    annotated = image.copy()
    draw = ImageDraw.Draw(annotated)

    # Try to use a reasonable font size
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 16)
    except (OSError, IOError):
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
        except (OSError, IOError):
            font = ImageFont.load_default()

    for box in boxes:
        x = box.get("x", 0)
        y = box.get("y", 0)
        w = box.get("width", 50)
        h = box.get("height", 50)
        label = box.get("label", "Disease")
        conf = box.get("confidence", 0.0)

        # Draw red rectangle (3px border)
        for i in range(3):
            draw.rectangle(
                [x - i, y - i, x + w + i, y + h + i],
                outline=(255, 0, 0)
            )

        # Label background
        label_text = f"{label} ({conf * 100:.1f}%)"
        bbox = draw.textbbox((0, 0), label_text, font=font)
        text_w = bbox[2] - bbox[0]
        text_h = bbox[3] - bbox[1]

        label_y = max(0, y - text_h - 8)
        draw.rectangle(
            [x, label_y, x + text_w + 10, label_y + text_h + 6],
            fill=(255, 0, 0)
        )
        draw.text((x + 5, label_y + 2), label_text, fill=(255, 255, 255), font=font)

    return annotated


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
