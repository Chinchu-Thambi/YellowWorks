/* eslint-disable no-console */
/* globals document */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Button from '../Button';

import MyYellowSidebar from '../../scenes/MyYellow/components/Sidebar/MyYellowSidebar';
import yellowLogo from './assets/yellow-logo.svg';
import followUsFb from './assets/follow-us-fb.svg';
import followUsTw from './assets/follow-us-tw.svg';
import followUsIn from './assets/follow-us-in.svg';
import followUsYt from './assets/follow-us-yt.svg';
import followUsG from './assets/follow-us-g.svg';
import iconPhone from './assets/icon-phone.svg';
import menuIcon from './assets/menu-icon.svg';
import AuthContext from '../Auth/AuthContext';


import {
  Container, Fixed, Toggler, Expanded, ExpandedMenuListItem,
  AccordionMenuLi, Contact, FollowUs, FindABusiness, IconButton, StyledIconLink,
} from './SmHeaderStyled';

const AccordionMenu = ({
  title,
  link,
  children,
}) => {
  const [accordionVisibility, setAccordionVisibility] = React.useState(false);

  const toggleVisibility = () => setAccordionVisibility(!accordionVisibility);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      toggleVisibility();
    }
  };

  return (
    <AccordionMenuLi
      visible={accordionVisibility}
      hasChildren={children !== undefined}
    >
      <div>
        <Link
          to={link}
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Header_Clicks"
          data-ga-lab={title}
          onClick={toggleVisibility}
        >{title}
        </Link>
        <Button aria-label="Expand menu" onKeyDown={handleKeyDown} onClick={toggleVisibility} />
      </div>
      <ul>
        {children}
      </ul>
    </AccordionMenuLi>
  );
};

AccordionMenu.defaultProps = {
  title: '',
  link: '',
  children: undefined,
};

AccordionMenu.propTypes = {
  link: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

function useHandleClosingClicks({ containerRef, sidebarRef, setMenuVisibility }) {
  function handleClicks(event) {
    // clicks outside containerRef
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setMenuVisibility(false);
    }

    // clicks inside sidebarRef
    if (sidebarRef?.current?.contains(event.target)) {
      setMenuVisibility(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClicks);
    return () => {
      document.removeEventListener('click', handleClicks);
    };
  });
}

const SmHeader = () => {
  const [mobileMenuVisibility, setMenuVisibility] = React.useState(false);
  const {
    state,
    showHideModal,
    logout,
    jwtToken,
  } = React.useContext(AuthContext) || {};

  const toggleVisibility = () => {
    setMenuVisibility(!mobileMenuVisibility);
  };

  const containerRef = useRef();
  const sidebarRef = useRef();
  useHandleClosingClicks(({ containerRef, sidebarRef, setMenuVisibility }));

  return (
    <Container ref={containerRef}>
      <Fixed>
        <Toggler onClick={toggleVisibility} menuScrolledDown={mobileMenuVisibility}>
          <img src={menuIcon} alt="Digital Marketing Solutions by Yellow" />
        </Toggler>
        <a href="/"><img alt="Yellow NZ" src={yellowLogo} /> </a>
      </Fixed>
      <Expanded menuScrolledDown={mobileMenuVisibility}>
        <ul>
          {jwtToken && (
            <MyYellowSidebar ref={sidebarRef} />
          )}
          <ExpandedMenuListItem>
            <Link to="/">Home</Link>
          </ExpandedMenuListItem>
          <AccordionMenu title="Products" link="/our-products">
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
              >Search Engine Optimization
              </Link>
            </li>
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
            <li>
              <Link
                to="/our-products/marketing-automation/"
                data-ga-cat="Navigation_Interaction"
                data-ga-act="Header_Clicks"
                data-ga-lab="Products_Marketing_Automation"
              >Marketing Automation & CRM
              </Link>
            </li>
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
          </AccordionMenu>
          <AccordionMenu title="Resources" link="/resources/">
            <li>
              <Link
                to="/resources/customer-stories/"
                data-ga-cat="Navigation_Interaction"
                data-ga-act="Header_Clicks"
                data-ga-lab="Customer_Stories"
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
                data-ga-lab="FAQ"
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
          </AccordionMenu>
          <AccordionMenu title="About Yellow" link="/company/about-us/">
            <li>
              <Link
                to="/company/about-us/"
                data-ga-cat="Navigation_Interaction"
                data-ga-act="Header_Clicks"
                data-ga-lab="Our_Team"
              >Our team
              </Link>
            </li>
            <li>
              <Link
                to="/company/careers/"
                data-ga-cat="Navigation_Interaction"
                data-ga-act="Header_Clicks"
                data-ga-lab="Careers"
              >Careers
              </Link>
            </li>
            <li>
              <Link
                to="/company/contact-us/"
                data-ga-cat="Navigation_Interaction"
                data-ga-act="Header_Clicks"
                data-ga-lab="Contact_Us"
              >Contact us
              </Link>
            </li>
          </AccordionMenu>
          <ExpandedMenuListItem>
            <a href="/find-a-business/"><FindABusiness>Find a Business</FindABusiness></a>
          </ExpandedMenuListItem>
        </ul>
        <Contact>
          {!state?.user
            ? (
              <li>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    showHideModal({
                      show: true,
                      modalType: 'login',
                      target: '/my-yellow/',
                    });
                  }}
                >
                  <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* eslint-disable-next-line max-len */}
                    <path d="M25.6059 4.39361C22.7729 1.56001 19.0062 0 14.9994 0C10.9926 0 7.22642 1.56001 4.39352 4.39361C1.55998 7.22658 0 10.9934 0 14.9997C0 19.006 1.55998 22.7728 4.39352 25.6064C7.22642 28.4394 10.9932 30 15 30C19.0068 30 22.773 28.44 25.6065 25.6064C28.4394 22.7734 30 19.0066 30 14.9997C30 10.9928 28.4388 7.22658 25.6059 4.39361ZM22.9328 25.4416C20.7279 27.1207 17.9783 28.1191 14.9994 28.1191C12.0204 28.1191 9.27025 27.1207 7.06598 25.4409C6.70497 25.1658 6.54891 24.6926 6.69369 24.262C7.46522 21.9605 9.3135 20.0971 11.687 19.184C12.0066 19.0611 12.0699 18.6324 11.7929 18.4312C10.4228 17.4365 9.52973 15.822 9.52973 14.0025C9.52973 10.9144 12.1019 8.41617 15.2162 8.53651C18.1375 8.64995 20.469 11.078 20.4696 14.0013C20.4703 15.8207 19.5772 17.4353 18.2065 18.4306C17.9294 18.6318 17.9927 19.0605 18.3124 19.1833C20.6777 20.0934 22.521 21.9467 23.2975 24.2369C23.4461 24.6769 23.3013 25.1608 22.9328 25.4416Z" fill="#A5AAB4" />
                  </svg>
                  Sign in
                </IconButton>
              </li>
            )
            : (
              <li>
                <IconButton
                  onClick={logout}
                >
                  <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* eslint-disable-next-line max-len */}
                    <path d="M25.6059 4.39361C22.7729 1.56001 19.0062 0 14.9994 0C10.9926 0 7.22642 1.56001 4.39352 4.39361C1.55998 7.22658 0 10.9934 0 14.9997C0 19.006 1.55998 22.7728 4.39352 25.6064C7.22642 28.4394 10.9932 30 15 30C19.0068 30 22.773 28.44 25.6065 25.6064C28.4394 22.7734 30 19.0066 30 14.9997C30 10.9928 28.4388 7.22658 25.6059 4.39361ZM22.9328 25.4416C20.7279 27.1207 17.9783 28.1191 14.9994 28.1191C12.0204 28.1191 9.27025 27.1207 7.06598 25.4409C6.70497 25.1658 6.54891 24.6926 6.69369 24.262C7.46522 21.9605 9.3135 20.0971 11.687 19.184C12.0066 19.0611 12.0699 18.6324 11.7929 18.4312C10.4228 17.4365 9.52973 15.822 9.52973 14.0025C9.52973 10.9144 12.1019 8.41617 15.2162 8.53651C18.1375 8.64995 20.469 11.078 20.4696 14.0013C20.4703 15.8207 19.5772 17.4353 18.2065 18.4306C17.9294 18.6318 17.9927 19.0605 18.3124 19.1833C20.6777 20.0934 22.521 21.9467 23.2975 24.2369C23.4461 24.6769 23.3013 25.1608 22.9328 25.4416Z" fill="#A5AAB4" />
                  </svg>
                  Sign Out
                </IconButton>
              </li>
            )}
          <li>
            <StyledIconLink href="tel:0800803803" text="Call us" src={iconPhone} />
          </li>
        </Contact>
        <FollowUs>
          <h3>Follow us</h3>
          <ul>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="//www.facebook.com/yellownz"
                title="Follow us on Facebook"
                data-ga="track"
                data-ga-cat="Follow_Us"
                data-ga-act="Facebook"
                data-ga-lab="Facebook"
              >
                <img src={followUsFb} alt="Facebook" />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="//twitter.com/yellownz"
                title="Follow us on Twitter"
                data-ga="track"
                data-ga-cat="Follow_Us"
                data-ga-act="Twitter"
                data-ga-lab="Twitter"
              >
                <img src={followUsTw} alt="Twitter" />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="//www.linkedin.com/company/yellow-new-zealand"
                title="Follow us on LinkedIn"
                data-ga="track"
                data-ga-cat="Follow_Us"
                data-ga-act="LinkedIn"
                data-ga-lab="LinkedIn"
              >
                <img src={followUsIn} alt="LinkedIn" />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="//www.youtube.com/user/yellowbiznz"
                title="Follow us on Youtube"
                data-ga="track"
                data-ga-cat="Follow_Us"
                data-ga-act="Youtube"
                data-ga-lab="Youtube"
              >
                <img src={followUsYt} alt="YouTube" />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                // eslint-disable-next-line max-len
                href="https://www.google.co.nz/maps/place/Yellow/@-36.897607,174.8006043,17z/data=!3m1!4b1!4m5!3m4!1s0x6d0d48ef0f099ad1:0xbabdfef7f73a92a5!8m2!3d-36.897607!4d174.802793"
                title="Google Maps"
                data-ga="track"
                data-ga-cat="Follow_Us"
                data-ga-act="Maps"
                data-ga-lab="Maps"
              >
                <img src={followUsG} alt="Google" />
              </a>
            </li>
          </ul>
        </FollowUs>
      </Expanded>
    </Container>
  );
};

export default SmHeader;
