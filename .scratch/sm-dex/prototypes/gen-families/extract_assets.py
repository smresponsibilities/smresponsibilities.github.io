"""Extract approved ticket-24 pixels into reusable prototype layers.

Crops existing RGBA pixels only. No redraw, recolour, trace, or generation.
Run: python extract_assets.py
"""
from __future__ import annotations

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parents[1] / "assets" / "ticket-24"
OUTPUT = ROOT / "assets"

GB = "gen-1-2-game-boy-master.png"
G45O = "gen-4-5-open-master.png"
G45C = "gen-4-5-closed-master.png"
ROT = "gen-6-9-modern-master.png"

# name -> (master, crop box, owner, target box on page canvas, measured|assigned)
COMPONENTS = {
    # Gen I/II Game Boy. Body is stationary; dpad/A/B faces overlay their baked
    # rest positions; START/SELECT pills are not baked on the body, so their
    # positions are assigned and recorded here.
    "gb-body": (GB, (80, 158, 872, 870), "static", (80, 158, 872, 870), "measured"),
    "gb-dpad-face": (GB, (922, 728, 1028, 834), "moving", (143, 604, 249, 708), "measured"),
    "gb-dpad-base": (GB, (1054, 728, 1158, 832), "fixed", (144, 604, 248, 708), "measured"),
    "gb-a-face": (GB, (1210, 730, 1286, 804), "moving", (730, 594, 806, 668), "measured"),
    "gb-b-face": (GB, (1396, 730, 1466, 800), "moving", (624, 646, 694, 716), "measured"),
    "gb-button-base": (GB, (1300, 734, 1370, 802), "fixed", (626, 648, 696, 716), "measured"),
    "gb-pill-start": (GB, (926, 866, 1020, 904), "moving", (296, 772, 390, 810), "assigned"),
    "gb-pill-select": (GB, (1060, 866, 1152, 904), "moving", (420, 772, 512, 810), "assigned"),
    "gb-led": (GB, (108, 320, 128, 338), "static", (108, 320, 128, 338), "measured"),

    # Gen IV/V open device. The four deck pieces are exploded twins:
    # cross face/base and ring face/base. Small round + pill controls are not
    # baked anywhere at rest, so their chin positions are assigned.
    "g45-shell": (G45O, (78, 142, 716, 662), "static", (78, 142, 716, 662), "measured"),
    "g45-cross-face": (G45O, (78, 766, 208, 900), "moving", (231, 666, 361, 800), "measured"),
    "g45-cross-base": (G45O, (230, 766, 362, 900), "fixed", (230, 666, 362, 800), "measured"),
    "g45-ring-face": (G45O, (428, 760, 576, 908), "moving", (600, 664, 748, 812), "measured"),
    "g45-ring-base": (G45O, (602, 762, 746, 906), "fixed", (602, 666, 746, 810), "measured"),
    "g45-start-face": (G45O, (804, 796, 892, 884), "moving", (559, 470, 647, 558), "assigned"),
    "g45-start-base": (G45O, (914, 796, 1004, 884), "fixed", (558, 469, 648, 557), "assigned"),
    "g45-home-pill": (G45O, (1254, 832, 1378, 862), "moving", (430, 722, 554, 752), "assigned"),
    "g45-pill-a": (G45O, (1054, 804, 1118, 834), "moving", (590, 720, 654, 750), "assigned"),
    "g45-pill-b": (G45O, (1136, 854, 1200, 884), "moving", (590, 768, 654, 796), "assigned"),

    # Gen IV/V lid parts from the closed master.
    "g45-lid-outer": (G45C, (130, 100, 610, 830), "lid-outer", (130, 100, 610, 830), "measured"),
    "g45-lid-inner": (G45C, (880, 100, 1210, 648), "lid-inner", (880, 100, 1210, 648), "measured"),
    "g45-hinge": (G45C, (1308, 174, 1386, 574), "static", (1308, 174, 1386, 574), "measured"),
    "g45-lens": (G45C, (910, 714, 1080, 888), "static", (910, 714, 1080, 888), "measured"),

    # Gen VI-IX Rotom. Frame is one piece with both apertures and cyan rims
    # baked. Wings, antenna and tail attach to assigned edge points. The four
    # chin buttons are not baked; positions assigned.
    "rot-body": (ROT, (36, 204, 892, 794), "static", (36, 204, 892, 794), "measured"),
    "rot-wing-left": (ROT, (948, 620, 1034, 784), "static", (20, 560, 106, 724), "assigned"),
    "rot-wing-right": (ROT, (1376, 620, 1464, 784), "static", (858, 560, 946, 724), "assigned"),
    "rot-antenna": (ROT, (1170, 112, 1258, 234), "static", (420, 130, 508, 252), "assigned"),
    "rot-tail": (ROT, (1156, 694, 1256, 746), "static", (400, 760, 500, 812), "assigned"),
    "rot-btn-o1": (ROT, (960, 858, 1032, 902), "moving", (300, 712, 372, 756), "assigned"),
    "rot-btn-o2": (ROT, (1072, 858, 1144, 902), "moving", (392, 712, 464, 756), "assigned"),
    "rot-btn-c1": (ROT, (1254, 858, 1326, 902), "moving", (486, 712, 558, 756), "assigned"),
    "rot-btn-c2": (ROT, (1360, 858, 1430, 902), "moving", (578, 712, 648, 756), "assigned"),
}


# Direction slices cut from whole faces so each arm can press on its own.
# name -> (face component, box within the face crop)
SLICES = {
    "gb-dpad-up": ("gb-dpad-face", (33, 0, 73, 52)),
    "gb-dpad-down": ("gb-dpad-face", (33, 52, 73, 104)),
    "gb-dpad-left": ("gb-dpad-face", (0, 32, 53, 72)),
    "gb-dpad-right": ("gb-dpad-face", (53, 32, 106, 72)),
    "gb-dpad-center": ("gb-dpad-face", (33, 32, 73, 72)),
    "g45-cross-up": ("g45-cross-face", (44, 0, 86, 67)),
    "g45-cross-down": ("g45-cross-face", (44, 67, 86, 134)),
    "g45-cross-left": ("g45-cross-face", (0, 44, 65, 90)),
    "g45-cross-right": ("g45-cross-face", (65, 44, 130, 90)),
    "g45-cross-center": ("g45-cross-face", (44, 44, 86, 90)),
    "g45-ring-up": ("g45-ring-face", (37, 0, 111, 74)),
    "g45-ring-down": ("g45-ring-face", (37, 74, 111, 148)),
    "g45-ring-left": ("g45-ring-face", (0, 37, 74, 111)),
    "g45-ring-right": ("g45-ring-face", (74, 37, 148, 111)),
}


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = {"masters": {}, "components": {}, "generatedSlices": {}}

    for source_name in sorted({c[0] for c in COMPONENTS.values()}):
        image = Image.open(SOURCE / source_name)
        manifest["masters"][source_name] = {
            "path": f"../../assets/ticket-24/{source_name}",
            "size": [image.width, image.height],
        }

    extracted = {}
    for name, (source_name, box, owner, target, origin) in COMPONENTS.items():
        image = Image.open(SOURCE / source_name).convert("RGBA").crop(box)
        image.save(OUTPUT / f"{name}.png")
        extracted[name] = image
        manifest["components"][name] = {
            "source": source_name,
            "crop": {"x": box[0], "y": box[1], "width": box[2] - box[0], "height": box[3] - box[1]},
            "mask": "source alpha",
            "owner": owner,
            "target": {
                "x": target[0], "y": target[1],
                "width": target[2] - target[0], "height": target[3] - target[1],
            },
            "positionOrigin": origin,
            "file": f"assets/{name}.png",
        }

    for name, (face, box) in SLICES.items():
        extracted[face].crop(box).save(OUTPUT / f"{name}.png")
        manifest["generatedSlices"][name] = {
            "method": "crop from face; no pixel changes",
            "face": face,
            "boxWithinFace": {"x": box[0], "y": box[1], "width": box[2] - box[0], "height": box[3] - box[1]},
            "file": f"assets/{name}.png",
        }

    (OUTPUT / "extraction-manifest.json").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8"
    )
    print(f"extracted {len(COMPONENTS)} components -> {OUTPUT}")


if __name__ == "__main__":
    main()
