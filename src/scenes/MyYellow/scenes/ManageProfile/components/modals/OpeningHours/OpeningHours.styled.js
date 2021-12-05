import Select from 'react-select';
import styled from 'styled-components';

import { mediaBreakpointUp } from '../../../../../../../util';

export const Separator = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.contrast[4]};
  width: 100%;
`;

export const WeekDay = styled.strong`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  text-transform: uppercase;
  padding-top: 12px;

  ${mediaBreakpointUp('md')} {
    width: 114px;
  }
`;

export const ErrorParagraph = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.palette.accent[0][0]};
`;

export const SelectBoxContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const SelectBox = styled(Select)`
  min-width: 200px;
  margin: 0 20px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints[2]}) {
    min-width: 146px;
    width: 100%;
    margin: 0;
  }
`;
