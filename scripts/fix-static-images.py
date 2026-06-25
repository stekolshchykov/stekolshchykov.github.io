#!/usr/bin/env python3
"""Regenerate existing 0-byte static image files with valid placeholders."""

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "static"
FONT = "/System/Library/Fonts/Helvetica.ttc"


def make_image(path: Path, width: int, height: int, label: str) -> None:
    cmd = [
        "magick",
        "-size",
        f"{width}x{height}",
        "gradient:#1a1a1a-#0d0d0d",
        "-fill",
        "rgba(255,255,255,0.06)",
        "-stroke",
        "rgba(255,255,255,0.15)",
        "-strokewidth",
        str(max(2, int(min(width, height) * 0.004))),
        "-draw",
        f"rectangle {int(width * 0.08)},{int(height * 0.08)} {int(width * 0.92)},{int(height * 0.92)}",
        "-fill",
        "#f5f5f5",
        "-font",
        FONT,
        "-pointsize",
        str(max(14, int(min(width, height) * 0.12))),
        "-gravity",
        "center",
        "-annotate",
        "+0+0",
        label,
        str(path),
    ]
    subprocess.run(cmd, check=True)
    print(f"Regenerated {path}")


def main() -> None:
    files = [
        ("og-default.jpg", 1200, 630, "Áras Living"),
        ("og-home.jpg", 1200, 630, "Áras Living Home"),
        ("og-about.jpg", 1200, 630, "Áras Living About"),
        ("og-services.jpg", 1200, 630, "Áras Living Services"),
        ("og-projects.jpg", 1200, 630, "Áras Living Projects"),
        ("og-contact.jpg", 1200, 630, "Áras Living Contact"),
        ("apple-touch-icon.png", 180, 180, "Á"),
        ("favicon-32x32.png", 32, 32, "Á"),
        ("favicon.ico", 32, 32, "Á"),
    ]
    for filename, w, h, label in files:
        path = ROOT / filename
        make_image(path, w, h, label)


if __name__ == "__main__":
    main()
