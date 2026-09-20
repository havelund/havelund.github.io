// Research remains ordinary Markdown: sections, entries, summary, then background.
module.exports = function researchLayout() {
  return (tree, file) => {
    if (!/\/content\/(research|awards)\.md$/.test(String(file.path).replaceAll('\\', '/'))) return;
    const text = node => node.value || (node.children || []).map(text).join('');
    const words = value => ({type: 'text', value});
    const element = (name, className, children, id) => ({
      type: 'mdxJsxFlowElement', name,
      attributes: [
        {type: 'mdxJsxAttribute', name: 'className', value: className},
        ...(id ? [{type: 'mdxJsxAttribute', name: 'id', value: id}] : []),
      ], children,
    });
    const intro = [], groups = [];
    let group, entry;
    for (const node of tree.children) {
      if (node.type === 'heading' && node.depth === 2) {
        group = {heading: node, notes: [], entries: []}; groups.push(group); entry = undefined;
      } else if (node.type === 'heading' && node.depth === 3 && group) {
        entry = {heading: node, body: []}; group.entries.push(entry);
      } else (entry ? entry.body : group ? group.notes : intro).push(node);
    }
    const sectionId = g => 'research-section-' + text(g.heading).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const background = nodes => element('details', 'research-background', [
      element('summary', 'research-background-toggle', [words('Background')]),
      element('div', 'research-background-content', nodes),
    ]);
    tree.children = [
      element('header', 'research-intro', intro),
      ...(groups.length > 1 ? [element('nav', 'research-sections', groups.map(g => ({
        type: 'link', url: '#' + sectionId(g), children: [words(text(g.heading))],
      })))] : []),
      ...groups.map(g => {
        const title = text(g.heading);
        const awards = title === 'Awards and recognition';
        const areas = title === 'Research areas';
        const entries = g.entries.map((e,i) => {
          if (awards) {
            const [year, ...label] = text(e.heading).split(' · ');
            return element('details', 'research-award', [
              element('summary', 'research-award-summary', [
                element('span', 'research-award-year', [words(year)]),
                element('span', 'research-award-title', [words(label.join(' · '))]),
              ]),
              element('div', 'research-award-description', e.body),
            ]);
          }
          const collapsible = (areas && i !== 0) || title === 'Service';
          return element('article', areas ? 'research-area' : 'research-support-card', [
            e.heading, ...e.body.slice(0,1),
            ...(collapsible && e.body.length > 1 ? [background(e.body.slice(1))] : e.body.slice(1)),
          ]);
        });
        return element('section', 'research-section', [
          g.heading, ...g.notes,
          element('div', awards ? 'research-awards' : areas ? 'research-areas' : 'research-support-grid', entries),
        ], sectionId(g));
      }),
    ];
  };
};
