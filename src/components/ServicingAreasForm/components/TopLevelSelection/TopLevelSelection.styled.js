import styled from 'styled-components';

export const StyledContainer = styled.div`
  label {
    display: flex;
    margin-bottom: ${({ theme }) => theme.space[2]};
  }

  && input {
    width: auto;
    align-self: center;
    margin-right: ${({ theme }) => theme.space[2]};
  }

  h4 {
    margin: 0;
  }

  p {
    margin: 0;
  }
`;

export const SelectionItem = styled.div`
  align-self: center;
  margin-left: ${({ theme }) => theme.space[2]};
`;
