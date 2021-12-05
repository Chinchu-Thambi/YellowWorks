/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import styled from 'styled-components';
import check from '../images/check.svg';
import Button from '../../../Button';
import { mediaBreakpointUp } from '../../../../util';

export const FlexStyled = styled(Flex)`
  flex-direction: column-reverse;
  justify-content: center;

${mediaBreakpointUp('lg')} {
    flex-direction: row;
  }
`;

export const FeatureContainer = styled.div`
  margin-top: ${({ theme }) => theme.space[3]};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space[3]};

  ${mediaBreakpointUp('lg')} {
    width: 380px;
  }
`;

export const Header = styled.div`
  text-align: center;
  line-height: 1.25em;
  font-size: ${({ theme }) => theme.fontSizes[4]};
  font-weight: ${({ theme }) => theme.fontWeight[1]};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

export const Feature = ({
  image,
  isSelected,
  callToAction,
  callToActionUrl,
}) => (
  <FlexWrapper>
    <FlexHeaderWrap>
      <FlexHeader isSelected={isSelected}>
        <img src={image} alt="SEO" />
        <h2>SEO Set Up</h2>
      </FlexHeader>
    </FlexHeaderWrap>
    <FlexFeatures>
      <h3>GET IN THE RUNNING TO BE FOUND ON GOOGLE</h3>
      <ul>
        <li>Technical Audit<br />Keyword research</li>
        <li>Google Setup - Analytics, Google</li>
        <li>Tag Manager, Search Console</li>
        <li>Advanced keyword tracking set up<br />Webmaster Tools</li>
        <li>Audit and configuration</li>
      </ul>
      <h3><strong>$659.00</strong> + GST 15%</h3>
    </FlexFeatures>
    <Button href={callToActionUrl}>{callToAction}</Button>
    <SpecialNote>
      If you’re already a Yellow website customer, get $200 off the SEO Setup price, as base SEO is included with Yellow website.
    </SpecialNote>
  </FlexWrapper>
);

Feature.defaultProps = {
  image: {
    file: {
      url: '',
    },
  },
  callToAction: '',
  callToActionUrl: '',
  isSelected: false,
};

Feature.propTypes = {
  image: PropTypes.shape({
    file: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
  callToAction: PropTypes.string,
  callToActionUrl: PropTypes.string,
  isSelected: PropTypes.bool,
};

export const FlexWrapper = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.large};
  border-radius: 5px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }) => theme.palette.base[0]};
  align-items: stretch;
  padding-bottom: ${({ theme }) => theme.space[4]};
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space[4]};

  a {
    width: 50%;
    align-self: center;
    margin-top: ${({ theme }) => theme.space[2]};
  }

  ${mediaBreakpointUp('lg')} {
    width: 380px;
    margin-bottom: ${({ theme }) => theme.space[4]};
  }
`;

export const FlexHeaderWrap = styled.div`
  filter: drop-shadow(${({ theme }) => theme.shadows.medium});
`;

export const FlexHeader = styled.div`
  background: ${({ theme }) => theme.palette.base[0]};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  clip-path: ellipse(90% 95% at 50% 5%);
  padding-top: ${({ theme }) => theme.space[4]};

  > h2 {
    font-size: ${({ theme }) => theme.fontSizes[3]};
    margin-top: 0;
    padding-bottom: ${({ theme }) => theme.space[4]};
  }

  > h3 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    margin: 0;
  }
`;

export const FlexFeatures = styled.div`
  color: ${({ theme }) => theme.palette.contrast[1]};
  margin-bottom: 0;
  padding-left: ${({ theme }) => theme.space[3]};
  padding-right: ${({ theme }) => theme.space[3]};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    width: 80%;
    margin: ${({ theme }) => theme.space[3]} auto;

    strong {
      font-size: ${({ theme }) => theme.fontSizes[3]};
      font-weight: ${({ theme }) => theme.fontWeight[1]};

      ${mediaBreakpointUp('md')} {
        font-size: ${({ theme }) => theme.fontSizes[4]};
      }
    }
  }
  
  ul {
    text-align: left;
    list-style-image: url(${check});
    line-height: 2em;
  }

  li {
    padding-left: ${({ theme }) => theme.space[3]};
  }
`;

export const SpecialNote = styled.span`
  color: ${({ theme }) => theme.palette.accent[3][0]};
  text-decoration: none;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  padding-top: ${({ theme }) => theme.space[3]};
  margin: auto;
  width: 80%;
`;

export const Content = styled.div`
  width: 100%;
  padding-right: 0;

  ${mediaBreakpointUp('lg')} {
    width: 60%;
    padding-right: 150px;
  }

  h1 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    text-align: center;
    ${mediaBreakpointUp('md')} {
      text-align: left;
    }
  }

  h2 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    color: ${({ theme }) => theme.palette.accent[2][0]};
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSizes[1]};
    min-height: ${({ theme }) => theme.space[6]};
    ${mediaBreakpointUp('md')} {
      font-size: ${({ theme }) => theme.fontSizes[2]};
    }
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: ${({ theme }) => theme.fontSizes[4]};
    text-align: center;
    ${mediaBreakpointUp('md')} {
      text-align: left;
    }
  }

  li p {
    font-size: ${({ theme }) => theme.fontSizes[1]};
    line-height: ${({ theme }) => theme.fontSizes[3]};
    text-align: left;

    ${mediaBreakpointUp('md')} {
      font-size: ${({ theme }) => theme.fontSizes[2]};
      line-height: ${({ theme }) => theme.fontSizes[4]};
    }
  }
  
  ul {
    display: flex;
    padding-left: 0;
    text-align: left;
    list-style: none;
    line-height: ${({ theme }) => theme.space[4]};
    margin-top: ${({ theme }) => theme.space[6]};
  }

  li {
    padding-right: 0;
    width: 30%;
    margin-right: ${({ theme }) => theme.space[3]};
    list-style-type: none;
  }

  span {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
  }
`;
