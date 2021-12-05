import styled from 'styled-components';

import { Flex } from 'rebass/styled-components';

const SocialWrapper = styled(Flex)`
  justify-content: center;
  margin: ${({ theme }) => theme.space[3]};

  > img {
    width: ${({ theme }) => theme.space[5]};
    margin-right: ${({ theme }) => theme.space[2]};
  }
`;

export default SocialWrapper;
