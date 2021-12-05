import React from 'react';
import BusinessContext from '../../../../MyYellow/services/BusinessContext';
import Spinner from '../../../../../components/Spinner';
import Notice from '../../../../MyYellow/components/Notice';

const ManageGMB = () => {
  const {
    currentBusiness,
  } = React.useContext(BusinessContext) || {};

  if (!currentBusiness) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <Notice
        heading="You don't currently have a Google My Business Listing"
        message="To see what it's all about visit our Google My Business Listing page"
        buttonLabel="Visit Product Page"
        targetURL="/our-products/google-my-business"
      />
    </div>
  );
};

export default ManageGMB;
