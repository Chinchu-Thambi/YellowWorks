import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box } from 'rebass';

import {
  ButtonContainer, ErrorMessage, EditWrapper,
} from './Styled';

import Button from '../../../../../../components/Button';
import Spinner from '../../../../../../components/Spinner';

import ProductContext from '../../../../services/ProductContext';
import WebsiteInput from '../../../../../../components/WebsiteInput/WebsiteInput';

const path = ['businessProfile', 'url'];

const WebsiteURL = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const [localData, setLocalData] = React.useState(
    R.view(R.lensPath(path))(productState.formData),
  ) || {};
  const [hasErrors, setHasErrors] = React.useState(false);
  const [pendingSave, setPendingSave] = React.useState(false);

  const regExp = new RegExp('^(?:http://|https://|s3://).+$');

  const handleChange = (value) => {
    setHasErrors(false);
    setLocalData(value);
  };

  const handleSave = async () => {
    if (!regExp.test(localData) && localData) {
      setHasErrors(true);
      return;
    }
    if (!hasErrors) {
      setPendingSave(true);
      const { success } = await productState.saveData({
        path,
        data: encodeURI(localData),
      });
      setPendingSave(false);
      if (success) {
        onDismiss();
      }
    }
  };

  return (
    <EditWrapper>
      <WebsiteInput
        formData={localData}
        onChange={handleChange}
        hideLabel
      />
      { hasErrors && <ErrorMessage>Must be a valid https:// or http:// URL. e.g. https://www.example.com </ErrorMessage>}
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

WebsiteURL.defaultProps = {
  onDismiss: () => {},
};
WebsiteURL.propTypes = {
  onDismiss: PropTypes.func,
};

export default WebsiteURL;
