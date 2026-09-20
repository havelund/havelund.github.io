const path = require('node:path');
const {execFileSync} = require('node:child_process');

// Use Docusaurus's resolved post URLs and visibility rules for site search.
// Supply an empty landing page until the first post is published.
module.exports = function blogIntegration(context) {
  let posts = [];
  const index = directory => execFileSync('python3', [
    path.join(context.siteDir, 'scripts/index-blog.py'), path.join(directory, 'search'),
  ], {input: JSON.stringify(posts), encoding: 'utf8'});
  return {
    name: 'havelund-blog-integration',
    async allContentLoaded({allContent, actions}) {
      const allPosts = allContent['docusaurus-plugin-content-blog']?.default?.blogPosts || [];
      const listed = allPosts.filter(p => !p.metadata.unlisted);
      if (!listed.length) {
        actions.addRoute({path: '/blog/archive/', exact: true, component: '@site/src/components/EmptyBlog.jsx'});
      }
      posts = listed.filter(p => !p.metadata.frontMatter.draft).map(p => ({
        title: p.metadata.title, url: p.metadata.permalink, content: p.content,
      }));
      index(path.join(context.siteDir, 'static'));
    },
    async postBuild({outDir}) { index(outDir); },
  };
};
