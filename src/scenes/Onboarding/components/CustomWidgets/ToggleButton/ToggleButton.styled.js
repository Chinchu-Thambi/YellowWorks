import styled from 'styled-components';
import { mediaBreakpointUp } from '../../../../../util';

export const ToggleWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.contrast[0]};;
  border-radius: 30px;
  width: 100%;
  min-height: 36px;
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  margin-bottom: ${({ theme }) => theme.space[6]};

  ${mediaBreakpointUp('lg')} {
    font-size: ${({ theme }) => theme.fontSizes[3]};
  }
 
  button {
    background: ${({ theme }) => theme.palette.base[0]};
    color: ${({ theme }) => theme.palette.contrast[0]};
  }

  .active {
    background: ${({ theme }) => theme.palette.contrast[0]};
    color: ${({ theme }) => theme.palette.base[0]};
  }

  button:first-of-type {
    border: none;
    width: 50%;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  button:last-of-type {
    border: none;
    width: 50%;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }
`;

export const Icon = styled.img`
  padding: 0 ${({ theme }) => theme.space[1]};
`;
