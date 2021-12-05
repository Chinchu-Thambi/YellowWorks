import React from 'react';

import Button from '../../../../../../components/Button';

import Card from '../../../../components/Card';

const Invoices = () => (
  <Card>
    <h2>Invoices</h2>
    <table>
      <thead>
        <tr>
          <td>Date</td>
          <td>Link</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>13-08-2019</td>
          <td><a href="http://example.com" target="_blank" rel="noopener noreferrer">32432352345</a></td>
        </tr>
        <tr>
          <td>13-08-2019</td>
          <td><a href="http://example.com" target="_blank" rel="noopener noreferrer">32432352345</a></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2">
            <Button
              variant="link"
              size="sm"
              style={{
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              More
            </Button>
          </td>
        </tr>
      </tfoot>
    </table>
  </Card>
);

export default Invoices;
