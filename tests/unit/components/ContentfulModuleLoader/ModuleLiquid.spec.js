/* eslint-disable no-console */
/* globals describe, it, expect, jest, beforeEach */

import React from 'react';
import {
  render, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';


import ModuleLiquid from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid';
import AquaLeftTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/AquaLeftTemplate';
import AquaRightTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/AquaRightTemplate';
import KoruLiquidTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/KoruLiquidTemplate';
import SectionRightTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/SectionRightTemplate';
import SectionLeftTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/SectionLeftTemplate';
import SectionProfileLeftTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/SectionProfileLeftTemplate';
import SectionTextLeftTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/SectionTextLeftTemplate';
import SectionTextRightTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/SectionTextRightTemplate';
import SectionTextCenterTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/SectionTextCenterTemplate';
import SeparatorWaveBottomGreyTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/SeparatorWaveBottomGreyTemplate';
import SeparatorWaveTopGreyTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/SeparatorWaveTopGreyTemplate';
import SeparatorTestimonialTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/SeparatorTestimonialTemplate';
import SeparatorStraightTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/SeparatorStraightTemplate';
import SeparatorCentralImageTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/SeparatorCentralImageTemplate';
import SectionTextQuoteTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleLiquid/SectionTextQuoteTemplate';
import { theme } from '../../../../src/util';

const content = {
  title: { title: 'title' },
  description: { description: 'description' },
  callToActionButton: 'callToActionButton',
  callToActionButtonUrl: 'callToActionButtonUrl',
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

describe('ModuleLiquid', () => {
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
          <ModuleLiquid template={template} />
        </ThemeProvider>,
      );
    }).not.toThrow();

    expect(console.error.mock.calls).toHaveLength(0);

    console.error = originalConsole;
  });

  it('renders the template correctly for AquaLeftTemplate', () => {
    const template = 'AquaLeft';
    const correctTemplateSpy = jest.spyOn(AquaLeftTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(content.callToActionButton).innerHTML).toBe(content.callToActionButton);
    expect(getByText(content.callToActionButton).href).toContain(content.callToActionButtonUrl);
  });

  it('renders the template correctly for AquaRightTemplate', () => {
    const template = 'AquaRight';
    const correctTemplateSpy = jest.spyOn(AquaRightTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(content.callToActionButton).innerHTML).toBe(content.callToActionButton);
    expect(getByText(content.callToActionButton).href).toContain(content.callToActionButtonUrl);
  });
  it('renders the template correctly for KoruLiquidTemplate', () => {
    const template = 'Koru';
    const correctTemplateSpy = jest.spyOn(KoruLiquidTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(content.callToActionButton).innerHTML).toBe(content.callToActionButton);
    expect(getByText(content.callToActionButton).href).toContain(content.callToActionButtonUrl);
  });

  it('renders the template correctly for SectionRightTemplate', () => {
    const template = 'Section [R]';
    const correctTemplateSpy = jest.spyOn(SectionRightTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(content.callToActionButton).innerHTML).toBe(content.callToActionButton);
    expect(getByText(content.callToActionButton).href).toContain(content.callToActionButtonUrl);
  });
  it('renders the template correctly for SectionLeftTemplate', () => {
    const template = 'Section [L]';
    const correctTemplateSpy = jest.spyOn(SectionLeftTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(content.callToActionButton).innerHTML).toBe(content.callToActionButton);
    expect(getByText(content.callToActionButton).href).toContain(content.callToActionButtonUrl);
  });
  it('renders the template correctly for SectionProfileLeftTemplate', () => {
    const template = 'Section: Profile [L]';
    const correctTemplateSpy = jest.spyOn(SectionProfileLeftTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);
  });
  it('renders the template correctly for SectionTextLeftTemplate', () => {
    const template = 'Section: Text [L]';
    const correctTemplateSpy = jest.spyOn(SectionTextLeftTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(content.callToActionButton).innerHTML).toBe(content.callToActionButton);
    expect(getByText(content.callToActionButton).href).toContain(content.callToActionButtonUrl);
  });
  it('renders the template correctly for SectionTextRightTemplate', () => {
    const template = 'Section: Text [R]';
    const correctTemplateSpy = jest.spyOn(SectionTextRightTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(content.callToActionButton).innerHTML).toBe(content.callToActionButton);
    expect(getByText(content.callToActionButton).href).toContain(content.callToActionButtonUrl);
  });
  it('renders the template correctly for SectionTextCenterTemplate', () => {
    const template = 'Section: Text [C]';
    const correctTemplateSpy = jest.spyOn(SectionTextCenterTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.description.description).innerHTML)
      .toBe(content.description.description);

    expect(getByText(content.callToActionButton).innerHTML).toBe(content.callToActionButton);
    expect(getByText(content.callToActionButton).href).toContain(content.callToActionButtonUrl);
  });

  it('renders the template correctly for Seperator Wave Top Grey', () => {
    const template = 'Separator: Wave Top - Grey';
    const correctTemplateSpy = jest.spyOn(SeparatorWaveTopGreyTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
  });
  it('renders the template correctly for Seperator Wave Bottom Grey', () => {
    const template = 'Separator: Wave Bottom - Grey';
    const correctTemplateSpy = jest.spyOn(SeparatorWaveBottomGreyTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
  });
  it('renders the template correctly for Separator Straight', () => {
    const template = 'Separator: Straight';
    const correctTemplateSpy = jest.spyOn(SeparatorStraightTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
  });
  it('renders the template correctly for Seperator Central Image', () => {
    const template = 'Separator: Central Image';
    const correctTemplateSpy = jest.spyOn(SeparatorCentralImageTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
  });
  it('renders the template correctly for Section Text Quote', () => {
    const template = 'Section: Text Quote';
    const correctTemplateSpy = jest.spyOn(SectionTextQuoteTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.description.description).innerHTML).toBe(content.description.description);
  });
  it('renders the template correctly for Seperator Testimonial', () => {
    const template = 'Separator: Testimonial';
    const correctTemplateSpy = jest.spyOn(SeparatorTestimonialTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleLiquid template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.description.description).innerHTML).toBe(content.description.description);
  });
});
