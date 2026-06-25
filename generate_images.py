#!/usr/bin/env python3
"""
Generate premium Poggenpohl-inspired placeholder images for Áras Living.

Style:
- Dark moody interiors with soft natural window light from the left.
- Warm, desaturated colour grade.
- Material-first: walnut, oak, brass, stone, charcoal lacquer.
- Photorealistic-looking abstract compositions with subtle gradients, light
  rays, grain and material textures.
- No text on images.
- Outputs JPEG (existing assets) and WebP (new assets, quality 85, ≤200 KB).
"""

import os
import random
import math
import io
from dataclasses import dataclass
from typing import Tuple, List, Optional, Callable

from PIL import Image, ImageDraw, ImageFilter


# -----------------------------------------------------------------------------
# Palette
# -----------------------------------------------------------------------------

@dataclass(frozen=True)
class Palette:
    name: str
    base: Tuple[int, int, int]
    shadow: Tuple[int, int, int]
    highlight: Tuple[int, int, int]
    accent: Tuple[int, int, int]
    light_tint: Tuple[int, int, int]


PALETTES = {
    "walnut": Palette(
        "walnut",
        (62, 43, 33),
        (35, 24, 18),
        (92, 64, 49),
        (184, 155, 110),
        (240, 224, 200),
    ),
    "oak": Palette(
        "oak",
        (139, 115, 85),
        (92, 74, 53),
        (178, 150, 115),
        (168, 142, 98),
        (245, 235, 218),
    ),
    "ash": Palette(
        "ash",
        (168, 159, 145),
        (118, 111, 102),
        (196, 184, 168),
        (138, 128, 110),
        (232, 228, 220),
    ),
    "brass": Palette(
        "brass",
        (110, 90, 55),
        (70, 56, 33),
        (160, 138, 90),
        (184, 161, 110),
        (245, 232, 198),
    ),
    "charcoal": Palette(
        "charcoal",
        (31, 35, 38),
        (15, 17, 18),
        (55, 60, 64),
        (100, 104, 108),
        (218, 220, 222),
    ),
    "stone": Palette(
        "stone",
        (107, 107, 104),
        (74, 74, 71),
        (150, 150, 145),
        (138, 134, 124),
        (230, 228, 222),
    ),
    "painted": Palette(
        "painted",
        (210, 205, 196),
        (160, 155, 148),
        (232, 228, 220),
        (92, 84, 74),
        (248, 246, 242),
    ),
    "dark": Palette(
        "dark",
        (18, 22, 20),
        (10, 12, 11),
        (35, 42, 38),
        (92, 84, 70),
        (200, 196, 186),
    ),
}


# -----------------------------------------------------------------------------
# Utility helpers
# -----------------------------------------------------------------------------

def hex_to_rgb(hex_color: str) -> Tuple[int, int, int]:
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4))


def rgb_to_hex(rgb: Tuple[int, int, int]) -> str:
    return "#{:02x}{:02x}{:02x}".format(*rgb)


def interpolate(c1, c2, t: float) -> Tuple[int, int, int]:
    return tuple(int(a + (b - a) * t) for a, b in zip(c1, c2))


def clamp(value: int) -> int:
    return max(0, min(255, value))


def layer_normal(bottom: Tuple[int, int, int], top: Tuple[int, int, int], alpha: float) -> Tuple[int, int, int]:
    return tuple(int(bottom[i] * (1 - alpha) + top[i] * alpha) for i in range(3))


def layer_multiply(bottom: Tuple[int, int, int], top: Tuple[int, int, int], alpha: float = 1.0) -> Tuple[int, int, int]:
    out = tuple(int(bottom[i] * top[i] / 255) for i in range(3))
    return layer_normal(bottom, out, alpha)


def layer_screen(bottom: Tuple[int, int, int], top: Tuple[int, int, int], alpha: float = 1.0) -> Tuple[int, int, int]:
    out = tuple(int(255 - (255 - bottom[i]) * (255 - top[i]) / 255) for i in range(3))
    return layer_normal(bottom, out, alpha)


def layer_soft_light(bottom: Tuple[int, int, int], top: Tuple[int, int, int], alpha: float = 1.0) -> Tuple[int, int, int]:
    out = []
    for b, t in zip(bottom, top):
        t_norm = t / 255.0
        if t_norm < 0.5:
            v = b - (1 - 2 * t_norm) * b * (1 - b / 255.0)
        else:
            v = b + (2 * t_norm - 1) * (math.sqrt(b / 255.0) * 255 - b)
        out.append(clamp(int(v)))
    return layer_normal(bottom, tuple(out), alpha)


def distance(p1, p2) -> float:
    return math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)


def save(img: Image.Image, path: str, quality: int = 90) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img = img.convert("RGB")
    img.save(path, "JPEG", quality=quality, optimize=True)
    print(f"Saved {path}")


MAX_WEBP_BYTES = 200 * 1024


def save_webp(img: Image.Image, path: str, max_bytes: int = MAX_WEBP_BYTES) -> None:
    """Save as WebP quality 85, falling back to lower quality/scale to stay under max_bytes."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img = img.convert("RGB")

    def attempt(save_img: Image.Image, quality: int) -> bytes:
        buf = io.BytesIO()
        save_img.save(buf, "WEBP", quality=quality, method=6)
        return buf.getvalue()

    # Try scaling down progressively only if quality alone cannot fit
    scale = 1.0
    best_data = None
    while scale >= 0.5:
        sized = img if scale == 1.0 else img.resize(
            (max(1, int(img.width * scale)), max(1, int(img.height * scale))),
            Image.Resampling.LANCZOS,
        )
        for quality in (85, 80, 75, 70, 65, 60):
            data = attempt(sized, quality)
            if len(data) <= max_bytes:
                with open(path, "wb") as f:
                    f.write(data)
                print(f"Saved {path} ({len(data) // 1024} KB, q={quality}, scale={scale:.2f})")
                return
            if best_data is None or len(data) < len(best_data):
                best_data = data
        scale -= 0.1

    # Last resort: write the smallest attempt found
    with open(path, "wb") as f:
        f.write(best_data or attempt(img, 60))
    print(f"Saved {path} (could not meet size target)")


# -----------------------------------------------------------------------------
# Base canvas + core effects
# -----------------------------------------------------------------------------

def create_canvas(size: Tuple[int, int], color: Tuple[int, int, int]) -> Image.Image:
    return Image.new("RGB", size, color)


def linear_gradient(size: Tuple[int, int], c1, c2, angle: float = 0.0) -> Image.Image:
    """Create a linear gradient. angle in degrees, 0 = left-to-right."""
    w, h = size
    img = Image.new("RGB", size)
    pixels = img.load()
    rad = math.radians(angle)
    cos_a, sin_a = math.cos(rad), math.sin(rad)

    for y in range(h):
        for x in range(w):
            # Project onto gradient axis
            t = (x * cos_a + y * sin_a) / (w * abs(cos_a) + h * abs(sin_a))
            t = max(0.0, min(1.0, t))
            pixels[x, y] = interpolate(c1, c2, t)
    return img


def radial_gradient(size: Tuple[int, int], c1, c2, center: Optional[Tuple[float, float]] = None) -> Image.Image:
    w, h = size
    img = Image.new("RGB", size)
    pixels = img.load()
    cx, cy = center or (w * 0.35, h * 0.35)
    max_dist = math.sqrt(w**2 + h**2) * 0.55
    for y in range(h):
        for x in range(w):
            t = min(1.0, distance((x, y), (cx, cy)) / max_dist)
            pixels[x, y] = interpolate(c1, c2, t)
    return img


def add_grain(img: Image.Image, intensity: int = 8, probability: float = 0.35) -> Image.Image:
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            if random.random() > probability:
                continue
            base = pixels[x, y]
            delta = random.randint(-intensity, intensity)
            pixels[x, y] = tuple(clamp(c + delta) for c in base)
    return img


def add_vignette(img: Image.Image, strength: float = 0.55, color: Tuple[int, int, int] = (0, 0, 0)) -> Image.Image:
    w, h = img.size
    overlay = Image.new("RGBA", (w, h), (*color, 0))
    draw = ImageDraw.Draw(overlay)
    cx, cy = w / 2, h / 2
    max_r = math.sqrt(cx**2 + cy**2)
    steps = 80
    for i in range(steps):
        t = i / steps
        r = max_r * (1 - t * 0.75)
        alpha = int(255 * strength * (1 - t))
        draw.ellipse(
            [cx - r, cy - r, cx + r, cy + r],
            outline=(*color, alpha),
            width=max(1, int(max_r / steps) + 1),
        )
    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=max(w, h) / 25))
    img_rgba = img.convert("RGBA")
    return Image.alpha_composite(img_rgba, overlay).convert("RGB")


def add_window_light(img: Image.Image, palette: Palette, side: str = "left", width_ratio: float = 0.35) -> Image.Image:
    """Add soft natural window light coming from one side."""
    w, h = img.size
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    light_w = int(w * width_ratio)
    for i in range(light_w):
        t = i / light_w
        alpha = int(180 * (1 - t**1.5))
        x = i if side == "left" else w - light_w + i
        draw.line([(x, 0), (x, h)], fill=(*palette.light_tint, alpha), width=1)

    # Soft diagonal rays
    for _ in range(6):
        ray_w = random.randint(40, 120)
        start_x = random.randint(0, light_w // 2) if side == "left" else random.randint(w - light_w // 2, w)
        angle = random.uniform(5, 20) * (-1 if side == "left" else 1)
        end_x = start_x + int(h * math.tan(math.radians(angle)))
        alpha = random.randint(20, 55)
        draw.line([(start_x, 0), (end_x, h)], fill=(*palette.light_tint, alpha), width=ray_w)

    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=max(w, h) / 25))
    img_rgba = img.convert("RGBA")
    return Image.alpha_composite(img_rgba, overlay).convert("RGB")


def add_floor_shadow(img: Image.Image, palette: Palette, horizon_ratio: float = 0.65) -> Image.Image:
    """Add a darker floor gradient below horizon line."""
    w, h = img.size
    horizon = int(h * horizon_ratio)
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for y in range(horizon, h):
        t = (y - horizon) / (h - horizon)
        alpha = int(120 * t**1.5)
        draw.line([(0, y), (w, y)], fill=(*palette.shadow, alpha), width=1)
    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=max(w, h) / 40))
    img_rgba = img.convert("RGBA")
    return Image.alpha_composite(img_rgba, overlay).convert("RGB")


# -----------------------------------------------------------------------------
# Material textures
# -----------------------------------------------------------------------------

def wood_grain_texture(
    size: Tuple[int, int],
    palette: Palette,
    scale: float = 1.0,
    horizontal: bool = True,
    knots: bool = True,
) -> Image.Image:
    w, h = size
    img = Image.new("RGB", size, palette.base)
    draw = ImageDraw.Draw(img)

    # Base gradient with gentle tonal waves
    if horizontal:
        for y in range(h):
            t = y / h
            wave = 0.12 * math.sin(t * math.pi * 3) + 0.08 * math.sin(t * math.pi * 8)
            base_t = max(0.0, min(1.0, 0.15 + wave))
            c = interpolate(palette.base, palette.highlight, base_t)
            draw.line([(0, y), (w, y)], fill=c, width=1)
    else:
        for x in range(w):
            t = x / w
            wave = 0.12 * math.sin(t * math.pi * 3) + 0.08 * math.sin(t * math.pi * 8)
            base_t = max(0.0, min(1.0, 0.15 + wave))
            c = interpolate(palette.base, palette.highlight, base_t)
            draw.line([(x, 0), (x, h)], fill=c, width=1)

    # Fine grain lines
    num_lines = int(max(w, h) * 0.45 * scale)
    for _ in range(num_lines):
        if horizontal:
            y = random.randint(0, h - 1)
            length = random.randint(w // 5, w)
            x1 = random.randint(0, w - length)
            x2 = x1 + length
        else:
            x = random.randint(0, w - 1)
            length = random.randint(h // 5, h)
            y1 = random.randint(0, h - length)
            y2 = y1 + length
            y = x  # not used, but keeps scope clear

        shade = random.uniform(0.6, 1.25)
        c = tuple(clamp(int(channel * shade)) for channel in palette.shadow)
        width = random.choices([1, 2, 3], weights=[70, 25, 5])[0]
        if horizontal:
            draw.line([(x1, y), (x2, y)], fill=c, width=width)
        else:
            draw.line([(x, y1), (x, y2)], fill=c, width=width)

    # Occasional subtle knots / figuring (filled, darker, very few)
    if knots:
        for _ in range(max(2, int(num_lines / 90))):
            cx, cy = random.randint(0, w), random.randint(0, h)
            r = random.randint(8, 28)
            # Darker knot that blends in
            c = tuple(clamp(int(channel * random.uniform(0.5, 0.85))) for channel in palette.shadow)
            draw.ellipse([cx - r, cy - r // 3, cx + r, cy + r // 3], fill=c)

    # Soften very slightly so grain feels like texture, not drawing
    img = img.filter(ImageFilter.GaussianBlur(radius=0.3))
    return img


def ray_fleck_oak_texture(size: Tuple[int, int], palette: Palette) -> Image.Image:
    """Quarter-sawn oak with subtle ray flecks perpendicular to grain."""
    img = wood_grain_texture(size, palette, scale=1.0, horizontal=True)
    draw = ImageDraw.Draw(img)
    w, h = size
    # Flecks are short vertical marks
    for _ in range(int(w * 0.3)):
        x = random.randint(0, w - 1)
        y = random.randint(0, h - 1)
        fleck_h = random.randint(4, 18)
        c = tuple(clamp(int(channel * random.uniform(0.75, 1.1))) for channel in palette.highlight)
        draw.line([(x, y), (x, y + fleck_h)], fill=c, width=random.choice([1, 2]))
    img = img.filter(ImageFilter.GaussianBlur(radius=0.25))
    return img


def fumed_oak_texture(size: Tuple[int, int], palette: Palette) -> Image.Image:
    """Darker, smoky oak with reduced highlight range."""
    # Start from a darker base
    dark_base = tuple(int(c * 0.65) for c in palette.base)
    dark_highlight = tuple(int(c * 0.85) for c in palette.highlight)
    dark_shadow = tuple(int(c * 0.55) for c in palette.shadow)
    fumed = Palette("fumed_oak", dark_base, dark_shadow, dark_highlight, palette.accent, palette.light_tint)
    img = wood_grain_texture(size, fumed, scale=1.2, horizontal=True)
    # Smoky overlay
    overlay = Image.new("RGBA", size, (20, 16, 12, 40))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    return img


def crown_walnut_veneer_texture(size: Tuple[int, int], palette: Palette) -> Image.Image:
    """Fine crown-cut walnut veneer with symmetrical figuring."""
    img = wood_grain_texture(size, palette, scale=0.9, horizontal=True)
    w, h = size
    draw = ImageDraw.Draw(img)
    # Subtle crown / cathedral figuring arcs
    for i in range(8):
        cx = w // 2 + random.randint(-w // 4, w // 4)
        cy = random.randint(0, h)
        r = random.randint(int(h * 0.15), int(h * 0.4))
        c = tuple(clamp(int(channel * random.uniform(0.7, 0.95))) for channel in palette.shadow)
        draw.arc([cx - r, cy - r, cx + r, cy + r], start=0, end=180, fill=c, width=2)
    img = img.filter(ImageFilter.GaussianBlur(radius=0.4))
    return img


def stone_texture(size: Tuple[int, int], palette: Palette) -> Image.Image:
    w, h = size
    img = Image.new("RGB", size, palette.base)
    draw = ImageDraw.Draw(img)

    # Cloud-like veins
    for _ in range(30):
        x, y = random.randint(0, w), random.randint(0, h)
        c = random.choice([palette.highlight, palette.shadow, palette.accent])
        c = tuple(clamp(int(channel * random.uniform(0.85, 1.15))) for channel in c)
        r = random.randint(50, 250)
        draw.ellipse([x - r, y - r, x + r, y + r], fill=c)

    img = img.filter(ImageFilter.GaussianBlur(radius=max(w, h) / 60))
    add_grain(img, intensity=6)
    return img


def brushed_metal_texture(size: Tuple[int, int], palette: Palette) -> Image.Image:
    w, h = size
    img = Image.new("RGB", size, palette.base)
    draw = ImageDraw.Draw(img)
    for y in range(h):
        shade = random.uniform(0.85, 1.15)
        c = tuple(clamp(int(channel * shade)) for channel in palette.highlight)
        draw.line([(0, y), (w, y)], fill=c, width=1)
    img = img.filter(ImageFilter.GaussianBlur(radius=0.5))
    add_grain(img, intensity=5)
    return img


def lacquer_texture(size: Tuple[int, int], palette: Palette) -> Image.Image:
    img = linear_gradient(size, palette.base, palette.shadow, angle=random.uniform(-15, 15))
    img = img.filter(ImageFilter.GaussianBlur(radius=max(size) / 80))
    add_grain(img, intensity=3)
    return img


def fabric_texture(size: Tuple[int, int], palette: Palette) -> Image.Image:
    img = linear_gradient(size, palette.base, palette.highlight, angle=0)
    draw = ImageDraw.Draw(img)
    w, h = size
    for _ in range(500):
        x, y = random.randint(0, w - 1), random.randint(0, h - 1)
        c = tuple(clamp(int(channel * random.uniform(0.9, 1.1))) for channel in palette.shadow)
        draw.point((x, y), fill=c)
    img = img.filter(ImageFilter.GaussianBlur(radius=1))
    return img


# -----------------------------------------------------------------------------
# Interior composition helpers
# -----------------------------------------------------------------------------

def draw_cabinet_wall(
    img: Image.Image,
    palette: Palette,
    material: str = "lacquer",
    columns: int = 3,
    horizon: float = 0.62,
) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    wall_top = int(h * 0.12)
    wall_bottom = int(h * horizon)
    margin = int(w * 0.08)
    usable_w = w - margin * 2
    gap = int(w * 0.012)
    col_w = (usable_w - gap * (columns - 1)) // columns

    for col in range(columns):
        x1 = margin + col * (col_w + gap)
        x2 = x1 + col_w
        # Cabinet panel
        tex = None
        if material == "wood":
            tex = wood_grain_texture((col_w, wall_bottom - wall_top), palette, scale=1.0, horizontal=True)
        elif material == "lacquer":
            tex = lacquer_texture((col_w, wall_bottom - wall_top), palette)
        elif material == "stone":
            tex = stone_texture((col_w, wall_bottom - wall_top), palette)
        elif material == "metal":
            tex = brushed_metal_texture((col_w, wall_bottom - wall_top), palette)

        if tex:
            img.paste(tex, (x1, wall_top))

        # Subtle frame shadow
        draw.rectangle([x1, wall_top, x2, wall_bottom], outline=palette.shadow, width=2)

        # Handle / brass accent
        if random.random() < 0.7:
            handle_h = int((wall_bottom - wall_top) * 0.25)
            handle_w = int(w * 0.005)
            hx = x2 - int(col_w * 0.15)
            hy = wall_top + (wall_bottom - wall_top) // 2 - handle_h // 2
            draw.rectangle([hx, hy, hx + handle_w, hy + handle_h], fill=palette.accent)


def draw_countertop(
    img: Image.Image,
    palette: Palette,
    horizon: float = 0.62,
    depth_ratio: float = 0.12,
) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    y = int(h * horizon)
    depth = int(h * depth_ratio)
    # Top surface
    top_poly = [(0, y), (w, y), (w - int(w * 0.05), y - depth), (int(w * 0.05), y - depth)]
    stone = stone_texture((w, depth), palette) if palette.name == "stone" else lacquer_texture((w, depth), palette)
    img.paste(stone, (0, y - depth))
    draw.polygon(top_poly, outline=palette.shadow, width=1)
    # Front face
    draw.rectangle([0, y, w, h], fill=palette.base)


def draw_shelves(
    img: Image.Image,
    palette: Palette,
    rows: int = 4,
    horizon: float = 0.62,
) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    wall_top = int(h * 0.15)
    wall_bottom = int(h * horizon)
    margin = int(w * 0.12)
    usable_w = w - margin * 2
    shelf_h = int(w * 0.008)
    gap = (wall_bottom - wall_top - rows * shelf_h) // (rows + 1)

    for row in range(rows):
        y = wall_top + (row + 1) * gap + row * shelf_h
        draw.rectangle([margin, y, margin + usable_w, y + shelf_h], fill=palette.highlight)
        # Object on shelf
        if random.random() < 0.5:
            obj_w = random.randint(int(usable_w * 0.08), int(usable_w * 0.18))
            obj_h = random.randint(int(shelf_h * 3), int(shelf_h * 8))
            ox = margin + random.randint(int(usable_w * 0.1), usable_w - obj_w - int(usable_w * 0.1))
            draw.rectangle([ox, y - obj_h, ox + obj_w, y], fill=palette.accent)


def draw_media_wall(
    img: Image.Image,
    palette: Palette,
    horizon: float = 0.62,
) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    wall_top = int(h * 0.18)
    wall_bottom = int(h * horizon)
    margin = int(w * 0.1)
    unit_w = w - margin * 2
    unit_h = wall_bottom - wall_top

    # Main painted cabinet
    tex = lacquer_texture((unit_w, unit_h), palette)
    img.paste(tex, (margin, wall_top))
    draw.rectangle([margin, wall_top, margin + unit_w, wall_bottom], outline=palette.shadow, width=2)

    # Open shelf section (oak)
    shelf_w = int(unit_w * 0.55)
    shelf_x = margin + int(unit_w * 0.35)
    shelf_top = wall_top + int(unit_h * 0.12)
    shelf_bottom = wall_bottom - int(unit_h * 0.12)
    oak = PALETTES["oak"]
    for y in range(shelf_top, shelf_bottom, (shelf_bottom - shelf_top) // 5):
        draw.rectangle([shelf_x, y, shelf_x + shelf_w, y + int(unit_h * 0.015)], fill=oak.highlight)

    # Screen void
    screen_w = int(unit_w * 0.45)
    screen_h = int(unit_h * 0.55)
    screen_x = margin + int(unit_w * 0.05)
    screen_y = wall_top + (unit_h - screen_h) // 2
    draw.rectangle([screen_x, screen_y, screen_x + screen_w, screen_y + screen_h], fill=(8, 8, 8))


def draw_wardrobe_room(
    img: Image.Image,
    palette: Palette,
    horizon: float = 0.6,
) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    wall_top = int(h * 0.08)
    wall_bottom = int(h * horizon)
    margin = int(w * 0.06)
    usable_w = w - margin * 2
    gap = int(w * 0.008)
    cols = 4
    col_w = (usable_w - gap * (cols - 1)) // cols

    for col in range(cols):
        x1 = margin + col * (col_w + gap)
        x2 = x1 + col_w
        tex = wood_grain_texture((col_w, wall_bottom - wall_top), palette, scale=0.9, horizontal=True)
        img.paste(tex, (x1, wall_top))
        draw.rectangle([x1, wall_top, x2, wall_bottom], outline=palette.shadow, width=2)
        # Long vertical brass handle
        handle_w = int(w * 0.004)
        handle_h = int((wall_bottom - wall_top) * 0.4)
        hx = x1 + col_w // 2 - handle_w // 2
        hy = wall_top + (wall_bottom - wall_top) // 2 - handle_h // 2
        draw.rectangle([hx, hy, hx + handle_w, hy + handle_h], fill=PALETTES["brass"].highlight)

    # LED strip glow at top
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.rectangle([margin, wall_top - 4, w - margin, wall_top + 8], fill=(*palette.light_tint, 90))
    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=15))
    img_rgba = img.convert("RGBA")
    img.paste(Image.alpha_composite(img_rgba, overlay).convert("RGB"), (0, 0))


def draw_library(
    img: Image.Image,
    palette: Palette,
    horizon: float = 0.62,
) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    wall_top = int(h * 0.12)
    wall_bottom = int(h * horizon)
    margin = int(w * 0.1)
    usable_w = w - margin * 2
    rows = 5
    shelf_h = int(w * 0.01)
    gap = (wall_bottom - wall_top - rows * shelf_h) // (rows + 1)

    # Bay window opening on right
    window_x = margin + int(usable_w * 0.65)
    window_w = int(usable_w * 0.3)

    for row in range(rows):
        y = wall_top + (row + 1) * gap + row * shelf_h
        # Left shelves
        draw.rectangle([margin, y, window_x, y + shelf_h], fill=palette.highlight)
        # Right shelves
        draw.rectangle([window_x + window_w, y, margin + usable_w, y + shelf_h], fill=palette.highlight)

        # Books
        def add_books(sx1, sx2):
            x = sx1 + 10
            while x < sx2 - 15:
                book_w = random.randint(8, 18)
                book_h = random.randint(shelf_h * 3, shelf_h * 8)
                if x + book_w > sx2 - 5:
                    break
                c = random.choice([palette.accent, palette.shadow, palette.highlight])
                draw.rectangle([x, y - book_h, x + book_w, y], fill=c)
                x += book_w + 2

        add_books(margin + 5, window_x - 5)
        add_books(window_x + window_w + 5, margin + usable_w - 5)

    # Window
    draw.rectangle([window_x, wall_top, window_x + window_w, wall_bottom], fill=palette.light_tint)
    # Window frame
    for x in [window_x, window_x + window_w // 2, window_x + window_w]:
        draw.line([(x, wall_top), (x, wall_bottom)], fill=palette.shadow, width=3)
    for y in [wall_top, wall_bottom]:
        draw.line([(window_x, y), (window_x + window_w, y)], fill=palette.shadow, width=3)


def draw_office(
    img: Image.Image,
    palette: Palette,
    horizon: float = 0.62,
) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    wall_top = int(h * 0.12)
    wall_bottom = int(h * horizon)
    margin = int(w * 0.1)
    usable_w = w - margin * 2

    # Reception desk
    desk_h = int((wall_bottom - wall_top) * 0.45)
    desk_y = wall_bottom - desk_h
    desk_w = int(usable_w * 0.55)
    desk_tex = wood_grain_texture((desk_w, desk_h), palette, scale=1.0, horizontal=True)
    img.paste(desk_tex, (margin, desk_y))
    draw.rectangle([margin, desk_y, margin + desk_w, wall_bottom], outline=palette.shadow, width=2)

    # Back wall panels
    panel_w = (usable_w - desk_w - int(w * 0.05)) // 2
    panel_x = margin + desk_w + int(w * 0.05)
    panel_tex = lacquer_texture((panel_w, wall_bottom - wall_top), PALETTES["charcoal"])
    img.paste(panel_tex, (panel_x, wall_top))

    # Boardroom table hint at bottom
    table_y = int(h * 0.82)
    draw.rectangle([int(w * 0.15), table_y, int(w * 0.85), table_y + int(h * 0.06)], fill=palette.highlight)


def draw_reception(
    img: Image.Image,
    palette: Palette,
    horizon: float = 0.62,
) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    wall_top = int(h * 0.1)
    wall_bottom = int(h * horizon)
    margin = int(w * 0.08)
    usable_w = w - margin * 2

    # Back wall of walnut panels
    panel_w = usable_w // 5
    for i in range(5):
        x1 = margin + i * panel_w
        x2 = x1 + panel_w - 2
        tex = wood_grain_texture((x2 - x1, wall_bottom - wall_top), palette, scale=0.8, horizontal=True)
        img.paste(tex, (x1, wall_top))
        draw.rectangle([x1, wall_top, x2, wall_bottom], outline=palette.shadow, width=1)

    # Curved / straight reception counter
    counter_h = int((wall_bottom - wall_top) * 0.35)
    counter_y = wall_bottom - counter_h
    counter_w = int(usable_w * 0.7)
    counter_tex = stone_texture((counter_w, counter_h), PALETTES["stone"])
    img.paste(counter_tex, (margin + (usable_w - counter_w) // 2, counter_y))

    # Brass accent strip
    strip_y = counter_y + int(counter_h * 0.15)
    draw.rectangle([margin + (usable_w - counter_w) // 2, strip_y, margin + (usable_w + counter_w) // 2, strip_y + 4], fill=PALETTES["brass"].highlight)


def draw_retail(
    img: Image.Image,
    palette: Palette,
    horizon: float = 0.62,
) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    wall_top = int(h * 0.12)
    wall_bottom = int(h * horizon)
    margin = int(w * 0.1)
    usable_w = w - margin * 2

    # Display niches
    niche_w = usable_w // 3 - 10
    niche_h = wall_bottom - wall_top
    for col in range(3):
        x1 = margin + col * (niche_w + 15)
        tex = wood_grain_texture((niche_w, niche_h), palette, scale=1.0, horizontal=True)
        img.paste(tex, (x1, wall_top))
        draw.rectangle([x1, wall_top, x1 + niche_w, wall_bottom], outline=palette.shadow, width=2)
        # Shelf
        shelf_y = wall_top + niche_h // 2
        draw.rectangle([x1 + 5, shelf_y, x1 + niche_w - 5, shelf_y + 6], fill=palette.highlight)
        # Product block
        prod_w = niche_w // 3
        prod_h = random.randint(int(niche_h * 0.12), int(niche_h * 0.22))
        draw.rectangle([x1 + niche_w // 2 - prod_w // 2, shelf_y - prod_h, x1 + niche_w // 2 + prod_w // 2, shelf_y], fill=palette.accent)


def draw_closet_boutique(
    img: Image.Image,
    palette: Palette,
    horizon: float = 0.6,
) -> None:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    wall_top = int(h * 0.08)
    wall_bottom = int(h * horizon)
    margin = int(w * 0.06)
    usable_w = w - margin * 2
    cols = 5
    gap = int(w * 0.006)
    col_w = (usable_w - gap * (cols - 1)) // cols

    for col in range(cols):
        x1 = margin + col * (col_w + gap)
        x2 = x1 + col_w
        open_niche = col == 2
        if open_niche:
            tex = lacquer_texture((col_w, wall_bottom - wall_top), PALETTES["charcoal"])
        else:
            tex = wood_grain_texture((col_w, wall_bottom - wall_top), palette, scale=1.0, horizontal=True)
        img.paste(tex, (x1, wall_top))
        draw.rectangle([x1, wall_top, x2, wall_bottom], outline=palette.shadow, width=1)
        if not open_niche:
            handle_h = int((wall_bottom - wall_top) * 0.25)
            handle_w = int(w * 0.003)
            hx = x2 - int(col_w * 0.12)
            hy = wall_top + (wall_bottom - wall_top) // 2 - handle_h // 2
            draw.rectangle([hx, hy, hx + handle_w, hy + handle_h], fill=PALETTES["brass"].highlight)
        else:
            # Clothes rail
            rail_y = wall_top + int((wall_bottom - wall_top) * 0.12)
            draw.rectangle([x1 + 5, rail_y, x2 - 5, rail_y + 4], fill=palette.accent)


# -----------------------------------------------------------------------------
# Composition generators
# -----------------------------------------------------------------------------

def generate_interior(
    size: Tuple[int, int],
    palette: Palette,
    material: str = "lacquer",
    composition: str = "cabinet_wall",
    horizon: float = 0.62,
) -> Image.Image:
    """Generate a full interior scene."""
    img = create_canvas(size, palette.shadow)

    # Back wall gradient
    bg = radial_gradient(size, palette.shadow, palette.base, center=(size[0] * 0.3, size[1] * 0.3))
    img.paste(bg, (0, 0))

    # Scene composition
    dispatch = {
        "cabinet_wall": lambda i, p: draw_cabinet_wall(i, p, material=material, horizon=horizon),
        "countertop": lambda i, p: (draw_cabinet_wall(i, p, material=material, horizon=horizon), draw_countertop(i, p, horizon=horizon))[0],
        "shelves": lambda i, p: draw_shelves(i, p, horizon=horizon),
        "media_wall": lambda i, p: draw_media_wall(i, p, horizon=horizon),
        "wardrobe_room": lambda i, p: draw_wardrobe_room(i, p, horizon=horizon),
        "library": lambda i, p: draw_library(i, p, horizon=horizon),
        "office": lambda i, p: draw_office(i, p, horizon=horizon),
        "reception": lambda i, p: draw_reception(i, p, horizon=horizon),
        "retail": lambda i, p: draw_retail(i, p, horizon=horizon),
        "closet_boutique": lambda i, p: draw_closet_boutique(i, p, horizon=horizon),
    }
    dispatch[composition](img, palette)

    # Floor
    draw = ImageDraw.Draw(img)
    w, h = img.size
    floor_y = int(h * horizon)
    floor_tex = wood_grain_texture((w, h - floor_y), PALETTES["walnut"], scale=1.2, horizontal=True, knots=False)
    img.paste(floor_tex, (0, floor_y))

    # Add atmosphere
    img = add_window_light(img, palette, side="left", width_ratio=0.35)
    img = add_floor_shadow(img, palette, horizon_ratio=horizon)
    img = add_vignette(img, strength=0.5, color=(5, 7, 6))
    img = add_grain(img, intensity=5)

    return img


def generate_material_swatch(size: Tuple[int, int], palette: Palette, texture_fn: Callable) -> Image.Image:
    img = texture_fn(size, palette)
    # Add soft window light from left
    img = add_window_light(img, palette, side="left", width_ratio=0.25)
    img = add_vignette(img, strength=0.25, color=palette.shadow)
    img = add_grain(img, intensity=4)
    return img


def generate_team_portrait(size: Tuple[int, int], palette: Palette) -> Image.Image:
    w, h = size
    img = create_canvas(size, palette.shadow)

    # Soft gradient background
    bg = radial_gradient(size, palette.shadow, palette.base, center=(w * 0.3, h * 0.25))
    img.paste(bg, (0, 0))

    draw = ImageDraw.Draw(img)
    # Abstract head-and-shoulders silhouette with soft edges
    head_cx, head_cy = w // 2, int(h * 0.42)
    head_r = int(h * 0.18)
    shoulder_y = int(h * 0.62)
    shoulder_w = int(w * 0.65)

    # Shoulders
    draw.ellipse([head_cx - shoulder_w // 2, shoulder_y - head_r, head_cx + shoulder_w // 2, shoulder_y + head_r * 2], fill=palette.base)
    # Head
    draw.ellipse([head_cx - head_r, head_cy - head_r, head_cx + head_r, head_cy + head_r], fill=palette.highlight)

    # Subtle clothing
    draw.rectangle([head_cx - shoulder_w // 2, shoulder_y, head_cx + shoulder_w // 2, h], fill=palette.shadow)

    # Window light from left
    img = add_window_light(img, palette, side="left", width_ratio=0.3)
    img = add_vignette(img, strength=0.45, color=(8, 8, 8))
    img = add_grain(img, intensity=5)
    return img


def generate_craftsmanship(size: Tuple[int, int]) -> Image.Image:
    w, h = size
    palette = PALETTES["walnut"]
    img = create_canvas(size, palette.shadow)

    # Workbench surface
    bench_y = int(h * 0.55)
    bench_tex = wood_grain_texture((w, h - bench_y), palette, scale=1.5, horizontal=True, knots=False)
    img.paste(bench_tex, (0, bench_y))

    # Timber plank in foreground
    plank_w, plank_h = int(w * 0.65), int(h * 0.28)
    plank_x = int(w * 0.15)
    plank_y = int(h * 0.45)
    plank = wood_grain_texture((plank_w, plank_h), palette, scale=1.8, horizontal=True)
    img.paste(plank, (plank_x, plank_y))

    draw = ImageDraw.Draw(img)
    # Hands / tool hint
    hand_color = (200, 180, 155)
    draw.ellipse([plank_x + int(plank_w * 0.55), plank_y - 30, plank_x + int(plank_w * 0.75), plank_y + 20], fill=hand_color)
    # Chisel / plane hint
    draw.rectangle([plank_x + int(plank_w * 0.45), plank_y - 10, plank_x + int(plank_w * 0.8), plank_y + 8], fill=PALETTES["brass"].highlight)

    img = add_window_light(img, palette, side="left", width_ratio=0.28)
    img = add_vignette(img, strength=0.5, color=(5, 5, 5))
    img = add_grain(img, intensity=6)
    return img


def generate_workshop(size: Tuple[int, int]) -> Image.Image:
    w, h = size
    palette = PALETTES["oak"]
    img = create_canvas(size, palette.shadow)

    # Back wall
    bg = wood_grain_texture((w, int(h * 0.6)), palette, scale=0.8, horizontal=True, knots=False)
    img.paste(bg, (0, 0))

    draw = ImageDraw.Draw(img)
    # Workbench
    bench_y = int(h * 0.55)
    bench_tex = wood_grain_texture((w, h - bench_y), PALETTES["walnut"], scale=1.3, horizontal=True, knots=False)
    img.paste(bench_tex, (0, bench_y))

    # Tools hanging on wall
    for i in range(5):
        x = int(w * (0.15 + i * 0.15))
        y = int(h * 0.15)
        draw.rectangle([x, y, x + 8, y + 80], fill=PALETTES["brass"].shadow)
        draw.rectangle([x - 15, y + 80, x + 23, y + 95], fill=PALETTES["charcoal"].base)

    # Overhead lamp glow
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    lamp_x, lamp_y = w // 2, int(h * 0.12)
    for r in range(200, 0, -5):
        alpha = int(40 * (r / 200))
        overlay_draw.ellipse([lamp_x - r, lamp_y - r, lamp_x + r, lamp_y + r], fill=(*palette.light_tint, alpha))
    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=30))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")

    img = add_window_light(img, palette, side="left", width_ratio=0.25)
    img = add_vignette(img, strength=0.48, color=(6, 6, 6))
    img = add_grain(img, intensity=6)
    return img


def generate_process_moment(size: Tuple[int, int], moment: str) -> Image.Image:
    """Generate a 16:9 image representing one step of the client process."""
    w, h = size
    base_palette = PALETTES["walnut"]
    img = create_canvas(size, base_palette.shadow)

    if moment == "discovery":
        # Dark consultation table with material samples
        palette = PALETTES["walnut"]
        img = create_canvas(size, palette.shadow)
        # Table surface
        table_y = int(h * 0.45)
        table = wood_grain_texture((w, h - table_y), palette, scale=1.2, horizontal=True, knots=False)
        img.paste(table, (0, table_y))
        draw = ImageDraw.Draw(img)
        # Sample blocks
        for i, col in enumerate([PALETTES["oak"].highlight, PALETTES["charcoal"].base, PALETTES["brass"].highlight]):
            x = int(w * 0.2 + i * w * 0.18)
            y = table_y + int(h * 0.12)
            draw.rectangle([x, y, x + int(w * 0.1), y + int(h * 0.12)], fill=col)

    elif moment == "site-survey":
        # Moody empty room with architectural lines
        palette = PALETTES["charcoal"]
        bg = linear_gradient(size, palette.shadow, palette.base, angle=-10)
        img.paste(bg, (0, 0))
        draw = ImageDraw.Draw(img)
        # Perspective lines
        for x in [int(w * 0.25), int(w * 0.75)]:
            draw.line([(x, int(h * 0.2)), (x, h)], fill=palette.highlight, width=2)
        draw.line([(0, int(h * 0.65)), (w, int(h * 0.65))], fill=palette.highlight, width=2)

    elif moment == "concept-design":
        # Screen/tablet glow on dark desk
        palette = PALETTES["charcoal"]
        img = create_canvas(size, palette.shadow)
        draw = ImageDraw.Draw(img)
        # Desk
        desk_y = int(h * 0.55)
        draw.rectangle([0, desk_y, w, h], fill=palette.base)
        # Tablet screen
        sw, sh = int(w * 0.45), int(h * 0.35)
        sx, sy = (w - sw) // 2, desk_y - sh + int(h * 0.05)
        draw.rectangle([sx, sy, sx + sw, sy + sh], fill=(12, 14, 16))
        # Screen content lines
        for i in range(5):
            y = sy + int(sh * 0.2) + i * int(sh * 0.12)
            draw.rectangle([sx + int(sw * 0.1), y, sx + int(sw * 0.9), y + 3], fill=palette.accent)
        # Glow
        overlay = Image.new("RGBA", size, (0, 0, 0, 0))
        overlay_draw = ImageDraw.Draw(overlay)
        for r in range(250, 0, -10):
            alpha = int(25 * (r / 250))
            overlay_draw.ellipse([sx + sw // 2 - r, sy + sh // 2 - r, sx + sw // 2 + r, sy + sh // 2 + r], fill=(*palette.light_tint, alpha))
        img = Image.alpha_composite(img.convert("RGBA"), overlay.filter(ImageFilter.GaussianBlur(radius=40))).convert("RGB")

    elif moment == "material-selection":
        # Flat lay of material swatches
        palette = PALETTES["oak"]
        bg = lacquer_texture(size, PALETTES["charcoal"])
        img.paste(bg, (0, 0))
        draw = ImageDraw.Draw(img)
        swatches = [
            (PALETTES["walnut"].highlight, 0.15, 0.25),
            (PALETTES["oak"].highlight, 0.45, 0.22),
            (PALETTES["brass"].highlight, 0.72, 0.28),
            (PALETTES["stone"].highlight, 0.3, 0.58),
        ]
        for col, rx, ry in swatches:
            x, y = int(w * rx), int(h * ry)
            bw, bh = int(w * 0.18), int(h * 0.2)
            draw.rectangle([x, y, x + bw, y + bh], fill=col)
            draw.rectangle([x, y, x + bw, y + bh], outline=palette.shadow, width=3)

    elif moment == "technical-drawings":
        # Blueprint-style abstract lines
        palette = PALETTES["charcoal"]
        img = create_canvas(size, (22, 28, 34))
        draw = ImageDraw.Draw(img)
        line_col = (120, 130, 138)
        # Grid
        for x in range(0, w, 60):
            draw.line([(x, 0), (x, h)], fill=line_col, width=1)
        for y in range(0, h, 60):
            draw.line([(0, y), (w, y)], fill=line_col, width=1)
        # Cabinet outline
        margin = int(w * 0.15)
        draw.rectangle([margin, int(h * 0.25), w - margin, int(h * 0.75)], outline=(200, 205, 210), width=2)
        for x in [margin + int(w * 0.2), margin + int(w * 0.4), margin + int(w * 0.6)]:
            draw.line([(x, int(h * 0.25)), (x, int(h * 0.75))], fill=(200, 205, 210), width=2)

    elif moment == "workshop-craft":
        img = generate_workshop(size)
        return img

    elif moment == "finishing":
        # Close-up lacquer spray/finish surface
        palette = PALETTES["walnut"]
        img = wood_grain_texture(size, palette, scale=1.0, horizontal=True)
        # Glossy lacquer sheen overlay
        overlay = Image.new("RGBA", size, (0, 0, 0, 0))
        overlay_draw = ImageDraw.Draw(overlay)
        for r in range(300, 0, -15):
            alpha = int(35 * (r / 300))
            overlay_draw.ellipse([int(w * 0.3) - r, int(h * 0.25) - r, int(w * 0.3) + r, int(h * 0.25) + r], fill=(*PALETTES["painted"].light_tint, alpha))
        img = Image.alpha_composite(img.convert("RGBA"), overlay.filter(ImageFilter.GaussianBlur(radius=50))).convert("RGB")

    elif moment == "installation-care":
        # Installed cabinetry, final adjustments
        palette = PALETTES["walnut"]
        img = generate_interior(size, palette, material="wood", composition="wardrobe_room", horizon=0.58)
        return img

    # Common finishing for non-interior moments
    if moment not in ("workshop-craft", "installation-care"):
        img = add_window_light(img, base_palette, side="left", width_ratio=0.3)
        img = add_vignette(img, strength=0.45, color=(5, 6, 5))
        img = add_grain(img, intensity=5)
    return img


def generate_showroom(size: Tuple[int, int], name: str) -> Image.Image:
    """Generate one showroom image (exterior, interior, detail, maker)."""
    w, h = size
    if name == "exterior":
        palette = PALETTES["charcoal"]
        img = create_canvas(size, palette.shadow)
        bg = linear_gradient(size, palette.shadow, palette.base, angle=-5)
        img.paste(bg, (0, 0))
        draw = ImageDraw.Draw(img)
        # Facade
        facade_x1, facade_x2 = int(w * 0.2), int(w * 0.8)
        facade_top, facade_bottom = int(h * 0.15), int(h * 0.85)
        draw.rectangle([facade_x1, facade_top, facade_x2, facade_bottom], fill=palette.base)
        # Large window
        win_margin = int(w * 0.06)
        draw.rectangle([facade_x1 + win_margin, facade_top + int(h * 0.1), facade_x2 - win_margin, facade_bottom - int(h * 0.15)], fill=(8, 9, 10))
        # Warm interior glow hint
        overlay = Image.new("RGBA", size, (0, 0, 0, 0))
        overlay_draw = ImageDraw.Draw(overlay)
        overlay_draw.rectangle([facade_x1 + win_margin + 20, facade_top + int(h * 0.1) + 20, facade_x2 - win_margin - 20, facade_bottom - int(h * 0.15) - 20], fill=(*PALETTES["walnut"].highlight, 60))
        img = Image.alpha_composite(img.convert("RGBA"), overlay.filter(ImageFilter.GaussianBlur(radius=30))).convert("RGB")
        img = add_window_light(img, palette, side="left", width_ratio=0.2)

    elif name == "interior":
        palette = PALETTES["walnut"]
        img = generate_interior(size, palette, material="wood", composition="reception", horizon=0.60)
        return img

    elif name == "detail":
        palette = PALETTES["brass"]
        img = brushed_metal_texture(size, palette)
        # Etched / material stack detail
        draw = ImageDraw.Draw(img)
        for i in range(4):
            x = int(w * 0.15 + i * w * 0.22)
            y = int(h * 0.25)
            draw.rectangle([x, y, x + int(w * 0.12), y + int(h * 0.5)], fill=random.choice([PALETTES["walnut"].highlight, PALETTES["oak"].highlight, PALETTES["charcoal"].base]))
        img = add_window_light(img, palette, side="left", width_ratio=0.25)

    elif name == "maker":
        palette = PALETTES["oak"]
        img = create_canvas(size, palette.shadow)
        # Workbench background
        bg = wood_grain_texture((w, h), palette, scale=0.8, horizontal=True, knots=False)
        img.paste(bg, (0, 0))
        draw = ImageDraw.Draw(img)
        # Hands holding chisel/plane at lower centre
        hand_col = (190, 170, 145)
        hx, hy = w // 2, int(h * 0.68)
        draw.ellipse([hx - int(w * 0.18), hy - int(h * 0.1), hx + int(w * 0.18), hy + int(h * 0.1)], fill=hand_col)
        draw.rectangle([hx - int(w * 0.25), hy - int(h * 0.02), hx + int(w * 0.25), hy + int(h * 0.02)], fill=PALETTES["brass"].highlight)

    img = add_vignette(img, strength=0.45, color=(6, 6, 6))
    img = add_grain(img, intensity=5)
    return img


def generate_commercial(size: Tuple[int, int], name: str) -> Image.Image:
    """Generate commercial page images."""
    if name == "hero":
        palette = PALETTES["charcoal"]
        return generate_interior(size, palette, material="lacquer", composition="reception", horizon=0.60)
    elif name == "case-study-1":
        palette = PALETTES["ash"]
        return generate_interior(size, palette, material="wood", composition="office", horizon=0.62)
    elif name == "case-study-2":
        palette = PALETTES["oak"]
        return generate_interior(size, palette, material="wood", composition="retail", horizon=0.60)
    return create_canvas(size, PALETTES["dark"].shadow)


def generate_insight(size: Tuple[int, int], slug: str) -> Image.Image:
    """Generate journal article hero images."""
    if slug == "handleless-kitchens-future-proof":
        palette = PALETTES["charcoal"]
        return generate_interior(size, palette, material="lacquer", composition="countertop", horizon=0.62)
    elif slug == "quiet-luxury-walnut":
        palette = PALETTES["walnut"]
        return generate_interior(size, palette, material="wood", composition="wardrobe_room", horizon=0.58)
    elif slug == "storage-designed-for-living":
        palette = PALETTES["painted"]
        return generate_interior(size, palette, material="lacquer", composition="media_wall", horizon=0.62)
    return create_canvas(size, PALETTES["dark"].shadow)


# -----------------------------------------------------------------------------
# Data definitions
# -----------------------------------------------------------------------------

PROJECTS = [
    {
        "slug": "penthouse-wardrobe-suite",
        "palette": PALETTES["walnut"],
        "material": "wood",
        "composition": "wardrobe_room",
        "horizon": 0.58,
        "details": 6,
    },
    {
        "slug": "blackrock-kitchen",
        "palette": PALETTES["charcoal"],
        "material": "lacquer",
        "composition": "countertop",
        "horizon": 0.62,
        "details": 7,
    },
    {
        "slug": "shelbourne-fittings",
        "palette": PALETTES["walnut"],
        "material": "wood",
        "composition": "reception",
        "horizon": 0.60,
        "details": 5,
    },
    {
        "slug": "ranelagh-alcove-library",
        "palette": PALETTES["oak"],
        "material": "wood",
        "composition": "library",
        "horizon": 0.62,
        "details": 5,
    },
    {
        "slug": "dublin-office-fitout",
        "palette": PALETTES["ash"],
        "material": "wood",
        "composition": "office",
        "horizon": 0.62,
        "details": 8,
    },
    {
        "slug": "howth-walk-in-closet",
        "palette": PALETTES["walnut"],
        "material": "wood",
        "composition": "closet_boutique",
        "horizon": 0.58,
        "details": 6,
    },
    {
        "slug": "dalkey-retail-interior",
        "palette": PALETTES["oak"],
        "material": "wood",
        "composition": "retail",
        "horizon": 0.60,
        "details": 6,
    },
    {
        "slug": "malahide-media-wall",
        "palette": PALETTES["painted"],
        "material": "lacquer",
        "composition": "media_wall",
        "horizon": 0.62,
        "details": 7,
    },
]

SERVICES = [
    ("bespoke-kitchens", PALETTES["charcoal"], "countertop"),
    ("custom-wardrobes", PALETTES["walnut"], "wardrobe_room"),
    ("walk-in-closets", PALETTES["walnut"], "closet_boutique"),
    ("living-spaces", PALETTES["painted"], "media_wall"),
    ("office-fit-outs", PALETTES["ash"], "office"),
    ("retail-interiors", PALETTES["oak"], "retail"),
    ("hospitality", PALETTES["walnut"], "reception"),
    ("custom-solutions", PALETTES["brass"], "shelves"),
]

# Legacy material list used for existing JPEG assets.
MATERIALS = [
    ("european-oak", PALETTES["oak"], lambda s, p: wood_grain_texture(s, p, scale=1.2, horizontal=True)),
    ("american-walnut", PALETTES["walnut"], lambda s, p: wood_grain_texture(s, p, scale=1.2, horizontal=True)),
    ("white-ash", PALETTES["ash"], lambda s, p: wood_grain_texture(s, p, scale=1.3, horizontal=True)),
    ("painted-finishes", PALETTES["painted"], lacquer_texture),
    ("veneer-options", PALETTES["walnut"], lambda s, p: wood_grain_texture(s, p, scale=1.0, horizontal=True)),
    ("hardware", PALETTES["brass"], brushed_metal_texture),
]

# Expanded material definitions for v3 (WebP assets).
EXPANDED_MATERIALS = [
    {
        "id": "european-oak",
        "palette": PALETTES["oak"],
        "texture_fn": lambda s, p: wood_grain_texture(s, p, scale=1.2, horizontal=True),
        "application": ("library", "wood"),
    },
    {
        "id": "american-walnut",
        "palette": PALETTES["walnut"],
        "texture_fn": lambda s, p: wood_grain_texture(s, p, scale=1.2, horizontal=True),
        "application": ("wardrobe_room", "wood"),
    },
    {
        "id": "white-ash",
        "palette": PALETTES["ash"],
        "texture_fn": lambda s, p: wood_grain_texture(s, p, scale=1.3, horizontal=True),
        "application": ("office", "wood"),
    },
    {
        "id": "fumed-oak",
        "palette": PALETTES["oak"],
        "texture_fn": fumed_oak_texture,
        "application": ("cabinet_wall", "wood"),
    },
    {
        "id": "crown-walnut-veneer",
        "palette": PALETTES["walnut"],
        "texture_fn": crown_walnut_veneer_texture,
        "application": ("reception", "wood"),
    },
    {
        "id": "quarter-sawn-oak-veneer",
        "palette": PALETTES["oak"],
        "texture_fn": ray_fleck_oak_texture,
        "application": ("library", "wood"),
    },
    {
        "id": "satin-lacquer",
        "palette": PALETTES["painted"],
        "texture_fn": lacquer_texture,
        "application": ("media_wall", "lacquer"),
    },
    {
        "id": "deep-charcoal-lacquer",
        "palette": PALETTES["charcoal"],
        "texture_fn": lacquer_texture,
        "application": ("countertop", "lacquer"),
    },
    {
        "id": "honed-quartz",
        "palette": PALETTES["stone"],
        "texture_fn": stone_texture,
        "application": ("countertop", "stone"),
    },
    {
        "id": "aged-brass",
        "palette": PALETTES["brass"],
        "texture_fn": brushed_metal_texture,
        "application": ("shelves", "metal"),
    },
]

PROCESS_MOMENTS = [
    "discovery",
    "site-survey",
    "concept-design",
    "material-selection",
    "technical-drawings",
    "workshop-craft",
    "finishing",
    "installation-care",
]

SHOWROOM_IMAGES = ["exterior", "interior", "detail", "maker"]

COMMERCIAL_IMAGES = ["hero", "case-study-1", "case-study-2"]

INSIGHT_SLUGS = [
    "handleless-kitchens-future-proof",
    "quiet-luxury-walnut",
    "storage-designed-for-living",
]

TEAM = [
    ("founder", PALETTES["charcoal"]),
    ("workshop-manager", PALETTES["walnut"]),
    ("senior-craftsman", PALETTES["oak"]),
    ("design-consultant", PALETTES["ash"]),
]


# -----------------------------------------------------------------------------
# Main generation
# -----------------------------------------------------------------------------

def main():
    random.seed(42)
    root = "static/images"
    os.makedirs(root, exist_ok=True)

    # -------------------------------------------------------------------------
    # Heroes & section images (existing JPEG convention)
    # -------------------------------------------------------------------------
    hero = generate_interior((1920, 1080), PALETTES["dark"], material="lacquer", composition="cabinet_wall", horizon=0.62)
    save(hero, os.path.join(root, "hero-bg.jpg"))

    about_hero = generate_workshop((1920, 800))
    save(about_hero, os.path.join(root, "about-hero.jpg"))

    services_hero = generate_interior((1920, 800), PALETTES["charcoal"], material="lacquer", composition="countertop", horizon=0.62)
    save(services_hero, os.path.join(root, "services-hero.jpg"))

    projects_hero = generate_interior((1920, 800), PALETTES["walnut"], material="wood", composition="wardrobe_room", horizon=0.58)
    save(projects_hero, os.path.join(root, "projects-hero.jpg"))

    contact_hero = generate_interior((1920, 800), PALETTES["painted"], material="lacquer", composition="shelves", horizon=0.62)
    save(contact_hero, os.path.join(root, "contact-hero.jpg"))

    craft = generate_craftsmanship((1200, 800))
    save(craft, os.path.join(root, "craftsmanship.jpg"))

    workshop = generate_workshop((1200, 800))
    save(workshop, os.path.join(root, "about/workshop.jpg"))

    # -------------------------------------------------------------------------
    # Services (existing JPEG convention)
    # -------------------------------------------------------------------------
    for slug, palette, comp in SERVICES:
        img = generate_interior((1200, 800), palette, material="wood" if "wood" in palette.name else "lacquer", composition=comp, horizon=0.60)
        save(img, os.path.join(root, "services", f"{slug}.jpg"))

    # -------------------------------------------------------------------------
    # Service detail gallery images (new WebP, 4:3)
    # -------------------------------------------------------------------------
    for slug, palette, comp in SERVICES[:6]:
        img = generate_interior((1200, 900), palette, material="wood" if "wood" in palette.name else "lacquer", composition=comp, horizon=0.60)
        save_webp(img, os.path.join(root, "services", slug, "detail-1.webp"))

    # -------------------------------------------------------------------------
    # Materials (existing JPEG convention)
    # -------------------------------------------------------------------------
    for slug, palette, tex_fn in MATERIALS:
        img = generate_material_swatch((800, 800), palette, tex_fn)
        save(img, os.path.join(root, "materials", f"{slug}.jpg"))

    # -------------------------------------------------------------------------
    # Expanded materials (new WebP: swatch + application)
    # -------------------------------------------------------------------------
    for mat in EXPANDED_MATERIALS:
        mid = mat["id"]
        palette = mat["palette"]
        tex_fn = mat["texture_fn"]
        comp, material = mat["application"]

        swatch = generate_material_swatch((800, 800), palette, tex_fn)
        save_webp(swatch, os.path.join(root, "materials", mid, "swatch.webp"))

        application = generate_interior((1600, 900), palette, material=material, composition=comp, horizon=0.60)
        save_webp(application, os.path.join(root, "materials", mid, "application.webp"))

    # -------------------------------------------------------------------------
    # Process moments (new WebP, 16:9)
    # -------------------------------------------------------------------------
    for moment in PROCESS_MOMENTS:
        img = generate_process_moment((1600, 900), moment)
        save_webp(img, os.path.join(root, "process", f"{moment}.webp"))

    # -------------------------------------------------------------------------
    # Showroom (new WebP)
    # -------------------------------------------------------------------------
    showroom_specs = {
        "exterior": (1600, 900),
        "interior": (1600, 900),
        "detail": (800, 800),
        "maker": (900, 1200),
    }
    for name in SHOWROOM_IMAGES:
        img = generate_showroom(showroom_specs[name], name)
        save_webp(img, os.path.join(root, "showroom", f"{name}.webp"))

    # -------------------------------------------------------------------------
    # Commercial (new WebP, 16:9)
    # -------------------------------------------------------------------------
    commercial_specs = {
        "hero": (1920, 1080),
        "case-study-1": (1600, 900),
        "case-study-2": (1600, 900),
    }
    for name in COMMERCIAL_IMAGES:
        img = generate_commercial(commercial_specs[name], name)
        save_webp(img, os.path.join(root, "commercial", f"{name}.webp"))

    # -------------------------------------------------------------------------
    # Journal / Insights (new WebP, 16:9)
    # -------------------------------------------------------------------------
    for slug in INSIGHT_SLUGS:
        img = generate_insight((1600, 900), slug)
        save_webp(img, os.path.join(root, "insights", f"{slug}.webp"))

    # -------------------------------------------------------------------------
    # Projects (existing JPEG convention)
    # -------------------------------------------------------------------------
    for project in PROJECTS:
        slug = project["slug"]
        base_dir = os.path.join(root, "projects", slug)

        hero = generate_interior(
            (1600, 1000),
            project["palette"],
            material=project["material"],
            composition=project["composition"],
            horizon=project["horizon"],
        )
        save(hero, os.path.join(base_dir, "hero.jpg"))

        poster = generate_interior(
            (1600, 900),
            project["palette"],
            material=project["material"],
            composition=project["composition"],
            horizon=project["horizon"],
        )
        save(poster, os.path.join(base_dir, "video-poster.jpg"))

        detail_comps = ["cabinet_wall", "shelves", "countertop", "reception", "retail", "closet_boutique", "library", "office"]
        for i in range(1, project["details"] + 1):
            comp = detail_comps[(i - 1) % len(detail_comps)]
            mat = "wood" if "wood" in project["palette"].name or project["palette"].name in {"walnut", "oak", "ash"} else project["material"]
            detail = generate_interior((1200, 800), project["palette"], material=mat, composition=comp, horizon=project["horizon"])
            save(detail, os.path.join(base_dir, f"detail-{i}.jpg"))

    # -------------------------------------------------------------------------
    # Team (existing JPEG convention)
    # -------------------------------------------------------------------------
    for slug, palette in TEAM:
        img = generate_team_portrait((800, 1000), palette)
        save(img, os.path.join(root, "team", f"{slug}.jpg"))

    # -------------------------------------------------------------------------
    # OG images (existing JPEG convention)
    # -------------------------------------------------------------------------
    og_palettes = [
        ("og-default.jpg", PALETTES["dark"], "cabinet_wall"),
        ("og-home.jpg", PALETTES["walnut"], "wardrobe_room"),
        ("og-about.jpg", PALETTES["oak"], "library"),
        ("og-services.jpg", PALETTES["charcoal"], "countertop"),
        ("og-projects.jpg", PALETTES["walnut"], "closet_boutique"),
        ("og-contact.jpg", PALETTES["painted"], "shelves"),
    ]
    for filename, palette, comp in og_palettes:
        img = generate_interior((1200, 630), palette, material="wood" if palette.name in {"walnut", "oak", "ash"} else "lacquer", composition=comp, horizon=0.60)
        save(img, os.path.join("static", filename))

    print("\nAll images generated.")


if __name__ == "__main__":
    main()
