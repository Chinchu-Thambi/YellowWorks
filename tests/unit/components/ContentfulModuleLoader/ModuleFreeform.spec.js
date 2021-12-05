/* globals describe, it, expect, window, document, jest */

import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../src/util';
import Loader from '../../../../src/components/ContentfulModuleLoader/ModuleFreeform';

describe('freeform modules', () => {
  it('renders HubspotForm', () => {
    const content = {
      portalId: '123',
      formId: '123',
    };

    const data = {
      internal: {
        content: JSON.stringify(content),
      },
    };

    const documentSpy = jest.spyOn(document, 'createElement');

    let wrapper = mount(
      <ThemeProvider theme={theme}>
        <Loader
          theme={theme}
          data={data}
          source="HubspotForm"
        />
      </ThemeProvider>,
    );

    expect(documentSpy).toHaveBeenCalledWith('script');

    window.hbspt = {
      forms: {
        create: jest.fn(),
      },
    };

    wrapper.unmount();

    wrapper = mount(
      <ThemeProvider theme={theme}>
        <Loader
          data={data}
          source="HubspotForm"
        />
      </ThemeProvider>,
    );

    expect(wrapper.find('section#hubspot-form-container-123')).toHaveLength(1);

    expect(window.hbspt.forms.create).toHaveBeenCalledWith({
      portalId: '123',
      formId: '123',
      target: '#hubspot-form-container-123',
    });

    wrapper.unmount();
  });

  it('renders GoogleParner', () => {
    const content = {
    };

    const data = {
      internal: {
        content: JSON.stringify(content),
      },
    };

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Loader
          data={data}
          source="GooglePartner"
        />
      </ThemeProvider>,
    );

    expect(wrapper.html()).toMatchSnapshot();

    wrapper.unmount();
  });
});
