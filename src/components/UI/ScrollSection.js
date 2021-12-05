import styled from 'styled-components';
import theme from '../../util/theme';

const ScrollSection = styled.div`
  max-height: 100px;
  overflow-y: auto;
  margin-right: ${theme.space[3]};
`;

export default ScrollSection;
