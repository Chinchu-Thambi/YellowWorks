import axios from 'axios';
import { renderHook } from '@testing-library/react-hooks';

import useAssetAuthentication from './useAssetAuthentication';

describe('useAssetAuthentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('posts authentication token to assets endpoint', () => {
    const jwtToken = '123';
    renderHook(() => {
      useAssetAuthentication({ jwtToken });
    });

    expect(axios.post.mock.calls[0][2]).toEqual(
      {
        headers: { Authorization: jwtToken },
        withCredentials: true,
      },
    );
  });

  it('does nothing if token is not available', () => {
    renderHook(() => useAssetAuthentication());

    expect(axios.post).not.toBeCalled();
  });
});
