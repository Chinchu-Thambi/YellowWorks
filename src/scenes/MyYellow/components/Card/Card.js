import styled from 'styled-components';

import theme, { mediaBreakpointUp } from '../../../../util/theme';
import Button from '../../../../components/Button';

// Cards status variants
const variants = {
  success: {
    color: theme.palette.success[2],
  },
  warn: {
    color: theme.palette.warn[2],
  },
  support: {
    color: theme.palette.support[2],
  },
  error: {
    color: theme.palette.error[2],
  },
  info: {
    color: theme.palette.base[3],
  },
  promote: {
    color: theme.palette.accent[3][1],
  },
};

const Card = styled.section`
  position: relative;
  border-radius: ${theme.space[1]};
  padding: ${theme.space[2]};
  margin: 0 ${theme.space[1]} ${theme.space[2]};
  flex-grow: 1;
  border: 1px solid ${theme.palette.base[3]};
  overflow: hidden;

  ${mediaBreakpointUp('md')} {
    padding: ${theme.space[3]};
  }

  h2 {
    margin-top: 0;
    display: inline-block;
    font-size: ${theme.fontSizes[3]};
    font-weight: ${theme.fontWeight[1]};
  }

  h3 {
    font-weight: ${theme.fontWeight[0]};
    text-transform: uppercase;
    font-size: ${theme.fontSizes[2]};
  }

  h5 {
    margin: 0 0 ${theme.space[2]} 0;
    margin-right: ${theme.space[3]};
    font-size: ${theme.fontSizes[2]};
  }

  table {
    width: 100%;

    thead {
      font-weight: ${theme.fontWeight[1]};
    }
  }

  hr {
    border: 0;
    border-top: 1px solid ${theme.palette.contrast[4]};
  }

  /* Handle status variants on My Products Page*/
  ${({ status, isSubCard }) => status
    && !isSubCard
    && `
    border-left: 12px solid ${status && variants[status] ? variants[status].color : theme.palette.base[3]};
  `}

  /* Handle status variants on Manage Profile Page*/
  ${({ status, isSubCard }) => isSubCard
    && `
    border: 1px solid ${variants[status] ? variants[status].color : theme.palette.base[3]};
    background-color: ${variants[status] ? variants[status].color : theme.palette.base[3]}20;
    border-left: auto;
  `}
`;

export default Card;

// Expand container to full width
export const CardSectionFull = styled.section`
  padding: ${theme.space[2]} ${theme.space[4]} ${theme.space[2]} ${theme.space[3]};
  margin-left: -${theme.space[3]};
  width: calc(100% + ${theme.space[5]});
`;

// Main card button
export const CardActionButton = styled(Button)`
  position: absolute;
  top: ${theme.space[1]};
  right: ${theme.space[1]};
`;

// Card variation with bg color
export const CardGrayBg = styled(Card)`
  background: ${theme.palette.contrast[5]};
  color: ${theme.palette.contrast[0]};
`;
