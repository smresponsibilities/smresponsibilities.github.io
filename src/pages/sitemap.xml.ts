import posts from '../data/linkedin-posts.json';
const SITE = 'https://shivammahajan.com';
export function GET() {
  const months = [...new Set((posts as any[]).map((p) => String(p.date ?? '').slice(0, 7)).filter((m) => /^\d{4}-\d{2}$/.test(m)))];
  const urls = [
    '/', '/resume/', '/projects/', '/blog/', '/blog/timeline/', '/blog/milestones/',
    ...months.map((m) => `/blog/month/${m}/`),
    ...(posts as any[]).map((p) => `/blog/day-${p.day}/`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${SITE}${u}</loc></url>`).join('')}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
