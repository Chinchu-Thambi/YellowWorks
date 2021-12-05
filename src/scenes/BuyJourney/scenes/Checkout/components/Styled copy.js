import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Header = styled.header`
  text-align: center;

  > h1 {
    display: inline-block;
  }

  > h4 {
    display: inline-block;
    margin-left: ${({ theme }) => theme.space[3]};
  }
`;
