import styled from 'styled-components';

import { mediaBreakpointUp } from '../../../../util';

export const EditWrapper = styled.div`
text-align: center;

${mediaBreakpointUp('md')} {
  min-width: 390px;
  max-width: 650px;
}
`;

export const CallbackWrapper = styled.div`
text-align: center;

${mediaBreakpointUp('md')} {
  min-width: 100%; 
}
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

export const Label = styled.p`
  text-align: left;
  font-weight: ${({ theme }) => theme.fontWeight[1]};

  ${mediaBreakpointUp('lg')} {
    width: 30%;
    margin-right: ${({ theme }) => theme.space[2]};
  }
`;

export const CheckWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.space[2]};
  
  img {
    padding-right: ${({ theme }) => theme.space[2]};
  }

  ${mediaBreakpointUp('lg')} {
    margin-right: ${({ theme }) => theme.space[3]};
    display: flex;
    align-items: center;
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.space[2]} 0;  

  input {
    width: auto;
    margin-right: ${({ theme }) => theme.space[2]};
    height: 20px;
    width: 20px;
  }
`;
