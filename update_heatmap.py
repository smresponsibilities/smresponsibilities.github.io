
import re

with open(r"d:\portfolio\src\pages\blog\index.astro", "r", encoding="utf-8") as f:
    text = f.read()

heatmap_html = """  <section id="archive-section">
    <h2>Complete History (Zoomed Out)</h2>
    <p>Every single day of the 1200+ day streak.</p>
    
    <div class="heatmap-container">
      <div class="heatmap">
        {posts.map(post => (
          <a href={`/blog/day-${post.day}`} 
             class={`heat-box ${post.easterEgg ? "has-glitch" : ""}`} 
             title={`Day ${post.day}: ${post.date} ${post.easterEgg ? "(Glitch)" : ""}`}>
          </a>
        ))}
      </div>
    </div>
  </section>"""

# Replace the archive-section
text = re.sub(
    r"<section id=\"archive-section\">.*?</section>",
    heatmap_html,
    text,
    flags=re.DOTALL
)

# Add heatmap styles
styles = """
  .heatmap-container {
    width: 100%;
    overflow-x: auto;
    padding: 1rem 0;
  }
  .heatmap {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    max-width: 800px;
  }
  .heat-box {
    width: 12px;
    height: 12px;
    background: #4ade80;
    border-radius: 2px;
    transition: transform 0.1s, opacity 0.2s;
  }
  .heat-box:hover {
    transform: scale(1.5);
    opacity: 0.8;
  }
  .heat-box.has-glitch {
    background: #f59e0b;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
"""

text = text.replace("</style>", styles + "\n</style>")

with open(r"d:\portfolio\src\pages\blog\index.astro", "w", encoding="utf-8") as f:
    f.write(text)

