"""Cut labelled grid crops of ticket-24 masters for visual coordinate reading."""
from PIL import Image, ImageDraw
from pathlib import Path

SRC = Path(r"C:\Users\sm\Desktop\portfolio\.scratch\sm-dex\assets\ticket-24")
OUT = Path(r"C:\Users\sm\Desktop\portfolio\.scratch\sm-dex\prototypes\gen-families\_probe")
OUT.mkdir(exist_ok=True)

CROPS = {
    "gb-assembled": ("gen-1-2-game-boy-master.png", (84, 164, 868, 856)),
    "gb-exploded-low": ("gen-1-2-game-boy-master.png", (900, 480, 1536, 1024)),
    "gb-exploded-high": ("gen-1-2-game-boy-master.png", (900, 20, 1536, 500)),
    "rotom-assembled": ("gen-6-9-modern-master.png", (24, 200, 910, 900)),
    "rotom-exploded": ("gen-6-9-modern-master.png", (940, 120, 1490, 940)),
}

for name, (src, box) in CROPS.items():
    img = Image.open(SRC / src).convert("RGBA").crop(box)
    bg = Image.new("RGBA", img.size, (255, 0, 255, 255))
    bg.alpha_composite(img)
    d = ImageDraw.Draw(bg)
    for gx in range(box[0] - box[0] % 50, box[2], 50):
        lx = gx - box[0]
        major = gx % 100 == 0
        d.line([(lx, 0), (lx, img.height)], fill=(0, 255, 0, 110) if major else (0, 255, 0, 45), width=1)
        if major:
            d.text((lx + 2, 2), str(gx), fill=(0, 120, 0, 255))
    for gy in range(box[1] - box[1] % 50, box[3], 50):
        ly = gy - box[1]
        major = gy % 100 == 0
        d.line([(0, ly), (img.width, ly)], fill=(0, 255, 0, 110) if major else (0, 255, 0, 45), width=1)
        if major:
            d.text((2, ly + 2), str(gy), fill=(0, 120, 0, 255))
    bg.convert("RGB").save(OUT / f"{name}.png")
    print(name, img.size, "->", OUT / f"{name}.png")
