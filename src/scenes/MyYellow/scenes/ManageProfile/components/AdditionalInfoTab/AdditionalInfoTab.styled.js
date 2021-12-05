import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import facebookIcon from '../../../../../../assets/icons/social/light/facebook.svg';
import twitterIcon from '../../../../../../assets/icons/social/light/twitter.svg';
import linkedinIcon from '../../../../../../assets/icons/social/light/linkedin.svg';
import instagramIcon from '../../../../../../assets/icons/social/light/instagram.svg';
import youtubeIcon from '../../../../../../assets/icons/social/light/youtube.svg';

const SocialIcon = styled.img`
  width: ${({ theme }) => theme.space[4]};
  height: ${({ theme }) => theme.space[4]};
`;

export const SwitchWrapper = styled.div`
  text-align: right;
  font-size: ${({ theme }) => theme.fontSizes[1]};
`;

export const SocialButton = ({ url, name }) => {
  const iconMap = {
    Facebook: facebookIcon,
    Twitter: twitterIcon,
    Instagram: instagramIcon,
    YouTube: youtubeIcon,
    LinkedIn: linkedinIcon,
  };

  return (
    <a href={url} aria-label={name}>
      <SocialIcon src={iconMap[name]} alt={name} aria-hidden />
    </a>
  );
};

SocialButton.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
