import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass/styled-components';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Button from '../../../Button';
import { mediaBreakpointUp } from '../../../../util';

import check from '../images/check.svg';

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


export const Content = styled.div`
  width: 100%;
  padding-right: 0;

  ${mediaBreakpointUp('lg')} {
    width: 60%;
    padding-right: 150px;
  }

  h1 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    text-align: center;
    ${mediaBreakpointUp('md')} {
      text-align: left;
    }
  }

  h2 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    color: ${({ theme }) => theme.palette.accent[2][0]};
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSizes[1]};
    min-height: ${({ theme }) => theme.space[6]};
    ${mediaBreakpointUp('md')} {
      font-size: ${({ theme }) => theme.fontSizes[2]};
    }
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: ${({ theme }) => theme.fontSizes[4]};
    text-align: center;
    ${mediaBreakpointUp('md')} {
      text-align: left;
    }
  }

  li p {
    font-size: ${({ theme }) => theme.fontSizes[1]};
    line-height: ${({ theme }) => theme.fontSizes[3]};
    text-align: left;

    ${mediaBreakpointUp('md')} {
      font-size: ${({ theme }) => theme.fontSizes[2]};
      line-height: ${({ theme }) => theme.fontSizes[4]};
    }
  }
  
  ul {
    display: flex;
    padding-left: 0;
    text-align: left;
    list-style: none;
    line-height: ${({ theme }) => theme.space[4]};
    margin-top: ${({ theme }) => theme.space[6]};
  }

  li {
    padding-right: 0;
    width: 30%;
    margin-right: ${({ theme }) => theme.space[3]};
    list-style-type: none;
  }

  span {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
  }
`;


export const FeatureContainer = styled.div`
  margin-top: ${({ theme }) => theme.space[3]};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('lg')} {
    width: 60%;
  }
`;

export const Feature = ({
  name,
  price,
  featureText,
  handlePurchase,
  product,
  shortText,
}) => (
  <FlexWrapper>
    <FlexHeader>
      <h2>{name}</h2>
      <h3>{price}</h3>
    </FlexHeader>
    <FlexFeatures>
      {shortText}
      {featureText}
    </FlexFeatures>
    <Button
      variant="primary"
      tabIndex="0"
      onClick={() => handlePurchase(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handlePurchase(product);
        }
      }}
    >
      Purchase
    </Button>
  </FlexWrapper>
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
  price: '',
  featureText: '',
  shortText: '',
  handlePurchase: () => { },
  product: {},
};

Feature.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  shortText: PropTypes.string,
  featureText: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  handlePurchase: PropTypes.func,
  product: productType,
};

export const FlexWrapper = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.large};
  border-radius: 5px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }) => theme.palette.base[0]};
  align-items: stretch;
  padding-bottom: ${({ theme }) => theme.space[4]};
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space[4]};

  Button {
    width: 50%;
    align-self: center;
    margin-top: ${({ theme }) => theme.space[4]};

    ${mediaBreakpointUp('lg')} {
      width: 70%;
    }

    ${mediaBreakpointUp('xl')} {
      width: 50%;
    }
  }

  ${mediaBreakpointUp('lg')} {
    width: 49%;
    margin-bottom: ${({ theme }) => theme.space[4]};
  }
`;

export const FlexHeader = styled.div`
  background: ${({ theme }) => theme.palette.contrast[0]};
  color: ${({ theme }) => theme.palette.base[0]};
  clip-path: ellipse(90% 87% at 50% 5%);
  height: 190px;
  padding-top: ${({ theme }) => theme.space[4]};

  > h2 {
    font-size: ${({ theme }) => theme.fontSizes[4]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};

    ${mediaBreakpointUp('lg')} {
      font-size: ${({ theme }) => theme.fontSizes[4]};
    }

    ${mediaBreakpointUp('xxl')} {
      font-size: ${({ theme }) => theme.fontSizes[5]};
    }
  }

  > h3 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin: 0;
  }
`;

export const FlexFeatures = styled.div`
  color: ${({ theme }) => theme.palette.contrast[1]};
  margin-bottom: ${({ theme }) => theme.space[4]};
  padding-left: 15px;
  padding-right: 15px;
  
  ul {
    text-align: left;
    list-style-image: url(${check});
    line-height: 2em;
  }

  li {
    padding-left: ${({ theme }) => theme.space[3]};
  }
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.palette.accent[3][0]};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes[1]};
`;

export const AddToCart = styled(Flex)`
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const AddToCartButton = styled(Button)`
  margin-left: ${({ theme }) => `${theme.space[3]}`};
`;


export const ExtraBlock = styled.div`
  width: 100%;
  margin-left: auto;
  padding-top: 0;
  border-radius: ${({ theme }) => theme.space[1]};
  margin-left: auto;
  padding-bottom: ${({ theme }) => `${theme.space[2]}`};
  
  >${Box}:first-of-type {
    background: ${({ theme }) => theme.palette.base[0]};
    box-shadow: ${({ theme }) => theme.shadows.large};
    >${Flex}:first-of-type {
      border-radius: ${({ theme }) => theme.space[1]};
      font-size: ${({ theme }) => theme.fontSizes[2]};
      padding: ${({ theme }) => `0 ${theme.space[3]}`};
      margin-bottom: 0;
      margin-top: 0;
      color: ${({ theme }) => theme.palette.contrast[2]};

      img {
        align-self: center;
      }
      p {
        display: ${({ collapsed }) => (collapsed ? 'none' : 'flex')};
      }
    }
  }

  > ${Flex} {
    padding: ${({ theme }) => `${theme.space[1]} ${theme.space[4]}`};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    background: ${({ theme }) => theme.palette.contrast[5]};
    
    > img {
      margin-right: ${({ theme }) => theme.space[2]};
      height: ${({ theme }) => theme.space[3]};
    }

    > p {
      position: relative;
      top: 2px;
    }
  }
`;

export const OpenArrow = styled.img`
  transition: transform .4s;
  ${(props) => (!props.active
    ? (`
  transform: rotateX(0deg);
  `)
    : (`
  transform: rotateX(180deg);
  `)
  )};
`;
