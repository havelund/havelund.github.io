// Project content stays in Markdown; this adds the presentation at build time.
module.exports = function softwareCards() {
  return (tree, file) => {
    if (!String(file.path).replaceAll('\\', '/').endsWith('/content/software.md')) return;
    const text = node => node.value || (node.children || []).map(text).join('');
    const element = (name, className, children, id) => ({
      type: 'mdxJsxFlowElement', name,
      attributes: [
        {type: 'mdxJsxAttribute', name: 'className', value: className},
        ...(id ? [{type: 'mdxJsxAttribute', name: 'id', value: id}] : []),
      ], children,
    });
    const intro = [], groups = [];
    let group, card;
    for (const node of tree.children) {
      if (node.type === 'heading' && node.depth === 2) {
        group = {heading: node, cards: []}; groups.push(group); card = undefined;
      } else if (node.type === 'heading' && node.depth === 3 && group) {
        const id = 'tool-' + text(node).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
        card = element('article', 'software-card', [node], id); group.cards.push(card);
      } else if (card) {
        const tags = node.type === 'paragraph' && node.children.some(n => n.type === 'inlineCode');
        const links = node.type === 'paragraph' && node.children.every(n => n.type === 'link' || (n.type === 'text' && !n.value.trim()));
        card.children.push(tags || links ? element('div', tags ? 'software-tags' : 'software-card-links', [node]) : node);
      } else intro.push(node);
    }
    tree.children = [
      element('header', 'software-intro', intro),
      ...(groups.length > 1 ? [element('nav', 'software-sections', groups.map((g,i) => ({
        type: 'link', url: '#software-group-' + (i+1), children: [{type: 'text', value: text(g.heading)}],
      })))] : []),
      ...groups.map((g,i) => element('section', 'software-group', [
        g.heading, element('div', 'software-grid', g.cards),
      ], 'software-group-' + (i+1))),
    ];
  };
};
