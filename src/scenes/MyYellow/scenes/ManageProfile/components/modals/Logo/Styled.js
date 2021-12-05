import { Flex } from 'rebass';
import styled from 'styled-components';

import { theme } from '../../../../../../../util';

export const DataWrapper = styled(Flex)`
  position: relative;
`;

export const Actions = styled.div`
  position: absolute;
  bottom: ${theme.space[1]};
  right: 0;
  width: 100%;
  text-align: center;
`;
