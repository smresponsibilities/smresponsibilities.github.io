import json
import os
from pathlib import Path
import runpy
import tempfile
import unittest
from unittest.mock import patch

SCRIPT = Path(__file__).with_name('process_issue.py')
TEMPLATE = 'Paste the LinkedIn post URL here, or add a block starting with MANUAL: followed by the post text, or write GLITCH if this day was skipped. Then close this issue.\n'


class ProcessIssueTest(unittest.TestCase):
    def process(self, body, existing=None, title='Day 1255', return_all=False):
        with tempfile.TemporaryDirectory() as directory:
            previous = os.getcwd()
            try:
                os.chdir(directory)
                path = Path('src/data/linkedin-posts.json')
                path.parent.mkdir(parents=True)
                path.write_text(json.dumps(existing or []), encoding='utf-8')
                with patch.dict(os.environ, ISSUE_BODY=body, ISSUE_TITLE=title, ISSUE_NUMBER=''), patch('requests.get') as get:
                    get.return_value.text = '<meta property="og:description" content="Day 1255 coding post">'
                    runpy.run_path(str(SCRIPT))
                records = json.loads(path.read_text(encoding='utf-8'))
                return records if return_all else records[0]
            finally:
                os.chdir(previous)

    def test_template_url_is_not_glitch(self):
        post = self.process(TEMPLATE + '\nhttps://lnkd.in/p/example')
        self.assertNotIn('easterEgg', post)

    def test_manual_replaces_old_glitch(self):
        post = self.process(TEMPLATE + '\nMANUAL:\nToday I solved a graph problem.', [{'day': 1255, 'easterEgg': 'Old false glitch'}])
        self.assertEqual(post['content'], 'Today I solved a graph problem.')
        self.assertNotIn('easterEgg', post)

    def test_explicit_glitch(self):
        post = self.process(TEMPLATE + '\nGLITCH: Count correction')
        self.assertEqual(post['easterEgg'], 'Count correction')

    def test_new_link_same_day_preserves_original_post(self):
        original = {'day': 1255, 'url': 'https://lnkd.in/p/original', 'content': 'Keep original content'}
        records = self.process(TEMPLATE + '\nhttps://lnkd.in/p/second', existing=[original], return_all=True)
        self.assertEqual(len(records), 2)
        self.assertEqual(records[0], original)
        self.assertEqual(records[1]['url'], 'https://lnkd.in/p/second')

    def test_existing_link_updates_only_matching_post(self):
        original = {'day': 1255, 'url': 'https://lnkd.in/p/original', 'content': 'Keep original content'}
        edited = {'day': 1255, 'url': 'https://lnkd.in/p/edited', 'content': 'Outdated content'}
        records = self.process(
            TEMPLATE + '\nhttps://lnkd.in/p/edited\nMANUAL:\nUpdated text with more than ten characters',
            existing=[original, edited], return_all=True)
        self.assertEqual(records[0], original)
        self.assertTrue(records[1]['content'].startswith('Updated text'))
        self.assertEqual(records[1]['url'], edited['url'])

    def test_manual_edit_for_ambiguous_day_is_rejected(self):
        existing = [
            {'day': 1255, 'url': 'https://lnkd.in/p/a', 'content': 'First'},
            {'day': 1255, 'url': 'https://lnkd.in/p/b', 'content': 'Second'},
        ]
        with self.assertRaises(SystemExit):
            self.process('MANUAL:\nA new post body with no unique URL supplied', existing=existing)

    def test_reusing_link_from_another_day_is_rejected(self):
        existing = [{'day': 1244, 'url': 'https://lnkd.in/p/a', 'content': 'Old'}]
        with self.assertRaises(SystemExit):
            self.process(TEMPLATE + '\nhttps://lnkd.in/p/a', existing=existing)


if __name__ == '__main__':
    unittest.main()
