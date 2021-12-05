import styled from 'styled-components';
import { Flex } from 'rebass/styled-components';
import book from '../../../../../../../../assets/backgrounds/YP-Listing-3.jpg';

import { mediaBreakpointUp } from '../../../../../../../../util';

export const Book = styled(Flex)`
  align-items: self-start;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${book});
  height: 300px;
  justify-content: center;
  padding: 20% 0;

  ${mediaBreakpointUp('sm')} {
    padding: 15% 0;
  }
`;

export const Preview = styled(Flex)`
  align-items: flex-end;
  background-color: ${({ theme }) => theme.palette.brand[4]};
  border: 1px solid ${({ theme }) => theme.palette.contrast[0]};
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  justify-content: space-between;
  line-height: 1.5;
  padding: ${({ theme }) => theme.space[2]};
  width: 100%;
  span {
    flex: 1;
    overflow: hidden;
  }

  >div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
    >* {
      align-self: flex-end;
    }
  }
  p {
    max-width: 60%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  h3 {
    font-size: ${({ listingType, theme }) => (listingType === 'ENHANCED' ? theme.fontSizes[2] : theme.fontSizes[1])};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    text-transform: ${({ listingType }) => (listingType === 'ENHANCED' ? 'uppercase' : 'none')};
  }

`;
