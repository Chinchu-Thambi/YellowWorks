import styled from 'styled-components';

import { mediaBreakpointUp } from '../../../../../util';

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

export default ButtonContainer;
