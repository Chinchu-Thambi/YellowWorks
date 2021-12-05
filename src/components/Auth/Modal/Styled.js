import styled from 'styled-components';
import { Box } from 'rebass/styled-components';

import { theme, mediaBreakpointUp } from '../../../util';

export const ModalHeader = styled.div``;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaBreakpointUp('lg')} {
    display: block;
  }

  fieldset {
    padding: 0;
    border: 0;
  }
`;

export const ModalFormContent = styled(Box)`
  ${mediaBreakpointUp('md')} {
    max-width: 420px;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 8px;

  > img {
    display: block;
  }
`;

export const HeaderContent = styled.div`
  text-align: center;
  color: ${theme.palette.contrast[3]};
  display: block;
  margin-bottom: ${theme.space[5]};

  > h2 {
    font-weight: ${theme.fontWeight[0]};
    margin-bottom: ${theme.space[3]};
  }

  > h4 {
    font-weight: ${theme.fontWeight[1]};
  }
`;

export const BodyContent = styled.div`
  text-align: center;
  display: block;
  color: ${theme.palette.contrast[0]};
`;


// eslint-disable-next-line max-len
export const logoSrc = 'https://cdn11.bigcommerce.com/s-npte00i8ef/stencil/4a56d7a0-2da2-0137-892b-0242ac110005/e/2ebf55a0-80d9-0136-d2c6-7fd6dfdde2be/img/header-footer/yellow-logo.svg';

export const Separator = styled.div`
  font-size: ${theme.fontSizes[3]};
  text-align: center;
  position: relative;
  line-height: 1;
  margin: ${theme.space[4]} 0;
  color: ${theme.palette.contrast[3]};

  ::before, ::after {
    content: '';
    position: absolute;
    top: 14px;
    left: 0;
    width: 40%;
    height: 1px;
    background: ${theme.palette.contrast[3]};
  }

  ::after {
    left: unset;
    right: 0;
  }
`;
