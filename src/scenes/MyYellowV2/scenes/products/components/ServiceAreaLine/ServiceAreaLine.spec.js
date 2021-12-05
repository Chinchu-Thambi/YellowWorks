/* globals describe, it, beforeEach, afterAll, expect */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import ServiceAreaLine from './ServiceAreaLine';

describe('ServiceAreaLine', () => {
  beforeEach(() => {
    cleanup();
  });

  afterAll(() => {
    cleanup();
  });

  it('does not throw with incomplete data', () => {
    expect(() => {
      render(<ServiceAreaLine />);
      render(<ServiceAreaLine areaServed={null} />);
    }).not.toThrow();
  });

  it('renders service areas for single item in region array', () => {
    const areaServed = {
      region: [
        {
          id: 1,
          name: 'One Region',
        },
      ],
    };

    const wrapper = render(<ServiceAreaLine areaServed={areaServed} />);

    wrapper.getByText(areaServed.region[0].name);
  });

  it('renders service areas for multiple items in regions in array', () => {
    const areaServed = {
      region: [
        {
          id: 1,
          name: 'One Region',
        },
        {
          id: 2,
          name: 'Two Region',
        },
      ],
    };

    const wrapper = render(<ServiceAreaLine areaServed={areaServed} />);

    wrapper.getByText('Servicing in 2 regions, including One Region');
  });

  it('renders service areas for single item in cities array', () => {
    const areaServed = {
      region: {
        id: 1,
        name: 'One Region',
      },
      city: [
        {
          id: 1,
          name: 'One city',
        },
      ],
    };

    const wrapper = render(<ServiceAreaLine areaServed={areaServed} />);

    wrapper.getByText(areaServed.city[0].name);
  });

  it('renders service areas for multiple items in cities array', () => {
    const areaServed = {
      region: {
        id: 1,
        name: 'One Region',
      },
      city: [
        {
          id: 1,
          name: 'One city',
        },
        {
          id: 2,
          name: 'Two city',
        },
      ],
    };

    const wrapper = render(<ServiceAreaLine areaServed={areaServed} />);

    wrapper.getByText('Servicing in 2 cities in One Region');
  });

  it('renders service areas for single item in suburbs array', () => {
    const areaServed = {
      region: {
        id: 1,
        name: 'One Region',
      },
      city: {
        id: 1,
        name: 'One city',
      },
      suburb: [
        {
          id: 1,
          name: 'One suburb',
        },
      ],
    };

    const wrapper = render(<ServiceAreaLine areaServed={areaServed} />);

    wrapper.getByText(areaServed.suburb[0].name);
  });

  it('renders service areas for multiple items in suburbs array', () => {
    const areaServed = {
      region: {
        id: 1,
        name: 'One Region',
      },
      city: {
        id: 1,
        name: 'One city',
      },
      suburb: [
        {
          id: 1,
          name: 'One suburb',
        },
        {
          id: 2,
          name: 'Two suburb',
        },
      ],
    };

    const wrapper = render(<ServiceAreaLine areaServed={areaServed} />);

    wrapper.getByText('Servicing in 2 suburbs in One city');
  });
});
