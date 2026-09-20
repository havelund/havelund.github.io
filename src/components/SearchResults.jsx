import React,{useState,useEffect} from 'react';
import {search} from '../lib/search';
export default function SearchResults({query,scope='all'}){
 const [state,setState]=useState({}),[retry,setRetry]=useState(0),[limit,setLimit]=useState(25);
 useEffect(()=>setLimit(25),[query,scope]);
 useEffect(()=>{let current=true;if(!query.trim()){setState({empty:true});return;}setState({loading:true});search(query,scope,limit).then(data=>{if(current)setState(data);}).catch(e=>{if(current)setState({error:e.message});});return()=>{current=false;};},[query,scope,retry,limit]);
 if(state.empty)return <p className="search-status">Enter a word or phrase to search.</p>;
 if(state.loading)return <p role="status" className="search-status">Searching… The first search loads the PDF text index.</p>;
 if(state.error)return <div role="alert"><p>{state.error}</p><button onClick={()=>setRetry(n=>n+1)}>Try again</button></div>;
 if(!state.results)return null;
 return <><p role="status" className="search-status">{state.total} matching results{state.total>state.results.length?` · showing ${state.results.length}`:''}</p>{!state.total&&<p>No matches. Try fewer words or another spelling.</p>}{['Pages','Blog','Papers','Software'].map(type=>{const rows=state.results.filter(r=>r.type===type);return rows.length?<section key={type} className="search-group" aria-label={type}><h2>{type}</h2>{rows.map((r,i)=><article className="search-result" key={r.url+i}><p className="result-type">{type}{r.page?` · PDF page ${r.page}`:''}</p><h3><a href={r.url}>{r.title} ↗</a></h3><p>{r.snippet}</p></article>)}</section>:null;})}{state.total>state.results.length&&<button onClick={()=>setLimit(n=>n+25)}>Show more results</button>}</>;
}
