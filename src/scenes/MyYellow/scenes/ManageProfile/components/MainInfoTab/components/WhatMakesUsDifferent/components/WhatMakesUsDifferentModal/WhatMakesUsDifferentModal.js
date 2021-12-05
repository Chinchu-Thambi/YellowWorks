import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box } from 'rebass';

import ProductContext from '../../../../../../../../services/ProductContext';
import getIsPremium from '../../../../../../../../services/getIsPremium';
import Spinner from '../../../../../../../../../../components/Spinner';
import Button from '../../../../../../../../../../components/Button';

import { ButtonContainer, EditWrapper, FormControlTextArea } from '../../../../../modals/Styled';

import { PremiumModalPrompt } from '../../../../../PremiumOnly';

const path = ['businessProfile', 'slogan'];

const WhatMakesUsDifferentModal = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const isPremium = getIsPremium(productState) || false;
  const [localData, setLocalData] = React.useState(
    R.view(R.lensPath(path))(productState.formData),
  ) || '';
  const [pendingSave, setPendingSave] = React.useState(false);

  const handleSave = async () => {
    setPendingSave(true);
    const { success } = await productState.saveData({
      path,
      data: localData.trim(),
    });
    setPendingSave(false);

    if (success) {
      onDismiss();
    }
  };

  const handleChange = (value) => {
    setLocalData(value);
  };

  return (
    <EditWrapper>
      {isPremium ? (
        <>
          <FormControlTextArea
            placeholder="What makes your business different..."
            type="text"
            value={localData}
            onChange={(e) => handleChange(e.target.value)}
            maxLength={4000}
          />
          <ButtonContainer>
            {pendingSave && (
              <Box alignSelf="center" mr={2}>
                <Spinner size={16} mr={2} />
              </Box>
            )}
            <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm">save</Button>
          </ButtonContainer>
        </>
      ) : (
        <PremiumModalPrompt subscriptionId={productState?.subscriptionId} />
      )}
    </EditWrapper>
  );
};

WhatMakesUsDifferentModal.defaultProps = {
  onDismiss: () => { },
};
WhatMakesUsDifferentModal.propTypes = {
  onDismiss: PropTypes.func,
};

export default WhatMakesUsDifferentModal;
