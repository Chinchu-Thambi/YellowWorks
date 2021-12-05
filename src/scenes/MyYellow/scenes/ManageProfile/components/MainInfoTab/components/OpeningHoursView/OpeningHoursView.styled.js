import styled from 'styled-components';

export const DayOfWeekContainer = styled.div`
  display: flex;
  margin: ${({ theme }) => theme.space[2]} 0;
  line-height: 1.5;
`;

export const DayOfWeek = styled.strong`
  min-width: ${({ theme }) => theme.space[9]};
  margin-right: ${({ theme }) => theme.space[2]};
`;

export const HoursItem = styled.span`
  display: inline-block;
  min-width: ${({ theme }) => theme.space[5]};
`;
