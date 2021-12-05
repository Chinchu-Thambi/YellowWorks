/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import Button from '../../../../../components/Button';

import completeImage from '../assets/images/confirmationImage.png';

import Wizard from '../../../../../components/Wizard/WizardV2';
import useSubscriptions from '../../../../MyYellowV2/services/useSubscriptions';
import { getSteps } from '../../../services/productBrief';

const flattenSkuList = (flatSub) => R.flatten(
  [{ value: flatSub?.product?.sku }, ...(flatSub?.productOptions?.map(({ sku }) => ({ value: sku })) || [])],
);

const DoneV2 = ({
  hasUnfinishedBriefs,
  subscriptionId,
}) => {
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

  const step = parseInt(steps?.length, 10);
  const currentStep = steps[step - 1];

  const stepGroups = steps?.map((s) => s.stepGroup);

  const family = R.toLower(subscription?.provider || 'WEBSITE');
  return (
    <Wizard
      title="Thank you"
      text="We are getting your product ready and will notify you when it’s live."
      homeLink="/myyellowv2/home"
      completeSteps={step}
      stepGroups={stepGroups}
      currentStepGroup={currentStep?.stepGroup}
      disabled
    >
      <div className="flex flex-col space-y-4 overflow-hidden w-full md:w-3/4">
        <div className="flex flex-row space-x-2">
          <h2>You are all done!</h2>
        </div>
        <p className="leading-relaxed">
          You can edit your info right away, but changes won’t update until your {family} is published.<br />
          In the meantime, explore your Dashboard and Management Portal, where you can see a live preview of your website.
        </p>
        <div>
          <Button
            variant={hasUnfinishedBriefs ? 'secondary' : undefined}
            to="/myyellowv2/my-products/website"
          >
            Go to your management portal
          </Button>
        </div>
        <img src={completeImage} alt="People working" className="pt-4 w-full rounded-lg m-auto" />
      </div>
    </Wizard>
  );
};

DoneV2.defaultProps = {
  hasUnfinishedBriefs: false,
};
DoneV2.propTypes = {
  hasUnfinishedBriefs: PropTypes.bool,
  subscriptionId: PropTypes.string.isRequired,
};

export default DoneV2;
