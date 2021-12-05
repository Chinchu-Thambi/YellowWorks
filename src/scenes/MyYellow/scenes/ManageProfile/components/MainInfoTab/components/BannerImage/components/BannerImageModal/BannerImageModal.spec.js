/* globals describe, it, expect, jest, File */

import React from 'react';
import {
  render, fireEvent, act,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import axios from 'axios';
import theme from '../../../../../../../../../../util/theme';

import getFileContent from '../../../../../ImageUpload/services/getFileContent';

import BannerImageModal from './BannerImageModal';
import AuthContext from '../../../../../../../../../../components/Auth/AuthContext';
import ProductContext from '../../../../../../../../services/ProductContext';

const mockUpload = jest.fn();

jest.mock('../../../../../ImageUpload/services/getFileContent');
jest.mock('aws-sdk/clients/s3', () => jest.fn(() => ({
  getObject: jest.fn(),
  upload: mockUpload,
})));

const productState = {
  orderDetails: {
    userSchema: {
      metadata: {
        sku: [{ value: 'YPPREMIUM' }],
      },
    },
  },
};
describe('<ImageGallery>', () => {
  it('renders without crashing', () => {
    const wrapper = render(
      <ThemeProvider theme={theme}>
        <BannerImageModal />
      </ThemeProvider>,
    );
    expect(wrapper).toBeTruthy();
  });

  it('test file upload', async () => {
    // rendering image gallery
    const authState = {
      customerId: 'customerId',
      jwtToken: 'jwtToken',
    };
    const wrapper = await render(
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authState}>
          <ProductContext.Provider value={productState}>
            <BannerImageModal />
          </ProductContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>,
    );

    // defining file object
    const fileContent = '(V●ᴥ●V)';
    const fileName = 'pupper.jpeg';
    const file = new File([fileContent], fileName, { type: 'image/jpeg' });

    // selecting input element
    const inputEl = wrapper.getByTestId('file-input');

    // `input.files = [file]` is not allowed
    Object.defineProperty(inputEl, 'files', {
      value: [file],
    });

    axios.post.mockResolvedValue({
      data: {
        data: {
          getContentSessionCredentials: {
            credentials: `{
              "AccessKeyId": "accessKeyId",
              "SecretAccessKey": "secretAccessKey",
              "SessionToken": "sessionToken"
            }`,
          },
        },
      },
    });

    // mocking services
    getFileContent.mockImplementation(async (e) => e);
    mockUpload.mockImplementation((...args) => { args[1](null, {}); });

    // firing change event
    await act(async () => {
      fireEvent.change(inputEl);
    });

    // expect s3 upload to have been called with the file
    expect(mockUpload.mock.calls[0][0].Key).toContain(fileName);
  });

  // @TODO: Add test when buttons are available
  // it('renders upload image and video button', () => {
  //   expect(wrapper.find('[data-testId="UploadButtonsContainer"] button').first().text()).toBe('ADD IMAGE');
  // });
});
