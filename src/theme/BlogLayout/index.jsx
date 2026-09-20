import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

export default function BlogLayout({children, toc, sidebar, ...props}) {
  const path = useLocation().pathname;
  const listing = /^\/blog\/(?:page\/\d+\/)?$/.test(path);
  return <Layout {...props}>
    {listing && <header className="blog-intro"><h1>Blog</h1><p>Notes on software, formal methods, and research.</p></header>}
    <nav className="research-sections" aria-label="Blog navigation"><Link to="/blog/">Latest posts</Link><Link to="/blog/archive/">Archive</Link><a href="/blog/rss.xml">RSS</a></nav>
    <div className="blog-content">{children}</div>
  </Layout>;
}
