import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import styled from 'styled-components';

import Button from '../../Button';
import { mediaBreakpointUp } from '../../../util';
import { Container as GridContainer, BaseContainer } from '../../Grid';

import background from './images/background.svg';
import rocket from './images/rocket.svg';
import check from './images/check.svg';
import checked from './images/checked-box.svg';
import unchecked from './images/unchecked-box.svg';

const Background = styled.div`
  background: url(${background}) no-repeat 50% 50%;
`;

export const Rocket = styled.div`
  ${mediaBreakpointUp('lg')} {
    background: no-repeat url(${rocket}) 0 50% / 90% auto;
    width: 330px;
    height: 650px;
  }
`;

const ExtendedContainer = styled(BaseContainer)`
  padding-top: ${({ theme }) => theme.space[3]};

  > h1 {
    text-align: center;
    margin-bottom: ${({ theme }) => theme.space[5]};
    font-size: ${({ theme }) => theme.fontSizes[4]};
    font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  }
`;

export const Container = (props) => (
  <Background>
    <GridContainer
      ExtendedContainer={ExtendedContainer}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </Background>
);

export const Features = ({ children }) => (
  <Flex justifyContent="space-between">
    <Rocket />
    {children}
  </Flex>
);

Features.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const FeatureStyled = styled.div`
  width: 380px;
  border-radius: 5px;
  overflow: hidden;
  background: ${({ theme }) => theme.palette.base[0]};
  box-shadow: 0px 2px 15px rgba(76, 85, 105, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  ${Button} {
    align-self: center;
    margin-bottom: ${({ theme }) => theme.space[3]};
  }
`;

const FeatureHeader = styled.div`
  background: ${({ theme, isSelected }) => (isSelected ? theme.palette.contrast[0] : theme.palette.contrast[2])};
  color: ${({ theme }) => theme.palette.base[0]};
  clip-path: ellipse(90% 60% at 50% 35%);
  height: 136px;
  padding-top: ${({ theme }) => theme.space[4]};

  > h2 {
    font-size: ${({ theme }) => theme.fontSizes[5]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[3]};
  }

  > h3 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin: 0;
  }
`;

const FeatureContainer = styled.div`
  color: ${({ theme }) => theme.palette.contrast[1]};
  margin-bottom: auto;
  padding-left: 15px;
  padding-right: 15px;
  
  ul {
    text-align: left;
    list-style-image: url(${check});
    line-height: 2em;
  }

  .include-header {
    text-transform: uppercase;
  }
`;

export const Feature = ({
  name,
  price,
  featureText,
  isSelected,
  selectProduct,
  product,
}) => (
  <FeatureStyled>
    <FeatureHeader isSelected={isSelected}>
      <h2>{name}</h2>
      <h3>{price}</h3>
    </FeatureHeader>
    <FeatureContainer>
      {featureText}
    </FeatureContainer>
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
        Select
        {' '}
        {name}
      </Button>
    )}
  </FeatureStyled>
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
  isSelected: false,
  selectProduct: () => {},
  product: {},
};

Feature.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  featureText: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  isSelected: PropTypes.bool,
  selectProduct: PropTypes.func,
  product: productType,
};

export const Extras = styled.div`
  width: 69%;
  background: ${({ theme }) => theme.palette.contrast[5]};
  border-radius: ${({ theme }) => theme.space[1]};
  margin-left: auto;
  padding-bottom: ${({ theme }) => `${theme.space[2]}`};
  margin-bottom: ${({ theme }) => `${theme.space[4]}`};

  > h3 {
    background: ${({ theme }) => theme.palette.base[0]};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: ${({ theme }) => theme.space[1]};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
    margin-bottom: ${({ theme }) => `${theme.space[2]}`};
    color: ${({ theme }) => theme.palette.contrast[2]};
  }

  > ${Flex} {
    padding: ${({ theme }) => `${theme.space[0]} ${theme.space[4]}`};
    font-size: ${({ theme }) => theme.fontSizes[1]};

    > img {
      margin-right: ${({ theme }) => `${theme.space[2]}`};
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

const ExtraText = styled.p``;

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
    <ExtraText>{text}</ExtraText>
    <ExtraPrice>{price}</ExtraPrice>
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

export const ButtonWrapper = styled(Flex)`
  justify-content: flex-end;
  align-items: center;
  margin-bottom: ${({ theme }) => `${theme.space[4]}`};
`;

export const PurchaseButton = styled(Button)`
  margin-left: ${({ theme }) => `${theme.space[4]}`};
`;
