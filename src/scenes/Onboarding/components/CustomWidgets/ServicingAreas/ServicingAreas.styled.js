import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const FieldRadioGroup = styled.div`
  display: flex;
  text-transform: capitalize;
  font-size: ${({ theme }) => theme.fontSizes[3]};

  .radio {
    margin-right: ${({ theme }) => theme.space[5]};
    
    > label > span {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      > input {
        position: absolute;
        top: 45px;
        left: 7px;
        z-index: 0;
        opacity: 0;
        width: auto;

        + span::before,
        + span::after {
          position: relative;
          z-index: 10;
          margin-top: ${({ theme }) => theme.space[2]};
          content: '';
          display: block;
          width: ${({ theme }) => theme.space[4]};
          height: ${({ theme }) => theme.space[4]};
          background: ${({ theme }) => theme.palette.base[3]};
          border-radius: ${({ theme }) => theme.space[4]};
        }

        + span::before {
          display: none;
        }

        :checked + span::before,
        :checked + span::after {
          background: ${({ theme }) => theme.palette.base[0]};
          border: 8px solid ${({ theme }) => theme.palette.contrast[0]};
          width: ${({ theme }) => theme.space[4]};
          height: ${({ theme }) => theme.space[4]};
        }

        :focus + span::before,
        :focus + span::after {
          box-shadow: 0 2px 4px ${({ theme }) => theme.palette.contrast[2]};
        }
      }

      &.horizontal {
        display: inline-block;
        font-size: ${({ theme }) => theme.fontSizes[2]};
        margin-top: ${({ theme }) => theme.space[4]};
        line-height: ${({ theme }) => theme.fontSizes[4]};

        > span::before {
          display: inline-block;
          vertical-align: middle;
          margin-top: 0;
          margin-right: ${({ theme }) => theme.space[2]};
        }
        > span::after {
          display: none;
        }
      }
    }
  }
`;
