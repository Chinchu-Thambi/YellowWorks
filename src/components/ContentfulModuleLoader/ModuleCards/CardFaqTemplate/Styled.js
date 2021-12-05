import styled from 'styled-components';

import { BaseContainer, Container } from '../../../Grid';
import { mediaBreakpointUp } from '../../../../util';

export const CustomContainer = styled(Container)`
  flex-wrap: wrap;
  justify-content: center;
`;

export const InnerContainer = styled(Container)`
  display: flex;
  min-height: ${({ backgroundHeight }) => backgroundHeight}px;
  padding-top: ${({ theme }) => theme.space[4]};
  margin-top: ${({ theme }) => theme.space[4]};

  ${mediaBreakpointUp('xl')} {
    margin-top: unset;
  }
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.palette.contrast[0]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: ${({ theme }) => theme.space[4]};
  font-weight: ${({ theme }) => theme.fontWeight[0]};
  text-align: center;
`;

export const ExtendedContainer = styled(BaseContainer)`
  margin-top: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[6]};

  > h1 {
    text-align: center;
    margin: 0 auto ${({ theme }) => theme.space[4]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};

    ${mediaBreakpointUp('lg')} {
      width: 460px;
      font-size: ${({ theme }) => theme.fontSizes[5]};
    }

    ${mediaBreakpointUp('xl')} {
      width: 580px;
    }
  }
`;

export const Description = styled.div`
  text-align: center;
  margin: 0 auto ${({ theme }) => theme.space[4]};
  line-height: 2;

  ${mediaBreakpointUp('lg')} {
    width: 460px;
  }

  ${mediaBreakpointUp('xl')} {
    width: 580px;
  }
`;

export const FaqSection = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
  position: relative;
  border-top: 1px solid ${({ theme }) => theme.palette.contrast[3]};
  padding-left: 0;

  ${mediaBreakpointUp('lg')} {
    flex-direction: row;
    width: 90%;
    margin: auto;
  }

  table {
    border-collapse: collapse;

    tbody tr:nth-child(odd) {
      background-color: ${({ theme }) => theme.palette.base[3]};
      border: none;
    }

    tr {
      padding: ${({ theme }) => theme.space[2]};
    }

    td {
      padding-right: ${({ theme }) => theme.space[3]};
    }
  }
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  text-align: center;

  h2 {
    ${mediaBreakpointUp('lg')} { 
      font-size: ${({ theme }) => theme.fontSizes[6]};
      font-weight: ${({ theme }) => theme.fontWeight[0]};
      margin-bottom: ${({ theme }) => theme.space[4]};
    }
  }
`;

export const Faq = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.palette.contrast[3]};
  list-style: none;
  line-height: 1.5;
  width: 100%;

  h3 {
    color: ${({ theme }) => theme.palette.accent[3][1]};
    padding: ${({ theme }) => theme.space[2]} 0;
    margin: ${({ theme }) => theme.space[2]} 0;
    ${mediaBreakpointUp('lg')} { 
      margin: ${({ theme }) => theme.space[3]} 0;
    }
  }
`;

export const FaqContent = styled.div`
  display: ${(props) => (props.shown ? 'block' : 'none')};
  padding-bottom: ${({ theme }) => theme.space[3]}; 
`;

export const OpenArrow = styled.img`
  transition: transform .4s;
  ${(props) => (!props.active
  && (`
  transform: scaleY(-1);
  `))};
`;
