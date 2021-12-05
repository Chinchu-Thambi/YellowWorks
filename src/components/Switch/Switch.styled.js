import styled from 'styled-components';

export const SwitchContainer = styled.div`
  width: 60px;
  position: relative;
  display: inline-block;
`;

export const SwitchGroup = styled.div`
  display: flex;
  align-items: center;
  margin: 0px;
  padding: 2px;
  position: relative;
  transition: background 0.25s ease 0s;
  border-radius: ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.palette.contrast[4]};
  background: ${({ theme }) => theme.palette.contrast[0]};
`;

export const SwitchHandle = styled.button`
  width: 26px;
  height: 26px;
  left: 0;
  z-index: 2;
  cursor: pointer;
  position: absolute;
  border-radius: 50%;
  transition: all 0.25s ease 0s;
  background: ${({ theme }) => theme.palette.contrast[5]};
  border: 2px solid ${({ theme }) => theme.palette.contrast[0]};

  &:hover {
    box-shadow: inset 0 0 4px 0px rgba(0, 0, 0, 0.4);
  }
`;

export const SwitchOption = styled.span`
  line-height: 2;
  user-select: none;
  text-transform: uppercase;
  padding: 0 ${({ theme }) => theme.space[1]};
  font-size: ${({ theme }) => theme.fontSizes[1]};

  &:first-child {
    padding-right: 0;
  }

  &:last-of-type {
    padding-left: 0;
  }
`;

export const SwitchInput = styled.input`
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0px;
  position: absolute;
  width: 1px;
  left: 0;
  right: unset;

  &:checked ~ button {
    /* This is the circle handle */
    transform: translateX(34px);
    background: ${({ theme }) => theme.palette.accent[3][0]};
  }
`;
