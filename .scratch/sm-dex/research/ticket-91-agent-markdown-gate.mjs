import fs from 'node:fs';

const html = fs.readFileSync('dist/index.html', 'utf8');
const markdown = fs.readFileSync('dist/index.html.md', 'utf8');
const llms = fs.readFileSync('dist/llms.txt', 'utf8');
const robots = fs.readFileSync('dist/robots.txt', 'utf8');

const checks = {
  alternate: html.includes('<link rel="alternate" type="text/markdown" href="/index.html.md" title="Markdown version">'),
  markdownIdentity: markdown.includes('# Shivam Mahajan — Software Developer'),
  markdownExperience: markdown.includes('### Morgan Stanley'),
  markdownProjects: ['### Productivity Caller', '### Chaincode', '### QuizDeck'].every((heading) => markdown.includes(heading)),
  markdownRoster: markdown.includes('## Public developer dex'),
  llmsDiscovery: llms.includes('https://shivammahajan.com/index.html.md'),
  contentSignals: robots.includes('Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference'),
};

console.log(JSON.stringify({ checks }, null, 2));
if (Object.values(checks).some((value) => !value)) process.exit(1);
