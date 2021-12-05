// eslint-disable-next-line import/prefer-default-export
export const sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}, configOptions) => {
  const { createNode } = actions;
  const { storeHash, clientId, accessToken } = configOptions;

  process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT;

};
