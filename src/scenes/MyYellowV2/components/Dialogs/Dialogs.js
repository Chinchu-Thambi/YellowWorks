/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';

/**
 * @type {(title: string, message: string, onDecision: Function, affirmativeOption: string, rejectOption: string, isDestructive: boolean, rest?: any) => JSX.Element}
 */
export const OptionalDialog = ({
  title,
  message,
  onDecision,
  affirmativeOption = 'OK',
  rejectOption = 'CANCEL',
  isDestructive = false,
  ...rest
}) => (
  <Modal isVisible {...rest}>
    <div className="flex flex-col min-w-17">
      <div className="font-bold text-lg mb-2">{title}</div>
      <div>{message}</div>
      <div className="ml-auto flex space-x-2 mt-4">
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => {
            onDecision(false);
          }}
        >
          {rejectOption}
        </Button>
        <Button
          variant={isDestructive ? 'danger' : 'primary'}
          size="sm"
          onClick={() => {
            onDecision(true);
          }}
        >
          {affirmativeOption}
        </Button>
      </div>
    </div>
  </Modal>
);

/**
 * @type {(props: {title: string, message: string, onDecision}) => JSX.Element}
 */
export const DeleteConfirmationDialog = (props) => (
  <OptionalDialog {...props} rejectOption="NO" affirmativeOption="YES" isDestructive />
);
