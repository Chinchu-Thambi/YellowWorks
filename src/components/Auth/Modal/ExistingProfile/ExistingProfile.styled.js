import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import styled from 'styled-components';

import StarGoldIcon from '../../../../assets/icons/gold-boost-star.svg';
import StarSilverIcon from '../../../../assets/icons/silver-boost-star.svg';
import StarBronzeIcon from '../../../../assets/icons/bronze-boost-star.svg';

import Button from '../../../Button';

import theme from '../../../../util/theme';
import { mediaBreakpointUp } from '../../../../util';

const imageMap = {
  GOLD: StarGoldIcon,
  SILVER: StarSilverIcon,
  BRONZE: StarBronzeIcon,
};

// Cards status variants
export const variants = {
  success: {
    color: theme.palette.success[2],
  },
  warn: {
    color: theme.palette.warn[2],
  },
  support: {
    color: theme.palette.support[2],
  },
  error: {
    color: theme.palette.error[2],
  },
  info: {
    color: theme.palette.base[3],
  },
};

export const CategoryBoost = ({
  categoryLevel,
}) => (imageMap[categoryLevel.toUpperCase()] ? (
  <Flex alignItems="center" justifyContent={['flex-start', null, null, 'flex-end']}>
    <img src={imageMap[categoryLevel.toUpperCase()]} alt="Boost Level" />
    <p><strong>{categoryLevel.toLowerCase()}</strong> Category Boost</p>
  </Flex>
) : null);

CategoryBoost.defaultProps = {
  categoryLevel: '',
};

CategoryBoost.propTypes = {
  categoryLevel: PropTypes.string,
};

export const Instructions = styled.p`
  padding-bottom: ${theme.space[2]};
  margin-top: 0;

  :focus{
    outline: none;
  }
`;

export const Card = styled.section`
  position: relative;
  border-radius: ${theme.space[1]};
  padding: ${theme.space[3]};
  margin: 0 ${theme.space[1]} ${theme.space[2]};
  flex-grow: 1;
  color: ${theme.palette.contrast[2]};
  border: 1px solid ${theme.palette.base[3]}; 
  overflow: hidden;
  text-align: left;

  h2 {
    margin-top: 0;
    margin-bottom: ${theme.space[2]};
    display: inline-block;
    font-size: ${theme.fontSizes[3]};
    font-weight: ${theme.fontWeight[1]};
    color: ${theme.palette.contrast[2]};
  }

  h3 {
    font-weight: ${theme.fontWeight[0]};
    text-transform: uppercase;
    font-size: ${theme.fontSizes[2]};
    margin: 0 0 ${theme.space[2]} 0;
  }

  h5 {
    margin: 0 0 ${theme.space[2]} 0;
    margin-right: ${theme.space[3]};
    font-size: ${theme.fontSizes[2]};
  }

  table {
    width: 100%;

    thead {
      font-weight: ${theme.fontWeight[1]};
    }
  }

  hr {
    border: 0;
    border-top: 1px solid ${theme.palette.contrast[4]};
  }

  p {
    margin: 0;
  }

  /* Handle status variants on My Products Page*/
  ${({ status, isSubCard }) => (status && !isSubCard) && (`
    border-left: 12px solid ${status && variants[status] ? variants[status].color : theme.palette.base[3]};
  `)}

  /* Handle status variants on Manage Profile Page*/
  ${({ status, isSubCard }) => (status === 'support' && isSubCard) && (`
    border: 1px solid ${variants[status] ? variants[status].color : theme.palette.base[3]};
    background-color: ${variants[status] ? variants[status].color : theme.palette.base[3]}20;
    border-left: auto;
  `)}
`;

export const BoostWrapper = styled.div`
  img {
    margin-right: ${theme.space[2]};
    height: ${theme.space[3]};
  }

  strong {
    text-transform: capitalize;
  }
`;

export const StyledButton = styled(Button)`
  margin: ${theme.space[4]} ${theme.space[4]} 0;
`;

export const Title = styled.p`
  font-weight: ${theme.fontWeight[1]};
  color: ${theme.palette.contrast[2]};
`;

export const MinifiedWrapper = styled.div`
  color: ${theme.palette.contrast[2]};
  width: 100%;
  padding: ${theme.space[2]} ${theme.space[3]};
  text-align: left;

  address {
    font-style: normal;
    line-height: ${theme.fontSizes[2]};
    margin: ${theme.space[1]};
  }

  p {
    margin: ${theme.space[1]};
  }
  
  ${mediaBreakpointUp('lg')} {
    width: 50%;
    padding: ${theme.space[4]} ${theme.space[3]};
    text-align: center;
  }
`;
