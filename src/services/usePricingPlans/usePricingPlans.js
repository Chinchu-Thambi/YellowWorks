import { useStaticQuery, graphql } from 'gatsby';
import * as R from 'ramda';

// TODO - pull out into dual calls, one for all products and one for specific single skus e.g. searchads
const query = graphql`
  {
    productPlatform {
      products {
      family
      name
      pricingPlan {
        amount
        id
        interval
      }
      printDeliveryDate
      printLastBookingDate
      printProductCode
      printProductName
      requiresPayment
      sku
    }
    }
  }
`;

const usePricingPlans = ({ skuList = [] } = {}) => {
  const productPlatformQuery = useStaticQuery(query);
  let pricingNodes = [];
  if (productPlatformQuery.productPlatform) {
    pricingNodes = R.compose(
      R.fromPairs,
      R.into([], R.pipe(
        R.map((product) => ([
          product.sku,
          product.pricingPlan,
        ])),
        R.filter((product) => skuList.includes(R.prop('sku', product))),
      )),
      R.path(['productPlatform', 'products']),
    )(productPlatformQuery);
  }
  return {
    pricingPlans: pricingNodes,
  };
};

export default usePricingPlans;
