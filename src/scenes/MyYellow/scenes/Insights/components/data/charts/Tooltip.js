import { Card } from 'rebass';
import styled from 'styled-components';
import theme from '../../../../../../../util/theme';

const Tooltip = styled(Card)`
  border-radius: 3px;
  box-shadow: ${theme.shadows.small};
  padding: ${theme.space[2]} ${theme.space[3]};
  background: ${theme.palette.contrast[5]};
`;

export default Tooltip;
