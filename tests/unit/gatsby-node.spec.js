/* globals jest, describe, it, expect */

import {
  onCreateWebpackConfig,
  createPages,
  sourceNodes,
} from '../../gatsby-node';


describe('gatsby config', () => {
  it('sets CORS headers on development', () => {
    const actions = {
      setWebpackConfig: jest.fn(),
    };

    onCreateWebpackConfig({
      actions,
      stage: 'any',
    });

    expect(actions.setWebpackConfig.mock.calls).toHaveLength(0);

    onCreateWebpackConfig({
      actions,
      stage: 'develop',
    });

    expect(actions.setWebpackConfig.mock.calls).toHaveLength(1);
  });

  it('creates contentful graphql nodes', async () => {
    const edge = { node: { url: 'nodeUrl' } };
    const graphql = jest.fn(() => ({
      data: {
        allContentfulProduct: {
          edges: [edge],
        },
        allContentfulPage: {
          edges: [edge],
        },
      },
    }));
    const createPage = jest.fn();

    await createPages({
      graphql,
      actions: {
        createPage,
      },
    });

    expect(createPage.mock.calls[0][0].path).toBe(edge.node.url);
    expect(createPage.mock.calls[1][0].path).toBe(edge.node.url);
  });

  it('logs errors', async () => {
    const originalConsole = global.console.log;

    global.console.log = jest.fn();

    const graphql = jest.fn(() => ({
      errors: 'errors',
    }));

    await createPages({
      graphql,
      actions: {
        createPage: () => {},
      },
    });

    expect(global.console.log.mock.calls).toHaveLength(1);

    global.console.log = originalConsole;
  });
});
