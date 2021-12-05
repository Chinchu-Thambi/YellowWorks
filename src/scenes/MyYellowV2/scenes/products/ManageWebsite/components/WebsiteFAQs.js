/* eslint-disable react/prop-types */
import React from 'react';
import * as R from 'ramda';
import { Controller, useForm } from 'react-hook-form';
import { Card, OneColumnContainer } from '../../../../components/Containers';
import { DeleteConfirmationDialog, OptionalDialog } from '../../../../components/Dialogs';
import { Input, TextArea } from '../../../../../../components/FormElements';
import { AddIconButton, DeleteIconButton, EditIconButton } from '../../../../components/IconButtons/IconButtons';
import useBusinessForm from '../services/useBusinessForm';

/**
 * Adds a new entry (or edits existing if index >= 0) to a clone of initialFAQs and returns it on confirmation via onFAQsUpdated
 * @type {(isVisible: boolean, initialFAQs?: [], index: number, onFAQsUpdated: (updatedFAQs?: []) => void) => JSX.Element}
 */
const AddOrEditFAQEntry = ({
  isVisible, initialFAQs, index, onFAQsUpdated,
}) => {
  const isAdd = index <= -1;
  const { register, handleSubmit } = useForm();

  const onAddOrEdit = (formData) => {
    const q = formData.question;
    const a = formData.answer;
    const cloneFAQs = initialFAQs ? [...initialFAQs] : [];

    if (isAdd) {
      cloneFAQs.push({ question: q, answer: a });
      onFAQsUpdated(cloneFAQs);
    } else {
      cloneFAQs[index] = { question: q, answer: a };
      onFAQsUpdated(cloneFAQs);
    }
  };

  const cancel = () => {
    // no change - the parent needs this as it closes the modal after the callback is called
    onFAQsUpdated(initialFAQs);
  };

  return (
    <>
      {isVisible && (
        <OptionalDialog
          isVisible
          affirmativeOption={index >= 0 ? 'SAVE' : 'ADD'}
          rejectOption="CANCEL"
          title={`${index >= 0 ? 'Edit' : 'Add'} FAQ entry`}
          onDecision={(choseAffirmative) => {
            if (choseAffirmative) {
              handleSubmit(onAddOrEdit)();
            } else {
              handleSubmit(cancel)();
            }
          }}
          message={(
            <div className="flex flex-col space-y-3 mt-2">
              <Input
                id="faq-question"
                label="Question"
                name="question"
                ref={register}
                defaultValue={isAdd ? null : initialFAQs[index].question}
              />
              <TextArea
                id="faq-answer"
                label="Answer"
                name="answer"
                ref={register}
                defaultValue={isAdd ? null : initialFAQs[index].answer}
              />
            </div>
          )}
        />
      )}
    </>
  );
};

/**
 * Deletes faq at index from initialFAQs and returns a cloned version of the updated FAQ array on confirmation via onFAQsUpdated
 * @type {(isVisible: boolean, initialFAQs?: [], index: number, onFAQsUpdated: (updatedFAQs?: []) => void) => JSX.Element}
 */
const PotentiallyDeleteFAQEntry = ({
  isVisible, initialFAQs, index, onFAQsUpdated,
}) => {
  const deleteFAQItem = () => {
    const cloneFAQs = [...initialFAQs];
    const faqsWithItemRemoved = R.remove(index, 1, cloneFAQs);
    onFAQsUpdated(faqsWithItemRemoved);
  };

  const cancel = () => {
    // no change - the parent needs this as it closes the modal after the callback is called
    onFAQsUpdated(initialFAQs);
  };

  return (
    <>
      {isVisible && (
        <DeleteConfirmationDialog
          isVisible // this is to take it out of the dom altogether when not visible...
          title="Delete FAQ entry"
          message="Are you sure you want to delete this FAQ entry?"
          onDecision={(choseAffirmative) => {
            if (choseAffirmative) {
              deleteFAQItem();
            } else {
              cancel();
            }
          }}
        />
      )}
    </>
  );
};

/**
 * Manages FAQs - add, edit, and delete.
 */
const WebsiteFAQs = () => {
  const [addOrEditFAQDialogIsVisible, setAddOrEditFAQDialogIsVisible] = React.useState(false);
  const [faqIndexToEdit, setFAQIndexToEdit] = React.useState(-1);

  const [deleteConfirmationDialogIsVisible, setDeleteConfirmationDialogIsVisible] = React.useState(false);
  const [faqIndexToPotentiallyDelete, setFaqIndexToPotentiallyDelete] = React.useState(-1);

  const businessSubset = {
    faqs: ['providerConfiguration', 'yellowWebsite', 'faqs'],
  };

  const { formHook, contextData, commitFields } = useBusinessForm({ businessSubset });

  const saveFAQs = () => {
    commitFields(['faqs']);
  };

  return (
    <>
      <Controller
        name="faqs"
        control={formHook.control}
        defaultValue={contextData.faqs}
        render={({ value, onChange }) => (
          <>
            <AddOrEditFAQEntry
              isVisible={addOrEditFAQDialogIsVisible}
              initialFAQs={value}
              index={faqIndexToEdit}
              onFAQsUpdated={(val) => {
                onChange(val); // writes updated FAQs (with added faq) into form's model/values
                saveFAQs(); // reads from form model/values and saves to backend
                setAddOrEditFAQDialogIsVisible(false); // hides the edit/add dialog
              }}
            />
            <PotentiallyDeleteFAQEntry
              isVisible={deleteConfirmationDialogIsVisible}
              initialFAQs={value}
              index={faqIndexToPotentiallyDelete}
              onFAQsUpdated={(updatedFAQs) => {
                onChange(updatedFAQs);
                saveFAQs();
                setDeleteConfirmationDialogIsVisible(false);
              }}
            />
          </>
        )}
      />
      <OneColumnContainer
        title="Frequently Asked Questions (FAQs)"
        subtitle="These will be shown on the FAQ part of your Website"
        actionButton={(
          <AddIconButton
            onClick={() => {
              setFAQIndexToEdit(-1);
              setAddOrEditFAQDialogIsVisible(true);
            }}
          />
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full">
          {contextData?.faqs?.map((faq, i) => (
            <Card
              key={i}
              iconButtons={[
                <DeleteIconButton
                  onClick={() => {
                    setFaqIndexToPotentiallyDelete(i);
                    setDeleteConfirmationDialogIsVisible(true);
                  }}
                />,
                <EditIconButton
                  onClick={() => {
                    setFAQIndexToEdit(i);
                    setAddOrEditFAQDialogIsVisible(true);
                  }}
                />,
              ]}
            >
              <div className="font-bold mb-1">Question</div>
              <div>{faq.question}</div>
              <div className="font-bold mt-3 mb-1">Answer</div>
              <div>{faq.answer}</div>
            </Card>
          ))}
        </div>
      </OneColumnContainer>
    </>
  );
};

export default WebsiteFAQs;
