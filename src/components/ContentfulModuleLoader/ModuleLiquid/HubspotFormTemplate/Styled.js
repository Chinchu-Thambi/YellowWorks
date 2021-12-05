import React from 'react';
import styled from 'styled-components';

import { Container as GridContainer, BaseContainer } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

const InnerContainer = styled(BaseContainer)`
  display: flex;
  flex-wrap: wrap;

  ${mediaBreakpointUp('lg')} {
    display: table;
  }

  img {
    float: left;
    margin: ${({ theme }) => theme.space[3]} 0;

    ${mediaBreakpointUp('lg')} {
      margin-right: ${({ theme }) => theme.space[5]};
    }
  }
`;

export const Background = styled.div`
  background-color: ${(props) => props.color};
  overflow: hidden;
  max-width: 100%;
`;

export const Container = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <GridContainer ExtendedContainer={InnerContainer} {...props} />
);
export const ContainerX = styled(BaseContainer)`
  &&&& {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    max-width: 100%;
    color: ${({ theme }) => theme.palette.contrast[2]};
    margin-bottom: 0;

    .hs-form-field>label {
      clip: rect(1px, 1px, 1px, 1px);
      height: 1px;
      overflow: hidden;
      position: absolute;
      width: 1px;
    }

    .form-columns-2 {
      .input {
        border: 1px solid ${({ theme }) => theme.palette.contrast[5]};
      }

      .field {
        margin-bottom: ${({ theme }) => theme.space[3]};
      }
    }

    .hs-form-field-input {
      width:100%;
    }

    fieldset {
      max-width: 100%;

      input, textarea, hs-input, select {
        width: 100%;
        font-size: ${({ theme }) => theme.fontSizes[2]};
        font-weight: ${({ theme }) => theme.fontWeight[0]};;
        color: ${({ theme }) => theme.palette.contrast[2]};
        padding: ${({ theme }) => theme.space[2]};
        border: 1px solid ${({ theme }) => theme.palette.contrast[4]};
        border-radius: ${({ theme }) => theme.radii[2]};
      }
    }

    ul {
      list-style: none;
      padding: 0;
      color: ${({ theme }) => theme.palette.accent[2][0]};
    }

    .submitted-message {
      text-align: center;
    }

    .hs-button.primary {
      font-weight: ${({ theme }) => theme.fontWeight[0]};
      display: inline-block;
      background: ${({ theme }) => theme.colors.primary};
      padding: 20px 40px;
      border-radius: 40px;
      width: 100%;
      border: 0;
      text-transform: uppercase;

      ${mediaBreakpointUp('md')} {
        width: auto;
      }
    }

    .actions {
      text-align: center;
      padding-bottom: ${({ theme }) => theme.space[4]};
    }

    select {
      height: 42px;
    }

    .hs-submit {
      margin-top: ${({ theme }) => theme.space[4]};
    }
  }
`;
