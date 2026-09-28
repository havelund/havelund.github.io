// Keep bibliographic content editable as ordinary Markdown.
module.exports = function books() {
  return (tree, file) => {
    if (!String(file.path).replaceAll('\\', '/').endsWith('/content/books.md')) return;
    const element = (name, className, children) => ({
      type: 'mdxJsxFlowElement', name,
      attributes: [{type: 'mdxJsxAttribute', name: 'className', value: className}],
      children,
    });
    const intro = [], groups = [];
    let group, card;
    for (const node of tree.children) {
      if (node.type === 'heading' && node.depth === 2) {
        group = {heading: node, cards: []};
        groups.push(group);
        card = undefined;
      } else if (node.type === 'heading' && node.depth === 3 && group) {
        card = {cover: [], body: [node]};
        group.cards.push(card);
      } else if (card) {
        const image = node.type === 'paragraph' && node.children.some(n =>
          n.type === 'image' || (n.type === 'link' && n.children.some(c => c.type === 'image')));
        (image ? card.cover : card.body).push(node);
      } else intro.push(node);
    }
    tree.children = [
      element('header', 'books-intro', intro),
      ...groups.map(g => element('section', 'books-section', [g.heading,
        element('div', 'books-grid', g.cards.map(c => element('article', 'book-card', [
          element('div', 'book-cover', c.cover),
          element('div', 'book-details', c.body),
        ]))),
      ])),
    ];
  };
};
