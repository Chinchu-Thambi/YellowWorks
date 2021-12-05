
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import analyticsNoDataArtwork from '../../assets/icons/analytics-no-data.svg';
import { theme } from '../../util';

import ActionableNotice from './ActionableNotice';

describe('ActionableNotice', () => {
  it('should render properties correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <ActionableNotice
          title="sample title"
          text="sample text"
          action={{ text: 'sample action label' }}
          art={{
            image: analyticsNoDataArtwork,
            scalePercent: 15,
          }}
        />
      </ThemeProvider>,
    );

    screen.getByRole('img');
    screen.getByRole('heading', { name: 'sample title' });
    screen.getByText('sample text');
    screen.getByRole('button', { name: 'sample action label' });
  });
});
