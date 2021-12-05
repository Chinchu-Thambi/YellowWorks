/* eslint-disable react/prop-types */
import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import YellowWebsiteAddressView from '../YellowWebsiteAddressView/YellowWebsiteAddressView';
import { micrositesClient } from '../../../../../services/graphql';
import AuthContext from '../../../../../components/Auth';
import { TwoColumnContainer } from '../../Containers';
import { OptionalDialog } from '../../Dialogs';

const QUERY_SLUG_AVAILABILITY = gql`
  query checkHostAvailability($customerId: ID!, $url: String!) {
    checkHostAvailability(customerId: $customerId, url: $url) {
      available
      url
    }
  }
`;

const YellowWebsiteAddressManager = () => {
  const { jwtToken, customerId } = React.useContext(AuthContext) || {};
  const [status, setStatus] = React.useState(null);
  const [url, setUrl] = React.useState();
  const [warningDialogIsShown, setWarningDialogIsShown] = React.useState(false);

  const { loading, data, error } = useQuery(QUERY_SLUG_AVAILABILITY, {
    variables: { customerId, url },
    context: { headers: { Authorization: jwtToken } },
    client: micrositesClient,
  });

  React.useEffect(() => {
    if (loading && url) {
      setStatus('checking');
    }
    if (customerId && jwtToken && data) {
      const urlIsAvailable = data.checkHostAvailability?.available;
      setStatus(typeof urlIsAvailable === 'boolean' && urlIsAvailable ? 'available' : 'unavailable');
    }
  }, [loading, data, url, customerId, jwtToken]);

  return (
    <TwoColumnContainer
      title="Yellow Website Address"
      subtitle="Here you can manage the address of your Yellow Website."
      primaryAction={{
        label: 'OK',
        onClick: () => {
          setWarningDialogIsShown(true);
        },
      }}
      secondaryAction={{
        label: 'Cancel',
        onClick: () => {
          setUrl(null);
          setStatus(null);
        },
      }}
    >
      <YellowWebsiteAddressView
        onChange={({ prefix, slug, suffix }) => {
          setUrl(() => slug + suffix);
        }}
        status={status}
        error={error ? 'Something went wrong while checking if this address is available' : null}
      />
      {warningDialogIsShown && (
        <OptionalDialog
          title="Reserve Yellow Website Address"
          message={(
            <div>
              <p>
                You are about to reserve the address <strong>{url}</strong>
              </p>
              <p>Reserving this address will cancel any prior reservations you had.</p>
            </div>
          )}
          onDecision={(choseAffirmative) => {
            if (choseAffirmative) {
              console.log('reserving! :)');
            }
            setWarningDialogIsShown(false);
          }}
        />
      )}
    </TwoColumnContainer>
  );
};

export default YellowWebsiteAddressManager;
