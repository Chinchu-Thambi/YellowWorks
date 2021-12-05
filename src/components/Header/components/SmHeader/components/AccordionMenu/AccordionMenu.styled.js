import styled from 'styled-components';

import chevronDown from '../../../../assets/chevron-down.svg';
import { theme } from '../../../../../../util';

// eslint-disable-next-line import/prefer-default-export
export const AccordionMenuLi = styled.li`
font-size: ${theme.fontSizes[1]};
font-weight: ${theme.fontWeight[0]};
display: block;
background: transparent;
border: 0;
width: 100%;
text-align: left;
position: relative;
text-transform: uppercase;

> div {
  > button, button:hover, button:focus, button:active {
    width: 48px;
    height: 48px;
    padding: 0;
    background-color: transparent;
    background: url(${chevronDown}) no-repeat center;
    background-size: 16px;
    transform: ${({ visible }) => (visible ? 'rotate(0.5turn)' : 'none')};
  }

  > a {
    display: block;
    line-height: 48px;
    flex-grow: 3;
  }
}

:last-child {
  padding-bottom: ${theme.space[2]};
  border-bottom: 1px solid ${theme.palette.contrast[5]};
  margin-bottom: ${theme.space[3]};
}

> ul {
  padding: 0;
  font-size: ${theme.fontSizes[0]};
  overflow: hidden;
  transition: 
    ${({ visible }) => (visible ? 'max-height .6s' : 'max-height .2s')};
  max-height: ${({ visible }) => (visible ? '300px' : 0)};

  > li > a {
    display: block;
    padding: ${theme.space[2]} 0;
    margin-left: ${theme.space[3]};
  }
}
`;
