// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-sitemap/src/internals.js#L45
const getNodes = (results = {}) => {
  if ('nodes' in results) {
    return { allPages: results.nodes, originalType: 'nodes' };
  }

  if ('edges' in results) {
    return {
      allPages: results.edges && results.edges.map((edge) => edge.node),
      originalType: 'edges',
    };
  }
  throw new Error(
    '[gatsby-plugin-sitemap]: Plugin is unsure how to handle the results of your query, you\'ll need to write custom page filter and serializer in your gatsby config',
  );
};

const toSitemapFormat = (siteUrl) => (page) => ({
  url: `${siteUrl || ''}${page.path}`,
  changefreq: 'daily',
  priority: 0.7,
});

module.exports = { getNodes, toSitemapFormat };
