import React from 'react';
import { DeleteIconButton, EditIconButton } from '.';

export const WithoutText = () => {
  const [deleteClickCount, setDeleteClickCount] = React.useState(0);
  const [editClickCount, setEditClickCount] = React.useState(0);

  return (
    <div className="flex space-x-5">
      <div className="flex flex-col space-y-2 items-center">
        <DeleteIconButton onClick={() => setDeleteClickCount(deleteClickCount + 1)} />
        <div>
          Delete button clicked <strong>{deleteClickCount}</strong> times.
        </div>
      </div>
      <div className="flex flex-col space-y-2 items-center">
        <EditIconButton onClick={() => setEditClickCount(editClickCount + 1)} />
        <div>
          Edit button clicked <strong>{editClickCount}</strong> times.
        </div>
      </div>
    </div>
  );
};

export const WithText = () => {
  const [editClickCount, setEditClickCount] = React.useState(0);

  return (
    <div className="flex space-x-5">
      <div className="flex flex-col space-y-2 items-center">
        <EditIconButton label="Edit Photos" onClick={() => setEditClickCount(editClickCount + 1)} />
        <div>
          Edit photos button clicked <strong>{editClickCount}</strong> times.
        </div>
      </div>
    </div>
  );
};

export default {
  title: 'Manage Journey/Atoms/IconButtons',
};
