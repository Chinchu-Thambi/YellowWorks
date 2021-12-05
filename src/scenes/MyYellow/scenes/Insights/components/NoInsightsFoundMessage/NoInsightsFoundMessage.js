import React from 'react';
import { Flex } from 'rebass/styled-components';
import analyticsNoDataArtwork from '../../../../../../assets/icons/analytics-no-data.svg';
import { theme } from '../../../../../../util';
import ActionableNotice from '../ActionableNotice';

export default () => (
  <Flex
    my={2}
    mx={[1, 0]}
    sx={{ border: `1px solid ${theme.palette.accent[3][3]}`, borderRadius: '5px' }}
    py={[4, 6]}
    px={[2, 6]}
    backgroundColor={theme.palette.accent[3][5]}
    justifyContent="center"
    alignItems="center"
  >
    <ActionableNotice
      art={{
        image: analyticsNoDataArtwork,
        scalePercent: 15,
      }}
      title="We couldn't find insights for that month."
      text="No insights were found for the month you selected. This may be because you don't have a profile with us yet. Get started with your Yellow Profile by clicking the button below."
      action={{
        text: 'Create Profile',
        href: 'https://yellow.co.nz/our-products/yellow-profile/#yellow-choose-your-profile',
      }}
    />
  </Flex>
);
