import styled from 'styled-components';

export const PrimaryInfoCompany = styled.section`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints[1]}) {
    /* Remove sidebar on mobile */
    display: block;
  }
`;

export const PrimaryInfoCompanyLogo = styled.div`
    height: auto;
    display: flex;
    height: 200px;
    width: 100%;
    min-width: 200px;
    max-width: 240px;
    min-width: 200px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.space[1]};
    border: 1px solid ${({ theme }) => theme.palette.contrast[4]};
    margin: 0 ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[3]} 0;
    
    @media screen and (max-width: ${({ theme }) => theme.breakpoints[0]}) {
      width: 100%;
      max-width: 100%;
    }

    img {
      width: auto;
      height: auto;
      margin: 0 auto;
      max-width: 240px;
      max-height: 240px;
      background: ${({ theme }) => theme.palette.contrast[5]} ;

      @media screen and (max-width: ${({ theme }) => theme.breakpoints[0]}) {
        width: 60%;
        max-width: 60%;
      }
    }

    .placeholder {
      max-width: 60%;
    }
`;

export const ShowLocation = styled.div`
  text-align: right;
  font-size: ${({ theme }) => theme.fontSizes[1]};
`;
