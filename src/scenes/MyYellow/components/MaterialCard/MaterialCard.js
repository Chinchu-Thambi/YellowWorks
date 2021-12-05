import { Card } from 'rebass/styled-components';
import styled from 'styled-components';
import theme from '../../../../util/theme';

/**
 * Rebass Card with default white background, medium border radius, medium shadow, and padding[3]
 */
const MaterialCard = styled(Card)`
  background-color: ${(props) => props.backgroundColor || theme.palette.base[0]};
  border-radius: ${(props) => props.borderRadius || theme.radii[2]};
  box-shadow: ${(props) => props.boxShadow || theme.shadows.medium};
  padding: ${(props) => props.padding || props.p || theme.space[3]};
  overflow-y: ${(props) => props.overflowY || 'auto'};
  width: ${(props) => (props.fullWidth ? '100%' : props.width)};
  height: ${(props) => (props.fullHeight ? '100%' : props.height)};
`;

export default MaterialCard;
