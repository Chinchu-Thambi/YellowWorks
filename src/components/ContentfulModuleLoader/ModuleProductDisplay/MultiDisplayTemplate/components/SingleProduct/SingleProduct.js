import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import Button from '../../../../../Button';
import { OpenArrow, FlexFeatures, FlexHeader } from '../../Styled';
import Switch from '../Switch';
import arrowHead from '../../../images/downArrow.svg';
import arrowHeadWhite from '../../../images/downArrowwhite.svg';
import { parseMd } from '../../../../../../util';

const SingleProduct = ({
  name,
  price,
  featureText,
  handlePurchase,
  product,
  shortText: tag,
  text,
  colorSet,
  addOns,
  handleAddOn,
  buttonText,
  recurringPayment,
}) => {
  const [active, setActive] = React.useState(false);
  const handleChange = () => {
    setActive(!active);
  };

  const arrow = R.includes('base', colorSet.text) ? arrowHeadWhite : arrowHead;
  return (
    <div className={`shadow-md rounded-3xl overflow-hidden bg-base-100 ${colorSet.text}`}>
      <div className={`rounded-3xl lg:m-1 ${colorSet.background} flex flex-col space-y-2 ${!active && 'h-full'} lg:h-auto`}>
        <div className={`rounded-b-3xl ${tag && colorSet.tag.background} ${tag && colorSet.tag.text} flex flex-col space-y-2 font-bold self-center w-max px-4 py-2`}>
          {tag || <div style={{ 'min-height': '20px' }} />}
        </div>
        <div className="p-4 pt-0">
          <h2 className="text-3xl">{name}</h2>
          <FlexHeader style={{ 'min-height': '80px', overflow: 'hidden' }}>
            {text}
          </FlexHeader>
          <h3 className="text-2xl">{price}{recurringPayment && (<small className="text-sm font-normal"> / month</small>)}</h3>
          <Button
            variant={colorSet.buttonVariant}
            className="self-center w-full"
            outline
            tabIndex="0"
            onClick={() => handlePurchase(product)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handlePurchase(product);
              }
            }}
          >
            {buttonText}
          </Button>
          <button className={`flex flex-row bg-transparent w-full items-stretch ${colorSet.text} lg:hidden justify-between font-bold pt-2`} onClick={handleChange} type="button">
            <p>Show all features</p>
            <OpenArrow src={arrow} alt={active ? 'Open' : 'Close'} active={active} />
          </button>
        </div>
      </div>
      <div className={`${!active && 'hidden'} lg:block`}>
        <FlexFeatures className="text-contrast-600 px-4 pt-2">
          <p className="font-bold text-contrast-600 ml-1">Top Features</p>
          {featureText}
        </FlexFeatures>
        {addOns && (
          <FlexFeatures className="text-contrast-600 px-4">
            <p className="font-bold text-contrast-600 ml-1">Add Ons</p>
            <div>
              {addOns.map(
                (addOn) => (
                  <div
                    className="flex flex-row justify-between cursor-pointer"
                  >
                    <Switch
                      id={`${product.name}-${addOn.name}`}
                      label={addOn.name}
                      description={addOn.text && parseMd(addOn.text.text)}
                      price={addOn.price}
                      checked={addOn.selected}
                      onChange={() => handleAddOn({ addOn, product })}
                    />
                  </div>
                ),
              )}
            </div>
          </FlexFeatures>
        )}
      </div>
    </div>
  );
};

const productType = PropTypes.shape({
  name: PropTypes.string,
  sku: PropTypes.string,
  childProducts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sku: PropTypes.sku,
    }),
  ),
});

SingleProduct.defaultProps = {
  name: '',
  price: '',
  featureText: '',
  text: '',
  shortText: '',
  recurringPayment: true,
  handlePurchase: () => { },
  handleAddOn: () => { },
  product: {},
  addOns: null,
  buttonText: 'Purchase',
  colorSet: {
    background: 'bg-contrast-100',
    text: 'text-contrast-600',
    buttonVariant: 'contrast',
    tag: {
      background: 'bg-contrast-600',
      text: 'text-base-100',
    },
  },
};

SingleProduct.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  text: PropTypes.string,
  shortText: PropTypes.string,
  buttonText: PropTypes.string,
  recurringPayment: PropTypes.bool,
  featureText: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  handlePurchase: PropTypes.func,
  handleAddOn: PropTypes.func,
  product: productType,
  colorSet: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
    buttonVariant: PropTypes.string,
    tag: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
  }),
  addOns: PropTypes.arrayOf(
    productType,
  ),
};

export default SingleProduct;
