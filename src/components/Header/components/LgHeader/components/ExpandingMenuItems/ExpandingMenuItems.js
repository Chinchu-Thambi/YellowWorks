import React from 'react';

import { MenuLink } from '../../LgHeaderStyled';

import ChildMenu from './components/ChildMenu';

const ExpandingMenuItems = ({ menuItems }) => {
  const [visibleMenu, setVisibleMenu] = React.useState(null);

  const handleMouseLeave = (e) => {
    if (
      e.relatedTarget === window // case: pointer towards outside the page
      || (
        e.relatedTarget
        && !e.relatedTarget.closest('.ExpandingMenu')
      )
    ) {
      setVisibleMenu(null);
    }
  };

  return menuItems.map((menuItem) => (
    <li
      className={`
        ExpandingMenu
        self-stretch
        flex items-stretch
      `}
      key={menuItem.title}
    >
      <MenuLink
        className="flex items-center p-3 font-bold text-contrast-600"
        to={menuItem.link || '/'}
        data-ga-cat="Navigation_Interaction"
        data-ga-act="Header_Clicks"
        data-ga-lab={menuItem.trackingLabel ?? menuItem.title}
        onMouseEnter={() => { setVisibleMenu(menuItem.title); }}
        onFocus={() => { setVisibleMenu(menuItem.title); }}
        onMouseLeave={handleMouseLeave}
        onBlur={handleMouseLeave}
      >
        {menuItem.title}
      </MenuLink>
      <ChildMenu
        menuItem={menuItem}
        visible={visibleMenu === menuItem.title}
        onFocus={() => { setVisibleMenu(menuItem.title); }}
        onBlur={handleMouseLeave}
      />
    </li>
  ));
};

export default ExpandingMenuItems;
