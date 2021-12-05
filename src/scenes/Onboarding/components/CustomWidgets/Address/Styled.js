import styled from 'styled-components';

export const DisabledAddressInput = styled.input`
  && {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    color: ${({ theme }) => theme.palette.contrast[3]};
  }
`;

export const EditableAddress = styled.div`
  h2 {
    ${({ theme }) => theme.fontSizes[4]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
  }

  div {
    border-color: ${({ theme }) => theme.palette.contrast[1]};
    border-radius: 0;
    z-index: 11;

    label:last-of-type {
      margin-right: 0;
    }
  }

  input[type=text], select {
    border: 1px solid ${({ theme }) => theme.palette.contrast[4]};
    border-radius: 3px;
    padding: ${({ theme }) => theme.space[2]};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    background: ${({ theme }) => theme.palette.base[0]};

    ::placeholder {
      color: ${({ theme }) => theme.palette.contrast[2]};
    }
  }

  label {
    display: inline-block;
    width: 100%;
    margin-right: ${({ theme }) => theme.space[2]};

    span {
      font-size: ${({ theme }) => theme.fontSizes[1]};
    }
  }
`;
