import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const inputPath = path.join(root, 'src', 'data', 'linkedin-posts.json');
const outputPath = path.join(root, 'public', 'api', 'posts.json');

export function extractLeetCodeQuestions(content) {
  if (!content || typeof content !== 'string') return [];
  
  let textToSearch = content;
  const lcIndex = content.search(/leetcode\s*[:\.]?/i);
  if (lcIndex !== -1) {
    textToSearch = content.slice(lcIndex);
  }

  const regex = /(?:\"|\b)(\d{1,5})\.[\s\u00A0]+([^\"\n#\r]+)(?:\"|\r|\n|$)/g;
  const questions = [];
  let m;
  while ((m = regex.exec(textToSearch)) !== null) {
    const num = parseInt(m[1], 10);
    let title = m[2].trim().replace(/^[\s\u00A0]+|[\s\u00A0]+$/g, '');
    title = title.replace(/^[\"\'\s]+|[\"\'\s]+$/g, '');
    
    if (
      title.length > 2 && 
      !/^(easy|medium|hard|approach|solution|method|step|first|second|year|day|month|hours?|min|mins|minutes|streak|questions?|pts|points)\b/i.test(title) &&
      !/^\d+$/.test(title)
    ) {
      if (!questions.some(q => q.number === num)) {
        questions.push({ number: num, title });
      }
    }
  }
  return questions;
}

const rawData = fs.readFileSync(inputPath, 'utf8');
const posts = JSON.parse(rawData);

const enrichedPosts = posts.map(post => {
  const questions = extractLeetCodeQuestions(post.content);
  return {
    ...post,
    questions
  };
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(enrichedPosts, null, 2), 'utf8');

const totalQuestions = enrichedPosts.reduce((acc, p) => acc + p.questions.length, 0);
console.log(`[build-posts-api] Processed ${enrichedPosts.length} posts with ${totalQuestions} extracted LeetCode questions -> ${outputPath}`);
