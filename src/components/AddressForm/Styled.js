import styled from 'styled-components';
import { Flex } from 'rebass/styled-components';

import Button from '../Button';

export const Container = styled.section`
  display: block;
  justify-content: space-between;
  margin: 0 -${({ theme }) => theme.space[1]};

  > h3 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: 1.5em;
    margin-top: 0;
  }
`;

export const Form = styled.div`
  flex-grow: 1;
  margin: auto;
  text-align: left;

  input[type=text], select {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.palette.contrast[4]};
    border-radius: 3px;
    padding: ${({ theme }) => theme.space[2]};
    margin-bottom: ${({ theme }) => theme.space[3]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.fontSizes[1]};
    background: ${({ theme }) => theme.palette.base[0]};

    ::placeholder {
      color: ${({ theme }) => theme.palette.contrast[2]};
    }

    :disabled {
      border-color: ${({ theme }) => theme.palette.contrast[5]};
      color: ${({ theme }) => theme.palette.contrast[2]};
    }
  }

  select {
    width: auto;
  }

  label {
    width: 48%;
    display: inline-block;
    margin: 0 ${({ theme }) => theme.space[1]};

    span {
      width: 100%;
      display: inline-block;
      font-size: ${({ theme }) => theme.fontSizes[1]};
    }
  }

  ${Flex} {
    > input {
      width: 48%;
    }
  }

  p {
    margin-top: 0;
  }
`;

export const GooglePlacesAutocompleteLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[1]};
`;

export const GooglePlacesContainer = styled.div`
  margin: 0 ${({ theme }) => theme.space[1]};
`;

export const SearchNewAddressButton = styled(Button)`
  padding: 0 ${({ theme }) => theme.space[1]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
`;
