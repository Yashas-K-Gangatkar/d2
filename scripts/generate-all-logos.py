#!/usr/bin/env python3
"""
Generate all logo sizes for web + Android from the source logo image.

Source: /home/z/my-project/upload/pasted_image_1785565608310.png (1254x1254)
Outputs:
  Web: favicon.png (32x32), icon-72..512, og-image (1200x630)
  Android: ic_launcher at mdpi(48), hdpi(72), xhdpi(96), xxhdpi(144), xxxhdpi(192)
"""
from PIL import Image, ImageDraw, ImageFilter
import os

SRC = "/home/z/my-project/upload/pasted_image_1785565608310.png"
WEB_DIR = "/home/z/my-project/public"
ANDROID_RES = "/home/z/my-project/notifetch-android/app/src/main/res"

# Load source
src = Image.open(SRC).convert("RGBA")
print(f"Source: {src.size[0]}x{src.size[1]} {src.mode}")

# === WEB ICONS ===
web_sizes = {
    "favicon.png": 32,
    "icons/icon-72x72.png": 72,
    "icons/icon-96x96.png": 96,
    "icons/icon-128x128.png": 128,
    "icons/icon-144x144.png": 144,
    "icons/icon-152x152.png": 152,
    "icons/icon-192x192.png": 192,
    "icons/icon-384x384.png": 384,
    "icons/icon-512x512.png": 512,
}

for filename, size in web_sizes.items():
    out_path = os.path.join(WEB_DIR, filename)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    resized = src.resize((size, size), Image.LANCZOS)
    resized.save(out_path, "PNG", optimize=True)
    print(f"  Web: {filename} ({size}x{size})")

# === OG IMAGE (1200x630) — logo centered on dark background ===
og = Image.new("RGBA", (1200, 630), (9, 9, 11, 255))  # #09090B background
logo_size = 400
logo = src.resize((logo_size, logo_size), Image.LANCZOS)
# Center the logo
og_x = (1200 - logo_size) // 2
og_y = (630 - logo_size) // 2
og.paste(logo, (og_x, og_y), logo)
og.save(os.path.join(WEB_DIR, "og-image.png"), "PNG", optimize=True)
print(f"  Web: og-image.png (1200x630)")

# === ANDROID LAUNCHER ICONS ===
# Standard Android icon densities
android_sizes = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}

for folder, size in android_sizes.items():
    out_dir = os.path.join(ANDROID_RES, folder)
    os.makedirs(out_dir, exist_ok=True)
    resized = src.resize((size, size), Image.LANCZOS)
    # Save as ic_launcher.png
    resized.save(os.path.join(out_dir, "ic_launcher.png"), "PNG", optimize=True)
    # Save as ic_launcher_round.png (same image, Android will mask it)
    resized.save(os.path.join(out_dir, "ic_launcher_round.png"), "PNG", optimize=True)
    print(f"  Android: {folder}/ic_launcher.png + ic_launcher_round.png ({size}x{size})")

# === ANDROID FOREGROUND (for adaptive icons) ===
# The foreground should be 108dp = 432px at xxxhdpi, with the logo centered
# in the inner 66% (safe zone for adaptive icon masking)
fg_sizes = {
    "mipmap-mdpi": 108,
    "mipmap-hdpi": 162,
    "mipmap-xhdpi": 216,
    "mipmap-xxhdpi": 324,
    "mipmap-xxxhdpi": 432,
}

for folder, size in fg_sizes.items():
    out_dir = os.path.join(ANDROID_RES, folder)
    os.makedirs(out_dir, exist_ok=True)
    # Create transparent canvas, paste logo at 62% size centered
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    logo_size = int(size * 0.62)
    logo = src.resize((logo_size, logo_size), Image.LANCZOS)
    offset = (size - logo_size) // 2
    canvas.paste(logo, (offset, offset), logo)
    canvas.save(os.path.join(out_dir, "ic_launcher_foreground.png"), "PNG", optimize=True)
    print(f"  Android: {folder}/ic_launcher_foreground.png ({size}x{size})")

# Also save a copy in drawable for the bitmap fallback
drawable_dir = os.path.join(ANDROID_RES, "drawable")
os.makedirs(drawable_dir, exist_ok=True)
fg_432 = Image.new("RGBA", (432, 432), (0, 0, 0, 0))
logo_268 = src.resize((268, 268), Image.LANCZOS)
fg_432.paste(logo_268, (82, 82), logo_268)
fg_432.save(os.path.join(drawable_dir, "ic_launcher_foreground_png.png"), "PNG", optimize=True)
print("  Android: drawable/ic_launcher_foreground_png.png (432x432)")

print("\n✅ All logos generated successfully!")
print(f"   Web: {len(web_sizes) + 1} files in public/")
print(f"   Android: {len(android_sizes) * 2 + len(fg_sizes) + 1} files in res/")
