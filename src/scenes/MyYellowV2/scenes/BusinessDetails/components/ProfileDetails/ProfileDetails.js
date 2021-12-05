import React from 'react';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import * as R from 'ramda';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter, faFacebookF, faInstagram, faLinkedinIn, faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { TwoColumnContainer } from '../../../../components/Containers/Containers';
import { FormGroup, Input, TextArea } from '../../../../../../components/FormElements';
import BusinessContext from '../../../../../MyYellow/services/BusinessContext';

const urlRegexp = 'https?:\\/\\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)';

const ProfileDetails = () => {
  const {
    currentBusiness, saveBusinessChange,
  } = React.useContext(BusinessContext) || {};
  const [localData, setLocalData] = React.useState(currentBusiness?.details);
  const [pendingSave, setPendingSave] = React.useState(false);
  const socials = localData?.sameAs || [];
  const youtube = R.find(R.propEq('name', 'YouTube'))(localData?.sameAs || {});
  const facebook = R.find(R.propEq('name', 'Facebook'))(localData?.sameAs || {});
  const twitter = R.find(R.propEq('name', 'Twitter'))(localData?.sameAs || {});
  const linkedin = R.find(R.propEq('name', 'Linkedin'))(localData?.sameAs || {});
  const instagram = R.find(R.propEq('name', 'Instagram'))(localData?.sameAs || {});

  const onSave = async () => {
    const { success } = await saveBusinessChange(localData);
    saveBusinessChange({
      path: ['details'],
      data: localData,
    });
    setPendingSave(false);
    if (success) {
      NotificationManager.success('Changes saved', '', 5000);
    }
  };
  const onEdit = (e, path) => {
    const { value } = e.target;
    const newData = R.assocPath(
      path,
      value,
    )(localData);
    setLocalData(newData);
  };

  const handleSocialChange = (provider, value) => {
    const updatedData = R.reject(R.propEq('name', provider))(socials);
    if (value.trim()?.length > 0) {
      updatedData.push({ name: provider, url: value });
    }
    const newData = R.assocPath(
      ['sameAs'],
      updatedData,
    )(localData);
    setLocalData(newData);
  };

  const onCancel = () => setLocalData(currentBusiness);

  return (
    <TwoColumnContainer
      title="Your Profile"
      subtitle="Enter details about your business and who you are. These will flow to all of your channels unless overwritten."
      primaryAction={{ label: 'Save', onClick: onSave }}
      secondaryAction={{ label: 'Cancel', onClick: onCancel }}
      disabled={pendingSave}
    >
      <FormGroup>
        <TextArea
          id="bus-det-about"
          label="About Us"
          placeholder="Tell us about your business"
          value={localData?.description}
          onChange={(v) => onEdit(v, ['description'])}
        />
        <TextArea
          id="bus-det-slogan"
          label="What makes you different"
          placeholder="Tell us about what makes you unique"
          value={localData?.slogan}
          onChange={(v) => onEdit(v, ['slogan'])}
        />
        <Input
          id="Twitter"
          label="Twitter"
          placeholder="https://twitter.com"
          prefix={<FontAwesomeIcon icon={faTwitter} />}
          value={twitter?.url || ''}
          onChange={(e) => handleSocialChange('Twitter', e.target.value)}
          pattern={urlRegexp}
        />
        <Input
          id="Facebook"
          label="Facebook"
          placeholder="https://facebook.com"
          prefix={<FontAwesomeIcon icon={faFacebookF} />}
          value={facebook?.url || ''}
          onChange={(e) => handleSocialChange('Facebook', e.target.value)}
          pattern={urlRegexp}
        />
        <Input
          id="Instagram"
          label="Instagram"
          placeholder="https://instagram.com"
          prefix={<FontAwesomeIcon icon={faInstagram} />}
          value={instagram?.url || ''}
          onChange={(e) => handleSocialChange('Instagram', e.target.value)}
          pattern={urlRegexp}
        />
        <Input
          id="Linkedin"
          label="Linkedin"
          placeholder="https://linkedin.com"
          prefix={<FontAwesomeIcon icon={faLinkedinIn} />}
          value={linkedin?.url || ''}
          onChange={(e) => handleSocialChange('Linkedin', e.target.value)}
          pattern={urlRegexp}
        />
        <Input
          id="YouTube"
          label="YouTube"
          placeholder="https://YouTube.com"
          prefix={<FontAwesomeIcon icon={faYoutube} />}
          value={youtube?.url || ''}
          onChange={(e) => handleSocialChange('YouTube', e.target.value)}
          pattern={urlRegexp}
        />
      </FormGroup>
    </TwoColumnContainer>
  );
};

export default ProfileDetails;
