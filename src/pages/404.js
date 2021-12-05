import React from 'react';
import { Helmet } from 'react-helmet';

import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

import ufoBackground from '../assets/backgrounds/404-background.png';

import { Container } from '../components/Grid';
import { mediaBreakpointUp, theme } from '../util';

const Background = styled.div`
  background-color: ${theme.palette.contrast[2]};
`;

const Content = styled.div`
  color: ${theme.palette.base[0]};
  display: flex;
  flex-direction: column;
  width: fit-content;
  text-align: center;
  background-position: bottom center;
  margin: auto;

  ${mediaBreakpointUp('lg')} {
    margin-right: 0;
  }

  h1 {
    font-size: 7rem;
    font-weight: ${theme.fontWeight[1]};
    margin-bottom: 0;
    line-height: 7rem;

    ${mediaBreakpointUp('lg')} {
      font-size: 12rem;
      line-height: 12rem;
    }
  }

  h2 {
    margin: 0;
    font-size: ${theme.fontSizes[3]};
    font-weight: ${theme.fontWeight[0]};

    ${mediaBreakpointUp('lg')} {
      font-size: ${theme.fontSizes[5]};
    }
  }

  h3 {
    font-size: ${theme.fontSizes[4]};
    margin: 0;
    font-weight: ${theme.fontWeight[1]};

    ${mediaBreakpointUp('lg')} {
      font-size: 3rem;
    }
  }
`;

const Wrapper = styled.div`
  background-image: url(${ufoBackground});
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: bottom center;
  min-height: 130vh;
  text-align: center;

  ${mediaBreakpointUp('md')} {
    background-size: 60%;
    width: 100%;
  }
  
  ${mediaBreakpointUp('lg')} {
    background-size: contain;
    width: 100%;
    min-height: 80vh;
    text-align: right;
    background-position: 20% center;
  }

  ${mediaBreakpointUp('xl')} {
    width: 80%;
  }
`;

const ErrorPageFull = () => (
  <>
    <Helmet htmlAttributes={{ lang: 'en' }}>
      <meta charSet="utf-8" />
      <title>Page not found - please try again.</title>
    </Helmet>
    <Header />
    <Background>
      <Container as="section" width={theme.containerWidth}>
        <Wrapper>
          <Content>
            <h1>
              404
            </h1>
            <h2>Sorry this page was</h2>
            <h3>stolen by a UFO</h3>
          </Content>
        </Wrapper>
      </Container>
    </Background>
    <Footer />
  </>
);

export default ErrorPageFull;
