import fs from 'node:fs';

const html = fs.readFileSync('dist/index.html', 'utf8');
const robots = fs.readFileSync('dist/robots.txt', 'utf8');
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const llms = fs.readFileSync('dist/llms.txt', 'utf8');

const content = (pattern) => html.match(pattern)?.[1] ?? '';
const title = content(/<title>([^<]+)<\/title>/);
const description = content(/<meta name="description" content="([^"]+)"/);
const jsonLdText = content(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
const jsonLd = JSON.parse(jsonLdText);
const types = jsonLd['@graph'].map((entry) => entry['@type']);

const checks = {
  title: title === 'Shivam Mahajan — Software Developer' && title.length <= 60,
  description: description.length >= 140 && description.length <= 160,
  canonical: html.includes('<link rel="canonical" href="https://shivammahajan.com/">'),
  social: ['og:title', 'og:description', 'og:image', 'og:url', 'twitter:card', 'twitter:image'].every(name => html.includes(`property="${name}"`) || html.includes(`name="${name}"`)),
  schema: ['WebSite', 'ProfilePage', 'Person'].every(type => types.includes(type)),
  h1: /<h1[^>]*id="device-heading"[^>]*>Shivam Mahajan — Software Developer<\/h1>/.test(html),
  answerFirst: html.includes('Shivam Mahajan is a software developer building production systems'),
  robots: robots.includes('User-agent: *') && robots.includes('Allow: /') && robots.includes('Sitemap: https://shivammahajan.com/sitemap.xml'),
  sitemap: sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"') && sitemap.includes('<loc>https://shivammahajan.com/</loc>') && !sitemap.includes('.pdf</loc>'),
  llms: llms.includes("SM'S DEX") && llms.includes('https://shivammahajan.com/') && llms.includes('public developer roster'),
  metrika: (html.match(/112521507/g) ?? []).length === 3 && html.includes('https://mc.yandex.ru/metrika/tag.js?id=112521507') && html.includes('https://mc.yandex.ru/watch/112521507') && html.includes('webvisor:true'),
  cloudflare: (html.match(/7b1a4d20f6dd4752be6d955dcecc8ddc/g) ?? []).length === 1 && (html.match(/https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js/g) ?? []).length === 1,
};

console.log(JSON.stringify({ title, descriptionLength: description.length, types, checks }, null, 2));
if (Object.values(checks).some(value => !value)) process.exit(1);
