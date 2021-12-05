import styled from 'styled-components';

const CheckWrapper = styled.div`
  cursor: pointer;
  span {
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    margin: 0 ${({ theme }) => theme.space[2]};
  }
`;

export default CheckWrapper;
