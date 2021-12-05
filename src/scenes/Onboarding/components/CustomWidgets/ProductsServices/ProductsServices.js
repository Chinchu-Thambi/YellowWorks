import React from 'react';
import PropTypes from 'prop-types';
import { OneColumnContainer } from '../../../../MyYellowV2/components/Containers';
import { AddIconButton } from '../../../../MyYellowV2/components/IconButtons/IconButtons';
import { AddOrEditProductEntry, PotentiallyDeleteFAQEntry } from '../../../../MyYellowV2/scenes/ProductsAndServices/ManageProductsAndServices';
import Product from '../../../../MyYellowV2/components/Product';

const ProductsServices = (props) => {
  const {
    formData, onChange,
  } = props;
  const [addOrEditProductDialogIsVisible, setAddOrEditProductDialogIsVisible] = React.useState(false);
  const [productIndexToEdit, setProductIndexToEdit] = React.useState(-1);

  const [deleteConfirmationDialogIsVisible, setDeleteConfirmationDialogIsVisible] = React.useState(false);
  const [productIndexToPotentiallyDelete, setProductIndexToPotentiallyDelete] = React.useState(-1);

  return (
    <>
      <>
        <AddOrEditProductEntry
          isVisible={addOrEditProductDialogIsVisible}
          initialProducts={formData}
          index={productIndexToEdit}
          onProductsUpdated={(updatedProducts) => {
            onChange(updatedProducts); // writes updated FAQs (with added product) into form's model/values
            setAddOrEditProductDialogIsVisible(false); // hides the edit/add dialog
          }}
        />
        <PotentiallyDeleteFAQEntry
          isVisible={deleteConfirmationDialogIsVisible}
          initialProducts={formData}
          index={productIndexToPotentiallyDelete}
          onProductsUpdated={(updatedProducts) => {
            onChange(updatedProducts);
            setDeleteConfirmationDialogIsVisible(false);
          }}
        />
      </>
      <OneColumnContainer
        title="Add/Manage Products and Services"
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
          {formData?.map((prod, i) => (
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

ProductsServices.defaultProps = {
  formData: '',
  onChange: () => { },
};

ProductsServices.propTypes = {
  formData: PropTypes.string,
  onChange: PropTypes.func,
};

export default ProductsServices;
