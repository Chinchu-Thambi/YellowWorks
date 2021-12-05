import React from 'react';
import Axios from 'axios';

import ListView from './components/ListView';
import SimpleListLink from './components/SimpleListLink';
import AuthContext from '../../../../../../components/Auth';
import { OneColumnContainer } from '../../../../components/Containers';

const Invoices = () => {
  const { jwtToken, customerId } = React.useContext(AuthContext) || {};
  const [invoices, setInvoices] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // load invoices
  React.useEffect(() => {
    if (jwtToken && !customerId) {
      setIsLoading(false);
      return;
    }

    if (
      !jwtToken
      || !customerId
      || isLoading
    ) return;

    if (invoices) {
      return;
    }

    const getInvoices = async () => {
      const query = `
      {
        invoices(customerId:${customerId}) {
            edges {
              cursor
              node {
                contentUrl
                encodingFormat
                metadata {
                  cents
                  date
                  status
                }
              }
            }
          }
        }
      `;

      const response = await Axios.post(
        process.env.GATSBY_BILLING_PLATFORM_ENDPOINT,
        { query },
        { headers: { Authorization: jwtToken } },
      );

      if (response.data && response.data.errors) {
        setInvoices(null);
        setIsLoading(false);
      } else {
        const allInvoices = response?.data?.data?.invoices?.edges.map((edge) => ({ ...edge.node, filename: edge.cursor }));
        setInvoices(allInvoices);
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    getInvoices();
  }, [customerId, invoices, isLoading, jwtToken]);

  return (
    <OneColumnContainer title="Invoices">
      <ListView columnHeadings={['Date', 'Invoice', 'Amount ($)', 'Status']}>
        {invoices?.map((invoice) => <SimpleListLink item={invoice} />)}
      </ListView>
    </OneColumnContainer>
  );
};

export default Invoices;
