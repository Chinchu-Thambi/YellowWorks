import React from 'react';
import { Flex } from 'rebass/styled-components';

import Button from '../../../../../../components/Button';
import Spinner from '../../../../../../components/Spinner';

import Card from '../../../../components/Card';
import ProductContext from '../../../../services/ProductContext';

import { getCardStatus } from '../../../MyProducts/components/ProductCard';

const ViewYourProfile = () => {
  const { orderDetails } = React.useContext(ProductContext) || {};

  const status = orderDetails?.status;
  const slug = orderDetails?.providerData?.slug;

  if (!status) {
    return <Card><Spinner /></Card>;
  }
  return (
    // while subscription changes are pending, e.g. upgrade/downgrade, we must check for slug presence
    <Card isSubCard status={getCardStatus({ subscriptionStatus: slug ? 'ACTIVE' : status })}>
      {status === 'ACTIVE' || slug ? (
        <>
          <Flex alignItems="center" flexDirection="column">
            <h2>Your profile is live on Yellow</h2>
            <Button
              href={`/y/${slug}?invalidate_cache=True`}
              target="_blank"
              variant="tertiary"
              size="sm"
              outline="true"
              rel="noopener noreferrer"
            >View your profile
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <h2>Your profile status is: {status}</h2>
          <p>Changes you make now will be live when your profile is published.</p>
        </>
      )}
    </Card>
  );
};

export default ViewYourProfile;
