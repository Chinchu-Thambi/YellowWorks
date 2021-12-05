/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { v4 as uuid } from 'uuid';
import * as R from 'ramda';

import Button from '../../../../components/Button';
import Wizard from '../../../../components/Wizard';
import { segmentIdentifyAndTrack } from '../../../../util/segment';

import ProxyForm from '../../components/ProxyForm';
import { NavControlsContainer } from '../../components/Styled';

import { getSteps, getConfirmation, useFallbackSku } from '../../services/productBrief';
import AuthContext from '../../../../components/Auth/AuthContext';
import formatAddress from '../../../../services/formatAddress';
import usePurchase from '../../../../services/usePurchase';
import usePricingPlans from '../../../../services/usePricingPlans';

import { useLocalStorage } from '../../../../util';

const PrePurchaseOnboarding = (props) => {
  const {
    sku,
  } = props;
  const [step, setStep] = React.useState(1);
  const upperCaseSku = R.toUpper(useFallbackSku(sku ? R.toUpper(sku) : ''));

  const authState = React.useContext(AuthContext);
  const currentUser = R.path(['state', 'user', 'attributes'])(authState);
  const { initiatePurchase } = usePurchase();
  const { pricingPlans } = usePricingPlans({ skuList: [upperCaseSku] });

  const defaultCurrentUser = (currentUser) ? {
    email: currentUser.email,
    name: `${currentUser?.given_name} ${currentUser?.family_name}`,
  } : {};

  const [productBrief, setProductBrief] = useLocalStorage('productBrief', null);
  const formData = productBrief || { ...defaultCurrentUser };

  const [currentStepData, setCurrentStepData] = React.useState(formData);
  const formRef = React.useRef(null);

  const steps = getSteps({
    skuList: [{ value: sku?.toUpperCase() }],
  });

  const confirmationHandler = getConfirmation({
    skuList: [{ value: sku?.toUpperCase() }],
  });

  const currentStep = steps?.[step - 1];

  const goToPrev = () => {
    setStep(step > 1 ? step - 1 : 1);
  };

  const goToNext = async () => {
    if (!pricingPlans?.[upperCaseSku]) { return; }
    const capitalizeName = (name) => name?.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0)?.toUpperCase() + s.substring(1))
      .join(' ');
    const getFirstName = (name) => name?.split(' ').slice(0, -1).join(' ');
    const getLastName = (name) => name?.split(' ').slice(-1).join(' ');
    if (step === 1) {
      segmentIdentifyAndTrack({
        event: `${sku} Onboarding Begun`,
        id: formData?.id,
        payload: {
          email: currentStepData?.email,
          firstname: getFirstName(capitalizeName(currentStepData?.fullName)),
          lastname: getLastName(capitalizeName(currentStepData?.fullName)),
        },
      });
      initiatePurchase({
        product: {
          sku: upperCaseSku,
          pricingPlan: pricingPlans?.[upperCaseSku]?.[0],
        },
      });
    } else {
      segmentIdentifyAndTrack({
        event: `${sku} Step ${step + 1} Reached`,
        id: formData?.id || uuid(),
        payload: {
          email: formData?.email || '',
          firstname: getFirstName(capitalizeName(formData?.fullName)),
          lastname: getLastName(capitalizeName(formData?.fullName)),
          ynz_sem_step: (step + 1),
          ynz_sem_budget: formData?.budget,
          ynz_sem_category: formData?.categories?.map((category) => category.name).join(', '),
          ynz_sem_regions: formData?.targetLocation?.regions?.map((region) => region.label).join(', '),
          ynz_sem_radius: formData?.targetLocation?.radius ? `${formData?.targetLocation.radius}km` : undefined,
          ynz_sem_target_location_type: formData?.targetLocation?.targetLocationType,
          address: formData?.location?.location?.address ? formatAddress(formData?.location?.location?.address) : undefined,
        },
      });
    }
    if (step === steps.length) {
      setProductBrief({
        ...productBrief,
        ...formData,
        ...currentStepData,
      });
      if (confirmationHandler) {
        navigate(`/our-products/product-brief/${sku}/confirm`);
      } else {
        // TODO: Add usePurchase here after simplify complete and merged
        navigate('/checkout');
      }
    } else {
      setStep(step + 1);
    }
  };

  const saveStepData = () => {
    // we need to treat this individually for area served because
    // the keys may differ and not be overwritten on R.mergeDeepRight.
    if (currentStepData?.['location.areaServed']) {
      delete formData?.location?.areaServed;
    }
    setProductBrief({
      ...productBrief,
      ...formData,
      ...currentStepData,
    });
  };

  const handlePrev = () => {
    saveStepData();
    if (step > 1) {
      goToPrev();
    } else {
      navigate('/our-products/');
    }
  };

  const handleNext = () => {
    saveStepData();

    let { formElement } = formRef.current;

    if (!formElement) {
      formElement = formRef.current;
    }

    // if form is valid
    if (formElement.reportValidity()) {
      goToNext();
    }
  };

  const handleChange = (path) => (value) => {
    if (path === undefined) {
      /// In cases where full formData is supplied to a step.
      setCurrentStepData({
        ...currentStepData,
        ...value,
      });
      return;
    }
    setCurrentStepData(R.assocPath(path, value, currentStepData));
  };

  return (
    <Wizard
      title={currentStep?.title}
      text={currentStep?.text}
      homeLink="/our-products"
      completeSteps={step}
      totalSteps={steps.length + 1}
    >
      {Object.keys((steps) || {}).length && (
        <>
          <ProxyForm
            ref={formRef}
            currentStep={currentStep}
            formData={currentStepData}
            onChange={handleChange}
          />
          <NavControlsContainer>
            <Button type="button" variant="secondary" onClick={handlePrev}>Back</Button>
            <Button type="button" onClick={handleNext}>{step === steps.length ? 'Proceed to Payment' : 'Next'}</Button>
          </NavControlsContainer>
        </>
      )}
    </Wizard>
  );
};

PrePurchaseOnboarding.propTypes = {
  sku: PropTypes.string.isRequired,
};

export default PrePurchaseOnboarding;
