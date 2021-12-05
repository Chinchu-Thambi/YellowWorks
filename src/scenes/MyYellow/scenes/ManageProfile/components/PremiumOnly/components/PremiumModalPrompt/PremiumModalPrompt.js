import React from 'react';
import { Flex } from 'rebass/styled-components';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';

import CrownIcon from '../../../../../../../../assets/icons/premium-crown.svg';
import premiumTagIcon from '../../../../../../../../assets/icons/premium-tag.svg';
import arrowHead from '../../../../../../../../assets/icons/arrowHead.svg';

import Button from '../../../../../../../../components/Button';

import {
  FlexWrapper, FlexHeader, FlexFeatures, PremiumTag, Dropdown, OpenArrow, Content,
} from './PremiumModalPrompt.styled';

const PremiumModalPrompt = ({ subscriptionId }) => {
  const [active, setActive] = React.useState(false);

  const handleShowMore = () => {
    setActive(!active);
  };

  const navigateToManagePlan = () => {
    navigate(`/my-yellow/my-products/manage-plan/${subscriptionId}`);
  };

  return (
    <Flex ml={2} alignSelf="center" data-tip data-for="premiumCrown" flexDirection="column" alignItems="center">
      <img src={CrownIcon} alt="Premium Only" height={50} />
      <h3>Available for Premium only</h3>
      <Dropdown
        key="premiumDropdown"
        onClick={handleShowMore}
      >
        <Flex justifyContent="space-between">
          <p>What’s included in Premium?</p>
          <OpenArrow src={arrowHead} alt={active ? 'Open' : 'Close'} active={active} />
        </Flex>
        <Content shown={active}>
          <FlexWrapper>
            <PremiumTag src={premiumTagIcon} alt="Premium" />
            <FlexHeader isPremium>
              <h2>Premium</h2>
              <h3>$20.00 / month</h3>
            </FlexHeader>
            <FlexFeatures>
              <p>INCLUDES EVERYTHING IN BASIC PROFILE <strong>PLUS</strong></p>
              <ul>
                <li>Video & Images</li>
                <li>Profile key team members</li>
                <li>Social links</li>
                <li>Downloadable documents</li>
              </ul>
            </FlexFeatures>
          </FlexWrapper>
          <Button size="md" onClick={navigateToManagePlan}>Go Premium</Button>
        </Content>
      </Dropdown>

    </Flex>
  );
};

PremiumModalPrompt.propTypes = {
  subscriptionId: PropTypes.string.isRequired,
};

export default PremiumModalPrompt;
