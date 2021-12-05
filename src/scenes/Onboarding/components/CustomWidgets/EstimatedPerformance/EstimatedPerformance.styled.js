import styled from 'styled-components';

export const Metric = styled.div`
  display: flex;
  align-items: center;

  strong {
    font-size: ${({ theme }) => theme.fontSizes[3]};
    color: ${({ theme }) => theme.palette.contrast[1]};
  }
  
  p {
    padding: 0 ${({ theme }) => theme.space[3]};
  }
`;

export const Icon = styled.img`
  width: 20px;
`;
