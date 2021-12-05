import React from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass/styled-components';
import { mediaBreakpointUp } from '../../../../util';

import warningIcon from '../../../../assets/icons/warning.svg';

export const ManageSubscriptionWrapper = styled.div`
  display: relative;
`;

export const StyledSection = styled.div`
  color: ${({ theme }) => theme.palette.contrast[0]};
  padding: ${({ theme }) => theme.space[2]};
  margin: 0 ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};
  border: none;
  flex-direction: column;

  > div {
    margin: auto 0;
    display: inline-block;
  }

  img {
    padding-right: ${({ theme }) => theme.space[3]};
    height: 16px;
  }

  h2 {
    color: ${({ theme }) => theme.palette.contrast[0]};
    width: 40%;
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }

  button {
    text-align: right;
    width: 40%;
    float: right;
    top: 0%;
    position: relative;
    transform: translateY(0%);
    justify-content: flex-end;
    padding: ${({ theme }) => theme.space[3]} 0;
  }

  select { 
    width: 70%;
    margin-top: ${({ theme }) => theme.space[3]};
  }

  ${mediaBreakpointUp('lg')} {
    display: block;

    button {
      padding: 0;
      width: auto;
      float: right;
      top: 50%;
      position: relative;
      transform: translateY(50%);
    }

    select {
      right: 13%;
      width: 25%;
      float: right;
      top: 50%;
      position: relative;
      transform: translateY(50%);
      margin-top: 0;
    }

    h2 {
      font-size: ${({ theme }) => theme.fontSizes[4]};

      img {
        height: ${({ theme }) => theme.fontSizes[4]};
      }
    }
  }

  ${mediaBreakpointUp('xl')} {
    select {
      right: 15%;
    }
  }
`;

export const StyledGreySection = styled(Flex)`
  background-color: ${({ theme }) => theme.palette.contrast[5]};
  border-radius: ${({ theme }) => theme.space[1]};
  border: none;
  color: ${({ theme }) => theme.palette.contrast[0]};
  flex-direction: column;
  padding: ${({ theme }) => theme.space[3]};

  h2 {
    font-size:${({ theme }) => theme.fontSizes[4]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[2]};
  }

  ${mediaBreakpointUp('lg')} {
    padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]};
  }

  > div {
    flex-direction: column;

    ${mediaBreakpointUp('lg')} {
      flex-direction: row;
    }
  }

  p {
    margin: 0;

    ${mediaBreakpointUp('lg')} {
      margin: ${({ theme }) => theme.space[2]} 0;
    }
  }
`;


export const StyledBlueSection = styled(Flex)`
  background-color: ${({ theme }) => theme.palette.accent[3][4]};
  border-radius: ${({ theme }) => theme.space[1]};
  border: 1px solid ${({ theme }) => theme.palette.contrast[3]};
  color: ${({ theme }) => theme.palette.contrast[0]};
  flex-direction: column;
  padding: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[3]};

  h2 {
    font-size:${({ theme }) => theme.fontSizes[4]};
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.space[2]};
  }

  ${mediaBreakpointUp('lg')} {
    padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]};
  }

  > div {
    flex-direction: column;

    ${mediaBreakpointUp('lg')} {
      flex-direction: row;
    }
  }

  p {
    margin: 0;

    ${mediaBreakpointUp('lg')} {
      margin: ${({ theme }) => theme.space[2]} 0;
    }
  }
`;

export const PageBreak = styled.div`
  border-bottom: 5px solid ${({ theme }) => theme.palette.contrast[4]};
  margin: 0 ${({ theme }) => theme.space[2]};
  
  ${mediaBreakpointUp('lg')} {
    margin: 0 ${({ theme }) => theme.space[3]};
  }
`;

export const FormControlSelect = styled.select`
  cursor: pointer;
  position: relative;
  padding-right: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.palette.contrast[0]};
  border: 1px solid ${({ theme }) => theme.palette.contrast[3]};
`;

export const CategoryBoostSection = styled(Flex)`
  flex-direction: column;
  color: ${({ theme }) => theme.palette.contrast[0]};
  padding: ${({ theme }) => theme.space[2]};
  margin: 0 ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};
  border: none;

  ${mediaBreakpointUp('lg')} {
    flex-direction: row;

    >* {
      width: 25%;
    }
  }

  > div {
    margin: auto 0;
    align-items: flex-start;

    ${mediaBreakpointUp('lg')} {
      align-items: center;
    }
  }

  p {
    margin-top: 0;
    ${mediaBreakpointUp('lg')} {
      margin: 0;
    }
  }

  img {
    padding-right: ${({ theme }) => theme.space[3]};
    height: 15px;
  }

  h3 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }
  
  ${({ active, theme }) => (`
    background-color: ${active ? theme.palette.contrast[5] : 'none'};
    border-radius: ${theme.space[1]};
  `)}

`;

export const Region = styled.p`
  margin-left: ${({ theme }) => theme.space[4]};

  ${mediaBreakpointUp('lg')} {
    margin: 0;
    align-items: center;
    display: flex;
  }
`;

export const DowngradeWarning = () => (
  <FullWidthWrapper>
    <Warning>
      <img src={warningIcon} alt="Warning" />
      <p>Premium is $20 if you decrease your plan</p>
    </Warning>
  </FullWidthWrapper>
);

export const FullWidthWrapper = styled.div`
  width: 100%;
`;

export const Warning = styled(Flex)`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.accent[0][1]};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.accent[0][4]};
  margin: ${({ theme }) => theme.space[3]} 0;
  padding: ${({ theme }) => theme.space[2]};
  width: 90%;

  p {
    color: ${({ theme }) => theme.palette.accent[0][0]};
    display: inline-block;
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin: 0;
  }

  img {
    padding-right: ${({ theme }) => theme.space[2]};
  }

  ${mediaBreakpointUp('lg')} {
    width: 100%;
  }
`;

export const CategoryBoosts = styled.div`
  margin-bottom: ${({ theme }) => theme.space[9]};
  padding-bottom: ${({ theme }) => theme.space[8]};

  ${mediaBreakpointUp('lg')} {
    margin-bottom: ${({ theme }) => theme.space[4]};
  }
`;

export const ConfirmContainer = styled(Flex)`
  justify-content: space-between;
  padding: ${({ theme }) => theme.space[3]};
  border-top: 1px solid ${({ theme }) => theme.palette.contrast[4]};
  box-shadow: ${({ theme }) => theme.shadows.large};
  position: fixed;
  right: 0; 
  background: ${({ theme }) => theme.palette.base[0]};
  left: 0;
  bottom: 0;
  flex-direction: column;

  p {
    margin: ${({ theme }) => theme.space[1]} 0;
  }

  ${mediaBreakpointUp('lg')} {
    border: 1px solid ${({ theme }) => theme.palette.contrast[4]};
    bottom: 10px;
    left: 25%;
    flex-direction: row;

    p {
      padding-left: ${({ theme }) => theme.space[3]};
    }
  }

  ${mediaBreakpointUp('xxl')} {
    width: 60%;
    left: 29%;
    right: 12%;
    min-width: 1005px;
  }
`;

export const Total = styled.p`
  ${mediaBreakpointUp('lg')} {
    padding-left: ${({ theme }) => theme.space[3]};
  }
`;

export const CreditCard = styled.div`
  p {
    padding: ${({ theme }) => theme.space[1]} 0;

    ${mediaBreakpointUp('lg')} {
      padding-left: ${({ theme }) => theme.space[3]};
    }
  }
`;
