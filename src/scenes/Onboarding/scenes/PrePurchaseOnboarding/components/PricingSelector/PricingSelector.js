import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text } from 'rebass/styled-components';
import { navigate } from 'gatsby';
import * as R from 'ramda';

import PriceDropdown from './components/PriceDropdown';

import Button from '../../../../../../components/Button';

import { Total } from '../../../../Onboarding.styled';
import { useLocalStorage } from '../../../../../../util';
import usePurchase from '../../../../../../services/usePurchase';
import useModule from '../../../../../../services/useModule';

const PricingSelector = ({
  selectedPrice, maxReached, isStaff, availableBudgets,
}) => {
  const { initiatePurchase, isSubmitting, purchase } = usePurchase();
  const [searchAdsFormData, setSearchAdsFormData] = useLocalStorage('productBrief', null);
  const formData = searchAdsFormData || null;
  const [chosenPrice, setChosenPrice] = React.useState(selectedPrice * 100);
  const { default: pricingData } = useModule('@yellownz/pricing-data') || {};
  const pricingPlans = pricingData?.map((n) => n.node);

  const handleChangePrice = (value) => {
    const newBudget = availableBudgets.find((b) => b.cost === value) || { cost: value };
    setChosenPrice(value);
    setSearchAdsFormData({
      ...formData,
      budget: newBudget,
    });
  };

  React.useEffect(() => {
    setChosenPrice(selectedPrice * 100);
  }, [selectedPrice]);

  const priceOptions = pricingPlans?.map(({ amount, id }) => ({ label: `$${amount / 100}`, value: amount, id })).sort((a, b) => a.value - b.value);
  const filteredPriceOptions = isStaff ? priceOptions : priceOptions?.filter(({ value }) => !isStaff && value <= 100000);

  const submitPurchase = async () => {
    const newBudget = R.find(R.propEq('cost', chosenPrice))(availableBudgets) || chosenPrice;
    const filteredCategories = formData?.categories?.map((category) => ({ name: category.name }));
    const pricingPlan = R.find(R.propEq('amount', chosenPrice))(pricingPlans) || pricingPlans?.[0];

    setSearchAdsFormData({
      ...formData,
      filteredCategories,
      budget: newBudget,
    });
    initiatePurchase({
      product: {
        sku: purchase?.product?.sku,
        requiresPayment: purchase?.product?.requiresPayment,
        pricingPlan,
      },
    });
    navigate('/checkout');
  };

  return (
    <Flex marginY={4} justifyContent="flex-end" flexDirection="column">
      {maxReached ? (
        <Total><p>${chosenPrice / 100}.00</p><small>+ GST 15%</small></Total>
      ) : (
        <Flex justifyContent="flex-end" minWidth={150} marginBottom={2}>
          <PriceDropdown
            chosenPrice={chosenPrice}
            filteredPriceOptions={filteredPriceOptions}
            handleChangePrice={handleChangePrice}
          />
          <Total>
            <small>+ GST 15%</small>
          </Total>
        </Flex>
      )}
      {chosenPrice / 100 <= 500 && (
        <Flex justifyContent="flex-end" mb={2}>
          <Text as="small">Click on &apos;Continue&apos; to enter GET50 as your <a href="https://yellow.co.nz/terms/promotional/" target="_blank" rel="noreferrer">Discount Code*</a></Text>
        </Flex>
      )}
      <Flex justifyContent="flex-end">
        <Button
          tabIndex="0"
          size="md"
          disabled={isSubmitting || !chosenPrice}
          onClick={submitPurchase}
        >
          Continue
        </Button>
      </Flex>
    </Flex>
  );
};

PricingSelector.defaultProps = {
  selectedPrice: 0,
  maxReached: true,
  isStaff: true,
  availableBudgets: [],
};

PricingSelector.propTypes = {
  selectedPrice: PropTypes.number,
  maxReached: PropTypes.bool,
  isStaff: PropTypes.bool,
  availableBudgets: PropTypes.arrayOf(
    PropTypes.shape({
      cost: PropTypes.number,
      impressions: PropTypes.number,
      clicks: PropTypes.number,
      leads: PropTypes.number,
    }),
  ),
};

export default PricingSelector;
