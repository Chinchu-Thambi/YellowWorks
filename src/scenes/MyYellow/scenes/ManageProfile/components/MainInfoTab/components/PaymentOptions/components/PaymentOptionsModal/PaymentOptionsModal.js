import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box } from 'rebass';
import Select from 'react-select/async';
import styled from 'styled-components';
import axios from 'axios';

import ProductContext from '../../../../../../../../services/ProductContext';
import getIsPremium from '../../../../../../../../services/getIsPremium';
import Spinner from '../../../../../../../../../../components/Spinner';
import Button from '../../../../../../../../../../components/Button';
import Tag from '../../../../../../../../../../components/Tag';

import { ButtonContainer, ErrorMessage, EditWrapper } from '../../../../../modals/Styled';
import { PremiumModalPrompt } from '../../../../../PremiumOnly';

const path = ['location', 'paymentAccepted'];

const SetSelect = styled(Select)`
  width: 100%;
`;

const PaymentOptionsModal = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const isPremium = getIsPremium(productState) || false;
  const [localData, setLocalData] = React.useState(
    R.view(R.lensPath(path))(productState.formData),
  ) || {};
  const [paymentTypesList, setPaymentTypesList] = React.useState([]);
  const [error, setError] = React.useState('');
  const [pendingSave, setPendingSave] = React.useState(false);

  const handleChange = ({ value: id, label }) => {
    setError('');
    const selectedPaymentTypes = {
      id,
      name: label,
    };

    const updatedPaymentTypes = R.compose(
      R.uniqBy(R.path(['id'])),
      R.append(selectedPaymentTypes),
    )(localData);

    setLocalData(updatedPaymentTypes);
  };

  const handleSave = async () => {
    setError('');
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

  const transformToOption = ({ name, id }) => ({
    value: id,
    label: name,
  });

  const loadPaymentTypes = async (inputValue) => {
    let returnValue = paymentTypesList;

    if (returnValue.length === 0) {
      const response = await axios.get('/product-brief-endpoint/paymentTypes.json');
      returnValue = response.data;
      setPaymentTypesList(returnValue);
    }

    if (inputValue === '') {
      return R.compose(
        R.sortBy(R.prop('name')),
        R.map(transformToOption),
      )(returnValue);
    }

    return returnValue
      .filter(({ name }) => name.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 20)
      .map(transformToOption);
  };

  const removePaymentTypes = ({ id }) => {
    setError('');
    const updatedPaymentTypes = R.filter(
      R.complement(R.pathEq(['id'], id)),
    )(localData);
    setLocalData(updatedPaymentTypes);
  };


  return (
    <EditWrapper>
      {isPremium ? (
        <>
          <Box as="p" textAlign="center">
            Select all accepted payment types
          </Box>
          <Box my={3}>
            <SetSelect
              defaultOptions
              placeholder="Select..."
              loadOptions={loadPaymentTypes}
              onChange={handleChange}
              value={null}
            />
          </Box>
          {localData && localData.map((paymentType) => (
            <Tag
              key={paymentType.id}
              onRemove={() => removePaymentTypes({ id: paymentType.id })}
            >
              {paymentType.name}
            </Tag>
          ))}
          {error && <ErrorMessage>{error}</ErrorMessage>}
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

PaymentOptionsModal.defaultProps = {
  onDismiss: () => { },
};
PaymentOptionsModal.propTypes = {
  onDismiss: PropTypes.func,
};

export default PaymentOptionsModal;
