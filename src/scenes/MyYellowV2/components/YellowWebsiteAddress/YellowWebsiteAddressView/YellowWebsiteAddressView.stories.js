import React from 'react';
import { select } from '@storybook/addon-knobs/react';
import YellowWebsiteAddressView from './YellowWebsiteAddressView';

export const Component = () => {
  const status = select('Status', ['', 'available', 'unavailable', 'checking']);
  const [inputText, setInputText] = React.useState();

  return (
    <>
      <YellowWebsiteAddressView onChange={(userText) => setInputText(userText)} status={status} />
      <div className="p-3 mt-20 bg-gray-200 text-gray-900">
        <div>
          Input text: <strong>{inputText}</strong>
        </div>
      </div>
    </>
  );
};

export default {
  title: 'Manage Journey/Organisms/Yellow website address checker view',
};
