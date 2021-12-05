import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import ServicingAreasForm from '../../../../../components/ServicingAreasForm';
import ValidationController from '../../../../../components/ValidationController';

import { FieldRadioGroup } from './ServicingAreas.styled';

const InitialPrompt = React.forwardRef(({
  addServiceAreas,
  setAddServiceAreas,
}, ref) => (
  <div>
    <h2>Would you like to add service areas to your profile? (Optional)</h2>
    <p>
      If you deliver or provide services outside your business address, you can add service areas
      to your profile. These will affect which searches you appear in on yellow.co.nz.
    </p>
    <FieldRadioGroup>
      <div className="radio">
        <label htmlFor="addServiceAreasTrue" ref={ref}>
          <span>
            <input
              type="radio"
              name="addServiceAreas"
              id="addServiceAreasTrue"
              value="true"
              checked={addServiceAreas}
              onChange={() => setAddServiceAreas(true)}
            />
            <span>yes</span>
          </span>
        </label>
      </div>
      <div className="radio">
        <label htmlFor="addServiceAreasFalse">
          <span>
            <input
              type="radio"
              name="addServiceAreas"
              id="addServiceAreasFalse"
              value="false"
              checked={!addServiceAreas}
              onChange={() => setAddServiceAreas(false)}
            />
            <span>no</span>
          </span>
        </label>
      </div>
    </FieldRadioGroup>
  </div>
));
InitialPrompt.propTypes = {
  addServiceAreas: PropTypes.bool.isRequired,
  setAddServiceAreas: PropTypes.func.isRequired,
};

const ServicingAreas = ({ formData, onChange }) => {
  const [localData, setLocalData] = React.useState(formData);
  const [addServiceAreas, setAddServiceAreas] = React.useState(false);
  const requiredRef = React.useRef(null);

  const hasMap = formData?.hasMap ?? true;

  const isBlocked = !hasMap && !localData?.areaServed;

  const handleServicingAreasChange = (changedFormData) => {
    if (changedFormData === null) {
      setAddServiceAreas(false);
    } else if (!R.equals(localData?.areaServed, changedFormData)) {
      setLocalData({ ...localData, areaServed: changedFormData });
    }
  };

  React.useEffect(() => {
    if (R.equals(localData, formData)) { return; }
    onChange(addServiceAreas ? localData : { ...formData, areaServed: null });
  }, [addServiceAreas, formData, localData, onChange]);

  return (
    <>
      {addServiceAreas ? (
        <ServicingAreasForm
          onChange={handleServicingAreasChange}
        />
      ) : (
        <InitialPrompt
          addServiceAreas={addServiceAreas}
          setAddServiceAreas={setAddServiceAreas}
          ref={requiredRef}
        />
      )}
      <ValidationController
        isBlocked={isBlocked}
        message="You either need to display your address or pick service areas for your business."
        requiredRef={requiredRef}
      />
    </>
  );
};

ServicingAreas.propTypes = {
  formData: PropTypes.shape({
    areaServed: PropTypes.string,
    hasMap: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ServicingAreas;
