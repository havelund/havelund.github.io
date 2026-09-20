"""Merge published blog posts into search using URLs resolved by Docusaurus."""
from pathlib import Path
import sys, json, gzip, re
import markdown
from bs4 import BeautifulSoup

directory = Path(sys.argv[1])
posts = json.load(sys.stdin)
index = json.loads((directory / 'search-index.json').read_text())
# Idempotent for rebuilds, including removed posts and posts changed to drafts.
docs = [d for d in index['documents'] if d['type'] != 'Blog']
docs.append({'type': 'Blog', 'title': 'Blog', 'text': 'Notes on software, formal methods, and research.', 'url': '/blog/', 'pages': []})
for post in posts:
    body = BeautifulSoup(markdown.markdown(post['content'], extensions=['tables', 'fenced_code']), 'html.parser')
    docs.append({'type': 'Blog', 'title': post['title'], 'text': re.sub(r'\s+', ' ', body.get_text(' ', strip=True)), 'url': post['url'], 'pages': []})
index['documents'] = docs
index['coverage']['documents'] = len(docs)
payload = json.dumps(index, ensure_ascii=False, separators=(',', ':')).encode()
(directory / 'search-index.json').write_bytes(payload)
(directory / 'search-index.json.gz').write_bytes(gzip.compress(payload, compresslevel=9, mtime=0))
(directory / 'search-coverage.json').write_text(json.dumps(index['coverage'], indent=2))
