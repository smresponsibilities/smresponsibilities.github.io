import posts from '../../data/linkedin-posts.json';
const SITE = 'https://shivammahajan.com';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export function GET() {
  const items = [...(posts as any[])].sort((a, b) => b.day - a.day).slice(0, 50).map((p) => {
    const t = String(p.content ?? p.text ?? '');
    return `<item><title>Day ${p.day}</title><link>${SITE}/blog/day-${p.day}/</link><guid>${SITE}/blog/day-${p.day}/</guid>${p.date ? `<pubDate>${new Date(p.date).toUTCString()}</pubDate>` : ''}<description>${esc(t.slice(0, 300))}</description></item>`;
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Days of Code</title><link>${SITE}/blog/</link><description>Daily software development progress by Shivam Mahajan</description>${items.join('')}</channel></rss>`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml' } });
}
