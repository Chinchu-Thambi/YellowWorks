import styled from 'styled-components';

export const Line = styled.hr`
  display: block;
  margin-top: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[3]};
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
`;

export const CategoryTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[2]};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

export const BoostWrapper = styled.div`
  width: 100%;

  img {
    margin-right: ${({ theme }) => theme.space[2]};
    height: ${({ theme }) => theme.space[3]};
  }

  strong {
    padding-right: ${({ theme }) => theme.space[1]};
  }
`;
