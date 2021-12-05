
import React from 'react';
import { Link } from 'gatsby';

import Button from '../../../Button';

import logoSrc from '../../assets/yellow-logo.svg';
import menuItems from '../../services/menuItems';

import FindABusinessSearch from '../FindABusinessSearch';

import { Container, WhiteNav, SkipLink } from './LgHeaderStyled';

import AccountControls from './components/AccountControls';
import ExpandingMenuItems from './components/ExpandingMenuItems';

const LgHeader = () => {
  const mainRef = React.createRef();

  const focusMain = () => {
    mainRef.current.focus();
  };

  return (
    <Container>
      <SkipLink><Button onClick={focusMain}>Skip to main content</Button></SkipLink>
      <WhiteNav>
        <li>
          <Link to="/"><img src={logoSrc} alt="Yellow" /></Link>
        </li>
        <ExpandingMenuItems menuItems={menuItems} />
        <li>
          <FindABusinessSearch />
        </li>
        <AccountControls />
      </WhiteNav>
      <div ref={mainRef} tabIndex="-1" />
    </Container>
  );
};

export default LgHeader;
