import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box } from 'rebass';

import { ButtonContainer, EditWrapper } from './Styled';

import AddressForm from '../../../../../../components/AddressForm';
import Button from '../../../../../../components/Button';
import Spinner from '../../../../../../components/Spinner';

import ProductContext from '../../../../services/ProductContext';

const path = ['location'];

const PhysicalLocation = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const [localData, setLocalData] = React.useState(
    R.path(path, productState.formData) || {},
  );
  const [pendingSave, setPendingSave] = React.useState(false);

  const handleSave = async () => {
    setPendingSave(true);

    const { success } = await productState.saveData({
      path,
      data: localData,
    });
    setPendingSave(false);
    if (success) {
      onDismiss();
    }
  };

  const handleChange = (updatedFormData) => {
    setLocalData({
      ...localData,
      ...updatedFormData,
    });
  };

  return (
    <EditWrapper>
      {localData && (
        <AddressForm
          defaultMode={localData?.address ? 'form' : 'search'}
          formData={localData}
          onChange={handleChange}
        />
      )}

      <ButtonContainer>
        {pendingSave && (
          <Box alignSelf="center" mr={2}>
            <Spinner size={16} mr={2} />
          </Box>
        )}
        <Button
          type="button"
          onClick={handleSave}
          disabled={pendingSave || undefined}
          size="sm"
        >save
        </Button>
      </ButtonContainer>
    </EditWrapper>
  );
};

PhysicalLocation.defaultProps = {
  onDismiss: () => {},
};
PhysicalLocation.propTypes = {
  onDismiss: PropTypes.func,
};

export default PhysicalLocation;
