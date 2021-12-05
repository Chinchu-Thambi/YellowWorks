import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { StepsBar } from '../UI';

import squareLogo from '../../assets/logos/square.svg';
import organicDesktop from '../../assets/shapes/organicDesktop.svg';
import organicMobile from '../../assets/shapes/organicMobile.svg';


import {
  Container,
  LogoImg,
  Content,
  OrganicDesktopShape,
  OrganicMobileShape,
  Heading,
  FormContainer,
  Loading,
  WizardWrapper,
  LeftSideContent,
  LogoContainer,
} from './Styled';

const Wizard = ({
  title,
  text,
  homeLink,
  completeSteps,
  totalSteps,
  children,
  className,
}) => (
  <WizardWrapper className={className}>
    <Container>
      <LogoContainer>
        <Link to={homeLink}>
          <LogoImg src={squareLogo} alt="Yellow Logo" />
        </Link>
      </LogoContainer>
      <Content>
        <LeftSideContent>
          <OrganicDesktopShape src={organicDesktop} />
          <OrganicMobileShape src={organicMobile} />
          <Heading>
            <h1>{title}</h1>
            { text && (
              <div>{text}</div>
            )}
            <StepsBar complete={completeSteps} total={totalSteps} />
          </Heading>
        </LeftSideContent>

        <FormContainer>
          {!children ? (<Loading />) : children}
        </FormContainer>
      </Content>
    </Container>
  </WizardWrapper>
);

Wizard.defaultProps = {
  title: '',
  text: '',
  homeLink: '/my-yellow/my-products',
  completeSteps: 0,
  totalSteps: 0,
  className: '',
};

Wizard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  homeLink: PropTypes.string,
  completeSteps: PropTypes.number,
  totalSteps: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

export default Wizard;
