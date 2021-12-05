import React from 'react';
import {
  Wrapper, FlexWrapper, FlexHeader, FlexFeatures, PremiumTag,
} from './Profiles.styled';

import premiumTagIcon from '../../../../../../../assets/icons/premium-tag.svg';

const Profiles = () => (
  <>
    <Wrapper>
      <FlexWrapper>
        <FlexHeader>
          <h2>Basic</h2>
          <h3>Free</h3>
        </FlexHeader>
        <FlexFeatures>
          <p>INCLUDES</p>
          <ul>
            <li>Business name, description & logo</li>
            <li>Address or servicing areas</li>
            <li>Contact details & opening hours</li>
            <li>Keywords</li>
            <li>Monthly reporting</li>
            <li>Ratings & reviews</li>
            <li>My Yellow self-service</li>
          </ul>
        </FlexFeatures>
      </FlexWrapper>
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
    </Wrapper>
  </>
);

export default Profiles;
