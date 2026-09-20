'use strict';
importScripts('search-match.js');
let indexPromise;
const normalize=SearchMatch.normalize;
async function loadIndex(){
 if(!indexPromise)indexPromise=(async()=>{
  let data;
  if(typeof DecompressionStream!=='undefined'){
   try{const response=await fetch('search-index.json.gz');if(!response.ok)throw Error('Index unavailable');data=await new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).json();}catch{}
  }
  if(!data){const response=await fetch('search-index.json');if(!response.ok)throw Error('The search index could not be loaded.');data=await response.json();}
  for(const doc of data.documents){doc.normalTitle=normalize(doc.title);doc.normalText=normalize(doc.title+' '+doc.text);for(const p of doc.pages)p.normalText=normalize(p.text);}
  return data;
 })().catch(e=>{indexPromise=null;throw e;});
 return indexPromise;
}
function snippet(text,terms){const lower=normalize(text);let at=terms.reduce((best,t)=>{const i=lower.search(t);return i<0?best:Math.min(best,i);},Infinity);if(!Number.isFinite(at))at=0;const start=Math.max(0,at-85),end=Math.min(text.length,start+320);return (start?'…':'')+text.slice(start,end)+(end<text.length?'…':'');}
self.onmessage=async({data:{id,query,scope='all',limit=25}})=>{
 try{
 const terms=SearchMatch.patterns(query);
 if(!terms.length){postMessage({id,results:[],total:0,empty:true});return;}
 const data=await loadIndex(), results=[];
 for(const doc of data.documents){
  if(scope==='papers'&&doc.type!=='Papers')continue;
  const metadataMatch=terms.every(t=>t.test(doc.normalText));
  let page=null,score=metadataMatch?20:0;
  for(const p of doc.pages){if(terms.every(t=>t.test(p.normalText)||t.test(doc.normalText))&&terms.some(t=>t.test(p.normalText))){page=p;break;}}
  if(!metadataMatch&&!page)continue;
  score+=terms.filter(t=>t.test(doc.normalTitle)).length*40;
  if(doc.type!=='Papers')score+=10;
  results.push({type:doc.type,title:doc.title,url:page?page.url+'#page='+page.n:doc.url,page:page?.n,snippet:snippet(page?page.text:doc.text,terms),score});
 }
 results.sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title));
 const visible=scope==='papers'?results.slice(0,limit*3):['Pages','Blog','Papers','Software'].flatMap(type=>results.filter(r=>r.type===type).slice(0,limit));
 postMessage({id,total:results.length,results:visible,coverage:data.coverage});
 }catch(e){postMessage({id,error:'Search could not load. Please try again. '+e.message});}
};
