#!/usr/bin/env python3
"""Generate Áras Living placeholder images for all referenced /images paths."""

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "static" / "images"
FONT = "/System/Library/Fonts/Helvetica.ttc"
BRAND = "Áras Living"


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def make_image(path: Path, width: int, height: int, label: str, subtitle: str = "") -> None:
    path.parent.mkdir(parents=True, exist_ok=True)

    # Dark luxury gradient background
    gradient = "gradient:#1a1a1a-#0d0d0d"
    if "Oak" in label or "oak" in label.lower():
        gradient = "gradient:#3d2b1f-#1a120e"
    elif "Walnut" in label or "walnut" in label.lower():
        gradient = "gradient:#2e1f1a-#120c0a"
    elif "Ash" in label or "ash" in label.lower():
        gradient = "gradient:#4a4a42-#1e1e1b"
    elif "Paint" in label or "painted" in label.lower():
        gradient = "gradient:#2a2a2a-#101010"
    elif "Veneer" in label:
        gradient = "gradient:#3d2b1f-#18100c"
    elif "Hardware" in label:
        gradient = "gradient:#2a2a2a-#0d0d0d"
    elif "Kitchen" in label:
        gradient = "gradient:#262626-#0f0f0f"
    elif "Wardrobe" in label or "Closet" in label:
        gradient = "gradient:#2e2620-#14100d"
    elif "Library" in label:
        gradient = "gradient:#332a22-#15120f"
    elif "Office" in label:
        gradient = "gradient:#2a2a2a-#111111"
    elif "Retail" in label:
        gradient = "gradient:#2b2b2b-#101010"
    elif "Media" in label:
        gradient = "gradient:#222222-#0a0a0a"
    elif "Hospitality" in label or "Hotel" in label:
        gradient = "gradient:#2e2626-#121010"

    # Base image with gradient
    cmd = [
        "magick",
        "-size",
        f"{width}x{height}",
        gradient,
    ]

    # Add a subtle geometric panel
    panel_margin = int(min(width, height) * 0.08)
    panel_w = width - panel_margin * 2
    panel_h = height - panel_margin * 2
    border_w = max(2, int(min(width, height) * 0.003))

    cmd += [
        "-fill",
        "rgba(255,255,255,0.03)",
        "-stroke",
        "rgba(255,255,255,0.12)",
        "-strokewidth",
        str(border_w),
        "-draw",
        f"rectangle {panel_margin},{panel_margin} {panel_margin + panel_w},{panel_margin + panel_h}",
    ]

    # Brand watermark
    brand_size = max(24, int(min(width, height) * 0.05))
    cmd += [
        "-fill",
        "rgba(255,255,255,0.10)",
        "-font",
        FONT,
        "-pointsize",
        str(brand_size),
        "-gravity",
        "southeast",
        "-annotate",
        f"+{panel_margin + 20}+{panel_margin + 20}",
        BRAND,
    ]

    # Main label
    label_size = max(28, int(min(width, height) * 0.075))
    cmd += [
        "-fill",
        "#f5f5f5",
        "-font",
        FONT,
        "-pointsize",
        str(label_size),
        "-gravity",
        "center",
        "-annotate",
        "+0+0",
        label,
    ]

    # Subtitle
    if subtitle:
        sub_size = max(16, int(min(width, height) * 0.035))
        cmd += [
            "-fill",
            "rgba(245,245,245,0.7)",
            "-font",
            FONT,
            "-pointsize",
            str(sub_size),
            "-gravity",
            "center",
            "-annotate",
            f"+0+{int(label_size * 0.9)}",
            subtitle,
        ]

    cmd += [str(path)]
    run(cmd)
    print(f"Generated {path}")


def slug_to_title(slug: str) -> str:
    return slug.replace("-", " ").title()


def main() -> None:
    projects = [
        ("penthouse-wardrobe-suite", 6, True),
        ("blackrock-kitchen", 7, False),
        ("shelbourne-fittings", 5, False),
        ("ranelagh-alcove-library", 5, False),
        ("dublin-office-fitout", 8, False),
        ("howth-walk-in-closet", 6, False),
        ("dalkey-retail-interior", 6, False),
        ("malahide-media-wall", 7, False),
    ]

    for slug, details, has_video in projects:
        title = slug_to_title(slug)
        make_image(
            ROOT / "projects" / slug / "hero.jpg",
            1200,
            800,
            title,
            "Áras Living Project",
        )
        for i in range(1, details + 1):
            make_image(
                ROOT / "projects" / slug / f"detail-{i}.jpg",
                800,
                1000,
                f"Detail {i}",
                title,
            )
        if has_video:
            make_image(
                ROOT / "projects" / slug / "video-poster.jpg",
                1200,
                800,
                title,
                "Video",
            )

    materials = [
        ("european-oak.jpg", "European Oak"),
        ("american-walnut.jpg", "American Walnut"),
        ("white-ash.jpg", "White Ash"),
        ("painted-finishes.jpg", "Painted Finishes"),
        ("veneer-options.jpg", "Veneer Options"),
        ("hardware.jpg", "Hardware"),
    ]
    for filename, label in materials:
        make_image(ROOT / "materials" / filename, 600, 600, label, "Material")

    team = [
        ("founder.jpg", "Founder & Lead Designer"),
        ("workshop-manager.jpg", "Workshop Manager"),
        ("senior-craftsman.jpg", "Senior Craftsman"),
        ("design-consultant.jpg", "Design Consultant"),
    ]
    for filename, label in team:
        make_image(ROOT / "team" / filename, 800, 1000, label, "Áras Living Team")

    services = [
        ("custom-wardrobes.jpg", "Custom Wardrobes"),
        ("bespoke-kitchens.jpg", "Bespoke Kitchens"),
        ("walk-in-closets.jpg", "Walk-in Closets"),
        ("living-spaces.jpg", "Living Spaces"),
        ("office-fit-outs.jpg", "Office Fit-outs"),
        ("retail-interiors.jpg", "Retail Interiors"),
        ("hospitality.jpg", "Hospitality"),
        ("custom-solutions.jpg", "Custom Solutions"),
    ]
    for filename, label in services:
        make_image(ROOT / "services" / filename, 1200, 800, label, "Áras Living Service")

    make_image(ROOT / "about" / "workshop.jpg", 1200, 800, "Áras Living Workshop", "Dublin, Ireland")
    make_image(ROOT / "hero-poster.jpg", 1920, 1080, "Áras Living", "Handcrafted Furniture")
    make_image(ROOT / "about-hero.jpg", 1920, 1080, "About Áras Living", "Craft & Care")
    make_image(ROOT / "services-hero.jpg", 1920, 1080, "Services", "Bespoke Interiors")
    make_image(ROOT / "projects-hero.jpg", 1920, 1080, "Projects", "Selected Work")
    make_image(ROOT / "contact-hero.jpg", 1920, 1080, "Contact", "Start a Project")
    make_image(ROOT / "craftsmanship.jpg", 1200, 800, "Craftsmanship", "Precision Joinery")


if __name__ == "__main__":
    main()
