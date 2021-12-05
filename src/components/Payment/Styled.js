import styled from 'styled-components';
import { mediaBreakpointUp } from '../../util';

export const stripeStyle = {
  base: {
    fontSize: '1.14286rem', // because inside stripe iframe 1 rem = 14px.
    fontFamily: 'Montserrat',

    '::placeholder': {
      letterSpacing: '0.2px',
      color: '#797F8F',
    },
  },
};


export const PaymentStyled = styled.div`
    input,
    .StripeElement {
      margin: 0;
      min-width: 100px;
      height: 42px;

      padding: ${({ theme }) => theme.space[2]};
      border: 1px solid ${({ theme }) => theme.palette.contrast[4]};
      border-radius: ${({ theme }) => theme.space[1]};
      box-sizing: border-box;

      ${mediaBreakpointUp('md')} {
        min-width: 160px;
      }
    }

    .StripeElement--focus {
      // TODO replace this when design focus available, this is only approximate to Chrome implement
      box-shadow: #5b95f4 2px 2px 5px, #5b95f4 -2px -2px 5px, #5b95f4 -2px 2px 5px, #5b95f4 2px -2px 5px;
    }
`;
