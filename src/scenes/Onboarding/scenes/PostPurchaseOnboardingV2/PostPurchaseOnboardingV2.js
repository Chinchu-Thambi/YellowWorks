/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Controller } from 'react-hook-form';
import { navigate } from 'gatsby';

import Button from '../../../../components/Button';
import Wizard from '../../../../components/Wizard/WizardV2';

import { getSteps } from '../../services/productBrief';
import BusinessContext from '../../../MyYellow/services/BusinessContext';
import useBusinessForm from '../../../MyYellowV2/scenes/products/ManageWebsite/services/useBusinessForm';
import Spinner from '../../../../components/Spinner';
import useSubscriptions from '../../../MyYellowV2/services/useSubscriptions';

const getBusinessSubsetFromSteps = R.compose(
  R.fromPairs,
  R.map(({ name, path }) => [name, path]),
  R.flatten,
  R.map(R.prop('fields')),
);
const flattenSkuList = (flatSub) => R.flatten(
  [{ value: flatSub?.product?.sku }, ...(flatSub?.productOptions?.map(({ sku }) => ({ value: sku })) || [])],
);

const PostPurchaseOnboardingV2 = (props) => {
  const {
    subscriptionId,
    step: stringStep,
    location,
  } = props;

  const businessStore = React.useContext(BusinessContext) ?? {};
  const { subscriptions } = useSubscriptions();

  const subscription = R.find(R.propEq('id', subscriptionId))(subscriptions || []);
  const skuList = subscription ? R.compose(
    R.filter(Boolean),
    R.defaultTo([]),
    flattenSkuList,
    R.pathOr([], ['orders', 'edges', 0, 'node']),
  )(subscription) : null;

  // Needs SKU not provider
  const steps = getSteps({
    skuList,
  });

  const step = parseInt(stringStep, 10);
  const currentStep = steps[step - 1];

  const businessSubset = getBusinessSubsetFromSteps(steps);

  const {
    formHook: {
      register, control, handleSubmit, errors, getValues,
    },
    ...businessForm
  } = useBusinessForm({ businessSubset });

  const currentState = getValues();

  const setStep = (nextStep) => {
    navigate(`../${nextStep}`);
  };

  const goToPrev = () => {
    setStep(step > 1 ? step - 1 : 1);
  };

  const goToNext = () => {
    if (step === steps.length) {
      navigate(`/myyellowv2/onboarding/${subscriptionId}/done`);
      return;
    }

    setStep(step + 1);
  };

  const handleFormSubmit = () => {
    const draft = step < steps.length;

    const fieldNamesInStep = currentStep?.fields.map(R.prop('name'));
    businessForm.commitFields(fieldNamesInStep, { draft });
    goToNext();
  };

  const stepGroups = steps?.map((s) => s.stepGroup);

  const currentStepIsRequired = R.any(({ required }) => required)(currentStep?.fields || []);
  const basePath = location?.pathname?.substring(0, location.pathname.lastIndexOf('/') + 1);
  if (
    !currentStep
    || !businessStore.currentBusiness
  ) return <Spinner />;

  return (
    <Wizard
      title={currentStep && currentStep.title}
      text={currentStep && currentStep.text}
      homeLink="/myyellowv2/home"
      completeSteps={step}
      totalSteps={steps.length}
      stepGroups={stepGroups}
      currentStepGroup={currentStep?.stepGroup}
      basePath={basePath}
    >
      {Object.keys((steps) || {}).length && (
        <>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col w-full md:w-3/4 space-y-4">
            {currentStep?.fields?.map((field) => {
              const { Handler, path, name } = field;
              return (
                <div>
                  <Controller
                    key={name || path}
                    name={name || path}
                    control={control}
                    ref={register({
                      required: field.required,
                      maxLength: field.maxLength && { value: field.maxLength, message: `Must contain less than ${field.maxLength} characters.` },
                      pattern: field.pattern,
                    })}
                    defaultValue={currentState[name] ?? null}
                    render={({ value, onChange, ref }) => (
                      <Handler
                        key={name || path}
                        name={name || path}
                        formData={value} // we should deprecate this, but we have both because legacy
                        value={value}
                        ref={ref}
                        placeholder={field.placeholder}
                        required={field.required}
                        onChange={onChange}
                        {...field}
                        skuList={skuList}
                        locationHistory={location}
                        navigate={navigate}
                      />
                    )}
                  />
                  {(errors.name || errors.path) && (
                    errors.name.type === 'required' && (
                      <p className="errorMsg">{name} is required.</p>
                    ),
                    errors.name.type === 'maxLength' && (
                      <p className="errorMsg">{name} must contain less than {field.maxLength} characters.</p>
                    ),
                    errors.name.type === 'minLength' && (
                      <p className="errorMsg">{name} must contain more than {field.maxLength} characters.</p>
                    ),
                    errors.name.type === 'pattern' && (
                      <p className="errorMsg">{name} is not valid.</p>
                    ))}
                </div>
              );
            })}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-2 justify-end">
              {step > 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => { goToPrev(); }}
                >Back
                </Button>
              )}
              <Button type="submit">
                {step < steps.length ? (
                  <>Next</>
                ) : (
                  <>Confirm</>
                )}
              </Button>
              {!currentStepIsRequired && step < steps.length && (
                <Button type="submit">
                  Skip
                </Button>
              )}
            </div>
          </form>
        </>
      )}
    </Wizard>
  );
};

PostPurchaseOnboardingV2.defaultProps = {
  step: '1',
  location: {},
};
PostPurchaseOnboardingV2.propTypes = {
  subscriptionId: PropTypes.string.isRequired,
  step: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default PostPurchaseOnboardingV2;
