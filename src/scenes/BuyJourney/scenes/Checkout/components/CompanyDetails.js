/* globals Element */

import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';

import PhoneInput from '../../../../../components/PhoneInput';

import {
  Container, Form, ExistingDetailsContainer,
} from './Styled';
import AddressForm from '../../../../../components/AddressForm';

const CompanyDetails = ({
  existingDetails,
  details,
  setDetails, formRef,
}) => {
  const handleChange = (e) => {
    const {
      id, value,
    } = e.target;

    setDetails({
      ...details,
      [id]: value,
    });
  };

  const handleAddressChange = (addressObject) => {
    setDetails({
      ...details,
      address: addressObject.address,
      geo: addressObject.geo,
    });
  };

  const handlePhoneChange = (phoneNumber) => {
    setDetails({
      ...details,
      phone: phoneNumber,
    });
  };

  return (
    <Container>
      <h3>Business details</h3>
      <Form autoComplete="off" ref={formRef}>
        <Flex
          width={[1, 'auto']}
          flexDirection={['column', existingDetails?.companyName ? 'column' : 'row']}
        >
          {existingDetails?.companyName ? (
            <ExistingDetailsContainer>
              <h6>Business Name</h6>
              <p>{existingDetails?.companyName}</p>
            </ExistingDetailsContainer>
          ) : (
            <label htmlFor="companyName">
              <span>Business Name *</span>
              <input
                type="text"
                name="companyName"
                id="companyName"
                value={details.companyName}
                onChange={handleChange}
                required
              />
            </label>
          )}

          {existingDetails?.formattedPhoneNumber ? (
            <ExistingDetailsContainer>
              <h6>Phone Number</h6>
              <p>{existingDetails?.formattedPhoneNumber}</p>
            </ExistingDetailsContainer>
          ) : (
            <PhoneInput formData={details.phone} onChange={handlePhoneChange} />
          )}
        </Flex>

        {existingDetails?.formattedAddress ? (
          <ExistingDetailsContainer>
            <h6>Business Address</h6>
            <address>{existingDetails?.formattedAddress}</address>
            <p>
              You can update the business details on your
              Yellow Profile at any time after you purchase.
            </p>
          </ExistingDetailsContainer>
        ) : (
          <AddressForm defaultMode="search" formData={details} onChange={handleAddressChange} />
        )}
      </Form>
    </Container>
  );
};

CompanyDetails.defaultProps = {
  existingDetails: {
    companyName: '',
    formattedAddress: '',
    formattedPhoneNumber: '',
  },
  details: {
    companyName: '',
    phone: {
      countryCode: '',
      areaCode: '',
      number: '',
    },
    address: {
      placeId: '',
      streetNumber: '',
      streetAddress: '',
      floor: '',
      premise: '',
      subpremise: '',
      sublocality: '',
      locality: '',
      administrativeArea: '',
      postalCode: '',
    },
  },
};

CompanyDetails.propTypes = {
  existingDetails: PropTypes.shape({
    companyName: PropTypes.string,
    formattedAddress: PropTypes.string,
    formattedPhoneNumber: PropTypes.string,
  }),
  details: PropTypes.shape({
    companyName: PropTypes.string,
    phone: PropTypes.shape({
      countryCode: PropTypes.string,
      areaCode: PropTypes.string,
      number: PropTypes.string,
    }),
    address: PropTypes.shape({
      placeId: PropTypes.string,
      streetNumber: PropTypes.string,
      streetAddress: PropTypes.string,
      floor: PropTypes.string,
      premise: PropTypes.string,
      subpremise: PropTypes.string,
      sublocality: PropTypes.string,
      locality: PropTypes.string,
      administrativeArea: PropTypes.string,
      postalCode: PropTypes.string,
    }),
    geo: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
  setDetails: PropTypes.func.isRequired,
  formRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default CompanyDetails;
