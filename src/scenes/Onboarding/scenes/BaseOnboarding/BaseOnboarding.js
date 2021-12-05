import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as R from 'ramda';
import { v4 as uuid } from 'uuid';

import AuthContext from '../../../../components/Auth/AuthContext';
import Button from '../../../../components/Button';
import Wizard from '../../../../components/Wizard';

import { NavControlsContainer } from '../../components/Styled';

import { getSteps } from '../../services/productBrief';
import { useLocalStorage } from '../../../../util';

import ProxyForm from '../../components/ProxyForm';

const createNestedObject = ({ formData }) => {
  if (!formData) {
    return {};
  }

  const nestedObject = {};

  // reads each entry in formData
  Object.entries(formData).forEach(([path, value]) => {
    // I'm using a reducer to access acc as a lens to create and focus each step of
    // the path in the nestedObject
    path.split('.').reduce((acc, step, index, splitPath) => {
      // if the current step doesn't exist, create it as an empty object
      if (acc[step] === undefined) {
        acc[step] = {};
      }

      // if it is the last step in the chain, assign the entry value to it
      if (index + 1 === splitPath.length) {
        acc[step] = value;
      }

      // return the current step as the reference for the next step in the acc variable.
      return acc[step];
    }, nestedObject);
  });

  return nestedObject;
};

const syncToServer = async ({
  serverFormData,
  formData,
  jwtToken,
  subscriptionId,
  customerId,
}) => {
  if (!R.equals(serverFormData, formData) && formData) {
    const query = `
      mutation updateConfiguration(
        $subscriptionId: ID!
        $customerId: ID!
        $input: AWSJSON!
        $publish: Boolean!
      ) {
        updateConfiguration(
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

const BaseOnboarding = (props) => {
  // load path parameters
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

  // local formData control so that we can capture the formData without
  // triggering re-renders or too many updates to the backend.
  const [serverFormData, setServerFormData] = React.useState(null);
  // TODO: use same localStorage structure as ProductContext or ProductContext itself.
  const [formData, setFormData] = useLocalStorage(`formData-${subscriptionId}`, null);
  let currentStepData = formData;

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
      R.mergeDeepRight(
        formData,
        createNestedObject({ formData: currentStepData }),
      ),
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

  const handleChange = ({ formData: tempData }) => {
    currentStepData = tempData;
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
  }, [
    authState,
    customerId,
    displayLoginModal,
    serverFormData,
    jwtToken,
    schema,
    formData,
    setFormData,
    subscriptionId,
  ]);

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
    if (!formRef.current) return () => {};

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

  if (!jwtToken) return null;

  return (
    <Wizard
      title={currentStep?.title}
      text={currentStep?.text}
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
            <Button type="button" onClick={handleNext}>Next</Button>
          </NavControlsContainer>
        </>
      )}
    </Wizard>
  );
};

BaseOnboarding.defaultProps = {
  step: '1',
  subscriptionId: uuid(),
};
BaseOnboarding.propTypes = {
  subscriptionId: PropTypes.string,
  step: PropTypes.string,
  navigate: PropTypes.func.isRequired,
};

export default BaseOnboarding;
