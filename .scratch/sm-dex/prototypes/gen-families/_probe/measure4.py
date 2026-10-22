"""ASCII alpha-silhouette dumps to identify part shapes numerically."""
from PIL import Image
from pathlib import Path

SRC = Path(r"C:\Users\sm\Desktop\portfolio\.scratch\sm-dex\assets\ticket-24")

def silhouette(img, box, cols=56):
    region = img.crop(box)
    rows = max(1, round(cols * region.height / region.width / 2))
    small = region.resize((cols, rows), Image.BILINEAR)
    px = small.load()
    chars = " .:*#@"
    lines = []
    for y in range(rows):
        line = ""
        for x in range(cols):
            a = px[x, y][3]
            line += chars[min(5, a * 6 // 256)]
        lines.append(line)
    return "\n".join(lines)

JOBS = [
    ("gen-1-2-game-boy-master.png", "dpad-A", (922, 728, 1028, 834)),
    ("gen-1-2-game-boy-master.png", "dpad-B", (1054, 728, 1158, 832)),
    ("gen-1-2-game-boy-master.png", "mag-1", (1210, 730, 1286, 804)),
    ("gen-1-2-game-boy-master.png", "mag-2", (1300, 734, 1370, 802)),
    ("gen-1-2-game-boy-master.png", "mag-3", (1396, 730, 1466, 800)),
    ("gen-1-2-game-boy-master.png", "pill-1", (926, 866, 1020, 904)),
    ("gen-1-2-game-boy-master.png", "pill-2", (1060, 866, 1152, 904)),
    ("gen-1-2-game-boy-master.png", "pill-3", (1194, 866, 1270, 904)),
    ("gen-1-2-game-boy-master.png", "pill-4", (1290, 866, 1356, 904)),
    ("gen-1-2-game-boy-master.png", "plate-grey-holes", (962, 44, 1468, 498)),
    ("gen-1-2-game-boy-master.png", "panel-dark", (964, 520, 1452, 704)),
]

for name, label, box in JOBS:
    img = Image.open(SRC / name).convert("RGBA")
    print(f"\n=== {name} :: {label} {box}")
    print(silhouette(img, box))
