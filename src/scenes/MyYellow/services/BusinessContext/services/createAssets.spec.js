
import axios from 'axios';

import createAssets from './createAssets';

import assetModel from './__mocks__/assetModel';

describe('createAssets', () => {
  const token = 'token';
  const customerId = 'customerId';
  const businessId = 'businessId';

  const files = [
    { file: new File([''], 'file name'), url: 'file url', id: 'file id' },
    { file: new File([''], 'file name 2'), url: 'file url 2', id: 'file id 2' },
  ];

  axios.post.mockImplementation(() => ({
    data: {
      data: {
        createAsset: assetModel,
      },
    },
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('given a token, customer id and business id,  returns a function', () => {
    expect(typeof createAssets(token, customerId, businessId)).toBe('function');
  });

  it('posts an axios graphql query', async () => {
    await createAssets(token, customerId, businessId)(files);

    expect(axios.post).toBeCalledTimes(files.length);
    expect(axios.post.mock.calls[0][1].query).toContain('mutation CreateAsset');
    expect(axios.post.mock.calls[0][1].query).toMatchSnapshot();
    expect(axios.post.mock.calls[0][1].variables).toEqual({
      caption: files[0].file.name, businessId, customerId, contentUrl: files[0].url,
    });
    expect(axios.post.mock.calls[0][2].headers.Authorization).toBe(token);

    expect(axios.post.mock.calls[1][1].variables).toEqual({
      caption: files[1].file.name, businessId, customerId, contentUrl: files[1].url,
    });
  });

  it('transforms axios post in createdAsset', async () => {
    const createdAssets = await createAssets(token, customerId, businessId)(files);

    expect(createdAssets[0]).toEqual(assetModel);
  });
});
