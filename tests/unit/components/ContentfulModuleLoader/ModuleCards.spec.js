/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* globals describe, it, expect, jest, beforeEach */

import React from 'react';
import {
  render, cleanup, fireEvent, createEvent,
} from '@testing-library/react';
import { navigate } from 'gatsby';

import { ThemeProvider } from 'styled-components';

import ModuleCards from '../../../../src/components/ContentfulModuleLoader/ModuleCards';

import CardLiquidLeftTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleCards/CardLiquidLeftTemplate';
import CardLiquidRightTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleCards/CardLiquidRightTemplate';
import CardLiquidQuotesTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleCards/CardLiquidQuotesTemplate';
import ThreePanelTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleCards/ThreePanelTemplate';
import CardCarouselTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleCards/CardCarouselTemplate';
import CardSquareTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleCards/CardSquareTemplate';
import CardFourSquareTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleCards/CardFourSquareTemplate';
import CardFourSquareVariationTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleCards/CardFourSquareVariationTemplate';
import SquareFeatureHeaderTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleCards/SquareFeatureHeaderTemplate';
import CardFourLiquidTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleCards/CardFourLiquidTemplate';
import CardFaqTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleCards/CardFaqTemplate';

const theme = {
  colors: {
    brand: 'brand',
  },
  palette: {
    base: [''],
    contrast: [],
    accent: [[], [], [], [], [], []],
  },
  fonts: {
    mono: 'mono',
  },
  breakpoints: [0, 1, 2, 3, 4, 5, 6],
  space: [0, 1, 2, 3, 4, 5, 6],
  fontSizes: [0, 1, 2, 3, 4, 5, 6],
  fontWeight: [400, 700, 900],
  shadows: {
    small: '0 0 4px rgba(0, 107, 167, 0.1)',
    medium: '0px 4px 15px rgba(0, 107, 167, 0.1)',
    large: '0 0 24px rgba(0, 107, 167, 0.1)',
  },
};

const card = {
  title: 'card title',
  text: { text: 'card text' },
  image: {
    description: 'image description',
    file: {
      url: 'imageurl',
      alt: 'imagealt',
    },
  },
  callToAction: 'card call to action',
  callToActionUrl: 'cardCallToActionUrl',
};

const content = {
  title: { title: 'title' },
  subtitle: { subtitle: 'subtitle' },
  description: { description: 'description' },
  callToActionButton: 'callToActionButton',
  callToAction: 'callToActionButton',
  callToActionUrl: 'callToActionUrl',
  media: {
    description: 'mediaDescription',
    file: {
      url: 'mediaURL',
      details: {
        image: {
          height: '500',
          width: '500',
        },
      },
    },
  },
  cards: [card],
};

describe('ModuleCards', () => {
  beforeEach(() => {
    cleanup();
    // clearAllMocks would ensure each mock count is reset
    jest.clearAllMocks();
  });

  it('renders without errors', () => {
    const template = '';

    const originalConsole = console.error;
    console.error = jest.fn();

    expect(() => {
      render(
        <ThemeProvider theme={theme}>
          <ModuleCards template={template} />
        </ThemeProvider>,
      );
    }).not.toThrow();

    expect(console.error.mock.calls).toHaveLength(1);

    console.error = originalConsole;
  });

  it('renders the template correctly for FAQs', () => {
    const template = 'Card: FAQs';
    const correctTemplateSpy = jest.spyOn(CardFaqTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleCards template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.subtitle.subtitle).innerHTML).toBe(content.subtitle.subtitle);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(card.title).innerHTML).toBe(card.title);
    expect(getByText(card.text.text).innerHTML).toBe(card.text.text);
  });

  it('renders the template correctly for Liquid Left', () => {
    const template = 'Card: Liquid Left';
    const correctTemplateSpy = jest.spyOn(CardLiquidLeftTemplate, 'render');

    const { getByText, getByAltText } = render(
      <ThemeProvider theme={theme}>
        <ModuleCards template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.subtitle.subtitle).innerHTML).toBe(content.subtitle.subtitle);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(card.title).innerHTML).toBe(card.title);
    expect(getByText(card.text.text).innerHTML).toBe(card.text.text);
    expect(getByAltText(card.image.description).alt).toBe(card.image.description);
  });

  it('renders the template correctly for Liquid Right', () => {
    const template = 'Card: Liquid Right';
    const correctTemplateSpy = jest.spyOn(CardLiquidRightTemplate, 'render');

    const { getByText, getByAltText } = render(
      <ThemeProvider theme={theme}>
        <ModuleCards template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.subtitle.subtitle).innerHTML).toBe(content.subtitle.subtitle);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(card.title).innerHTML).toBe(card.title);
    expect(getByText(card.text.text).innerHTML).toBe(card.text.text);
    expect(getByAltText(card.image.description).alt).toBe(card.image.description);
    expect(getByAltText(card.image.description).src).toContain(card.image.file.url);
    expect(getByAltText(card.image.description).src).toContain(card.image.file.url);
    expect(getByText(card.callToAction).href).toContain(card.callToActionUrl);

    // ensure card click navigates
    const cardElement = getByText('card text');
    expect(cardElement);
    fireEvent(cardElement, createEvent.click(cardElement));
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('renders the template correctly for Liquid Quotes', () => {
    const template = 'Card: Liquid Quotes';
    const correctTemplateSpy = jest.spyOn(CardLiquidQuotesTemplate, 'render');

    const { getByText, getByAltText } = render(
      <ThemeProvider theme={theme}>
        <ModuleCards template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.subtitle.subtitle).innerHTML).toBe(content.subtitle.subtitle);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(card.title).innerHTML).toBe(card.title);
    expect(getByText(card.text.text).innerHTML).toBe(card.text.text);
    expect(getByAltText(card.image.description).alt).toBe(card.image.description);
    expect(getByAltText(card.image.description).src).toContain(card.image.file.url);
  });

  it('renders the template correctly for Card: 3 panel', () => {
    const template = 'Card: 3 panel';
    const correctTemplateSpy = jest.spyOn(ThreePanelTemplate, 'render');

    const { getByText, getByAltText } = render(
      <ThemeProvider theme={theme}>
        <ModuleCards template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.subtitle.subtitle).innerHTML).toBe(content.subtitle.subtitle);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(card.title).innerHTML).toBe(card.title);
    expect(getByText(card.text.text).innerHTML).toBe(card.text.text);
    expect(getByAltText(card.image.description).alt).toBe(card.image.description);
    expect(getByAltText(card.image.description).src).toContain(card.image.file.url);

    // ensure card click navigates
    const cardElement = getByText('card text');
    expect(cardElement);
    fireEvent(cardElement, createEvent.click(cardElement));
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('renders the template correctly for carousel cards', () => {
    const template = 'Card: Carousel';
    const correctTemplateSpy = jest.spyOn(CardCarouselTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleCards template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(card.title).innerHTML).toBe(card.title);
    expect(getByText(card.text.text).innerHTML).toBe(card.text.text);
  });

  it('renders the template correctly for 3 Square cards', () => {
    const template = 'Card: 3 Square';
    const correctTemplateSpy = jest.spyOn(CardSquareTemplate, 'render');

    const { getByText, getByAltText } = render(
      <ThemeProvider theme={theme}>
        <ModuleCards template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.subtitle.subtitle).innerHTML).toBe(content.subtitle.subtitle);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(card.title).innerHTML).toBe(card.title);
    expect(getByText(card.text.text).innerHTML).toBe(card.text.text);
    expect(getByAltText(card.image.description).alt).toBe(card.image.description);
    expect(getByAltText(card.image.description).src).toContain(card.image.file.url);
  });
  it('renders the template correctly for 4 Square cards', () => {
    const template = 'Card: 4 Square';
    const correctTemplateSpy = jest.spyOn(CardFourSquareTemplate, 'render');

    const { getByText, getByAltText } = render(
      <ThemeProvider theme={theme}>
        <ModuleCards template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.subtitle.subtitle).innerHTML).toBe(content.subtitle.subtitle);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(card.title).innerHTML).toBe(card.title);
    expect(getByText(card.text.text).innerHTML).toBe(card.text.text);
    expect(getByAltText(card.image.description).alt).toBe(card.image.description);
    expect(getByAltText(card.image.description).src).toContain(card.image.file.url);
  });
  it('renders the template correctly for Card: Header Image Feature', () => {
    const template = 'Card: Header Image Feature';
    const correctTemplateSpy = jest.spyOn(SquareFeatureHeaderTemplate, 'render');

    const { getByText, getByAltText } = render(
      <ThemeProvider theme={theme}>
        <ModuleCards template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.subtitle.subtitle).innerHTML).toBe(content.subtitle.subtitle);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(card.title).innerHTML).toBe(card.title);
    expect(getByText(card.text.text).innerHTML).toBe(card.text.text);
    expect(getByAltText(card.image.description).alt).toBe(card.image.description);
    expect(getByAltText(card.image.description).src).toContain(card.image.file.url);
  });
  it('renders the template correctly for 4 Square cards alternate', () => {
    const template = 'Card: 4 Square Variation';
    const correctTemplateSpy = jest.spyOn(CardFourSquareVariationTemplate, 'render');

    const { getByText, getByAltText } = render(
      <ThemeProvider theme={theme}>
        <ModuleCards template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.subtitle.subtitle).innerHTML).toBe(content.subtitle.subtitle);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(card.title).innerHTML).toBe(card.title);
    expect(getByText(card.text.text).innerHTML).toBe(card.text.text);
    expect(getByAltText(card.image.description).alt).toBe(card.image.description);
    expect(getByAltText(card.image.description).src).toContain(card.image.file.url);
  });
  it('renders the template correctly for 3 panel cards', () => {
    const template = 'Card: 3 panel';
    const correctTemplateSpy = jest.spyOn(ThreePanelTemplate, 'render');

    const { getByText, getByAltText } = render(
      <ThemeProvider theme={theme}>
        <ModuleCards template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.subtitle.subtitle).innerHTML).toBe(content.subtitle.subtitle);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(card.title).innerHTML).toBe(card.title);
    expect(getByText(card.text.text).innerHTML).toBe(card.text.text);
    expect(getByAltText(card.image.description).alt).toBe(card.image.description);
    expect(getByAltText(card.image.description).src).toContain(card.image.file.url);
  });
  it('renders the template correctly for 4 liquid cards', () => {
    const template = 'Card: 4 Liquid Hero Section';
    const correctTemplateSpy = jest.spyOn(CardFourLiquidTemplate, 'render');

    const { getByText, getByAltText } = render(
      <ThemeProvider theme={theme}>
        <ModuleCards template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(card.title).innerHTML).toBe(card.title);
    expect(getByText(card.text.text).innerHTML).toBe(card.text.text);
    expect(getByAltText(card.image.description).alt).toBe(card.image.description);
    expect(getByAltText(card.image.description).src).toContain(card.image.file.url);
  });
});
