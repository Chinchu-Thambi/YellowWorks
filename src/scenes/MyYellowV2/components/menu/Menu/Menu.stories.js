import {
  faBreadSlice, faBuilding, faCog, faSkating, faTag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  Menu, MenuGroup, MenuItem, HorizontalSeparator, BusinessMenuHeroItem,
} from './Menu';

export const MenuItems = () => (
  <div>
    <MenuItem icon={<FontAwesomeIcon icon={faTag} />} label="Products & Services" href="https://google.com" />
    <MenuItem icon={<FontAwesomeIcon icon={faTag} />} label="Products & Services" href="https://google.com" selected />
  </div>
);

export const Menus = () => (
  <Menu>
    <BusinessMenuHeroItem businessName="Laser Plumbing" />
    <MenuGroup name="Channels">
      <MenuItem icon={<FontAwesomeIcon icon={faBuilding} />} label="Google My Business" href="https://google.com" />
      <MenuItem
        icon={<FontAwesomeIcon icon={faBreadSlice} />}
        label="Yellow Website"
        href="https://google.com"
        selected
      />
    </MenuGroup>
    <HorizontalSeparator />
    <MenuGroup name="Administration">
      <MenuItem icon={<FontAwesomeIcon icon={faCog} />} label="Settings" href="https://google.com" />
      <MenuItem icon={<FontAwesomeIcon icon={faSkating} />} label="Billing" href="https://google.com" selected />
    </MenuGroup>
  </Menu>
);

export default {
  title: 'Manage Journey/Organisms/Menu',
};
