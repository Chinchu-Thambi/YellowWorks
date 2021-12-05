import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import { Box } from 'rebass';

import Button from '../../../../../../../components/Button';
import Spinner from '../../../../../../../components/Spinner';

import LogoInput from '../../../../../../../components/LogoInput';
import ProductContext from '../../../../../services/ProductContext';

import { ButtonContainer } from '../Styled';

import { DataWrapper, Actions } from './Styled';

const path = ['businessProfile', 'logo'];


const Logo = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const formData = R.path(path)(productState.formData);
  const [localData, setLocalData] = React.useState(formData);
  const [pendingSave, setPendingSave] = React.useState(false);
  const ref = React.useRef(null);

  const onChange = (updatedData) => {
    setLocalData(updatedData);
  };

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

  const handleRemove = () => {
    setLocalData(null);
  };

  const handleChange = () => {
    ref.current.click();
  };

  return (
    <div>
      <p>Please upload your business logo</p>

      <DataWrapper justifyContent="center" mb={4} pos>
        <LogoInput
          formData={localData}
          onChange={onChange}
          ref={ref}
        />
        {localData && (
          <Actions>
            <Button size="sm" variant="link" onClick={handleChange}>Change</Button>
            <Button size="sm" variant="link" onClick={handleRemove}>Remove</Button>
          </Actions>
        )}
      </DataWrapper>

      <ButtonContainer>
        {pendingSave && (
          <Box alignSelf="center" mr={2}>
            <Spinner size={16} mr={2} />
          </Box>
        )}
        <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm">save</Button>
      </ButtonContainer>
    </div>
  );
};

Logo.defaultProps = {
  onDismiss: () => {},
};
Logo.propTypes = {
  onDismiss: PropTypes.func,
};

export default Logo;
