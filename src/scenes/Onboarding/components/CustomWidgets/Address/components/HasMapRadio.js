import React from 'react';
import PropTypes from 'prop-types';

const HasMapRadio = (props) => {
  const {
    schema,
    formData,
    onChange,
  } = props;
  const [randomId] = React.useState(Math.random());
  const [localState, setLocalState] = React.useState(formData);

  const handleChange = (e) => setLocalState(e.target.value === 'true');

  React.useEffect(() => {
    if (formData !== localState) {
      onChange(localState);
    }
  }, [formData, localState, onChange]);

  // actively sets formData to true if undefined.
  React.useEffect(() => {
    // if formData is not set, onboarding should actively set it to true.
    // having it set in defaultProps wouldn't communicate the changes, therefore, here it is.
    if (formData === undefined) {
      setLocalState(true);
    }
  }, [formData]);

  return (
    <div className="form-group field field-boolean">
      <p id="root_location.hasMap__description" className="field-description">
        {schema.description}
      </p>
      <div className="field-radio-group" id="root_location.hasMap">
        <div className="radio ">
          <label htmlFor={`${randomId}true`}>
            <span>
              <input
                type="radio"
                id={`${randomId}true`}
                name={randomId}
                required=""
                value="true"
                checked={localState}
                onChange={handleChange}
              />
              <span>yes</span>
            </span>
          </label>
        </div>
        <div className="radio ">
          <label htmlFor={`${randomId}false`}>
            <span>
              <input
                type="radio"
                id={`${randomId}false`}
                name={randomId}
                required=""
                value="false"
                checked={!localState}
                onChange={handleChange}
              />
              <span>no</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

HasMapRadio.defaultProps = {
  formData: undefined,
};

HasMapRadio.propTypes = {
  schema: PropTypes.shape({
    description: PropTypes.string,
  }).isRequired,
  formData: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};


export default HasMapRadio;
