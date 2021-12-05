import styled from 'styled-components';

export const ProgressBarContainer = styled.section`
  display: block;
  justify-content: space-between;
  margin: 0 ${({ theme }) => theme.space[3]};

  svg {
    transform: rotate(-90deg);
  }

  text {
    text-anchor: middle;
    font-size: ${({ theme }) => theme.fontSizes[4]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    transform: translate(100%, 0) rotate(90deg);
    font-family: ${({ theme }) => theme.fonts.title};
  }
`;

export default ProgressBarContainer;
