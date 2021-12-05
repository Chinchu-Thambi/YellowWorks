import styled from 'styled-components';
import { Dialog as ReachDialog, DialogContent } from '@reach/dialog';
import { mediaBreakpointUp, theme } from '../../util';

export const ReachModal = styled(ReachDialog)`
  position: relative;
  border-radius: ${theme.space[1]};
  background: ${theme.palette.base[0]};

  width: 96%; /* fallback for when calc is not available */
  width: calc(100% - ${theme.space[2]});
  max-height: 96%; /* fallback for when calc is not available */
  max-height: calc(100% - ${theme.space[2]});
  overflow: auto;
  padding: ${theme.space[2]};

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

/* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  ${mediaBreakpointUp('md')} {
    width: auto;
    max-width: 70vw;
    padding: ${theme.space[4]};
    overflow: ${({ scrollable }) => (scrollable ? 'auto' : 'visible')};
  }

  ${mediaBreakpointUp('lg')} {
    max-width: 45vw;
  }
`;

export const ReachContainer = styled.div``;

export const ReachContent = styled(DialogContent)``;

export const ReachTitle = styled.h2`
  margin: 0;
  text-align: center;
  margin-bottom: ${theme.space[3]};
  font-size: ${theme.fontSizes[3]}; 
  font-family: ${theme.fonts.sans};
  color: ${theme.palette.contrast[2]};
`;

export const ReachCloseButton = styled.button`
  top: 0;
  right: 0;
  border: 0;
  padding: 0;
  cursor: pointer;
  position: absolute;
  background: transparent;
  margin: ${theme.fontSizes[2]};
  border-radius: 999px;

  img {
    width: ${theme.fontSizes[2]};
    height: auto;
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 1px 2px ${theme.palette.contrast[3]};
  }
`;
