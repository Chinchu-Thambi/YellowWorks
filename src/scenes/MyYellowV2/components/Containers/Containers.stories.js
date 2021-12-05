import { faSkating } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { DeleteIconButton, EditIconButton } from '../IconButtons';
import { AddIconButton } from '../IconButtons/IconButtons';
import {
  OneColumnContainer, TwoColumnContainer, Card, ContentWithIcon,
} from '.';

export const OneColumn = () => (
  <OneColumnContainer
    title="Container title"
    subtitle="This is some extra text that goes under the title. It's typically longer, perhaps an explainer for what's in the section represented by this two column container."
  >
    <div className="bg-indigo-200 h-48 w-full flex justify-center items-center">the contents</div>
  </OneColumnContainer>
);

export const OneColumnWithAction = () => (
  <OneColumnContainer
    title="Container title"
    subtitle="This is some extra text that goes under the title. Perhaps an explainer for what's in this section."
    actionButton={<AddIconButton />}
  >
    <div className="bg-indigo-200 h-48 w-full flex justify-center items-center">the contents</div>
  </OneColumnContainer>
);

export const OneColumnWithCard = () => (
  <OneColumnContainer
    title="Container title"
    subtitle="This is some extra text that goes under the title. It's typically longer, perhaps an explainer for what's in the section represented by this two column container."
  >
    <Card iconButtons={[<DeleteIconButton />, <EditIconButton />]} style={{ width: '100%' }}>
      <div className="bg-indigo-200 h-64 w-full flex items-center justify-center">card contents</div>
    </Card>
  </OneColumnContainer>
);

export const OneColumnWithActionWithCard = () => (
  <OneColumnContainer
    title="Container title"
    subtitle="This is some extra text that goes under the title. Perhaps an explainer for what's in this section."
    actionButton={<AddIconButton />}
  >
    <Card iconButtons={[<DeleteIconButton />, <EditIconButton />]} style={{ width: '100%' }}>
      <div className="bg-green-200 h-64 w-full flex items-center justify-center">card contents</div>
    </Card>
  </OneColumnContainer>
);

export const TwoColumn = () => (
  <TwoColumnContainer
    title="Container title"
    subtitle="This is some extra text that goes under the title. Perhaps an explainer for what's in this section."
  >
    <div className="bg-indigo-200 h-full w-full">the contents</div>
  </TwoColumnContainer>
);

export const TwoColumnWithSaveAndCancel = () => {
  const [action, setAction] = React.useState(null);

  return (
    <>
      <TwoColumnContainer
        title="Container title"
        subtitle="This is some extra text that goes under the title. Perhaps an explainer for what's in this section."
        primaryAction={{ label: 'Save', onClick: () => setAction('SAVE') }}
        secondaryAction={{ label: 'Cancel', onClick: () => setAction('CANCEL') }}
      >
        <div className="bg-indigo-200 h-full w-full">the contents</div>
      </TwoColumnContainer>
      <div className="bg-brand-200 p-3 rounded-md mt-5">
        ACTION = <strong>{action}</strong>
      </div>
    </>
  );
};

export const CardWithoutActions = () => (
  <Card>
    <div className="bg-green-200 h-64 w-full flex items-center justify-center">card contents</div>
  </Card>
);

export const CardWithActions = () => {
  const [numDeleteCalls, setNumDeleteCalls] = React.useState(0);
  const [numEditCalls, setNumEditCalls] = React.useState(0);

  return (
    <div>
      <Card
        iconButtons={[
          <DeleteIconButton onClick={() => setNumDeleteCalls(numDeleteCalls + 1)} />,
          <EditIconButton onClick={() => setNumEditCalls(numEditCalls + 1)} />,
        ]}
      >
        <div className="bg-green-200 h-64 w-full flex items-center justify-center">card contents</div>
      </Card>
      <div>Delete called {numDeleteCalls} times.</div>
      <div>Edit called {numEditCalls} times.</div>
    </div>
  );
};

export const ContentWithIcons = () => (
  <ContentWithIcon icon={<FontAwesomeIcon icon={faSkating} />}>
    <div>He was a skater boy</div>
  </ContentWithIcon>
);

export default {
  title: 'Manage Journey/Organisms/Containers',
};
