#!/usr/bin/env python3
"""Regenerate placeholder images with a lighter luxury palette."""
import hashlib
import random
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

ROOT = Path('/Users/mk/Documents/Personal/Code/tp/static/images')

# Luxury palette: warm woods, charcoal greys, brass/gold, off-white/cream
PALETTE = {
    'warm_wood': [(139, 90, 43), (160, 110, 60), (185, 130, 80), (210, 155, 105), (120, 75, 40)],
    'charcoal': [(60, 60, 65), (80, 80, 85), (45, 45, 50), (100, 100, 105)],
    'brass': [(190, 160, 90), (215, 185, 115), (170, 140, 70)],
    'cream': [(240, 235, 225), (230, 223, 210), (250, 247, 240)],
    'taupe': [(160, 150, 135), (180, 170, 155), (140, 130, 115)],
    'sage': [(130, 140, 120), (150, 160, 140)],
    'ink': [(30, 35, 45), (20, 25, 35)],
}


def seeded_rng(seed: str):
    h = hashlib.sha256(seed.encode()).hexdigest()
    return random.Random(h)


def choice(rng, items):
    return rng.choice(items)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient(width, height, c1, c2, direction='diagonal'):
    """Create a smooth RGB gradient."""
    base = np.zeros((height, width, 3), dtype=np.uint8)
    if direction == 'vertical':
        t = np.linspace(0, 1, height).reshape(-1, 1)
    elif direction == 'horizontal':
        t = np.linspace(0, 1, width).reshape(1, -1)
    elif direction == 'radial':
        y = np.linspace(-1, 1, height).reshape(-1, 1)
        x = np.linspace(-1, 1, width).reshape(1, -1)
        d = np.sqrt(x**2 + y**2)
        t = d / d.max()
    else:  # diagonal
        y = np.linspace(0, 1, height).reshape(-1, 1)
        x = np.linspace(0, 1, width).reshape(1, -1)
        t = (x + y) / 2
    for i in range(3):
        base[:, :, i] = (c1[i] + (c2[i] - c1[i]) * t).astype(np.uint8)
    return Image.fromarray(base)


def add_noise(img, rng, amount=0.04):
    """Add subtle film-grain-like noise."""
    arr = np.array(img).astype(np.float32)
    np_rng = np.random.default_rng(rng.randint(0, 2**31 - 1))
    noise = np_rng.uniform(-amount, amount, arr.shape) * 255
    arr = np.clip(arr + noise, 0, 255).astype(np.uint8)
    return Image.fromarray(arr)


def add_vignette(img, rng, strength=0.3):
    """Subtle vignette to keep edges from being too bright against dark page."""
    width, height = img.size
    mask = Image.new('L', (width, height), 0)
    draw = ImageDraw.Draw(mask)
    max_r = int(np.sqrt(width**2 + height**2) / 2)
    for r in range(max_r, -1, -1):
        alpha = int(255 * (1 - (r / max_r) ** 2) * strength)
        draw.ellipse([width//2 - r, height//2 - r, width//2 + r, height//2 + r], fill=alpha)
    vignette = Image.new('RGB', (width, height), (10, 10, 15))
    return Image.composite(vignette, img, mask)


def draw_furniture_suggestion(draw, width, height, rng, palette):
    """Draw abstract furniture/interior shapes."""
    # Choose a few horizontal/vertical planes to suggest cabinetry/walls/countertops
    n_planes = rng.randint(2, 4)
    for _ in range(n_planes):
        x1 = rng.randint(0, width)
        y1 = rng.randint(0, height)
        x2 = rng.randint(x1, width)
        y2 = rng.randint(y1, height)
        # prefer horizontal/vertical rectangles
        if rng.random() < 0.6:
            y2 = y1 + rng.randint(height // 8, height // 4)
        else:
            x2 = x1 + rng.randint(width // 8, width // 4)
        color = lerp(choice(rng, palette['cream']), choice(rng, palette['warm_wood']), rng.uniform(0.2, 0.7))
        color = (*color, int(rng.uniform(20, 60)))
        draw.rectangle([x1, y1, x2, y2], fill=color)

    # Thin brass/gold accent lines
    for _ in range(rng.randint(1, 4)):
        x = rng.randint(0, width)
        y = rng.randint(0, height)
        length = rng.randint(width // 6, width // 3)
        thickness = rng.randint(1, 4)
        color = choice(rng, palette['brass'])
        if rng.random() < 0.5:
            draw.line([(x, y), (x + length, y)], fill=color, width=thickness)
        else:
            draw.line([(x, y), (x, y + length)], fill=color, width=thickness)


def generate_image(path: Path):
    rel = path.relative_to(ROOT)
    seed = str(rel)
    rng = seeded_rng(seed)

    with Image.open(path) as im:
        width, height = im.size
        mode = im.mode

    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)

    # Determine palette emphasis from path
    parts = str(rel).lower()
    if 'team' in parts:
        emphasis = 'portrait'
    elif 'material' in parts or 'hardware' in parts:
        emphasis = 'material'
    elif 'service' in parts:
        emphasis = 'service'
    elif 'hero' in parts:
        emphasis = 'hero'
    else:
        emphasis = rng.choice(['hero', 'service', 'material'])

    # Build base colors
    if emphasis == 'portrait':
        # Warm, light studio backdrop with soft gradient
        c1 = choice(rng, PALETTE['cream'])
        c2 = lerp(choice(rng, PALETTE['cream']), choice(rng, PALETTE['warm_wood']), 0.25)
        img = gradient(width, height, c1, c2, rng.choice(['vertical', 'diagonal']))
    elif emphasis == 'material':
        # Wood/material swatch with subtle grain suggestion
        base = choice(rng, PALETTE['warm_wood'] + PALETTE['taupe'] + PALETTE['cream'])
        c1 = lerp(base, (255, 255, 255), 0.25)
        c2 = lerp(base, (0, 0, 0), 0.15)
        img = gradient(width, height, c1, c2, rng.choice(['diagonal', 'horizontal']))
        # add horizontal streaks to suggest wood grain
        grain_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        gdraw = ImageDraw.Draw(grain_layer)
        for y in range(0, height, rng.randint(3, 8)):
            alpha = rng.randint(8, 30)
            color = (*lerp(choice(rng, PALETTE['warm_wood']), (255,255,255), 0.3), alpha)
            gdraw.line([(0, y), (width, y + rng.randint(-10, 10))], fill=color, width=rng.randint(1, 3))
        img = Image.alpha_composite(img.convert('RGBA'), grain_layer).convert('RGB')
    elif emphasis == 'hero':
        # Dark-to-light gradient, but overall lighter than before
        c1 = lerp(choice(rng, PALETTE['cream']), choice(rng, PALETTE['warm_wood']), 0.3)
        c2 = lerp(choice(rng, PALETTE['warm_wood']), choice(rng, PALETTE['charcoal']), 0.4)
        img = gradient(width, height, c1, c2, rng.choice(['diagonal', 'radial']))
        # Add abstract interior planes
        planes_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(planes_layer)
        draw_furniture_suggestion(draw, width, height, rng, PALETTE)
        planes_layer = planes_layer.filter(ImageFilter.GaussianBlur(radius=max(width, height) / 60))
        img = Image.alpha_composite(img.convert('RGBA'), planes_layer).convert('RGB')
    else:
        # service / interior
        c1 = choice(rng, PALETTE['cream'])
        c2 = lerp(choice(rng, PALETTE['cream']), choice(rng, PALETTE['taupe']), 0.4)
        img = gradient(width, height, c1, c2, rng.choice(['vertical', 'horizontal', 'diagonal']))
        planes_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(planes_layer)
        draw_furniture_suggestion(draw, width, height, rng, PALETTE)
        planes_layer = planes_layer.filter(ImageFilter.GaussianBlur(radius=max(width, height) / 50))
        img = Image.alpha_composite(img.convert('RGBA'), planes_layer).convert('RGB')

    # Common finishing
    img = add_noise(img, rng, amount=0.025)
    img = add_vignette(img, rng, strength=0.25)

    # Ensure overall brightness is lifted compared to old dark images
    # We do this by brightening a bit
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(1.08)

    # Save with high quality
    if path.suffix.lower() == '.png':
        img.save(path, 'PNG')
    else:
        img.save(path, 'JPEG', quality=92, optimize=True)

    return rel


def main():
    files = sorted([
        p for p in ROOT.rglob('*')
        if p.is_file() and p.suffix.lower() in ('.jpg', '.jpeg', '.png', '.webp')
    ])
    print(f'Found {len(files)} images to regenerate')
    for p in files:
        generate_image(p)
        print(f'  regenerated {p.relative_to(ROOT)}')
    print('Done.')


if __name__ == '__main__':
    main()
