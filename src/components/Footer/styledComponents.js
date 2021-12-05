import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass/styled-components';
import Shielded from 'react-shielded';

import styled from 'styled-components';

import { mediaBreakpointUp } from '../../util';

import followUsFb from './assets/follow-us-fb.svg';
import followUsTw from './assets/follow-us-tw.svg';
import followUsIn from './assets/follow-us-in.svg';
import followUsYt from './assets/follow-us-yt.svg';
import followUsG from './assets/follow-us-g.svg';
import contactMail from './assets/contactEmail.svg';
import contactPhone from './assets/contactPhone.svg';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  theme: PropTypes.shape({
    containerWidth: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
  }),
};

export const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.palette.base[0]};
  font-family: ${({ theme }) => theme.fonts.mono};
  max-width: 100%;
  overflow: hidden;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    color: ${({ theme }) => theme.palette.base[0]};
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
  h3 {
    font-weight: ${({ theme }) => theme.fontWeight[1]};
  }
`;

const FollowUsStyled = styled(Flex)`
  float: left;
  padding-left: 0;

  ${mediaBreakpointUp('md')} {
    justify-content: flex-end;
    width: unset;
    border-top: 1px solid grey;
    padding: 2em 0 !important;
    padding-left: ${({ theme }) => theme.space[3]};
  }

  li:first-child {
    display: none;
    flex-shrink: 0;
    color: #C4E5F5;
    font-size: ${({ theme }) => theme.fontSizes[4]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    text-transform: uppercase;
    margin-right: ${({ theme }) => theme.space[4]} !important;

    ${mediaBreakpointUp('md')} {
      display: inline-block;
    }
  }

  li:not(:last-child) {
    margin-right: ${({ theme }) => theme.space[1]};
  }

  img {
    vertical-align: middle;
  }
`;

const FollowUs = () => (
  <FollowUsStyled
    as="ul"
    alignItems="center"
  >
    <li>Follow us</li>
    <li>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.facebook.com/yellownz"
        data-ga="track"
        data-ga-cat="Navigation_Interaction"
        data-ga-act="Footer_Clicks"
        data-ga-lab="Social_Facebook"
      >
        <img src={followUsFb} alt="Facebook" />
      </a>
    </li>
    <li>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/yellownz"
        data-ga="track"
        data-ga-cat="Navigation_Interaction"
        data-ga-act="Footer_Clicks"
        data-ga-lab="Social_Twitter"
      >
        <img src={followUsTw} alt="Twitter" />
      </a>
    </li>
    <li>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/company/yellow-new-zealand"
        data-ga="track"
        data-ga-cat="Navigation_Interaction"
        data-ga-act="Footer_Clicks"
        data-ga-lab="Social_LinkedIn"
      >
        <img src={followUsIn} alt="LinkedIn" />
      </a>
    </li>
    <li>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.youtube.com/user/yellowbiznz"
        data-ga="track"
        data-ga-cat="Navigation_Interaction"
        data-ga-act="Footer_Clicks"
        data-ga-lab="Social_YouTube"
      >
        <img src={followUsYt} alt="YouTube" />
      </a>
    </li>
    <li>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.google.co.nz/maps/place/Yellow/@-36.897607,174.8006043,17z/data=!3m1!4b1!4m5!3m4!1s0x6d0d48ef0f099ad1:0xbabdfef7f73a92a5!8m2!3d-36.897607!4d174.802793"
        data-ga="track"
        data-ga-cat="Navigation_Interaction"
        data-ga-act="Footer_Clicks"
        data-ga-lab="Social_GoogleMaps"
      >
        <img src={followUsG} alt="Google" />
      </a>
    </li>
  </FollowUsStyled>
);

const ContactStyled = styled(Box)`
  box-sizing: border-box;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-left: 20px;
  align-items: flex-start;

  ${mediaBreakpointUp('md')} {
    margin-right: 0;
    margin-left: auto;
    width: 400px;
  }

  :after {
    content: '';
    display: block;
    clear: both;
  }
`;

const Contact = ({ children, theme }) => (
  <ContactStyled
    py={theme.space[3]}
    mx="auto"
  >
    {children}
  </ContactStyled>
);
const ContactIcon = styled.a`
  display: inline-block;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 0 50%;
  padding-left: 24px;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  font-weight: ${({ theme }) => theme.fontWeight[0]};
`;

Contact.propTypes = {
  children: propTypes.children.isRequired,
  theme: propTypes.theme.isRequired,
};

const ContactListStyled = styled(Box)`
  && {
    padding-bottom: ${({ theme }) => theme.space[3]};
    text-align: right;
    float: right;
    padding-left: 0;

    ${mediaBreakpointUp('md')} {
      display: block;
    }

    li {
      text-align: left;
      margin-left: -20px;
    }

    .phone {
      padding-left: 45px;
      margin-left: 32px;
    }

    .email {
      padding-left: 58px;
      margin-left: 20px;
    }
  }
`;

const ContactList = () => (
  <ContactListStyled as="ul">
    <li>
      <ContactIcon
        icon={contactPhone}
        href="tel:0800803803"
        className="contact-list-link phone"
        data-ga="track"
        data-ga-cat="Navigation_Interaction"
        data-ga-act="Footer_Clicks"
        data-ga-lab="Contact_0800_803_803"
      >
        0800 803 803
      </ContactIcon>
    </li>
    <li>
      <ContactIcon
        icon={contactMail}
        href="mailto:care@yellow.co.nz"
        className="contact-list-link email"
        data-ga="track"
        data-ga-cat="Navigation_Interaction"
        data-ga-act="Footer_Clicks"
        data-ga-lab="Contact_Help_Email"
      >
        care@yellow.co.nz
      </ContactIcon>
    </li>
  </ContactListStyled>
);

const TermsStyled = styled(Flex)`
  ${mediaBreakpointUp('md')} {
    float: right;
    clear: right;
    width: 50%;
  }

  li:not(:last-child)::after {
    content: '|';
    margin-left: ${({ theme }) => theme.space[2]};
    margin-right: ${({ theme }) => theme.space[2]};
  }
`;

const Terms = () => (
  <TermsStyled
    as="ul"
    justifyContent={[null, null, 'flex-end']}
  >
    <li>
      <a
        href="/terms/privacy-policy/"
        data-ga="track"
        data-ga-cat="Navigation_Interaction"
        data-ga-act="Footer_Clicks"
        data-ga-lab="T&Cs_Privacy_policy"
      >
        Privacy policy
      </a>
    </li>
    <li>
      <a
        href="/terms/"
        data-ga="track"
        data-ga-cat="Navigation_Interaction"
        data-ga-act="Footer_Clicks"
        data-ga-lab="T&Cs_Legal"
      >
        Legal
      </a>
    </li>
  </TermsStyled>
);

const TrademarkStyled = styled(Box)`
  clear: both;
  color: ${({ theme: t }) => t.colors.spunPearl};
`;

const Trademark = () => (
  <TrademarkStyled
    mt={[0, 3]}
    mx="auto"
    mb={0}
    px={3}
    pb={3}
  >
    The Yellow name and associated names and logos are trade marks of Yellow or
    its affiliates. All rights reserved.
    <Terms />
  </TrademarkStyled>
);

const ContactWrapper = styled(Flex)`
  justify-content: space-between;
  width: 95%;
`;

const ContactSection = () => (
  <ContactWrapper>
    <ContactList />
    <Shielded />
  </ContactWrapper>
);

export const UpperFooterStyle = styled(Box)`
  font-weight: ${({ theme }) => theme.fontWeight[0]};;
  font-size: ${({ theme }) => theme.fontSizes[0]};
  line-height: ${({ theme }) => theme.fontSizes[3]};
  background: ${({ theme }) => theme.palette.base[2]};
  flex-wrap: wrap;
  padding-bottom: ${({ theme }) => theme.space[5]};

  h2 {
    width: 100%;

    font-style: normal;
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    line-height: 2em;
    text-align: center;
    margin: 0;
    padding-top: ${({ theme }) => theme.space[3]};
    color: ${({ theme }) => theme.colors.pleinDeVie};
    ${mediaBreakpointUp('lg')} {
      font-size: ${({ theme }) => theme.fontSizes[4]};;
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes[0]};
    font-weight: ${({ theme }) => theme.fontWeight[1]};
    color: ${({ theme }) => theme.colors.pleinDeVie};
    margin: 0;
    ${mediaBreakpointUp('lg')} {
        margin-top: ${({ theme }) => theme.space[3]};
    }
  }

  button {
    float: right;
    background: none;
    color: ${({ theme }) => theme.colors.pleinDeVie};
    border: none; 
    padding: 0;
    font: inherit;
    cursor: pointer;
    margin-left: ${({ theme }) => theme.space[4]};
    position: absolute;
    > img {
      /* will-change: transform; */
      transform: ${(props) => (props.state ? 'rotate(180deg)' : 'rotate(360deg)')};
      transition: transform .3s ease-out;
    }
  }
  button:focus {
    outline: 0;
  }

  ul {
    padding-left: ${({ theme }) => theme.space[3]};
    padding-right: ${({ theme }) => theme.space[3]};
    color: ${({ theme }) => theme.colors.pleinDeVie};

    width: 40%;
    margin: 5px;
    padding: ${({ theme }) => theme.space[2]};

    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
    float: left;
    background: ${({ theme }) => theme.palette.base[0]};
    will-change: height;

    ${mediaBreakpointUp('lg')} {
      float: right;
      width: 18%;
      margin: ${({ theme }) => theme.space[3]};
      padding: ${({ theme }) => theme.space[3]};;
    }

    li:not(:first-child) {
      overflow: hidden;
      height: ${(props) => (props.state ? '1.5em' : '0')};
      will-change: height;
      transition: height 200ms ease-out;
    }

    img {
      display: none;

      ${mediaBreakpointUp('lg')} {
        vertical-align: middle;
        display: inline;
      }
    }

    > li {
      text-align: center;

      > a {
        color: ${({ theme }) => theme.colors.pleinDeVie};
        text-align: center;
        display:block;
      }
    }
  }
`;

const MainFooterStyle = styled(Box)`
  margin-top: ${({ theme }) => theme.space[4]};
  font-weight: ${({ theme }) => theme.fontWeight[0]};
  font-size: ${({ theme }) => theme.fontSizes[0]};
  line-height: ${({ theme }) => theme.fontSizes[3]};
  background: ${({ theme }) => theme.colors.brand};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes[0]};
    font-weight: ${({ theme }) => theme.fontWeight[0]};
    text-transform: uppercase;
  }

  ul {
    padding-left: ${({ theme }) => theme.space[3]};
    padding-right: ${({ theme }) => theme.space[3]};
  }
`;

export const MainFooter = ({ children, theme }) => (
  <MainFooterStyle as="footer" width={theme.containerWidth} mx="auto">
    {children}
    <Contact theme={theme}>
      <ContactSection />
      <FollowUs />
    </Contact>
    <Trademark theme={theme} />
  </MainFooterStyle>
);

MainFooter.propTypes = {
  children: propTypes.children.isRequired,
  theme: propTypes.theme.isRequired,
};
