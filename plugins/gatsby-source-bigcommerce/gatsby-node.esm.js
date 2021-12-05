import { forEach } from 'ramda';

import {
  fetchAll, createGatsbyNode,
} from './util';

// eslint-disable-next-line import/prefer-default-export
export const sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}, configOptions) => {
  const { createNode } = actions;
  const { storeHash, clientId, accessToken } = configOptions;

  const bigCommerceBaseUrl = `https://api.bigcommerce.com/stores/${storeHash}`;

  const fetchProductsPromise = fetchAll({
    url: `${bigCommerceBaseUrl}/v3/catalog/products`,
    clientId,
    accessToken,
    pageSize: 10,
    params: {
      include: 'modifiers, custom_fields',
    },
  });

  const [
    products,
  ] = await Promise.all([
    fetchProductsPromise,
  ]);

  forEach((product) => {
    createGatsbyNode({
      data: {
        ...product,
        bigCommerceId: product.id, // because product.id is overwritten by an uuid in graphql
      },
      type: 'BigCommerceProducts',
      nodeId: createNodeId(`bigcommerce-products-${product.id}`),
      createNode,
      createContentDigest,
    });
  })(products);
};
