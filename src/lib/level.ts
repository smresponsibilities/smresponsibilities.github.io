const START = new Date('2025-08-01'); // Morgan Stanley start

export function level(from: Date = START, to: Date = new Date()): number {
  const months = (to.getFullYear() - from.getFullYear()) * 12
               + (to.getMonth() - from.getMonth());
  return Math.max(0, Math.min(100, months));
}
