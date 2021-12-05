import styled from 'styled-components';
import Button from '../../../../components/Button';
import { mediaBreakpointUp } from '../../../../util/theme';

export const ListGroup = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const ListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('md')} {
    margin-bottom: ${({ theme }) => theme.space[4]};
  }

  &:hover {
    color: ${({ theme }) => theme.palette.contrast[0]};
  }
`;

export const OptionItem = styled.div`
  display: flex;

  > div {
    margin-left: auto;
  }
`;

export const OptionDetails = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[2]};
  margin-left: ${({ theme }) => theme.space[4]};
  max-width: 100%;
  overflow: auto;
  padding: ${({ theme }) => theme.space[1]} 0;
`;


export const ActionButton = styled(Button)`
  padding: 0;

  img {
    width: 20px;
    height: 20px;
  }
`;

export const LabelItem = styled.h5`
  /* With icon */
  ${({ icon, theme }) => icon && (`
  padding-left: ${theme.space[4]};
  background-image: url(${icon});
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: left center;
  line-height: 1.5;
  `)}
`;

export const SocialLinks = styled.div`
  a {
    padding-right: ${({ theme }) => theme.space[1]};
    cursor: pointer;
  }
`;
