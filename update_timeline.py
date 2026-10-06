import re

with open(r"src/pages/blog/timeline.astro", "r", encoding="utf-8") as f:
    text = f.read()

replacement = """            <details class="timeline-content">
              <summary>
                <span class="timeline-date">{post.date}</span>
                <h3>Day {post.day}</h3>
                {post.easterEgg && <span class="egg-badge">?? Glitch</span>}
              </summary>
              <div class="expanded">
                <p class="post-text">{post.content.slice(0, 150)}...</p>
                <a href={`/blog/day-${post.day}`} class="read-more">Read full page ?</a>
                {post.easterEgg && <p class="egg">?? {post.easterEgg}</p>}
              </div>
            </details>"""

text = re.sub(
    r"<div class=\"timeline-content\">.*?</div>",
    replacement,
    text,
    flags=re.DOTALL
)

# Add some styles for details/summary only if not already present
styles = """
  .timeline-content summary { cursor: pointer; list-style: none; }
  .timeline-content summary::-webkit-details-marker { display: none; }
  .timeline-content summary:hover { opacity: 0.8; }
  .timeline-content h3 { display: inline-block; margin: 0 10px 0 0; }
  .egg-badge { background: #ffaa00; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
  .expanded { margin-top: 10px; padding-top: 10px; border-top: 1px dashed #ccc; }
  .post-text { font-size: 0.95rem; color: #444; line-height: 1.5; margin-bottom: 0.5rem; }
  .read-more { font-size: 0.9rem; font-weight: bold; }
"""

if "timeline-content summary" not in text:
    text = text.replace("</style>", styles + "\n</style>")

with open(r"src/pages/blog/timeline.astro", "w", encoding="utf-8") as f:
    f.write(text)
