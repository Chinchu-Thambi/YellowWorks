import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import slugify from 'slugify';
import { Box, Flex, Text } from 'rebass/styled-components';

import { navigate } from '@reach/router';
import {
  parseMd, formatPrice, formatRecurringPrice,
} from '../../../../util';

import ArrowHead from '../../../../assets/icons/arrowHead.svg';
import Spinner from '../../../Spinner';
import { Container } from '../../../Grid';
import phonePreview from '../images/yellow-profile-hero-mobile-V02.png';

import {
  Content,
} from '../../ContenfulModules.styled';

import {
  Feature, FeatureContainer,
  ExtraBlock, Extra, FlexStyled, OpenArrow,
} from './Styled';

import {
  ButtonWrapper,
  PurchaseButton,
} from '../styled';

import usePurchase from '../../../../services/usePurchase';
import usePricingPlans from '../../../../services/usePricingPlans';

const getTotalPrice = ({
  selectedProduct,
  selectedChild,
  pricingPlans,
}) => {
  let totalPrice = 0;
  totalPrice += (
    pricingPlans?.[selectedProduct?.sku]?.[1]
    || pricingPlans?.[selectedProduct?.sku]?.[0])?.amount / 100 || 0;

  if (selectedProduct) {
    totalPrice += pricingPlans?.[selectedChild?.sku]?.[0]?.amount / 100 || 0;
  }

  return totalPrice;
};

const getFormattedTotalPrice = R.compose(
  formatPrice,
  getTotalPrice,
);

const ProductYolMainTemplate = (props) => {
  const {
    reference,
    title,
    products,
  } = props;

  const initialProduct = R.head(products) || null;

  const skuList = R.uniq(
    R.flatten(
      R.map((product) => R.append(product.sku, product.childProducts.map(({ sku }) => sku)), products),
    ),
  );

  const { pricingPlans } = usePricingPlans({ skuList });
  const { purchase, initiatePurchase, isSubmitting } = usePurchase();

  const [selectedProduct, selectProduct] = React.useState(purchase?.selectedProduct || null);
  const [selectedChild, selectChildProduct] = React.useState(purchase?.selectedChild || null);
  const [collapsed, setCollapsed] = React.useState(true);

  const childProductsBySelectedSKU = R.prop('childProducts')(
    R.find(R.propEq('sku', (selectedProduct?.sku || initialProduct?.sku)))(products || []),
  ) || [];

  const handlePurchase = () => {
    initiatePurchase({
      product: {
        sku: selectedProduct.sku,
        pricingPlan: pricingPlans?.[selectedProduct?.sku]?.[1]
        || pricingPlans?.[selectedProduct?.sku]?.[0],
        requiresPayment: selectedProduct?.requiresPayment,
      },
      childProducts: selectedChild ? [{
        sku: selectedChild.sku,
        pricingPlan: pricingPlans?.[selectedChild?.sku]?.[0],
        requiresPayment: selectedChild?.requiresPayment,
      }] : [],
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
      <FlexStyled>
        <Box as="div" display={['none', null, null, 'flex']} maxWidth="40%" maxHeight="800px">
          <img src={phonePreview} alt="Yellow Profile Example" />
        </Box>
        <FeatureContainer>
          {products && products.map((product) => {
            const price = pricingPlans?.[product.sku]?.[1]?.amount / 100
            || pricingPlans?.[product.sku]?.[0]?.amount / 100;
            return (
              product && (
                <Feature
                  key={product.sku}
                  name={product.name}
                  text={product.shortText}
                  price={formatRecurringPrice(price, true)} // TODO expand to accept the variable pricing plans
                  featureText={parseMd(product.features && product.features.features)}
                  isSelected={selectedProduct && selectedProduct.sku === product.sku}
                  selectProduct={selectProduct}
                  product={product}
                />
              )
            );
          })}
          <ExtraBlock collapsed={collapsed}>
            <Box>
              <Flex flexDirection="column" onClick={() => setCollapsed(!collapsed)}>
                <Flex flexDirection="row" justifyContent="space-between">
                  <h3>{selectedProduct ? selectedProduct.childProductsOffer : initialProduct.childProductsOffer}</h3>
                  <OpenArrow src={ArrowHead} alt={collapsed ? 'Open' : 'Close'} active={collapsed} />
                </Flex>
                <Flex flexDirection="column">
                  <Text as="p" fontSize={2} marginBottom={2}>A Category Boost helps make your business profile appear higher up in searches on Yellow!<br />Grab more attention from customers and rank ahead of your competition.</Text>
                  <Text as="p" fontSize={2} marginBottom={2}>If you have a Gold Category Boost, search results in your industry (e.g. Plumbers) will become more visible above other Plumbing profiles that have Silver or Bronze Category Boosts.</Text>
                </Flex>
              </Flex>
            </Box>
            {childProductsBySelectedSKU && childProductsBySelectedSKU.map(
              (childProduct) => {
                const price = pricingPlans?.[childProduct.sku]?.[0].amount / 100;
                return (
                  <Extra
                    key={childProduct.sku}
                    name={childProduct.shortName}
                    text={childProduct.shortText}
                    isSelected={Boolean(selectedChild) && selectedChild.sku === childProduct.sku}
                    selectExtra={selectChildProduct}
                    product={childProduct}
                    price={formatPrice(price)}
                  />
                );
              },
            )}
          </ExtraBlock>
          <ButtonWrapper flex="auto">
            <Box mr={3}>
              Total price:
              {' '}
              {getFormattedTotalPrice({
                selectedProduct,
                selectedChild,
                pricingPlans,
              })}
              {selectedProduct?.sku === 'YPPREMIUM' && ' (Enter code PREM2020 at checkout)'}
            </Box>
            {isSubmitting && (
              <Spinner />
            )}
            <PurchaseButton
              disabled={isSubmitting || !selectedProduct}
              onClick={handlePurchase}
            >
              Purchase
            </PurchaseButton>
          </ButtonWrapper>
        </FeatureContainer>
      </FlexStyled>
    </Container>
  );
};

ProductYolMainTemplate.defaultProps = {
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

ProductYolMainTemplate.propTypes = {
  reference: PropTypes.string,
  title: PropTypes.shape({
    title: PropTypes.string,
  }),
  products: PropTypes.arrayOf(
    productPropType,
  ),
};

export default ProductYolMainTemplate;
