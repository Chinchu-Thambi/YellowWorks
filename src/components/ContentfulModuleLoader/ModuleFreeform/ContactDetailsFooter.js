import styled, { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass/styled-components';

import { Container as GridContainer, BaseContainer } from '../../Grid';
import { mediaBreakpointUp, theme } from '../../../util';

import waveBottom from '../../../assets/shapes/waveBottom.svg';

const InnerContainer = styled(BaseContainer)`
  display: flex;
`;

export const Wrapper = styled.div`
  position: relative;
  bottom: 80px;

  ${mediaBreakpointUp('md')} {
    bottom: 20px;
  }
`;

export const Background = styled.div`
  background-color: ${theme.palette.base[1]};
  padding: ${theme.space[1]};
  position: relative;
  top: ${theme.space[7]};
  z-index: 100;

  ${mediaBreakpointUp('md')} {
    padding: ${theme.space[1]};
    top: 0;
  }
`;

export const Mask = styled.div`
  background-color: ${theme.palette.base[1]};
  box-sizing: content-box;
  padding-top: ${theme.space[2]};
  padding-bottom: ${theme.space[2]};
  background-color: ${theme.palette.base[0]};
  background-image: url(${waveBottom});
  background-size: cover;
  background-repeat: no-repeat;
  height: 6vw;
  background-position: bottom;
  position: relative;
  top: 79px;
  
  ${mediaBreakpointUp('md')} {
    top: -1px;
  }
  
  ${mediaBreakpointUp('xl')} {
    top: -3px;
  }
`;

const ContainerBase = (props) => styled(
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridContainer ExtendedContainer={InnerContainer} {...props} />,
);

export const Container = styled(ContainerBase)`
  margin: auto;
  margin-bottom: 0;
  width: 100%;

  ${mediaBreakpointUp('lg')} {
    width: 60%;
  }
`;

export const Content = styled(Box)`
  color: ${theme.palette.contrast[0]};
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 0;
  text-align: center;
  font-size: ${theme.fontSizes[2]};

  span {
    line-height: 1.25em;
    font-weight: ${theme.fontWeight[0]};
    margin: 0;
    text-align: left;

    strong {
      display: block;
    }

    a {
      color: ${theme.palette.contrast[0]};
      text-decoration: none;
    }

  }
  ${mediaBreakpointUp('lg')} {
    font-size: ${theme.fontSizes[5]};
    justify-content: space-between;
  }
`;

const ContactDetailsFooter = ({
  phone,
  email,
}) => (
  <Wrapper>
    <Background>
      <Container
        as="section"
        id="contact-us"
      >
        <Content>
          <span>
            <strong>Call us on</strong>
            <a href={`tel:${phone}`} alt="Click here to call us">{phone}</a>
          </span>
          <span>
            <strong>Email us on</strong>
            <a href={`mailto: ${email}`} alt="Click here to email us">{email }</a>
          </span>
        </Content>
      </Container>
    </Background>
    <Mask />
  </Wrapper>
);


ContactDetailsFooter.defaultProps = {};

ContactDetailsFooter.propTypes = {
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default withTheme(ContactDetailsFooter);
