import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass/styled-components';
import styled, { withTheme } from 'styled-components';

import { mediaBreakpointUp, theme } from '../../util';

import { StyledFooter, MainFooter } from './styledComponents';
import { BusinessCategories, BusinessCategoriesContent } from './BusinessCategories';

const MainFooterStyled = styled(Flex)`
  h3 {
    font-size: ${theme.fontSizes[2]};
    font-weight: ${theme.fontWeight[1]};
  }
  > ul {
    flex-grow: 1;
    
    a {
      font-size: ${theme.fontSizes[1]};
      display: block;
      padding-top: .75em;
    }
  }
`;

const HiddenOnMobileUl = styled(Box)`
  display: none;

  ${mediaBreakpointUp('md')} {
    display: block;
  }
`;

const MainFooterContent = () => (
  <MainFooterStyled
    justifyContent="space-between"
    mx="auto"
    pb={[null, null, 3]}
  >
    <HiddenOnMobileUl as="ul">
      <li><h3>Services</h3></li>
      <li>
        <a
          href="/our-products/yellow-profile/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Services_Yellow_Profile"
        >
          Yellow Profile
        </a>
      </li>
      <li>
        <a
          href="/our-products/seo/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Services_Search_Engine_Optimisation"
        >
          Search Engine Optimisation
        </a>
      </li>
      <li>
        <a
          href="/our-products/google-search-ads/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Services_Google_AdWords"
        >
          Google Search Ads
        </a>
      </li>
      <li>
        <a
          href="/our-products/google-display-ads/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Services_Display_Advertising"
        >
          Google Display Ads
        </a>
      </li>
      <li>
        <a
          href="/our-products/facebook-ads/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Services_Facebook_Content"
        >
          Facebook Ads
        </a>
      </li>
      <li>
        <a
          href="/our-products/marketing-automation/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Services_Marketing_Automation"
        >
          Marketing Automation & CRM
        </a>
      </li>
      <li>
        <a
          href="/our-products/yellow-pages/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Services_Yellow_Pages"
        >
          Yellow Pages
        </a>
      </li>
      <li>
        <a
          href="/our-products/white-pages/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Services_White_Pages"
        >
          White Pages
        </a>
      </li>
    </HiddenOnMobileUl>
    <Box as="ul">
      <li><h3>Sites</h3></li>
      <li>
        <a
          href="https://whitepages.co.nz/"
          target="_blank"
          rel="noopener noreferrer"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Our_sites_White"
        >
          White
        </a>
      </li>
      <li>
        <a
          href="https://www.finda.co.nz/"
          target="_blank"
          rel="noopener noreferrer"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Our_sites_Finda"
        >
          Finda
        </a>
      </li>
      <li>
        <a
          href="https://www.menus.co.nz/"
          target="_blank"
          rel="noopener noreferrer"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Our_sites_Menus"
        >
          Menus
        </a>
      </li>
      <li>
        <a
          href="https://www.tourism.net.nz/"
          target="_blank"
          rel="noopener noreferrer"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Our_sites_NZ_Tourism_Guide"
        >
          NZ Tourism Guide
        </a>
      </li>
      <li>
        <a
          href="https://yellow.co.nz/018/"
          target="_blank"
          rel="noopener noreferrer"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Our_sites_Call_018"
        >
          Call 018
        </a>
      </li>
    </Box>
    <HiddenOnMobileUl as="ul">
      <li><h3>Resources</h3></li>
      <li>
        <a
          href="/resources/customer-stories/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Clients_Customer_Stories"
        >
          Customer Stories
        </a>
      </li>
      <li>
        <a
          href="/resources/tips-and-tools/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Tips and Tools"
        >
          Tips and Tools
        </a>
      </li>
      <li>
        <a
          href="/resources/yellow-ebook/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Ebook"
        >
          Yellow eBook
        </a>
      </li>
      <li>
        <a
          href="https://hub.yellow.co.nz/knowledge/faq"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="FAQ"
        >
          FAQ
        </a>
      </li>
      <li>
        <a
          href="/resources/flybuys/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Header_Clicks"
          data-ga-lab="Resources_Flybuys"
        >Flybuys
        </a>
      </li>
    </HiddenOnMobileUl>
    <HiddenOnMobileUl as="ul">
      <li><h3>Company</h3></li>
      <li>
        <a
          href="/company/about-us/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Our_Team"
        >
          Our Team
        </a>
      </li>
      <li>
        <a
          href="/company/careers/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Careers"
        >
          Careers
        </a>
      </li>
      <li>
        <a
          href="/company/contact-us/"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Contact_Us"
        >
          Contact Us
        </a>
      </li>
    </HiddenOnMobileUl>
  </MainFooterStyled>
);

MainFooterContent.propTypes = {
};

const Footer = ({ hideCategories }) => (
  <StyledFooter>
    {!hideCategories && (
      <BusinessCategories>
        <BusinessCategoriesContent theme={theme} />
      </BusinessCategories>
    )}
    <MainFooter theme={theme}>
      <MainFooterContent theme={theme} />
    </MainFooter>
  </StyledFooter>
);

Footer.defaultProps = {
  hideCategories: false,
};

Footer.propTypes = {
  hideCategories: PropTypes.bool,
};

export default withTheme(Footer);
