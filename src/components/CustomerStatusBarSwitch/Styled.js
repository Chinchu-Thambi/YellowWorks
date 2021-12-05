import styled from 'styled-components';
import { Flex } from 'rebass/styled-components';

import Button from '../Button';

export const FlexContainer = styled(Flex)`
  align-items: center;
  line-height: 1.5;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
`;

export const Container = styled.div`
  width: 94%;
  max-width: calc(1440px - 40px);
  margin: ${({ theme }) => theme.space[2]} auto;
  border-radius: ${({ theme }) => theme.space[1]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  color: ${({ theme }) => theme.palette.accent[4][1]};
  background: ${({ theme }) => theme.palette.accent[4][5]};
  border: 1px solid ${({ theme }) => theme.palette.accent[4][3]};

  a {
    color: ${({ theme }) => theme.palette.accent[4][1]};
  }
`;

export const ChangeButton = styled(Button)`
  padding: ${({ theme }) => theme.space[0]};
  color: ${({ theme }) => theme.palette.accent[4][1]};
  margin-left: ${({ theme }) => theme.space[3]};
`;
