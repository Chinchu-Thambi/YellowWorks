import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as R from 'ramda';

import Spinner from '../../../../../components/Spinner';
import Button from '../../../../../components/Button';
import { mediaBreakpointUp } from '../../../../../util';

import ProductItem from './ProductItem';
import usePurchase from '../../../../../services/usePurchase';

const Card = styled.div`
  box-shadow: 0px 0px 15px rgba(152, 152, 152, 0.2);
  margin-bottom: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[3]};
  position: relative;
  border-radius: 5px;
  max-width: 100%;

  ${mediaBreakpointUp('md')} {
    padding: 40px 100px;
  }
`;

const Variant = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.space[3]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gallery};
  margin-bottom: ${({ theme }) => theme.space[3]};

  > h3 {
    margin: 0 auto 0 0;
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    font-size: 28px;
  }
`;

const ProductGroup = ({
  allProducts,
  productList,
}) => {
  const [isRemoving, setIsRemoving] = React.useState(false);
  const { resetPurchase } = usePurchase();

  const contentedProductList = productList.map((product) => ({
    ...product,
    contentfulObject: allProducts.find(R.propEq('sku', product.sku)),
  }));

  const productVariant = contentedProductList.find(R.pathEq(['contentfulObject', 'type'], 'product-variant'));

  return (
    <Card>
      <Variant>
        <h3>{productVariant && productVariant.contentfulObject.productFamily}</h3>
        {isRemoving && (
          <Spinner />
        )}
        <Button
          variant="link"
          disabled={isRemoving}
          onClick={() => {
            setIsRemoving(true);
            resetPurchase();
          }}
        >Remove
        </Button>
      </Variant>
      { contentedProductList.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
        />
      ))}
    </Card>
  );
};

ProductGroup.defaultProps = {
  allProducts: [],
  productList: [],
};

ProductGroup.propTypes = {
  allProducts: PropTypes.arrayOf(PropTypes.shape({
    sku: PropTypes.string,
    name: PropTypes.string,
    recurringPayment: PropTypes.bool,
  })),
  productList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ),
};

export default ProductGroup;
