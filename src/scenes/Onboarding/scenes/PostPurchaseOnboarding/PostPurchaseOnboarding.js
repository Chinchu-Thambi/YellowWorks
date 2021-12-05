import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as R from 'ramda';

import AuthContext from '../../../../components/Auth/AuthContext';
import Button from '../../../../components/Button';
import Wizard from '../../../../components/Wizard';

import { NavControlsContainer } from '../../components/Styled';

import { getSteps } from '../../services/productBrief';
import { useLocalStorage } from '../../../../util';

import ProxyForm from '../../components/ProxyForm';

const syncToServer = async ({
  serverFormData,
  formData,
  jwtToken,
  subscriptionId,
  customerId,
}) => {
  if (!R.equals(serverFormData, formData) && formData) {
    const query = `
      mutation submitSchema(
        $subscriptionId: ID!
        $customerId: ID!
        $input: AWSJSON!
        $publish: Boolean!
      ) {
        submitProductBrief(
          subscriptionId: $subscriptionId
          customerId: $customerId
          input: $input
          publish: $publish
        )
      }
    `;

    const variables = {
      subscriptionId,
      customerId,
      input: JSON.stringify(formData),
      publish: false,
    };

    return axios.post(
      process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
      { query, variables },
      { headers: { Authorization: jwtToken } },
    );
  }

  return null;
};

const PostPurchaseOnboarding = (props) => {
  const {
    subscriptionId,
    step: stringStep,
    navigate,
  } = props;

  const step = parseInt(stringStep, 10);

  // load auth utilities
  const {
    jwtToken, customerId, displayLoginModal, state: authState, refreshUser,
  } = React.useContext(AuthContext) || {};

  // formRef so that we can trigger the form validation function from DOM
  const formRef = React.useRef(null);

  // local state for schema loaded from the server
  const [schema, setLocalSchema] = React.useState(null);

  const steps = getSteps({
    skuList: schema?.metadata?.sku,
  });

  // stepSchema allow us rendering only the subset of the schema that belongs to the current step
  const currentStep = steps[step - 1];
  const stepSchema = schema?.properties;

  // local formData control so that we can capture the formData without
  // triggering re-renders or too many updates to the backend.
  const [serverFormData, setServerFormData] = React.useState(null);
  // TODO: use same localStorage structure as ProductContext or ProductContext itself.
  const [formData, setFormData] = useLocalStorage(`formData-${subscriptionId}`, null);
  const [currentStepData, setCurrentStepData] = React.useState(formData);
  const [isSyncAllowed, setIsSyncAllowed] = React.useState(false);

  const setStep = (nextStep) => {
    if (typeof navigate === 'function') {
      navigate(`../${nextStep}`);
    }
  };

  const goToPrev = () => {
    setStep(step > 1 ? step - 1 : 1);
  };

  const goToNext = async () => {
    let { formElement } = formRef.current;

    if (!formElement) {
      formElement = formRef.current;
    }

    if (!formElement.reportValidity()) {
      return;
    }

    if (step === steps.length) {
      await syncToServer({
        formData: { // saves step data to local form data
          ...formData,
          ...currentStepData,
        },
        jwtToken,
        subscriptionId,
        customerId,
      });

      navigate(`/my-yellow/onboarding/${subscriptionId}/confirm`);
    } else {
      setStep(step + 1);
    }
  };

  const saveStepData = () => {
    setIsSyncAllowed(true);

    // we need to treat this individually for area served because
    // the keys may differ and not be overwritten on R.mergeDeepRight.
    if (currentStepData?.['location.areaServed']) {
      delete formData?.location?.areaServed;
    }

    setFormData( // saves step data to local form data
      { ...formData, ...currentStepData },
    );
  };

  const handlePrev = () => {
    saveStepData();
    goToPrev();
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
    setCurrentStepData(R.assocPath(path, value, currentStepData));
  };

  // Refresh user in case no customerId is found
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!customerId) {
        refreshUser();
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [customerId, refreshUser]);

  // load schema and formData
  React.useEffect(() => {
    const loadSubscription = async () => {
      const query = `
        query getOnboardingData($subscriptionId: ID!, $customerId: ID!) {
          getSubscriptionById(
            subscriptionId: $subscriptionId
            customerId: $customerId
          ) {
            id
            orderDetails {
              userSchema
            }
            productDetails {
              userConfiguration
            }
          }
        }
      `;

      const variables = {
        subscriptionId,
        customerId,
      };

      setLocalSchema();
      setServerFormData();

      const response = await axios.post(
        process.env.GATSBY_PRODUCT_PLATFORM_ENDPOINT,
        { query, variables },
        { headers: { Authorization: jwtToken } },
      );

      const userSchema = R.compose(
        R.tryCatch(JSON.parse, () => ({})),
        R.path(['data', 'data', 'getSubscriptionById', 'orderDetails', 'userSchema']),
      )(response);

      const userConfiguration = R.compose(
        R.tryCatch(JSON.parse, () => ({})),
        R.path(['data', 'data', 'getSubscriptionById', 'productDetails', 'userConfiguration']),
      )(response);

      setLocalSchema(userSchema);
      setServerFormData(userConfiguration);

      if (!formData) {
        setFormData(userConfiguration);
        if (!currentStepData) {
          setCurrentStepData(userConfiguration);
        }
      }
    };

    if (jwtToken && customerId) {
      if (schema === null && serverFormData === null) {
        loadSubscription();
      }
    } else if (!authState?.modal.showAuthModal) {
      if (typeof displayLoginModal === 'function') {
        displayLoginModal();
      }
    }
  }, [authState, customerId, displayLoginModal, serverFormData, jwtToken, schema, formData, setFormData, subscriptionId, currentStepData]);

  // sync to server effect
  React.useEffect(() => {
    if (
      isSyncAllowed
      && formData !== serverFormData
    ) {
      syncToServer({
        formData,
        jwtToken,
        subscriptionId,
        customerId,
      });
    }
  }, [customerId, formData, isSyncAllowed, jwtToken, serverFormData, subscriptionId]);

  // prevent form submission by pressing enter
  React.useEffect(() => {
    if (!formRef.current) return () => { };

    let { formElement } = formRef.current;

    if (!formElement) {
      formElement = formRef.current;
    }

    const keyDownHandler = (e) => {
      if (
        e.key === 'Enter'
        && e.target.nodeName !== 'TEXTAREA'
        && e.target.type !== 'radio'
        && e.target.type !== 'checkbox'
        && e.target.type !== 'button'
        && (
          e.target.id !== undefined
          && !e.target.id.includes('react-select')
        )
      ) {
        e.preventDefault();
        goToNext();
      }
    };

    formElement.addEventListener('keydown', keyDownHandler);

    return () => formElement.removeEventListener('keydown', keyDownHandler);
  });

  if (!jwtToken || !formData) return null;
  return (
    <Wizard
      title={currentStep && currentStep.title}
      text={currentStep && currentStep.text}
      homeLink="/my-yellow/my-products"
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
            schema={stepSchema}
          />
          <NavControlsContainer>
            {step > 1 && (
              <Button
                type="button"
                variant="secondary"
                onClick={handlePrev}
              >Back
              </Button>
            )}

            <Button
              type="button"
              onClick={handleNext}
            >Next
            </Button>
          </NavControlsContainer>
        </>
      )}
    </Wizard>
  );
};

PostPurchaseOnboarding.defaultProps = {
  step: '1',
};
PostPurchaseOnboarding.propTypes = {
  subscriptionId: PropTypes.string.isRequired,
  step: PropTypes.string,
  navigate: PropTypes.func.isRequired,
};

export default PostPurchaseOnboarding;
