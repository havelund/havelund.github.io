let worker,sequence=0;
const pending=new Map();
export function search(query,scope='all',limit=25){return new Promise((resolve,reject)=>{
 if(!worker){worker=new Worker('/search/search-worker.js');worker.onmessage=({data})=>{const task=pending.get(data.id);if(!task)return;pending.delete(data.id);clearTimeout(task.timer);data.error?task.reject(Error(data.error)):task.resolve(data);};worker.onerror=()=>{for(const t of pending.values()){clearTimeout(t.timer);t.reject(Error('Search could not load. Please retry.'));}pending.clear();worker.terminate();worker=null;};}
 const id=++sequence,timer=setTimeout(()=>{pending.delete(id);reject(Error('Search timed out. Please retry.'));},60000);pending.set(id,{resolve,reject,timer});worker.postMessage({id,query,scope,limit});});}
export function patterns(query){return (query.match(/"[^"]+"|\S+/g)||[]).map(t=>t.replace(/^"|"$/g,'').normalize('NFKC').toLowerCase()).filter(Boolean).map(t=>new RegExp('(?<![\\p{L}\\p{N}_])'+t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?![\\p{L}\\p{N}_])','u'));}
