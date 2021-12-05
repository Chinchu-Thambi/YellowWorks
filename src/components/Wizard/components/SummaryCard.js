import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text } from 'rebass/styled-components';
import styled from 'styled-components';
import { theme } from '../../../util';
import check from '../../../assets/icons/black-checkmark.svg';

const FlexFeatures = styled.div`
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

const SummaryCard = ({
  name,
  featureText,
  shortText,
}) => (
  <div className="bg-contrast-200 border-contrast-600 shadow-md rounded-md">
    <Flex flexDirection="column" alignItems="center" marginTop={3}>
      <Text as="h2" textAlign="center" className="text-contrast-600 font-bold uppercase" pb={3}>{name}</Text>
      {shortText}
    </Flex>
    <FlexFeatures>
      <Text as="h3" textAlign="center" className="text-contrast-600 font-bold uppercase">Features</Text>
      {featureText}
    </FlexFeatures>
  </div>
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

SummaryCard.defaultProps = {
  name: '',
  featureText: '',
  shortText: '',
  product: {},
};

SummaryCard.propTypes = {
  name: PropTypes.string,
  shortText: PropTypes.string,
  featureText: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  product: productType,
};

export default SummaryCard;
