import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';
import { mediaBreakpointUp } from '../../../../util';
import Spinner from '../../../../components/Spinner';

import ProductContext from '../../services/ProductContext';

import Essentials from './components/Essentials'; // @TODO: add this when functionality is ready
import PrimaryInformation from './components/PrimaryInformation';
import ViewYourProfile from './components/ViewYourProfile';
import EditGallery from './components/EditGallery'; // @TODO: add this when functionality is ready
import ManageCategories from './components/ManageCategories';
import MainInfoTab from './components/MainInfoTab';
import ErrorMessage from './components/ErrorMessage';
import AdditionalInfoTab from './components/AdditionalInfoTab';
import CloseBusiness from './components/CloseBusiness';

const FlexContainer = styled.div`
  display: block;
  color: ${({ theme }) => theme.palette.contrast[1]};

  ${mediaBreakpointUp('lg')} {
    display: flex;
  }
`;

const CardContainer = styled(Box)`
  width: 100%;

  /* Second column */
  ${mediaBreakpointUp('lg')} {
      &:last-child {
      max-width: 447px;
    }
  }
`;

const ManageProfile = (props) => {
  const { subscriptionId } = props;

  const {
    errors, formData, setSubscriptionId, orderDetails,
  } = React.useContext(ProductContext) || {};

  // set subscription Id
  React.useEffect(() => {
    if (typeof setSubscriptionId === 'function') {
      setSubscriptionId(subscriptionId);
    }
  }, [setSubscriptionId, subscriptionId]);

  if (errors) return <ErrorMessage errors={errors} />;
  if (!formData) return <Spinner />;

  return (
    <FlexContainer>
      <CardContainer>
        <Essentials />
        <PrimaryInformation />
        <AdditionalInfoTab schema={orderDetails?.userSchema} />
      </CardContainer>

      <CardContainer>
        <ViewYourProfile />
        <EditGallery />
        <ManageCategories />
        <MainInfoTab />
        <CloseBusiness />
      </CardContainer>
    </FlexContainer>
  );
};

ManageProfile.propTypes = {
  subscriptionId: PropTypes.string.isRequired,
};

export default ManageProfile;
