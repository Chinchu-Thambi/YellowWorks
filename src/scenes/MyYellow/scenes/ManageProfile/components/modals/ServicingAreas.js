import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Box } from 'rebass';

import Button from '../../../../../../components/Button';
import Spinner from '../../../../../../components/Spinner';

import ProductContext from '../../../../services/ProductContext';
import ServicingAreasForm from '../../../../../../components/ServicingAreasForm';

import { ButtonContainer, EditWrapper, ErrorMessage } from './Styled';

const path = ['location', 'areaServed'];

const ServicingAreas = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const [areaServed, setAreaServed] = React.useState(null);
  const [pendingSave, setPendingSave] = React.useState(false);
  const [error, setError] = React.useState('');
  const ref = React.useRef(null);

  const handleSaveServicingAreas = async (e) => {
    e.preventDefault();

    if (!ref?.current?.reportValidity()) {
      return;
    }

    const boosts = productState?.formData?.productAttributes?.boosts || [];
    const regions = Array.isArray(areaServed?.region) ? areaServed.region : [areaServed?.region];

    if (boosts?.length > 0) {
      const regionIds = regions?.filter(Boolean).map(R.prop('id'));
      const missingRegions = boosts.find((boost) => !regionIds.includes(boost.region.id));

      if (
        missingRegions
        && error === '' // so that this is only a warning, not a blocking requirement.
      ) {
        setError(`
            There's a Category Boost configured for a region not included in the selected service areas.
            Please make sure your boosts are correctly set before updating your service areas.
          `);
        return;
      }
    }

    setPendingSave(true);
    const { success } = await productState.saveData({
      path,
      data: areaServed,
    });
    setPendingSave(false);

    if (success) {
      onDismiss();
    }
  };

  const handleChange = React.useCallback((newAreaServed) => {
    setError('');
    setAreaServed(newAreaServed);
  }, []);

  return (
    <form
      ref={ref}
      onSubmit={handleSaveServicingAreas}
    >
      <EditWrapper>
        <ServicingAreasForm
          onChange={handleChange}
        />
        { error && <ErrorMessage>{error}</ErrorMessage>}
      </EditWrapper>
      <ButtonContainer>
        {pendingSave && (
          <Box alignSelf="center" mr={2}>
            <Spinner size={16} mr={2} />
          </Box>
        )}
        <Button disabled={pendingSave || undefined} size="sm">Save</Button>
      </ButtonContainer>
    </form>
  );
};

ServicingAreas.defaultProps = {
  onDismiss: () => {},
};
ServicingAreas.propTypes = {
  onDismiss: PropTypes.func,
};

export default ServicingAreas;
