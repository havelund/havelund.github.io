import React,{useState,useEffect} from 'react';
import Layout from '@theme/Layout';
import {useLocation,useHistory} from '@docusaurus/router';
import SearchResults from '../components/SearchResults';
export default function Search(){const location=useLocation(),history=useHistory(),q=new URLSearchParams(location.search).get('q')||'';const [value,setValue]=useState(q);useEffect(()=>setValue(q),[q]);return <Layout title="Search"><h1>Search the website</h1><p>Pages, blog posts, software, and the text inside publication PDFs. Search whole words, or put an exact phrase in quotes.</p><form className="content-search" onSubmit={e=>{e.preventDefault();history.push('/search?q='+encodeURIComponent(value.trim()));}}><label className="sr-only" htmlFor="search-query">Search terms</label><input id="search-query" type="search" value={value} onChange={e=>setValue(e.target.value)} placeholder='Try Rust or "temporal logic"'/><button>Search →</button></form><SearchResults query={q}/></Layout>;}
