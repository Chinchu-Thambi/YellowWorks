import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { Box } from 'rebass/styled-components';
import slugify from 'slugify';

import { parseMd } from '../../../../util';
import ForScreen from '../../../../services/layout/ForScreen';

import Button from '../../../Button';
import Modal from '../../../Modal';


import SearchAdsBudgetDemoDesktop from './resources/searchAdsBudgetDemoDesktop.mp4';
import SearchAdsBudgetDemoMobile from './resources/searchAdsBudgetDemoMobile.mp4';

import {
  Content, Container,
} from '../../ContenfulModules.styled';

const ProductSearchAdsTemplate = (props) => {
  const {
    reference,
    title,
    text,
  } = props;

  const [isVisible, setIsVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState();
  const [modalTitle, setModalTitle] = React.useState();
  const navigateToOnboarding = () => {
    navigate('/our-products/product-brief/searchads');
  };

  const renderModalContent = ({ heading, component }) => {
    setModalTitle(heading);
    setModalContent(component);

    // Display modal
    setIsVisible(true);
  };

  return (
    <>
      <Container id={slugify(reference, { lower: true })}>
        <Content>
          {title && (
            <h2>{parseMd(title)}</h2>
          )}
          <p>{parseMd(text)}</p>
          <Button
            variant="link"
            aria-label="Click here to learn more about your budget"
            onClick={() => renderModalContent({
              heading: 'What’s included in my budget?',
              component: () => (
                <div>
                  <p>Our campaigns start from $100/month. Included in that $100 is the Google Ads budget we use to pay for clicks on your ads.</p>
                  <p>Also included is the performance fee for building, managing & reporting on your campaign and making sure that precious Google Ads budget performs at an optimum level.</p>
                </div>
              ),
            })}
          >Learn More
          </Button>
          <ForScreen from="xs" to="lg">
            <Box as="div" overflow="hidden">
              <video autoPlay loop muted outline="none" width="100%">
                <source src={SearchAdsBudgetDemoMobile} type="video/mp4" />
                Your browser could not play the video we had here.
              </video>
            </Box>
          </ForScreen>
          <ForScreen from="lg">
            <video autoPlay loop muted>
              <source src={SearchAdsBudgetDemoDesktop} type="video/mp4" />
              Your browser could not play the video we had here.
            </video>
          </ForScreen>
          <Button
            onClick={navigateToOnboarding}
          >
            Get Started
          </Button>
        </Content>
      </Container>
      <Modal
        title={modalTitle}
        isVisible={isVisible}
        onDismiss={setIsVisible}
      >
        {modalContent}
      </Modal>
    </>
  );
};

ProductSearchAdsTemplate.defaultProps = {
  reference: '',
  title: '',
  text: '',
};

ProductSearchAdsTemplate.propTypes = {
  reference: PropTypes.string,
  title: PropTypes.shape({
    title: PropTypes.string,
  }),
  text: PropTypes.shape({
    text: PropTypes.string,
  }),
};

export default ProductSearchAdsTemplate;
