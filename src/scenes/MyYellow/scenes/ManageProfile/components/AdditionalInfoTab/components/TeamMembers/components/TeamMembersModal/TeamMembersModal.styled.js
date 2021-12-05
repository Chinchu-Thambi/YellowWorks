import styled from 'styled-components';

import { Box, Flex } from 'rebass/styled-components';

import { mediaBreakpointUp } from '../../../../../../../../../../util';

export const SocialWrapper = styled(Flex)`
  justify-content: center;
  margin: ${({ theme }) => theme.space[3]};

  img { 
    width: ${({ theme }) => theme.space[5]};
  }
`;

export const TeamMemberWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.contrast[4]};;
  margin-bottom: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[3]} 0;
  
  ${mediaBreakpointUp('lg')} {
    min-width: 500px;
    max-width: 940px;
  }
`;

export const Details = styled.div`
  padding: 0 ${({ theme }) => theme.space[3]};
`;


export const SelectorWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  align-self: center;
  align-items: center;

  span {
    padding: 0 ${({ theme }) => theme.space[2]};
  }
`;

export const InputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : '100%')};
  padding: ${({ theme }) => theme.space[2]} 0;

  span {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
  }

  textArea {
    width: 100%;
  }
`;
