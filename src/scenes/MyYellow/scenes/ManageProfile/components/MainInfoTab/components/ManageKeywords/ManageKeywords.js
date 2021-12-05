import React from 'react';
import * as R from 'ramda';
import Loadable from 'react-loadable';
import { Box } from 'rebass';

import tagIcon from '../../../../../../../../assets/icons/light/tag.svg';

import Button from '../../../../../../../../components/Button';
import Modal from '../../../../../../../../components/Modal';
import Spinner from '../../../../../../../../components/Spinner';
import Tag from '../../../../../../../../components/Tag';

import ProductContext from '../../../../../../services/ProductContext';

import {
  ListItem, OptionItem, LabelItem, ActionButton, OptionDetails,
} from '../../../../../../components/ListGroup';

import { ButtonContainer, EditWrapper } from '../../../modals/Styled';

import getKeywordsFromCategories from './services/getKeywordsFromCategories';

const ManageKeywordsForm = Loadable({
  loader: () => import('./components/ManageKeywordsForm'),
  loading: Spinner,
});

const path = ['categories'];

const ManageKeywords = () => {
  const productState = React.useContext(ProductContext) || {};
  const categories = R.pathOr([], path)(productState.formData);
  const keywordsFromCategories = getKeywordsFromCategories(categories);

  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [localData, setLocalData] = React.useState(categories);
  const [pendingSave, setPendingSave] = React.useState(false);

  const toggleVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  const handleSave = async () => {
    setPendingSave(true);
    const { success } = await productState.saveData({
      path,
      data: localData,
    });
    setPendingSave(false);

    if (success) {
      toggleVisibility();
    }
  };

  const handleChange = React.useCallback((formData) => {
    if (!R.equals(localData, formData)) {
      setLocalData(formData);
    }
  }, [localData]);

  // updates localState if categories change.
  React.useEffect(() => {
    if (!R.equals(localData, categories)) {
      setLocalData(categories);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  return (
    <>
      <ListItem>
        <OptionItem>
          <LabelItem icon={tagIcon}>Keywords</LabelItem>
          <div>
            <ActionButton
              variant="link"
              size="sm"
              onClick={toggleVisibility}
            >
              Edit
            </ActionButton>
          </div>
        </OptionItem>
        <OptionDetails>
          {keywordsFromCategories?.map(({ keyword }) => (
            <Tag key={keyword} readonly>{keyword}</Tag>
          ))}
        </OptionDetails>
      </ListItem>

      {modalVisibility && (
        <Modal
          title="Keywords"
          onDismiss={toggleVisibility}
          isVisible
        >
          <EditWrapper>
            <ManageKeywordsForm
              value={localData}
              onChange={handleChange}
            />

            <ButtonContainer>
              {pendingSave && (
                <Box alignSelf="center" mr={2}>
                  <Spinner size={16} mr={2} />
                </Box>
              )}
              <Button onClick={handleSave} disabled={pendingSave} size="sm">save</Button>
            </ButtonContainer>
          </EditWrapper>
        </Modal>
      )}
    </>
  );
};

export default ManageKeywords;
