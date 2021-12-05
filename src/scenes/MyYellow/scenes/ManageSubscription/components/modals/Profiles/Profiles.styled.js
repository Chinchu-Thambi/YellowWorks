import { Flex } from 'rebass/styled-components';
import styled from 'styled-components';
import { mediaBreakpointUp } from '../../../../../../../util';

import GrayCheckmarkIcon from '../../../../../../../assets/icons/check.svg';

export const Wrapper = styled(Flex)`
  flex-direction: column;

  ${mediaBreakpointUp('lg')} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const FlexWrapper = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.large};
  border-radius: 5px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }) => theme.palette.base[0]};
  align-items: stretch;
  padding-bottom: ${({ theme }) => theme.space[4]};
  position: relative;
  margin-bottom: ${({ theme }) => theme.space[4]};

  Button {
    width: 50%;
    align-self: center;
    margin-top: ${({ theme }) => theme.space[4]};

    ${mediaBreakpointUp('lg')} {
      width: 70%;
    }

    ${mediaBreakpointUp('xl')} {
      width: 50%;
    }
  }

  ${mediaBreakpointUp('lg')} {
    width: 49%;
    margin-bottom: ${({ theme }) => theme.space[4]};
  }
`;

export const FlexHeader = styled.div`
  background: ${({ theme, isPremium }) => (isPremium ? theme.palette.contrast[0] : theme.palette.contrast[2])};
  color: ${({ theme }) => theme.palette.base[0]};
  clip-path: ellipse(90% 87% at 50% 5%);
  height: 190px;
  padding-top: ${({ theme }) => theme.space[4]};

  > h2 {
    font-size: ${({ theme }) => theme.fontSizes[4]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[2]};

    ${mediaBreakpointUp('lg')} {
      font-size: ${({ theme }) => theme.fontSizes[4]};
      line-height: ${({ theme }) => theme.fontSizes[4]};
    }

    ${mediaBreakpointUp('xxl')} {
      font-size: ${({ theme }) => theme.fontSizes[5]};
      line-height: ${({ theme }) => theme.fontSizes[5]};
    }
  }

  > h3 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin: 0;
  }
`;

export const FlexFeatures = styled.div`
  color: ${({ theme }) => theme.palette.contrast[1]};
  margin-bottom: ${({ theme }) => theme.space[4]};
  padding-left: 15px;
  padding-right: 15px;

  > p {
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }
  
  ul {
    text-align: left;
    list-style-image: url(${GrayCheckmarkIcon});
    line-height: 2em;
  }

  li {
    padding-left: ${({ theme }) => theme.space[3]};
  }
`;

export const PremiumTag = styled.img`
  position: absolute;
  top: 0;
  left: ${({ theme }) => theme.space[3]};
  z-index: 1;
`;
