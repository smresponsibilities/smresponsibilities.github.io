"""Read-only Bing search diagnostics executed from GitHub Actions.

Compares normal and exact-phrase search queries and experimental RSS responses
without importing content or changing repository data. The goal is to tell
unavailable search results apart from blocked/changed HTML and parsing failures.
"""
from __future__ import annotations

import re
import urllib.parse
import urllib.error
import xml.etree.ElementTree as ET

from bs4 import BeautifulSoup
from auto_fetch_bing import extract_linkedin_urls, fetch_html


QUERIES = (
    ('current-day1291', '+#day1291 2002 days of code site:linkedin.com/posts/'),
    ('quoted-day1291', '+#day1291 "2002 days of code" site:linkedin.com/posts/'),
    ('quoted-day1293', '+#day1293 "2002 days of code" site:linkedin.com/posts/'),
    ('author-day1293', 'site:linkedin.com/posts/mahajanshivam_ "#day1293"'),
    ('no-site-day1293', '+#day1293 "2002 days of code"'),
    ('wide-day1293', 'day1293 2002daysofcode linkedin'),
    ('plain-day1293', 'site:linkedin.com/posts/mahajanshivam_ day1293'),
    ('title-day1293', '"day1293" "Smallest Unique Subarray" LinkedIn'),
    ('profile-only', 'mahajanshivam site:linkedin.com/posts/'),
)


def describe(label: str, query: str, rss: bool = False) -> None:
    url = 'https://www.bing.com/search?q=' + urllib.parse.quote_plus(query)
    if rss:
        url += '&format=rss'
    try:
        body = fetch_html(url)
    except (urllib.error.URLError, TimeoutError, OSError) as error:
        print(f'{label}: REQUEST_FAILED {type(error).__name__} {error}', flush=True)
        return

    soup = BeautifulSoup(body, 'html.parser')
    title = soup.title.get_text(' ', strip=True)[:100] if soup.title else '(no title)'
    links = extract_linkedin_urls(body)
    our_links = [
        link for link in links
        if urllib.parse.urlparse(link).path.startswith('/posts/mahajanshivam_')
    ]

    if rss:
        try:
            root = ET.fromstring(body)
            items = root.findall('.//item')
            rss_links = [
                item.findtext('link') for item in items if item.findtext('link')
            ]
            rss_links = [
                link for link in rss_links
                if urllib.parse.urlparse(link).hostname in ('linkedin.com', 'www.linkedin.com')
            ]
            print(
                f'{label}: RSS_XML root={root.tag} items={len(items)} '
                f'linkedin_links={len(rss_links)} '
                f'samples={[(item.findtext("title", "")[:80], item.findtext("link", "")[:180]) for item in items[:4]]}',
                flush=True,
            )
        except ET.ParseError:
            print(f'{label}: RSS_NOT_XML title={title!r} bytes={len(body)}', flush=True)
        return

    match = re.search(r'(?i)(captcha|unusual traffic|verify you are human|enable javascript|access denied)', body)
    organic_examples = [
        (anchor.get_text(' ', strip=True)[:75], (anchor.get('href') or '')[:180])
        for anchor in soup.select('li.b_algo h2 a')[:4]
    ]
    print(
        f'{label}: bytes={len(body)} title={title!r} '
        f'organic_cards={len(soup.select("li.b_algo"))} '
        f'decoded_linkedin_urls={len(links)} author_links={len(our_links)} '
        f'challenge_hint={match.group(0) if match else "none"} '
        f'author_url_samples={our_links[:2]} organic_samples={organic_examples}',
        flush=True,
    )


if __name__ == '__main__':
    for label, query in QUERIES:
        describe(label, query)
    for label, query in QUERIES[1:3]:
        describe('rss-' + label, query, rss=True)
    print('Search probe finished (read-only; results are diagnostic, not an import).', flush=True)
