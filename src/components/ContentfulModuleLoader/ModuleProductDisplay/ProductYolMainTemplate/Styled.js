/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass/styled-components';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Button from '../../../Button';
import { mediaBreakpointUp } from '../../../../util';

import check from '../images/check.svg';
import checked from '../../../../assets/icons/selected.png';
import unchecked from '../../../../assets/icons/unselected.png';

// Icons
import StarGoldIcon from '../../../../assets/icons/gold-boost-star.svg';
import StarSilverIcon from '../../../../assets/icons/silver-boost-star.svg';
import StarBronzeIcon from '../../../../assets/icons/bronze-boost-star.svg';

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
  isSelected,
  selectProduct,
  product,
  shortText,
}) => (
  <FlexWrapper>
    <FlexHeader isSelected={isSelected}>
      <h2>{name}</h2>
      {price !== 'Free' && (<h3 className="line-through">{price}</h3>)}
      {price !== 'Free' && (<h3>Promo code: <strong>PREM2020</strong></h3>)}
    </FlexHeader>
    <FlexFeatures>
      {shortText}
      {featureText}
    </FlexFeatures>
    {/* TODO: Introduce Modal. */}
    {/* <StyledLink href={product.url}>View profile template</StyledLink> */}
    { isSelected ? (
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
    )}
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
  isSelected: false,
  selectProduct: () => {},
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
  isSelected: PropTypes.bool,
  selectProduct: PropTypes.func,
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
  background: ${({ theme, isSelected }) => (isSelected ? theme.palette.contrast[0] : theme.palette.contrast[2])};
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

const ExtraName = styled.p`
  width: 80px;
  font-weight: ${({ theme }) => theme.fontWeight[1]};
`;

const ExtraText = styled.p`
  width: 60%;
  margin-right: ${({ theme }) => theme.space[2]};
`;

const ExtraPrice = styled.p`
  margin-left: auto;
  font-weight: ${({ theme }) => theme.fontWeight[1]};
`;

export const Extra = ({
  selectExtra,
  isSelected,
  product,
  name,
  text,
  price,
}) => (
  <Flex
    alignItems="center"
    role="listbox"
    tabIndex="0"
    onClick={() => selectExtra(!isSelected ? product : null)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        selectExtra(!isSelected ? product : null);
      }
    }}
  >
    <img src={isSelected ? checked : unchecked} alt="" />
    <ExtraName>{name}</ExtraName>
    <img src={(name === 'Gold' ? StarGoldIcon : name === 'Silver' ? StarSilverIcon : name === 'Bronze' ? StarBronzeIcon : '')} alt="" />
    <ExtraText>{text}</ExtraText>
    <ExtraPrice>{price} / month</ExtraPrice>
  </Flex>
);

Extra.defaultProps = {
  selectExtra: () => {},
  isSelected: false,
  product: {},
  name: '',
  text: '',
  price: '',
};

Extra.propTypes = {
  selectExtra: PropTypes.func,
  isSelected: PropTypes.bool,
  product: productType,
  name: PropTypes.string,
  text: PropTypes.string,
  price: PropTypes.string,
};

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
