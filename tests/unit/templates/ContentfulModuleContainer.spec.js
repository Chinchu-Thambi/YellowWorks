/* globals describe, it, expect, jest */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import { AuthProvider } from '../../../src/components/Auth/AuthContext';

import { theme } from '../../../src/util';
import Template from '../../../src/templates/ContentfulModuleContainer';

jest.mock('@aws-amplify/auth');

describe('ContentfulModuleContainer', () => {
  it('renders without breaking', () => {
    expect(() => {
      const { unmount } = render(<Template />);
      unmount();
    }).not.toThrow();
  });

  it('uses product or page content to map through modules', () => {
    const mockArray = [];
    mockArray.map = jest.fn();

    const data = {
      contentfulProduct: {
        modules: mockArray,
      },
      contentfulPage: {
        modules: [],
      },
    };

    render(
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Template data={data} />
        </ThemeProvider>
      </AuthProvider>,
    );

    expect(mockArray.map.mock.calls).toHaveLength(1);
  });
});
