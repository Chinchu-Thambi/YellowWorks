import BaseForm from 'react-jsonschema-form';
import styled from 'styled-components';

import { mediaBreakpointUp } from '../../../util';

export const Form = styled(BaseForm)`
  input, textarea {
    background: ${({ theme }) => theme.palette.base[0]};
    border: 1px solid ${({ theme }) => theme.palette.contrast[1]};
    color: ${({ theme }) => theme.palette.contrast[0]};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    padding: ${({ theme }) => theme.space[2]};
    width: 100%;
    max-width: 100%;
  }

  select {
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }

  .field {
    margin-bottom: ${({ theme }) => theme.space[3]};
  }

  .field-object {
    margin-bottom: ${({ theme }) => theme.space[5]};
  }

  .control-label {
    display: block;
    font-size: ${({ theme }) => theme.fontSizes[4]};
    margin-bottom: ${({ theme }) => theme.space[3]};
  }

  .field-description {
    margin: 0 0 ${({ theme }) => theme.space[3]};
    color: ${({ theme }) => theme.palette.contrast[1]};
    line-height: 2;
  }

  .field-radio-group {
    display: flex;
    text-transform: capitalize;
    font-size: ${({ theme }) => theme.fontSizes[3]};

    .radio {
      margin-right: ${({ theme }) => theme.space[5]};
      
      > label > span {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        > input {
          position: absolute;
          top: 45px;
          left: 7px;
          z-index: 0;
          opacity: 0;
          width: auto;

          + span::before,
          + span::after {
            position: relative;
            z-index: 10;
            margin-top: ${({ theme }) => theme.space[2]};
            content: '';
            display: block;
            width: ${({ theme }) => theme.space[4]};
            height: ${({ theme }) => theme.space[4]};
            background: ${({ theme }) => theme.palette.base[3]};
            border-radius: ${({ theme }) => theme.space[4]};
          }

          + span::before {
            display: none;
          }

          :checked + span::before,
          :checked + span::after {
            background: ${({ theme }) => theme.palette.base[0]};
            border: 8px solid ${({ theme }) => theme.palette.contrast[0]};
            width: ${({ theme }) => theme.space[4]};
            height: ${({ theme }) => theme.space[4]};
          }

          :focus + span::before,
          :focus + span::after {
            box-shadow: 0 2px 4px ${({ theme }) => theme.palette.contrast[2]};
          }
        }

        &.horizontal {
          display: inline-block;
          font-size: ${({ theme }) => theme.fontSizes[2]};
          margin-top: ${({ theme }) => theme.space[4]};
          line-height: ${({ theme }) => theme.fontSizes[4]};

          > span::before {
            display: inline-block;
            vertical-align: middle;
            margin-top: 0;
            margin-right: ${({ theme }) => theme.space[2]};
          }
          > span::after {
            display: none;
          }
        }
      }
    }
  }
`;

export const StyledForm = styled.form`

  >div {
    margin-bottom: ${({ theme }) => theme.space[4]};
  }
  input, textarea {
    background: ${({ theme }) => theme.palette.base[0]};
    border: 1px solid ${({ theme }) => theme.palette.contrast[1]};
    color: ${({ theme }) => theme.palette.contrast[0]};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    padding: ${({ theme }) => theme.space[2]};
    width: 100%;
    max-width: 100%;
  }

  select {
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }

  .field {
    margin-bottom: ${({ theme }) => theme.space[3]};
  }

  .field-object {
    margin-bottom: ${({ theme }) => theme.space[5]};
  }

  .control-label {
    display: block;
    font-size: ${({ theme }) => theme.fontSizes[4]};
    margin-bottom: ${({ theme }) => theme.space[3]};
  }

  .field-description {
    margin: 0 0 ${({ theme }) => theme.space[3]};
    color: ${({ theme }) => theme.palette.contrast[1]};
    line-height: 2;
  }

  .field-radio-group {
    display: flex;
    text-transform: capitalize;
    font-size: ${({ theme }) => theme.fontSizes[3]};

    .radio {
      margin-right: ${({ theme }) => theme.space[5]};
      
      > label > span {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        > input {
          position: absolute;
          top: 45px;
          left: 7px;
          z-index: 0;
          opacity: 0;
          width: auto;

          + span::before,
          + span::after {
            position: relative;
            z-index: 10;
            margin-top: ${({ theme }) => theme.space[2]};
            content: '';
            display: block;
            width: ${({ theme }) => theme.space[4]};
            height: ${({ theme }) => theme.space[4]};
            background: ${({ theme }) => theme.palette.base[3]};
            border-radius: ${({ theme }) => theme.space[4]};
          }

          + span::before {
            display: none;
          }

          :checked + span::before,
          :checked + span::after {
            background: ${({ theme }) => theme.palette.base[0]};
            border: 8px solid ${({ theme }) => theme.palette.contrast[0]};
            width: ${({ theme }) => theme.space[4]};
            height: ${({ theme }) => theme.space[4]};
          }

          :focus + span::before,
          :focus + span::after {
            box-shadow: 0 2px 4px ${({ theme }) => theme.palette.contrast[2]};
          }
        }

        &.horizontal {
          display: inline-block;
          font-size: ${({ theme }) => theme.fontSizes[2]};
          margin-top: ${({ theme }) => theme.space[4]};
          line-height: ${({ theme }) => theme.fontSizes[4]};

          > span::before {
            display: inline-block;
            vertical-align: middle;
            margin-top: 0;
            margin-right: ${({ theme }) => theme.space[2]};
          }
          > span::after {
            display: none;
          }
        }
      }
    }
  }
`;

export const NavControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.space[3]};

  button {
    padding-left: ${({ theme }) => theme.space[4]};
    padding-right: ${({ theme }) => theme.space[4]};

    :nth-child(2) {
      margin-left: ${({ theme }) => theme.space[3]};
    }
  }

  ${mediaBreakpointUp('md')} {
    justify-content: flex-end;

    button {
      padding-left: ${({ theme }) => theme.space[5]};
      padding-right: ${({ theme }) => theme.space[5]};

      :nth-child(2) {
        margin-left: ${({ theme }) => theme.space[3]};
      }
    }
  }

`;

export const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  input {
    width: auto;
    margin-right: ${({ theme }) => theme.space[2]};
  }
`;
