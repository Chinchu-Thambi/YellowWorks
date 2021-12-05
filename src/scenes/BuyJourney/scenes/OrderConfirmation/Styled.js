import styled from 'styled-components';

import nextStep from '../../../../assets/shapes/next-step.png';
import { BaseContainer, Container } from '../../../../components/Grid';
import { mediaBreakpointUp } from '../../../../util';


export const ExtendedContainer = styled(BaseContainer)`
  justify-content: space-between;
  > h1 {
    text-align: center;
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    font-size: ${({ theme }) => theme.fontSizes[5]};
    margin-top: ${({ theme }) => theme.space[5]};
    margin-bottom: ${({ theme }) => theme.space[0]};
  }
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

export const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  color: ${({ theme }) => theme.palette.contrast[2]};
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('md')} {
    flex-direction: row;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }
`;


export const ContactSeparator = styled.div`
  height: 120px;
  width: 1px;
  margin: 0 ${({ theme }) => theme.space[4]};
  background: ${({ theme }) => theme.palette.contrast[3]};
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: ${({ theme }) => theme.space[2]};
  background: ${({ theme }) => theme.palette.contrast[0]};
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
