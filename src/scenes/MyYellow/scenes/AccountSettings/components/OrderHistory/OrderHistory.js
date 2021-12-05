import React from 'react';
import styled from 'styled-components';

import Card from '../../../../components/Card';

const StyledCard = styled(Card)`
  table {
    width: 100%;
  }

  tr {
    :hover {
      background: ${({ theme }) => `${theme.palette.contrast[5]}`};
    }
  }

  td {
    vertical-align: top;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

const OrderHistory = () => (
  <StyledCard>
    <h2>Order History</h2>
    <table>
      <thead>
        <tr>
          <td>Order ID</td>
          <td>Date</td>
          <td>Product name</td>
          <td>One off</td>
          <td>Monthly</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2344567</td>
          <td>10-09-2019</td>
          <td>
            <ul>
              <li>Search Ads</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>$290</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>$90</li>
            </ul>
          </td>
        </tr>

        <tr>
          <td>2344567</td>
          <td>10-09-2019</td>
          <td>
            <ul>
              <li>Yellow Premium Profile</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>$290</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>$20</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </StyledCard>
);

export default OrderHistory;
