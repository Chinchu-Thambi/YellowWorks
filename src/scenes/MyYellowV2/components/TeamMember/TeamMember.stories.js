import React from 'react';
import faker from 'faker';
import { text } from '@storybook/addon-knobs/react';
import TeamMember from '.';

export const Component = () => {
  const name = text('Name', 'Jane Doe');
  const role = text('Role', 'Cardiologist');
  const description = text('Description', `Z${faker.lorem.words(50)}`);
  const phone = text('Phone', '09 123 4567');
  const email = text('Email', 'jane.doe@cityhealth.co.nz');
  const [numDeleteCalls, setNumDeleteCalls] = React.useState(0);
  const [numEditCalls, setNumEditCalls] = React.useState(0);

  return (
    <div className="flex flex-col space-y-2.5 max-w-xl">
      <TeamMember
        name={name}
        jobTitle={role}
        description={description}
        imageURL="https://randomuser.me/api/portraits/women/26.jpg"
        phone={phone}
        email={email}
        onEdit={() => setNumEditCalls(numEditCalls + 1)}
        onDelete={() => setNumDeleteCalls(numDeleteCalls + 1)}
      />
      <TeamMember
        name="Mr. Noface McNocontact"
        jobTitle={role}
        description={description}
        onEdit={() => setNumEditCalls(numEditCalls + 1)}
        onDelete={() => setNumDeleteCalls(numDeleteCalls + 1)}
      />
      <div className="mt-5">Delete called {numDeleteCalls} times.</div>
      <div>Edit called {numEditCalls} times.</div>
    </div>
  );
};

export default {
  title: 'Manage Journey/Organisms/Team Member',
};
