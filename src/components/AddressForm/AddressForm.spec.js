/* globals describe, it, expect, beforeEach, afterEach */
import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import theme from '../../util/theme';

import AddressForm from './AddressForm';

describe('AddressForm', () => {
  const dataMocks = {
    address: {
      placeId: '123',
      streetNumber: '8',
      streetAddress: 'Rockfield Rd',
      floor: '1',
      premise: 'a',
      subpremise: '11',
      sublocality: 'Ellerslie',
      locality: 'Auckland',
      administrativeArea: 'Auckland',
      postalCode: '1061',
    },
    geo: {
      latitude: '36.336655',
      longitude: '-12.22335',
    },
  };

  let wrapper;

  beforeEach(() => {
    // Google API key
    process.env.GATSBY_GOOGLE_MAPS_API_KEY = '123456';

    wrapper = mount(
      <ThemeProvider theme={theme}>
        <AddressForm formData={dataMocks} onChange={() => {}} />
      </ThemeProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper).toBeTruthy();
  });

  it('renders without crashing with incomplete data', () => {
    wrapper = mount(
      <ThemeProvider theme={theme}>
        <AddressForm />
      </ThemeProvider>,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper).toBeTruthy();
  });

  it('renders with given address', () => {
    expect(wrapper.find('#streetNumber').prop('value')).toBe(dataMocks.address.streetNumber);
    expect(wrapper.find('#streetAddress').prop('value')).toBe(dataMocks.address.streetAddress);
    expect(wrapper.find('#subpremise').prop('value')).toBe(dataMocks.address.subpremise);
    expect(wrapper.find('#sublocality').prop('value')).toBe(dataMocks.address.sublocality);
    expect(wrapper.find('#locality').prop('value')).toBe(dataMocks.address.locality);
    expect(wrapper.find('#administrativeArea').prop('value')).toBe(dataMocks.address.administrativeArea);
    expect(wrapper.find('#postalCode').prop('value')).toBe(dataMocks.address.postalCode);
  });

  it('should have a Search for a new address button', () => {
    expect(wrapper.find('button[data-testid="AddressFormSearchNewAddressLink"]').text()).toBe('Search new address');
  });

  it('should display Google autocomplete form on click on Search new address link', () => {
    wrapper.find('button[data-testid="AddressFormSearchNewAddressLink"]').simulate('click');
    expect(wrapper.find('[data-testid="GooglePlacesAutocompleteInputText"]')).toBeDefined();
    expect(wrapper.find('span[data-testid="AddressFormGPAutocompleteLabel"]').text()).toBe('Search for your address *');
  });
});
