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

const path = ['businessProfile', 'foundingDate'];

const YearEstablished = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const [localData, setLocalData] = React.useState(
    R.path(path)(productState.formData)?.substr(0, 4) || '',
  );
  const [hasErrors, setHasErrors] = React.useState(false);
  const [pendingSave, setPendingSave] = React.useState(false);

  const handleChange = (value) => {
    setHasErrors(false);
    setLocalData(value);
  };

  const handleSave = async () => {
    if (localData.length !== 4) {
      setHasErrors(true);
      return;
    }
    setPendingSave(true);
    // fullDate needed as Schema currently accepts only YYYY-MM-DD strings
    const fullDate = `${localData}-01-01`;
    const { success } = await productState.saveData({
      path,
      data: fullDate,
    });
    setPendingSave(false);
    if (success) {
      onDismiss();
    }
  };

  return (
    <EditWrapper>
      <FormControl
        placeholder="Year Established"
        type="text"
        value={localData || ''}
        onChange={(e) => handleChange(e.target.value)}
        minLength={4}
        max-length={4}
        size="30"
        required
      />
      {hasErrors && <ErrorMessage>Year Established must be 4 digits long</ErrorMessage>}

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

YearEstablished.defaultProps = {
  onDismiss: () => { },
};
YearEstablished.propTypes = {
  onDismiss: PropTypes.func,
};

export default YearEstablished;
