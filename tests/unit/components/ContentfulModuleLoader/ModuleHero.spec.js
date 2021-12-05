/* eslint-disable max-len */
/* eslint-disable no-console */
/* globals describe, it, expect, jest, beforeEach */

import React from 'react';
import {
  render, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../src/util';

import ModuleHero from '../../../../src/components/ContentfulModuleLoader/ModuleHero';
import HeroLiquidRightTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleHero/HeroLiquidRightTemplate';
import HeroLiquidLeftTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleHero/HeroLiquidLeftTemplate';
import FullImageCenterTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleHero/FullImageCenterTemplate';
import FullTestimonialTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleHero/FullTestimonialTemplate';
import BlogHeaderHeroTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleHero/BlogHeaderHeroTemplate';

const content = {
  title: { title: 'title' },
  titleSub: { subtitle: 'subtitle' },
  description: { description: 'description' },
  callToActionButton: 'callToActionButton',
  callToActionButtonUrl: 'callToActionButtonUrl',
  callToActionSecondary: 'callToActionSecondary',
  callToActionSecondaryUrl: 'callToActionSecondaryUrl',
  image: {
    file: {
      details: {
        image: {
          width: 200,
          height: 200,
        },
      },
    },
  },
};

describe('ModuleHero', () => {
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
          <ModuleHero template={template} />
        </ThemeProvider>,
      );
    }).not.toThrow();

    expect(console.error.mock.calls).toHaveLength(0);

    console.error = originalConsole;
  });

  it('renders the template correctly for Hero: Liquid [R] templates', () => {
    const template = 'Hero: Liquid [R]';
    const correctTemplateSpy = jest.spyOn(HeroLiquidRightTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleHero template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.titleSub.subtitle).innerHTML).toBe(content.titleSub.subtitle);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(content.callToActionButton).innerHTML).toBe(content.callToActionButton);
    expect(getByText(content.callToActionButton).href).toContain(content.callToActionButtonUrl);
    expect(getByText(content.callToActionSecondary).innerHTML)
      .toBe(content.callToActionSecondary);
    expect(getByText(content.callToActionSecondary).href)
      .toContain(content.callToActionSecondaryUrl);
  });

  it('renders the template correctly for Hero: Liquid [L]', () => {
    const template = 'Hero: Liquid [L]';
    const correctTemplateSpy = jest.spyOn(HeroLiquidLeftTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleHero template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(content.callToActionButton).innerHTML).toBe(content.callToActionButton);
    expect(getByText(content.callToActionButton).href).toContain(content.callToActionButtonUrl);
    expect(getByText(content.callToActionSecondary).innerHTML)
      .toBe(content.callToActionSecondary);
    expect(getByText(content.callToActionSecondary).href)
      .toContain(content.callToActionSecondaryUrl);
  });
  it('renders the template correctly for Hero: Full Image Centered', () => {
    const template = 'Hero: Full Image [Center Text]';
    const correctTemplateSpy = jest.spyOn(FullImageCenterTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleHero template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(content.callToActionButton).innerHTML).toBe(content.callToActionButton);
    expect(getByText(content.callToActionButton).href).toContain(content.callToActionButtonUrl);
    expect(getByText(content.callToActionSecondary).innerHTML)
      .toBe(content.callToActionSecondary);
    expect(getByText(content.callToActionSecondary).href)
      .toContain(content.callToActionSecondaryUrl);
  });
  it('renders the template correctly for FullTestimonialTemplate', () => {
    const template = 'Hero/Section: Full Testimonial';
    const correctTemplateSpy = jest.spyOn(FullTestimonialTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleHero template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.titleSub.subtitle).innerHTML).toBe(content.titleSub.subtitle);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(content.callToActionButton).innerHTML).toBe(content.callToActionButton);
  });
  it('renders the template correctly for Blog Post Hero', () => {
    const template = 'Hero: Blog Post';
    const correctTemplateSpy = jest.spyOn(BlogHeaderHeroTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleHero template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
  });
});
