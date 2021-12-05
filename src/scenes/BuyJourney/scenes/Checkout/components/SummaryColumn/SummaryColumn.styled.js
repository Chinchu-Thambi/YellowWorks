import styled from 'styled-components';
import { mediaBreakpointUp } from '../../../../../../util';
import { InnerLinkButton } from '../../../../../../components/Button';

export const StyledSummary = styled.div`
border-radius: ${({ theme }) => theme.space[1]};
overflow: auto;

> h4 {
  margin: 0 ${({ theme }) => theme.space[3]};

  color: ${({ theme }) => theme.palette.contrast[2]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  font-weight: ${({ theme }) => theme.fontWeight[0]};
  text-transform: uppercase;

  padding-bottom: ${({ theme }) => theme.space[2]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
  margin-bottom: ${({ theme }) => theme.space[3]};
}

> table {
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes[1]};

  td:first-child {
    display: none;

    ${mediaBreakpointUp('md')} {
      display: block;
    }
  }

  > tbody {
    color: ${({ theme }) => theme.palette.contrast[1]};

    p {
      margin: auto;
      color: ${({ theme }) => theme.palette.contrast[3]};
    }

    td {
      padding: 0 ${({ theme }) => theme.space[2]};

      ${mediaBreakpointUp('md')} {
        padding: 0 ${({ theme }) => theme.space[3]};
      }

      > p {
        margin-bottom: ${({ theme }) => theme.space[3]};
      }

    }

    tr:nth-last-child(-n+3) {
      background: ${({ theme }) => theme.palette.contrast[5]};
      td {
        padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
      }
    }
  }

  > tfoot {
    background: ${({ theme }) => theme.palette.contrast[3]};
    color: ${({ theme }) => theme.palette.base[0]};

    td {
      padding: ${({ theme }) => theme.space[2]};
    }

    tr:last-child {
      background: ${({ theme }) => theme.palette.contrast[1]};
      color: ${({ theme }) => theme.palette.brand[1]};
    }

    ${mediaBreakpointUp('md')} {
      font-weight: ${({ theme }) => theme.fontWeight[1]};

      td {
        padding: 0 ${({ theme }) => theme.space[3]};
      }

      tr:first-child td {
        padding: ${({ theme }) => theme.space[3]};
      }

      tr:last-child {
        font-size: ${({ theme }) => theme.fontSizes[2]};

        td {
          padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[3]};
        }
      }

      span {
        float: right;
        font-weight: ${({ theme }) => theme.fontWeight[0]};
      }

      .right {
        padding-right: 0!important;
      }
    }
  }
}
`;


export const SingleItem = styled.tr`
  background: ${({ theme }) => theme.palette.base[0]};
  margin-top: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme }) => theme.space[2]};
  padding-left: ${({ theme }) => theme.space[3]};
  padding-right: ${({ theme }) => theme.space[3]};

  h5 {
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    margin: auto 0;
  }

  span {
    float: left;
    font-weight: ${({ theme }) => theme.fontWeight[1]};
  }
`;


export const Container = styled.section`
  width: 100%;
  box-shadow: 0px 0px 15px rgba(0, 107, 167, 0.2);
  border-radius: ${({ theme }) => theme.space[1]};
  background: ${({ theme }) => theme.palette.base[0]};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    margin: 0;
  }

  > header {
    padding:  ${({ theme }) => theme.space[3]};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ${InnerLinkButton} {
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }

  ${mediaBreakpointUp('lg')} {
    width: 55%;
  };
`;
