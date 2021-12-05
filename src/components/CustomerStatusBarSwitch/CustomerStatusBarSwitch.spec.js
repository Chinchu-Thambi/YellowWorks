/* globals describe, it, expect */
import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import AuthContext from '../Auth/AuthContext';
import theme from '../../util/theme';

import CustomerStatusBarSwitch from './CustomerStatusBarSwitch';
import { ChangeButton } from './Styled';

describe('CustomerStatusBarSwitch', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <CustomerStatusBarSwitch />
      </ThemeProvider>,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper).toBeTruthy();

    wrapper.unmount();
  });

  it('should have specific containers', () => {
    const staffData = {
      state: {
        user: {
          attributes: {
            email: 'staffEmail',
          },
        },
      },
      selectedCustomer: {
        customerId: 'customerId',
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={staffData}>
        <ThemeProvider theme={theme}>
          <CustomerStatusBarSwitch />
        </ThemeProvider>
      </AuthContext.Provider>,
    );

    expect(wrapper.find('[data-testid="currentAccountEmail"]')).toHaveLength(1);

    wrapper.unmount();
  });

  it('should render hubspot links', () => {
    const staffData = {
      state: {
        user: {
          attributes: {
            email: 'staffEmail',
          },
        },
      },
      selectedCustomer: {
        customerId: 'customerId',
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={staffData}>
        <ThemeProvider theme={theme}>
          <CustomerStatusBarSwitch />
        </ThemeProvider>
      </AuthContext.Provider>,
    );

    expect(wrapper.find('a')).toHaveLength(2);
    expect(wrapper.find('a').at(0).text()).toBe(staffData.selectedCustomer.customerId);
    wrapper.unmount();
  });

  it('should render with "change" action button', () => {
    const staffData = {
      state: {
        user: {
          attributes: {
            email: 'staffEmail',
          },
          selectedCustomer: {
            contactEmail: 'contactEmail',
          },
        },
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={staffData}>
        <ThemeProvider theme={theme}>
          <CustomerStatusBarSwitch />
        </ThemeProvider>
      </AuthContext.Provider>,
    );

    expect(wrapper.find(ChangeButton)).toHaveLength(1);
    expect(wrapper.find(ChangeButton).text()).toBe('Select');

    wrapper.unmount();
  });
});
