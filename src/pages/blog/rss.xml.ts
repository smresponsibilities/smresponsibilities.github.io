import posts from '../../data/linkedin-posts.json';
import { extractLeetCodeQuestions } from '../../utils/leetcode';

const SITE = 'https://shivammahajan.com';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const items = [...(posts as any[])].sort((a, b) => b.day - a.day).slice(0, 100).map((p) => {
    const t = String(p.content ?? p.text ?? '');
    const lcs = extractLeetCodeQuestions(t);
    const itemTitle = lcs.length > 0 
      ? `Day ${p.day} | LeetCode ${lcs[0].number}: ${lcs[0].title}`
      : `Day ${p.day} | 2,002 Days of Code`;
    return `<item><title>${esc(itemTitle)}</title><link>${SITE}/blog/day-${p.day}/</link><guid>${SITE}/blog/day-${p.day}/</guid>${p.date ? `<pubDate>${new Date(p.date).toUTCString()}</pubDate>` : ''}<author>shivammahajan.mail@gmail.com (Shivam Mahajan)</author><description>${esc(t.slice(0, 400))}</description></item>`;
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Shivam Mahajan — Days of Code</title><link>${SITE}/blog/</link><description>Daily software development and algorithmic engineering progress by Shivam Mahajan</description><language>en-in</language><atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml" />${items.join('')}</channel></rss>`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
