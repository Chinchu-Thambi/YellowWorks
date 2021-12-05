import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Box } from 'rebass';

import facebookIcon from '../../../../../../../../../../assets/icons/social/dark/facebook.svg';
import twitterIcon from '../../../../../../../../../../assets/icons/social/dark/twitter.svg';
import linkedInIcon from '../../../../../../../../../../assets/icons/social/dark/linkedin.svg';
import instagramIcon from '../../../../../../../../../../assets/icons/social/dark/instagram.svg';
import youtubeIcon from '../../../../../../../../../../assets/icons/social/dark/youtube.svg';

import ProductContext from '../../../../../../../../services/ProductContext';
import Spinner from '../../../../../../../../../../components/Spinner';
import Button from '../../../../../../../../../../components/Button';
import getIsPremium from '../../../../../../../../services/getIsPremium';

import {
  ButtonContainer, ErrorMessage, FormControl, EditWrapper,
} from '../../../../../modals/Styled';

import { PremiumModalPrompt } from '../../../../../PremiumOnly';

import SocialWrapper from '../../SocialMediaLinks.styled';

const path = ['businessProfile', 'sameAs'];

const SocialMediaLinksModal = ({ onDismiss }) => {
  const productState = React.useContext(ProductContext) || {};
  const isPremium = getIsPremium(productState) || false;
  const [localData, setLocalData] = React.useState(R.path(path, productState.formData) || []);
  const [hasErrors, setHasErrors] = React.useState(false);
  const [pendingSave, setPendingSave] = React.useState(false);

  const regExp = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);

  const checkValidity = (value) => regExp.test(value.url);

  const handleChange = (provider, value) => {
    setHasErrors(false);
    const updatedData = R.reject(R.propEq('name', provider))(localData);
    if (value.trim()?.length > 0) {
      updatedData.push({ name: provider, url: value });
    }

    setLocalData(updatedData);
  };

  const handleSave = async () => {
    if (!localData.every(checkValidity)) {
      setHasErrors(true);
      return;
    }
    setPendingSave(true);
    const { success } = await productState.saveData({
      path,
      data: localData,
    });
    setPendingSave(false);
    if (success) {
      onDismiss();
    }
  };

  const getValue = (name) => R.find(R.propEq('name', name))(localData)?.url || '';

  return (
    <EditWrapper>
      {isPremium ? (
        <>
          <SocialWrapper>
            <img src={facebookIcon} alt="Facebook" />
            <FormControl
              placeholder="Facebook Url"
              type="text"
              value={getValue('Facebook')}
              onChange={(e) => handleChange('Facebook', e.target.value)}
              minLength={1}
              required
              disabled={!isPremium}
            />
          </SocialWrapper>
          <SocialWrapper>
            <img src={twitterIcon} alt="Twitter" />
            <FormControl
              placeholder="Twitter Url"
              type="text"
              value={getValue('Twitter')}
              onChange={(e) => handleChange('Twitter', e.target.value)}
              minLength={1}
              required
              disabled={!isPremium}
            />
          </SocialWrapper>
          <SocialWrapper>
            <img src={instagramIcon} alt="Instagram" />
            <FormControl
              placeholder="Instagram Url"
              type="text"
              value={getValue('Instagram')}
              onChange={(e) => handleChange('Instagram', e.target.value)}
              minLength={1}
              required
              disabled={!isPremium}
            />
          </SocialWrapper>
          <SocialWrapper>
            <img src={linkedInIcon} alt="LinkedIn" />
            <FormControl
              placeholder="LinkedIn Url"
              type="text"
              value={getValue('LinkedIn')}
              onChange={(e) => handleChange('LinkedIn', e.target.value)}
              minLength={1}
              required
              disabled={!isPremium}
            />
          </SocialWrapper>
          <SocialWrapper>
            <img src={youtubeIcon} alt="YouTube" />
            <FormControl
              placeholder="YouTube Url"
              type="text"
              value={getValue('YouTube')}
              onChange={(e) => handleChange('YouTube', e.target.value)}
              minLength={1}
              required
              disabled={!isPremium}
            />
          </SocialWrapper>

          {hasErrors && <ErrorMessage>Must be a valid https:// or http:// URL. e.g. https://www.example.com </ErrorMessage>}
          <ButtonContainer>
            {pendingSave && (
              <Box alignSelf="center" mr={2}>
                <Spinner size={16} mr={2} />
              </Box>
            )}
            <Button onClick={handleSave} disabled={pendingSave || undefined} size="sm">save</Button>
          </ButtonContainer>
        </>
      ) : (
        <PremiumModalPrompt subscriptionId={productState?.subscriptionId} />
      )}
    </EditWrapper>
  );
};

SocialMediaLinksModal.defaultProps = {
  onDismiss: () => { },
};
SocialMediaLinksModal.propTypes = {
  onDismiss: PropTypes.func,
};

export default SocialMediaLinksModal;
