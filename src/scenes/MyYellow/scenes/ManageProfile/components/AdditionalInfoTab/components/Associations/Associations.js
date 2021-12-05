import React from 'react';
import * as R from 'ramda';
import axios from 'axios';
import Select from 'react-select/async';
import { Box } from 'rebass';

import {
  ListItem, OptionItem, LabelItem, ActionButton, OptionDetails,
} from '../../../../../../components/ListGroup';

import ProductContext from '../../../../../../services/ProductContext';
import Modal from '../../../../../../../../components/Modal';
import {
  ButtonContainer, EditWrapper, ErrorMessage, TextLeft,
} from '../../../modals/Styled';

import Spinner from '../../../../../../../../components/Spinner';
import Tag from '../../../../../../../../components/Tag';
import Button from '../../../../../../../../components/Button';

import associationsIcon from '../../../../../../../../assets/icons/associations.svg';
import AuthContext from '../../../../../../../../components/Auth';

const path = ['productAttributes', 'associations'];

const loadedCategories = [];

const defaultCategories = [
  'New Zealand Certified Builders (NZCB)',
  'Master Builders Association',
  'Hospitality Association of NZ',
  'Otago Chamber of Commerce',
  'Royal NZ College of GPs',
  'Restaurant Association of NZ',
  'NZ Association of Hairdressers',
  'Architectural Designers NZ (ADNZ)',
  'Horticulture NZ ',
];

const Associations = () => {
  const productState = React.useContext(ProductContext) || {};
  const { isStaff } = React.useContext(AuthContext) || {};
  const associations = R.pathOr([], path)(productState.formData);

  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [localData, setLocalData] = React.useState(associations);
  const [associationList, setAssociationList] = React.useState(loadedCategories);
  const [error, setError] = React.useState('');
  const [pendingSave, setPendingSave] = React.useState(false);

  const toggleModal = () => {
    setModalVisibility(!modalVisibility);
  };

  const handleChange = ({ value: id, label }) => {
    setError('');
    const selectedCategory = {
      id,
      name: label,
    };

    const updatedCategories = R.compose(
      R.uniqBy(R.path(['id'])),
      R.append(selectedCategory),
    )(localData);

    setLocalData(updatedCategories);
  };

  const handleSave = async () => {
    if (localData.length > 20) {
      setError('You can only select 20 or fewer associations.');
      return;
    }

    setError('');
    setPendingSave(true);

    const { success } = await productState.saveData({
      path,
      data: localData,
    });
    setPendingSave(false);

    if (success) {
      toggleModal();
    }
  };

  const transformToOption = ({ name, id }) => ({
    value: id,
    label: name,
  });

  const loadAssociations = async (inputValue) => {
    let returnValue = associationList;

    if (returnValue.length === 0) {
      const response = await axios.get('/product-brief-endpoint/associations.json');
      returnValue = response.data;
      setAssociationList(returnValue);
    }

    if (inputValue === '') {
      return R.compose(
        R.sortBy(R.prop('name')),
        R.map(transformToOption),
        R.filter(({ name }) => defaultCategories.includes(name)),
      )(returnValue);
    }

    return returnValue
      .filter(({ name }) => name.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 20)
      .map(transformToOption);
  };

  const removeAssociation = ({ id }) => {
    setError('');
    const updatedAssociations = R.filter(
      R.complement(R.pathEq(['id'], id)),
    )(localData);
    setLocalData(updatedAssociations);
  };

  if (!isStaff) return null;

  return (
    <>
      <ListItem>
        <OptionItem>
          <LabelItem icon={associationsIcon}>Associations</LabelItem>

          <div>
            <ActionButton
              variant="link"
              size="sm"
              onClick={toggleModal}
            >
              Edit
            </ActionButton>
          </div>

        </OptionItem>
        {localData?.length > 0 && (
          <div>
            {localData?.map((association) => (
              <OptionDetails key={association.id} readonly>{association.name}</OptionDetails>
            ))}
          </div>
        )}
      </ListItem>

      {modalVisibility && (
        <Modal
          title="Associations"
          onDismiss={toggleModal}
          isVisible
        >
          <EditWrapper>
            <Select
              defaultOptions
              placeholder="Select..."
              loadOptions={loadAssociations}
              onChange={(e) => handleChange(e)}
              value={null}
            />
            <TextLeft>
              {localData && localData.map((category) => (
                <Tag
                  key={category.id}
                  onRemove={() => removeAssociation({ id: category.id })}
                >
                  {category.name}
                </Tag>
              ))}
            </TextLeft>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ButtonContainer>
              {pendingSave && (
                <Box alignSelf="center" mr={2}>
                  <Spinner size={16} mr={2} />
                </Box>
              )}
              <Button
                disabled={pendingSave}
                onClick={handleSave}
                size="sm"
              >save
              </Button>
            </ButtonContainer>
          </EditWrapper>
        </Modal>
      )}
    </>
  );
};

export default Associations;
