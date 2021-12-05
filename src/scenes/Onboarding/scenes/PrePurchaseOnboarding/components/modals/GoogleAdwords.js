import React from 'react';
import { Flex } from 'rebass';

import {
  Table,
} from '../../../../Onboarding.styled';

const GoogleAdwords = () => (
  <Flex justifyContent="center" flexDirection="column" textAlign="center">
    <p>Our campaigns start from $100/month. Included in that $100 is the Google Ads budget we use to pay for clicks on your ads.</p>
    <p>Also included is the performance fee for building, managing & reporting on your campaign and making sure that precious Google Ads budget performs at an optimum level.
    </p>
    <Flex margin={[2, null, null, 4]} justifyContent="center" flexDirection="column" alignItems="center">
      <Table>
        <tr>
          <th>Packages</th>
          <th>Google Budget Portion</th>
        </tr>
        <tr>
          <td>$100 - $300 / month</td>
          <td>55%</td>
        </tr>
        <tr>
          <td>$400 - $1,000 / month</td>
          <td>60%</td>
        </tr>
        <tr>
          <td>$1,000+ / month</td>
          <td>Talk to a Yellow consultant</td>
        </tr>
      </Table>
    </Flex>
  </Flex>
);

export default GoogleAdwords;
