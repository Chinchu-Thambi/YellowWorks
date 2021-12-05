import React from 'react';
import Button from '../../../../components/Button';
import { DeleteConfirmationDialog, OptionalDialog } from '.';

export const DeleteConfirmationDialogExample = () => {
  const [dialogShouldBeVisible, setDialogShouldBeVisible] = React.useState(false);
  const [decision, setDecision] = React.useState(null);

  return (
    <div>
      <Button variant="primary" onClick={() => setDialogShouldBeVisible(true)}>
        Open modal
      </Button>
      {dialogShouldBeVisible && (
        <DeleteConfirmationDialog
          title="Delete photo"
          message="Are you sure you want to delete this photo?"
          onDecision={(didChooseAffirmatively) => {
            setDecision(didChooseAffirmatively);
            setDialogShouldBeVisible(false);
          }}
          onDismiss={() => setDialogShouldBeVisible(false)}
        />
      )}
      {decision !== null && (
        <div className="my-2 p-3 rounded-md bg-brand-200">Decision: {decision ? 'AFFIRMATIVE' : 'REJECTED'}</div>
      )}
    </div>
  );
};

export const GenericConfirmationDialogExample = () => {
  const [dialogShouldBeVisible, setDialogShouldBeVisible] = React.useState(false);
  const [decision, setDecision] = React.useState(null);

  return (
    <div>
      <Button variant="primary" onClick={() => setDialogShouldBeVisible(true)}>
        Open modal
      </Button>
      {dialogShouldBeVisible && (
        <OptionalDialog
          title="A generic action"
          message="Are you sure you want to proceed?"
          onDecision={(didChooseAffirmatively) => {
            setDecision(didChooseAffirmatively);
            setDialogShouldBeVisible(false);
          }}
          onDismiss={() => setDialogShouldBeVisible(false)}
        />
      )}
      {decision !== null && (
        <div className="my-2 p-3 rounded-md bg-brand-200">Decision: {decision ? 'AFFIRMATIVE' : 'REJECTED'}</div>
      )}
    </div>
  );
};

export default {
  title: 'Manage Journey/Organisms/Optional Dialog',
};
