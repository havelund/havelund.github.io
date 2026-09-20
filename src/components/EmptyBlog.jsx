import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

export default function EmptyBlog() {
  const archive = useLocation().pathname.includes('/archive');
  return <Layout title={archive ? 'Blog archive' : 'Blog'} description="Notes on software, formal methods, and research.">
    <header className="blog-intro"><h1>{archive ? 'Blog archive' : 'Blog'}</h1><p>Notes on software, formal methods, and research.</p></header>
    <nav className="research-sections" aria-label="Blog navigation"><Link to="/blog/">Latest posts</Link><Link to="/blog/archive/">Archive</Link></nav>
    <section className="blog-empty"><h2>No posts yet</h2><p>New posts will appear here.</p></section>
  </Layout>;
}
