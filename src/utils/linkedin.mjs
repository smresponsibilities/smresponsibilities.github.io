/**
 * LinkedIn's embeddable URL differs from both ordinary post permalinks
 * and short lnkd.in links. Never pass arbitrary URLs to an iframe.
 */
export function linkedInEmbedUrl(value) {
  if (typeof value !== 'string') return null;
  let url;
  try { url = new URL(value); } catch { return null; }
  if (url.protocol !== 'https:' || !['linkedin.com', 'www.linkedin.com'].includes(url.hostname)) return null;
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { return null; }
  if (/^\/feed\/update\/urn:li:(?:share|activity):\d+\/?$/.test(pathname)) {
    return 'https://www.linkedin.com/embed' + pathname.replace(/\/$/, '');
  }
  const activityId = pathname.match(/^\/posts\/mahajanshivam_[^/]*-activity-(\d+)-[^/]+\/?$/)?.[1];
  return activityId ? 'https://www.linkedin.com/embed/feed/update/urn:li:activity:' + activityId : null;
}
