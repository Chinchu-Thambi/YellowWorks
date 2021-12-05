import styled from 'styled-components';
import { mediaBreakpointUp } from '../../../../../../../../util';

const EditWrapper = styled.div`
  text-align: center;

  ${mediaBreakpointUp('md')} {
    min-width: 390px;
    max-width: 650px;
  }

  input {
    width: 100%;
  }
`;

export default EditWrapper;
