import axios from 'axios';
import {
  map,
  range,
  pluck,
  flatten,
  find,
  propEq,
  reduce,
  append,
} from 'ramda';

export const fetchAll = async ({
  url,
  pageSize,
  params,
  clientId,
  accessToken,
}) => {
  const loadPage = async ({ page }) => {
    const {
      data: {
        data,
        meta: {
          pagination: {
            current_page: currentPage,
            total_pages: totalPages,
          },
        },
      },
    } = await axios({
      url,
      params: {
        ...params,
        page,
        limit: pageSize,
      },
      headers: {
        Accept: 'application/json',
        'X-Auth-Client': clientId,
        'X-Auth-Token': accessToken,
      },
    });

    return {
      data,
      currentPage,
      totalPages,
    };
  };

  const {
    data: firstPageData,
    currentPage,
    totalPages,
  } = await loadPage({ page: 1 });

  let remainingPagesData = [];

  if (currentPage < totalPages) {
    // create an array (loadingPages) of promises (loadPage())
    // from currentPage to totalPages (exclusive)
    const loadingPages = await Promise.all(map(
      (page) => loadPage({ page: page + 1 }),
    )(range(currentPage, totalPages)));

    // await for all of the products to be loaded, pick the data out of them.
    remainingPagesData = pluck('data')(loadingPages);
  }

  return flatten([firstPageData, remainingPagesData]);
};

export const createGatsbyNode = ({
  data, type, nodeId, createNode, createContentDigest,
}) => createNode(
  {
    ...data,
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type,
      content: JSON.stringify(data),
      contentDigest: createContentDigest(data),
    },
  },
);

export const linkCategories = ({
  categories, createNodeId,
}) => ({
  bigCommerceCategories: categories,
  categories: undefined,
  categories___NODE: map(
    (categoryId) => createNodeId(`bigcommerce-category-${categoryId}`),
  )(categories),
});

const getBySKU = (sku) => find(propEq('sku', sku));

export const linkModifiers = ({
  products,
  modifiers,
  createNodeId,
}) => ({
  bigCommerceModifiers: modifiers,
  modifiers: undefined,
  modifiers___NODE: reduce(
    (acc, modifier) => {
      const modifierProduct = getBySKU(modifier.display_name.replace('sku.', ''))(products);

      if (!modifierProduct) {
        return acc;
      }

      return append(createNodeId(`bigcommerce-product-${modifierProduct.id}`))(acc);
    }, [],
  )(modifiers),
});
