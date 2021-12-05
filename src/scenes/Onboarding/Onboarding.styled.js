import styled from 'styled-components';

import nextStep from '../../assets/shapes/next-step.png';
import { BaseContainer, Container } from '../../components/Grid';

import { mediaBreakpointUp } from '../../util';

export const ExtendedContainer = styled(BaseContainer)`
  justify-content: space-between;
  > h1 {
    text-align: center;
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    font-size: ${({ theme }) => theme.fontSizes[5]};
    margin-top: ${({ theme }) => theme.space[5]};
    margin-bottom: 0;
  }
`;

export const TooltipWrapper = styled.div`
.rc-slider-tooltip-inner {
  padding: 6px 20px;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: 1;
  color: #fff;
  text-align: center;
  text-decoration: none;
  background-color: ${({ theme }) => theme.palette.contrast[0]};
  border-radius: 6px;
  box-shadow: 0 0 4px #d9d9d9;
}
.rc-slider-tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.rc-slider-tooltip-placement-top .rc-slider-tooltip-arrow {
  bottom: 4px;
  left: 50%;
  margin-left: -4px;
  border-width: 4px 4px 0;
  border-top-color: ${({ theme }) => theme.palette.contrast[0]};
}
`;

export const Summary = styled.div`
  form {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
  }
  >div:first-child {
    flex-grow: 2;
  }

  label {
    padding-left: ${({ theme }) => theme.space[2]};
  }

  .input {
    input {
      width: 40%;
      border-color: ${({ theme }) => theme.palette.base[3]};
    }

    label {
      font-size: ${({ theme }) => theme.fontSizes[2]};
      font-weight: ${({ theme }) => theme.fontWeight[1]};
      margin-right: ${({ theme }) => theme.space[1]};
    }
  }
  p {
      max-width: 80%;
      line-height: 1.5;
    }
`;

export const Label = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight[1]};
  width: 50%;
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.palette.error[0]};
`;

export const ConfirmContainer = styled(Container)`
  justify-content: space-between;
  text-align: center;
  margin-bottom: 0;
  padding: 0;

  > h2 {
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    font-size: ${({ theme }) => theme.fontSizes[3]};
    color: ${({ theme }) => theme.palette.success[1]};
  }
`;

export const NextStepContainer = styled.div`
  color: ${({ theme }) => theme.palette.base[0]};
  background: url(${nextStep});
  background-size: 200% 140%;
  background-position: 74%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.space[4]};
  padding-top: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('md')} {
    background-size: contain;
    background-position: 45% 50%;
    padding: ${({ theme }) => theme.space[6]} 0 ${({ theme }) => theme.space[8]};
    min-height: 190px;
  }

  ${mediaBreakpointUp('lg')} {
    background-position: 48% 50%;
  }

  > h2 {
    font-size: ${({ theme }) => theme.fontSizes[4]};
    margin: 0;

    ${mediaBreakpointUp('md')} {
      width: 400px;
    }
  }

  > p {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    margin-bottom: ${({ theme }) => theme.space[3]};
    line-height: 1.5;

    ${mediaBreakpointUp('md')} {
      width: 400px;
      padding: 0 ${({ theme }) => theme.space[5]};
    }
  }
`;

export const Email = styled.div`
  color: ${({ theme }) => theme.palette.navigation[0]};

  ${mediaBreakpointUp('md')} {
    width: 226px;
  }
`;

export const Phone = styled.div`
  margin: ${({ theme }) => theme.space[2]} 0;
  vertical-align: middle;
  color: ${({ theme }) => theme.palette.contrast[2]};
  font-weight: ${({ theme }) => theme.fontWeight[0]};
  font-size: ${({ theme }) => theme.fontSizes[3]};

  ${mediaBreakpointUp('md')} {
    margin-top: ${({ theme }) => theme.space[4]};
  }
`;

export const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.palette.contrast[2]};
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.space[4]};

  ${mediaBreakpointUp('md')} {
    flex-direction: row;
    margin-bottom: 0;
  }
`;


export const ContactSeparator = styled.div`
  display: none;
  height: 120px;
  width: 1px;
  margin: 0 ${({ theme }) => theme.space[4]};
  background: ${({ theme }) => theme.palette.contrast[3]};

  ${mediaBreakpointUp('md')} {
    display: block;
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: ${({ theme }) => theme.space[2]};
  background: ${({ theme }) => theme.palette.contrast[0]};
`;

export const SuggestionSlider = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.palette.contrast[5]};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[4]};
  margin-top: ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('lg')} {
    flex-direction: row;
    margin-top: ${({ theme }) => theme.space[6]};
  }

  >div {
    ${mediaBreakpointUp('lg')} {
      padding: 0 ${({ theme }) => theme.space[4]};
    }
  }

  button {
    text-transform: none;
    font-size: inherit;
    font-weight: inherit;
    padding: 0 ${({ theme }) => theme.space[1]};
  }

`;

export const CallbackContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.base[1]};

  input, textarea {
    background: ${({ theme }) => theme.palette.base[0]};
    color: ${({ theme }) => theme.palette.contrast[0]};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    padding: ${({ theme }) => theme.space[2]};
    width: 100%;
    max-width: 100%;
  }
`;

export const Total = styled.div`
  display: flex;
  justify-content: flex-end;

  p {
    font-size: ${({ theme }) => theme.fontSizes[5]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
  }

  small {
    line-height: ${({ theme }) => theme.fontSizes[5]};
    margin: auto ${({ theme }) => theme.space[2]};
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;

  tr, th, td {
    border: 1px solid black;
  }

  th, td {
    padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  }
  
`;
