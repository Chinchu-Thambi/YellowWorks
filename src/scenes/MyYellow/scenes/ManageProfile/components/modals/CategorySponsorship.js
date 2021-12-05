import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass';
import * as R from 'ramda';

import Button from '../../../../../../components/Button';
import Spinner from '../../../../../../components/Spinner';

import ProductContext from '../../../../services/ProductContext';

import {
  ButtonContainer, CategoryBoostWrapper, EditWrapper,
} from './Styled';

import CategoryBoost from '../../../../../Onboarding/components/CustomWidgets/CategoryBoost';

const path = ['productAttributes', 'boosts'];

const CategorySponsorship = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const [localData, setLocalData] = React.useState(productState.formData);
  const schema = productState.orderDetails?.userSchema;
  const [pendingSave, setPendingSave] = React.useState(false);

  const handleChange = ({ formData }) => {
    setLocalData(formData);
  };

  const handleSaveCategorySponsorship = async () => {
    const data = R.path(path)(localData);

    if (!pendingSave) {
      setPendingSave(true);
      const { success } = await productState.saveData({
        path,
        data,
      });
      setPendingSave(false);

      if (success) {
        onDismiss();
      }
    }
  };

  if (productState.formData && schema) {
    return (
      <EditWrapper>
        <CategoryBoostWrapper>
          <CategoryBoost
            onChange={handleChange}
            formData={localData}
            schema={schema}
          />
          <ButtonContainer>
            {pendingSave && (
            <Box alignSelf="center" mr={2}>
              <Spinner size={16} mr={2} />
            </Box>
            )}
            <Button onClick={handleSaveCategorySponsorship} disabled={pendingSave || undefined} size="sm">Save</Button>
          </ButtonContainer>
        </CategoryBoostWrapper>
      </EditWrapper>
    );
  }
  return <Spinner />;
};

CategorySponsorship.defaultProps = {
  onDismiss: () => {},
};
CategorySponsorship.propTypes = {
  onDismiss: PropTypes.func,
};

export default CategorySponsorship;
