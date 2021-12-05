import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Input } from '../../../../../components/FormElements';
import ChooseCover from '../../../../MyYellowV2/scenes/products/ManageWebsite/components/WebsiteCover/components/ChooseCover';

const WebsiteBanner = ({
  onChange, value,
}) => {
  const [localState, setLocalState] = React.useState(value);

  React.useEffect(() => {
    if (!localState) { setLocalState(value); return; }
    const newData = R.compose(
      R.assoc('alternativeHeadline', localState?.alternativeHeadline),
      R.assoc('headline', localState?.headline),
      R.assoc('primaryImageOfPage', localState?.primaryImageOfPage),
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
        id="Headline"
        label="Banner Image Headline"
        name="Headline"
        placeholder="This text will display in large font over your banner image."
        value={localState?.headline}
        onChange={({ target }) => setLocalState({ ...localState, headline: target?.value })}
        maxLength={40}
        required
      />
      <Input
        id="Alternative Headline"
        label="Banner Image Subheading"
        name="Alternative Headline"
        placeholder="This text will display in smaller font over your banner image, under the headline."
        value={localState?.alternativeHeadline}
        onChange={({ target }) => setLocalState({ ...localState, alternativeHeadline: target?.value })}
        maxLength={60}
        required
      />
      <ChooseCover
        id="Banner Image"
        title="Banner Image"
        value={localState?.primaryImageOfPage}
        onChange={(image) => setLocalState({ ...localState, primaryImageOfPage: image })}
        required
      />
    </div>
  );
};

WebsiteBanner.defaultProps = {
  value: {},
};

WebsiteBanner.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    headline: PropTypes.string,
    alternativeHeadline: PropTypes.string,
    primaryImageOfPage: PropTypes.string,
  }),
};

export default WebsiteBanner;
