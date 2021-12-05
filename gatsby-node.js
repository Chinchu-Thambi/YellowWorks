/* eslint-disable no-param-reassign */
exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === 'develop') {
    actions.setWebpackConfig({
      // Avoid CORS issues
      devServer: {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      },
      devtool: 'eval-source-map',
    });
  }
};

const nodePath = require('path');

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const query = `
    {
      allContentfulProduct {
        edges {
          node {
            url
          }
        }
      }
      allContentfulPage {
        edges {
          node {
            url
          }
        }
      }
    }
  `;

  const { data, errors } = await graphql(query);

  if (data === undefined) {
    console.log(errors);
    return;
  }

  data.allContentfulProduct.edges.forEach((edge) => {
    const path = edge.node.url;

    if (path) {
      createPage({
        path,
        // get absolute path for component
        component: nodePath.resolve(
          './src/templates/ContentfulModuleContainer.js',
        ),
        context: {
          // Add optional context data to be inserted
          // as props and graphQL variable into the page component..
          //
          // The context data can also be used as
          // arguments to the page GraphQL query.
          //
          // The page "path" is always available as a GraphQL
          // argument.
          url: path,
        },
      });
    }
  });

  data.allContentfulPage.edges.forEach((edge) => {
    const path = edge.node.url;

    if (path) {
      createPage({
        path,
        component: nodePath.resolve(
          './src/templates/ContentfulModuleContainer.js',
        ),
        // Add optional context data to be inserted
        // as props and graphQL variable into the page component..
        //
        // The context data can also be used as
        // arguments to the page GraphQL query.
        //
        // The page "path" is always available as a GraphQL
        // argument.
        context: edge.node,
      });
    }
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/my-yellow\/$/)) {
    page.matchPath = '/my-yellow/*';
    createPage(page);
  }
  if (page.path.match(/^\/our-products\/product-brief\/$/)) {
    page.matchPath = '/our-products/product-brief/*';
    createPage(page);
  }
};

exports.createSchemaCustomization = async ({ actions }) => {
  if (process.env.IAM_PRODUCT_PLATFORM_ENDPOINT) {
    return;
  }
  const { createTypes } = actions;
  const typeDefs = `
  type PricingPlan implements Node {
    id: ID!
    amount: Int!
    interval: PricingPlanInterval!
  }
  enum PricingPlanInterval {
    DAY
    WEEK
    MONTH
    YEAR
  }
  type Product implements Node {
    id: ID
    sku: String!
    name: String!
    pricingPlan: [PricingPlan]!
    family: String
    requiresPayment: Boolean
    printLastBookingDate: String
    # '10 Dec'
    printDeliveryDate: String
    # '10 Mar'
    printProductName: String
    # 'Auckland' etc
    printProductCode: String
  }
    type ProductPlatform implements Node {
      products (family: String): [Product]
    }
  `;
  createTypes(typeDefs);
};
