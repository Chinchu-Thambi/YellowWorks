/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

const CustomWidget = (props) => {
  const [value, setValue] = React.useState('');

  return (
    <input
      onClick={() => setValue('I\'m a custom widget!')}
      {...props}
      value={value}
    />
  );
};

export default CustomWidget;
