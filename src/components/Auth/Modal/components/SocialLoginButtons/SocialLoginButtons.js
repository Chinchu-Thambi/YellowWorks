import React from 'react';

import { Flex } from 'rebass/styled-components';

import AuthContext from '../../../AuthContext';

import GoogleIcon from './components/GoogleIcon';
import FacebookIcon from './components/FacebookIcon';

import { SocialButton, IconContainer, SocialText } from './SocialLoginButtons.styled';

const SocialLoginButtons = () => {
  const { loginGoogle, loginFacebook } = React.useContext(AuthContext) || {};

  return (
    <Flex
      flexDirection={['column', null, 'row']}
      alignItems="center"
      justifyContent="space-around"
      width={1}
      mb={3}
    >
      <SocialButton type="button" onClick={loginGoogle}>
        <IconContainer>
          <GoogleIcon />
        </IconContainer>
        <SocialText>
          Continue with Google
        </SocialText>
      </SocialButton>
      &nbsp;
      <SocialButton type="button" onClick={loginFacebook}>
        <IconContainer>
          <FacebookIcon />
        </IconContainer>
        <SocialText>
          Continue with Facebook
        </SocialText>
      </SocialButton>
    </Flex>
  );
};

export default SocialLoginButtons;
