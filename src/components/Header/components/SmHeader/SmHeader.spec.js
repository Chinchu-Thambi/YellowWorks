import React from 'react';
import {
  isInaccessible, render, screen, within,
} from '@testing-library/react';

import * as R from 'ramda';

import SmHeader from './SmHeader';

import menuItems from '../../services/menuItems';

describe('SmHeader', () => {
  const ourSolutionsText = 'Our Solutions';
  const getOnlineText = 'Get Online';
  const promoteBusinessText = 'Promote your Business';
  const amplifyBusinessText = 'Amplify your Business';
  const knowledgeBaseText = 'Knowledge Base';

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

  it.skip('renders top level links', () => {
    render(<SmHeader />);

    screen.getByText(ourSolutionsText);
    screen.getByText('Why Yellow?');
    screen.getByText(knowledgeBaseText);
  });

  it.skip('renders links under expanded why yellow menu', () => {
    render(<SmHeader />);

    const listItemWrapper = within(screen.getByText('Why Yellow?').closest('li'));

    const customerStoriesLink = listItemWrapper.getByText('Customer Stories');
    expect(isInaccessible(customerStoriesLink)).toBe(true);

    const expandButton = listItemWrapper.getByLabelText('Expand menu');
    expandButton.click();

    expect(isInaccessible(customerStoriesLink)).toBe(false);
  });

  it.skip('renders links under our solutions', () => {
    const solutions = [
      getOnlineText,
      promoteBusinessText,
      amplifyBusinessText,
      'Speak to an Expert',
    ];

    render(<SmHeader />);

    const listItemWrapper = within(screen.getByText(ourSolutionsText).closest('li'));

    solutions.forEach(listItemWrapper.getByText);
  });

  it.skip('renders links under get online', () => {
    const items = [
      'Let\'s get Started',
      'Website',
      'Sell Online',
      'Yellow Profile',
    ];

    render(<SmHeader />);

    const listItemWrapper = within(screen.getByText(getOnlineText).closest('li'));

    items.forEach(listItemWrapper.getByText);
  });

  it.skip('renders links under promote your business', () => {
    const items = [
      'Google Search Ads',
      'Google Display Ads',
      'Facebook Ads',
      'Yellow Books',
    ];

    render(<SmHeader />);

    const listItemWrapper = within(screen.getByText(promoteBusinessText).closest('li'));

    items.forEach(listItemWrapper.getByText);
  });

  it.skip('renders links under promote your business', () => {
    const items = [
      'Facebook Setup',
      'SEO',
      'Marketing Automation & CRM',
    ];

    render(<SmHeader />);

    const listItemWrapper = within(screen.getByText(amplifyBusinessText).closest('li'));

    items.forEach(listItemWrapper.getByText);
  });

  it.skip('renders links under knowledge base', () => {
    const knowledgeBase = [
      'Starting your Business',
      'Understanding Digital Marketing',
      'Advice and Support',
      'Helpful Tools',
      'How-to Guides',
    ];

    render(<SmHeader />);

    const listItemWrapper = within(screen.getByText(knowledgeBaseText).closest('li'));

    knowledgeBase.forEach(listItemWrapper.getByText);
  });

  it('renders links from model', () => {
    const referenceItem = menuItems[0];

    render(<SmHeader />);

    expect(
      screen.getByText(referenceItem.title),
    ).toHaveAttribute(
      'href', referenceItem.link,
    );

    expect(
      screen.getByText(referenceItem.children[0].title),
    );

    expect(
      screen.getByText(referenceItem.children[0].children[0].title),
    ).toHaveAttribute(
      'href', referenceItem.children[0].children[0].link,
    );
  });

  it('render label from trackingLabel', () => {
    render(<SmHeader />);

    everyItemInMenu.forEach((menuItem) => {
      const menuElement = screen.getByText(menuItem.title);
      expect(menuElement).toHaveAttribute('data-ga-lab', menuItem.trackingLabel);
    });
  });
});
