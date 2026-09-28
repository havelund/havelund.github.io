const config = {
 title: 'Klaus Havelund',
 tagline: 'Formal methods, runtime verification, and reliable software',
 url: 'https://havelund.com', baseUrl: '/', trailingSlash: true,
 favicon: 'favicon.ico', onBrokenLinks: 'throw',
 markdown: {format: 'md', hooks: {onBrokenMarkdownLinks: 'throw'}},
 presets: [['classic', {
  docs: false,
  blog: {
   blogTitle: 'Blog', blogDescription: 'Notes on software, formal methods, and research.',
   blogSidebarCount: 0, postsPerPage: 10, showReadingTime: true,
   feedOptions: {type: ['rss', 'atom'], copyright: 'Klaus Havelund'},
   onUntruncatedBlogPosts: 'ignore',
  },
  pages: {path: 'content', routeBasePath: '/', remarkPlugins: [require('./scripts/remark-committee-cards.cjs'), require('./scripts/remark-software-cards.cjs'), require('./scripts/remark-research.cjs'), require('./scripts/remark-books.cjs')]},
  theme: {customCss: './src/css/custom.css'},
 }]],
 plugins: [['@docusaurus/plugin-content-pages', {id: 'interactive', path:'src/pages', routeBasePath:'/'}], require('./scripts/blog-integration.cjs')],
 themeConfig: {
  colorMode: {defaultMode:'dark',disableSwitch:false,respectPrefersColorScheme:false},
  metadata:[{name:'theme-color',content:'#101a29'}],
 },
};
module.exports = config;
