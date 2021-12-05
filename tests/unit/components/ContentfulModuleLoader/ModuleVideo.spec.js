/* eslint-disable max-len */
/* eslint-disable no-console */
/* globals describe, it, expect, jest, beforeEach */

import React from 'react';
import {
  render, cleanup,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../src/util';

import ModuleVideo from '../../../../src/components/ContentfulModuleLoader/ModuleVideo';
import VideoLeftTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleVideo/VideoLeftTemplate';
import VideoRightTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleVideo/VideoRightTemplate';
import VideoCenterTemplate from '../../../../src/components/ContentfulModuleLoader/ModuleVideo/VideoCenterTemplate';

const content = {
  title: { title: 'title' },
  subtitle: { subtitle: 'subtitle' },
  content: { content: 'description' },
  videoId: 'videoId',
  callToActionButtonText: 'callToActionButtonText',
  callToActionButtonUrl: 'callToActionButtonUrl',
};

describe('ModuleVideo', () => {
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
          <ModuleVideo template={template} />
        </ThemeProvider>,
      );
    }).not.toThrow();

    expect(console.error.mock.calls).toHaveLength(1);

    console.error = originalConsole;
  });

  it('renders the template correctly for Video [L] templates', () => {
    const template = 'Video [L]';
    const correctTemplateSpy = jest.spyOn(VideoLeftTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleVideo template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.subtitle.subtitle).innerHTML).toBe(content.subtitle.subtitle);
    expect(getByText(content.content.content).innerHTML)
      .toBe(content.content.content);

    expect(getByText(content.callToActionButtonText).innerHTML).toBe(content.callToActionButtonText);
  });
  it('renders the template correctly for Video [R] templates', () => {
    const template = 'Video [R]';
    const correctTemplateSpy = jest.spyOn(VideoRightTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleVideo template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.subtitle.subtitle).innerHTML).toBe(content.subtitle.subtitle);
    expect(getByText(content.content.content).innerHTML)
      .toBe(content.content.content);

    expect(getByText(content.callToActionButtonText).innerHTML).toBe(content.callToActionButtonText);
  });  
  it('renders the template correctly for Video [C] templates', () => {
    const template = 'Video [C]';
    const correctTemplateSpy = jest.spyOn(VideoCenterTemplate, 'render');

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ModuleVideo template={template} {...content} />
      </ThemeProvider>,
    );

    expect(correctTemplateSpy.mock.calls).toHaveLength(1);

    expect(getByText(content.title.title).innerHTML).toBe(content.title.title);
    expect(getByText(content.subtitle.subtitle).innerHTML).toBe(content.subtitle.subtitle);
    expect(getByText(content.content.content).innerHTML)
      .toBe(content.content.content);

    expect(getByText(content.callToActionButtonText).innerHTML).toBe(content.callToActionButtonText);
  });
});
