import allPosts from '../data/linkedin-posts.json';

const ANCHOR_DAY = 1238;
const ANCHOR_DATE_UTC = Date.UTC(2026, 9, 1); // 2026-10-01 UTC

/**
 * Calculates current streak day.
 * Increments automatically every single day based on elapsed calendar days,
 * and guarantees value is at least the latest logged post day.
 */
export function getDailyStreak(now: Date = new Date()): number {
  const currentUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const diffDays = Math.floor((currentUtc - ANCHOR_DATE_UTC) / 86400000);
  const calculatedDay = ANCHOR_DAY + diffDays;

  let maxPostDay = 0;
  for (const post of allPosts) {
    if (typeof post.day === 'number' && post.day > maxPostDay) {
      maxPostDay = post.day;
    }
  }

  return Math.max(calculatedDay, maxPostDay);
}
