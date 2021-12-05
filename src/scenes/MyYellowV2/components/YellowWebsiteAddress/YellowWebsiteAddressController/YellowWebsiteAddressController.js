/* eslint-disable react/prop-types */
import React from 'react';
import { gql } from 'apollo-boost';
import axios from 'axios';
import { useQuery } from '@apollo/react-hooks';

import YellowWebsiteAddressView from '../YellowWebsiteAddressView/YellowWebsiteAddressView';
import { micrositesClient } from '../../../../../services/graphql';
import AuthContext from '../../../../../components/Auth';
import ValidationController from '../../../../../components/ValidationController';

const QUERY_SLUG_AVAILABILITY = gql`
  query checkHostAvailability($customerId: ID!, $url: String!) {
    checkHostAvailability(customerId: $customerId, url: $url) {
      available
      url
    }
  }
`;

/** @type {( onChange: Function, title?: string, formData?: string, required?: bool, ref?: Function, sufix?: string) => JSX.Element */
const YellowWebsiteAddressController = ({
  onChange, title, value, required, ref, suffix,
}) => {
  const { jwtToken, customerId } = React.useContext(AuthContext) || {};
  const [isAvailable, setIsAvailable] = React.useState(null);
  const [reserved, setReserved] = React.useState(null);
  const [isReserving, setIsReserving] = React.useState(null);
  const [url, setUrl] = React.useState(value);

  const { loading, data, error } = useQuery(QUERY_SLUG_AVAILABILITY, {
    variables: { customerId, url },
    context: { headers: { Authorization: jwtToken } },
    client: micrositesClient,
  });

  React.useEffect(() => {
    const handleReserveUrl = async () => {
      if (!url || reserved === url || isReserving) {
        return;
      }
      const query = `
      mutation reserveUrl($customerId: ID!, $url: String) {
        reserveHost(customerId: $customerId, url: $url) {
          reserved
        }
      }
      `;
      setIsReserving(true);
      const variables = {
        customerId,
        url,
      };

      const { data: result } = await axios.post(
        process.env.GATSBY_MICROSITES_PLATFORM_ENDPOINT,
        { query, variables },
        { headers: { Authorization: jwtToken } },
      );
      if (result.data?.reserveHost?.reserved === true) {
        setReserved(url);
        setIsReserving(false);
        return;
      }
      setReserved(url);
      setIsAvailable(false);
      setIsReserving(false);
    };

    if (loading) {
      return;
    }
    if (customerId && jwtToken && data) {
      const urlIsAvailable = data.checkHostAvailability?.available;
      setIsAvailable(typeof urlIsAvailable === 'boolean' && urlIsAvailable);
      if (urlIsAvailable) {
        onChange(url);
        handleReserveUrl(url);
      }
    }
  }, [loading, data, url, customerId, jwtToken, onChange, reserved, isReserving]);

  return (
    <>
      <YellowWebsiteAddressView
        label={title}
        suffix={suffix}
        onChange={({ slug }) => {
          setUrl(slug);
        }}
        initialSlugOnlyValue={value}
        isAvailable={isAvailable}
        loading={loading}
        required={required}
        error={error ? 'Something went wrong while checking if this address is available' : null}
      />
      <ValidationController
        isBlocked={!url && !isAvailable && required}
        requiredRef={ref}
      />
    </>
  );
};

export default YellowWebsiteAddressController;
