import styled from 'styled-components';

export const BaseTag = styled.span`
  user-select: none;
  display: inline-flex;
  border-radius: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.palette.contrast[2]}; 
  border: 1px solid  ${({ theme }) => theme.palette.contrast[2]};
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};
  margin: 0 ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[1]} 0;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: ${({ theme }) => theme.space[3]};

  background-color: ${({ highlight, theme }) => (highlight ? theme.palette.navigation[4] : 'transparent')};
  transition: background-color .4s;
`;

export const RemoveTagButton = styled.button`
  border: 0;
  padding: 0;
  width: 18px;
  height: 18px;
  cursor: pointer;
  background: transparent;
  margin-left: ${({ theme }) => theme.space[1]};

  svg {
    margin-top: 1px;
    transform: rotate(45deg);

    circle {
      fill: ${({ theme }) => theme.palette.contrast[2]}; 
    }
  }

  &:hover {
    svg > circle {
      fill: ${({ theme }) => theme.palette.accent[3][0]};
    }
  }
`;
