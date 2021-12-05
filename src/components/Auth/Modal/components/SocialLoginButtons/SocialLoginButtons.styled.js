import styled from 'styled-components';

export const SocialButton = styled.button`
  height: 48px;
  border: 1px solid ${({ theme }) => theme.palette.contrast[2]};
  background: ${({ theme }) => theme.palette.base[0]};
  color: ${({ theme }) => theme.palette.contrast[0]};
  border-radius: ${({ theme }) => theme.space[4]};
  white-space: nowrap;
  transition-property: background-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  padding: 0;

  &:active {
    background-color: ${({ theme }) => theme.palette.base[1]};
    transition-duration: 10ms;
  }
`;

export const IconContainer = styled.span`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -1px;
  left: -1px;
`;

export const SocialText = styled.span`
  padding: 0 ${({ theme }) => theme.space[2]};
  line-height: 48px;
  position: relative;
  top: -1px;
`;
