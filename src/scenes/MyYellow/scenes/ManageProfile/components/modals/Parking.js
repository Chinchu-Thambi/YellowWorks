import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box } from 'rebass';
import Select from 'react-select/async';

import {
  ButtonContainer, EditWrapper, TextLeft,
} from './Styled';

import Button from '../../../../../../components/Button';
import Spinner from '../../../../../../components/Spinner';
import Tag from '../../../../../../components/Tag';

import ProductContext from '../../../../services/ProductContext';

const parkingOptions = [
  { label: 'Free Off-Street', value: 'Free Off-Street' },
  { label: 'Free On-Street', value: 'Free On-Street' },
  { label: 'Pay', value: 'Pay' },
  { label: 'Pay & Display', value: 'Pay & Display' },
  { label: 'None', value: 'None' },
];

const amenitiesPath = ['location', 'amenityFeature'];

const Parking = ({ onDismiss, isPremium }) => {
  const productState = React.useContext(ProductContext) || {};

  const amenities = productState?.formData?.location?.amenityFeature || [];
  const hasWifi = R.find(R.propEq('name', 'Free Wi-Fi'))(amenities)?.value || false;
  const parking = R.find(R.propEq('name', 'Parking'))(amenities)?.value || [];
  const [selectedParking, setSelectedParking] = React.useState(parking);
  const [pendingSave, setPendingSave] = React.useState(false);

  const handleChange = ({ value }) => {
    if (value === 'None') {
      setSelectedParking([value]);
      return;
    }
    if (R.includes(value, selectedParking)) {
      return;
    }
    setSelectedParking([...selectedParking.filter((selection) => selection !== 'None'), value]);
  };

  const handleSave = async () => {
    setPendingSave(true);

    const newData = [
      { name: 'Parking', value: selectedParking },
      ...(isPremium ? [{ name: 'Free Wi-Fi', value: hasWifi }] : []),
    ];

    const { success } = await productState.saveData({
      path: amenitiesPath,
      data: newData,
    });
    setPendingSave(false);
    if (success) {
      onDismiss();
    }
  };

  const removeOption = (value) => {
    const updatedOptions = selectedParking.filter((selection) => selection !== value);
    setSelectedParking(updatedOptions);
  };

  return (
    <EditWrapper>
      <Box as="p" textAlign="center" mb={3}>
        Select all parking options for this location
      </Box>
      <Select
        placeholder="Select..."
        defaultOptions={parkingOptions}
        onChange={(e) => handleChange(e)}
        value={null}
      />
      <TextLeft>
        {selectedParking?.map((option) => (
          <Tag
            key={option}
            onRemove={() => removeOption(option)}
          >
            {option}
          </Tag>
        ))}
      </TextLeft>
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

Parking.defaultProps = {
  onDismiss: () => { },
  isPremium: false,
};
Parking.propTypes = {
  onDismiss: PropTypes.func,
  isPremium: PropTypes.bool,
};

export default Parking;
