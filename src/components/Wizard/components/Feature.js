/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text } from 'rebass/styled-components';
import styled from 'styled-components';
// import { Link } from 'gatsby';

// import Button from '../../Button';
import { mediaBreakpointUp, theme } from '../../../util';

import check from '../../../assets/icons/black-checkmark.svg';

export const FlexStyled = styled(Flex)`
  flex-direction: column;

${mediaBreakpointUp('lg')} {
    flex-direction: row;
  }

  >div img {
    overflow: hidden;
    object-fit: contain;
    object-position: top;
  }
`;

export const FeatureContainer = styled.div`
  margin-top: ${theme.space[3]};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: ${theme.space[3]};

  ${mediaBreakpointUp('lg')} {
    width: 60%;
  }
`;

const Wrapper = styled(Flex)`
  border: 2px solid ${theme.palette.accent[4][0]};
  flex-direction: column;
  border-radius: ${theme.radii[3]};
  padding: ${theme.space[2]} ${theme.space[3]} ${theme.space[4]};
  height: min-content;
`;


export const FlexFeatures = styled.div`
  color: ${theme.palette.contrast[1]};
  margin-bottom: ${theme.space[4]};
  padding-left: 15px;
  padding-right: 15px;
  
  ul {
    text-align: left;
    list-style-image: url(${check});
    line-height: 2em;
  }

  li {
    padding-left: ${theme.space[3]};
  }
`;

export const Feature = ({
  name,
  // price,
  featureText,
  // isSelected,
  // selectProduct,
  // product,
  shortText,
}) => (
  <Wrapper>
    <Flex flexDirection="column" alignItems="center" marginTop={3}>
      <Text as="h2" textAlign="center" sx={{ textTransform: 'uppercase' }} pb={3}>{name}</Text>
      {shortText}
    </Flex>
    <FlexFeatures>
      <Text as="h3" textAlign="center" sx={{ textTransform: 'uppercase' }}>Features</Text>
      {featureText}
    </FlexFeatures>
    {/* TODO: Introduce Modal. */}
    {/* <StyledLink href={product.url}>View profile template</StyledLink> */}
    {/* { isSelected ? (
      <Button>Selected</Button>
    ) : (
      <Button
        variant="secondary"
        tabIndex="0"
        onClick={() => selectProduct(product)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            selectProduct(product);
          }
        }}
      >
        { isSelected ? 'Selected' : 'Select Profile' }
      </Button>
    )} */}
  </Wrapper>
);

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

Feature.defaultProps = {
  name: '',
  // price: '',
  featureText: '',
  shortText: '',
  isSelected: false,
  selectProduct: () => {},
  product: {},
};

Feature.propTypes = {
  name: PropTypes.string,
  // price: PropTypes.string,
  shortText: PropTypes.string,
  featureText: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  isSelected: PropTypes.bool,
  selectProduct: PropTypes.func,
  product: productType,
};

export const FlexWrapper = styled.div`
  box-shadow: ${theme.shadows.large};
  border-radius: 5px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: hidden;
  background: ${theme.palette.base[0]};
  align-items: stretch;
  padding-bottom: ${theme.space[4]};
  justify-content: space-between;
  margin-bottom: ${theme.space[4]};

  Button {
    width: 50%;
    align-self: center;
    margin-top: ${theme.space[4]};

    ${mediaBreakpointUp('lg')} {
      width: 70%;
    }

    ${mediaBreakpointUp('xl')} {
      width: 50%;
    }
  }

  ${mediaBreakpointUp('lg')} {
    margin-bottom: ${theme.space[4]};
  }
`;
