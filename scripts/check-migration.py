"""Check preserved assets and publication count against the migration baseline."""
from pathlib import Path
import json,hashlib,re
root=Path(__file__).resolve().parent.parent
manifest=json.loads((root/'migration-manifest.json').read_text());changed=[];missing=[]
audit_path=root/'reachability-audit.json'
audit=json.loads(audit_path.read_text()) if audit_path.exists() else {}
excluded={i['path'] for i in audit.get('excluded_static_files',[])}
for item in audit.get('excluded_static_files',[]):
 assert not (root/'static'/item['path']).exists(),f'Excluded asset reintroduced: {item["path"]}'
 saved=root/'migration-excluded/static'/item['path']
 if (root/'migration-excluded').exists():
  assert hashlib.sha256(saved.read_bytes()).hexdigest()==item['sha256'],f'Excluded backup changed: {saved}'
for page in audit.get('excluded_pages',[]):
 assert not (root/page).exists(),f'Excluded page reintroduced: {page}'
for item in manifest['copied_assets']:
 p=root/'static'/item['target']
 if item['target'] in excluded:
  assert not p.exists(),f'Excluded asset reintroduced: {p}'
  continue
 if not p.is_file():missing.append(item['target'])
 elif hashlib.sha256(p.read_bytes()).hexdigest()!=item['sha256']:changed.append(item['target'])
assert not missing, missing
# Changed assets are legitimate after migration, but never go unnoticed.
if changed:print('Assets updated since migration:',', '.join(changed))
papers=json.loads((root/'data/publications.json').read_text())
assert len(papers)>=manifest['publication_count'],'Publication entries lost since migration'
for source,target in manifest['converted_pages'].items():assert (root/target).is_file(),target
for name in manifest['archived_root_pages']:assert (root/'static/archive'/name).is_file(),name
print(f'PASS: migration baseline checked with {len(excluded)} intentional reachability exclusions; {len(papers)} publication entries; all converted and archived root pages present.')
coverage=json.loads((root/'static/search/search-coverage.json').read_text())
print('Pre-existing missing downloads:',coverage['missing_original_downloads'])
