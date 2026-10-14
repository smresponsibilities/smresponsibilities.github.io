import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const statsFilePath = path.join(root, 'src', 'data', 'dsa-stats.json');

const ANCHOR_DAY = 1238;
const ANCHOR_DATE_UTC = Date.UTC(2026, 9, 1);

function calculateDailyStreak(now = new Date()) {
  const currentUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const diffDays = Math.floor((currentUtc - ANCHOR_DATE_UTC) / 86400000);
  const calculatedDay = ANCHOR_DAY + diffDays;

  const postsPath = path.join(root, 'src', 'data', 'linkedin-posts.json');
  let maxPostDay = 0;
  if (fs.existsSync(postsPath)) {
    try {
      const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
      if (Array.isArray(posts)) {
        for (const post of posts) {
          if (typeof post.day === 'number' && post.day > maxPostDay) {
            maxPostDay = post.day;
          }
        }
      }
    } catch { /* ignore */ }
  }
  return Math.max(calculatedDay, maxPostDay);
}

let existingData = {
  totalSolved: 2673,
  streakDay: 1251,
  leetcode: { username: 'smresponsibilities', solved: 2022, easy: 821, medium: 1054, hard: 147 },
  codeforces: { handle: 'smduty', solved: 651 },
  updatedAt: new Date().toISOString()
};

if (fs.existsSync(statsFilePath)) {
  try {
    existingData = JSON.parse(fs.readFileSync(statsFilePath, 'utf8'));
  } catch (e) {
    console.warn('[fetch-dsa-stats] Could not parse existing dsa-stats.json, using defaults.');
  }
}

async function fetchLeetCodeStats(username) {
  const query = `query userProblemsSolved($username: String!) {
    matchedUser(username: $username) {
      username
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }`;

  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    body: JSON.stringify({ query, variables: { username } }),
    signal: AbortSignal.timeout(10000)
  });

  if (!res.ok) throw new Error(`LeetCode HTTP ${res.status}`);
  const json = await res.json();
  const list = json.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
  if (!list) throw new Error('LeetCode response missing submitStatsGlobal');

  const all = list.find((s) => s.difficulty === 'All')?.count ?? 0;
  const easy = list.find((s) => s.difficulty === 'Easy')?.count ?? 0;
  const medium = list.find((s) => s.difficulty === 'Medium')?.count ?? 0;
  const hard = list.find((s) => s.difficulty === 'Hard')?.count ?? 0;

  return { username, solved: all, easy, medium, hard };
}

async function fetchCodeforcesStats(handle) {
  const res = await fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=10000`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (SM-DEX builder)' },
    signal: AbortSignal.timeout(15000)
  });

  if (!res.ok) throw new Error(`Codeforces HTTP ${res.status}`);
  const json = await res.json();
  if (json.status !== 'OK' || !Array.isArray(json.result)) {
    throw new Error(`Codeforces API returned status ${json.status}: ${json.comment}`);
  }

  const solvedSet = new Set();
  for (const sub of json.result) {
    if (sub.verdict === 'OK' && sub.problem?.contestId && sub.problem?.index) {
      solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
    }
  }

  return { handle, solved: solvedSet.size };
}

async function main() {
  console.log('[fetch-dsa-stats] Fetching live metrics from LeetCode & Codeforces...');
  let lcData = existingData.leetcode;
  let cfData = existingData.codeforces;

  try {
    const lc = await fetchLeetCodeStats(lcData.username || 'smresponsibilities');
    if (lc.solved > 0) {
      lcData = lc;
      console.log(`[fetch-dsa-stats] LeetCode: ${lc.solved} solved (Easy: ${lc.easy}, Medium: ${lc.medium}, Hard: ${lc.hard})`);
    }
  } catch (err) {
    console.warn(`[fetch-dsa-stats] LeetCode fetch failed (${err.message}). Using cached data.`);
  }

  try {
    const cf = await fetchCodeforcesStats(cfData.handle || 'smduty');
    if (cf.solved > 0) {
      cfData = cf;
      console.log(`[fetch-dsa-stats] Codeforces: ${cf.solved} solved`);
    }
  } catch (err) {
    console.warn(`[fetch-dsa-stats] Codeforces fetch failed (${err.message}). Using cached data.`);
  }

  const totalSolved = (lcData.solved || 0) + (cfData.solved || 0);
  const streakDay = calculateDailyStreak();
  const updatedPayload = {
    totalSolved,
    streakDay,
    leetcode: lcData,
    codeforces: cfData,
    updatedAt: new Date().toISOString()
  };

  fs.writeFileSync(statsFilePath, JSON.stringify(updatedPayload, null, 2), 'utf8');
  console.log(`[fetch-dsa-stats] Total DSA problems solved: ${totalSolved} -> ${statsFilePath}`);
}

main().catch((err) => {
  console.error('[fetch-dsa-stats] Unexpected failure:', err.message);
  // Do not fail the build if external APIs are down
  process.exit(0);
});
