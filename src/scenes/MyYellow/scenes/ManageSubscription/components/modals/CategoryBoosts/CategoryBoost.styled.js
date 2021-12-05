import { Flex, Box } from 'rebass/styled-components';
import styled from 'styled-components';
import { mediaBreakpointUp } from '../../../../../../../util';

export const Heading = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[2]};
  text-align: center;
`;

export const CategoryPlan = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight[1]};
  display: inline-flex;
  color: ${({ theme }) => theme.palette.contrast[0]};

  h2 {
    margin: ${({ theme }) => theme.space[2]} 0;
  }
`;

export const CategoryIcon = styled.img`
  width: 37px;
  margin-left: ${({ theme }) => theme.space[3]};
`;

export const CategoryDescription = styled(Box)`
  width: 100%;
  line-height: 2;
`;

export const CategoryOption = styled(Flex)`
  margin: ${({ theme }) => theme.space[2]} 0;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  ${mediaBreakpointUp('lg')} {
    margin: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[2]};
    width: 46%;
  }
`;

export const Categories = styled(Flex)`
  flex-wrap: wrap;
  max-width: 640px;
  justify-content: center;
  margin: auto;
`;

export const Wrapper = styled(Flex)`
  flex-direction: column;
  text-align: left;
  margin: 0;
`;

export const BannerVideo = styled.div`
  max-width: 100%;
  margin: auto;
`;
