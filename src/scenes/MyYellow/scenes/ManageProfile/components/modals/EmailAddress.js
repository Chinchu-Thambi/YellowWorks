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

const path = ['location', 'email'];

const EmailAddress = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const [localData, setLocalData] = React.useState(
    R.view(R.lensPath(path))(productState.formData),
  ) || {};
  const [hasErrors, setHasErrors] = React.useState(false);
  const [pendingSave, setPendingSave] = React.useState(false);

  const regExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  const handleSave = async () => {
    setHasErrors(false);

    if (localData && !regExp.test(localData)) {
      setHasErrors(true);
      return;
    }

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

  return (
    <EditWrapper>
      <FormControl
        placeholder="Email"
        type="email"
        value={localData || ''}
        onChange={(e) => setLocalData(e.target.value)}
        size="30"
      />
      { hasErrors && <ErrorMessage>Please check your email address.</ErrorMessage>}
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

EmailAddress.defaultProps = {
  onDismiss: () => {},
};
EmailAddress.propTypes = {
  onDismiss: PropTypes.func,
};

export default EmailAddress;
