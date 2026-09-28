import React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import menu from '../../data/navigation.json';

// Small outline symbols keep the navigation consistent without an icon dependency.
const icons = {
 '/': ['m3 10 9-7 9 7', 'M5 9v11h5v-6h4v6h5V9'],
 '/research': ['M9 3h6M10 3v6l-6 10a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2L14 9V3', 'M8 15h8'],
 '/publications': ['M5 3h10l4 4v14H5Z', 'M14 3v5h5M8 12h8M8 16h6'],
 '/books': ['M12 5C8 2 4 3 2 4v16c3-2 7-2 10 0 3-2 7-2 10 0V4c-2-1-6-2-10 1Z', 'M12 5v15'],
 '/software': ['m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16'],
 '/blog': ['M4 4h11v16H4Z', 'm13 12 7-7 2 2-7 7-3 1ZM7 8h4M7 12h3M7 16h5'],
 '/awards': ['M8 3h8v5a4 4 0 0 1-8 0Z', 'M8 5H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4M12 12v6m-4 3v-3h8v3Z'],
 '/events': ['M4 5h16v16H4ZM4 10h16M8 3v4m8-4v4', 'M8 14h2m4 0h2m-8 3h2'],
 '/talks': ['M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0Z', 'M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8'],
 '/workshops': ['M12 3v7M4 21v-4h16v4M12 13v8', 'M9 3h6v6H9ZM1 21h6m11 0h5'],
 '/committees': ['M9 8a3 3 0 1 0 6 0a3 3 0 1 0-6 0', 'M6 21v-2a6 6 0 0 1 12 0v2M3 7a3 3 0 0 0 0 6m18-6a3 3 0 0 1 0 6M2 21v-2a5 5 0 0 1 2-4m18 6v-2a5 5 0 0 0-2-4'],
 '/cv': ['M5 3h14v18H5Z', 'M9 8a3 3 0 0 0 6 0M8 14h8M8 17h5'],
 '/contact': ['M3 5h18v14H3Z', 'm3 6 9 7 9-7'],
};

export default function SiteNavigation(){
 const pathname=useLocation().pathname.replace(/\/$/,'')||'/';
 const selected=pathname==='/publication-notes'?'/publications':pathname==='/java-pathfinder'?'/software':pathname.startsWith('/blog/')?'/blog':pathname;
 return <nav className="primary-nav" aria-label="Main navigation">
  {menu.map(({label,url})=><Link key={url} to={url} className={selected===url?'active':undefined} aria-current={selected===url?'page':undefined}>
   <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{(icons[url]||icons['/publications']).map((d,i)=><path d={d} key={i}/>)}</svg>
   <span className="nav-label">{label}</span>
  </Link>)}
 </nav>;
}
