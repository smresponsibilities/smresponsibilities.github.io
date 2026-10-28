import contextlib
from datetime import date
import importlib.util
import io
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('bing', Path(__file__).with_name('auto_fetch_bing.py'))
bing = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bing)
URL = 'https://www.linkedin.com/posts/mahajanshivam_day1256-activity-1234-test'


class FixedDate(date):
    @classmethod
    def today(cls):
        return cls(2026, 10, 19)


class BingTest(unittest.TestCase):
    def run_import(self, content, missing=1256, search_error=None):
        with tempfile.TemporaryDirectory() as directory:
            previous = os.getcwd()
            try:
                os.chdir(directory)
                path = Path('src/data/linkedin-posts.json')
                path.parent.mkdir(parents=True)
                path.write_text(json.dumps([{'day': day} for day in range(1196, 1257) if day != missing]))
                with patch.object(bing, 'date', FixedDate), patch.object(bing, 'fetch_html', return_value=f'<a href="{URL}">post</a>', side_effect=search_error), patch.object(bing, 'fetch_post_content', return_value=content), patch.object(bing.subprocess, 'run'), contextlib.redirect_stdout(io.StringIO()):
                    bing.main()
                return json.loads(path.read_text(encoding='utf-8'))
            finally:
                os.chdir(previous)

    def test_backfills_gap_before_latest_day(self):
        posts = self.run_import('#day1254 of #2002daysofcode', missing=1254)
        self.assertTrue(any(post['day'] == 1254 for post in posts))

    def test_rejects_day_prefix(self):
        posts = self.run_import('#day12560 of #2002daysofcode')
        self.assertFalse(any(post['day'] == 1256 for post in posts))

    def test_rejects_lookalike_host(self):
        self.assertEqual(bing.extract_linkedin_urls('<a href="https://evil-linkedin.com/posts/fake">x</a>'), [])

    def test_imports_matching_day(self):
        posts = self.run_import('#day1256 of #2002daysofcode')
        self.assertEqual(next(post for post in posts if post['day'] == 1256)['content'], '#day1256 of #2002daysofcode')

    def test_search_outage_fails_visibly(self):
        with self.assertRaisesRegex(RuntimeError, 'All Bing requests failed'):
            self.run_import('', search_error=OSError('offline'))


if __name__ == '__main__':
    unittest.main()
