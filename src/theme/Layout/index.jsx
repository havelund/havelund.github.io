import React, {useState,useRef,useEffect} from 'react';
import Head from '@docusaurus/Head';
import LayoutProvider from '@theme/Layout/Provider';
import {useColorMode} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import {useLocation,useHistory} from '@docusaurus/router';
import SiteNavigation from '../../components/SiteNavigation';
function ColorModeButton(){
 const {colorMode,setColorMode}=useColorMode();
 const dark=colorMode==='dark';
 return <button type="button" className="color-mode-toggle" aria-label={dark?'Switch to light mode':'Switch to dark mode'} onClick={()=>setColorMode(dark?'light':'dark')}><span aria-hidden="true">{dark?'☀':'☾'}</span> {dark?'Light mode':'Dark mode'}</button>;
}
export default function Layout({children,title,description}){
 const location=useLocation(),router=useHistory(),search=useRef(null);
 const [theme,setTheme]=useState('blue'),[query,setQuery]=useState('');
 useEffect(()=>{try{const saved=localStorage.getItem('havelund-accent-v2');if(['blue','amber','ice'].includes(saved))setTheme(saved);}catch{}},[]);
 useEffect(()=>{document.documentElement.dataset.accent=theme;try{localStorage.setItem('havelund-accent-v2',theme);}catch{}},[theme]);
 useEffect(()=>{const key=e=>{if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!e.target.closest('input,textarea,select,[contenteditable]')){e.preventDefault();search.current?.focus();}};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key);},[]);
 useEffect(()=>{setQuery(new URLSearchParams(location.search).get('q')||'');},[location.pathname,location.search]);
 function cycle(){setTheme(t=>['blue','amber','ice'][(['blue','amber','ice'].indexOf(t)+1)%3]);}
 return <LayoutProvider><Head>{(title || !location.pathname.startsWith('/blog')) && <title>{title?`${title} | Klaus Havelund`:'Klaus Havelund'}</title>}{description&&<meta name="description" content={description}/>}</Head><a className="skip" href="#main-content">Skip to content</a><div className="site-shell"><header className="site-header"><Link className="brand" to="/"><span>[ kh ]</span> havelund<span className="muted">.com</span></Link><div className="header-actions"><ColorModeButton/><button onClick={cycle} aria-label="Change accent color">◐ {theme}</button></div></header><form className="global-search" role="search" onSubmit={e=>{e.preventDefault();router.push('/search?q='+encodeURIComponent(query.trim()));}}><label htmlFor="global-query">Search website</label><div><span aria-hidden="true">⌕</span><input ref={search} id="global-query" type="search" placeholder="Search pages, papers, and PDF contents…" value={query} onChange={e=>setQuery(e.target.value)}/><kbd>/</kbd><button>Search →</button></div></form><SiteNavigation/><main id="main-content" tabIndex={-1} className={location.pathname==='/'?'home-page':''}>{children}</main><footer><span>FORMAL METHODS · RUNTIME VERIFICATION · SOFTWARE</span></footer></div></LayoutProvider>;
}
