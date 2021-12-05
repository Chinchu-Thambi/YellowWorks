import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const YellowTooltip = styled(ReactTooltip).attrs({
  className: 'yellow-tooltip',
  place: 'bottom',
  effect: 'solid',
  type: 'info',
  arrowColor: 'transparent',
})`
  &.yellow-tooltip {
    border-radius: ${({ theme }) => theme.space[4]};
    background-color: ${({ theme }) => theme.palette.accent[3][4]};
    box-shadow: ${({ theme }) => theme.shadows.medium};
    color: ${({ theme }) => theme.palette.contrast[0]};
    max-width: 300px;

    &.place-bottom, &.place-top, &.place-left {

      &::after, &::before {
        display: none;
      }

      p {
        font-size: ${({ theme }) => theme.fontSizes[2]};
      }
    }
  }
`;

export default YellowTooltip;
