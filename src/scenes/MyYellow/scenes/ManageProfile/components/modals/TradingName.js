import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box } from 'rebass';

import {
  ButtonContainer, ErrorMessage, FormControl, EditWrapper,
} from './Styled';

import Button from '../../../../../../components/Button';
import Spinner from '../../../../../../components/Spinner';

import ProductContext from '../../../../services/ProductContext';

const path = ['businessProfile', 'name'];

const TradingName = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const [localData, setLocalData] = React.useState(
    R.view(R.lensPath(path))(productState.formData),
  ) || {};
  const [hasErrors, setHasErrors] = React.useState(false);
  const [pendingSave, setPendingSave] = React.useState(false);

  const handleChange = (value) => {
    if (value.trim()?.length < 1) {
      setHasErrors(true);
    } else {
      setHasErrors(false);
    }

    setLocalData(value);
  };

  const handleSave = async () => {
    if (!hasErrors) {
      setPendingSave(true);
      const { success } = await productState.saveData({
        path,
        data: localData,
      });
      setPendingSave(false);
      if (success) {
        onDismiss();
      }
    }
  };

  return (
    <EditWrapper>
      <FormControl
        placeholder="Trading name"
        type="text"
        value={localData || ''}
        onChange={(e) => handleChange(e.target.value)}
        minLength={1}
        size="30"
        required
      />

      { hasErrors && <ErrorMessage>Trading name is required</ErrorMessage>}

      <ButtonContainer>
        {pendingSave && (
          <Box alignSelf="center" mr={2}>
            <Spinner size={16} mr={2} />
          </Box>
        )}
        <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm">save</Button>
      </ButtonContainer>
    </EditWrapper>
  );
};

TradingName.defaultProps = {
  onDismiss: () => {},
};
TradingName.propTypes = {
  onDismiss: PropTypes.func,
};

export default TradingName;
