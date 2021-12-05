import styled from 'styled-components';

import check from '../images/checkCircle.svg';

export const FlexHeader = styled.div`
  >*, >*>* {
    margin: 0;
    padding: 0;
  }
`;

export const OpenArrow = styled.img`
  transition: transform .4s;
  transform: scaleY(-1);
  ${(props) => (!props.active
    && (`
    animation: bounce 1s infinite;
    padding-top: 1rem;
    transform: none;
  `))};
`;

export const FlexFeatures = styled.div`
  color: ${({ theme }) => theme.palette.contrast[0]};
  margin-bottom: ${({ theme }) => theme.space[4]};
  
  ul {
    text-align: left;
    list-style-image: url(${check});
    line-height: 2em;
    padding-left: 1.5rem;
  }

  li {
    padding-left: ${({ theme }) => theme.space[3]};
    line-height: 1.5;
    margin-bottom: ${({ theme }) => theme.space[2]};

    strong {
      display: block;
    }

    em {
      font-style: normal;
      color: ${({ theme }) => theme.palette.contrast[2]};
    }
  }
`;
