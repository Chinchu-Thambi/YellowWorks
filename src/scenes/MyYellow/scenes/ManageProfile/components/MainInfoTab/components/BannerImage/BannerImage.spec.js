/* globals describe, it, expect, jest */

import React from 'react';
import {
  render,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../../../../../../../util/theme';

import BannerImage from './BannerImage';

const mockUpload = jest.fn();

jest.mock('../../../ImageUpload/services/getFileContent');
jest.mock('aws-sdk/clients/s3', () => jest.fn(() => ({
  getObject: jest.fn(),
  upload: mockUpload,
})));

describe('<ImageGallery>', () => {
  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <BannerImage />
      </ThemeProvider>,
    );
    expect(wrapper).toBeTruthy();
  });
});
