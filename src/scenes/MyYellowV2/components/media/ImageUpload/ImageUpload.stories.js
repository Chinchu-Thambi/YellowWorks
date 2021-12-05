import React from 'react';
import { text } from '@storybook/addon-knobs/react';

import AuthContext from '../../../../../components/Auth/AuthContext';

import ImageUpload from '.';

const defaultToken = 'eyJraWQiOiJhODRIUnJsbEdGemdTSkRGWUZNMjJvVjVNQTYrcGVEcUI0M0NcL1MxRjRSST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5YjQ2MTA1Mi0xZWI5LTRkNWMtODZlNy0wNDA5NzhkNDRiMjkiLCJjb2duaXRvOmdyb3VwcyI6WyJ1c2VycyJdLCJjdXN0b206Y29udGFjdF9pZCI6IjQwNTMyMDEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTJfQ2lLV2JuMWhnIiwiY29nbml0bzp1c2VybmFtZSI6IjliNDYxMDUyLTFlYjktNGQ1Yy04NmU3LTA0MDk3OGQ0NGIyOSIsImdpdmVuX25hbWUiOiJNZWciLCJjdXN0b206YWNjb3VudHMiOiJ7XCI1MDM1MzgzNTEyXCI6e1wic3RyaXBlXCI6XCJjdXNfSWFBeTJ4cm5jNkJEZXpcIn19IiwiYXVkIjoiNG1uMjY2bzUydHNnYWc5MHYwNTlzbzM5dW4iLCJldmVudF9pZCI6IjkwMDk0ODFhLTViM2EtNDVmYS04NTU3LWM4MzJjNjM3NmMzYyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjEwNDk2NDIwLCJleHAiOjE2MTA1ODQ2NzYsImlhdCI6MTYxMDU4MTA3NiwiZmFtaWx5X25hbWUiOiJIb3BlIiwiZW1haWwiOiJtZWdnaG9wZStuZXd3b3JsZEBnbWFpbC5jb20ifQ.VSt4mIkMmWsQfHaqKqJCpM6Qikyea5CJiOrvvKZBwGTUVcd1Z-ws0gQdc3EWghg6f8gItuaVSXPjLvD-LmvKAtyiI3zcC0Q6clBs93ckci4k_rA_ecDuEeniHxNEC8d91BYvS70dEMrKgPIz_SCbTEtMber88Pzx1m06-JifWLeWpxRaIBlB5QwOcSHQfm3YJiCuJ4aYSkWs5YBNb9M8RyT6REg4e5WTbfzTBCLtX7fJmm4pD4qe1gin8m5K7MTfLZTUIJvznrQzMSb0WxY93sePcuJjwDYfnnipAFC66RjksG1QUrGT9JvcGM2uAy6W76X-WbFLFIZmT5-slPSGmQ';
const defaultCustomerId = '5035383512';
const defaultBusinessId = 'QlVTSU5FU1MjSkVYd0xERFI3WTcwSHFnNDU0NTQ';

export const UploadImageFile = () => {
  const jwtToken = text('token', defaultToken);
  const customerId = text('customerid', defaultCustomerId);
  const businessId = text('businessid', defaultBusinessId);

  return (
    <AuthContext.Provider value={{ jwtToken, customerId, businessId }}>
      <ImageUpload onUpload={console.log} />
    </AuthContext.Provider>
  );
};

export default {
  title: 'Components/ImageUpload',
};
