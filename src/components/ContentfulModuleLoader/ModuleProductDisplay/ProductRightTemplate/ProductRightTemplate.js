/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import slugify from 'slugify';
import seoSetup from '../../../../assets/icons/SEOsetup.png';

import { parseMd } from '../../../../util';
import {
  Container,
} from '../../ContenfulModules.styled';
import {
  Feature, Content, FeatureContainer, Header, FlexStyled,
} from './Styled';


const ProductRightTemplate = (props) => {
  const {
    reference,
    title,
    products,
    callToAction,
    callToActionUrl,
  } = props;
  const initialProduct = R.head(products) || null;

  const [selectedProduct, selectProduct] = React.useState(initialProduct);

  return (
    <Container id={slugify(reference, { lower: true })}>
      <Header>{parseMd(title)}</Header>
      <FlexStyled>
        <Content>
          <h1>How much does it cost?</h1>
          <p>You're in control. Our SEO solution works best with New Zealand's
            small to medium-sized businesses.
            Our plans are based on the number of products and services you would like to focus.
            Audits start at $659 and our monthly SEO plans start from $349 per month.
          </p>
          <ul>
            <li>
              <h2>CHARGE UP</h2>
              <p>A 12 month plan to keep your SEO working hard.</p>
              <span>From $349</span>
            </li>
            <li>
              <h2>CONTENT BOLT ON</h2>
              <p>Add this to your monthly plan and boost your SEO efforts with regular content including new web pages, blogs and video.</p>
              <span>From $399</span>
            </li>
            <li>
              <h2>TECH BOLT ON</h2>
              <p>Add this to your monthly plan and boost your SEO efforts with regular technical calibration, including backlink analysis, competitor analysis, crawl errors and Google My Business audits.</p>
              <span>From $549</span>
            </li>
          </ul>
        </Content>
        <FeatureContainer>
          {products && products.map((product) => (
            product && (
              <Feature
                image={seoSetup}
                key={product.sku}
                name={product.name}
                featureText={parseMd(product.features && product.features.features)}
                isSelected={selectedProduct && selectedProduct.sku === product.sku}
                selectProduct={selectProduct}
                product={product}
                callToAction={callToAction}
                callToActionUrl={callToActionUrl}
              />
            )
          ))}
        </FeatureContainer>
      </FlexStyled>
    </Container>
  );
};

ProductRightTemplate.defaultProps = {
  reference: '',
  title: '',
  products: [],
  callToAction: '',
  callToActionUrl: '',
};

const productPropType = PropTypes.shape({
  name: PropTypes.string,
  sku: PropTypes.string,
  childProducts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sku: PropTypes.string,
    }),
  ),
});

ProductRightTemplate.propTypes = {
  reference: PropTypes.string,
  title: PropTypes.shape({
    title: PropTypes.string,
  }),
  products: PropTypes.arrayOf(
    productPropType,
  ),
  callToAction: PropTypes.string,
  callToActionUrl: PropTypes.string,
};

export default ProductRightTemplate;
