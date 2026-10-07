"""Extract approved ticket-23 pixels into reusable prototype layers.

This script only crops existing RGBA pixels. It does not redraw, recolour, trace, or generate art.
Run from anywhere with: python extract_assets.py
"""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parents[1] / "assets" / "ticket-23"
OUTPUT = ROOT / "assets"


COMPONENTS = {
    # Exact assembled rest-state layers. Hinges are removed from moving leaves.
    "stationary-body": ("stationary-body-master.png", (32, 96, 478, 912), "body", (0, 0, 420, 816)),
    "stationary-hinge": ("stationary-body-master.png", (478, 96, 534, 912), "hinge", (420, 0, 56, 816)),
    "moving-inner-lid": ("inner-lid-master.png", (116, 137, 533, 810), "inner-face", (420, 0, 420, 816)),
    "moving-outer-cover": ("outer-cover-master.png", (54, 98, 479, 923), "outer-face", (420, 0, 420, 816)),

    # Non-moving optical/chrome components.
    "screen-bezel-stationary": ("stationary-body-master.png", (1159, 145, 1511, 417), "body", (44, 199, 332, 307)),
    "screen-bezel-inner": ("inner-lid-master.png", (1064, 227, 1260, 365), "inner-face", (55, 167, 305, 168)),
    "lens": ("outer-cover-master.png", (1304, 212, 1407, 315), "outer-face", (33, 31, 85, 85)),
    "lamp-red": ("outer-cover-master.png", (1278, 406, 1316, 444), "outer-face", (135, 35, 31, 31)),
    "lamp-amber": ("outer-cover-master.png", (1339, 406, 1377, 444), "outer-face", (174, 35, 31, 31)),
    "lamp-green": ("outer-cover-master.png", (1400, 406, 1439, 444), "outer-face", (213, 35, 32, 31)),

    # Outer controls.
    "outer-latch-face": ("outer-cover-master.png", (1320, 539, 1396, 636), "outer-face", (26, 396, 58, 74)),
    "outer-slot": ("outer-cover-master.png", (1259, 737, 1457, 774), "outer-face", (129, 750, 173, 22)),

    # Stationary-body controls: extracted moving face followed by extracted fixed base.
    "stationary-round-face": ("stationary-body-master.png", (1200, 476, 1273, 548), "body", (38, 546, 58, 58)),
    "stationary-round-base": ("stationary-body-master.png", (1373, 476, 1445, 548), "body", (38, 546, 58, 58)),
    "stationary-red-pill-face": ("stationary-body-master.png", (1187, 578, 1288, 607), "body", (111, 545, 80, 29)),
    "stationary-red-pill-base": ("stationary-body-master.png", (1359, 578, 1459, 607), "body", (111, 545, 80, 29)),
    "stationary-blue-pill-face": ("stationary-body-master.png", (1187, 640, 1288, 668), "body", (214, 545, 90, 28)),
    "stationary-blue-pill-base": ("stationary-body-master.png", (1359, 640, 1459, 669), "body", (214, 545, 90, 28)),
    "stationary-green-face": ("stationary-body-master.png", (1182, 699, 1296, 766), "body", (111, 605, 139, 85)),
    "stationary-green-base": ("stationary-body-master.png", (1351, 699, 1467, 766), "body", (111, 605, 139, 85)),
    "stationary-dpad-face": ("stationary-body-master.png", (1183, 797, 1296, 911), "body", (282, 577, 124, 124)),
    "stationary-dpad-base": ("stationary-body-master.png", (1353, 797, 1469, 911), "body", (282, 577, 124, 124)),
    "stationary-grey-pill-face": ("stationary-body-master.png", (357, 638, 397, 668), "body", (325, 542, 38, 29)),
    "bezel-round-face": ("stationary-body-master.png", (1195, 359, 1233, 397), "body", (85, 458, 31, 31)),

    # Inner-lid controls.
    "inner-keypad-face": ("inner-lid-master.png", (1064, 394, 1263, 506), "inner-face", (55, 355, 304, 136)),
    "inner-keypad-base": ("inner-lid-master.png", (1283, 394, 1481, 505), "inner-face", (55, 355, 304, 136)),
    "inner-white-face": ("inner-lid-master.png", (1064, 541, 1192, 608), "inner-face", (51, 536, 124, 77)),
    "inner-white-base": ("inner-lid-master.png", (1295, 542, 1408, 609), "inner-face", (51, 536, 124, 77)),
    "inner-pill-face": ("inner-lid-master.png", (1213, 561, 1263, 586), "inner-face", (254, 516, 105, 30)),
    "inner-pill-base": ("inner-lid-master.png", (1432, 566, 1479, 590), "inner-face", (254, 516, 105, 30)),
    "inner-green-left-face": ("inner-lid-master.png", (1065, 651, 1160, 708), "inner-face", (52, 663, 137, 76)),
    "inner-green-right-face": ("inner-lid-master.png", (1175, 651, 1262, 708), "inner-face", (218, 663, 141, 76)),
    "inner-green-base": ("inner-lid-master.png", (1295, 651, 1408, 708), "inner-face", (52, 663, 137, 76)),
    "inner-confirm-face": ("inner-lid-master.png", (1431, 648, 1480, 696), "inner-face", (310, 573, 50, 59)),
}


def crop(name: str, source_name: str, box: tuple[int, int, int, int]) -> Image.Image:
    image = Image.open(SOURCE / source_name).convert("RGBA")
    result = image.crop(box)
    result.save(OUTPUT / f"{name}.png")
    return result


def slice_grid(name: str, image: Image.Image, columns: int, rows: int) -> list[str]:
    files = []
    for row in range(rows):
        for column in range(columns):
            x0 = round(image.width * column / columns)
            x1 = round(image.width * (column + 1) / columns)
            y0 = round(image.height * row / rows)
            y1 = round(image.height * (row + 1) / rows)
            filename = f"{name}-{row * columns + column + 1:02d}-face.png"
            image.crop((x0, y0, x1, y1)).save(OUTPUT / filename)
            files.append(filename)
    return files


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = {"masters": {}, "components": {}, "generatedSlices": {}}

    for source_name in sorted({item[0] for item in COMPONENTS.values()}):
        source = Image.open(SOURCE / source_name)
        manifest["masters"][source_name] = {
            "path": f"../../assets/ticket-23/{source_name}",
            "size": [source.width, source.height],
            "mode": source.mode,
        }

    extracted = {}
    for name, (source_name, box, owner, target) in COMPONENTS.items():
        image = crop(name, source_name, box)
        extracted[name] = image
        manifest["components"][name] = {
            "source": source_name,
            "crop": {"x": box[0], "y": box[1], "width": box[2] - box[0], "height": box[3] - box[1]},
            "mask": "source alpha",
            "owner": owner,
            "target": {"x": target[0], "y": target[1], "width": target[2], "height": target[3]},
            "file": f"assets/{name}.png",
            "extractedSize": [image.width, image.height],
        }

    manifest["generatedSlices"]["inner-keypad"] = {
        "method": "5x2 crops from inner-keypad-face; no pixel changes",
        "files": slice_grid("inner-keypad", extracted["inner-keypad-face"], 5, 2),
    }
    manifest["generatedSlices"]["inner-white"] = {
        "method": "2x1 crops from inner-white-face; no pixel changes",
        "files": slice_grid("inner-white", extracted["inner-white-face"], 2, 1),
    }

    dpad = extracted["stationary-dpad-face"]
    dpad_slices = {
        "up": (38, 0, 75, 39),
        "left": (0, 38, 39, 76),
        "center": (38, 38, 75, 76),
        "right": (75, 38, dpad.width, 76),
        "down": (38, 76, 75, dpad.height),
    }
    dpad_files = []
    for direction, box in dpad_slices.items():
        filename = f"stationary-dpad-{direction}-face.png"
        dpad.crop(box).save(OUTPUT / filename)
        dpad_files.append(filename)
    manifest["generatedSlices"]["stationary-dpad"] = {
        "method": "arm and centre crops from stationary-dpad-face; no pixel changes",
        "files": dpad_files,
    }

    (OUTPUT / "extraction-manifest.json").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8"
    )


if __name__ == "__main__":
    main()
