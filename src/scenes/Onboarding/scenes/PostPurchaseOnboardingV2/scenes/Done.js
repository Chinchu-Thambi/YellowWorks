/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import styled from 'styled-components';
import Button from '../../../../../components/Button';
import theme from '../../../../../util/theme';

import Template from '../../../../../components/Wizard';

import tick from '../../../../../assets/icons/onboarding-tick.svg';

const Confirmation = styled(Flex)`
  img {
    margin-right: ${theme.space[4]};
  }

  h2 {
    font-weight: ${theme.fontWeight[1]};
  }
`;

const Done = ({
  hasUnfinishedBriefs,
  subscriptionId,
}) => (
  <Template
    title="Thank you"
  >
    <div>
      <Confirmation>
        <img src={tick} alt="Confirmation Tick" />
        <h2>You are all done!</h2>
      </Confirmation>
      <p>
        We are getting your profile ready and will notify you when it’s live.<br />
        You can edit your info right away, but changes won’t update until your profile is published.
      </p>
      {hasUnfinishedBriefs && (
      <>
        <h2>You have unfinished briefs</h2>
        <p>
          Looks like you have more products awaiting information so we can set them live,
          complete these briefs now.
        </p>
      </>
      )}
    </div>
    <Button
      variant={hasUnfinishedBriefs ? 'secondary' : undefined}
      to={`/my-yellow/my-products/manage-profile/${subscriptionId}`}
      // to="/my-yellow/my-products/"
    >
      Manage your Yellow profile
    </Button>
    {/* { hasUnfinishedBriefs && (
      <Button
        to="/my-yellow/my-products"
      >
      Work on briefs
      </Button>
    )} */}
  </Template>
);

Done.defaultProps = {
  hasUnfinishedBriefs: false,
  subscriptionId: '',
};
Done.propTypes = {
  hasUnfinishedBriefs: PropTypes.bool,
  subscriptionId: PropTypes.string,
};

export default Done;
