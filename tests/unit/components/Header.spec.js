/* globals jest, describe, it, expect */

import { mount, shallow } from 'enzyme';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../../../src/util/theme';

import AuthContext from '../../../src/components/Auth/AuthContext';

import Header from '../../../src/components/Header';
import { MenuLink, ProductMenu } from '../../../src/components/Header/LgHeaderStyled';

const authValue = {
  state: {
    user: {
      attributes: {
        given_name: '',
        family_name: '',
      },
      username: 'user',
    },
    status: 'AUTHENTICATED',
    modal: {},
  },
  jwtToken: 'some_token',
  initModal: () => {},
  LoginLink: () => null,
};


describe('Header', () => {
  it('exports a header matching the previous snapshot', () => {
    const wrapper = mount(
      <AuthContext.Provider value={authValue}>
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      </AuthContext.Provider>,
    );
    expect(wrapper.html()).toMatchSnapshot();

    wrapper.unmount();
  });

  it('toggles product menu visibility', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    const wrapper = mount(
      <AuthContext.Provider value={authValue}>
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      </AuthContext.Provider>,
    );

    const ourProductsLink = wrapper.find(MenuLink).find({
      to: '/our-products/',
    }).first();

    ourProductsLink.simulate('mouseenter');
    expect(setState).toHaveBeenCalledWith(true);
    setState.mockClear();

    // mouse leaves to productMenu, doesn't toggle it to false
    ourProductsLink.simulate('mouseleave', {
      relatedTarget: {
        className: ProductMenu.styledComponentId,
      },
    });
    expect(setState).not.toHaveBeenCalled();

    // mouse leaves to anything else, toggles productMenu to true
    ourProductsLink.simulate('mouseleave', {
      relatedTarget: {
        className: 'anything else',
      },
    });
    expect(setState).toHaveBeenCalledWith(false);
    setState.mockClear();

    const productMenu = wrapper.find(ProductMenu).first();
    productMenu.simulate('mouseleave');
    expect(setState).toHaveBeenCalledWith(false);

    wrapper.unmount();
    useStateSpy.mockRestore();
  });

  it('transforms ProductMenu when toggling visibility', () => {
    const hidden = shallow(<ProductMenu theme={theme} />).html();
    const visible = shallow(<ProductMenu visible theme={theme} />).html();
    expect(hidden).not.toEqual(visible);
  });
});
