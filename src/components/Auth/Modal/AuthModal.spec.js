/* eslint-disable react/prop-types */
/* globals describe, it, expect, beforeEach, jest */

import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { mount } from 'enzyme';

import theme from '../../../util/theme';
import AuthContext from '../AuthContext';

import AuthModal from './AuthModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ConfirmModal from './ConfirmModal';
import {
  ForgotPasswordModalGetEmail,
  ForgotPasswordModalResetPassword,
  SystemForgotPasswordModal,
} from './ForgotPasswordModal';
import SuccessModal from './SuccessModal';
import ChangePasswordModal from './ChangePasswordModal';
import RegistrationsDisabled from './RegistrationsDisabled';

jest.mock('./LoginModal');
jest.mock('./RegisterModal');
jest.mock('./ConfirmModal');
jest.mock('./SuccessModal');
jest.mock('./ChangePasswordModal');
jest.mock('./RegistrationsDisabled');
jest.mock('./RegistrationsDisabled');
jest.mock('./ForgotPasswordModal');

const customRender = (ui, options) => render(ui, {
  wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
  ...options,
});

describe('AuthModal', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders without throwing', () => {
    expect(() => {
      customRender(<AuthModal />);
    }).not.toThrow();
  });

  it('renders nothing if showAuthModal is not set', () => {
    const authState = {
      state: {
        modal: {
          modalType: 'login',
        },
      },
    };

    const { queryByPlaceholderText } = customRender((
      <AuthContext.Provider value={authState}>
        <AuthModal />
      </AuthContext.Provider>
    ));

    const emailInput = queryByPlaceholderText('Business Email');
    expect(emailInput).toBeNull();
  });

  it('renders login modal', () => {
    const authState = {
      state: {
        modal: {
          showAuthModal: true,
          modalType: 'login',
        },
      },
    };

    LoginModal.mockImplementation(() => 'LoginModal');

    render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <AuthModal />
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    expect(LoginModal).toBeCalled();
  });

  it('is closed by close button', () => {
    const authState = {
      state: {
        modal: {
          showAuthModal: true,
          modalType: 'login',
        },
      },
      showHideModal: jest.fn(),
    };

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <AuthModal />
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    wrapper.find('button').simulate('click');

    expect(authState.showHideModal.mock.calls).toContainEqual([{ show: false }]);
  });

  it('renders register modal', () => {
    const authState = {
      state: {
        modal: {
          showAuthModal: true,
          modalType: 'register',
        },
      },
    };

    RegisterModal.mockImplementation(() => 'RegisterModal');

    render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <AuthModal />
        </AuthContext.Provider>
      </ThemeProvider>,
    );
    expect(RegisterModal).toBeCalled();
  });

  it('renders confirm modal', () => {
    const authState = {
      state: {
        modal: {
          showAuthModal: true,
          modalType: 'confirm',
        },
      },
    };

    ConfirmModal.mockImplementation(() => 'ConfirmModal');

    render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <AuthModal />
        </AuthContext.Provider>
      </ThemeProvider>,
    );
    expect(ConfirmModal).toBeCalled();
  });

  it('renders forgot password - email modal', () => {
    const authState = {
      state: {
        modal: {
          showAuthModal: true,
          modalType: 'fpemail',
        },
      },
    };

    ForgotPasswordModalGetEmail.mockImplementation(() => 'ForgotPasswordModalGetEmail');

    render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <AuthModal />
        </AuthContext.Provider>
      </ThemeProvider>,
    );
    expect(ForgotPasswordModalGetEmail).toBeCalled();
  });

  it('renders forgot password - reset modal', () => {
    const authState = {
      state: {
        modal: {
          showAuthModal: true,
          modalType: 'fpreset',
        },
      },
    };

    ForgotPasswordModalResetPassword.mockImplementation(() => 'ForgotPasswordModalResetPassword');

    render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <AuthModal />
        </AuthContext.Provider>
      </ThemeProvider>,
    );
    expect(ForgotPasswordModalResetPassword).toBeCalled();
  });

  it('renders success modal', () => {
    const authState = {
      state: {
        modal: {
          showAuthModal: true,
          modalType: 'success',
          params: {
            message: 'test message',
          },
        },
      },
    };

    SuccessModal.mockImplementation(() => 'SuccessModal');

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <AuthModal />
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    expect(SuccessModal).toBeCalled();
    expect(wrapper.text().includes(authState.state.modal.params.message));
  });

  it('renders changePassword modal', () => {
    const authState = {
      state: {
        modal: {
          showAuthModal: true,
          modalType: 'changePassword',
        },
      },
    };

    ChangePasswordModal.mockImplementation(() => 'ChangePasswordModal');

    render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <AuthModal />
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    expect(ChangePasswordModal).toBeCalled();
  });

  it('renders changeConfirmation modal', () => {
    const authState = {
      state: {
        modal: {
          showAuthModal: true,
          modalType: 'changeConfirmation',
          params: {
            message: 'test message',
          },
        },
      },
    };

    SuccessModal.mockImplementation(() => 'SuccessModal');

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <AuthModal />
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    expect(SuccessModal).toBeCalled();
    expect(wrapper.text().includes(authState.state.modal.params.message));
  });

  it('renders systemForgotPassword modal', () => {
    const authState = {
      state: {
        modal: {
          showAuthModal: true,
          modalType: 'systemForgotPassword',
        },
      },
    };

    SystemForgotPasswordModal.mockImplementation(() => 'SystemForgotPasswordModal');

    render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <AuthModal />
        </AuthContext.Provider>
      </ThemeProvider>,
    );
    expect(SystemForgotPasswordModal).toBeCalled();
  });

  it('renders registrationsDisabled modal', () => {
    const authState = {
      state: {
        modal: {
          showAuthModal: true,
          modalType: 'registrationsDisabled',
        },
      },
    };

    RegistrationsDisabled.mockImplementation(() => 'RegistrationsDisabled');

    render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <AuthModal />
        </AuthContext.Provider>
      </ThemeProvider>,
    );
    expect(RegistrationsDisabled).toBeCalled();
  });
});
