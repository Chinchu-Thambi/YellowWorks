import React from 'react';
import axios from 'axios';

const endpoint = process.env.GATSBY_ASSETS_ENDPOINT ?? 'https://product-assets.yellow.co.nz/authorize';

const useAssetAuthentication = ({ jwtToken } = {}) => {
  React.useEffect(() => {
    if (!jwtToken) return;

    axios.post(
      endpoint, undefined,
      {
        headers: {
          Authorization: jwtToken,
        },
        withCredentials: true,
      },
    );
  }, [jwtToken]);
};

export default useAssetAuthentication;
