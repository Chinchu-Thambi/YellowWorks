import React from 'react';

import {
  isInaccessible, render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as R from 'ramda';

import menuItems from '../../services/menuItems';

import LgHeader from './LgHeader';

describe('LgHeader', () => {
  const everyItemInMenu = [].concat(
    R.compose(
      R.map(R.pick(['title', 'link'])),
    )(menuItems),
    R.compose(
      R.map(R.pick(['title', 'link'])),
      R.flatten,
      R.map(R.prop('children')),
    )(menuItems),
    R.compose(
      R.flatten,
      R.filter(Boolean),
      R.map(R.prop('children')),
      R.flatten,
      R.map(R.prop('children')),
    )(menuItems),
  );

  it('renders items from menu items', () => {
    render(<LgHeader />);

    everyItemInMenu.forEach(((menuItem) => {
      screen.getByText(menuItem.title);
    }));
  });

  it('renders links from model', () => {
    const referenceItem = menuItems[0];

    render(<LgHeader />);

    expect(
      screen.getByText(referenceItem.title),
    ).toHaveAttribute(
      'href', referenceItem.link,
    );

    expect(
      screen.getByText(referenceItem.children[0].title),
    ).toHaveAttribute(
      'href', referenceItem.children[0].link,
    );

    expect(
      screen.getByText(referenceItem.children[0].children[0].title),
    ).toHaveAttribute(
      'href', referenceItem.children[0].children[0].link,
    );
  });

  it('infers tracking label from title', () => {
    render(<LgHeader />);

    everyItemInMenu.forEach((menuItem) => {
      const menuElement = screen.getByText(menuItem.title);

      // because tracking is kind of pointless without a link
      if (menuItem.link) {
        expect(menuElement).toHaveAttribute('data-ga-lab', menuItem.trackingLabel);
      }
    });
  });
});
