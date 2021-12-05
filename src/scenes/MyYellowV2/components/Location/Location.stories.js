import React from 'react';
import { text } from '@storybook/addon-knobs/react';
import Location from '.';

export const Component = () => {
  const name = text('Name', 'Fancy Burgers - Auckland');
  const phone = text('Phone', '09 123 4567');
  const email = text('Email', 'auckland@bobsburgers.co.nz');
  const [numDeleteCalls, setNumDeleteCalls] = React.useState(0);
  const [numEditCalls, setNumEditCalls] = React.useState(0);
  const [isMain, setIsMain] = React.useState(true);

  return (
    <div>
      <Location
        name={name}
        addressLines={['604 Great South Rd', 'Ellerslie', 'Auckland 1234']}
        phone={phone}
        email={email}
        openingHours={[
          {
            days: 'Mon - Fri',
            hours: '9 AM - 5 PM',
          },
          {
            days: 'Sat & Sun',
            hours: '10 AM - 3 PM',
          },
        ]}
        onEdit={() => setNumEditCalls(numEditCalls + 1)}
        onDelete={() => setNumDeleteCalls(numDeleteCalls + 1)}
        onToggleAsMain={() => setIsMain(!isMain)}
        isMain={isMain}
      />
      <div className="mt-5">Delete called {numDeleteCalls} times.</div>
      <div>Edit called {numEditCalls} times.</div>
    </div>
  );
};

export default {
  title: 'Manage Journey/Organisms/Business Location',
};
