const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const path=require('node:path'),dir=path.join(__dirname,'../static/search/');
const index=JSON.parse(fs.readFileSync(dir+'search-index.json'));
let resolve;const context=vm.createContext({self:{},fetch:async()=>({ok:true,json:async()=>index}),postMessage:r=>resolve(r)});
context.importScripts=f=>vm.runInContext(fs.readFileSync(dir+f,'utf8'),context);
vm.runInContext(fs.readFileSync(dir+'search-worker.js','utf8'),context);
async function search(query,scope='all',limit=25){return new Promise(r=>{resolve=r;context.self.onmessage({data:{id:1,query,scope,limit}})})}
(async()=>{
 const rust=await search('rust');assert(!rust.error);assert(rust.results.length);assert(!rust.results.some(r=>r.title==='Runtime monitor demo'));
 assert(rust.results.some(r=>/\brust\b/i.test(r.snippet)));
 const trust=await search('trust');assert(trust.results.some(r=>r.title==='Runtime monitor demo'));
 const phrase=await search('"atomic propositions"');assert(phrase.results.some(r=>r.page&&r.url.includes('#page=')));
 const scoped=await search('runtime','papers');assert(scoped.results.every(r=>r.type==='Papers'));
 const all=await search('runtime');assert(all.results.some(r=>r.type==='Pages'));assert(all.results.some(r=>r.type==='Software'));
 const blog=await search('blog');assert(blog.results.some(r=>r.type==='Blog'&&r.url==='/blog/'));
 const more=await search('runtime','all',1000);assert(more.results.length===more.total);assert(more.results.length>=all.results.length);
 assert.equal((await search('nosuchword987654321')).total,0);
 console.log('PASS: whole-word Rust search, exact phrases, PDF page links, categories, scope, pagination, and empty results.');
})().catch(e=>{console.error(e);process.exitCode=1});
