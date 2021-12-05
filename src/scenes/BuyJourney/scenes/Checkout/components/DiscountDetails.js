import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';

import {
  Container, Form,
} from './Styled';
import Discount from '../../../../../components/Discount';
import usePurchase from '../../../../../services/usePurchase';
import Spinner from '../../../../../components/Spinner';

const DiscountDetails = ({ onChange, pricingOptions }) => {
  const { pricingLoading } = usePurchase();

  if (!pricingOptions || pricingLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <h3>Discount Code</h3>
      <Form autoComplete="off">
        <Flex
          width={[1, 'auto']}
          flexDirection="column"
        >
          <Discount onChange={onChange} pricingOptions={pricingOptions} />
        </Flex>
      </Form>
    </Container>
  );
};

DiscountDetails.defaultProps = {
  pricingOptions: {},
};

DiscountDetails.propTypes = {
  onChange: PropTypes.func.isRequired,
  pricingOptions: PropTypes.shape({
  }),
};

export default DiscountDetails;
