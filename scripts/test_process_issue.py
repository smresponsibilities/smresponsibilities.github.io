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
    def process(self, body, existing=None):
        with tempfile.TemporaryDirectory() as directory:
            previous = os.getcwd()
            try:
                os.chdir(directory)
                path = Path('src/data/linkedin-posts.json')
                path.parent.mkdir(parents=True)
                path.write_text(json.dumps(existing or []), encoding='utf-8')
                with patch.dict(os.environ, ISSUE_BODY=body, ISSUE_TITLE='Day 1255', ISSUE_NUMBER=''), patch('requests.get') as get:
                    get.return_value.text = '<meta property="og:description" content="Day 1255 coding post">'
                    runpy.run_path(str(SCRIPT))
                return json.loads(path.read_text(encoding='utf-8'))[0]
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


if __name__ == '__main__':
    unittest.main()
