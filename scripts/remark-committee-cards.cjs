// Keep service entries as Markdown headings and paragraphs.
// At build time, group entries by year and show expandable compact rows.
module.exports = function committeeCards() {
  return (tree, file) => {
    const path = String(file.path).replaceAll('\\', '/');
    if (!/\/content\/(committees|talks|workshops)\.md$/.test(path)) return;
    const talks = path.endsWith('/talks.md');
    const text = node => node.type === 'break' ? '\n' : node.value || (node.children || []).map(text).join('');
    const element = (name, className, children) => ({
      type: 'mdxJsxFlowElement', name,
      attributes: [{type: 'mdxJsxAttribute', name: 'className', value: className}],
      children,
    });
    const children = [];
    const entries = [];
    let entry;
    const supportSections = [];
    let supportCards, supportCard, supportSection;
    for (const node of tree.children) {
      if (node.type === 'heading' && node.depth < 3) {
        supportCards = supportCard = supportSection = undefined;
        if (path.endsWith('/committees.md') && node.depth === 2 && ['Institutional service', 'Teaching'].includes(text(node))) {
          entry = undefined;
          const label = text(node);
          const id = label.toLowerCase().replaceAll(' ', '-');
          supportCards = element('div', 'research-support-grid', []);
          supportSection = element('section', 'professional-service-section ' + id, [node, supportCards]);
          supportSections.push({label, id, section: supportSection});
          continue;
        }
      }
      if (supportCards) {
        if (node.type === 'heading' && node.depth === 3) {
          supportCard = element('article', 'research-support-card', [node]);
          supportCards.children.push(supportCard);
        } else if (supportCard) supportCard.children.push(node);
        else supportSection.children.splice(supportSection.children.length - 1, 0, node);
        continue;
      }
      if (node.type === 'heading' && node.depth === 3) {
        const title = text(node);
        const year = (talks ? [...title.matchAll(/\b(?:19|20)\d{2}\b/g)].at(-1)?.[0] : title.match(/\b(?:19|20)\d{2}\b/)?.[0])
          || (title.match(/['’](\d{2})\b/) ? '20' + title.match(/['’](\d{2})\b/)[1] : 'Undated');
        entry = {year, heading: node, body: []};
        entries.push(entry);
      } else {
        if (node.type === 'heading' && node.depth < 3) entry = undefined;
        (entry ? entry.body : children).push(node);
      }
    }
    const years = [...new Set(entries.map(e => e.year))].sort((a,b) => (Number(b) || 0) - (Number(a) || 0));
    const month = /\b(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\b/i;
    for (const year of years) {
      const rows = entries.filter(e => e.year === year).map(e => {
        // Dates and places already present in the source provide the preview.
        // Full original paragraphs remain available when the row is expanded.
        const lines = e.body.map(text).join('\n').split('\n').map(s => s.trim()).filter(Boolean);
        let when = lines.find(s => month.test(s) && /\d/.test(s));
        if (talks && when) {
          // Older entries sometimes wrap a date, or append it to a description.
          const index = lines.indexOf(when);
          if (!/\b(?:19|20)\d{2}\b/.test(when) && /\b(?:19|20)\d{2}\b/.test(lines[index + 1] || '')) when += ' ' + lines[index + 1];
          const sentences = when.split(/\.\s+/);
          const dated = sentences.findLastIndex(s => month.test(s) && /\d/.test(s));
          if (dated >= 0) when = sentences.slice(dated).join('. ');
          if (/Birthday|Summer School|Verified Software/.test(when)) {
            const start = when.search(new RegExp('(?:\\b\\d{1,2}(?:[-–]\\d{1,2})?\\s+)?' + month.source + '\\s*,?\\s*\\d', 'i'));
            if (start >= 0) when = when.slice(start);
          }
        }
        const summary = [element('span', 'committee-name', e.heading.children)];
        if (when) summary.push(element('span', 'committee-when', [{type: 'text', value: when}]));
        return element('details', 'committee-row', [
          element('summary', 'committee-summary', summary),
          element('div', 'committee-description', e.body),
        ]);
      });
      children.push(element('section', 'committee-year', [
        {type: 'heading', depth: 3, children: [{type: 'text', value: year}]},
        element('div', 'committee-rows', rows),
      ]));
    }
    if (supportSections.length) {
      children.push(...supportSections.map(s => s.section));
      const submenu = element('nav', 'research-sections service-sections', [
        {type: 'link', url: '#program-committees', children: [{type: 'text', value: 'Program committees'}]},
        ...supportSections.map(s => ({type: 'link', url: '#' + s.id, children: [{type: 'text', value: s.label}]})),
      ]);
      submenu.attributes.push({type: 'mdxJsxAttribute', name: 'aria-label', value: 'Professional service sections'});
      const titleIndex = children.findIndex(node => node.type === 'heading' && node.depth === 1);
      children.splice(titleIndex + 1, 0, submenu);
    }
    tree.children = children;
  };
};
