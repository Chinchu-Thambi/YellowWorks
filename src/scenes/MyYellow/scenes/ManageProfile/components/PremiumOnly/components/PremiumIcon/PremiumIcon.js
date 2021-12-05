import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { Box } from 'rebass/styled-components';

import CrownIcon from '../../../../../../../../assets/icons/premium-crown.svg';

const YellowTooltip = styled(ReactTooltip).attrs({
  className: 'yellow-premium-tooltip',
  place: 'bottom',
  effect: 'solid',
  type: 'info',
  arrowColor: 'transparent',
})`
  &.yellow-premium-tooltip {
    border-radius: ${({ theme }) => theme.space[4]};
    background-color: ${({ theme }) => theme.palette.accent[3][4]};
    box-shadow: ${({ theme }) => theme.shadows.medium};
    color: ${({ theme }) => theme.palette.contrast[0]};
    max-width: 300px;

    &.place-bottom, &.place-top, &.place-left {

      &::after, &::before {
        display: none;
      }

      p {
        font-size: ${({ theme }) => theme.fontSizes[2]};
        font-weight: ${({ theme }) => theme.fontWeight[0]};
      }
    }
  }
`;

const PremiumIcon = () => (
  <>
    <Box ml={2} alignSelf="center" data-tip data-for="premiumCrown" display="inline-block">
      <img src={CrownIcon} alt="Premium Only" />
    </Box>
    <YellowTooltip id="premiumCrown">
      <p>This field is available on Premium Profiles only.</p>
    </YellowTooltip>
  </>
);

export default PremiumIcon;
