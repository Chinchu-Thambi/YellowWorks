/* eslint-disable no-unused-expressions */
import React from 'react';
import * as R from 'ramda';
import { Flex, Box } from 'rebass/styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

import Spinner from '../../../../../../components/Spinner';
import Modal from '../../../../../../components/Modal';
import Slider from '../../../../components/CustomWidgets/Slider';
import Header from '../../../../../../components/Header';
import Footer from '../../../../../../components/Footer';
import { Container } from '../../../../../../components/Grid';
import Button from '../../../../../../components/Button';

import { useLocalStorage } from '../../../../../../util';
import formatAddress from '../../../../../../services/formatAddress';

import GoogleAdwords from '../../components/modals/GoogleAdwords';
import BookCallback from '../../components/modals/BookCallback';

import {
  ExtendedContainer, Summary, SuggestionSlider, CallbackContainer,
} from '../../../../Onboarding.styled';

import { EstimatedPerformance } from '../../../../components/CustomWidgets';

import getAdwordsRegion from '../../services/getAdwordsRegion';
import PricingSelector from '../../components/PricingSelector';
import AuthContext from '../../../../../../components/Auth';

const OrderConfirmation = ({ subscriptionId }) => {
  const { isStaff } = React.useContext(AuthContext) || {};
  const [recommendation, setRecommendation] = React.useState({});
  const [productBrief, setProductBrief] = useLocalStorage('productBrief', null);
  const formData = productBrief || null;
  const availableBudgets = recommendation?.quote?.budgets || [];
  const startBudget = availableBudgets.find((b) => b.cost === recommendation?.quote?.startBudget);
  const [budget, setBudget] = React.useState(startBudget);
  const [isVisible, setIsVisible] = React.useState(false);
  const address = R.path(['location', 'address'])(formData);
  const [modalContent, setModalContent] = React.useState();
  const [modalTitle, setModalTitle] = React.useState();
  const maxReached = !isStaff && R.any((b) => b.cost >= 1000)(availableBudgets);
  const marks = availableBudgets.reduce((bs, b) => ({ ...bs, [b.cost]: <>|<strong>${b.cost}</strong></> }), {});

  const apiKey = process.env.GATSBY_PLATFORM_API_KEY || null;

  const moneyFormatter = (c) => {
    if (availableBudgets[availableBudgets.length - 1]?.cost === c) {
      return `$${c}+`;
    }
    return `$${c}`;
  };

  // load recommendation
  React.useEffect(() => {
    const categories = [];
    const locations = [];
    formData?.categories?.forEach((category) => categories.push(category.name));
    formData?.targetLocation?.regions?.forEach((region) => locations.push(region?.name));
    if (locations.length < 1) {
      const adwordsRegion = getAdwordsRegion(address?.administrativeArea);
      locations.push(adwordsRegion);
    }
    const toStringArray = (array) => (array.length === 1 ? `"${array[0]}"` : `[${array.map((object) => `"${object}"`).join(', ')}]`);
    if (R.isEmpty(recommendation)) {
      const getRecommendation = async () => {
        const query = `
        query GetRecommendation {
          getAdwordsRecommendations(categories: ${toStringArray(categories)}) {
            baseAdwordsRecommendation {
              cpi
              cpc
              cpl
              categories
              cost
            }
            quote(locations: ${toStringArray(locations)}) {
              categories
              locations
              startBudget
              budgets {
                cost
                impressions
                clicks
                leads
              }
            }
          }
        }`;

        const response = await axios.post(
          process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
          { query },
          { headers: { 'x-api-key': apiKey } },
        );
        const recommendationResponse = response.data.data.getAdwordsRecommendations;
        setRecommendation(recommendationResponse);
        setBudget(recommendationResponse.quote?.budgets.find((b) => b.cost === recommendationResponse.quote?.startBudget));
      };

      getRecommendation();
    }
  }, [formData, apiKey, recommendation, address]);

  const handleBudgetSelect = (value) => {
    const newBudget = availableBudgets.find((b) => b.cost === value);
    setBudget(newBudget);
    setProductBrief({
      ...formData,
      budget: newBudget,
    });
  };

  const renderModalContent = ({ title, component }) => {
    setModalTitle(title);
    setModalContent(component);

    setIsVisible(true);
  };

  return (
    <>
      <Header />
      <Container ExtendedContainer={ExtendedContainer}>
        <Box fontSize={[2, null, null, 4]} textAlign="center">
          <h1>Here is your recommended Google Search Ads budget</h1>
        </Box>
        <SuggestionSlider>
          <div>
            <h3>Adjust your monthly package</h3>
            <p>Recommended monthly cost contains a monthly
              <Button
                onClick={() => renderModalContent({
                  title: 'What’s included in my budget?',
                  component: () => (
                    <GoogleAdwords />
                  ),
                })}
                variant="link"
                size="sm"
              >
                Google Budget
              </Button>
              plus our performance & management fee
            </p>
            {(availableBudgets.length > 0 && startBudget) ? (
              <Box mt={[7, null, null, 0]}>
                <Slider
                  min={availableBudgets[0]?.cost}
                  max={availableBudgets[availableBudgets.length - 1]?.cost}
                  defaultValue={startBudget.cost}
                  tipFormatter={(value) => moneyFormatter(value)}
                  step={null}
                  marks={marks}
                  onChange={handleBudgetSelect}
                />
              </Box>
            ) : <Spinner size={20} />}
          </div>
          <EstimatedPerformance views={budget?.impressions} leads={budget?.leads} clicks={budget?.clicks} />
        </SuggestionSlider>
        <PricingSelector
          selectedPrice={budget?.cost}
          maxReached={maxReached}
          isStaff={isStaff}
          subscriptionId={subscriptionId}
          availableBudgets={availableBudgets}
        />
      </Container>
      <CallbackContainer>
        <Container ExtendedContainer={ExtendedContainer}>
          <Box paddingY={[4, null, null, 0]} marginX={[2, null, null, 0]}>
            <h2>Book a callback</h2>
            <Summary>
              <Flex mg={2} justifyContent="space-between" alignItems="start" flexDirection={['column ', null, null, 'row']}>
                <div>
                  <p>If you want a more detailed Google Search Ads campaign strategy, or to increase your monthly spend please get in touch with one of our specialised Google Search Ads Strategists.</p>
                  <p>My Business Category is <strong>{formData?.categories?.map((category) => category.name).join(', ')}</strong></p>
                  <p>It is located at <strong>{formatAddress(address)}</strong></p>
                  {(formData?.targetLocation?.targetLocationType === 'proximity')
                    && (<p>I would like to reach customers<strong> {formData?.targetLocation?.radius} km from my business</strong></p>)}
                  {(formData?.targetLocation?.targetLocationType === 'regions')
                    && <p>I would like to reach customers in<strong> {formData?.targetLocation?.regions.map((region) => region.name).join(', ')}</strong></p>}
                  <p>and I would like to direct them to my <strong>{formData?.targetLandingPage?.type}</strong> - <strong>{formData?.targetLandingPage?.url}</strong></p>
                </div>
                <Flex mg={2} justifyContent="space-between" alignItems="start" flexDirection={['column', null, null, 'row']}>
                  <Button
                    type="button"
                    onClick={() => {
                      renderModalContent({
                        title: 'What’s the best time to get in touch?',
                        component: () => (
                          <BookCallback startBudget={startBudget} budget={budget} subscriptionId={subscriptionId} />
                        ),
                      });
                    }}
                  >
                    Book Callback
                  </Button>
                </Flex>
              </Flex>
            </Summary>
          </Box>
        </Container>
      </CallbackContainer>
      <Footer />
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

OrderConfirmation.propTypes = {
  subscriptionId: PropTypes.string.isRequired,
};

export default OrderConfirmation;
