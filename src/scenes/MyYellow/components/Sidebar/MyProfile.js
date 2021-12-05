import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Text } from 'rebass/styled-components';

import Spinner from '../../../../components/Spinner';
import formatAddress from '../../../../services/formatAddress';
import theme from '../../../../util/theme';

import ProductContext from '../../services/ProductContext';

import {
  SidebarSection, PremiumTag, HeaderTitle, HeaderCompanyName, HeaderAddress, NavLink,
} from './styled';

import premiumTagIcon from '../../../../assets/icons/premium-tag.svg';
import getIsPremium from '../../services/getIsPremium';
import Badge from '../Badge';

const MyProfile = ({ subscriptionId }) => {
  const spinnerColor = theme.palette.base[0];
  const productState = React.useContext(ProductContext) || {};
  const { formData, orderDetails } = productState;
  const profile = formData?.businessProfile;
  const address = formData?.location?.address;
  const productName = orderDetails?.product?.name;
  const isPremium = getIsPremium(productState);

  React.useEffect(() => {
    if (!productState.subscriptionId) {
      productState.setSubscriptionId(subscriptionId);
    }
  }, [productState, subscriptionId]);

  return (
    <>
      <SidebarSection>
        {isPremium && <PremiumTag src={premiumTagIcon} alt="Premium" />}
        <header>
          <HeaderTitle>{!productName ? <Spinner color={spinnerColor} /> : productName}</HeaderTitle>
          <HeaderCompanyName>{!profile?.name ? <Spinner color={spinnerColor} /> : profile?.name}</HeaderCompanyName>
          <HeaderAddress>{!address ? <Spinner color={spinnerColor} /> : formatAddress(address)}</HeaderAddress>
        </header>
        <ul>
          <li>
            <NavLink activeClassName="active" to={`/my-yellow/my-products/manage-profile/${subscriptionId}`}>
              Manage Profile
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={`/my-yellow/my-products/manage-plan/${subscriptionId}`}>
              Manage Plan
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="active"
              to={`/my-yellow/my-products/manage-reviews/${subscriptionId}`}
            >
              <Flex justifyContent="space-between">
                <Text alignSelf="center">Manage Reviews</Text>
                <Box alignSelf="center" marginRight={3}>
                  <Badge text="New" variant="alert" />
                </Box>
              </Flex>
            </NavLink>
          </li>
        </ul>
      </SidebarSection>
    </>
  );
};

MyProfile.propTypes = {
  subscriptionId: PropTypes.string,
};

MyProfile.defaultProps = {
  subscriptionId: null,
};

export default MyProfile;
