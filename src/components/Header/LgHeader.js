/* globals window */

import React from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from 'rebass';
import Button from '../Button';


import {
  Container, WhiteNav, ProductMenu, MenuHeaderSeparatorLine, SkipLink, MenuLink,
  HeaderButton, SubmenuPointer,
} from './LgHeaderStyled';

import AccountControls from './AccountControls';

const LgHeader = () => {
  const [productMenuVisibility, setProductMenuVisibility] = React.useState(false);
  const [resourcesMenuVisibility, setResourcesMenuVisibility] = React.useState(false);
  const [aboutMenuVisibility, setAboutMenuVisibility] = React.useState(false);
  const mainRef = React.createRef();

  const hideAll = () => {
    setProductMenuVisibility(false);
    setResourcesMenuVisibility(false);
    setAboutMenuVisibility(false);
  };

  const handleMouseLeave = (e) => {
    if (
      e.relatedTarget === window // case: pointer towards outside the page
      || (
        e.relatedTarget?.className !== undefined
        && !e.relatedTarget.className.includes('ProductMenuFlex')
      )
    ) {
      hideAll();
    }
  };

  const focusMain = () => {
    mainRef.current.focus();
  };


  return (
    <Container>
      <SkipLink><Button onClick={focusMain}>Skip to main content</Button></SkipLink>
      <WhiteNav>
        <li>
          <MenuLink
            to="/our-products/"
            onFocus={() => { setProductMenuVisibility(true); }}
            onMouseEnter={() => { setProductMenuVisibility(true); }}
            onMouseLeave={handleMouseLeave}
            onBlur={handleMouseLeave}
          >
            Products
            <SubmenuPointer visible={productMenuVisibility} />
          </MenuLink>
          <ProductMenu
            menuName="products"
            visible={productMenuVisibility}
            onMouseLeave={() => { setProductMenuVisibility(false); }}
            onFocus={() => { setProductMenuVisibility(true); }}
            onBlur={handleMouseLeave}
          >
            <ul>
              <li><p>Get Online</p></li>
              <li>
                <Link
                  to="/our-products/yellow-profile/"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="Products_Yellow_Profile"
                >Yellow Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/our-products/seo/"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="Products_SEO"
                >Search Engine Optimisation
                </Link>
              </li>
            </ul>
            <ul>
              <li><p>Get More Customers</p></li>
              <li>
                <Link
                  to="/our-products/google-search-ads/"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="Products_Adwords"
                >Google Search Ads
                </Link>
              </li>
              <li>
                <Link
                  to="/our-products/google-display-ads/"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="Products_Display_Advertising"
                >Google Display Ads
                </Link>
              </li>
              <li>
                <Link
                  to="/our-products/facebook-ads/"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="Products_Facebook_Adwords"
                >Facebook Ads
                </Link>
              </li>
            </ul>
            <ul>
              <li><p>Do Business Better</p></li>
              <li>
                <Link
                  to="/our-products/marketing-automation/"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="Products_Marketing_Automation"
                >Marketing Automation & CRM
                </Link>
              </li>
            </ul>
            <ul>
              <li><p>Print Directories</p></li>
              <li>
                <Link
                  to="/our-products/yellow-pages/"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="Products_Yellow_Pages"
                >Yellow Pages
                </Link>
              </li>
              <li>
                <Link
                  to="/our-products/white-pages/"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="Products_White_Pages"
                >White Pages
                </Link>
              </li>
            </ul>
          </ProductMenu>
        </li>
        <li>
          <MenuLink
            to="/resources/"
            onFocus={() => setResourcesMenuVisibility(true)}
            onMouseEnter={() => setResourcesMenuVisibility(true)}
            onMouseLeave={handleMouseLeave}
            onBlur={handleMouseLeave}
          >
            Resources
            <SubmenuPointer visible={resourcesMenuVisibility} />
          </MenuLink>
          <ProductMenu
            menuName="resources"
            visible={resourcesMenuVisibility}
            onMouseLeave={() => setResourcesMenuVisibility(false)}
            onFocus={() => setResourcesMenuVisibility(true)}
            onBlur={handleMouseLeave}
          >
            <ul>
              <li>
                <Link
                  to="/resources/customer-stories/"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="Resources_Customer_Stories"
                >Customer Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/tips-and-tools/"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="Resources_Tips_and_Tools"
                >Tips and Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/yellow-ebook/"
                  data-ga="track"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="Resources_ebook"
                >Yellow eBook
                </Link>
              </li>
              <li>
                <a
                  href="https://hub.yellow.co.nz/knowledge/faq"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="Resources_Knowledge_Base"
                >FAQ
                </a>
              </li>
              <li>
                <Link
                  to="/resources/flybuys/"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="Resources_Flybuys"
                >Flybuys
                </Link>
              </li>
            </ul>
          </ProductMenu>
        </li>
        <li>
          <MenuLink
            to="/company/about-us/"
            onFocus={() => setAboutMenuVisibility(true)}
            onMouseEnter={() => setAboutMenuVisibility(true)}
            onMouseLeave={handleMouseLeave}
            onBlur={handleMouseLeave}
          >
            About Yellow
            <SubmenuPointer visible={aboutMenuVisibility} />
          </MenuLink>
          <ProductMenu
            menuName="about"
            visible={aboutMenuVisibility}
            onMouseLeave={() => setAboutMenuVisibility(false)}
            onFocus={() => setAboutMenuVisibility(true)}
            onBlur={handleMouseLeave}
          >
            <ul>
              <li>
                <Link
                  to="/company/about-us/"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="About_Our_team"
                >Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/company/careers/"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="About_Careers"
                >Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/company/contact-us/"
                  data-ga-cat="Navigation_Interaction"
                  data-ga-act="Header_Clicks"
                  data-ga-lab="About_Contact_Us"
                >Contact Us
                </Link>
              </li>
            </ul>
          </ProductMenu>
        </li>
        <li>
          <HeaderButton href="/find-a-business/" highlighted="true"><FontAwesomeIcon icon={faSearch} size="sm" /><Text pl={2}>Find a business</Text></HeaderButton>
        </li>
        <MenuHeaderSeparatorLine />
        <AccountControls />
      </WhiteNav>
      <div ref={mainRef} tabIndex="-1" />
    </Container>
  );
};

LgHeader.propTypes = {
  theme: PropTypes.shape({
    containerWidth: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
  }).isRequired,
};

export default withTheme(LgHeader);
