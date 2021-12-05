/* eslint-disable no-console */

import React, { useRef, useEffect } from 'react';

import MyYellowSidebar from '../../../../scenes/MyYellow/components/Sidebar/MyYellowSidebar';

import AuthContext from '../../../Auth/AuthContext';
import MaybeExternalGatsbyLink from '../../../MaybeExternalGatsbyLink';

import yellowLogo from '../../assets/yellow-logo.svg';
import followUsFb from '../../assets/follow-us-fb.svg';
import followUsTw from '../../assets/follow-us-tw.svg';
import followUsIn from '../../assets/follow-us-in.svg';
import followUsYt from '../../assets/follow-us-yt.svg';
import followUsG from '../../assets/follow-us-g.svg';
import menuIcon from '../../assets/menu-icon.svg';
import menuItems from '../../services/menuItems';
import FindABusinessSearch from '../FindABusinessSearch';

import AccordionMenu from './components/AccordionMenu';

import {
  Container, Fixed, Toggler, Expanded,
  FollowUs, IconButton,
} from './SmHeaderStyled';

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
        <a href="/"><img alt="Yellow NZ" src={yellowLogo} /></a>
      </Fixed>
      <Expanded menuScrolledDown={mobileMenuVisibility} className="local-reset">
        <ul>
          {jwtToken && (
            <MyYellowSidebar ref={sidebarRef} />
          )}
          {menuItems.map((menuItem) => (
            <AccordionMenu
              key={menuItem.title}
              title={menuItem.title}
              link={menuItem.link}
              label={menuItem.trackingLabel ?? menuItem.title}
              target={menuItem.target}
            >
              {menuItem.children?.map((childItem) => (
                <AccordionMenu
                  key={childItem.title}
                  title={childItem.title}
                  link={childItem.link}
                  label={childItem.trackingLabel ?? childItem.title}
                  target={childItem.target}
                  level={2}
                >
                  {childItem.children?.map((grandChildItem) => (
                    <li
                      key={grandChildItem.title}
                      className={`
                        flex items-center
                        bg-contrast-100
                        py-2 pl-3
                        border-solid border-0 border-b border-contrast-200
                        last:border-0
                      `}
                    >
                      <>
                        {grandChildItem.iconSrc && (
                          <img src={grandChildItem.iconSrc} alt="" className="mr-2" />
                        )}
                        <MaybeExternalGatsbyLink
                          href={grandChildItem.link}
                          data-ga-cat="Navigation_Interaction"
                          data-ga-act="Header_Clicks"
                          data-ga-lab={grandChildItem.trackingLabel ?? grandChildItem.title}
                          target={grandChildItem.target}
                        >{grandChildItem.title}
                        </MaybeExternalGatsbyLink>
                      </>
                    </li>
                  ))}
                </AccordionMenu>
              ))}
            </AccordionMenu>
          ))}
        </ul>
        <FindABusinessSearch className="my-3" />
        <ul className="mb-2">
          {!state?.user ? (
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
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 25.5C6 20.5109 10.0109 16.5 15 16.5" stroke="#1B365D" strokeMiterlimit="10" strokeLinejoin="round" />
                  <path d="M24 25.5C24 20.5109 19.9891 16.5 15 16.5" stroke="#1B365D" strokeMiterlimit="10" strokeLinejoin="round" />
                  <circle cx="15" cy="15" r="14.5" stroke="#1B365D" />
                  <path d="M20.5 10.5C20.5 13.5376 18.0376 16 15 16C11.9624 16 9.5 13.5376 9.5 10.5C9.5 7.46243 11.9624 5 15 5C18.0376 5 20.5 7.46243 20.5 10.5Z" stroke="#1B365D" />
                </svg>
                Sign in
              </IconButton>
            </li>
          ) : (
            <li>
              <IconButton onClick={logout}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 25.5C6 20.5109 10.0109 16.5 15 16.5" stroke="#1B365D" strokeMiterlimit="10" strokeLinejoin="round" />
                  <path d="M24 25.5C24 20.5109 19.9891 16.5 15 16.5" stroke="#1B365D" strokeMiterlimit="10" strokeLinejoin="round" />
                  <circle cx="15" cy="15" r="14.5" stroke="#1B365D" />
                  <path d="M20.5 10.5C20.5 13.5376 18.0376 16 15 16C11.9624 16 9.5 13.5376 9.5 10.5C9.5 7.46243 11.9624 5 15 5C18.0376 5 20.5 7.46243 20.5 10.5Z" stroke="#1B365D" />
                </svg>
                Sign Out
              </IconButton>
            </li>
          )}
          <li>
            <IconButton href="tel:0800803803">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.2664 20.1548L20.062 16.9505C19.6905 16.579 19.0868 16.579 18.7153 16.9505L18.158 17.6935C18.158 17.6935 16.5791 20.0619 13.3283 16.8112C10.124 13.6068 12.4459 11.9814 12.4459 11.9814L13.0032 11.2384C13.3747 10.8669 13.3747 10.2632 13.0032 9.89166L9.79888 6.68733C9.42736 6.31581 8.82365 6.31581 8.45213 6.68733L7.89485 7.43036C7.89485 7.43036 3.20445 11.4242 10.9599 19.1331C18.7153 26.8886 22.6627 22.1982 22.6627 22.1982L23.2199 21.4551C23.6379 21.0836 23.6379 20.4799 23.2664 20.1548Z" fill="#1B365D" />
                <path d="M29.5 15C29.5 23.0081 23.0081 29.5 15 29.5C6.99187 29.5 0.5 23.0081 0.5 15C0.5 6.99187 6.99187 0.5 15 0.5C23.0081 0.5 29.5 6.99187 29.5 15Z" stroke="#1B365D" strokeMiterlimit="10" />
              </svg>
              Call us - 0800 803 803
            </IconButton>
          </li>
        </ul>
        <FollowUs>
          <ul className="pb-3">
            <li>
              <a
                className="border border-solid border-contrast-600 rounded-full"
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
                className="border border-solid border-contrast-600 rounded-full"
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
                className="border border-solid border-contrast-600 rounded-full"
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
                className="border border-solid border-contrast-600 rounded-full"
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
                className="border border-solid border-contrast-600 rounded-full"
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
