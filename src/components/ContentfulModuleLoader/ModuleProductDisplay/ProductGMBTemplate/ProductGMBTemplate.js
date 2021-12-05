import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import slugify from 'slugify';

import { navigate } from '@reach/router';
import { Box } from 'rebass/styled-components';

import tempGmb from '../images/temp-gmb.png';

import {
  parseMd, formatRecurringPrice,
} from '../../../../util';

import {
  Container,
  Content,
} from '../../ContenfulModules.styled';

import {
  Feature, FeatureContainer, FlexStyled,
} from './Styled';



import usePurchase from '../../../../services/usePurchase';
import usePricingPlans from '../../../../services/usePricingPlans';

const ProductGMBTemplate = (props) => {
  const {
    reference,
    title,
    products,
  } = props;

  const skuList = R.uniq(
    R.flatten(
      R.map((product) => R.append(product.sku, product.childProducts?.map(({ sku }) => sku)), products),
    ),
  );

  const { pricingPlans } = usePricingPlans({ skuList });
  const { initiatePurchase } = usePurchase();

  const handlePurchase = (product) => {
    initiatePurchase({
      product: {
        sku: product.sku,
        pricingPlan: pricingPlans?.[product?.sku]?.[0],
        requiresPayment: product?.requiresPayment,
      },
    });
    navigate('/checkout/');
  };

  return (
    <Container id={slugify(reference, { lower: true })}>
      <Content>
        {title && (
          <h1>{parseMd(title)}</h1>
        )}
      </Content>
      <FlexStyled justifyContent="center">
        <FeatureContainer>
          {products && products.map((product) => {
            const price = pricingPlans?.[product.sku]?.[0].amount / 100;
            return (
              product && (
                <Feature
                  key={product.sku}
                  name={product.name}
                  text={product.shortText}
                  price={formatRecurringPrice(price, true)}
                  featureText={parseMd(product.features && product.features.features)}
                  handlePurchase={handlePurchase}
                  product={product}
                />
              )
            );
          })}
        </FeatureContainer>
        <Box as="div" display={['none', null, null, 'flex']} maxWidth="40%" maxHeight="800px">
          <img src={tempGmb} alt="Google Profile Example" />
        </Box>
      </FlexStyled>
    </Container>
  );
};

ProductGMBTemplate.defaultProps = {
  reference: '',
  title: '',
  products: [],
};

const productPropType = PropTypes.shape({
  name: PropTypes.string,
  sku: PropTypes.string,
  price: PropTypes.number,
  pricingPlan: PropTypes.arrayOf(
    PropTypes.string,
  ),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sku: PropTypes.string,
      shortName: PropTypes.string,
      price: PropTypes.number,
      shortText: PropTypes.string,
    }),
  ),
  requiresPayment: PropTypes.bool,
});

ProductGMBTemplate.propTypes = {
  reference: PropTypes.string,
  title: PropTypes.shape({
    title: PropTypes.string,
  }),
  products: PropTypes.arrayOf(
    productPropType,
  ),
};

export default ProductGMBTemplate;
