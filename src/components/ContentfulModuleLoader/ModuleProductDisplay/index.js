import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import slugify from 'slugify';

import ProductRightTemplate from './ProductRightTemplate';
import ProductYolMainTemplate from './ProductYolMainTemplate';
import SearchAds from './ProductSearchAdsTemplate';
import ProductGMBTemplate from './ProductGMBTemplate';
import ProductWebsitesTemplate from './ProductWebsitesTemplate';

const ModuleProductDisplay = (props) => {
  const { products, reference } = props;
  if (products === null) {
    return null;
  }
  let TemplateModule;
  switch (reference) {
    case 'Yellow Choose Your Profile':
      TemplateModule = ProductYolMainTemplate;
      break;
    case 'Google Search Ads Buy Journey':
      TemplateModule = SearchAds;
      break;
    case 'SEO Product Brief':
      TemplateModule = ProductRightTemplate;
      break;
    case 'Google My Business':
      TemplateModule = ProductGMBTemplate;
      break;
    case 'Yellow Websites':
      TemplateModule = ProductWebsitesTemplate;
      break;
    default:
      break;
  }
  const newprops = { ...props, products };

  if (TemplateModule === undefined) {
    // eslint-disable-next-line no-console
    console.error(`Couldn't find a Module Product template for ${reference}`);
    return null;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TemplateModule id={slugify(reference, { lower: true })} {...newprops} />;
};

ModuleProductDisplay.defaultProps = {
  reference: '',
  products: [
    {
      sku: '',
      name: '',
    },
  ],
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

ModuleProductDisplay.propTypes = {
  reference: PropTypes.string,
  products: PropTypes.arrayOf(
    productPropType,
  ),
};

export default withTheme(ModuleProductDisplay);
