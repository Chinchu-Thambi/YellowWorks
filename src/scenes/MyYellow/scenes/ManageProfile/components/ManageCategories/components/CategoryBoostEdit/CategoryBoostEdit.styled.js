import styled from 'styled-components';
import { mediaBreakpointUp } from '../../../../../../../../util';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  min-width: 100%;

  ${mediaBreakpointUp('md')} {
    min-width: 320px;
  }
`;
