import React from 'react';
import styled from 'styled-components';

import Spinner from '../Spinner';
import { BaseContainer, Container as GridContainer } from '../Grid';
import { mediaBreakpointUp } from '../../util';

export const Container = styled(GridContainer)`
  width: 100%;
  height: 100%;
  outline: none;
  margin-bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ExtendedContainer = styled(BaseContainer)`
  position: relative;
  width: 100%!important;
`;

export const LogoImg = styled.img`
  width: 68px;

  ${mediaBreakpointUp('md')} {
    width: auto;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  min-height: 100%;

  @media (max-width: 760px) {
    display: block;
    width: 100%;
  }
`;

export const OrganicDesktopShape = styled.img`
  width: 940px;
  left: -270px;
  position: absolute;
  top: ${({ theme }) => theme.space[2]};

  @media (max-width: 1170px) {
    width: 680px;
    left: -168px;
    top: 52px;
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

export const OrganicMobileShape = styled.img`
  display: none;
  position: absolute;

  @media (max-width: 760px) {
    width: 115%;
    left: -48px;
    top: -128px;
    height: auto;
    display: block;
  }

  @media (max-width: 600px) {
    top: -94px;
    width: 120%;
  }

  @media (max-width: 420px) {
    top: -60px;
    width: 149%;
    left: -74px;
  }
`;

export const Heading = styled.div`
  top: 44%;
  left: 2%;
  position: fixed;
  width: 500px;
  padding: 0 ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.palette.base[0]};
  border-radius: ${({ theme }) => theme.space[8]};
  background: ${({ theme }) => theme.palette.contrast[2]};

  @media (max-width: 1170px) {
    top: 36%;
    left: 17px;
    width: 38%;
  }

  @media (max-width: 760px) {
    position: relative;
    left: 0;
    width: 100%;
    margin-top: 106px;
    padding-bottom: 20px;
  }

  > h1 {
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes[4]};
    text-shadow: 1px 1px 3px ${({ theme }) => theme.palette.contrast[2]};

    @media (max-width: 420px) {
      font-size: ${({ theme }) => theme.fontSizes[3]};
    }
  }

  > div {
    line-height: 2;
    margin-bottom: ${({ theme }) => theme.space[5]};
  }
`;

export const WizardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background: ${({ theme }) => theme.palette.contrast[3]};

  ${mediaBreakpointUp('md')} {
    background: ${({ theme }) => theme.palette.base[0]};
    padding: 0 ${({ theme }) => theme.space[4]};
  }
`;

export const LeftSideContent = styled.div`
  top: 6%;
  height: 100%;
  width: 686px;

  @media (max-width: 760px) {
    width: 100%;
  }
`;

export const FormContainer = styled.div`
  position: relative;
  z-index: 20;
  margin-left: 20%;
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.space[2]};
  background: ${({ theme }) => theme.palette.base[0]};

  h2 {
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }

  ${mediaBreakpointUp('lg')} {
    width: 60%;
    margin: auto;
  }

  ${mediaBreakpointUp('xl')} {
    margin-left: 10%;
  }
`;

export const Loading = () => (
  <div>
    <h2>Loading, please wait.</h2>
    <Spinner />
  </div>
);

export const LogoContainer = styled.div`
  top: 16px;
  left: 8px;
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.dropdown};

  img {
    position: relative;
    z-index: 10;
  }

  ::after {
    content: '';
    display: block;
    background: #fff;
    position: absolute;
    top: -5px;
    right: 0px;
    bottom: -5px;
    left: -10px;
    border: 100%;
    z-index: 0;
    border-radius: 100%;
  }
`;
