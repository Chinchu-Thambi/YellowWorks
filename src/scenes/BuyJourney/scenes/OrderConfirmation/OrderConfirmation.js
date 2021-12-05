import { path } from 'ramda';
import React from 'react';
import { Flex, Box } from 'rebass/styled-components';
import * as R from 'ramda';

import AuthContext from '../../../../components/Auth/AuthContext';
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Footer from '../../../../components/Footer';
import { Container } from '../../../../components/Grid';

import useProductSchemaFufillment from '../../../../services/useProductSchemaFufillment';

import {
  ExtendedContainer, ConfirmContainer, Separator, NextStepContainer, ContactContainer, ContactSeparator, Phone, Email,
} from './Styled';
import Spinner from '../../../../components/Spinner';

const OrderConfirmation = (props) => {
  const {
    customerId, refreshUser, payload, isStaff,
  } = React.useContext(AuthContext) || {};

  const successfulOrder = R.path(['location', 'state', 'subscription'])(props);
  const { submitted } = useProductSchemaFufillment(successfulOrder);
  const orderDate = new Date().toLocaleDateString('en-nz');
  const orderId = successfulOrder?.orderDetails?.customerOrderId;
  const includesYol = successfulOrder?.orderDetails?.product?.sku.includes('YP');

  // Refresh user in case no customerId is found
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!customerId) {
        refreshUser();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [customerId, refreshUser]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (isStaff) {
        refreshUser();
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [isStaff, refreshUser]);
  return (
    <>
      <Header />
      <Container ExtendedContainer={ExtendedContainer}>
        {submitted && successfulOrder ? (
          <>
            <h1>Thank you!</h1>
            <ConfirmContainer>
              {customerId && (
              <>
                <h2>Your order has been placed</h2>
                <Separator />
                <Flex flexDirection={['column', 'row']} justifyContent="center">
                  {orderId && (
                  <div>
                    <h3>Order Id</h3>
                    <p>{orderId}</p>
                  </div>
                  )}
                  <Box mx={[0, 2]}>
                    <h3>Date</h3>
                    <p>{orderDate}</p>
                  </Box>
                  <div>
                    <h3>
                      {successfulOrder?.id
                        ? 'Confirmation sent to'
                        : 'Confirmation will be sent to'}
                    </h3>
                    <p>{path(['email'])(payload)}</p>
                  </div>
                </Flex>
                <NextStepContainer>
                  <h2>What do I do next?</h2>
                  <p />
                  {orderId && includesYol && (
                  <>
                    <p>We have a few more questions before your product can go live</p>
                  </>
                  )}
                  <Box mb={2} as={Button} to="/my-yellow/my-products">
                    Set up your products
                  </Box>
                </NextStepContainer>
              </>
              )}
              <ContactContainer>
                <div>
                  <h2>How to reach us</h2>
                  <p>If you need to get in contact now, here’s how</p>
                </div>
                <Box display={['none', 'block']}>
                  <ContactSeparator />
                </Box>
                <div>
                  <Phone href="tel:0800736870">0800 736 870</Phone>
                  <Email href="email:care@yellow.co.nz">care@yellow.co.nz</Email>
                </div>
              </ContactContainer>
            </ConfirmContainer>
          </>
        ) : (
          <Spinner />
        )}
      </Container>
      <Footer hideCategories />
    </>
  );
};

export default OrderConfirmation;
