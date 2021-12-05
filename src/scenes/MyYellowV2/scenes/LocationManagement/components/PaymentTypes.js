import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Box } from 'rebass';
import Select from 'react-select/async';
import axios from 'axios';
import Tag from '../../../../../components/Tag';

const PaymentTypes = ({ formData, onChange }) => {
  const [localData, setLocalData] = React.useState(formData);
  const [paymentTypesList, setPaymentTypesList] = React.useState([]);

  const handleChange = ({ value: id, label }) => {
    const selectedPaymentTypes = {
      id,
      name: label,
    };

    const updatedPaymentTypes = R.compose(
      R.uniqBy(R.path(['id'])),
      R.append(selectedPaymentTypes),
    )(localData);

    setLocalData(updatedPaymentTypes);
    onChange(updatedPaymentTypes);
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
    const updatedPaymentTypes = R.filter(
      R.complement(R.pathEq(['id'], id)),
    )(localData);
    setLocalData(updatedPaymentTypes);
  };
  return (
    <>
      <Box my={3}>
        <Select
          defaultOptions
          placeholder="Select your accepted payment types..."
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
    </>
  );
};

PaymentTypes.defaultProps = {
  formData: [],
  onChange: () => {},
};

PaymentTypes.propTypes = {
  formData: PropTypes.arrayOf({}),
  onChange: PropTypes.func,
};

export default PaymentTypes;
