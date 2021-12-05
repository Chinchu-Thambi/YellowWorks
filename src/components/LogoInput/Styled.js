import styled from 'styled-components';

import { mediaBreakpointUp } from '../../util';

export const Wrapper = styled.div`
  ${mediaBreakpointUp('md')} {
    width: 50%;
    min-width: 300px;
  }
`;

export const DropView = styled.div`
  border: 2px dashed ${({ theme }) => theme.palette.contrast[4]};
  text-align: center;
  color: ${({ theme }) => theme.palette.contrast[3]};
  padding: ${({ theme }) => theme.space[3]} 0;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  ${mediaBreakpointUp('md')} {
    min-width: 300px;
  }

  h3 {
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin: 0;
  }

  p {
    margin: 0 0 ${({ theme }) => theme.space[1]};
  }
`;
