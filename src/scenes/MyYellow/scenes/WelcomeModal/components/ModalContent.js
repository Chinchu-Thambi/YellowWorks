import styled from 'styled-components';

import { theme } from '../../../../../util';

const ModalContent = styled.div`
  text-align: center;
  max-width: 580px;
  padding: ${theme.space[2]} ${theme.space[0]};

  h1 {
    font-weight: ${theme.fontWeight[1]};
  }

  img {
    max-width: 300px;
  }

  a {
    font-weight: ${theme.fontWeight[1]};
  }
`;

export default ModalContent;
