"""Generate publication data and page-aware search from editable site sources."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import subprocess,json,re,gzip,hashlib,yaml,markdown
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parent.parent;static=root/'static';out=static/'search';out.mkdir(exist_ok=True)
cache=root/'.cache';cache.mkdir(exist_ok=True)
def clean(s):return re.sub(r'\s+',' ',re.sub(r'(\w)-\n(\w)',r'\1\2',s)).strip()
(root/'data/navigation.json').write_text(json.dumps(yaml.safe_load((root/'data/navigation.yml').read_text()),indent=2))
groups=yaml.safe_load((root/'data/publication-groups.yml').read_text())
for group in groups:group['html']=markdown.markdown(group.pop('body'),extensions=['tables'])
(root/'data/publication-groups.json').write_text(json.dumps(groups,ensure_ascii=False,indent=2))
records=yaml.safe_load((root/'data/publications.yml').read_text());docs=[];known=set();missing=[]
for i,p in enumerate(records):
 p.setdefault('id','paper-'+hashlib.sha256((p['title']+p['authors']).encode()).hexdigest()[:12])
 urls=[]
 for l in p.get('links',[]):
  if l['url'].startswith('/'):
   local=static/l['url'].split('#')[0].split('?')[0].lstrip('/')
   l['available']=local.is_file()
   if not l['available']:missing.append({'title':p['title'],'url':l['url']})
   elif local.suffix.lower()=='.pdf':urls.append(l['url']);known.add(l['url'])
 docs.append({'type':'Papers','title':p['title'],'text':clean(p['authors']+' '+p['details']),'url':urls[0] if urls else '/publications#'+p['id'],'pdfs':urls,'pages':[]})
(root/'data/publications.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
# A copied alias may share content with a historical filename; index it only once.
hashes={hashlib.sha256((static/u.lstrip('/')).read_bytes()).hexdigest() for u in known}
for pdf in sorted((static/'Publications').glob('*.pdf')):
 url='/Publications/'+pdf.name;digest=hashlib.sha256(pdf.read_bytes()).hexdigest()
 if url in known or digest in hashes:continue
 hashes.add(digest);known.add(url)
 docs.append({'type':'Pages' if pdf.name.startswith('cv') else 'Papers','title':{'cv-havelund.pdf':'Full curriculum vitae','cv-havelund-short.pdf':'Short curriculum vitae'}.get(pdf.name,pdf.stem.replace('_',' ').replace('-',' ')),'text':pdf.name,'url':url,'pdfs':[url],'pages':[]})
def extract(url):
 p=static/url.lstrip('/');digest=hashlib.sha256(p.read_bytes()).hexdigest();cached=cache/(digest+'.json')
 if cached.exists():texts=json.loads(cached.read_text())
 else:
  proc=subprocess.run(['pdftotext','-enc','UTF-8',str(p),'-'],capture_output=True,timeout=60)
  if proc.returncode:raise RuntimeError('PDF extraction failed: '+url+' '+proc.stderr.decode(errors='replace'))
  texts=[clean(t) for t in proc.stdout.decode('utf-8',errors='replace').split('\f')];cached.write_text(json.dumps(texts,ensure_ascii=False))
 return url,[{'n':i,'text':t,'url':url} for i,t in enumerate(texts,1) if t]
with ThreadPoolExecutor(max_workers=6) as pool:extracted=dict(pool.map(extract,sorted(known)))
for d in docs:
 for url in d.pop('pdfs'):d['pages'].extend(extracted[url])
for p in sorted((root/'content').glob('*.md')):
 text=p.read_text();parts=text.split('---',2);meta=yaml.safe_load(parts[1]);body=parts[2]
 url='/' if p.stem=='index' else '/'+p.stem
 body=body.replace('pathname://','')
 soup=BeautifulSoup(markdown.markdown(body,extensions=['tables']),'html.parser')
 docs.append({'type':'Software' if p.stem=='software' else 'Pages','title':meta['title'],'text':clean(soup.get_text(' ',strip=True)),'url':url,'pages':[]})
# Historical content is now indexed from the native Markdown pages above.
docs.append({'type':'Pages','title':'Runtime monitor demo','text':'Trust, but verify. A document can be read only while the user is logged in. Send login, read_document, and logout events to see PASS or VIOLATION.','url':'/monitor','pages':[]})
coverage={'pdfs':len(extracted),'pages':sum(len(v) for v in extracted.values()),'without_text':[u for u,v in extracted.items() if not v],'documents':len(docs),'missing_original_downloads':missing}
payload=json.dumps({'documents':docs,'coverage':coverage},ensure_ascii=False,separators=(',',':')).encode()
(out/'search-index.json').write_bytes(payload);(out/'search-index.json.gz').write_bytes(gzip.compress(payload,compresslevel=9,mtime=0));(out/'search-coverage.json').write_text(json.dumps(coverage,indent=2))
print(f'Prepared {len(records)} publications; indexed {coverage["pdfs"]} PDFs / {coverage["pages"]} pages. {len(missing)} pre-existing missing download links recorded.')
