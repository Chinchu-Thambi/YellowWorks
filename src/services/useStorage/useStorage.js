import React from 'react';
import axios from 'axios';
import S3 from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';
import * as R from 'ramda';

import AuthContext from '../../components/Auth/AuthContext';

function encode(data) {
  const str = data.reduce((a, b) => a + String.fromCharCode(b), '');
  return btoa(str).replace(/.{76}(?=.)/g, '$&\n');
}

const loadedImages = [];
const maxCacheSize = 40;

const addToLoadedImages = ({ key, content }) => {
  if (loadedImages.length >= maxCacheSize) {
    loadedImages.shift();
  }
  loadedImages.push({
    key, content,
  });
};

let credentials;

function useStorage() {
  const { jwtToken, customerId } = React.useContext(AuthContext) || {};

  const getCredentials = async () => {
    if (credentials) {
      return credentials;
    }

    if (!customerId) throw Error('Customer Id is required');

    const query = `
      query {
        getContentSessionCredentials(
          customerId: "${customerId}" ) {
            credentials
        }
      }`;

    const { data: { data, errors } } = await axios.post(
      process.env.GATSBY_APPSYNC_URL,
      { query },
      { headers: { Authorization: jwtToken } },
    );

    if (errors) {
      // eslint-disable-next-line no-console
      console.log('An error occurred...', errors);
      throw errors;
    }
    const { getContentSessionCredentials: { credentials: loadedCredentials } } = data;
    const {
      AccessKeyId: accessKeyId,
      SecretAccessKey: secretAccessKey,
      SessionToken: sessionToken,
    } = JSON.parse(loadedCredentials);

    credentials = {
      accessKeyId,
      secretAccessKey,
      sessionToken,
    };

    return credentials;
  };

  const putToBucket = async ({
    ownerType, fileName, content, mimeType,
  }) => {
    const validOwnerTypes = ['users', 'customers'];
    if (!validOwnerTypes.includes(ownerType)) {
      throw new Error('Invalid Owner Type');
    }
    const {
      accessKeyId,
      secretAccessKey,
      sessionToken,
    } = await getCredentials({ customerId });

    const key = `${ownerType}/${customerId}/content/${uuid()}/${fileName}`;

    const s3 = new S3({
      region: process.env.GATSBY_AWS_REGION,
      bucket: process.env.GATSBY_S3_BUCKET,
      accessKeyId,
      secretAccessKey,
      sessionToken,
    });

    return new Promise((resolve, reject) => {
      s3.upload(
        {
          Bucket: process.env.GATSBY_S3_BUCKET,
          Key: key,
          Body: content,
          ContentType: mimeType,
        },
        (err, data) => {
          if (err) reject(err);
          else {
            resolve({
              ...data,
              contentUrl: `s3://${process.env.GATSBY_S3_BUCKET}/${key}`,
              mimeType,
            });
          } // successful response
        },
      );
    });
  };

  const getObject = async ({
    key,
  }) => {
    const existingImage = R.find(R.propEq('key', key))(loadedImages);
    if (existingImage) {
      return existingImage.content;
    }

    const {
      accessKeyId,
      secretAccessKey,
      sessionToken,
    } = await getCredentials({ customerId });

    const s3 = new S3({
      region: process.env.GATSBY_AWS_REGION,
      bucket: process.env.GATSBY_S3_BUCKET,
      accessKeyId,
      secretAccessKey,
      sessionToken,
    });

    return new Promise((resolve) => {
      s3.getObject({
        Bucket: process.env.GATSBY_S3_BUCKET,
        Key: key,
      }, (err, data) => {
        if (data === null) {
          credentials = undefined;
          resolve(getObject({ key }));
          return;
        }

        const base64src = `data:image/jpeg;base64,${encode(data.Body)}`;
        addToLoadedImages({
          key, content: base64src,
        });
        resolve(base64src);
      });
    });
  };

  const storage = {
    putToBucket,
    getObject,
  };

  return storage;
}


export default useStorage;

export const getS3Attributes = (contentUrl) => {
  if (!contentUrl) {
    return null;
  }

  const rawUrl = contentUrl.replace('s3://', '');
  const firstSlash = rawUrl.indexOf('/');
  const bucket = rawUrl.substr(0, firstSlash);
  const key = rawUrl.substr(firstSlash + 1);

  return {
    bucket,
    key,
  };
};
