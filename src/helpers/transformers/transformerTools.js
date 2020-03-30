const transformerTools = tools => ({
  type: 'tools',
  id: tools.id,
  attributes: {
    title: tools.title,
    link: tools.link,
    description: tools.description,
    tags: tools.tags,
  },
  link: {
    self: `/api/v1/tools/${tools.id}`,
  },
});

module.exports = transformerTools;
