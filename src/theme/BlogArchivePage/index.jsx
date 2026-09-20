import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function BlogArchivePage({archive}) {
  const years = new Map();
  for (const post of archive.blogPosts) {
    const year = post.metadata.date.slice(0, 4);
    if (!years.has(year)) years.set(year, []);
    years.get(year).push(post.metadata);
  }
  return <Layout title="Blog archive">
    <header className="blog-intro"><h1>Blog archive</h1><p>All posts, newest first.</p></header>
    <nav className="research-sections" aria-label="Blog navigation"><Link to="/blog/">Latest posts</Link><a href="/blog/rss.xml">RSS</a></nav>
    {[...years].map(([year, posts]) => <section className="blog-archive-year" key={year}><h2>{year}</h2><ul>{posts.map(post => <li key={post.permalink}><time dateTime={post.date}>{post.date.slice(0, 10)}</time><Link to={post.permalink}>{post.title}</Link></li>)}</ul></section>)}
  </Layout>;
}
