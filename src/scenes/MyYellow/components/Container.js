import styled from 'styled-components';
import { mediaBreakpointUp } from '../../../util';

const DashboardContainer = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1440px;
  padding: ${({ theme }) => theme.space[1]};

  ${mediaBreakpointUp('md')} {
    padding: ${({ theme }) => theme.space[3]};
  }
`;

export default DashboardContainer;
