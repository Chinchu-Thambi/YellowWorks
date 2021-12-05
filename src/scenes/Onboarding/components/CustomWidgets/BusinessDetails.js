import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Input, TextArea } from '../../../../components/FormElements';
import ChooseImage from '../../../MyYellowV2/scenes/BusinessDetails/components/CoreBusinessDetails/components/ChooseImage';

const BusinessDetails = ({
  onChange, value,
}) => {
  const [localState, setLocalState] = React.useState(value);

  React.useEffect(() => {
    if (!localState) { setLocalState(value); return; }
    const newData = R.compose(
      R.assoc('name', localState?.name),
      R.assoc('description', localState?.description),
      R.assoc('logo', localState?.logo),
      R.defaultTo({}),
    )(value);
    if (R.equals(newData, value)) {
      return;
    }
    onChange(newData);
  }, [localState, onChange, value]);

  return (
    <div className="grid grid-cols-1 space-y-4">
      <Input
        id="name"
        label="What’s your Business Name?"
        name="name"
        placeholder="Enter your business trading name"
        value={localState?.name}
        onChange={({ target }) => setLocalState({ ...localState, name: target?.value })}
        maxLength={40}
        required
      />
      <TextArea
        id="description"
        label="About your business"
        placeholder="eg. What do you do? or What makes you better than your competitors"
        value={localState?.description}
        onChange={({ target }) => setLocalState({ ...localState, description: target?.value })}
        maxLength={1000}
        required
      />
      <ChooseImage
        id="logo"
        title="Business Logo"
        value={localState?.logo}
        onSelect={(image) => setLocalState({ ...localState, logo: image })}
        required
        small
      />
    </div>
  );
};

BusinessDetails.defaultProps = {
  value: {},
};

BusinessDetails.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    headline: PropTypes.string,
    alternativeHeadline: PropTypes.string,
    primaryImageOfPage: PropTypes.string,
  }),
};

export default BusinessDetails;
