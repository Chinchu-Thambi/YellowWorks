/* eslint-disable react/prop-types */
import React from 'react';
import * as R from 'ramda';
import { Controller, useForm } from 'react-hook-form';
import { DeleteConfirmationDialog, OptionalDialog } from '../../components/Dialogs';
import { Input, TextArea } from '../../../../components/FormElements';
import useBusinessForm from '../products/ManageWebsite/services/useBusinessForm';
import { OneColumnContainer } from '../../components/Containers';
import { AddIconButton } from '../../components/IconButtons/IconButtons';
import Product from '../../components/Product';
import ChooseImage from '../BusinessDetails/components/CoreBusinessDetails/components/ChooseImage/ChooseImage';

/**
 * Adds a new entry (or edits existing if index >= 0) to a clone of initialProducts and returns it on confirmation via onProductsUpdated
 * @type {(isVisible: boolean, initialProducts?: [], index: number, onProductsUpdated: (updatedProducts?: []) => void) => JSX.Element}
 */
export const AddOrEditProductEntry = ({
  isVisible, initialProducts, index, onProductsUpdated,
}) => {
  const isAdd = index <= -1;
  const { register, handleSubmit, control } = useForm();

  const onAddOrEdit = (formData) => {
    const { name, description, image } = formData;
    const cloneProducts = initialProducts ? [...initialProducts] : [];

    if (isAdd) {
      cloneProducts.push({ name, description, image });
      onProductsUpdated(cloneProducts);
    } else {
      cloneProducts[index] = { name, description, image };
      onProductsUpdated(cloneProducts);
    }
  };

  const cancel = () => {
    // no change - the parent needs this as it closes the modal after the callback is called
    onProductsUpdated(initialProducts);
  };

  return (
    <>
      {isVisible && (
        <OptionalDialog
          isVisible
          affirmativeOption={index >= 0 ? 'SAVE' : 'ADD'}
          rejectOption="CANCEL"
          title={`${index >= 0 ? 'Edit' : 'Add'} Product or Service`}
          onDecision={(choseAffirmative) => {
            if (choseAffirmative) {
              handleSubmit(onAddOrEdit)();
            } else {
              handleSubmit(cancel)();
            }
          }}
          message={(
            <div className="flex flex-col space-y-3 mt-2">
              <Controller
                name="image"
                control={control}
                defaultValue={isAdd ? null : initialProducts[index].image}
                render={({ value, onChange }) => (
                  <ChooseImage id="product-image" label="Product image" value={value} onSelect={onChange} />
                )}
              />
              <Input
                id="product-name"
                label="Name"
                name="name"
                ref={register}
                defaultValue={isAdd ? null : initialProducts[index].name}
              />
              <TextArea
                id="product-description"
                label="Description"
                name="description"
                ref={register}
                defaultValue={isAdd ? null : initialProducts[index].description}
              />
            </div>
          )}
        />
      )}
    </>
  );
};

/**
 * Deletes product at index from initialProducts and returns a cloned version of the updated FAQ array on confirmation via onProductsUpdated
 * @type {(isVisible: boolean, initialProducts?: [], index: number, onProductsUpdated: (updatedProducts?: []) => void) => JSX.Element}
 */
export const PotentiallyDeleteFAQEntry = ({
  isVisible, initialProducts, index, onProductsUpdated,
}) => {
  const deleteProduct = () => {
    const cloneProducts = [...initialProducts];
    const productsWithItemRemoved = R.remove(index, 1, cloneProducts);
    onProductsUpdated(productsWithItemRemoved);
  };

  const cancel = () => {
    // no change - the parent needs this as it closes the modal after the callback is called
    onProductsUpdated(initialProducts);
  };

  return (
    <>
      {isVisible && (
        <DeleteConfirmationDialog
          isVisible // this is to take it out of the dom altogether when not visible...
          title="Delete Product or Service"
          message="Are you sure you want to delete this product or service?"
          onDecision={(choseAffirmative) => {
            if (choseAffirmative) {
              deleteProduct();
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
const ManageProductsAndServices = () => {
  const [addOrEditProductDialogIsVisible, setAddOrEditProductDialogIsVisible] = React.useState(false);
  const [productIndexToEdit, setProductIndexToEdit] = React.useState(-1);

  const [deleteConfirmationDialogIsVisible, setDeleteConfirmationDialogIsVisible] = React.useState(false);
  const [productIndexToPotentiallyDelete, setProductIndexToPotentiallyDelete] = React.useState(-1);

  const businessSubset = {
    products: ['products'],
  };

  const { formHook, contextData, commitFields } = useBusinessForm({ businessSubset });

  const saveProducts = () => {
    commitFields(['products']);
  };

  return (
    <>
      <Controller
        name="products"
        control={formHook.control}
        defaultValue={contextData.products}
        render={({ value, onChange }) => (
          <>
            <AddOrEditProductEntry
              isVisible={addOrEditProductDialogIsVisible}
              initialProducts={value}
              index={productIndexToEdit}
              onProductsUpdated={(updatedProducts) => {
                onChange(updatedProducts); // writes updated FAQs (with added product) into form's model/values
                saveProducts(); // reads from form model/values and saves to backend
                setAddOrEditProductDialogIsVisible(false); // hides the edit/add dialog
              }}
            />
            <PotentiallyDeleteFAQEntry
              isVisible={deleteConfirmationDialogIsVisible}
              initialProducts={value}
              index={productIndexToPotentiallyDelete}
              onProductsUpdated={(updatedProducts) => {
                onChange(updatedProducts);
                saveProducts();
                setDeleteConfirmationDialogIsVisible(false);
              }}
            />
          </>
        )}
      />
      <OneColumnContainer
        title="Products & Services"
        subtitle="Add/Manage your business products and services here."
        actionButton={(
          <AddIconButton
            onClick={() => {
              setProductIndexToEdit(-1);
              setAddOrEditProductDialogIsVisible(true);
            }}
          />
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full">
          {contextData?.products?.map((prod, i) => (
            <Product
              key={i}
              name={prod.name}
              description={prod.description}
              image={prod.image}
              onEdit={() => {
                setProductIndexToEdit(i);
                setAddOrEditProductDialogIsVisible(true);
              }}
              onDelete={() => {
                setProductIndexToPotentiallyDelete(i);
                setDeleteConfirmationDialogIsVisible(true);
              }}
            />
          ))}
        </div>
      </OneColumnContainer>
    </>
  );
};

export default ManageProductsAndServices;
