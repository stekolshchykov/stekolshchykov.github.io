#!/usr/bin/env python3
"""Generate placeholder MP4 videos for referenced /videos paths."""

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "static" / "videos"
FONT = "/System/Library/Fonts/Helvetica.ttc"


def make_video(path: Path, width: int, height: int, label: str, subtitle: str = "") -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp_img = path.with_suffix(".tmp.jpg")

    # Generate a still frame
    panel_margin = int(min(width, height) * 0.08)
    cmd_img = [
        "magick",
        "-size",
        f"{width}x{height}",
        "gradient:#1a1a1a-#0d0d0d",
        "-fill",
        "rgba(255,255,255,0.03)",
        "-stroke",
        "rgba(255,255,255,0.12)",
        "-strokewidth",
        str(max(2, int(min(width, height) * 0.003))),
        "-draw",
        f"rectangle {panel_margin},{panel_margin} {width - panel_margin},{height - panel_margin}",
        "-fill",
        "rgba(255,255,255,0.08)",
        "-font",
        FONT,
        "-pointsize",
        str(max(24, int(min(width, height) * 0.05))),
        "-gravity",
        "southeast",
        "-annotate",
        f"+{panel_margin + 20}+{panel_margin + 20}",
        "Áras Living",
        "-fill",
        "#f5f5f5",
        "-font",
        FONT,
        "-pointsize",
        str(max(28, int(min(width, height) * 0.075))),
        "-gravity",
        "center",
        "-annotate",
        "+0+0",
        label,
        str(tmp_img),
    ]
    subprocess.run(cmd_img, check=True)

    # Convert still frame to 5-second MP4
    cmd_vid = [
        "ffmpeg",
        "-y",
        "-loop",
        "1",
        "-i",
        str(tmp_img),
        "-c:v",
        "libx264",
        "-t",
        "5",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        "-vf",
        "fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2",
        str(path),
    ]
    subprocess.run(cmd_vid, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    tmp_img.unlink()
    print(f"Generated {path}")


def main() -> None:
    make_video(ROOT / "hero.mp4", 1920, 1080, "Áras Living", "Handcrafted Furniture")
    make_video(
        ROOT / "projects" / "penthouse-wardrobe-suite" / "overview.mp4",
        1920,
        1080,
        "Penthouse Wardrobe Suite",
        "Project Walkthrough",
    )


if __name__ == "__main__":
    main()
