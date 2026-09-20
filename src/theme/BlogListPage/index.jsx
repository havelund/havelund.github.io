import React from 'react';
import BlogListPage from '@theme-original/BlogListPage';
import EmptyBlog from '../../components/EmptyBlog';

export default function BlogList(props) {
  return props.items.length ? <BlogListPage {...props}/> : <EmptyBlog/>;
}
