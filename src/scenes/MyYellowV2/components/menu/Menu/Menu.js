import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../../../util';

export const MenuItem = ({
  icon, label, selected, ...rest
}) => (
  <a
    className={`no-underline w-full p-2 flex items-center rounded-md ${
      selected ? 'bg-contrast-600 text-contrast-100' : 'hover:bg-contrast-200 text-contrast-600'
    }`}
    {...rest}
  >
    <picture className="min-w-4">{icon}</picture>
    <div>{label}</div>
  </a>
);

export const MenuGroup = ({ name, children }) => (
  <div className="flex flex-col space-y-1 py-2">
    <div className="uppercase tracking-widest text-sm text-contrast-400 pl-2">{name}</div>
    <div className="flex flex-col space-y-1">{children}</div>
  </div>
);

export const Menu = styled.div.attrs({
  className: 'p-3 bg-contrast-100 flex flex-col',
})``;

export const HorizontalSeparator = () => (
  <div>
    <div>&zwnj;</div>
    <div className="opacity-50" style={{ borderTop: `1px solid ${theme.palette.contrast[4]}` }}>
      &zwnj;
    </div>
  </div>
);

export const BusinessMenuHeroItem = ({ businessName }) => (
  <div className="text-contrast-600 font-bold text-lg pl-2 py-3">{businessName}</div>
);
