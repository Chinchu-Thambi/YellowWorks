import styled from 'styled-components';
import { Flex } from 'rebass/styled-components';

import { mediaBreakpointUp } from '../../../../../../util';

export const EditWrapper = styled.div`
  text-align: center;

  ${mediaBreakpointUp('md')} {
    min-width: 390px;
    max-width: 650px;
  }
`;

export const Instruction = styled.p`
  margin: ${({ theme }) => theme.space[2]} 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.space[3]};

  button {
    margin: 0 ${({ theme }) => theme.space[2]};
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.palette.error[0]};
`;

export const TextLeft = styled.p`
  text-align: left;
`;

export const Contact = styled.div`
  p {
    text-align: left;
  }
`;

export const Form = styled.form`
  flex-grow: 1;
  margin: auto;
  text-align: left;

  ${Flex} {
    > input {
      width: 48%;
    }
  }
`;


// @TODO: Add form control style in the FormControls/Input control when the component is implemented.
export const FormControl = styled.input`
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.palette.contrast[0]};
  border: 1px solid ${({ theme }) => theme.palette.contrast[3]};
  max-width: 100%;
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;

  &::before {
    content: "▼";
    padding: 0;
    margin: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    height: 14px;
    width: ${({ theme }) => theme.space[2]};
    right: ${({ theme }) => theme.space[2]};
    font-size: ${({ theme }) => theme.fontSizes[0]};
  }
`;

export const FormControlSelect = styled.select`
  cursor: pointer;
  appearance: none;
  position: relative;
  padding: ${({ theme }) => theme.space[2]};
  padding-right: ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.palette.contrast[0]};
  border: 1px solid ${({ theme }) => theme.palette.contrast[3]};
`;

export const FormControlTextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.palette.contrast[0]};
  border: 1px solid ${({ theme }) => theme.palette.contrast[3]};

  ${mediaBreakpointUp('lg')} {
    min-width: 500px;
    min-height: 200px;
  }
`;

// @TODO: Remove default export when all the ButtonContainer imports are changed on the Modals edit view.
export const CategoryBoostWrapper = styled.div`
  h2 {
    display: none;
  }
`;

export const EmployeeDetail = styled(Flex)`
  font-weight: ${({ theme }) => theme.fontWeight[1]};
`;

export const EmployeeInformation = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight[0]};
`;

export const Label = styled.p`
  margin: 0 ${({ theme }) => theme.space[4]} 0 0;
  font-weight: ${({ theme }) => theme.fontWeight[1]};
`;

export const Primary = styled.p`
  margin-right: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
`;

export default ButtonContainer;
