import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as R from 'ramda';
import { NotificationManager } from 'react-notifications';

import AuthContext from '../../../../components/Auth/AuthContext';
import { useLocalStorage } from '../../../../util';
import { FragmentBusiness, FragmentLocation } from '../../../../graphql/fragments';

import normalizeBusinessEntity from './services/normalizeBusinessEntity';
import createAssets from './services/createAssets';
import businessInputAdapter from './services/businessInputAdapter';

const BusinessContext = React.createContext();
export default BusinessContext;

export const BusinessProvider = ({ children }) => {
  const { jwtToken, customerId } = React.useContext(AuthContext) || {};
  const [businessIds, setBusinessIds] = React.useState(null);
  const [businessId, setBusinessId] = React.useState(null);
  const [businessesStorage, setBusinessesStorage] = useLocalStorage('businessesStorage', null);
  const [businessesStorageExpiry, setBusinessesStorageExpiry] = useLocalStorage('businessesStorageExpiry', {});
  const [isLoading, setIsLoading] = React.useState(false);
  const [storageErrors, setStorageErrors] = useLocalStorage('storageErrors', null);
  const currentBusiness = businessesStorage?.[businessId] || null;
  const expiryTime = businessesStorageExpiry?.[businessId] || null;
  const [failure, setFailure] = React.useState(false);
  const errors = storageErrors?.[businessId] || null;

  const expireBusinessData = React.useCallback(() => {
    delete businessesStorageExpiry[businessId];
    setBusinessesStorageExpiry({
      ...businessesStorageExpiry,
    });
  }, [setBusinessesStorageExpiry, businessesStorageExpiry, businessId]);

  const setExpiryDate = React.useCallback((delay) => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + delay).toISOString();
    setBusinessesStorageExpiry({
      ...businessesStorageExpiry,
      [businessId]: futureDate,
    });
  }, [setBusinessesStorageExpiry, businessesStorageExpiry, businessId]);

  const setCurrentBusiness = (updatedBusiness) => {
    setBusinessesStorage({
      ...businessesStorage,
      [businessId]: updatedBusiness,
    });
  };

  const getPath = (path = []) => R.pathOr(null, path)(currentBusiness);

  const setPath = (path, value) => {
    setCurrentBusiness(
      R.set(
        R.lensPath(path),
        value,
      )(currentBusiness),
    );
  };

  // getSubset takes an object of key: path and returns currentBusiness values for it
  const getSubset = R.compose(
    R.fromPairs,
    R.map(
      R.evolve([
        R.identity,
        getPath,
      ]),
    ),
    R.toPairs,
  );

  const saveBusinessChange = async ({ path, data = currentBusiness }) => {
    const updatedCurrentBusiness = path ? R.assocPath(
      path,
      data,
    )(currentBusiness) : data;

    if (!R.equals(updatedCurrentBusiness, currentBusiness)) {
      const query = `
        mutation updateBusiness(
          $businessId: ID!,
          $input: UpdateBusinessInput!
          $customerId: ID!
        ) {
          updateBusiness(
            id: $businessId
            customerId: $customerId
            input: $input
          )
          {
            ${FragmentBusiness}
          }
        }
      `;

      const variables = {
        businessId,
        customerId,
        input: businessInputAdapter(updatedCurrentBusiness),
      };

      const response = await axios.post(
        process.env.GATSBY_PRODUCT_API_ENDPOINT,
        { query, variables },
        { headers: { Authorization: jwtToken } },
      );

      if (response.data?.errors) {
        console.error('There was a problem with the user input.', {
          key: `business_${businessId}`,
          variables,
        });
        NotificationManager.error('Input could not be saved.', '', 5000);
        setStorageErrors({ [customerId]: response.data.errors });
        return { success: false };
      }
      const normalizedBusiness = normalizeBusinessEntity(updatedCurrentBusiness);

      setCurrentBusiness(normalizedBusiness);

      const in3Seconds = 3 * 1000;
      setExpiryDate(in3Seconds);

      if (!updatedCurrentBusiness.draft) {
        NotificationManager.success('Saved successfully.', '', 5000);
      }

      return { success: true };
    }

    return { success: false };
  };

  const mergeSubset = (mergingPathValues) => {
    const updatedBusiness = R.reduce((acc, { path, value }) => R.assocPath(
      path, value, acc,
    ), currentBusiness)(mergingPathValues);
    setCurrentBusiness(updatedBusiness);
    saveBusinessChange({ data: updatedBusiness });
  };

  const deleteLocation = async ({ locationId }) => {
    const query = `
        mutation deleteLocation(
          $businessId: ID!,
          $locationId: ID!
          $customerId: ID
        ) {
          deleteLocation(
            businessId: $businessId
            locationId: $locationId
            customerId: $customerId
          )
        }
      `;
    const variables = {
      businessId,
      customerId,
      locationId,
    };

    const response = await axios.post(
      process.env.GATSBY_PRODUCT_API_ENDPOINT,
      { query, variables },
      { headers: { Authorization: jwtToken } },
    );

    if (response.data?.errors) {
      NotificationManager.error('Location could not be deleted', '', 5000);
      setStorageErrors({ [customerId]: response.data.errors });
      return { success: false };
    }
    NotificationManager.success('Location removed successfully.', '', 5000);

    return { success: true };
  };

  const createLocation = async (newLocation) => {
    const query = `
        mutation createLocation(
          $businessId: ID!,
          $input: CreateLocationInput!
        ) {
          createLocation(
            businessId: $businessId
            input: $locationId
          ) {
            ${FragmentLocation}
          }
        }
      `;

    const variables = {
      businessId,
      input: newLocation,
    };

    const response = await axios.post(
      process.env.GATSBY_PRODUCT_API_ENDPOINT,
      { query, variables },
      { headers: { Authorization: jwtToken } },
    );

    if (response.data?.errors) {
      NotificationManager.error('Location could not be created', '', 5000);
      setStorageErrors({ [customerId]: response.data.errors });
      return { success: false };
    }
    NotificationManager.success('Saved successfully.', '', 5000);

    return { success: true };
  };

  const addAssets = async (assets) => {
    const assetsPath = ['assets'];

    const currentAssets = R.pathOr([], assetsPath, currentBusiness);
    const newAssets = await createAssets(jwtToken, customerId, businessId)(assets);

    const updatedAssets = R.compose(
      R.flatten,
      R.append(newAssets),
    )(currentAssets);

    setPath(assetsPath, updatedAssets);
  };

  // load all business ids and sets the initial businessId
  React.useEffect(() => {
    // bare requirements for formData loading
    if (
      !jwtToken
      || !customerId
      || isLoading
    ) return;
    // controls for data based loading necessity
    if (
      businessIds || failure
    ) return;

    const getBusinesses = async () => {
      const businessesQuery = `
        query getBusinessIds($customerId: ID!) {
          businesses(
            customerId: $customerId
          ) {
            edges {
              node {
                id
              }
            }
          }
        }
      `;

      setIsLoading(true);

      const businessesResponse = await axios.post(
        process.env.GATSBY_PRODUCT_API_ENDPOINT,
        { query: businessesQuery, variables: { customerId } },
        { headers: { Authorization: jwtToken } },
      );
      if (businessesResponse.data?.errors) {
        setStorageErrors({ [customerId]: businessesResponse.data.errors });
      }
      const businessesRaw = R.path(['data', 'data', 'businesses'])(businessesResponse);
      const businesses = businessesRaw?.edges?.map((edge) => edge.node.id);
      if (!businesses) {
        setFailure(true);
      }
      setBusinessIds(businesses);
      setBusinessId(R.last(businesses));
      setIsLoading(false);
    };
    getBusinesses();
  }, [businessIds, customerId, failure, isLoading, jwtToken, setStorageErrors]);

  // load all businessData
  React.useEffect(() => {
    // bare requirements for formData loading
    if (
      !jwtToken
      || !customerId
      || isLoading
    ) return;
    // controls for data based loading necessity
    if (
      currentBusiness || !businessId
    ) return;

    // first time through, sets the expiry time to tomorrow
    if (!expiryTime) {
      const tomorrow = (24 * 60 * 60 * 1000);
      setExpiryDate(tomorrow);
      setStorageErrors({
        ...storageErrors,
        [businessId]: null,
      });
    }

    const getBusinessContent = async () => {
      const businessQuery = `
      query getBusinessNode($id: ID!, $customerId: ID!) {
        node(
          id: $id
          customerId: $customerId
        ) {
            ... on Business {
            ${FragmentBusiness}
          }
        }
      }
      `;

      const variables = {
        id: businessId,
        customerId,
        limit: 2,
      };
      setIsLoading(true);

      if (expiryTime) {
        setBusinessesStorage({
          ...businessesStorage,
          [businessId]: undefined,
        });
      }

      const businessResponse = await axios.post(
        process.env.GATSBY_PRODUCT_API_ENDPOINT,
        { query: businessQuery, variables },
        { headers: { Authorization: jwtToken } },
      );

      if (businessResponse.data?.errors) {
        setStorageErrors({ [businessId]: businessResponse.data.errors });
      }

      const currentSelectedBusiness = R.path(['data', 'data', 'node'])(businessResponse);
      const normalizedBusiness = normalizeBusinessEntity(currentSelectedBusiness);

      setBusinessesStorage({
        ...businessesStorage,
        [businessId]: normalizedBusiness,
      });
      setIsLoading(false);
    };
    getBusinessContent();
  }, [businessId, businessesStorage, currentBusiness, customerId, expiryTime, isLoading, jwtToken, setBusinessesStorage, setExpiryDate, setStorageErrors, storageErrors]);

  const businessStore = {
    // businesses
    businessId,
    businessIds,
    errors,

    // data
    currentBusiness,
    getPath,
    setPath,
    getSubset,
    mergeSubset,
    isSubmitting: isLoading,

    // action
    saveBusinessChange,
    setBusinessId,
    expireBusinessData,

    // locations
    createLocation,
    deleteLocation,

    // assets
    addAssets,
  };

  return (
    <BusinessContext.Provider
      value={businessStore}
    >{children}
    </BusinessContext.Provider>
  );
};

BusinessProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
