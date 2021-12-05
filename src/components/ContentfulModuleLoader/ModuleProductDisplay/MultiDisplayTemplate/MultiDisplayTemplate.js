import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import slugify from 'slugify';
import { navigate } from 'gatsby';

import usePurchase from '../../../../services/usePurchase';
import usePricingPlans from '../../../../services/usePricingPlans';
import { parseMd, formatRecurringPrice } from '../../../../util';

import {
  Content, Container,
} from '../../ContenfulModules.styled';

import SingleProduct from './components/SingleProduct';

const colorVariants = [{
  background: 'bg-contrast-100',
  text: 'text-contrast-600',
  buttonVariant: 'contrast',
  tag: {
    background: 'bg-contrast-600',
    text: 'text-base-100',
  },
},
{
  background: 'bg-brand-600',
  text: 'text-contrast-600',
  buttonVariant: 'contrast',
  tag: {
    background: 'bg-contrast-600',
    text: 'text-base-100',
  },
},
{
  background: 'bg-contrast-600',
  text: 'text-base-100',
  buttonVariant: 'light',
  tag: {
    background: 'bg-brand-600',
    text: 'text-contrast-600',
  },
}];

const MultiDisplayTemplate = (props) => {
  const {
    reference,
    title,
    description,
    products,
    image,
  } = props;

  const skuList = R.uniq(
    R.flatten(
      R.map((product) => R.append(product.sku, product.childProducts?.map(({ sku }) => sku)), products),
    ),
  );

  const { pricingPlans } = usePricingPlans({ skuList });
  const { purchase, initiatePurchase } = usePurchase();

  const gridLength = R.min(products?.length + (image ? 1 : 0), 3);

  const [selectedProduct, selectProduct] = React.useState(purchase?.selectedProduct || null);
  const [selectedChild, selectChildProduct] = React.useState(purchase?.selectedChild || null);

  const handlePurchase = (product) => {
    const validChild = product === selectedProduct ? selectedChild : null;
    initiatePurchase({
      product: {
        sku: product.sku,
        pricingPlan: pricingPlans?.[product?.sku]?.[0],
        requiresPayment: product?.requiresPayment,
      },
      childProducts: validChild ? [{
        sku: validChild.sku,
        pricingPlan: pricingPlans?.[validChild?.sku]?.[0],
        requiresPayment: validChild?.requiresPayment,
      }] : [],
    });
    navigate('/checkout/');
  };

  const handleSelectChild = ({ addOn: childProduct, product }) => {
    if (Boolean(selectedChild) && selectedChild.sku === childProduct.sku && product === selectedProduct) {
      selectChildProduct(null);
    } else {
      selectProduct(product);
      selectChildProduct(childProduct);
    }
  };
  return (
    <Container id={slugify(reference, { lower: true })}>
      <div className="flex flex-col pb-4">
        <Content>
          {title && (
            <h1>{parseMd(title)}</h1>
          )}
          {description && (
            <p>{parseMd(description)}</p>
          )}
        </Content>
        <div className={`grid lg:grid-cols-${gridLength || 1} gap-4`}>
          {image && (
            <div>
              {image?.file
                ? (
                  <img
                    src={image.file.url}
                    alt={image.description}
                    className="w-full h-auto"
                  />
                )
                : null}
            </div>
          )}
          {products && products.map((product, i) => {
            const productPrice = pricingPlans?.[product.sku]?.[0].amount / 100;
            const selected = selectedProduct?.sku === product.sku;
            const childPrice = pricingPlans?.[selectedChild?.sku]?.[0].amount / 100 || 0;
            const fullPrice = !selected ? productPrice : (childPrice + productPrice);
            const priceMappedAddOns = product.childProducts?.map(
              (cp) => (
                {
                  price: formatRecurringPrice(pricingPlans?.[cp.sku]?.[0].amount / 100, true),
                  selected: (Boolean(selectedChild) && selectedChild.sku === cp.sku) && selected,
                  ...cp,
                }));
            const { overwriteUrl, overwritePrice, overwriteButton } = JSON.parse(product?.customJson?.internal?.content || '{}');
            return (
              product && (
                <SingleProduct
                  colorSet={colorVariants[i]}
                  key={product.sku}
                  name={product.name}
                  shortText={parseMd(product.shortText)}
                  text={parseMd(product.text?.text)}
                  price={overwritePrice || formatRecurringPrice(fullPrice, false)}
                  featureText={parseMd(product.features && product.features.features)}
                  handlePurchase={overwriteUrl ? () => navigate(overwriteUrl) : handlePurchase}
                  handleAddOn={handleSelectChild}
                  product={product}
                  addOns={priceMappedAddOns}
                  buttonText={overwriteButton}
                  recurringPayment={product.recurringPayment}
                />
              )
            );
          })}
        </div>
      </div>
    </Container>
  );
};
MultiDisplayTemplate.defaultProps = {
  reference: '',
  title: '',
  description: '',
  products: [],
  image: null,
};

const productPropType = PropTypes.shape({
  name: PropTypes.string,
  sku: PropTypes.string,
  price: PropTypes.number,
  recurringPayment: PropTypes.bool,
  customJson: PropTypes.shape({
    internal: PropTypes.shape({
      content: PropTypes.string,
    }),
  }),
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

MultiDisplayTemplate.propTypes = {
  reference: PropTypes.string,
  title: PropTypes.shape({
    title: PropTypes.string,
  }),
  description: PropTypes.shape({
    description: PropTypes.string,
  }),
  products: PropTypes.arrayOf(
    productPropType,
  ),
  image: PropTypes.shape({
    file: PropTypes.shape({
      url: PropTypes.string,
      details: PropTypes.shape({
        image: PropTypes.shape({
          width: PropTypes.number,
          height: PropTypes.number,
        }),
      }),
    }),
    description: PropTypes.string,
  }),
};

export default MultiDisplayTemplate;
