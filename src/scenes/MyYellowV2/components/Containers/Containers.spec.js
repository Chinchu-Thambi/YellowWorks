/* globals describe, it */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import {
  OneColumnContainer, TwoColumnContainer, Card, ContentWithIcon,
} from './Containers';

describe('OneColumnContainer', () => {
  it('should render properties and children correctly', () => {
    render(
      <OneColumnContainer title="Container title" subtitle="Container subtitle">
        <div>Whatever that goes inside the container</div>
        <button type="button">Some button</button>
      </OneColumnContainer>,
    );

    screen.getByText('Container title');
    screen.getByText('Container subtitle');
    screen.getByText('Whatever that goes inside the container');
    screen.getByText('Some button');
  });
});

describe('TwoColumnContainer', () => {
  it('should render properties and children correctly', () => {
    render(
      <TwoColumnContainer title="Container title" subtitle="Container subtitle">
        <div>Whatever that goes inside the container</div>
        <button type="button">Some button</button>
      </TwoColumnContainer>,
    );

    screen.getByText('Container title');
    screen.getByText('Container subtitle');
    screen.getByText('Whatever that goes inside the container');
    screen.getByText('Some button');
  });
});

describe('Card', () => {
  it('should render children correctly', () => {
    render(
      <Card>
        <div>Whatever that goes inside the container</div>
        <button type="button">Some button</button>
      </Card>,
    );

    screen.getByText('Whatever that goes inside the container');
    screen.getByText('Some button');
  });
});

describe('ContentWithIcon', () => {
  it('should render icon and children correctly', () => {
    render(
      <ContentWithIcon icon={<FontAwesomeIcon icon={faAddressBook} data-testid="icon-for-content" />}>
        Child content text
      </ContentWithIcon>,
    );

    screen.getByText('Child content text');
    screen.getByTestId('icon-for-content');
  });
});
