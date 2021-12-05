/* globals describe, it, jest, expect */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import AuthContext from '../../../../components/Auth';
import { theme } from '../../../../util';

import WelcomeModal from './WelcomeModal';

describe('WelcomeModal', () => {
  const authState = { jwtToken: '1' };

  const context = 'WelcomeTest';
  const contentText = 'contentText';
  const ContentComponent = jest.fn(() => contentText);

  it('renders nothing to logged out users', async () => {
    render(
      <ThemeProvider theme={theme}>
        <WelcomeModal context="UniqueContext">
          <ContentComponent />
        </WelcomeModal>
      </ThemeProvider>,
    );

    const textElement = await screen.queryByText(contentText);
    expect(textElement).toBeNull();
  });

  it('renders children in a modal', async () => {
    render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <WelcomeModal context={context}>
            <ContentComponent />
          </WelcomeModal>
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    // renders component
    expect(ContentComponent).toBeCalled();
    let textElement = await screen.findByText(contentText);

    // dismisses modal
    fireEvent.keyDown(textElement, { key: 'Escape', code: 'Escape' });
    textElement = await screen.queryByText(contentText);
    expect(textElement).toBeNull();
  });

  it('does not render the same context twice', async () => {
    render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <WelcomeModal context={context}>
            <ContentComponent />
          </WelcomeModal>
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    const textElement = await screen.queryByText(contentText);
    expect(textElement).toBeNull();
  });

  it('a dismiss function in the child component closes the modal', async () => {
    // eslint-disable-next-line react/prop-types
    const ButtonComponent = ({ dismiss }) => (
      <button type="button" onClick={dismiss}>{contentText}</button>
    );

    render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <WelcomeModal context="UniqueContext2">
            <ButtonComponent />
          </WelcomeModal>
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    let textElement = await screen.findByText(contentText);
    textElement.click();

    textElement = await screen.queryByText(contentText);
    expect(textElement).toBeNull();
  });
});
