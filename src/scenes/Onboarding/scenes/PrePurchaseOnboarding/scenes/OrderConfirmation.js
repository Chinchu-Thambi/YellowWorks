import React from 'react';
import { Flex } from 'rebass/styled-components';
import Button from '../../../../../components/Button';

import Header from '../../../../../components/Header';
import Footer from '../../../../../components/Footer';
import { Container } from '../../../../../components/Grid';

import {
  ExtendedContainer, ConfirmContainer, Separator, NextStepContainer, ContactContainer, ContactSeparator,
  Phone, Email,
} from '../../../Onboarding.styled';
import AuthContext from '../../../../../components/Auth';

const OrderConfirmation = () => {
  const { showHideModal, jwtToken } = React.useContext(AuthContext);
  return (
    <>
      <Header />
      <Container ExtendedContainer={ExtendedContainer}>
        <h1>Thank you!</h1>
        <Flex flexWrap="wrap">
          <ConfirmContainer>
            <h2>YOUR REQUEST HAS BEEN RECEIVED</h2>
            <Separator />
            <NextStepContainer>
              <h2>What next?</h2>
              <p>One of our Yellow team members will be in touch at the time you chose to discuss Google Search Ads for your business.</p>
              {(!jwtToken)
                ? (
                  <>
                    <p>In the meantime, sign up for a Yellow account to get you started</p>
                    <Button
                      size="md"
                      type="button"
                      onClick={() => {
                        showHideModal({
                          show: true,
                          modalType: 'register',
                          target: '/our-products/yellow-profile/',
                          params: {
                            message: 'Account successfully activated.',
                          },
                        });
                      }}
                    >SIGN UP
                    </Button>
                  </>
                ) : (
                  <>
                    <p>In the meantime, see what other products we offer.</p>
                    <Button
                      size="md"
                      type="button"
                      to="/our-products"
                    >OUR PRODUCTS
                    </Button>
                  </>
                )}
            </NextStepContainer>
            <ContactContainer>
              <div>
                <h2>How to reach us</h2>
                <p>If you need to get in contact now, here’s how</p>
              </div>
              <ContactSeparator />
              <div>
                <Phone href="tel:0800736870">0800 736 870</Phone>
                <Email href="email:care@yellow.co.nz">care@yellow.co.nz</Email>
              </div>
            </ContactContainer>
          </ConfirmContainer>
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
